---
categories:
- Phase Field
- Programming
tags:
- C
- Fourier Spectrum
- Fourier Transformation
- FFT
- Spinodal Decomposition
- Numerical Analysis
title: "Phase Field Simulation, but in Many Languages IV"
description: Semi-implicit Fourier spectral method!
image: /images/Alice-2.png
imageObjectPosition: center 20%
date: 2026-06-22
math: true
---

*When talking about programming, a little earlier on almost everyone would mention the C language. In this installment, let's try the C language that we used in a previous bonus chapter! Use it to run spinodal decomposition~*

*To maintain the consistency of the series, we once again chose the header image from last time: AI Alice drawn by [Neve_AI](https://x.com/Neve_AI). The song choice is [CINEMA](https://www.bilibili.com/list/ml1197098078), recently (...) uploaded to Bilibili by [Ayase](https://space.bilibili.com/400813602/) and sung by Hatsune Miku. A song with a very Ayase flavor, also considered a generation-defining hit — hope you enjoy it~*

{{< music auto="https://music.163.com/#/song?id=2623131352" loop="none">}}

## An Ancient Legend...

To some extent, the C language has become synonymous with traditional programming: complex and enormous codebases, sprawling dependencies, powerful memory control capabilities, and C language gods in every corner... One must admit, even if the C language is not the oldest high-level programming language, it is certainly the most well-known among traditional programming languages. So, why is it so famous? This inevitably brings us to the operating systems of modern computers.

### A Failed Attempt

In 1960s America, the development of computer operating systems was in full swing. At that time, the large-scale operating system project *Multics* (*Multiplexed Information and Computer Services*), jointly developed by Bell Labs, MIT, and General Electric, was advancing[^1]. The Multics project had many innovations: it was a time-sharing operating system, implemented single-level storage, and supported dynamic linking[^2] [^3] [^4]. At the time, Multics planned to use an unimplemented language, PL/I, for development, and in 1969, Doug McIlroy and others implemented TMG, a high-level programming language, and successfully used it to implement a PL/I compiler.

However, perhaps due to chaotic project management, or perhaps because the technological level at the time could not smoothly advance this project, in that very year, Bell Labs' management and staff felt the project lacked prospects and withdrew one after another[^1] [^3] [^4], and the project thus failed. Among those who withdrew from the project were Ken Thompson, Dennis Ritchie, Douglas McIlroy, Joe Ossanna, and others. They turned to attempt a more compact operating system project. To contrast with Multics, they named the new project *Unics*, i.e., *Uniplexed Information and Computing Service*[^3]. Compared to Multics, Unics was not a time-sharing operating system, but it also absorbed many lessons learned from Multics. Subsequently, the name Unics was changed to the phonetically similar *Unix*[^2] — this was the birth of Unix.

### The Birth of Unix

In the summer of 1969, Ken Thompson's wife took their newborn baby to the grandparents' home, giving him four weeks of free time. In those four weeks, he implemented a kernel, shell, editor, and assembler on a PDP-7, an old piece of equipment — this was the first generation of Unix[^4]. The process of implementing these features was also quite legendary: he did not program directly on the PDP-7, but first cross-compiled on a GE-635 to produce paper tape readable by the PDP-7. The paper tape recorded an assembler usable by the PDP-7. After that, assembly could be used on the PDP-7 to develop various utility tools, and subsequent development work could proceed directly on the PDP-7[^1].

However, the PDP-7 was not a good platform, and developing in assembly was no easy task. Not long after the initial run on the PDP-7, TMG, the language used to implement the PL/I compiler, was implemented, and subsequently the PL/I compiler used by Multics was also developed. But the PL/I language did not suit the taste of the Unix developers, and the failure of Multics, which was developed with it, made Ken Thompson determined that Unix must have its own system programming language[^1].

### B Language, and NB

After an unsuccessful attempt to compile a Fortran compiler using TMG, Ken Thompson implemented a more compact programming language compiler based on BCPL, calling it the B language. (According to Ritchie, *it's BCPL squeezed into 8K bytes of memory and filtered through Thompson's brain.*)[^1] Ken Thompson used it to replace assembly language on the PDP-7, making it the system programming language of Unix. B and BCPL were similar in many ways — for example, both were typeless languages. But the B language added some useful features, such as the `++`, `--`, `+=` operators, etc., and B did not allow defining new procedures (now called *functions*) within a procedure[^1].

However, the B language also had its problems, especially when they tried to port Unix from the PDP-7 to the PDP-11 — these problems were exposed. The word length of the PDP-11 was 16 bits, while the PDP-7 on which Unix was originally developed was 18 bits, meaning the length of one word on the two machines was not equal. And the B language was word-addressed rather than byte-addressed, and all data was treated as a single *cell* — there was no so-called character type (*char*), only strings stored entirely within a cell. This made it difficult for the B language compiler to handle individual characters. Additionally, floating-point calculations on some older machines just barely fit into one word because the word length was relatively long, but this no longer applied to the PDP-11 with its shorter word length. There was also the pointer problem: the B language inherited BCPL's pointer model, which moved in units of words, not bytes. This worked fine on machines where words were the address unit, but on the PDP-11, which was byte-addressed, additional operations were needed to convert word addresses to byte addresses[^1].

Overall, the main problem was that the B language, with the *word* as its fundamental unit, was no longer suitable for processors with different word lengths. To address this, Dennis Ritchie began adding a character type to the B language in 1971 and rewrote the B compiler to generate machine code on the PDP-11, rather than the previous threaded code, a type of compressed code requiring further interpretation to run. Dennis Ritchie called the slightly modified B language NB, meaning *new B*[^1] [^5] (意味深).

### From NB to C

NB later gained some additional features, such as a type system (`int`, `char`, arrays, pointers, etc.). Later, during Dennis Ritchie's experiments, he found that this version of NB was inconvenient for creating composite data structures, so he further introduced the `struct` structure. He also gave NB a complete type system, supporting pointers to arrays, arrays of pointers, functions, and other complex types, and the way of using a variable of such a type happened to be the same as the way of declaring that variable.

After acquiring all the above new features, Dennis Ritchie decided to give this language a single-letter name — this was the beginning of the C language. Between 1971 and 1973, the C language was continuously improved and could be ported to other machines. In 1973, the Unix system was successfully rewritten in C, marking the C language's success as the system programming language of Unix and making the Unix operating system a portable operating system. Later, *The C Programming Language*, co-authored by Dennis Ritchie and Brian Kernighan, was published in 1978, and the C language thus had a reference standard[^1] [^4] [^5].

### ANSI C, and Beyond

Subsequently, the C language continued to develop. ANSI (American National Standards Institute) released the ANSI C standard in 1989, adding keywords such as `volatile`, `enum`, `void`, and `const`, becoming the C89 version. ISO (International Organization for Standardization) also accepted the ANSI C standard in 1990, known as C90, and all subsequent versions were named after the last two digits of the year. C95 added wide character support and made some changes to stream IO, while C99 added many new features, such as the `bool` type, `long long` type, `inline` modifier, using `//` to open comments, etc., becoming the so-called *Modern C*, and this is also the most widely supported C language standard.

The C language continues to develop to this day. The recent C23 standard, while deprecating many features (such as `ctime`), added many new language features, such as attribute specifiers (`[[deprecated]]`, `[[noreturn]]`), digit separators, new preprocessor directives, the addition of the `nullptr` constant and `nullptr_t` type, and making `true` and `false` keywords, etc.

Meanwhile, the C language also accompanied the Unix operating system as it traveled far and wide. To do Unix system development, one absolutely cannot avoid the C language, and programmers not doing system development have also more or less written some C code. Much modern infrastructure is written in C (such as the famous Python, whose "standard interpreter" is *CPython* written in C). Countless university students also have to learn C during their undergraduate studies, under the noble pretext of improving skills and learning programming thinking. The C language has become an indispensable part of modern computer science.

## A Quick Tour of C

This series has already introduced so many languages, and by comparison, C's syntax rules seem like some kind of prototype for these languages. One could even say that later languages have all more or less borrowed from C's syntactic features. JavaScript, for instance, explicitly and intentionally made its syntax close to C, and C++ even more so — it grew out of C (though it's now hard to say, given how many new things it has). And then there's Java, Objective C, Swift, and so on.

So, in that case, why introduce its syntax again? Precisely because the C language is *simple*. I believe the following few small examples will already let you happily write some C code.

### Comments

The C language has two commenting styles: using `//` double slashes to open a line comment, commenting out everything after it on that line, and using `/* ... */` block comments to comment out arbitrarily much content in between, supporting multi-line. Flexible comments allow us to play many tricks, but it's generally recommended to use block comments at the file header and line comments within the code.

### Data Types

C's basic data types are especially simple. Character `char`, integer `int`, unsigned integer `unsigned`, single/double precision floating point `float` and `double`, Boolean type (though added later) `bool` — without considering special (extended) data types that specify bit widths, these are almost all of C's basic data types. One could say it's very simple, even crude.

On top of the basic data types, we can further extend them, such as *pointers* and *arrays*. Pointers are used to point to addresses holding variables of that type, while arrays are fixed-length groups of data of the same type. For example, an integer pointer's type can be written as `int*`, and a character array can be written as `char variable[N]`. We can also add some modifiers, such as `const`, `volatile`, etc., to hint to the compiler that the variable will not change during code execution or may be modified by external programs. Through their combination, you can compose very complex data types.

However, overly complex data types hinder use and reading, so C supports using *structures* `struct` to create complex data types, or using the `typedef` keyword to give complex types new names. Through structures we can more conveniently manage compound data, and `typedef` can make code clearer. But of course you can also hand-parse C's data types; if you're interested in this topic, welcome to check out this earlier article: [How to Parse C/C++ (Relatively) Complex Types?](/posts/Simple_Type_Parsing).

You may have noticed that *string* is missing from the data types above. This is because in C, a string is actually a character pointer terminated by `\0`. This is somewhat of a historical legacy, but from another angle, it's also a characteristic of C: many special rules exist, and familiarity with them is needed to write better C code. We'll learn more later.

### Variables and Functions

With data types, we naturally want to know how to define a variable. Actually, the earlier data type section already gave some hints — for example, `char var[N]` is a string array of length `N` with the variable name `var`. Although it's somewhat inaccurate to say so, generally speaking, C variable declarations follow `type name;`, and when declaring a variable, you can also directly initialize it with an equals sign: `type name=init_val;`. If considering pointers, arrays, and complex modifiers, as far as C's design goes, variable declarations follow *declare as you use*. For instance, if we want to declare a pointer to an integer, we use `int *var;` to declare this pointer, meaning that if we later use `*var`, we will get an `int`.

This rule becomes even more apparent when we add functions. In C, we can forward-declare a function, such as `int my_func(int a, double b);`, which declares that we have a function named `my_func` that accepts an integer and a double-precision float as parameters and returns an integer value at the end. If our function returns no value, we can use `void` to indicate that the function has no return value. While declaring, we can also, instead of ending the statement with a semicolon, use curly braces to open a code block to define the function. Since everything in C is passed by value, if we don't want to copy, or want the function to be able to modify the value of an external variable, we can have the function accept a pointer rather than a value as a parameter. This way, without modifying the address, we can directly modify the value at that address, thus changing the value of the external variable. This point, I think, also reflects C's philosophy of *using all available tools*.

Why is the variable declaration rule related to functions? Because in C, calling a function is also like declaring it: `my_func(42,11.4514)`. One can see that after calling the function this way, it will return, or yield, an `int` value. Additionally, although functions and variables in C have extremely obvious differences, we can declare pointers to functions, such as `int *p_func(int, double)`, at which point `p_func` can point to a function, and `*p_func` is equivalent to the function name of the pointed-to function, which can later be called with parentheses in the usual way. From this angle, it even more clearly demonstrates C's rules about variable declarations.

Finally, it's worth noting that a C program always starts execution from a special function `main`, which can also be said to be the program's entry point. This is something that some scripting languages, such as Python and JavaScript, do not have. Moreover, in C, you can only call functions that have been declared earlier — this differs from JavaScript, which allows calling before declaring/defining.

### Control Statements

For a complete programming language, besides variable and function definitions, mastering the writing of control flow statements is equivalent to mastering the basic usage of the language. This is especially true for C. In C, loops can be implemented using the `for` statement: `for(decl;cond;post){...}` defines a `for` loop, where the parentheses contain three statements: the declaration before the loop, the condition for continuing the loop, and the processing at the end of the loop, and the braces contain what to do in the loop. Many programming languages have this same syntax — it's hard not to think they all borrowed from C's syntax. Besides the `for` loop, there are also `while` and `do while` loops, whose syntax is also similar to many other languages, so we won't elaborate here.

In addition to loops, judgment statements are usually needed. Besides the basic `if (cond) {...} else if(cond2) {...} else {...}` syntax, C also has the `switch case` statement and the ternary operator `cond?yes-do:no-do`. However, the latter two are generally not recommended nowadays due to weaker readability and proneness to issues. But overall, the `for` loop and `if else` statement can already solve C's looping and judgment problems — no fancy iterators or the like, syntactically very clear.

### Other

With the above content, theoretically we can already write any desired C code. But complete C programs often need some preprocessor directives, which typically start with `#`. The most basic ones include `#include`, used to *copy-paste* the content of some file to replace the content here (actually most often used to include system or user header files), and `#define`, used to define macro commands. Macros hold a very special position in C programming — they can perform text substitution during the preprocessing stage, allowing some complex and repetitive commands to be simply replaced through several macros, reducing the burden. They can also be used as some kind of compilation switch to enable certain language features or functionalities.

### Summary

After all this rambling, in summary, C's syntax rules are not cumbersome. It's just these few most basic rules that allow programmers to achieve many desired goals. However, the above are only the most basic syntax rules. To use this language, one also needs to master the usage of many standard library functions, and because C's abstraction level is close to the hardware, some knowledge of program execution processes is also needed to better write C code. All of this makes C very difficult to master. In the author's personal opinion, C is not a particularly good choice as an introduction to programming: there are languages like Python with more approachable syntax and easier usage. But to write good programs, C is still recommended to learn — its simple (crude) syntax better helps people understand what is really happening behind the scenes.

Returning to the theme of this series, how do we use C to run spinodal decomposition? Can such an ancient language allow us to conveniently implement a spinodal decomposition simulation?

## C Implementation

The answer is naturally affirmative, and in fact we already gave the answer in the previous installment: we will use the *semi-implicit Fourier spectral method* (hereinafter referred to as the Fourier spectral method) to solve the spinodal decomposition problem. In the bonus chapter of the previous installment: [Fourier Full Course](/posts/Impl_Spinodal_Fourier), we already introduced Fourier series, discrete/continuous Fourier transforms, fast Fourier algorithms, and more, and we even implemented a simple butterfly algorithm for the fast Fourier transform ourselves. Naturally, we will use it in this installment.

However, new method, new atmosphere — let's first examine the spinodal decomposition problem in the context of the Fourier spectral method.

### Problem Restatement

As before, we have the simplified evolution equation:

$$ \frac{\partial c}{\partial t} =  M \nabla^2\left( 2Ac(1-c)(1-2c)-\kappa\nabla^2c\right), $$

In case you've forgotten, the variable we need to solve for is $c$, i.e., concentration, while $M$, $A$, $\kappa$ are all known material-related constants, $t$ is naturally time, and $\nabla^2$ is the Laplacian operator, which can be understood as taking the second spatial derivative.

To solve this partial differential equation, we previously used the finite difference method to discretize the grid and compute the result of the Cahn-Hilliard equation, and used the forward Euler method to handle the time derivative. This time, however, we plan to use the Fourier spectral method to solve this problem. That is, we first transform the equation into Fourier space, converting derivatives into multiplications in Fourier space, perform arithmetic operations in that space to obtain the expression of the unknown variable in Fourier space, and then transform the equation back to the original space to obtain the solution of the equation. This equation has a time partial derivative and a second-order spatial derivative. Here we choose to still use the Euler method to handle the time derivative (we don't have a particularly good method in the time domain), and let the Fourier transform handle the spatial derivative process.

Thus, we have the following plan:

1. Perform a Fourier transform with respect to space on both sides of the equation (denoted as $\{\cdot\}_{\mathbf{k}}$ after transformation):
   - On the left side, since the spatial transform is independent of time, we obtain the time derivative of the transformed concentration $$\frac{\partial \{c\}_\mathbf{k}}{\partial t};$$
   - On the right side, due to the linearity of the Fourier transform, transforming from outside in, $\nabla^2 F$ is transformed to $\mathbf{k}^2 \{F\}_\mathbf{k}$:
   $$ - M \mathbf{k}^2 \left(\{2Ac(1-c)(1-2c)\}_\mathbf{k} + \kappa \mathbf{k}^2 \{c\}_{\mathbf{k}} \right);$$
2. Rearrange the equation to obtain the expression for $\{c\}_{\mathbf{k}}$;
3. Perform the inverse Fourier transform to obtain the concentration result in the original space.

This plan is pretty good, until we have to deal with $2Ac(1-c)(1-2c)$. Such a product, under Fourier transform, becomes a convolution. And convolution requires traversing the entire grid during computation, which actually slows things down. How to solve this? This is where the so-called *pseudo-spectral method* comes into play. When computing the Fourier transform, instead of transforming this part term by term, we compute the overall result in the original space first and then perform the Fourier transform. This way, we can nicely solve the problem of $2Ac(1-c)(1-2c)$ becoming a convolution that's hard to compute. Thus, before our step 1, we can add:

0. Compute $2Ac(1-c)(1-2c)$, and when performing the Fourier transform, transform it as a whole into Fourier space.

This way, we can write the code according to this plan!

### Savoring the Fourier Pseudo-Spectral Method

The Fourier transform libraries we will use, besides the renowned FFTW, naturally include our own MyFFT. The code for MyFFT is placed [here](/page/attachments) — you can download it and compile it yourself. Let's first try using our own version. The source code is placed here: [platform.h](/attachment/Impl_Spinodal/C/platform.h), [create_directory.h](/attachment/Impl_Spinodal/C/create_directory.h), and [C_impl_fft_v1.c](/attachment/Impl_Spinodal/C/C_impl_fft_v1.c).

Huh? Why so many files this time? The main reason is that we want some APIs to be cross-platform. Hence the `platform.h` file, which contains some platform-related code. And going a step further, since the operation of opening a folder differs somewhat across operating systems and desktop environments, we give it a separate header file, namely `create_directory.h`. These two files only provide two convenient tools: one for timing and another for opening folders; they do not contain core computation logic. We won't examine them in detail here. Let's look directly at the main logic.

#### Mysterious File Header

```C
#include "platform.h"

#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define M_PI 3.14159265358979323846 /* pi */
#define TRUNCATE_REAL 1e-6

#define OUTPUT_VTK // whether output the vtk files
#define MY_FFT_USE_RECURSIVE // whether use the recursive version of fft
#include "C_my_fft.h"
// my_fft_forward_2d(in,out,N0,N1) = fftw_plan_dft_2d(N0,N1,in,out,FFTW_FORWARD,_)
// my_fft_backward_2d(in,out,N0,N1) = fftw_plan_dft_2d(N0,N1,in,out,FFTW_BACKWARD,_) / (N0*N1)
```

First, as usual, we include some header files. Among them, `<math.h>` is naturally the mathematical function library, `<stdio.h>` is of course input/output. More interesting are the two header files `<stdlib.h>` and `<string.h>`. The former is for using `malloc`, `free`, and other memory operations — quite reasonable, as memory operations pair well with the name `<stdlib.h>`. But interestingly, `<string.h>` is also introduced for memory management. The `mem*` family of functions, such as `memcpy` that we use, are included in `<string.h>` rather than in `<stdlib.h>`.

Why is that? Behind this lies the relationship with the `string` type. C does not have a `string` type; what people commonly call `string` is actually a sequence of characters in C, which can use an array or a pointer to the beginning of the string. Because operating on strings in C is equivalent to operating on a contiguous block of memory, functions for operating on contiguous memory blocks were simply all placed in `<string.h>`. One must admit, very hacker-esque style.

Next, we use `#define` to define some macros. The most eye-catching is perhaps `M_PI` — we manually defined the value of $\pi$. A natural question may arise here: why does a mathematical constant like $\pi$ need to be manually defined by us, rather than being automatically imported after `#include <math.h>`? The reason is a bit hard to evaluate: `<math.h>` indeed has these mathematical constants, even in multiple versions, covering double precision and single precision. But enabling them requires using feature macros — that is, before `#include`-ing them, certain macros must be defined to enable certain features. However, the irritating thing is that we don't need that many features. We only need the most basic, the oldest-of-old mathematical functions that any version should define, plus one little $\pi$. So, in that case, why not just define it ourselves? Hence, I copied this constant from `<math.h>`. Though from a certain angle, the correct approach is actually to define the feature macros through compiler directives at compile time to enable these features. But doing it that way would make the IDE act up. Consider it a compromise approach.

Next, we defined a certain truncation value. This value is used for numerical truncation — when the concentration is abnormal and exceeds the $[0,1]$ interval, we truncate it. Temporarily set to `1e-6`, a relatively small value.

Next, we define some of our own feature macros. Feature macros act during the compilation process — if certain macros are enabled, the compiled product will have those features. This characteristic of macros allows us to do selective compilation, especially for version selection switches, choosing how to specifically implement certain functions, etc. We're learning and applying here too. Finally, we include our self-implemented FFT header file, and the header file setup is complete.

#### Still Defining Functions First

As always, we need to define several functions to assist later calculations. First, naturally, is the $2Ac(1-c)(1-2c)$ mentioned in the earlier steps — we make it into the function `df_dc`:

```c
double df_dc(double A, double c) {
    return 2.0 * A * c * (1.0 - c) * (1.0 - 2.0 * c);
}
```

Truly the most boring example ever. However, the following `write_VTK` is more interesting. As before, we plan to output results in the *VTK* format, but since the data we need to pass in are complex numbers, we need some special handling. The definition of this function is as follows:

```C
void write_VTK(my_complex *con, size_t N0, size_t N1, const char *folder_path, size_t istep, double dx) {
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
```

Since C lacks modern string handling functions, we need to use the relatively primitive `strlen` to first compute the string length, and then use `malloc` to dynamically allocate a string to hold the file's full path. It's worth noting that our implementation contains some magic numbers: `6` and `1`, etc. The `6` means we will output the time step as a 6-digit zero-padded integer, and the `1` is for the `\0` at the end of the string, because `strlen` does not count the `\0` at the end of the string, but a valid string needs it. This is another thing many C users complain about: why must `\0` be used to denote the end of a string... I also don't quite understand.

Also worth noting is that immediately after using `malloc`, we use `if` logic to check whether the memory allocation was successful. Here, `!file_name` is a common idiom — when we successfully allocate memory, `file_name` should be some specific address value. Applying logical NOT to it first converts this value to a Boolean type, i.e., `true`, and then performs logical NOT. In simple summary: when memory is successfully allocated to an address, the implicit conversion result of the pointer name is `true`. When such an unfortunate event occurs, we have the system throw an error message, and then use `exit` to end the program with some error code. Note that when the program exits normally, it returns `0`, while abnormal execution results return non-`0` values — the programmer can define the meaning of exit codes as needed to help locate the cause of errors.

Next, we need to concatenate strings. There are several methods available; we adopted `snprintf`, outputting the result to the string `file_name` through formatted output, while also specifying the number of characters to write. The advantage of `snprintf` is that it can use C's string formatting — for example, `%s` represents a string, and `%06zu` represents an unsigned integer type variable padded with leading `0` to the specified number of digits.

After these tasks are completed, we obtain a usable file path, and at this point we turn to the file abstraction `FILE` provided by C. `FILE` is a struct; we usually use it to open a file, and a pointer of type `FILE` is responsible for managing this file. When opening a file, we need to specify the file opening mode via the second parameter of `fopen` — we want to write to the file, so we use `"w"`. After opening the file, we immediately release the now-unneeded `file_name` variable, and then use the same technique to check whether the file was successfully opened by judging the state of the `f` pointer.

Next, we can write content to the file. `fprintf` is responsible for outputting strings to the file in this way. What's noteworthy here is the formatted output of numbers — `%04.1f` means the output result has 4 digits total, 1 digit after the decimal point, and insufficient parts are padded with `0`. Since what we need to output are floating-point numbers, we need to first convert from `size_t` type to `double` before proceeding.

Finally, we close the file. This step has a similar role to `free`, but `fclose` is specifically designed for files.

So at this point, we have set up two helper functions. Next comes the main logic.

#### Then Setting Constants

After much longing, we finally arrive at the moment of implementing this algorithm. But still, as usual, we set up several constants and several things to be used later:

```C
int main(void) {
    const double total_time = 100., dt = 5. * 1e-3; // 100 seconds, compute per 0.005 seconds; 1e-2 is instable!

    const size_t num_total_output = 100,                     // need 100 results
        num_total_compute = (size_t)(total_time / dt),       // auto-compute total computation steps
        output_every = num_total_compute / num_total_output; // auto-compute output interval

    const size_t N = 64, N_full = N * N;

    const double dx = 1.0;
    const double A = 1.0, M = 1.0, kappa = 0.5;

    const double c_min = 0.395, c_max = 0.405; // c_0 = 0.4, delta_c = 0.005

    const char *output_directory_path = "./output/v1/";
    if (create_directories(output_directory_path) != 0) {
        perror("failed when creating directory");
        exit(1);
    }
    /* ... */
}
```

However, this time we made a small modification to the time control. In the past, we controlled the total simulation duration by setting the total number of time steps and the time step output interval. But here we adopt a more scientific approach: $$
\text{total time} / \text{time step} = \text{total number of time steps}$$ to control the entire computation process, and the output approach also changes from specifying output every how many steps to specifying how many total results we want to output. I believe that after consulting the code, you will very quickly understand what the entire computation logic looks like.

After setting the simulation parameters, choosing the folder path where we want to output (due to the limitations of our function, a `/` must be added at the end to separate from the file name — so be it ()), and then using `create_directories` to create this folder, judging whether creation was successful by the return value, we have completed the simulation output preparation.

Next, we initialize the grid and timer:

```C
    /* ... */
    my_complex *con = alloc_complex(N_full); // alloc_complex is zero-initialize
    for (size_t i = 0; i < N_full; i++) {
        double uniform_rand_0_1 = (double)rand() / ((double)RAND_MAX);
        con[i][0] = c_min + uniform_rand_0_1 * (c_max - c_min);
    }

    my_complex *con_trans = alloc_complex(N_full);
    my_complex *mesh_df_dc = alloc_complex(N_full);
    my_complex *mesh_df_dc_trans = alloc_complex(N_full);

    bench_init();
    bench_time_t t_start, t_end;
    bench_now(&t_start);
    /* ... */
```

We have a convenient function that can quickly allocate a complex array of the needed length and zero-initialize both the real and imaginary parts of each element of the array. Then we need to use the `rand()` function to generate noise. Regarding `rand()`, many people express that its random number generation method may not match their needs, and some suggest using rejection sampling to improve random number quality. However, we only need to generate a real number in $[0,1]$ — subsequent operations can be performed on the generated result, so our problem is not that complicated. Simply divide by the maximum value that the `rand()` function can possibly produce, and the result after division is guaranteed to be a real number uniformly distributed from $0$ to $1$.

Later, we also defined several more arrays, which are intermediate variables to be used later in the computation: `con_trans` for storing the Fourier-transformed concentration; `mesh_df_dc` for storing the computed grid of `df_dc`, and its `*_trans` version is naturally the Fourier-transformed result.

Before entering the main loop, we use our self-written timer to prepare for timing the computation process. After all this ceremonial preamble, we finally arrive at the true computation flow.

#### Come! Spectral Method!

Talk is cheap, I'll show you the code:

```C
for (size_t istep = 0; istep <= num_total_compute; istep++) {
        my_fft_forward_2d(con, con_trans, N, N);
        // fill/refill mesh_df_dc
        for (size_t i = 0; i < N_full; i++) {
            mesh_df_dc[i][0] = df_dc(A, con[i][0]);
        }

        // get transformed mesh_df_dc
        my_fft_forward_2d(mesh_df_dc, mesh_df_dc_trans, N, N);

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

                my_complex neg_k2_df_dc, kappa_neg_k4_c;

                neg_k2_df_dc[0] = -1.0 * k2 * mesh_df_dc_trans[k_pos][0];
                neg_k2_df_dc[1] = -1.0 * k2 * mesh_df_dc_trans[k_pos][1];

                kappa_neg_k4_c[0] = -1.0 * kappa * k4 * con_trans[k_pos][0];
                kappa_neg_k4_c[1] = -1.0 * kappa * k4 * con_trans[k_pos][1];

                // con_trans += dt * (k2_term + k4_term)
                con_trans[k_pos][0] += dt * M * (neg_k2_df_dc[0] + kappa_neg_k4_c[0]);
                con_trans[k_pos][1] += dt * M * (neg_k2_df_dc[1] + kappa_neg_k4_c[1]);
            }
        }

        my_fft_backward_2d(con_trans, con, N, N);

        if (istep % output_every == 0 || istep == num_total_compute) {
            printf("output steps: %zu\n", istep);
#ifdef OUTPUT_VTK
            write_VTK(con, N, N, output_directory_path, istep, dx);
#endif
        }
    }
```

First, we can see that the setup of the main loop (time loop) differs from before. Previously, our termination condition used `istep < num_total_compute + 1` to also output the final step; this time we use the more appropriate `istep <= num_total_compute` — same effect, but semantically clearer.

Entering the time loop, the first step is to use our packaged function to compute the Fourier transform:

```C
    for (size_t istep = 0; istep <= num_total_compute; istep++) {
        my_fft_forward_2d(con, con_trans, N, N);
        // fill/refill mesh_df_dc
        for (size_t i = 0; i < N_full; i++) {
            mesh_df_dc[i][0] = df_dc(A, con[i][0]);
        }

        // get transformed mesh_df_dc
        my_fft_forward_2d(mesh_df_dc, mesh_df_dc_trans, N, N);

        for (size_t j = 0; j < N; j++) {
            /* ... */
        }
        /* ... */
    }
```

However, if you use an IDE to open this C source file, you may find that the `my_fft_forward_2d` we use here is not colored as a function, but as a *macro*. Why is this? Because we use macros to wrap the functions we actually wrote. Remember the very first line `#define MY_FFT_USE_RECURSIVE`? This macro causes the function calls in the header file `C_my_fft.h` to all use functions with the `_v1` suffix, i.e., using the recursive algorithm to compute the Fourier transform. Another "benefit" of this approach is that we can hide the function parameter list (what kind of benefit is this...).

Also worth noting is that this time we use `my_fft_forward_2d`, rather than `my_fft_forward` twice. It's actually roughly equivalent to doing two 1D transforms, but once in the $x$ direction and once in the $y$ direction.

However, our `my_fft_forward` can only transform in one direction of a matrix. Therefore, when doing the second transform, we need to transpose the matrix:

```C
/* From C_my_fft.c */
void my_fft_2d_v1(
    my_complex *in,
    my_complex *out,
    size_t N0,
    size_t N1,
    int sign) {

    // N0 and N1 must be power of 2
    // row major: [i,j] = j+i*N0
    size_t N_full = N0 * N1;

    // transform row first
    my_complex *row_transformed_in = (my_complex *)malloc(sizeof(my_complex) * N_full);
    if (!row_transformed_in) {
        free(row_transformed_in);
        return;
    }
    for (size_t i = 0; i < N_full; i += N0) {
        my_fft_1d_v1(&(in[i]), &(row_transformed_in[i]), N0, sign);
    }
    // then transform column

    // perform inplace transpose from row-major to column-major
    my_fft_util_transpose(row_transformed_in, row_transformed_in, N0, N1);

    for (size_t i = 0; i < N_full; i += N1) {
        my_fft_1d_v1(&(row_transformed_in[i]), &(out[i]), N1, sign);
    }

    my_fft_util_transpose(out, out, N1, N0);

    free(row_transformed_in);
    return;
}
```

This way, we can perform a 2D Fourier transform on the data — don't forget to transpose back at the end.

Next is point-by-point processing. However, after entering each point, our first operation is not computation, but some judgments and assignments:

```C
        /* ... */
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
                /* ... */
            }
            /* ... */
        }
```

Why? This is also a small pitfall of using the Fourier transform. The computation result of FFT is not stored in order of increasing frequency, but has a special layout:

```
[ zero frequency, positive frequency, negative frequency ]
```

And within each segment, the order is increasing. Such a computational result is designed for computational convenience (the Cooley-Tukey algorithm automatically produces this data layout), but it is not very suitable for our numerical computation, because the frequencies corresponding to its results need to be recomputed. Fortunately, this computation process is very simple: we just need to rearrange the result layout to:

```
[ negative frequency, zero frequency, positive frequency ]
```

That's it. If it's a 2D result, then do this transformation in both directions. This is where our initial `fi` and `fj` come from — they are temporary frequencies used for calculating the frequency.

Then, for the frequency calculation part, according to the formula:

$$ \mathbf{k} = \frac{2\pi \mathbf{n}}{N * \Delta x} $$

we can obtain the needed frequency, and finally use it to do a dot product to get $k^2$ and $k^4$, which in the code we denote as `k2` and `k4`. Note that what we need here is a dot product, not ordinary multiplication. This is because, in the 2D case, the frequencies in the two directions are mutually independent, and the result of the Fourier transform is a vector rather than an ordinary number.

Next, just assemble the corresponding parts:

```C
/* ... */
my_complex neg_k2_df_dc, kappa_neg_k4_c;
neg_k2_df_dc[0] = -1.0 * k2 * mesh_df_dc_trans[k_pos][0];
neg_k2_df_dc[1] = -1.0 * k2 * mesh_df_dc_trans[k_pos][1];

kappa_neg_k4_c[0] = -1.0 * kappa * k4 * con_trans[k_pos][0];
kappa_neg_k4_c[1] = -1.0 * kappa * k4 * con_trans[k_pos][1];

// con_trans += dt * (k2_term + k4_term)
con_trans[k_pos][0] += dt * M * (neg_k2_df_dc[0] + kappa_neg_k4_c[0]);
con_trans[k_pos][1] += dt * M * (neg_k2_df_dc[1] + kappa_neg_k4_c[1]);
/* ... */
```

Here, for ease of understanding the composition of the various parts, we used two temporary variables to hold the first half and the second half of the concentration change expression. The computation here is basically just translating the formula into code, except that the real and imaginary parts must be computed separately.

After the calculation for each grid point is finished, use the 2D inverse Fourier transform to transform the result back into the original space, and the computation for one time step is complete. Finally, after post-processing based on time and whether to output results, the computation is done:

```C
        /* ... */
        my_fft_backward_2d(con_trans, con, N, N);

        if (istep % output_every == 0 || istep == num_total_compute) {
            printf("output steps: %zu\n", istep);
#ifdef OUTPUT_VTK
            write_VTK(con, N, N, output_directory_path, istep, dx);
#endif
        }
        /* ... */
```

At the end of the program, we print the timing result on the screen, then release all used resources, and the program is complete. So, what's the result?

#### Sigh, Embarrassing...

We ran 20000 steps, and it took a full 53 seconds! This is way too slow... Oh, we turned on VTS output — let's try turning it off. Maybe it's the file IO being too slow? Right? (nervous)

![V1 time](Time_V1.png)

Hard to bear, what was I even expecting... Why is it like this? Wait, why did it run 20000 steps? Oh, our computation step count is controlled by total time and per-step time. Then why is `dt` set so small? Let's try changing it to `1e-2` and see. This time it should be faster, right?

Indeed, the computation time dropped to about 27 seconds. Let's look at the results again:

![V1 result (dt = 1e-2)](Result_V1_dt1e-2.png)

What... how did the computation become unstable? By inspecting the results, we can see that starting from step 39, mysterious stripes appeared in the simulation, and by step 42, the result exploded — the concentration skyrocketed to an impossible value like `9.9e-23`. This is clearly problematic. Huh? What if we add numerical truncation — the moment we see signs of trouble, we immediately cut it off, keeping the concentration always within a reasonable range? Wouldn't that solve the problem?

OK, we insert these few lines of code:

```C
/* ...
my_fft_backward_2d(con_trans, con, N, N);
*/

for (size_t j = 0; j < N; j++) {
    for (size_t i = 0; i < N; i++) {
        int pos = j * N + i;
        con[pos][0] = con[pos][0] > 1.0 - TRUNCATE_REAL ? 1.0 - TRUNCATE_REAL : con[pos][0];
        con[pos][0] = con[pos][0] < TRUNCATE_REAL ? TRUNCATE_REAL : con[pos][0];
    }
}

/*
if (istep % output_every == 0 || istep == num_total_compute) {
... */
```

Compile and run, and the result becomes:

![V1 numerical truncation result](Result_V1_ConTruncate.png)

Although this time the values didn't crash, preventing the computation from proceeding normally, this still isn't quite right... Why do stripes keep appearing, and why is the total concentration on the right decreasing more and more over time? No, this approach definitely won't work. Then we can only use the original time step, i.e., `dt = 5. * 1e-3`. So what exactly is the advantage of this algorithm?

Oh right, we didn't switch to a faster iterative algorithm but are still using the old recursive algorithm. Let's try switching to the iterative algorithm! Switching to the iterative algorithm is very simple: just change the earlier feature macro `MY_FFT_USE_RECURSIVE` to `MY_FFT_USE_ITERATIVE`, or simply delete this macro. Our library defaults to using the faster iterative algorithm. Let's set the step size back to `dt = 5. * 1e-3` and look at the result again.

![V1 iterative computation time](Time_V1_Iter.png)

?! Strong strong!? It only took 3 seconds to finish! But weren't our previous algorithms even faster than this Fourier spectral method? Ultimately, it's because the time step per step in our computation is too short, leading to an increased number of computation steps. And if we don't use such a short time step, the computation crashes... This is really too annoying. Is there any way to keep it from crashing?

### Semi-Implicit Algorithm

We solemnly introduce: the *semi-implicit algorithm*! The fundamental reason for the previous computational instability is that our time integration uses an explicit algorithm. This algorithm is easy to implement, but the problem is that its stability is not good. To solve this problem, we must start from the iteration formula.

> [!NOTE]
>
> The following two sections involve somewhat troublesome mathematical content. If you only want to see the implementation details and results, please skip the next three subsections.

#### Stability of the Solution Method

However, to discuss stability, we must know the definition of stability. During the process of numerical computation, each step of calculation introduces a portion of error into the system. We naturally hope that the error does not grow larger with more computation — at the very least, it should not exceed the initial error. This introduces the most basic idea of the stability of numerical methods. We define stability as follows:

> [!DEF] Stability of Numerical Methods
>
> Suppose using a numerical method to compute an initial value problem after $n$ steps yields the result $y_n$, and a perturbation $\delta$ is added to $y_n$. If the errors caused by this perturbation in subsequent calculations are all smaller than $\delta$, then this numerical method is called stable.

Stability is theoretically influenced by three aspects: the numerical method, the choice of step size, and the problem itself. To study only the influence of the numerical method (and step size choice) on stability, we can take a "reference problem" and apply various numerical solution methods to it. This differential equation is one we are very familiar with: $$y'(t) = \lambda y(t),$$ where $\lambda$ is a complex number — this is also to facilitate later generalization to systems of linear equations. However, in this context, it has a special name: the *Dahlquist test equation*. Its solution is also quite easy to find: $ y(t) = C \mathrm{e}^{\lambda t} $, where $C$ is some constant.

You might ask, why choose this function? This is because, given any *nonlinear problem*: $$ y'(t) = f(t,y(t)),$$ we can linearize the right-hand side by Taylor expansion, obtaining the form $u' = \lambda u$, where $\lambda$ here is the value of $\frac{\partial f}{\partial y}$ at the expansion point. That is to say, we can locally linearize a nonlinear problem, and then apply the stability determination results obtained from the Dahlquist test equation. If the problem is a system of ordinary differential equations $$\mathbf{y}' = \mathbf{f}(t,\mathbf{y}),$$ we can obtain $$\mathbf{y}' = \mathbf{A} \mathbf{y}$$ through linearization, where $\mathbf{A}$ is the Jacobian matrix of $\mathbf{f}$ with respect to $\mathbf{y}$, and we can still apply the results of the Dahlquist test equation.

So let's look at the stability result of the Dahlquist test equation under the previous explicit method. The explicit Euler formula for $y'(t) = \lambda y(t)$ is: $$ y_{n+1} = (1+h\lambda)y_n,$$ We further assume that at the node value $y_n$, there is a perturbation $\varepsilon_n$, which makes the actual input value $y_n^* = y_n + \varepsilon_n$. The error, or perturbation, caused when this propagates through the numerical method to step $n+1$ is $\varepsilon_{n+1}$. Assuming the explicit Euler method introduces no additional new error at this step, the perturbation satisfies $$ \varepsilon_{n+1} = (1+h\lambda)\varepsilon_{n}. $$

As can be seen, the new error is $(1+h\lambda)$ times the old error. If we do not want the error to increase, then this value must be less than or equal to $1$, hence: $$ \lvert 1+h\lambda \rvert \leq 1.$$ If the solution method satisfies this condition, we call it *absolutely stable*, and the region on the complex plane formed by the complex numbers $\mu = h\lambda$ satisfying this condition is called the *absolute stability region*, and its intersection with the real axis is called the *absolute stability interval*.

From the above results, the stability of the explicit method is not good. If $\lambda$ happens to be a value with a large absolute value, then $h$ must be chosen very small. So how large is $\lambda$ for the algorithm we used in the previous subsection?

#### What the Explicit Method Did

What is mainly controlled by the time step size is the final time step update. The good news is that at this step, we can consider ourselves as simply solving an ordinary differential equation. Organizing the equation at this step:

$$
\frac{\partial \{c\}_{\mathbf{k}}}{\partial t} = - 2AM\mathbf{k}^2 \{c(1-c)(1-2c)\}_{\mathbf{k}} - \kappa M \mathbf{k}^4 \{c\}_{\mathbf{k}}
$$

Here we encounter a small difficulty: because we are using the Fourier pseudo-spectral method, $c(1-c)(1-2c)$ is processed as a whole, which actually creates some difficulty for stability analysis. Let's expand it and denote it as $g(c)$:

$$ g(c) = c - 3c^2 + 2c^3 $$

Then, giving it a perturbation $\varepsilon$ yields:

$$ \delta g = g(c+\varepsilon) - g(c) = (1-6c + 6c^2) \varepsilon = g'(c) \varepsilon $$

Then after Fourier transformation, the perturbation caused by this part is:

$$ \delta \{g(c)\}_{\mathbf{k}} = \{g'(c)\}_{\mathbf{k}} * \{\varepsilon\}_{\mathbf{k}} = \sum_\mathbf{q} \{g'(c)\}_{\mathbf{k-q}} \{\varepsilon\}_{\mathbf{q}},$$

where $\mathbf{q}$ is also a wave vector in Fourier space. This result looks even more frightening, but fortunately some conclusions from Fourier analysis can tell us that the value of this error in Fourier space will never exceed $\max_{\mathbf{x}} \lvert g'(c) \rvert \cdot \lVert \{\varepsilon\}_{\mathbf{k}} \rVert$, so we can directly fix $g'(c)$ at its maximum value. Simple calculation shows that its maximum value can reach $1$. In this way, applying the stability analysis process above, we have:

$$ \{\varepsilon\}_{\mathbf{k}}^{(n+1)} = (1 + (- 2AM\mathbf{k}^2 - \kappa M \mathbf{k}^4)\Delta t ) \{\varepsilon\}_{\mathbf{q}}^{(n)},$$

Then for this equation, when using the explicit Euler method, we have: $$ \lambda_{\mathrm{max}} =  -2AM\mathbf{k}^2 - \kappa M \mathbf{k}^4. $$ Now the problem is how to compute the maximum values of $\mathbf{k}^2$ and $\mathbf{k}^4$. For this problem, the relevant code in our implementation is:

```C
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
        /* ... */
    }
}
```

As can be seen, the maximum absolute value of `fi` or `fj` can reach `N/2`, i.e., `32`. In this algorithm, `dx = 1.0`, so the possible maximum values of $\mathbf{k}^2$ and $\mathbf{k}^4$ are:

$$ \mathbf{k}^2_{\mathrm{max}} = 2 \times (\frac{2\times\pi \times 32}{64\times1.0})^2 = 2 \pi^2, $$

$$ \mathbf{k}^4_{\mathrm{max}} = (\mathbf{k}^2_{\mathrm{max}})^2 = 4 \pi^4, $$

Then $\lambda_{\mathrm{max}} = -2AM\mathbf{k}^2 - \kappa M \mathbf{k}^4_{\mathrm{max}} = -2 \times 2 \pi^2 - 2 \pi ^4 \approx - 234.297$. Plugging into $\lvert 1+h\lambda \rvert \leq 1$ for computation, we can obtain the reasonable range for $h$:

$$ h \leq \frac{2}{\lambda_{\mathrm{max}}} = 8.536 \times 10^{-3}.$$

Thus, our most reasonable choice should be below $0.0085$, while the previously used $0.01$ clearly exceeds this value. The author also did some tests here — in fact, at $h = 0.009$, the result after computing for 100 seconds is still undistorted. Actually, it computes without distortion up to about 650 seconds, but after that, the result becomes problematic, and the striped pattern reappears:

![Computation result at step 73326 / 659 seconds with step size 0.009](h9e-3_73326.png)

This already indicates that the computation has become unstable starting from this step. Overall, `0.005` is a very conservative computation step size; we can actually go up to around `0.008` and still guarantee computational stability.

So, what kind of results can the semi-implicit method bring us?

#### What the Semi-Implicit Method Brings...

In the semi-implicit method, we replace the second term of the above equation with the result of the next step instead of the current step, i.e.:

$$
\frac{\{c\}_{\mathbf{k}}^{(n+1)} - \{c\}_{\mathbf{k}}^{(n)}}{\Delta t} = - 2AM\mathbf{k}^2 \{g(c)\}_{\mathbf{k}}^{(n)} - \kappa M \mathbf{k}^4 \{c\}_{\mathbf{k}}^{(n+1)}
$$

After rearranging the equation, we obtain:

$$
\{c\}_{\mathbf{k}}^{(n+1)} = \frac{ \{c\}_{\mathbf{k}}^{(n)} - \Delta t \mathbf{k}^2 M \{g(c)\}_{\mathbf{k}}^{(n)}}{1+\Delta t \mathbf{k}^4 M \kappa}
$$

How do we determine its stability? We still adopt the previous analysis approach for $g(c)$ — the error in this part is controlled by $g'(c)$, whose maximum value is $\lvert g'(c) \rvert \varepsilon$. Further, we obtain its error iteration formula:

$$
\{\varepsilon\}_{\mathbf{k}}^{(n+1)} = \frac{ 1 - \Delta t \mathbf{k}^2 M \lvert g'(c) \rvert }{1+\Delta t \mathbf{k}^4 M \kappa} \{\varepsilon\}_{\mathbf{k}}^{(n)}
$$

Thus, we obtain the following result: for the error to at least not grow, we need

$$
\lvert E \rvert = \lvert \frac{ 1 - \Delta t \mathbf{k}^2 M \lvert g'(c) \rvert }{1+\Delta t \mathbf{k}^4 M \kappa} \rvert \leq 1,
$$

For convenient discussion, let $P_k = \mathbf{k}^2 M$, $Q_k = \mathbf{k}^4 M \kappa$, $a = \lvert g'(c) \rvert$, $h = \Delta t$, then the above becomes:

$$
\lvert \frac{ 1 - P_k a h }{1+ Q_k h} \rvert \leq 1
$$

Solving this inequality for $h$, we see there are two conditions: the upper bound is $ E \leq 1$, i.e., $ a \geq -Q_k/P_k $. This result does not contain $h$, meaning this condition is independent of the step size choice and depends only on the problem itself. The lower bound is $ E \geq -1$, which can be solved to obtain $$ h \leq \frac{2}{P_k a - Q_k}$$. Denote this denominator as $\Phi (\mathbf{k})$, then $ h \leq 2/\Phi (\mathbf{k})$.

We focus on examining this $\Phi$. In the worst case, $\Phi$ should reach its maximum value. Since $\mathbf{k}^4 = (\mathbf{k}^2)^2$, $\Phi$ is actually a downward-opening quadratic function in terms of $\mathbf{k}^2$, and its maximum is taken at $\mathbf{k}^2_* = (A a) / \kappa$, with its value:

$$
\Phi_{\mathrm{max}} = \frac{A^2 M a^2}{\kappa}
$$

Then we only need to let $a$ also reach its maximum value to obtain the maximum value of $\Phi$. In our earlier discussion, we already found that the maximum value of $a = \lvert g'(c) \rvert$ is $1$. Plugging in the remaining values yields: $$\Phi_{\mathrm{max}} = \frac{1^2 \times 1\times 1^2}{0.5} = 2,$$ Then the upper bound for $h = \Delta t$ that keeps the numerical solution stable is:

$$ \Delta t = h \leq \frac{2}{\Phi_{\mathrm{max}}} = \frac{2}{2} = 1.$$

So, the maximum $\Delta t$ we can take is... **1**!? That's right — this is the charm of the semi-implicit method: we can greatly relax the solution step size while still maintaining solution stability.

Alright, after all this rambling, we've fully felt the charm of the semi-implicit method. So how exactly do we implement it? It's also very simple — we just translate the formula as before:

#### Implementation of the Semi-Implicit Algorithm

The code for the semi-implicit algorithm is placed at [C_impl_fft_v2.c](/attachment/Impl_Spinodal/C/C_impl_fft_v2.c). Additionally, because it uses the self-implemented `libmyfft`, it needs the code previously used to compile this library. Most of this code is the same as the previous version; the differences mainly lie in: using the default iterative fast Fourier transform algorithm, replacing the slow recursive algorithm; turning off result output by default, since the results are identical; changing the computation step size to `dt = 1e-1`; adopting the semi-implicit algorithm.

Why are the results completely identical? You may wonder whether our several runs all produced identical results. This is because we didn't set a random number seed, so each time the random number seed defaults to `0`, generating the same initial structure and ultimately giving the same evolution result. Here, setting `dt` to `0.1` is also a relatively conservative choice, but the computation results should still be fast enough. Let's focus on the specific implementation.

Due to adopting the semi-implicit method, our iteration formula has changed slightly. The main loop logic is as follows:

```C
/* ... */
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
        my_complex numerator;
        numerator[0] = con_trans[k_pos][0] - dt * k2 * M * mesh_df_dc_trans[k_pos][0];
        numerator[1] = con_trans[k_pos][1] - dt * k2 * M * mesh_df_dc_trans[k_pos][1];

        // denominator = 1 + delta t k^4 M kappa
        double denominator = 1. + dt * k4 * M * kappa;

        // con_trans = numerator / denominator
        con_trans[k_pos][0] = numerator[0] / denominator;
        con_trans[k_pos][1] = numerator[1] / denominator;
    }
}
/* ... */
```

The parts preparing `k2` and `k4` earlier are completely identical. The main difference lies in the later computation. We first compute the numerator, then compute the denominator, and finally update the concentration of the next step to the value of this fraction. Note that the denominator is not a complex number but a real number, so we can directly use a `double`, avoiding the troublesome complex number division calculation.

Truly a plain and unadorned algorithm — without the stability analysis part earlier, this would be boring enough (guilty conscience). But after all that talk, let's quickly see its computation speed!

![V2 time](V2_Time.png)

! Strong strong! But it's also predictably fast: our computation step count is 20 times less than the first version of the program, and 10 times less than the finite difference method — it should have this kind of computational effect! This is the time with result output turned off. Let's turn on result output to check the computation:

![V2 result](V2_Result.png)

No issues — fast and good! However, if using our self-implemented Fourier transform algorithm yields such speed, then how fast would it be with the real *FFTW*?

### Bring on FFTW!

We already briefly introduced FFTW in the [bonus chapter](/posts/Impl_Spinodal_Fourier), so let's not waste more words here and go straight to the code. You can similarly view the source code here: [C_impl_fft_v3.c](/attachment/Impl_Spinodal/C/C_impl_fft_v3.c).

Compared to the second version of the code, the main change in this version is migrating from `libmyfft` to `libfftw`. Therefore, at the very beginning, we need to use the header files provided by `libfftw`:

```C
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
```

Here we use the `_WIN32` macro to determine the target platform. If compiling and running on the Windows platform, use the header file provided for Windows; otherwise, we default to compiling for the Linux platform and use the corresponding header file. Sorry, MacOS users — the host doesn't have a MacOS computer on hand, and couldn't get a MacOS virtual machine working either, so we can only make this sacrifice...

After the same function definitions, variable initialization, and folder creation, we need to operate FFTW:

```C
/* ... */
fftw_complex *con = fftw_alloc_complex(N_full); // alloc_complex is zero-initialize
fftw_complex *con_trans = fftw_alloc_complex(N_full);
fftw_complex *mesh_df_dc = fftw_alloc_complex(N_full);

fftw_plan con_2_con_trans = fftw_plan_dft_2d((int)N, (int)N, con, con_trans, FFTW_FORWARD, FFTW_PATIENT);
fftw_plan con_trans_2_con = fftw_plan_dft_2d((int)N, (int)N, con_trans, con, FFTW_BACKWARD, FFTW_PATIENT); // need manually normalize
fftw_plan trans_mesh_df_dc = fftw_plan_dft_2d((int)N, (int)N, mesh_df_dc, mesh_df_dc, FFTW_FORWARD, FFTW_PATIENT);
```

Let's explain the approach here. First, we defined the initial concentration field to be solved `con`, the transformed concentration field `con_trans`, and the `mesh_df_dc` to be computed. Why weren't they initialized? There are several reasons. First, `fftw_alloc_complex` is zero-initialized by default; additionally, when creating `fftw_plan` later, the data in these arrays will be destroyed, so initializing now would also be in vain. Another question might be why we didn't provide a temporary variable for `trans_mesh_df_dc`. This is because, in our computation process, we only need the transformed `mesh_df_dc` — that is, after computing the current step's `mesh_df_dc`, we immediately perform the Fourier transform, and afterwards only use the Fourier-transformed result. Therefore, we choose to let the transformed result be stored directly in `mesh_df_dc`, saving memory and also benefiting cache hits.

It's worth noting that we could of course also use the more primitive `malloc` to allocate memory, and could also use our own `alloc_complex` function, because ultimately `fftw_complex` is just an array of length `2`, and array memory is guaranteed to be contiguous, so as long as we find a way to allocate enough memory into it, it's fine.

Next is creating `fftw_plan`s — here we also have three: `con_2_con_trans` for transforming the original space concentration to Fourier space; `con_trans_2_con` for transforming the Fourier space concentration back to the original space; `trans_mesh_df_dc` for performing the Fourier transform on `mesh_df_dc`. Since we need a 2D Fourier transform, we need to use the `fftw_plan_dft_2d` function, sequentially inputting the number of rows and columns, the pre-transform array, the post-transform target array, the transform direction, and the strategy for finding the optimal transform. We set `FFTW_PATIENT` as the strategy for all three `fftw_plan`s, which allows FFTW to spend more time searching for the possibly optimal way to compute the Fourier transform. Another noteworthy point is that FFTW uses row-major data layout — for example, for a $3\times 2$ matrix $A$ with three rows and two columns, the element at row 1, column 2 can be expressed as `A[0*2 + 1] = A[1]`, where `2` is the number of elements per row (number of columns), `0` represents the first row, and `1` represents the second row. The bad news (or good news) is that our solution domain has equal length and width, so we can directly input two `N`s. The forced type conversion here is also to prevent the compiler from complaining — the `fftw_*` family of functions defaults to using `int` rather than `size_t`, and if we don't do the forced type conversion ourselves, the compiler will (with `-Wall` enabled) warn us.

Note the comment here: `// need manually normalize`. This is because FFTW does not provide automatic normalization, so after each inverse transform, we must divide by the normalization coefficient. We will mention this again shortly.

After creating the `fftw_plan`s, and after concentration initialization, we enter the main loop:

```C
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
    /* ... */
}
```

First, of course, we transform the concentration $c$ and $\mathrm{d} f / \mathrm{d} c$ into Fourier space. The concentration can be directly transformed because it has already been initialized: the `fftw_execute` function can choose to execute the previously declared `fftw_plan` — here we directly execute `con_2_con_trans`. Next, after filling `mesh_df_dc` based on the concentration computation, we can execute the `trans_mesh_df_dc` `fftw_plan` to refill the transformed result back into `mesh_df_dc`.

Then, as before, we proceed with the same computation flow as the previous version — no need to elaborate further. After traversing each grid point and computing the next step's `con_trans`, we execute `con_trans_2_con` to transform the concentration back to the original space, but note that we still need to normalize:

```C
/* ... */
// my_fft_backward_2d(con_trans, con, N, N);
fftw_execute(con_trans_2_con);

for (size_t i = 0; i < N_full; i++) {
    con[i][0] /= (double)N_full;
    // image part is zero, no need to normalize
}
/* ... */
```

Since real values, after Fourier transform and inverse transform, remain real values, we can mathematically guarantee that the imaginary part of `con` must be `0`, so there's no need to normalize it. For the real part, we simply divide each term by the total length. In other words, both 1D Fourier transforms require normalization, so each time we must divide by the length `N` of the 1D Fourier transform, and after two transforms, we must divide by `N*N = N_full`.

Finally, we need to destroy the previously declared pointers. For `fftw_plan`, we need to use `fftw_destroy_plan` to destroy; for pointers using `fftw_alloc_complex`, we use `fftw_free` to destroy. The author unfortunately tried using the basic `free` to destroy both — the result was strange errors when the program exited, because the library function error was caused by not correctly choosing the destruction method. Sigh, RAII, the episode I miss you most!

So, how fast is it? Let's compile, run, and try.

Wait, why is there no response when running!? This is because the dynamic runtime library is at work. You may need to copy `libfftw3-3.dll` or `libfftw3-3.so` into the folder of the build product, and then run. Otherwise, the program will stop running because it cannot find the runtime library. After copying to the corresponding folder, compile and run — its computation time is:

![V3 time](V3_Time.png)

![?! So strong!?](强强！？.png){width="25%"}

I was being presumptuous earlier — I should not have provoked Lord FFTW. FFTW is truly too fast — the computation finished in only 0.0405 seconds. Of course, this is still the result without file IO. After turning on file IO, the speed drops to 0.2787 seconds, but this is also because file IO drags down the overall runtime. The results won't be shown — they're exactly the same as before, nothing interesting to see.

Overall, if using a relatively advanced Fourier transform algorithm library (yes, FFTW), under the *semi-implicit Fourier pseudo-spectral method*, the computation time of the problem can be significantly saved. The approach to saving computation time is twofold: the algorithm itself is extremely efficient, and the time step that guarantees computational stability is also sufficiently large. Based on the maximum stable step size we derived earlier, we could even set it to `1` — we just won't try that here.

### So, Where's the Numerical Truncation?

Finally, let's answer a previously lingering question: why exactly does using the `TRUNCATE_REAL` macro for numerical truncation cause these problems?

This is because whenever we perform numerical truncation, we are effectively discarding a portion of the boundary values. And the result after Fourier transformation encodes all results in the original space into the values at each frequency, so clipping the boundary points, after Fourier transformation and inverse transformation, causes the material in the entire space to decrease overall. We also inserted this truncation code into the third version of the program, then adjusted the simulation time to 1000 seconds. The result is as follows:

![Non-conservation of results caused by numerical truncation](V3_ConTruncate.png)

As can be seen, due to continuous data truncation, the concentration in the simulation domain, after a short period of steady state, quickly drops to a very low level. Therefore, when using the Fourier spectral method, we cannot perform numerical truncation on values within the simulation domain. So how do we ensure that values never exceed the reasonable range during the entire simulation process?

Actually, there's no way to guarantee it. In our computation process above, the maximum concentration value was not a perfect *1*, but continuously changing. Observing those earlier successful simulations, the gray region in the time-varying graph on the right represents the concentration variation of the entire simulation domain, and its upper boundary is not flat. The good news is that, thanks to the characteristics of the double well, the concentration at equilibrium will never deviate too far from $0$ or $1$. So should we do numerical truncation? My opinion is no, because the free energy already imposes good constraints on the system's concentration, and there's no need to add an extra concentration truncation — it would be gilding the lily.

So actually, the `TRUNCATE_REAL` in each file is just something I lazily left behind.

## Afterword

Actually, the simulation code used in this post was written quite a while ago. However, because I needed to write the intermediate bonus chapter, it was delayed for a very, very long time — I only finished the bonus chapter after arriving in Germany, and then immediately started on this post right after. The manuscript originally planned for completion by June 10th only got finished just now.

The historical research part on the C language truly benefited me greatly — the process of flipping through these papers and documents was also very interesting. Actually, there are some small discrepancies in the accounts of these several people; the host also made some comparisons and chose a storyline that I personally find more reasonable. Additionally, I really didn't expect there was actually something called the B language, but since it's too ancient, I won't do deep archaeology here. The close relationship between the invention of the C language and Unix, or Linux, was also something I didn't anticipate — learning about this history also refreshed my view of Linux. I hope you enjoyed the story of the C language!

The Fourier pseudo-spectral method, as it stands now, has great potential. Its ability to handle periodic problems is extremely strong — this is perhaps mainly because it can reduce the requirement for numerical stability during computation, thereby allowing integration with larger time steps. Additionally, using advanced open-source Fourier transform libraries also, from a certain angle, greatly improves the overall quality of the code. This method also has some potential issues — for instance, handling non-periodic boundary problems is relatively tricky. But this problem can be solved through some special treatments (such as adding a mirrored region to satisfy periodicity), though such an approach would sacrifice considerable computational resources to calculate repetitive parts.

Additionally, I want to remind readers that this [Github repository](https://github.com/A-moment096/Impl_Spinodal/) stores all the source code used in this series. The code used in this installment is in `4-C`, which contains a complete VS Code workflow configuration. If you use this configuration, after pressing the `F5` key on the page of the code to be compiled, VS Code will ask you whether to build the project in Release or Debug mode. After selecting, it will call the scripts placed in the `script` folder for compilation, and finally VS Code's `launch.json` will call the compiled product and run it. If you want to compile `libmyfft`, you can do the same — it will automatically call another script for compilation, no worries needed. If your compiler settings and such differ from the host's, you may need to look at the script configuration and make simple modifications. The host is personally quite satisfied with this workflow — a major reason is that it allows breaking free from the shackles of CMake and fully utilizing VS Code's own features. This makes me even more convinced that VS Code is an IDE disguised as an editor.

After finishing this post, the host may take a break for a while. First, the thesis that has been dragging on still hasn't been completed — can't keep dragging until next semester; second, the host wants to translate the written articles into English, doing some i18n — maybe more people would be willing to read them; furthermore, this series is driven by different programming languages, and programming languages also need to be learned and mastered. Introducing something new beyond the language in each installment also requires a certain amount of effort. Current candidate languages include *Rust*, *Go*, *Fortran*, *C#*, *Java* — the number the host currently masters among these is 0. And adding new things — current ideas include starting from the free energy, or from the angle of energy coupling, or the geometric shape of the simulation domain, or simulating spinodal decomposition in polycrystals — none of these are easy targets. I hope the host can win the revival match and continue serializing this series.

That said, this series has been continuously updated for four installments (plus one bonus chapter). Even if you, the reader, are not experiencing aesthetic fatigue, the host already wants to switch to a different topic. Such as continuing last year's unfinished pit: the linear algebra series, or chatting about various system package managers, or opening a new pit: crystal plasticity finite element, and so on. Regarding crystal plasticity, this is also the main content of the host's academic exchange in Germany, and I recently plan to organize the learning outcomes. The next post is very likely this — please look forward to it~ Of course, if something else gets updated, I also hope you will continue to support!

So finally, as always, I wish you smooth work, a pleasant life, and may all your wishes come true!

[^1]: Ritchie, Dennis M. (January 1993). ["The Development of the C Language"](https://www.nokia.com/bell-labs/about/dennis-m-ritchie/chist.pdf)
[^2]: [Wikipedia: Multics #Novel ideas](https://en.wikipedia.org/wiki/Multics#Novel_ideas)
[^3]: [Wikipedia: Unix #History](https://en.wikipedia.org/wiki/Unix#History)
[^4]: [Master Thesis of Nils Fredrik Gjerull: 4.3 Multics, Unix and AT&T](https://www.gjerull.net/site_media/static/html/masterthesis/masterthesisse12.html)
[^5]: [cppreference: History of C](https://en.cppreference.com/c/language/history)
