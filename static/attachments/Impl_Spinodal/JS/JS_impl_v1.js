import fs from "node:fs";

function mesh_periodic(u, ker_fun, Nx, Ny, dx, dy, A, kappa) {
  let new_mesh = new Array(u.length).fill(0);
  const inv_dx2 = 1 / (dx * dy);

  for (let j = 0; j < Ny; j++) {
    for (let i = 0; i < Nx; i++) {
      const left = u[j * Nx + ((i - 1 + Nx) % Nx)];
      const right = u[j * Nx + ((i + 1) % Nx)];
      const down = u[((j - 1 + Ny) % Ny) * Nx + i];
      const up = u[((j + 1) % Ny) * Nx + i];
      const center = u[j * Nx + i];
      new_mesh[j * Nx + i] = ker_fun(
        left,
        right,
        up,
        down,
        center,
        inv_dx2,
        A,
        kappa,
      );
    }
  }

  return new_mesh;
}

function laplacian(left, right, up, down, center, inv_d2) {
  return inv_d2 * (left + right + up + down - 4 * center);
}

function dbulk_dc(center, A) {
  return 2 * A * center * (1 - center) * (1 - 2 * center);
}

function dint_dc(left, right, up, down, center, inv_d2, kappa) {
  return -kappa * laplacian(left, right, up, down, center, inv_d2);
}

function dF_dc(left, right, up, down, center, inv_d2, A, kappa) {
  return (
    dbulk_dc(center, A) + dint_dc(left, right, up, down, center, inv_d2, kappa)
  );
}

function write_VTK(mesh, istep, Nx, Ny, dx, dy, folder_name) {
  const vtkContent = `# vtk DataFile Version 3.0
Spinodal Decomposition Step ${istep}
ASCII
DATASET STRUCTURED_GRID
DIMENSIONS ${Nx} ${Ny} 1
POINTS ${Nx * Ny} float
${Array.from({ length: Ny }, (_, j) =>
    Array.from({ length: Nx }, (_, i) => `${i * dx} ${j * dy} 0`).join("\n"),
  ).join("\n")}
POINT_DATA ${Nx * Ny}
SCALARS CON float
LOOKUP_TABLE default
${mesh.join("\n")}
`;

  fs.writeFileSync(`${folder_name}/step_${istep}.vtk`, vtkContent);
}

const Nx = 64,
  Ny = 64,
  Nstep = 10000,
  dx = 1.0,
  dy = dx,
  dt = 0.01,
  M = 1.0,
  A = 1.0,
  kappa = 0.5,
  dcon = 0.05,
  con_init = 0.4;

const folder_name = "output";

fs.mkdir(folder_name, { recursive: true }, (err) => {
  if (err) console.error("Error creating folder:", err);
  else console.log(`Folder '${folder_name}' is ready.`);
});

let con_mesh = new Array(Nx * Ny)
  .fill(0)
  .map(() => con_init + 2 * dcon * (Math.random() - 0.5));

performance.mark("start-simulation");
for (let istep = 0; istep < Nstep + 1; istep++) {
  const temp_mesh = mesh_periodic(con_mesh, dF_dc, Nx, Ny, dx, dy, A, kappa);
  const dc = mesh_periodic(temp_mesh, laplacian, Nx, Ny, dx, dy, A, kappa);
  con_mesh = con_mesh.map((val, idx) => val + M * dc[idx] * dt);

  if (istep % 100 === 0) {
    write_VTK(con_mesh, istep, Nx, Ny, dx, dy, folder_name);
    console.log(`Step: ${istep}`);
  }
}
performance.mark("end-simulation");
performance.measure(
  "Total Simulation Time",
  "start-simulation",
  "end-simulation",
);

console.log(`Total Simulation Time: ${performance.getEntriesByName("Total Simulation Time")[0].duration.toFixed(2)} ms`);