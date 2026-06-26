---
categories:
- Phase Field
- Mathematics
- Programming
tags:
- Tutorial
- Numerical Analysis
- C++
title: "Phase Field: Simulation Study Notes III"
description: Notes on learning the phase field method
image: /images/Skadi.png
date: 2024-12-23
math: true
links:
  - title: PF_Tutorial_3 — C++ Language and a Computational Example
    description: Recorded lecture on Bilibili
    website: https://www.bilibili.com/video/BV15aSuY2EpY
  - title: Lecture Notes Repository on GitHub
    description: Lecture notes hosted on GitHub, including slides and reference materials
    website: https://github.com/A-moment096/Phase-Field-Tutorial/tree/main/PF_T2-Numerical_Method_and_Python
---
*Continuing from the previous chapter, this section will briefly introduce some C++ syntax and then use C++ to implement a simulation of the one-dimensional heat transfer equation.*
<!--more-->
## C++: An Efficient Language Well-Suited for Scientific Computing

C++ is a classic programming language, designed by Bjarne Stroustrup in 1979. Originally intended to be "a better C," it has since evolved into a language that shares many similarities with C yet is distinctly its own. C++ supports multiple programming paradigms, including but not limited to procedural, object-oriented, functional, and template metaprogramming. Its rich ecosystem, efficient algorithm libraries, and philosophy of *zero-cost abstraction* make C++ exceptionally well-suited for various scientific computations. Furthermore, C++'s syntax is relatively approachable, and its multi-paradigm nature makes it accessible to developers from diverse backgrounds — hence why we introduce C++ here as the programming language for subsequent computations.

### A Brief Introduction to C++

Let's start with a simple introduction to some fundamental concepts in C++. You may have already encountered some of these in the previous section; here we'll explain them further.

### C++ Compilers

When we talk about "programming in C++," what we're actually doing is writing code in the C++ format. Translating that code into something a machine can read and execute requires several different stages. Fortunately, a **compiler** can handle this process for us in nearly one shot. Given C++'s long history, multiple compilers have naturally emerged to compile its source code. Here are three of the more well-known compiler toolchains:

- **GNU Compiler Collection (GCC) and G++**: An open-source, venerable compiler collection from the GNU Foundation, in which the C++ compiler is called G++. G++ is virtually the standard compiler on Linux platforms; on Windows, you can consider migration projects like Cygwin, MSYS2, or MinGW (Minimalist GNU for Windows). Its linker is `ld`, and its debugger is `gdb`.
- **Microsoft Visual C++ (MSVC)**: Microsoft's C++ compiler toolset. Besides compiling C++, it also handles other languages such as C. Its command-line tool is `cl.exe`, but it can only be invoked through Microsoft's Developer Command Prompt. The typical way to use MSVC is through Microsoft's IDE. Its linker is `LINK.exe`, and its debugger is `vsdbg.exe`.
- **Clang++ / LLVM**: A modular, modern compiler toolset developed by the LLVM organization, where the C++ compiler frontend is Clang++. Clang++ is the default compiler on macOS, but it can also be installed on Windows or Linux. Its linker is `lld`, and its debugger is `lldb`.

These three are arguably the most popular C++ compilers. While other C++ compilers exist, different compilers may implement the language differently, so developers without special requirements are still advised to stick with one of the three mainstream compilers.

