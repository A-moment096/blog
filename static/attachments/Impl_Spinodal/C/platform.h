#ifndef PLATFORM_H
#define PLATFORM_H

#ifdef _WIN32

#include <windows.h>
typedef LARGE_INTEGER bench_time_t;
static LARGE_INTEGER _bench_freq;
void bench_init(void) { QueryPerformanceFrequency(&_bench_freq); }
void bench_now(bench_time_t *t) { QueryPerformanceCounter(t); }
double bench_elapsed(bench_time_t *a, bench_time_t *b) {
    return (double)(b->QuadPart - a->QuadPart) / (double)_bench_freq.QuadPart;
}

#else

#define _POSIX_C_SOURCE 199309L
#include <time.h>
typedef struct timespec bench_time_t;
void bench_init() {}
void bench_now(bench_time_t *t) { clock_gettime(CLOCK_MONOTONIC, t); }
double bench_elapsed(bench_time_t *a, bench_time_t *b) {
    return (b->tv_sec - a->tv_sec) + (b->tv_nsec - a->tv_nsec) / 1e9;
}

#endif // _WIN32

#include "create_directory.h"

#endif // PLATFORM_H