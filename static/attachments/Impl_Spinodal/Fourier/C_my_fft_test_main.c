/*
 * C_fft_main.c  –  unit tests for C_my_fft
 *
 * Build (iterative, default):
 *   gcc -O2 -Wall -Wextra -o fft_test C_fft_main.c C_my_fft.c -lm
 *
 * Build (recursive):
 *   gcc -O2 -Wall -Wextra -DMY_FFT_USE_RECURSIVE -o fft_test C_fft_main.c C_my_fft.c -lm
 */

#include <math.h>
#include <stdio.h>
#include <stdlib.h>

#include "C_my_fft.h"

/* =========================================================================
 * Helpers
 * ========================================================================= */

#define M_PI 3.14159265358979323846 /* pi */
#define TOLERANCE 1e-12

/* Maximum absolute error between two complex arrays. */
static double max_error(const my_complex *a, const my_complex *b, size_t N) {
    double err = 0.0;
    for (size_t i = 0; i < N; i++) {
        double dr = a[i][0] - b[i][0];
        double di = a[i][1] - b[i][1];
        double e = sqrt(dr * dr + di * di);
        if (e > err)
            err = e;
    }
    return err;
}

static void print_pass_fail(const char *name, int passed) {
    printf("  %-45s %s\n", name, passed ? "PASS" : "FAIL");
}

/* =========================================================================
 * Tests – utility functions
 * ========================================================================= */

static int test_transpose_square(void) {
    /*
     * 2×2 matrix stored row-major:
     *   [ (1,0)  (2,0) ]
     *   [ (3,0)  (4,0) ]
     * After transpose:
     *   [ (1,0)  (3,0) ]
     *   [ (2,0)  (4,0) ]
     */
    my_complex m[4] = {{1, 0}, {2, 0}, {3, 0}, {4, 0}};
    my_complex expected[4] = {{1, 0}, {3, 0}, {2, 0}, {4, 0}};
    my_complex out[4];

    my_fft_util_transpose(m, out, 2, 2);
    return max_error(out, expected, 4) < TOLERANCE;
}

static int test_transpose_rect(void) {
    /*
     * The layout convention used throughout this library is in[i + j*N0],
     * where i is the fast (inner) index running 0..N0-1 and j is the slow
     * (outer) index running 0..N1-1.
     *
     * With N0=2, N1=3 the 6-element array represents:
     *   col:  i=0  i=1
     *   j=0:  [0]  [1]      → values 1, 2
     *   j=1:  [2]  [3]      → values 3, 4
     *   j=2:  [4]  [5]      → values 5, 6
     *
     * After transpose (swap N0↔N1, swap i↔j):
     * out[j + i*N1] = in[i + j*N0]
     *   → out = { 1, 3, 5, 2, 4, 6 }
     */
    my_complex m[6] = {{1, 0}, {2, 0}, {3, 0}, {4, 0}, {5, 0}, {6, 0}};
    my_complex expected[6] = {{1, 0}, {3, 0}, {5, 0}, {2, 0}, {4, 0}, {6, 0}};
    my_complex out[6];

    my_fft_util_transpose(m, out, 2, 3);
    return max_error(out, expected, 6) < TOLERANCE;
}

static int test_transpose_inplace(void) {
    /* Same as test_transpose_square but in-place (in == out). */
    my_complex m[4] = {{1, 0}, {2, 0}, {3, 0}, {4, 0}};
    my_complex expected[4] = {{1, 0}, {3, 0}, {2, 0}, {4, 0}};

    my_fft_util_transpose(m, m, 2, 2);
    return max_error(m, expected, 4) < TOLERANCE;
}

/* =========================================================================
 * Tests – 1-D FFT v1 (recursive)
 * ========================================================================= */

/* FFT of a DC signal (all ones) should be N at index 0, zero elsewhere. */
static int test_fft_1d_v1_dc(void) {
    const size_t N = 8;
    my_complex *in = alloc_complex(N);
    my_complex *out = alloc_complex(N);

    for (size_t i = 0; i < N; i++) {
        in[i][0] = 1.0;
        in[i][1] = 0.0;
    }
    my_fft_forward_1d_v1(in, out, N);

    /* out[0] should be (N, 0); rest should be (0, 0). */
    int ok = (fabs(out[0][0] - (double)N) < TOLERANCE && fabs(out[0][1]) < TOLERANCE);
    for (size_t i = 1; i < N; i++)
        ok = ok && (fabs(out[i][0]) < TOLERANCE) && (fabs(out[i][1]) < TOLERANCE);

    free(in);
    free(out);
    return ok;
}