The **compiler** is responsible for compiling source code into binary files, while the **linker** takes those binary files and links them together as required to form a single executable. The **debugger** reads the symbol table and allows line-by-line execution and debugging of the resulting binary. As for the compiler's *frontend*, *backend*, and the specifics of their operation — these go beyond mere usage, so I won't delve into them here (truth be told, I don't fully understand them myself).

Let me also briefly clarify the distinctions between *compiler*, *editor*, *interpreter*, and *IDE*. We've already met the **interpreter** in Python — it interprets Python code line by line to the machine and instructs the machine to execute it. Interpreters belong to the broader category of compilers — programs that transform source code (text) into machine-understandable instructions. A **compiler** in the narrow sense, however, refers to a program that processes the entire file and compiles it into a binary. Since C++ must be compiled into a binary before execution, a compiler is essential. **Editors** are entirely separate from both — they are tools for editing text. Common editors include Notepad on Windows; Emacs and Vim, commonly used on Linux; and more modern ones like VS Code. The concept often confused with editors is the **IDE**. An IDE (Integrated Development Environment) combines the functions of both an editor and a compiler — you can edit code within it, compile it into a binary, and run it, typically with additional features like breakpoint debugging and so on. Drawing these conceptual distinctions is necessary; otherwise, misunderstandings easily arise.

### C++ Compilation and Linking

Understanding the compilation and linking process is essential for correctly using a compiler to build C++ code. I won't go too deep here — the goal is to introduce the general process so that common problems (such as "undefined symbol" errors) can be avoided.

During compilation, the compiler first takes all source files (usually with extensions like `.cpp`, `.cxx`, etc.) and compiles them as instructed into corresponding object files (`.o` files on Linux, `.obj` files on Windows), leaving behind functions and classes that have been declared but not yet implemented, waiting for the linker to connect them to the appropriate static or dynamic libraries. The linker then performs the linking step — connecting the object files, external static libraries (`.o` on Linux or `.lib` on Windows), and external dynamic libraries (Shared Objects or Dynamic Libraries — `.so` on Linux or `.dll` on Windows) together to form a single binary. Static libraries are merged with the program's generated object files into one file, whereas dynamic link libraries are not merged in. Thus, using dynamic libraries can reduce code duplication and shrink the program's size. When the program runs and needs content defined in an external library, the operating system searches for the dynamic library in a certain order, finds the definitions within, and executes them. If the dynamic library cannot be found, the program will throw an "undefined symbol XXX" error. Generally, a program looks for dynamic libraries in the directories listed in environment variables first, then in the program's own directory. If you use dynamic link libraries, make sure the program can find them — otherwise, it won't run successfully.

The above is only a brief introduction. The compilation process can be subdivided into several steps, as can the linking process. I won't cover those here. But one thing worth noting: during compilation, the code is optimized to varying degrees depending on the build type. The so-called *Release* version turns on all optimization flags and does not generate or load a symbol table — its binary is small, runs fast, but is usually undebuggable (due to the missing symbol table). The corresponding *Debug* version applies fewer optimizations, but the symbol table it includes allows stepping through the code and inspecting variable values during debugging. Bear these differences in mind when compiling.

### Debuggers and Debugging

A **debugger** is typically a standalone program that can run a compiled and linked executable and, after loading the program's symbol table, execute it line by line. Debuggers also support **breakpoints** — pausing program execution at specific locations and displaying the current variables, the function call stack, and so on. The advent of debuggers has enormously simplified program debugging, making it easy to locate problems in code and fix them, ultimately producing code that better meets requirements.

Debuggers often have their own interfaces and can run independently, but the more common approach nowadays is to use an external program that invokes the debugger, captures its output, and passes input parameters, so that the debugging experience can be synchronized with the source code view. Most common IDEs have this functionality, and some editors, when properly configured, can also invoke a debugger. The typical debugging workflow goes: add breakpoints, step through code, inspect/modify variable values, step into / step out of functions, and so on. Feel free to explore during the debugging process.

### Setting Up a C++ Environment

If you're on Windows, the simplest approach is to consider Microsoft's Visual Studio. As a mature IDE, Visual Studio lets you focus on problem-solving through programming rather than on the tools themselves once you've grasped its basic operation. Just download the Visual Studio installer from the official website, select the "Desktop development with C++" workload in the installer interface, and after installation you can create a solution + a project, add a new C++ source file in the Solution Explorer on the left, and start coding. All compiler options and settings can be managed through the project properties. If you need to develop large-scale programs on Windows, Visual Studio is almost the undisputed choice.

However, if you only need to compile and run a single C++ file, or if Visual Studio is too heavyweight for your machine, consider using the compilers and C++ runtime from MinGW-w64 or MSYS2. After writing your C++ source file, invoke the `g++` command just as you would in a Linux environment to compile it and obtain an executable. Beyond emulating a Linux environment on Windows, you can also use WSL to create a local, lightweight Linux subsystem — logging into the subsystem is essentially like opening a Linux VM, at which point you can install the necessary toolchain and compile under a Linux environment.

Since source code is merely a text file with a specific format, you can use any text editing tool you like to write it. However, a good editor can assist with writing — features like syntax highlighting, auto-completion, and compiler invocation can enormously ease the coding process. I recommend VS Code here: its rich extension ecosystem, once you've installed a compiler and the relevant extensions, provides solid syntax highlighting, go-to-definition, auto-completion, and the ability to compile, debug, and run C++ source files. Since VS Code provides thorough documentation on the specifics, I won't elaborate further here.

### C++ Standards

As a language with a long history of development, C++ has undergone several version iterations and thus has multiple language standards. According to ISO standards, the C++ committee adjusts language features and syntax rules, proposes additions to the standard library, and leaves it to the major compiler vendors to implement them. Different compiler vendors may adopt different implementation approaches, and different compilers may add different extensions — thus, non-standard C++ code may need to be compiled according to the specific platform and compiler. And when the standard targeted by the source code differs from the compiler's standard, compilation errors frequently arise. So, when writing or compiling source files, be clear about which C++ standard you're targeting. Currently, the industry standard with broad compiler support is C++14, but this standard is relatively old and lacks many convenient library functions. Consider using C++17 or C++20 for greater convenience. This tutorial uses the C++17 standard. Please note that Visual Studio defaults to C++14 — if necessary, change the C++ standard in the project properties.

## C++ Syntax Basics

After the introduction above, I trust you now have some familiarity with the tools and essential background knowledge surrounding C++. Yet so far, we haven't discussed C++'s actual syntax. Let's now dive into that.

### Comments, Headers, and `#include`

Code generally has comments. In C++, single-line comments begin with `//`, causing the compiler to ignore everything after `//` on that line. Multi-line comments (or more precisely, ranged comments) begin with `/*` and end with `*/`. Single-line comments are very handy for quick code changes, while multi-line comments are often used for large blocks of explanatory text — copyright notices in particular.

Opening a C++ file, the first thing you'll often see is a series of lines beginning with `#include`. In C++, when you need to use external content (such as functions or classes), you typically use the `#include` preprocessor directive to bring the corresponding library's header file into the current file. For instance, to use the standard library's input/output streams, you'd write `#include <iostream>` in your source file. When using self-built libraries, double quotes `""` are generally used instead of angle brackets `<>` to include the header.

A **header file** is typically a C++ code file ending in `.h` that declares functions or classes (implementations can also go in headers). After including a header, you can use the names defined within it — similar in function to Python's `import`, but more primitive, because `#include` literally tells the compiler to copy and paste the corresponding file into that location.

Standard library headers are usually associated with the standard library. The "standard library" refers to the collection of functions, classes, function templates, and class templates provided by the C++ standard. The `iostream` example above is one such case. The standard library is vast — when you need something, do search for whether an existing library already satisfies your needs.

### The `main` Function and a Small Example

For a C++ program, an executable must contain a `main` function as the program's primary entry point. When the program runs, execution starts from `main` and proceeds line by line downward. A C++ program can only have one program entry point — meaning one `main` function. Here's a simple example: *hello_world.cpp*

```cpp
#include <iostream>

int main(){
    std::cout<<"Hello C++ world!"<<std::endl;
    return 0;
}
```

The `main` function has the following characteristics:
- `main` must have a return type of `int`
- `main`'s parameter list can be empty, or it can take two parameters: an integer representing the number of arguments received, and a string array/pointer/container to store those arguments.
- Upon successful execution, `main` should return `0`. The standard allows omitting the return statement, in which case it defaults to `0`.

Beyond serving as the program entry point, `main` is itself a function that conforms to C++ syntax. We'll see several elements that `main` shares with all functions shortly.

### Variable Types

One of the biggest differences between C++ and Python is that in C++, all variables have **static types** (other differences include not needing indentation to denote code blocks, etc.). In C++, declaring a variable requires first specifying the variable's type, then its name. You can (and it's recommended to) initialize the variable at declaration — typically just use an equals sign `=` after the variable name followed by the value to assign. You can also use an initializer list for variable initialization, and for classes, you can use an appropriate class constructor. Here's an example:

```cpp
#include <vector>
#include <string>
int main(){
    int i = 0;
    double j;
    int k {1};
    bool yes = false;

    std::vector<double> vd {0.1,0.2,0.4};
    std::string str = "I'm a string!";
}
```

To keep things concise, we'll only introduce five types: `int`, `double`, `bool`, `string`, and `vector` — representing signed integers, double-precision floating-point numbers, booleans, strings, and vectors respectively. The first three are C++ built-in types commonly used in computation; the latter two require including their corresponding headers. A few points to note:

- **Do not use a variable before initializing it.** It may contain garbage data. For example, `double j` in the snippet above does not initialize `j`, which may hold any arbitrary data — you must initialize it before use.
- Variables can be initialized using curly braces `{}`, called an initializer list. This approach is especially common for composite data types.
- When using variables/classes/functions from the standard library, if you haven't used `using namespace std;` to globally bring names into scope, use `std::` to tell the compiler where the name resides. I won't cover namespaces here.
- For class templates like `vector`, specify the type of data the container will hold inside angle brackets. For instance, `std::vector<double>` declares a `vector` container whose internal element type is `double`.
- Strings begin and end with double quotes `"`.
- **Do not use full-width characters.** C++ source text uses half-width characters as its symbols.
- Variable names may not start with a digit, but may contain digits, underscores, and English letters.

