---
categories:
# - Mathematics
- Programming
# - Phase Field
# - Others
tags:
- C++
- Data Structure
- Benchmark
- Note
title: "C++ Vector Memory Layout"
description: "Is the Memory of C++ Vector Containers Contiguous?"
date: 2025-05-27T09:53:29+08:00
image: /images/Bamboo_Reimu.jpg 
math: true
license: 
hidden: false
comments: true
draft: false
---

*Exploring the memory layout of the C++ `vector` container, and addressing some of my own doubts along the way*

*The header image was found online. I tried to trace its source but had no luck — a real pity. For the music, I picked a relatively light and clear-sounding piece, **Tears on Moss** (泪苔), which I feel matches the fresh, elegant atmosphere of the shrine in the header image. Hope you enjoy it.*

{{< music auto="https://music.163.com/#/song?id=26537200" loop="none">}}

## A Brief Introduction to `vector`

`vector` is a container template class provided by the C++ Standard Library. I won't go into detailed explanations of what containers, templates, or classes are here. Let's cut straight to the point: `vector` is essentially a better array. "Class" means it comes with some convenient built-in functions called "methods"; "template" means it needs to accept a type as a parameter to become a complete type, just as an array must specify what kind of things it holds. Finally, "container" means it is a specially optimized template class that shares certain methods and members with other containers, and there is a common set of algorithms that can be applied to them.

Compared to a traditional array, `vector` has several distinguishing features: first, it conforms to *RAII* (Resource Acquisition Is Initialization), meaning it automatically manages memory and automatically destroys itself when leaving scope, whereas traditional arrays don't quite satisfy the *RAII* condition. Second, `vector` is dynamically sized — you don't need to know its size at compile time; the program allocates memory automatically as needed. While the latter can also be achieved in C, for example with a pointer + `malloc` or pointer + `new` combination, such approaches require you to directly deal with raw pointers you've created yourself. One moment of carelessness can easily lead to memory leaks, so you have to be especially cautious. Lastly, compared to more basic data types like arrays, using `vector`'s built-in functions (methods) saves you from reinventing the wheel — it's simply more convenient.

Even though `vector` seems so nice, some people still worry that `vector` introduces additional runtime overhead. In particular, one might wonder: with memory obtained through arrays or pointer+`malloc` or pointer+`new`, I know for certain it's contiguous — what about `vector`? After all this wrapping, does it still have contiguous memory space? This article aims to explore that question.

## Why `vector` "Might" Be Less Efficient?

We're not going to dive into anything complex here, like allocators or memory scheduling mechanisms. We'll only give a brief explanation of how the pointer+`malloc`, pointer+`new`, and `vector` approaches obtain usable memory space.

But before we get into the specifics of the memory allocation process, let's first introduce a few concepts:

### Heap and Stack

When our compiled program runs, it needs to interact with the operating system, completing tasks through various system calls. The memory space required during the program's execution is also allocated by the system. Generally, the memory space allocated by the system is divided into two regions: one called the *heap* and the other called the *stack*. Note that these heap and stack do not directly correspond to the data structures — please treat them simply as names for memory regions.

When a program runs, the system pushes invoked functions one by one onto the call stack. The stack space operates on a last-in-first-out principle (which is also the origin of the name "stack"), and the variables needed by functions are pushed onto the stack as well. However, the stack is actually relatively small. If too many resources are placed on the stack, causing the stack space to run out, the program will experience what is known as a stack overflow. The good news is that the system isn't foolish enough to put everything into the precious stack space — when storing a large amount of content, that content can be stored on the heap instead.

Both the heap and the stack have memory allocation managed by the system. The difference is that the stack strictly follows last-in-first-out, has limited space, is only responsible for things like function calls, and resources are automatically reclaimed. The heap, on the other hand, is relatively large compared to the stack, and the resources inside don't need to follow any LIFO rule. However, when the program no longer uses the resources stored there, the system won't automatically reclaim them either — you must access these memory resources through pointers for reading or writing. So compared to stack space, using heap space requires more skill, at least when using more traditional approaches. There's a saying that describes the heap quite well: a garbage heap. If you can manage its contents well, it's very useful; otherwise, the system will end up with garbage left here and there, eventually becoming a true garbage heap. This is why one of the key skills in C/C++ programming is making good use of heap space.

So, how should we manage memory on the heap using the methods described above?

### The `malloc` Memory Allocation Approach

