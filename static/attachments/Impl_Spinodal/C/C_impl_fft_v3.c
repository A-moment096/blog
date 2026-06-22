#include "platform.h"

#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define M_PI 3.14159265358979323846 /* pi */
#define TRUNCATE_REAL 1e-6

// #define OUTPUT_VTK // whether output the vtk files
#ifdef _WIN32
#include "include/windows/fftw3.h"
#else
#include "include/linux/fftw3.h"
#endif

double df_dc(double A, double c) {
    return 2.0 * A * c * (1.0 - c) * (1.0 - 2.0 * c);
}

void write_VTK(fftw_complex *con, size_t N0, size_t N1, char *folder_path, size_t istep, double dx) {
    size_t N_full = N0 * N1;

    size_t name_len = strlen(folder_path) + strlen("step_") + 6 + strlen(".vtk") + 1;
    char *file_name = (char *)malloc(name_len);
    if (!file_name) {
        perror("malloc failed");
        exit(1);
    }

    snprintf(file_name, name_len, "%sstep_%06zu.vtk", folder_path, istep);

    FILE *f = fopen(file_name, "w");
    free(file_name);
    if (!f) {
        perror("fopen failed");
        exit(1);
    }

    fprintf(f,
            "# vtk DataFile Version 3.0\n"
            "Spinodal Decomposition Step %zu\n"
            "ASCII\n"
            "DATASET STRUCTURED_GRID\n"
            "DIMENSIONS %zu %zu 1\n"
            "POINTS %zu float\n",
            istep, N0, N1, N_full);

    for (size_t j = 0; j < N1; j++) {
        for (size_t i = 0; i < N0; i++) {
            fprintf(f, "%04.1f\t%04.1f\t0\n", (double)i * dx, (double)j * dx);
        }
    }

    fprintf(f,
            "POINT_DATA %zu\n"
            "SCALARS CON float\n"
            "LOOKUP_TABLE default\n",
            N_full);

    for (size_t i = 0; i < N_full; i++) {
        fprintf(f, "%07.5f\n", con[i][0]);
    }

    fclose(f);
}

int main(void) {

    const double total_time = 1000., dt = 1e-1; // 100 seconds, compute per 0.1 seconds;

    const size_t num_total_output = 100,                     // need 100 results
        num_total_compute = (size_t)(total_time / dt),       // auto-compute total computation steps
        output_every = num_total_compute / num_total_output; // auto-compute output interval

    const size_t N = 64, N_full = N * N;

    const double dx = 1.0;
    const double A = 1.0, M = 1.0, kappa = 0.5;

    const double c_min = 0.395, c_max = 0.405; // c_0 = 0.4, delta_c = 0.005

    const char *output_directory_path = "./output/v3/";
    if (create_directories(output_directory_path) != 0) {
        perror("failed when creating directory");
        exit(1);
    }

    fftw_complex *con = fftw_alloc_complex(N_full); // alloc_complex is zero-initialize
    fftw_complex *con_trans = fftw_alloc_complex(N_full);
    fftw_complex *mesh_df_dc = fftw_alloc_complex(N_full);

    fftw_plan con_2_con_trans = fftw_plan_dft_2d((int)N, (int)N, con, con_trans, FFTW_FORWARD, FFTW_PATIENT);
    fftw_plan con_trans_2_con = fftw_plan_dft_2d((int)N, (int)N, con_trans, con, FFTW_BACKWARD, FFTW_PATIENT); // need manually normalize
    fftw_plan trans_mesh_df_dc = fftw_plan_dft_2d((int)N, (int)N, mesh_df_dc, mesh_df_dc, FFTW_FORWARD, FFTW_PATIENT);

    for (size_t i = 0; i < N_full; i++) {
        double uniform_rand_0_1 = (double)rand() / ((double)RAND_MAX);
        con[i][0] = c_min + uniform_rand_0_1 * (c_max - c_min);
    }

    bench_init();
    bench_time_t t_start, t_end;
    bench_now(&t_start);

    for (size_t istep = 0; istep <= num_total_compute; istep++) {
        // my_fft_forward_2d(con, con_trans, N, N);
        fftw_execute(con_2_con_trans);
        // fill/refill mesh_df_dc
        for (size_t i = 0; i < N_full; i++) {
            mesh_df_dc[i][0] = df_dc(A, con[i][0]);
            mesh_df_dc[i][1] = 0.0;
        }

        // get transformed mesh_df_dc
        // my_fft_forward_2d(mesh_df_dc, mesh_df_dc, N, N);
        fftw_execute(trans_mesh_df_dc);

        // use semi-implicit method
        for (size_t j = 0; j < N; j++) {
            for (size_t i = 0; i < N; i++) {
                size_t k_pos = i + j * N;

                // Correct FFT frequency mapping (fftshift-equivalent)
                double fi = (i < N / 2) ? (double)i : (double)i - (double)N;
                double fj = (j < N / 2) ? (double)j : (double)j - (double)N;

                double kx = 2.0 * M_PI * fi / ((double)N * dx);
                double ky = 2.0 * M_PI * fj / ((double)N * dx);
                double k2 = kx * kx + ky * ky;
                double k4 = k2 * k2;

                // numerator = {c} - delta t k^2 M {df/dc}
                fftw_complex numerator;
                numerator[0] = con_trans[k_pos][0] - dt * k2 * M * mesh_df_dc[k_pos][0];
                numerator[1] = con_trans[k_pos][1] - dt * k2 * M * mesh_df_dc[k_pos][1];

                // denominator = 1 + delta t k^4 M kappa
                double denominator = 1. + dt * k4 * M * kappa;

                // con_trans = numerator / denominator
                con_trans[k_pos][0] = numerator[0] / denominator;
                con_trans[k_pos][1] = numerator[1] / denominator;
            }
        }

        // my_fft_backward_2d(con_trans, con, N, N);
        fftw_execute(con_trans_2_con);

        for (size_t i = 0; i < N_full; i++) {
            con[i][0] /= (double)N_full;
            // image part is zero, no need to normalize
        }

        if (istep % output_every == 0 || istep == num_total_compute) {
            printf("output steps: %zu\n", istep);
#ifdef OUTPUT_VTK
            write_VTK(con, N, N, output_directory_path, istep, dx);
#endif
        }
    }
    bench_now(&t_end);
    printf("Total time: %.4f s\n", bench_elapsed(&t_start, &t_end));

    fftw_destroy_plan(trans_mesh_df_dc);
    fftw_destroy_plan(con_trans_2_con);
    fftw_destroy_plan(con_2_con_trans);

    fftw_free(mesh_df_dc);
    fftw_free(con_trans);
    fftw_free(con);
}