/* FFT of a single complex exponential e^{i*2π*k0/N} should be
 * a Kronecker delta at frequency k0. */
static int test_fft_1d_v1_single_freq(void) {
    const size_t N = 8;
    const size_t k0 = 3;
    my_complex *in = alloc_complex(N);
    my_complex *out = alloc_complex(N);

    for (size_t n = 0; n < N; n++) {
        double theta = 2.0 * M_PI * (double)(k0 * n) / (double)N;
        in[n][0] = cos(theta);
        in[n][1] = sin(theta);
    }
    my_fft_forward_1d_v1(in, out, N);

    int ok = 1;
    for (size_t k = 0; k < N; k++) {
        double expected_re = (k == k0) ? (double)N : 0.0;
        double expected_im = 0.0;
        ok = ok && (fabs(out[k][0] - expected_re) < TOLERANCE) && (fabs(out[k][1] - expected_im) < TOLERANCE);
    }
    free(in);
    free(out);
    return ok;
}

/* forward then backward should recover the original signal. */
static int test_fft_1d_v1_roundtrip(void) {
    const size_t N = 16;
    my_complex *in = alloc_complex(N);
    my_complex *freq = alloc_complex(N);
    my_complex *rec = alloc_complex(N);
    my_complex *in_save = alloc_complex(N);

    for (size_t i = 0; i < N; i++) {
        in[i][0] = (double)i * 0.5;
        in[i][1] = (double)(N - i);
    }
    copy_complex(in_save, in, N);

    my_fft_forward_1d_v1(in, freq, N);
    my_fft_backward_1d_v1(freq, rec, N);

    double err = max_error(in_save, rec, N);
    free(in);
    free(freq);
    free(rec);
    free(in_save);
    return err < TOLERANCE;
}

/* =========================================================================
 * Tests – 1-D FFT v2 (iterative)
 * ========================================================================= */

static int test_fft_1d_v2_dc(void) {
    const size_t N = 8;
    my_complex *in = alloc_complex(N);
    my_complex *out = alloc_complex(N);

    for (size_t i = 0; i < N; i++) {
        in[i][0] = 1.0;
        in[i][1] = 0.0;
    }
    my_fft_forward_1d_v2(in, out, N);

    int ok = (fabs(out[0][0] - (double)N) < TOLERANCE && fabs(out[0][1]) < TOLERANCE);
    for (size_t i = 1; i < N; i++)
        ok = ok && (fabs(out[i][0]) < TOLERANCE) && (fabs(out[i][1]) < TOLERANCE);

    free(in);
    free(out);
    return ok;
}

static int test_fft_1d_v2_single_freq(void) {
    const size_t N = 8;
    const size_t k0 = 3;
    my_complex *in = alloc_complex(N);
    my_complex *out = alloc_complex(N);

    for (size_t n = 0; n < N; n++) {
        double theta = 2.0 * M_PI * (double)(k0 * n) / (double)N;
        in[n][0] = cos(theta);
        in[n][1] = sin(theta);
    }
    my_fft_forward_1d_v2(in, out, N);

    int ok = 1;
    for (size_t k = 0; k < N; k++) {
        double expected_re = (k == k0) ? (double)N : 0.0;
        double expected_im = 0.0;
        ok = ok && (fabs(out[k][0] - expected_re) < TOLERANCE) && (fabs(out[k][1] - expected_im) < TOLERANCE);
    }
    free(in);
    free(out);
    return ok;
}

static int test_fft_1d_v2_roundtrip(void) {
    const size_t N = 16;
    my_complex *in = alloc_complex(N);
    my_complex *freq = alloc_complex(N);
    my_complex *rec = alloc_complex(N);

    for (size_t i = 0; i < N; i++) {
        in[i][0] = (double)i * 0.5;
        in[i][1] = (double)(N - i);
    }

    /* v2 no longer modifies `in` or `freq`, so no defensive copies needed. */
    my_fft_forward_1d_v2(in, freq, N);
    my_fft_backward_1d_v2(freq, rec, N);

    double err = max_error(in, rec, N);
    free(in);
    free(freq);
    free(rec);
    return err < TOLERANCE;
}