Note that C++ is a **strictly typed language**. When types don't match (and automatic type conversion fails), the compiler will error; when automatic conversion is possible, the compiler may warn. Try to avoid implicit type conversions — such as using a `double` to forcibly coerce an integer into a decimal, and so on.

### Scope

Similar to Python, C++ also has the concept of variable scope. In C++, code blocks are delimited using curly braces (braces), and code blocks can be nested within one another. Variables inside a code block can access information from variables outside the block, but variables outside cannot access information inside. When a variable leaves the code block in which it was defined, it is — barring special circumstances — automatically destroyed. The curly braces used in loops, conditionals, and function definitions also constitute scopes. Here's a small example:

```cpp
int main(){
    int i = 0;
    {
        int j = 1;
        i = 888; // success
    }
    // i will be 888 here

    // Below is an error:
    // j = 666;
}
```

### Control Flow: Loops and Conditionals

First, let's cover loop statements. I'll only introduce `for` loops and `while` loops here. Below is an example using both:

```cpp
for (int i = 0; i < 10; i ++){
    std::cout<< i << std::endl;
}

{
    int j = 0;
    while (j < 10){
        std::cout<< j << std::endl;
        j += 1;
    }
}
```

Both loops print the numbers `0` through `9`, and their syntactic features are entirely identical. In the `for` loop, the three items inside the parentheses are: the **pre-loop statement**, executed once before the loop begins — often used to declare and initialize the loop variable; the **loop condition** — the loop continues as long as this is satisfied; and the **end-of-iteration statement**, executed after each pass through the loop body. The `while` loop is much simpler: as long as the condition inside the parentheses holds, it keeps going. Note that the `while` loop below needs an extra enclosing code block to be equivalent to the `for` loop above. In other words, variables defined inside the parentheses of a `for` loop are temporary — they are automatically destroyed upon leaving the loop. Also worth noting: the three items in a `for` loop's parentheses are three *statements*, separated by semicolons `;`, not commas `,`. And the loop condition is actually an expression — when its value is `true`, the loop continues; when `false`, it stops.

Let me also introduce the so-called **range `for` loop**. When you have a fixed-length container-like variable, you can use:

```cpp
for (auto rep_elem : container){
    /* xxx */
}
```

This syntax causes `rep_elem` to sequentially take on each element of the container from front to back, completing the loop.

For conditionals, I'll only cover `if-else`. Here's an example:

```cpp
if (3 > 4){
    std::cout<< "false" << std::endl;
} else if (3 < 4) {
    std::cout<< "yes" << std::endl;
} else {
    std::cout<< "?" << std::endl;
}
```

The syntactic behavior is self-explanatory, so I won't belabor it.

Also worth introducing are the `break` and `continue` control commands. When a loop encounters `break`, it immediately stops. When it encounters `continue`, it ends the current iteration and proceeds to the next. For nested loops, `break` and `continue` only control the current loop — they won't affect parent loops.

### Functions

A C++ function consists of five elements: return type, function name, parameter list, function body, and return value. Here's an example:

```cpp
double my_add(double a, double b){
    return a+b;
}
```

Here we've declared a function with return type `double`, named `my_add`, accepting two `double` parameters. These three elements suffice to declare the function's existence. The function body and return value that follow constitute its implementation — here it does just one thing: returns the sum of the two parameters.

A few things to point out: C++ functions are allowed to return nothing, in which case the return type is `void`. Functions can also accept no parameters — simply leave the parameter list empty, though the parentheses are mandatory. I personally recommend defining the function at the point of declaration, but when necessary, you can list the declaration and place the definition elsewhere — for instance, putting the declaration in a header file and the definition in a source file.