The traditional pointer+`malloc` approach works roughly like this: first, declare a pointer that doesn't point to any specific memory address (a null pointer); then use the parameter passed to `malloc` to determine how much contiguous space (a memory segment) to give starting from this pointer; finally, make the pointer point to the head of this memory segment, thus completing the memory allocation. The biggest feature of this method is that you don't need to decide the size at compile time — it "dynamically" allocates a block of memory via `malloc` and hands it over to the pointer for management. In programs written in C, this is basically how all runtime memory allocation is done.

This method of memory allocation was truly great when the C language emerged. However, it has many problems: first is the complexity of pointer operations. When using `malloc`, you must carefully manage the pointer that handles the memory resource. When memory is no longer needed, you must call the `free` function to release the resource, and after `free`, you must never access that resource again. Many program crashes are caused by pointers — either forgetting to delete resources that are no longer needed, or dereferencing null pointers or dangling pointers. Another issue is that memory allocated by `malloc` isn't really that dynamic: if you declare 100 bytes of memory, you get exactly and only 100 bytes of contiguous memory to use. If you actually use fewer than 100 bytes, the excess space is wasted — though that's not so bad; but if you have more than 100 bytes of data and try to fit it into a 100-byte memory segment, the excess gets truncated, meaning the extra part simply disappears. Finally, and most fatally, `malloc` is a very unintelligent function. It has no type (returns `void*`), doesn't call constructors, and requires you to manually calculate the number of bytes to allocate and pass it in. That's really bad news. And even if you're careful about resource declaration and usage, managing resources with raw pointers is cumbersome: you need to use functions like `memcpy` to manage memory, and these functions operate at a very fine-grained level, requiring the exact number of bytes to operate on. Being able to allocate memory at runtime is great, but it can feel a bit too troublesome.

Therefore, I'd rather say that using `malloc` for memory management is more suitable for "advanced users." Generally speaking, unless there's a very clear need, one wouldn't consider using the old-style `malloc` for memory allocation, especially in the C++ context we're discussing. So what about `new`?

### The `new` Memory Allocation Approach

Compared to `malloc`, `new` is smarter and better aligned with the C++ way of thinking. It automatically calls constructors, you don't need to manually calculate the amount of memory (the compiler calculates it for you), and it's strongly typed — the memory space it allocates has a clear type, not something ambiguous like `void*`. However, the "smartness" here only goes that far. The fundamental reason is still the use of raw pointers. Because you use a pointer, you must manually `delete` it when the resource is no longer needed (`malloc` uses `free` to release, `new` uses `delete` to release). This single point alone makes `new` not a particularly ideal approach either. It solves some pain points of `malloc`, but doesn't solve the most fundamental problem of using raw pointers.

Some friends might say: you mentioned raw pointers, but I remember the C++ standard introduced smart pointers in C++11. They are *RAII*-compliant wrappers for raw pointers, meaning they can automatically destroy and release resources when no longer in use. Why not use smart pointers to solve these problems?

Indeed, the introduction of smart pointers does effectively improve this issue. If you need to operate through pointers, switching to smart pointers is a genuinely good approach. But we just want a block of memory to store something like an array — using smart pointers might be a bit too heavyweight. Some people may prefer smart pointers and pointer-based memory management, but we won't go into detail about smart pointers here. So if both `malloc` and `new` aren't entirely satisfactory answers, can `vector` solve these problems?

### The `vector` Memory Allocation Approach

Let's give an affirmative answer first: Yes, `vector` is an excellent solution for **"I need a contiguous memory segment of unknown size."** In fact, `vector` may be even more useful than you expect. First, `vector` conforms to *RAII*, meaning we don't need to pay special attention to declared resources: these resources are automatically destroyed when they leave their scope. No more worrying about memory leaks, and no more worrying about null pointers and the like. Additionally, although `vector` actually puts resources on the heap, operating on a `vector` feels just like operating on the stack — it's far more intuitive than pointer operations. Finally, with `vector`, you don't need to worry about running out of space: when the space inside a `vector` is insufficient to accommodate new items, `vector` automatically increases its capacity to fit them. This operation is nearly imperceptible from the programming side: you can essentially treat `vector` as a container with infinite capacity — all you need to do is stuff things in, and that's it. Using `vector` is very intuitive and places a relatively small mental burden on the code author. After all, with such good encapsulation, you just keep pushing — no need to worry about extraneous issues, `vector` will take care of it for you.

Some might worry: does `vector` have no problems at all? Unfortunately, `vector` also needs to be used correctly, otherwise it can be very inefficient. This primarily manifests in `vector`'s automatic capacity growth. `vector`'s growth mechanism works like this: when capacity is insufficient, it multiplies the current capacity by 2 (or 1.5, depending on the implementation) to accommodate new items. That might not sound like a problem at first, but in practice, growing the capacity is a very complex and slow process. We'll dive deeper into this below. Also, is `vector`'s memory really contiguous? Is there a way to observe its memory layout? We'll also try using a program to print memory addresses to the screen later and see what it looks like. Finally, when you know for certain that you need a fixed-length memory region, `vector`'s automatic growth behavior may not be appropriate. In that case, you might prefer the modern wrapper for arrays, `std::array`, over `vector`.