/* Cross-check: v1 and v2 must produce the same forward spectrum. */
static int test_fft_1d_v1_v2_agree(void) {
    const size_t N = 32;
    my_complex *in_v1 = alloc_complex(N);
    my_complex *in_v2 = alloc_complex(N);
    my_complex *out_v1 = alloc_complex(N);
    my_complex *out_v2 = alloc_complex(N);

    for (size_t i = 0; i < N; i++) {
        double v = sin(2.0 * M_PI * 5.0 * (double)i / (double)N);
        in_v1[i][0] = in_v2[i][0] = v;
        in_v1[i][1] = in_v2[i][1] = 0.0;
    }
    my_fft_forward_1d_v1(in_v1, out_v1, N);
    my_fft_forward_1d_v2(in_v2, out_v2, N);

    double err = max_error(out_v1, out_v2, N);
    free(in_v1);
    free(in_v2);
    free(out_v1);
    free(out_v2);
    return err < TOLERANCE;
}

/* =========================================================================
 * Tests – 2-D FFT v1 (recursive)
 * ========================================================================= */

/* DC input: all elements 1+0i → only out[0] should be N0*N1. */
static int test_fft_2d_v1_dc(void) {
    const size_t N0 = 4, N1 = 4;
    const size_t N = N0 * N1;
    my_complex *in = alloc_complex(N);
    my_complex *out = alloc_complex(N);

    for (size_t i = 0; i < N; i++) {
        in[i][0] = 1.0;
        in[i][1] = 0.0;
    }
    my_fft_forward_2d_v1(in, out, N0, N1);

    int ok = (fabs(out[0][0] - (double)N) < TOLERANCE && fabs(out[0][1]) < TOLERANCE);
    for (size_t i = 1; i < N; i++)
        ok = ok && (fabs(out[i][0]) < TOLERANCE) && (fabs(out[i][1]) < TOLERANCE);

    free(in);
    free(out);
    return ok;
}

/* Round-trip: forward then backward should recover the input. */
static int test_fft_2d_v1_roundtrip(void) {
    const size_t N0 = 4, N1 = 8;
    const size_t N = N0 * N1;
    my_complex *in = alloc_complex(N);
    my_complex *freq = alloc_complex(N);
    my_complex *rec = alloc_complex(N);

    for (size_t i = 0; i < N; i++) {
        in[i][0] = (double)(i % 7) - 3.0;
        in[i][1] = (double)(i % 5) * 0.25;
    }

    my_fft_forward_2d_v1(in, freq, N0, N1);
    my_fft_backward_2d_v1(freq, rec, N0, N1);

    double err = max_error(in, rec, N);
    free(in);
    free(freq);
    free(rec);
    return err < TOLERANCE;
}

/* =========================================================================
 * Tests – 2-D FFT v2 (iterative)
 * ========================================================================= */

static int test_fft_2d_v2_dc(void) {
    const size_t N0 = 4, N1 = 4;
    const size_t N = N0 * N1;
    my_complex *in = alloc_complex(N);
    my_complex *out = alloc_complex(N);

    for (size_t i = 0; i < N; i++) {
        in[i][0] = 1.0;
        in[i][1] = 0.0;
    }
    my_fft_forward_2d_v2(in, out, N0, N1);

    int ok = (fabs(out[0][0] - (double)N) < TOLERANCE && fabs(out[0][1]) < TOLERANCE);
    for (size_t i = 1; i < N; i++)
        ok = ok && (fabs(out[i][0]) < TOLERANCE) && (fabs(out[i][1]) < TOLERANCE);

    free(in);
    free(out);
    return ok;
}

static int test_fft_2d_v2_roundtrip(void) {
    const size_t N0 = 4, N1 = 8;
    const size_t N = N0 * N1;
    my_complex *in = alloc_complex(N);
    my_complex *freq = alloc_complex(N);
    my_complex *rec = alloc_complex(N);

    for (size_t i = 0; i < N; i++) {
        in[i][0] = (double)(i % 7) - 3.0;
        in[i][1] = (double)(i % 5) * 0.25;
    }

    my_fft_forward_2d_v2(in, freq, N0, N1);
    my_fft_backward_2d_v2(freq, rec, N0, N1);

    double err = max_error(in, rec, N);
    free(in);
    free(freq);
    free(rec);
    return err < TOLERANCE;
}