Additionally, I'd like to offer another way of understanding functions: as an independent code block with external channels. This code block can bring outside values in through its parameter list, and then return a result from within to the outside. When you need to use this code block, you simply use its name. Another important note: for functions defined as in the example above, the function cannot change the values of external data. You can think of everything inside the code block as independent from the rest — it doesn't touch the external context and only operates on the data passed in. If you need to modify external data, you must pass in a **pointer** or a **reference** through the parameter list. These two concepts will be introduced in the next section.

Finally, functions allow **recursive calls** — a function calling itself. Through recursion, complex logic can be implemented with relatively simple code. C++ functions also support **overloading**: the same function name can be distinguished by different parameter lists, letting the compiler automatically figure out which function to call. Note that differing only by return type is insufficient for disambiguation — only the parameter list allows the compiler to tell overloaded functions apart. One might consider folding the parameter list into the "function name," which could shed some light on the concept of *function pointers* — but that may have issues, so take it as food for thought.

### Pointers

I won't go into the complexities of pointers here — just a rough introduction to their most basic usage and the ideas (possibly) behind them. Before discussing pointers, it's necessary to briefly introduce the memory model under C++.

During program execution, the memory managed by the operating system for the program can be divided — according to the code's content — into two regions: the **heap** and the **stack**. The stack is actually a data structure — a last-in-first-out queue — but here we'll simply understand it as memory directly managed by the program. This memory (holding, say, certain variables) is created by the code and lives on the stack; when a program's variable leaves a certain scope, the variable's lifetime ends and it is popped from the stack and destroyed. This brings benefits — all of the program's memory receives proper management. But the stack space the OS allocates to a program is finite; when the stack cannot hold all the variables, the program will throw a *stack overflow* error.

To address this pain point, programs are allowed to request memory from the operating system that does not directly belong to the program's stack space. This obtained memory resides on the **heap**, and to declare or use this memory, one can employ **pointers**. A few things to note: although the heap is large, its data is scattered, so access speed may be lower than stack memory. Furthermore, even though the space is vast, creating memory without bound and without freeing it — especially in long-running programs — can exhaust all available memory, leading to what's called a **memory leak**. Since accessing heap data almost exclusively requires pointers, special care must be taken when using pointers, particularly regarding memory deallocation.

So what exactly is a pointer? Let's distill what we've gathered above: a pointer needs to be able to obtain heap memory; C++ is a strongly-typed language; pointers are used to acquire and manage heap memory. If we consider that C++ can manage memory through memory addresses, the answer almost reveals itself: a pointer is, in fact, a special kind of variable. It records an address and the type of data stored at that address (the same data, interpreted under different types, yields different values — for instance, `0` as an `int` is the number zero, while as a `bool` it's `false` — so the pointer's type is (in most cases) mandatory). Subsequently, to use the data stored at that address, you simply **dereference** the pointer to obtain the value. Here's an example illustrating how to declare a pointer and how to obtain a variable's address:

```cpp
int i = 0;
int *p = &i;

// Output i's address
std::cout<<p<<std::endl;

// Modify i's value
*p = 1234;
std::cout<<i<<std::endl; //1234
```

In this example, we first declare a (stack) variable `i`, then use `int *` as the type to declare a pointer `p`, obtain `i`'s address with `&i`, and assign that address value to `p` (we say *p points to i*). Outputting `p` will print some hexadecimal digits. Then, using the `*` operator, we retrieve the value stored at the address held in `p` and directly overwrite the data at that memory location with `1234`. Since the address stored in `p` is exactly `i`'s address, writing new data to `i`'s address is effectively reassigning `i`. Thus, outputting `i`'s value now yields `1234`.

I hope this example and brief introduction help you understand what pointers are and what they do. Note that the variable pointed to here is still a stack variable, whereas in many situations where pointers are needed, what's required is data on the heap. To create a variable on the heap, use the `new` keyword. And after creating a heap variable, if you no longer need it, you **must** use the `delete` keyword to remove it. The main reason: when we declare a pointer, it's typically data created on the stack; as a stack variable, the pointer is destroyed when it leaves its scope. If only one pointer points to a given block of memory, destroying that pointer leaves no other way to reach the data in that memory. Yet since the memory was created via `new`, the operating system will keep it reserved until `delete` removes it, or until the program exits and the OS reclaims all memory. Thus, `new` without `delete`, when data volumes are large, causes severe memory leaks. Moreover, `new` without `delete` leaves data exposed, posing a security risk. However, if two pointers point to the same memory, and one pointer deletes it while the other still believes the memory is alive, that second pointer becomes a *wild pointer* or *dangling pointer*. Attempting to use such a pointer will cause the program to misbehave — at best, it errors and exits; at worst, it produces bizarre, hard-to-diagnose problems.

