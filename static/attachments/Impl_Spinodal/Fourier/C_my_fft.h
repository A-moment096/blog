#ifndef MY_FFT
#define MY_FFT

#include "C_my_fft_complex.h"
#include <stddef.h>

/* =========================================================================
 * Version selection
 *
 * Define MY_FFT_USE_RECURSIVE before including this header to select the
 * recursive Cooley-Tukey implementation (v1).
 * The default (no macro defined) selects the iterative bit-reversal
 * implementation (v2).
 *
 * Example:
 *   #define MY_FFT_USE_RECURSIVE
 *   #include "C_my_fft.h"
 * ========================================================================= */

/* -------------------------------------------------------------------------
 * Low-level versioned API (always available)
 * ------------------------------------------------------------------------- */

/* --- v1: recursive Cooley-Tukey --- */
void my_fft_1d_v1(my_complex *in, my_complex *out, size_t N, int sign);
void my_fft_forward_1d_v1(my_complex *in, my_complex *out, size_t N);
void my_fft_backward_1d_v1(my_complex *in, my_complex *out, size_t N);

void my_fft_2d_v1(my_complex *in, my_complex *out, size_t N0, size_t N1, int sign);
void my_fft_forward_2d_v1(my_complex *in, my_complex *out, size_t N0, size_t N1);
void my_fft_backward_2d_v1(my_complex *in, my_complex *out, size_t N0, size_t N1);

/* --- v2: iterative with bit-reversal (default) --- */
/* NOTE: my_fft_1d_v2 performs bit-reversal reordering on `in` before
 *       copying to `out`, so `in` is modified as a side-effect.          */
void my_fft_1d_v2(my_complex *in, my_complex *out, size_t N, int sign);
void my_fft_forward_1d_v2(my_complex *in, my_complex *out, size_t N);
void my_fft_backward_1d_v2(my_complex *in, my_complex *out, size_t N);

void my_fft_2d_v2(my_complex *in, my_complex *out, size_t N0, size_t N1, int sign);
void my_fft_forward_2d_v2(my_complex *in, my_complex *out, size_t N0, size_t N1);
void my_fft_backward_2d_v2(my_complex *in, my_complex *out, size_t N0, size_t N1);

/* -------------------------------------------------------------------------
 * Utilities (version-independent)
 * ------------------------------------------------------------------------- */
void my_fft_util_transpose(my_complex *in, my_complex *out, size_t N0, size_t N1);
void my_fft_util_print_complex_matrix(my_complex *matrix, size_t N0, size_t N1);

/* -------------------------------------------------------------------------
 * Generic aliases – resolve to the selected version at compile time
 *
 *   my_fft_1d        / my_fft_forward_1d  / my_fft_backward_1d
 *   my_fft_2d        / my_fft_forward_2d  / my_fft_backward_2d
 * ------------------------------------------------------------------------- */
#ifdef MY_FFT_USE_RECURSIVE
#define MY_FFT_VERSION_STR "v1 (recursive)"

#define my_fft_1d my_fft_1d_v1
#define my_fft_forward_1d my_fft_forward_1d_v1
#define my_fft_backward_1d my_fft_backward_1d_v1

#define my_fft_2d my_fft_2d_v1
#define my_fft_forward_2d my_fft_forward_2d_v1
#define my_fft_backward_2d my_fft_backward_2d_v1

#else /* default: iterative */
#define MY_FFT_VERSION_STR "v2 (iterative)"

#define my_fft_1d my_fft_1d_v2
#define my_fft_forward_1d my_fft_forward_1d_v2
#define my_fft_backward_1d my_fft_backward_1d_v2

#define my_fft_2d my_fft_2d_v2
#define my_fft_forward_2d my_fft_forward_2d_v2
#define my_fft_backward_2d my_fft_backward_2d_v2

#endif /* MY_FFT_USE_RECURSIVE */

#endif /* MY_FFT */
