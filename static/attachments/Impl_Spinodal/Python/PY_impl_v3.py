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


def df_bulk_dc(con, A):
    return 2 * A * con * (1 - con) * (1 - 2 * con)


def laplacian_np(mesh, inv_dx2):
    return (
        np.roll(mesh, 1, axis=1)  # left
        + np.roll(mesh, -1, axis=1)  # right
        + np.roll(mesh, 1, axis=0)  # down
        + np.roll(mesh, -1, axis=0)  # up
        - 4 * mesh
    ) * inv_dx2


def main():
    start = time.perf_counter()

    Nx, Ny, Nstep = (64, 64, 10000)
    dx, dt = (1.0, 0.01)
    inv_dx2 = 1 / (dx * dx)
    kappa, M, A = (0.5, 1.0, 1.0)
    dcon, con_init = (0.05, 0.4)
    con_mesh = [[con_init] * Nx for _ in range(Ny)]
    con_mesh = np.array(con_mesh)

    for j in range(Ny):
        for i in range(Nx):
            con_mesh[j][i] += random.uniform(-dcon, dcon)

    before_calc = time.perf_counter()
    print(f"Initialize cost: {(before_calc - start):.3f} seconds")

    for istep in range(Nstep + 1):

        lap_c = laplacian_np(con_mesh, inv_dx2)
        df_dc = df_bulk_dc(con_mesh, A) - kappa * lap_c
        dc = laplacian_np(df_dc, inv_dx2)
        con_mesh += dt * M * dc

        if istep % 100 == 0:
            write_vtk(con_mesh, "./output", istep, Nx, Ny, dx)
            print(f"Result {istep} outputed")

    end = time.perf_counter()
    print(f"Elapsed: {(end-start):.3f} seconds.")
    pass


if __name__ == "__main__":
    main()