Lastly, `vector` actually provides an object that is compatible with C's raw pointers: by calling the `vector::data()` method, you can obtain the raw pointer corresponding to `vector`'s memory segment. This makes it very convenient when you need fine-grained operations or compatibility with older APIs.

### Is Contiguous Memory Space Important?

We've been emphasizing "contiguous memory space" above. Some might wonder: is contiguous memory space really that important? The answer is yes: contiguous memory space effectively improves memory addressing speed, thereby increasing access and read/write speed. In fact, where there is contiguous memory space, there is naturally also non-contiguous memory space. If a memory segment is contiguous, it means that starting from the head of the memory segment, to access the 5th element you only need to offset the head pointer to the right (or some direction, depending on context) by 4 elements to reach that element. Typical data structures with contiguous memory include traditional arrays and the `vector` we're discussing here. Among data structures with non-contiguous memory, a very representative example is the linked list. Accessing the 5th element in a linked list requires starting from the head node, looking for the first node, then jumping to the second, and continuing such jumps until finding the fifth element. The advantage of a linked list is that it can utilize memory space to a greater degree because it is not constrained by the requirement for a *large contiguous memory segment* — the trade-off is that its addressing speed is much slower compared to arrays or `vector`.

From another perspective, this is also why `vector` *may* be inefficient. Because `vector` must guarantee contiguous memory, when it runs out of space, it needs to do the following:

1. Find a new address in memory that has a contiguous segment large enough to hold the old data and the incoming new data;
2. Copy the old data to the new address;
3. Append the new data after the old data.

The most time-consuming part of this process is the third step. Imagine a scenario where the operating system allocates memory to the program in a very fragmented manner, aiming for the highest possible memory utilization, such that the memory space only has segments of lengths 1, 2, 4, 8, 16, and 32, with their addresses far apart. Suppose you have a `vector` that currently only holds data of length 1 (and so has been allocated at an address of length 1). Now you want to add more data to it — say, you want to add 31 new elements, but due to some special checks along the way, the compiler can't optimize it and directly allocate a 32-length memory block for you.

Now, when you append the first element, `vector` will try to find a memory space larger than length 2. It finds the third block (of length 4). You append another element; this time `vector` finds that memory is insufficient, but since it can just expand in place, there's no need to find a new address — it simply declares the next two positions as used. Then you want to append three more elements. Now `vector` finds it's out of memory again. It locates the fourth block (length 8), copies the data from the third block one by one into the fourth block, and then appends the three new elements afterward.

See the problem? `vector`'s mechanism makes the compiler reluctant to hand over a big memory space directly to `vector` from the start. When you need to fill a `vector` with a large amount of data, letting it grow little by little like this is very time-consuming. The good news is that we can use `vector::reserve` to tell `vector` in advance roughly how much memory we need, so the compiler can find a sufficiently large space from the beginning. And this mechanism also serves as strong evidence that `vector` has a contiguous memory structure.

## Let's Have a Look at the Memory Structure

Now let's try using code to print out the memory addresses of the elements in a `vector`. We'll fill a `vector` with 5 elements and check the state of the `vector` each time we insert one:

```cpp
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v;

    for (int i = 0; i < 5; ++i) {
        // We use "push_back" push an element to the back of a vector
        v.push_back(i);
        std::cout << "Added: " << i
                  << ", Size: " << v.size()
                  << ", Capacity: " << v.capacity()
                  << ", Address of first element: " << &v[0] << '\n';
    }

    // Check contiguity
    std::cout << "Contiguous memory check:\n";
    for (size_t i = 0; i < v.size(); ++i)
        std::cout << "Address of v[" << i << "] = " << &v[i] << '\n';

    return 0;
}
```

The results are as follows:

```
Added: 0, Size: 1, Capacity: 1, Address of first element: 0x56041b4592b0
Added: 1, Size: 2, Capacity: 2, Address of first element: 0x56041b4596e0
Added: 2, Size: 3, Capacity: 4, Address of first element: 0x56041b4592b0
Added: 3, Size: 4, Capacity: 4, Address of first element: 0x56041b4592b0
Added: 4, Size: 5, Capacity: 8, Address of first element: 0x56041b459700
Contiguous memory check:
Address of v[0] = 0x56041b459700
Address of v[1] = 0x56041b459704
Address of v[2] = 0x56041b459708
Address of v[3] = 0x56041b45970c
Address of v[4] = 0x56041b459710
```

