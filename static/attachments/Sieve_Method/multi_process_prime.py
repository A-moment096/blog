"""
This file contians two main function for parallel computation of primes under number `n`, 
one using classical sieve method and another using 2-wheel method.

Both of two functions dependends on their own base impleemntation and worker function.
"""

import math
from concurrent.futures import ProcessPoolExecutor


def prime_lt_byte(n):
    if n < 2:
        return []

    sieve = bytearray(b"\x01") * (n + 1)
    sieve[0:2] = b"\x00\x00"

    for p in range(2, math.isqrt(n) + 1):
        if sieve[p]:
            start = p * p
            count = (n - start) // p + 1
            sieve[start : n + 1 : p] = b"\x00" * count

    return [i for i, is_prime in enumerate(sieve) if is_prime]


def _sieve_segment_byte(args):
    low, high, small_primes = args

    sieve = bytearray(b"\x01") * (high - low + 1)

    for p in small_primes:
        start = max(p * p, ((low + p - 1) // p) * p)

        if start > high:
            continue

        start_idx = start - low
        count = (high - start) // p + 1

        sieve[start_idx::p] = b"\x00" * count

    return [i + low for i, is_prime in enumerate(sieve) if is_prime]


def prime_lt_seg_byte_parallel(n: int, workers: int = 8):
    if n < 2:
        return []

    seg_len = math.isqrt(n)

    small_primes = prime_lt_byte(seg_len)
    prime_list = small_primes.copy()

    low = seg_len + 1
    tasks = []

    while low <= n:
        high = min(low + seg_len - 1, n)

        tasks.append((low, high, small_primes))

        low = high + 1

    with ProcessPoolExecutor(max_workers=workers) as executor:
        for primes in executor.map(_sieve_segment_byte, tasks):
            prime_list.extend(primes)

    return prime_list


import math
from concurrent.futures import ProcessPoolExecutor


def prime_lt_byte_2wheel(n: int):
    if n < 2:
        return []

    size = (n + 1) // 2
    sieve = bytearray(b"\x01") * size
    sieve[0] = 0

    for i in range(1, math.isqrt(n) // 2 + 1):
        if sieve[i]:
            p = 2 * i + 1
            start = 2 * i * i + 2 * i
            if start >= size:
                break
            count = (size - 1 - start) // p + 1
            sieve[start:size:p] = b"\x00" * count

    return [2] + [2 * i + 1 for i in range(1, size) if sieve[i]]


def _sieve_segment_byte_2wheel(args):
    low, high, small_primes = args

    low_odd = low if low % 2 else low + 1

    if low_odd > high:
        return []

    size = (high - low_odd) // 2 + 1
    sieve = bytearray(b"\x01") * size

    for p in small_primes:
        if p == 2:
            continue
        if p * p > high:
            break

        start = max(p * p, ((low_odd + p - 1) // p) * p)

        if start % 2 == 0:
            start += p
        if start > high:
            continue

        start_idx = (start - low_odd) // 2
        count = (size - 1 - start_idx) // p + 1
        sieve[start_idx:size:p] = b"\x00" * count

    return [low_odd + 2 * i for i, is_prime in enumerate(sieve) if is_prime]


def prime_lt_seg_byte_2wheel_parallel(n: int, workers: int = 8):
    if n < 2:
        return []

    seg_len = math.isqrt(n)
    small_primes = prime_lt_byte_2wheel(seg_len)

    prime_list = small_primes.copy()

    low = seg_len + 1

    tasks = []

    while low <= n:
        high = min(low + seg_len - 1, n)

        tasks.append((low, high, small_primes))

        low = high + 1

    with ProcessPoolExecutor(max_workers=workers) as executor:

        for primes in executor.map(_sieve_segment_byte_2wheel, tasks):
            prime_list.extend(primes)

    return prime_list


if __name__ == "__main__":
    big_n = int(1e8)

    primes = prime_lt_seg_byte_parallel(big_n, workers=8)

    print(len(primes))