/* Cross-check: v1 and v2 must produce the same 2-D spectrum. */
static int test_fft_2d_v1_v2_agree(void) {
    const size_t N0 = 8, N1 = 4;
    const size_t N = N0 * N1;
    my_complex *in_v1 = alloc_complex(N);
    my_complex *in_v2 = alloc_complex(N);
    my_complex *out_v1 = alloc_complex(N);
    my_complex *out_v2 = alloc_complex(N);

    for (size_t i = 0; i < N; i++) {
        in_v1[i][0] = in_v2[i][0] = sin(2.0 * M_PI * (double)i / (double)N);
        in_v1[i][1] = in_v2[i][1] = 0.0;
    }
    my_fft_forward_2d_v1(in_v1, out_v1, N0, N1);
    my_fft_forward_2d_v2(in_v2, out_v2, N0, N1);

    double err = max_error(out_v1, out_v2, N);
    free(in_v1);
    free(in_v2);
    free(out_v1);
    free(out_v2);
    return err < TOLERANCE;
}

/* =========================================================================
 * Tests – generic alias API (resolves to the version selected at build time)
 * ========================================================================= */

static int test_generic_1d_roundtrip(void) {
    const size_t N = 16;
    my_complex *in = alloc_complex(N);
    my_complex *freq = alloc_complex(N);
    my_complex *rec = alloc_complex(N);

    for (size_t i = 0; i < N; i++) {
        in[i][0] = cos(2.0 * M_PI * 3.0 * (double)i / (double)N);
        in[i][1] = 0.0;
    }

    my_fft_forward_1d(in, freq, N);
    my_fft_backward_1d(freq, rec, N);

    double err = max_error(in, rec, N);
    free(in);
    free(freq);
    free(rec);
    return err < TOLERANCE;
}

static int test_generic_2d_roundtrip(void) {
    const size_t N0 = 4, N1 = 4;
    const size_t N = N0 * N1;
    my_complex *in = alloc_complex(N);
    my_complex *freq = alloc_complex(N);
    my_complex *rec = alloc_complex(N);

    for (size_t i = 0; i < N; i++) {
        in[i][0] = (double)(i & 0xF);
        in[i][1] = -(double)(i & 0x7);
    }

    my_fft_forward_2d(in, freq, N0, N1);
    my_fft_backward_2d(freq, rec, N0, N1);

    double err = max_error(in, rec, N);
    free(in);
    free(freq);
    free(rec);
    return err < TOLERANCE;
}

/* =========================================================================
 * Runner
 * ========================================================================= */

typedef int (*test_fn)(void);

typedef struct {
    const char *name;
    test_fn fn;
} test_entry;

#define ENTRY(f) {#f, f}

static const test_entry tests[] = {
    /* utilities */
    ENTRY(test_transpose_square),
    ENTRY(test_transpose_rect),
    ENTRY(test_transpose_inplace),

    /* 1-D v1 */
    ENTRY(test_fft_1d_v1_dc),
    ENTRY(test_fft_1d_v1_single_freq),
    ENTRY(test_fft_1d_v1_roundtrip),

    /* 1-D v2 */
    ENTRY(test_fft_1d_v2_dc),
    ENTRY(test_fft_1d_v2_single_freq),
    ENTRY(test_fft_1d_v2_roundtrip),

    /* cross-check */
    ENTRY(test_fft_1d_v1_v2_agree),

    /* 2-D v1 */
    ENTRY(test_fft_2d_v1_dc),
    ENTRY(test_fft_2d_v1_roundtrip),

    /* 2-D v2 */
    ENTRY(test_fft_2d_v2_dc),
    ENTRY(test_fft_2d_v2_roundtrip),

    /* cross-check */
    ENTRY(test_fft_2d_v1_v2_agree),

    /* generic alias */
    ENTRY(test_generic_1d_roundtrip),
    ENTRY(test_generic_2d_roundtrip),
};

int main(void) {
    printf("=== my_fft tests  [%s] ===\n\n", MY_FFT_VERSION_STR);

    int total = (int)(sizeof(tests) / sizeof(tests[0]));
    int passed = 0;

    for (int i = 0; i < total; i++) {
        int ok = tests[i].fn();
        print_pass_fail(tests[i].name, ok);
        if (ok)
            passed++;
    }

    printf("\n%d / %d tests passed\n", passed, total);
    return (passed == total) ? EXIT_SUCCESS : EXIT_FAILURE;
}