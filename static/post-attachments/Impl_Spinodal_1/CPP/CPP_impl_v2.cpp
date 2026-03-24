#include <chrono>
#include <filesystem>
#include <fstream>
#include <functional>
#include <iostream>
#include <memory>
#include <random>
#include <string>
#include <type_traits>
#include <vector>

using std::cout;
using std::endl;
using std::ofstream;
using std::string;
using std::vector;
namespace fs = std::filesystem;
using hrc = std::chrono::high_resolution_clock;
using namespace std::chrono;

float laplacian(float v_c, float v_l, float v_r, float v_u, float v_d, float dx) {
    return (v_l + v_r + v_u + v_d - 4 * v_c) / (dx * dx);
}

float df_bulk_dc(float con, float A) {
    return 2 * A * con * (1 - con) * (1 - 2 * con);
}

template <typename T, typename = std::enable_if_t<std::is_floating_point_v<T>>>
class Mesh;

template <typename T, typename = std::enable_if_t<std::is_floating_point_v<T>>>
struct AbstractBounds {
    virtual ~AbstractBounds() = default;
    virtual T bound_x_m(const Mesh<T> &mesh, size_t y) const = 0;
    virtual T bound_x_p(const Mesh<T> &mesh, size_t y) const = 0;
    virtual T bound_y_m(const Mesh<T> &mesh, size_t x) const = 0;
    virtual T bound_y_p(const Mesh<T> &mesh, size_t x) const = 0;
};
template <typename T, typename = std::enable_if_t<std::is_floating_point_v<T>>>
struct PeriodicBound : AbstractBounds<T> {
    T bound_x_m(const Mesh<T> &mesh, size_t y) const override {
        return mesh.get(mesh.get_dim_x() - 1, y);
    }
    T bound_x_p(const Mesh<T> &mesh, size_t y) const override {
        return mesh.get(0, y);
    }
    T bound_y_m(const Mesh<T> &mesh, size_t x) const override {
        return mesh.get(x, mesh.get_dim_y() - 1);
    }
    T bound_y_p(const Mesh<T> &mesh, size_t x) const override {
        return mesh.get(x, 0);
    }
};
template <typename T, typename = std::enable_if_t<std::is_floating_point_v<T>>>
struct FixedBound : AbstractBounds<T> {
    T fixed_val;
    FixedBound(T _val) : fixed_val(_val) {}
    T bound_x_m(const Mesh<T> &, size_t) const override {
        return fixed_val;
    }
    T bound_x_p(const Mesh<T> &, size_t) const override {
        return fixed_val;
    }
    T bound_y_m(const Mesh<T> &, size_t) const override {
        return fixed_val;
    }
    T bound_y_p(const Mesh<T> &, size_t) const override {
        return fixed_val;
    }
};
template <typename T, typename = std::enable_if_t<std::is_floating_point_v<T>>>
struct ReflectBound : AbstractBounds<T> {
    T bound_x_m(const Mesh<T> &mesh, size_t y) const override {
        return mesh.get(1, y);
    }
    T bound_x_p(const Mesh<T> &mesh, size_t y) const override {
        return mesh.get(mesh.get_dim_x() - 2, y);
    }
    T bound_y_m(const Mesh<T> &mesh, size_t x) const override {
        return mesh.get(x, 1);
    }
    T bound_y_p(const Mesh<T> &mesh, size_t x) const override {
        return mesh.get(x, mesh.get_dim_y() - 2);
    }
};

template <typename T, typename = std::enable_if_t<std::is_floating_point_v<T>>>
struct BoundFuncs {
    using BoundPtr = std::shared_ptr<const AbstractBounds<T>>;

    BoundPtr x_m;
    BoundPtr x_p;
    BoundPtr y_m;
    BoundPtr y_p;