As we can see, when adding elements, `vector`'s `size` indicates how many elements the `vector` has, while `capacity` indicates how much space the `vector` still has. When space is insufficient, `vector`'s capacity doubles to accommodate new elements, and the position of the first element also changes. After all elements have been added, checking the addresses shows that these elements are contiguous in memory (an `int` is 4 bytes in size; note that hexadecimal is used, so `8` is followed by `c`, which is 12, and after `c` it carries over because it reaches 16).

This is a very simple little example, but it should be sufficient to illustrate `vector`'s memory structure.

## Let's Do a Benchmark

Perhaps a simple Benchmark can demonstrate how `vector`'s efficiency compares to a traditional array. Below, we initialize a `vector` and an array of the same size, perform a summation operation, and record the time taken.

```cpp
#include <iostream>
#include <vector>
#include <ctime>

const int SIZE = 10000000;

int main() {
    std::vector<int> vec(SIZE, 1);
    int* arr = new int[SIZE];
    for (int i = 0; i < SIZE; ++i)
        arr[i] = 1;

    // Benchmark vector
    clock_t start_vec = clock();
    long long sum_vec = 0;
    for (int i = 0; i < SIZE; ++i)
        sum_vec += vec[i];
    clock_t end_vec = clock();

    // Benchmark array
    clock_t start_arr = clock();
    long long sum_arr = 0;
    for (int i = 0; i < SIZE; ++i)
        sum_arr += arr[i];
    clock_t end_arr = clock();

    std::cout << "Vector sum: " << sum_vec
              << ", Time: " << (end_vec - start_vec) << " ticks\n";

    std::cout << "Array sum:  " << sum_arr
              << ", Time: " << (end_arr - start_arr) << " ticks\n";

    // Don't forget to delete[] the array!
    delete[] arr;
    return 0;
}
```

Let's first run it without optimization and try a few runs to see the results:

```bash
> g++ test.cpp -o test && ./test
Vector sum: 10000000, Time: 21530 ticks
Array sum:  10000000, Time: 16693 ticks
> ./test
Vector sum: 10000000, Time: 21059 ticks
Array sum:  10000000, Time: 16560 ticks
> ./test
Vector sum: 10000000, Time: 20729 ticks
Array sum:  10000000, Time: 15812 ticks
```

Now let's enable `O3` optimization and see the results:

```bash
> g++ test.cpp -o test -O3 && ./test
Vector sum: 10000000, Time: 2684 ticks
Array sum:  10000000, Time: 2122 ticks
> ./test                            
Vector sum: 10000000, Time: 4091 ticks
Array sum:  10000000, Time: 3686 ticks
> ./test
Vector sum: 10000000, Time: 3205 ticks
Array sum:  10000000, Time: 2813 ticks
```

It seems that without optimization enabled, the gap between the two methods is relatively noticeable, but once optimization is turned on, the difference is not large. However, the biggest advantage of using `vector` lies in the lower mental burden — you don't have to worry about strange memory issues. And if you use the `vector::at` method, it automatically performs bounds checking and throws an exception when out-of-bounds access occurs, preventing the program from running in strange, erroneous ways.

## Summary

I hope this short article helps you understand the characteristics of `vector`, or dispels any concerns you may have about its performance. `vector` is a great example of C++'s **Zero-overhead principle**. `vector` provides an abstraction of a dynamic array, implementing its features at the lowest possible cost, avoiding the introduction of excessive additional performance overhead, so that callers can use it with confidence without worrying about performance issues. If you're interested in zero-overhead abstraction, you can check out the [introduction on CppReference](https://en.cppreference.com/w/cpp/language/Zero-overhead_principle), which explains the specifics of this principle.

Of course, every time you use a new feature, there is always a tiny bit of overhead introduced. Perhaps you might consider putting in some extra effort to make the program run just a bit faster. There's nothing wrong with that in itself, but it should be noted: beware of premature optimization. If `vector` is not the critical part constraining your program's running efficiency (that is, the so-called *performance bottleneck*), then leave it alone for now. When the program hits that bottleneck and can only improve performance by optimizing the data structure, then consider changing `vector` to another container or data type — that might be a more pragmatic approach.

Of course, if there's any issue with this short article, please point it out directly. I'm not formally trained in CS either — writing this note is purely for recording my learning process. Discussions and exchanges are welcome. Roasting by experts is also welcome, though gentler would be nicer.

As always, I wish you good health, both physically and mentally.
