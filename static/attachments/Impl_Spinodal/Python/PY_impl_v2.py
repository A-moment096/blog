import os
import random
import time
import numpy as np


def write_vtk(mesh, folder_path, time_step, Nx, Ny, dx):
    os.makedirs(folder_path, exist_ok=True)
    file_name = folder_path + "/step_" + str(time_step) + ".vtk"
    with open(file_name, "w") as f:
        f.write(
            f"""# vtk DataFile Version 3.0
{file_name}
ASCII
DATASET STRUCTURED_GRID
DIMENSIONS {Nx} {Ny} 1
POINTS {Nx*Ny*1} float
"""
        )
        for j in range(Ny):
            for i in range(Nx):
                f.write(f"{float(i*dx)} {float(j*dx)} {1}\n")

        f.write(
            f"""POINT_DATA {Nx*Ny*1}
SCALARS CON float
LOOKUP_TABLE default
"""
        )
        for j in range(Ny):
            for i in range(Nx):
                f.write(f"{mesh[j][i]}\n")

        f.close()


def laplacian_inv_dx2(v_c, v_l, v_r, v_u, v_d, inv_dx2):
    return ((v_l + v_r + v_u + v_d) - 4 * v_c) * inv_dx2


def df_bulk_dc(con, A):
    return 2 * A * con * (1 - con) * (1 - 2 * con)


def mesh_periodic_update(mesh, updated_mesh, Nx, Ny, dx, ker_func):
    for j in range(Ny):
        for i in range(Nx):
            v_c = mesh[j][i]
            v_l = mesh[j][i - 1] if i != 0 else mesh[j][-1]
            v_r = mesh[j][i + 1] if i != Nx - 1 else mesh[j][0]
            v_d = mesh[j - 1][i] if j != 0 else mesh[-1][i]
            v_u = mesh[j + 1][i] if j != Ny - 1 else mesh[0][i]
            updated_mesh[j][i] = ker_func(v_c, v_l, v_r, v_u, v_d, dx)


def main():
    start = time.perf_counter()

    Nx, Ny, Nstep = (64, 64, 10000)
    dx, dt = (1.0, 0.01)
    inv_dx2 = 1 / (dx * dx)
    kappa, M, A = (0.5, 1.0, 1.0)
    dcon, con_init = (0.05, 0.4)
    con_mesh = np.array([[con_init] * Nx for _ in range(Ny)])
    df_dc = con_mesh.copy()
    dc = con_mesh.copy()

    for j in range(Ny):
        for i in range(Nx):
            con_mesh[j][i] += random.uniform(-dcon, dcon)

    before_calc = time.perf_counter()
    print(f"Initialize cost: {(before_calc - start):.3f} seconds")

    for istep in range(Nstep + 1):
        mesh_periodic_update(con_mesh, df_dc, Nx, Ny, inv_dx2, laplacian_inv_dx2)
        df_dc = df_bulk_dc(con_mesh, A) - kappa * df_dc
        mesh_periodic_update(df_dc, dc, Nx, Ny, inv_dx2, laplacian_inv_dx2)
        con_mesh += dt * M * dc

        if istep % 100 == 0:
            write_vtk(con_mesh, "./output", istep, Nx, Ny, dx)
            print(f"Result {istep} outputed")

    end = time.perf_counter()
    print(f"Elapsed: {(end-start):.3f} seconds.")
    pass


if __name__ == "__main__":
    main()