All of that wall of text ultimately serves to convey one message: **do not casually use pointers.** Pointers are useful, but C++ provides many other, friendlier ways to manage and use memory. The moment you use raw pointers and forget to delete them, or encounter null pointers, your program will manifest all sorts of strange issues. So, unless you have absolute confidence in your skills, please don't casually use pointers.

Finally, let's mention how pointers can help a function modify external variables: by passing a pointer as a parameter. Although the function cannot change the parameter's own value, since the address stored inside the passed pointer is unaffected, the function can internally assign a value to the variable at that address, thereby circumventing the function's restriction. However, to achieve this goal, there exists a safer and more intuitive approach: *references*.

### References

Compared to pointers, references are considerably more approachable. Simply put, declaring a reference means declaring an alias for a variable. Let's look at an example:

```cpp
int i = 0;
int &ri = i;

std::cout<<ri<<std::endl;

ri = 5678;
std::cout<<i<<std::endl; //5678
```

Here we first declare a variable `i`, then create a reference `ri` as an alias for `i`. As a result, **any operation** performed on `ri` is (or should be) equivalent to performing it on `i` itself. When `i` is destroyed, both the variable `i` and its reference `ri` vanish together. Compared to pointers, references are clearly much safer. But with that safety come some restrictions: a reference cannot change what it refers to. Once a reference is created, the reference itself and the entity it refers to are bound for life. Moreover, due to the *alias* nature of references, a null reference cannot exist — this means a reference's "declaration" must immediately initialize it, and once initialized it cannot be changed. Thus, terms like "declare" or "assign" aren't quite right here — the most accurate term is **initialize**.

It's also worth noting that references, like pointers, can be passed as function parameters. When a reference is passed into a function, its "alias" property is preserved — changes made to the parameter inside the function will still be reflected outside. One way to understand this: the default parameter-passing mechanism copies the parameter's value, creates a temporary variable, and uses that; pointer passing copies the pointer's address, and then using that temporary address allows modifying the data at that address without changing the address itself; reference passing creates a temporary reference, and due to the nature of references, the function's effect on the reference is equivalent to its effect on the original variable.

In summary, references are the more recommended approach in C++. That said, references also have other limitations. Because a reference is ultimately a variable's "alias" and doesn't alter the variable's memory layout, there is no such data structure as an "array of references." Likewise, there are no references to references, nor pointers to references. This is mainly because a reference is not an actual object — it occupies no memory and thus has no address (see [this Stack Overflow answer](https://stackoverflow.com/questions/1164266/why-are-arrays-of-references-illegal)).

Finally, some claim that references are simply constant pointers that must be initialized. Opinions vary on this; personally, I think it's a reasonable way to understand their behavior, but the two cannot be equated — the actual implementation depends on the specific compiler.

### Classes, Templates, and the STL

The preceding sections covered nearly all of C++'s basic syntax. Let's now round things out with some additional topics: C++'s object-oriented programming (classes), templates, and the Standard Template Library.

#### Classes and Object-Oriented Programming

Object-oriented programming was briefly introduced in the Python section. Here I'll build on that foundation to introduce C++'s OOP syntax.