    BoundFuncs()
        : BoundFuncs(std::make_shared<PeriodicBound<T>>(), std::make_shared<PeriodicBound<T>>(),
                     std::make_shared<PeriodicBound<T>>(), std::make_shared<PeriodicBound<T>>()) {}

    BoundFuncs(BoundPtr _x_m, BoundPtr _x_p, BoundPtr _y_m, BoundPtr _y_p)
        : x_m(std::move(_x_m)), x_p(std::move(_x_p)), y_m(std::move(_y_m)), y_p(std::move(_y_p)) {
        if (!x_m || !x_p || !y_m || !y_p) {
            throw std::invalid_argument("Boundary condition pointers must not be null");
        }
    }
};

template <typename T, typename = std::enable_if_t<std::is_floating_point_v<T>>>
class Mesh {
private:
    vector<vector<T>> mesh_data;
    size_t Nx, Ny;
    T dx, dy;
    BoundFuncs<T> boundary_condition;

public:
    Mesh() = delete;

    Mesh(size_t _Nx, size_t _Ny, T _dx, T _dy, BoundFuncs<T> _bound_funcs,
         T _init_value = T())
        : Nx(_Nx), Ny(_Ny), dx(_dx), dy(_dy), boundary_condition(_bound_funcs) {
        mesh_data = vector<vector<T>>(_Ny, vector<T>(_Nx, _init_value));
    }

    Mesh(size_t _Nx, size_t _Ny, T _dx, T _dy, T _init_value = T())
        : Mesh(_Nx, _Ny, _dx, _dy, BoundFuncs<T>(), _init_value) {}

    Mesh(size_t _Nx, size_t _Ny, T _d_mesh, T _init_value = T())
        : Mesh(_Nx, _Ny, _d_mesh, _d_mesh, BoundFuncs<T>(), _init_value) {}

    Mesh(size_t _N_mesh, T _d_mesh, T _init_value = T())
        : Mesh(_N_mesh, _N_mesh, _d_mesh, _d_mesh, BoundFuncs<T>(), _init_value) {}

    Mesh(T _dx, T _dy, BoundFuncs<T> _bounds, vector<vector<T>> &_data) : mesh_data(_data) {
        Ny = mesh_data.size();
        Nx = mesh_data.at(0).size();
        dx = _dx;
        dy = _dy;
        boundary_condition = _bounds;
    }

    const size_t get_dim_x() const {
        return Nx;
    }

    const size_t get_dim_y() const {
        return Ny;
    }

    const T &get(size_t _x, size_t _y) const {
        return mesh_data.at(_y).at(_x);
    }

    vector<vector<T>> &get_data() const {
        return mesh_data;
    }

    Mesh iterate_mesh(std::function<float(float, float, float, float, float, float)> kernel_func) {
        float v_l, v_r, v_u, v_d, v_c;
        vector<vector<float>> next_mesh_data(Nx, vector<float>(Ny));

        for (int j = 0; j < Nx; j++) {
            for (int i = 0; i < Nx; i++) {
                v_c = mesh_data.at(j).at(i);
                // x-minus
                if (i == 0) {
                    v_l = boundary_condition.x_m->bound_x_m(*this, j);
                } else {
                    v_l = mesh_data.at(j).at(i - 1);
                }
                // x-plus
                if (i == Nx - 1) {
                    v_r = boundary_condition.x_p->bound_x_p(*this, j);
                } else {
                    v_r = mesh_data.at(j).at(i + 1);
                }
                // y-minus
                if (j == 0) {
                    v_d = boundary_condition.y_m->bound_y_m(*this, i);
                } else {
                    v_d = mesh_data.at(j - 1).at(i);
                }
                // y-plus
                if (j == Ny - 1) {
                    v_u = boundary_condition.y_p->bound_y_p(*this, i);
                } else {
                    v_u = mesh_data.at(j + 1).at(i);
                }

                next_mesh_data.at(j).at(i) = kernel_func(v_c, v_l, v_r, v_u, v_d, dx);
            }
        }
        Mesh next_mesh(dx, dy, boundary_condition, next_mesh_data);
        return next_mesh;
    }

