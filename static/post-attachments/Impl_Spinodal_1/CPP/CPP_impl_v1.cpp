#include <chrono>
#include <filesystem>
#include <fstream>
#include <functional>
#include <iostream>
#include <random>
#include <string>
#include <vector>

using std::cout;
using std::endl;
using std::ofstream;
using std::string;
using std::vector;
namespace fs = std::filesystem;

void write_vtk(vector<vector<float>> mesh, string file_path, int time_step, float dx) {
    fs::create_directory(file_path);
    fs::path f_name{"step_" + std::to_string(time_step) + ".vtk"};
    f_name = file_path / f_name;

    ofstream ofs{f_name};
    int Nx = static_cast<int>(mesh.size()), Ny = static_cast<int>(mesh.at(0).size());

    ofs << "# vtk DataFile Version 3.0\n";
    ofs << f_name.string() << endl;
    ofs << "ASCII\n";

    ofs << "DATASET STRUCTURED_GRID\n";
    ofs << "DIMENSIONS " << Nx << " " << Ny << " " << 1 << "\n";
    ofs << "POINTS " << Nx * Ny * 1 << " float\n";
    for (int j = 0; j < Ny; j++) {
        for (int i = 0; i < Nx; i++) {
            ofs << (float)i * dx << " " << (float)j * dx << " " << 1 << endl;
        }
    }

    ofs << "POINT_DATA " << Nx * Ny * 1 << endl;
    ofs << "SCALARS " << "CON " << "float 1\n";
    ofs << "LOOKUP_TABLE default\n";
    for (int j = 0; j < Ny; j++) {
        for (int i = 0; i < Nx; i++) {
            ofs << mesh.at(j).at(i) << endl;
        }
    }

    ofs.close();
}

float laplacian(float v_c, float v_l, float v_r, float v_u, float v_d, float dx) {
    return (v_l + v_r + v_u + v_d - 4 * v_c) / (dx * dx);
}

vector<vector<float>> mesh_periodic(
    vector<vector<float>> mesh, int Nx, int Ny, float dx,
    std::function<float(float, float, float, float, float, float)> kernel_func) {

    float v_l, v_r, v_u, v_d, v_c;
    vector<vector<float>> next_mesh(Nx, vector<float>(Ny));

    for (int j = 0; j < Nx; j++) {
        for (int i = 0; i < Nx; i++) {
            v_c = mesh.at(j).at(i);
            // x-minus
            if (i == 0) {
                v_l = mesh.at(j).at(Nx - 1);
            } else {
                v_l = mesh.at(j).at(i - 1);
            }
            // x-plus
            if (i == Nx - 1) {
                v_r = mesh.at(j).at(0);
            } else {
                v_r = mesh.at(j).at(i + 1);
            }
            // y-minus
            if (j == 0) {
                v_d = mesh.at(Ny - 1).at(i);
            } else {
                v_d = mesh.at(j - 1).at(i);
            }
            // y-plus
            if (j == Ny - 1) {
                v_u = mesh.at(0).at(i);
            } else {
                v_u = mesh.at(j + 1).at(i);
            }

            next_mesh.at(j).at(i) = kernel_func(v_c, v_l, v_r, v_u, v_d, dx);
        }
    }
    return next_mesh;
}

float df_bulk_dc(float con, float A) {
    return 2 * A * con * (1 - con) * (1 - 2 * con);
}

int main(int, char **) {
    using hrc = std::chrono::high_resolution_clock;
    namespace chrono = std::chrono;
    const auto timepoint_start = hrc::now();

    constexpr int Nx = 64, Ny = 64, Nstep = 10000;
    constexpr float dx = 1.0f, dt = 0.01f;
    constexpr float M = 1.0f, A = 1.0f, kappa = 0.5f;
    constexpr float dcon = 0.05f, con_init = 0.4f;

    std::random_device rd;
    std::uniform_real_distribution<float> dist(-dcon, dcon);

    vector<vector<float>> con_mesh(Nx, vector<float>(Ny, con_init));
    for (auto &row : con_mesh) {
        for (auto &point : row) {
            point += dist(rd);
        }
    }

    cout << "Initialize complete" << endl;

    for (int istep = 0; istep < Nstep + 1; istep++) {

        vector<vector<float>> df_dc = mesh_periodic(
            con_mesh, Nx, Ny, dx,
            [kappa, A](float v_1, float v_2, float v_3, float v_4, float v_5, float v_6) {
                return df_bulk_dc(v_1, A) - kappa * laplacian(v_1, v_2, v_3, v_4, v_5, v_6);
            });

        vector<vector<float>> dc = mesh_periodic(
            df_dc, Nx, Ny, dx,
            laplacian);

        for (int j = 0; j < Ny; j++) {
            for (int i = 0; i < Nx; i++) {
                con_mesh.at(j).at(i) += dt * M * dc.at(j).at(i);
            }
        }

        // result output
        if (istep % 100 == 0) {
            write_vtk(con_mesh, "./output", istep, dx);
            cout << "Result " << istep << " outputed" << endl;
        }
    }

    const auto timepoint_stop = hrc::now();
    const auto time_cost = chrono::duration_cast<chrono::milliseconds>(timepoint_stop - timepoint_start);
    cout << "Calculation time cost: " << static_cast<double>(time_cost.count()) / 1000.0 << "seconds." << endl;
}