First, note that C++ has two similar data structures: `struct` and `class`. It's generally held that the only difference between them lies in default access control — `struct` defaults to `public`, while `class` defaults to `private`. Though there might be some nuanced differences; I'm not entirely sure myself (I don't really know).

Here's a simple class declaration example:

```cpp
class my_class{
    private:
        int value{0};
        bool is_true{false};
    public:
        my_class(int v, bool is){
            this->value = v;
            s_value = is;
        }
        void print_info(){
            std::cout<< "Data is obtained?  "<< is_true<<std::endl;
            std::cout<< "Value is  "<< value<<std::endl;
        }
} simple_class_sample ;
```

Here we've declared a class named `my_class`. It contains two data members, protected by `private` so the outside world cannot directly access them. In the `public` section, there are two functions: `my_class` and `print_info`. Being public, these can be called from outside the class. Notice that `my_class` shares its name with the class itself. This is a special kind of function called the class's **constructor**. When creating a new variable of this class type, you can use this function to initialize the variable. Thanks to function overloading, a class can have multiple constructors to satisfy different construction needs. Several functions are automatically defined here, including the **destructor** (called to destroy the variable when it leaves scope), the **copy assignment operator** (for creating a new variable by copying), and the **default constructor** (which does nothing, initializing class members to their default values), among others.

A reminder: creating a class is essentially creating a new composite data type. Through this composite type and the functions (methods) defined inside it, you can manipulate variables (objects) created with that type through those methods.

Lastly, a class definition must end with a semicolon after the closing brace — otherwise the compiler will error. You can also immediately create a variable after the class definition, as done here with `simple_class_sample`, which uses the default constructor.

C++'s OOP features are very rich and fairly complete — I won't go further into them here.

#### Templates

Templates are a more complex, higher-level style of programming. Templates are evaluated at compile time, so from a certain perspective, they can be thought of as "code that generates code." I mention templates here mainly as a lead-in to the Standard Template Library, so this will be only the briefest introduction.

Here's an example of creating a function template and a class template:

```cpp
template<typename T>
T my_add_t(T a, T b){
    return a+b;
}

template<typename T>
class class_T{
    private:
        T value{};
        int index{0};
    public:
        void print_T_value(){
            std::cout<< T.text <<std::endl;
        }
};
```

Here we've created a function template `my_add_t` and a class template `class_T`. To use them, simply append angle brackets to the template name and place the desired type inside. One thing to note: when using the class template defined here, the type `T` must have a member called `text` — otherwise it will error.

#### STL: The Standard Template Library

STL stands for Standard Template Library — a collection of function and class templates ready for use. In scientific computing, the most commonly encountered class template is `std::vector`. As a class template, you need to place the variable type inside angle brackets when using it. There aren't many restrictions on this type — aside from the historical caveat that `bool` is not recommended — and virtually any variable type can instantiate the template. Other container class templates include `std::deque`, `std::array`, and so on, each with its own characteristics (search on your own if interested). Here I'll introduce some commonly shared methods of these container classes.

As a container, there must be a method to report the number of elements it holds — this is `size()`. Calling `size()` returns a `size_t`-typed number indicating the element count. Next, we need to access elements within the container. STL provides the `at()` method to retrieve an element from a specific position; it accepts an integer index and will error if the index is out of range. STL also provides the traditional subscript `[]` operator, but this is unsafe — no bounds checking is performed. For `std::vector`, you can use `push_back()` to append an element from the parameter list to the end of the container. To remove the last element, use `pop_back()`. Finally, let's cover the **iterator**, which all STL containers have. Calling `begin()` returns an iterator, which behaves somewhat like a pointer — it supports addition/subtraction with integers, comparison by magnitude (the first element is smallest, the last is largest), and equality checks. The iterator pointing **one past** the last element is `end()`. Thus, accessing container elements through iterators is also supported. Additionally, when comparing iterators, prefer equality/inequality checks over magnitude comparisons — some iterators may not implement magnitude comparison.

## A Simple C++ Computational Case Study: The Heat Equation

At long last, after this lengthy and tedious syntax tour, we can finally look at an actual problem and attempt to solve it using C++. Our first case study is the so-called Fourier heat transfer problem.

### Problem Statement

The problem is as follows:

> [!QUESTION]
> Suppose there is a heat source centered at $x = 64$, with a width of $40$ and temperature $1$. Let the entire simulation domain have a width of $128$, with fixed boundary conditions applied at the edges; the temperature everywhere outside the heat source is $1$. The heat equation is known to be:
> $$ \dfrac{\partial T}{\partial t} = \mu \dfrac{\partial^2 T}{\partial x ^2},$$
> and for this problem, take $\mu = 1$. Compute the system's evolution under the above equation.

The PDE here is a simplified version of the Fourier heat equation, treating the thermal conductivity at each point as constant and merging all other parameters into $\mu$.

### Problem Decomposition

Analyzing this problem, we have quite complete information. With our knowledge of the Laplacian operator and the forward Euler method, we can quickly construct the corresponding C++ code. We adopt $\Delta x = 1$ and $\Delta t = 0.2$ as the spatial and temporal step sizes for computing the spatiotemporal derivatives, then use the forward Euler method to iteratively evolve the system. At the code level, we'll use the most basic procedural approach, noting that for boundary handling, the fixed boundaries have a temperature of $0.0$.

### Code Implementation

Here's an example I wrote:

```cpp {lineNos=inline}
#include <chrono>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

const int Nx = 128;
const double dx = 1.0;
const double dt = 0.2;
const double mu = 1.0;
const int nstep = 20000; // total iterate time
const int pstep = 200; // print result every 200 step

int main() {
    auto begin_time{std::chrono::high_resolution_clock::now()};
    std::string result_dir{"./results/"};
    std::filesystem::create_directories(result_dir);

    std::vector<double> mesh(Nx, 0.0);
    for (int i = 0; i < Nx; i++) {
        if (i >= 44 && i <= 84) {
            mesh.at(i) = 1.0;
        }
    }

    // tempory mesh for value storage
    std::vector<double> temp_mesh(mesh);

    // ----- Begin Simulation ----- //
    for (int istep = 0; istep < nstep + 1; istep++) {

        for (int i = 0; i < Nx; i++) {
            int im = i - 1;
            int ip = i + 1;
            double val_m{0.0}, val_p{0.0};

            // Fixed boundary condition (to 0)
            if (-1 == im) {
                val_m = 0.0;
            } else {
                val_m = mesh.at(im);
            }
            if (Nx == ip) {
                val_p = 0.0;
            } else {
                val_p = mesh.at(ip);
            }

            temp_mesh.at(i) = mesh.at(i) + mu * dt * ((val_m + val_p - 2.0 * mesh.at(i)) / (dx * dx));
        }
        // update the origin mesh
        mesh = temp_mesh;

        if (istep % pstep == 0) {
            std::string of_name{result_dir + "fixed_step_" + std::to_string(istep) + ".csv"};
            std::ofstream ofs(of_name);
            // if the file is indeed opened
            if (ofs) {
                ofs << "\"pos\"" << "," << "\"val\"" << std::endl;
                for (int i = 0.0; i < Nx; i += 1) {
                    ofs << i << "," << mesh.at(i) << std::endl;
                }
            }
            // close the file after write
            ofs.close();
        }
    }
    // ----- End Simulation ----- //

    auto end_time{std::chrono::high_resolution_clock::now()};
    std::cout << "The time cost in this simulation is " << std::chrono::duration<double>(end_time - begin_time).count() << "s\n";
    return 0;
}
```

This code uses a few tricks — checking for subscript out-of-bounds to detect boundary conditions, and using the `<chrono>` library to measure program runtime. After a successful run and plotting the output CSV files, the results look roughly like this:

![Heat equation solution](/posts/PF_Tutorial/img/heat_transfer_result.png)

The results are fairly in line with expectations.

## Closing Remarks

It's been too long since my last update, and writing this didn't come as naturally as I'd have liked. Looking back after finishing all this — I wrote *this much*?! C++'s fundamental knowledge points turned out to be far more numerous than I'd imagined. If you've made it this far, thank you for your support. To be honest, C++ is genuinely easy to pick up — with some programming background, you can quickly write code that compiles and runs. However, C++'s sprawling syntax features and sheer richness of content make its advanced learning curve exceptionally steep. Almost no one dares claim to have truly "mastered" C++, because some obscure quirk always lurks in this historically deep and venerable language — a quirk the questioner happens to know but the answerer does not. Fortunately, if your goal is merely to use C++ for straightforward high-performance computing, the introductory content — this long-winded, tedious pile above — should be just about enough. In actual programming, most function and class APIs need to be looked up on the spot; sometimes you really do find yourself resorting to CV-driven programming (copy-paste). Furthermore, regardless of the language, the language itself can only provide some convenient features or some pre-packaged algorithmic wheels. The most important thing in actual programming is how to analyze a problem and design an algorithm to solve it. I hope the language doesn't become your stumbling block.

In the next chapter, I'll formally use C++ to implement a phase field (actually a concentration field) simulation of spinodal decomposition governed by the Cahn–Hilliard equation. The chapter after that will cover a grain growth simulation under the Allen–Cahn equation, serving as the final installment of this introductory series. Stay tuned.
