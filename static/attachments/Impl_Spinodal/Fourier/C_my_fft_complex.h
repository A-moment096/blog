#ifndef MY_COMPLEX
#define MY_COMPLEX

#include <math.h>
#include <string.h>
typedef double my_complex[2];

/* Allocate and zero-initialise N complex numbers. */
static inline my_complex *alloc_complex(size_t N) {
    my_complex *p = calloc(N, sizeof(my_complex));
    if (!p) {
        fprintf(stderr, "calloc failed\n");
        exit(EXIT_FAILURE);
    }
    return p;
}

/* Deep-copy dest ← src (N elements). */
static inline void copy_complex(my_complex *dest, my_complex *src, size_t N) {
    memcpy(dest, src, sizeof(my_complex) * N);
}

static inline void cassign(my_complex dest, my_complex src) {
    dest[0] = src[0];
    dest[1] = src[1];
}

static inline void cadd(my_complex a, my_complex b, my_complex out) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
}

static inline void csub(my_complex a, my_complex b, my_complex out) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
}

static inline void cmul(my_complex a, my_complex b, my_complex out) {
    my_complex res;
    res[0] = a[0] * b[0] - a[1] * b[1];
    res[1] = a[0] * b[1] + a[1] * b[0];
    cassign(out, res);
}

static inline void c_exp_pure_image(double theta, my_complex out) {
    out[0] = cos(theta);
    out[1] = sin(theta);
}

static inline void doubles_to_my_complexs(double *real, double *image, my_complex *comp, size_t N) {
    if (real) {
        for (size_t i = 0; i < N; i++)
            comp[i][0] = real[i];
    } else {
        for (size_t i = 0; i < N; i++)
            comp[i][0] = 0.0;
    }
    if (image) {
        for (size_t i = 0; i < N; i++)
            comp[i][1] = image[i];
    } else {
        for (size_t i = 0; i < N; i++)
            comp[i][1] = 0.0;
    }
}

static inline void double_to_complex(double real, double image, my_complex *comp) {
    *comp[0] = real;
    *comp[1] = image;
}

#endif