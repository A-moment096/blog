import random
import time
from matplotlib.pylab import rand
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider


class Mesh:
    def __init__(self, Nx, Ny, dx=1.0, dy=1.0, init_val=0.0) -> None:
        self.Nx = Nx
        self.Ny = Ny
        self.dx = dx
        self.dy = dy

        self.data = np.array([[init_val] * Nx for _ in range(Ny)])
        self.inv_dxdy = self.dx * self.dy

    @classmethod
    def from_list(cls, list, dx=1.0, dy=1.0):
        new_mesh = cls(len(list[0]), len(list), dx, dy)
        new_mesh.data = list
        return new_mesh

    def apply_noise(self, lb, gb):
        uniform_noise = [
            [random.uniform(lb, gb) for _ in range(self.Nx)] for __ in range(self.Ny)
        ]
        self.data += np.array(uniform_noise)

    def laplacian(self):
        return (
            np.roll(self.data, 1, axis=1)  # left
            + np.roll(self.data, -1, axis=1)  # right
            + np.roll(self.data, 1, axis=0)  # down
            + np.roll(self.data, -1, axis=0)  # up
            - 4 * self.data
        ) * self.inv_dxdy

    def get(self, x, y):
        return self.data[y, x]


class Solver_CahnHilliard:
    def __init__(
        self, con_mesh: Mesh, Nstep, Nprint, dt, M, dbulk_dc, dinter_dc
    ) -> None:
        self.con_mesh = con_mesh
        self.Nstep = Nstep
        self.Nprint = Nprint
        self.dt = dt

        self.dbulk_dc = dbulk_dc
        self.dinter_dc = dinter_dc

        self.M = M

        self.frames = []
        self.framesteps = []

    def play_frame(self, color_map="coolwarm"):
        fig, ax = plt.subplots(figsize=(6.5, 5.8))
        plt.subplots_adjust(bottom=0.2)

        image = ax.imshow(
            self.frames[0], cmap=color_map, vmin=0.0, vmax=1.0, origin="lower"
        )
        ax.set_xlabel("x")
        ax.set_ylabel("y")
        title = ax.set_title(f"Step { self.framesteps[0]}")
        colorbar = fig.colorbar(image, ax=ax)
        colorbar.set_label("Concentration")

        slider_ax = fig.add_axes((0.14, 0.09, 0.62, 0.04))
        slider = Slider(
            ax=slider_ax,
            label="Frame",
            valmin=0,
            valmax=len(self.frames) - 1,
            valinit=0,
            valstep=1,
        )
        state = {"idx": 0, "playing": True, "syncing": False}

        def draw(idx):
            state["idx"] = int(idx)
            image.set_data(self.frames[state["idx"]])
            title.set_text(f"Step { self.framesteps[state['idx']]}")
            fig.canvas.draw_idle()

        def on_slider(val):
            if state["syncing"]:
                return
            draw(int(val))

        slider.on_changed(on_slider)
        plt.show()

    def save_VTS(self, folder_path):
        import os

        os.makedirs(folder_path, exist_ok=True)
        Nx = self.con_mesh.Nx
        Ny = self.con_mesh.Ny
        dx = self.con_mesh.dx
        dy = self.con_mesh.dy

        for data, istep in zip(self.frames, self.framesteps):
            file_name = folder_path + "/step_" + str(istep) + ".vtk"

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
                        f.write(f"{data[j][i]}\n")

                f.close()
            pass

    def time_loop(self):
        for istep in range(self.Nstep + 1):
            dF_dc = (self.dinter_dc() + self.dbulk_dc()) * self.M
            dF_dc = Mesh.from_list(dF_dc, self.con_mesh.dx, self.con_mesh.dy)
            dc = dF_dc.laplacian()
            self.con_mesh.data += dc * self.dt

            if istep % self.Nprint == 0:
                self.frames.append(self.con_mesh.data.copy())
                self.framesteps.append(istep)


def main():
    start = time.perf_counter()

    Nx, Ny, Nstep = (64, 64, 10000)
    dx, dt = (1.0, 0.01)
    kappa, M, A = (0.5, 1.0, 1.0)
    dcon, con_init = (0.05, 0.4)
    Nprint = 100

    def df_bulk_dc(con, A):
        return 2 * A * con * (1 - con) * (1 - 2 * con)

    con_mesh = Mesh(Nx, Ny, dx, dx, con_init)
    con_mesh.apply_noise(-dcon, dcon)

    CH_solver = Solver_CahnHilliard(
        con_mesh,
        Nstep,
        Nprint,
        dt,
        M,
        lambda: df_bulk_dc(con_mesh.data, A),
        lambda: -kappa * con_mesh.laplacian(),
    )

    before_calc = time.perf_counter()
    print(f"Initialize cost: {(before_calc - start):.3f} seconds")

    CH_solver.time_loop()

    end = time.perf_counter()
    print(f"Loop cost: {(end - before_calc):.3f} seconds.")
    print(f"Elapsed: {(end-start):.3f} seconds.")

    CH_solver.play_frame()
    pass


if __name__ == "__main__":
    main()