    void update(const Mesh &_mesh) {
        for (size_t j = 0; j < Ny; j++) {
            for (size_t i = 0; i < Nx; i++) {
                mesh_data.at(j).at(i) += _mesh.get(i, j);
            }
        }
    }

    void update(std::function<float()> kernel_func) {
        for (auto &row : mesh_data) {
            for (auto &point : row) {
                point += kernel_func();
            }
        }
    }

    void write_vtk(string file_path, size_t time_step) {
        const auto &mesh = mesh_data;
        fs::create_directory(file_path);
        fs::path f_name{"step_" + std::to_string(time_step) + ".vtk"};
        f_name = file_path / f_name;

        ofstream ofs{f_name};

        ofs << "# vtk DataFile Version 3.0\n";
        ofs << f_name.string() << endl;
        ofs << "ASCII\n";
        ofs << "DATASET STRUCTURED_GRID\n";

        ofs << "DIMENSIONS " << Nx << " " << Ny << " " << 1 << "\n";
        ofs << "POINTS " << Nx * Ny * 1 << " float\n";

        for (size_t j = 0; j < Ny; j++) {
            for (size_t i = 0; i < Nx; i++) {
                ofs << (float)i * dx << " " << (float)j * dy << " " << 1 << endl;
            }
        }
        ofs << "POINT_DATA " << Nx * Ny * 1 << endl;

        ofs << "SCALARS " << "CON " << "float 1\n";
        ofs << "LOOKUP_TABLE default\n";
        for (size_t j = 0; j < Ny; j++) {
            for (size_t i = 0; i < Nx; i++) {
                ofs << mesh.at(j).at(i) << endl;
            }
        }

        ofs.close();
    }
};

int main(int, char **) {

    const auto timepoint_start = hrc::now();

    constexpr size_t Nx = 64, Ny = 64, Nstep = 10000;
    constexpr float dx = 1.0f, dt = 0.01f;
    constexpr float M = 1.0f, A = 1.0f, kappa = 0.5f;
    constexpr float dcon = 0.05f, con_init = 0.4f;

    auto dF_dc = [A, kappa](float v_1, float v_2, float v_3, float v_4, float v_5, float v_6) {
        return df_bulk_dc(v_1, A) - kappa * laplacian(v_1, v_2, v_3, v_4, v_5, v_6);
    };
    auto dc_dt = [M, dt](float v_1, float v_2, float v_3, float v_4, float v_5, float v_6) {
        return dt * M * laplacian(v_1, v_2, v_3, v_4, v_5, v_6);
    };
    auto add_noise = [dcon]() {
        std::random_device rd;
        std::uniform_real_distribution<float> dist(-dcon, dcon);
        return dist(rd);
    };

    using PB = PeriodicBound<float>;
    BoundFuncs<float> boundary(
        std::make_shared<PB>(),
        std::make_shared<PB>(),
        std::make_shared<PB>(),
        std::make_shared<PB>());
    Mesh<float> con_mesh(Nx, Ny, dx, dx, boundary, con_init);

    con_mesh.update(add_noise);

    cout << "Initialize complete" << endl;

    for (size_t istep = 0; istep < Nstep + 1; istep++) {

        auto df_dc = con_mesh.iterate_mesh(dF_dc);
        auto dc = df_dc.iterate_mesh(dc_dt);
        con_mesh.update(dc);

        // result output
        if (istep % 100 == 0) {
            con_mesh.write_vtk("./output", istep);
            cout << "Result " << istep << " outputed" << endl;
        }
    }

    const auto timepoint_stop = hrc::now();
    const auto time_cost = duration_cast<milliseconds>(timepoint_stop - timepoint_start);
    cout << "Calculation time cost: " << static_cast<double>(time_cost.count()) / 1000.0 << "seconds." << endl;
}
