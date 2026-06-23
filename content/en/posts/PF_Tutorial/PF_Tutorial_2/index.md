---
categories:
- Phase Field
- Mathematics
- Programming
tags:
- Tutorial
- Numerical Analysis
- Python
title: "Phase Field: Simulation Study Notes II"
description: Notes on learning the phase field method
image: /images/Skadi.png
date: 2024-11-22
math: true
links:
  - title: PF_Tutorial_2 — Python Implementation of Numerical Methods
    description: Recorded lecture on Bilibili
    website: https://www.bilibili.com/video/BV16jDVYTEbY
  - title: Lecture Notes Repository on GitHub
    description: Lecture notes hosted on GitHub, including slides and reference materials
    website: https://github.com/A-moment096/Phase-Field-Tutorial/tree/main/PF_T2-Numerical_Method_and_Python
---
*Continuing from the previous chapter, this section will briefly introduce some Python syntax and attempt to implement several of the algorithms listed previously in Python.*
<!--more-->
## A First Exploration of Python

### Introduction

Python is a type of python snake, but in the programming context, Python is an immensely popular programming language. Python features friendly syntax (close to English), powerful functionality (thanks to open source and the community), and an active community — all of which make Python an excellent choice for getting started with programming.

Why choose Python to implement the algorithms from the previous section? Two main reasons: first, Python's syntax is simply too friendly. For students who have never studied programming or don't know much about it, starting with Python makes it less likely you'll be scared off by language complexities. Compared to jumping straight into C++ (which we'll cover next), it's also beneficial to first get familiar with common programming concepts through Python. Second — and this might be my personal bias — Python is just so darn useful, and I'd like to do a little evangelism. As a handy tool language, it can help with all sorts of tedious tasks in many situations. For example, I really love using Python to plot functions — it's fantastic.

Anyway, we're choosing Python here as an introduction to programming. I believe that once you've built some programming fundamentals through Python, picking up other languages won't feel nearly as daunting (C++, say).

### Interpreter Installation and Environment Setup

#### The Python Interpreter

Running Python requires its interpreter. The latest Python interpreter can be downloaded directly from the [Python official website](https://www.python.org/downloads/). Linux users can install Python via their distribution's package manager. During installation, be absolutely sure to check **ADD TO PATH**, otherwise you may need to manually adjust environment variables so the shell can find Python.

What is an **interpreter**? Simply put, it translates your script *line by line* into machine-readable code instructions, then executes them. This is why Python runs line by line — which makes it great for debugging, and perhaps one of the reasons for Python's popularity. The counterpart to an **interpreter** is a **compiler**. Here I mean compiler in the narrow sense; in a broader sense, compilers can also encompass interpreters like Python's. A compiler doesn't interpret code line by line — instead, it treats the code as a whole, processes and translates it, and finally produces something the machine can read and execute. This approach allows compilers to apply many optimizations, but it partially sacrifices the convenience of "running line by line." Languages like C/C++ and Rust require a compiler. To make up for the lack of native line-by-line execution, these languages use debuggers and debug symbols — after compilation, they step through code by cross-referencing symbol tables, simulating line-by-line execution. However, this method still incurs some performance overhead.

The Python interpreter has multiple versions, each with syntax adjustments. Some changes are massive (like the Python 2 to Python 3 transition); others may involve rarely-used features and won't directly affect the user experience. The latest Python version isn't always the best — you need to consider project compatibility and package version requirements. That said, here we don't depend heavily on the interpreter version; as long as it's relatively recent and supports mainstream scientific computing libraries like `numpy`, `matplotlib`, and `scipy`, we're good.

#### Editors and Visual Studio Code

After installing the Python interpreter, you can technically start programming Python right away (yes — the legendary Notepad programming). But this is, of course, not the best approach — just the lack of syntax highlighting alone is hard to stomach. I personally recommend Visual Studio Code (hereafter VSC).

VSC is powerful, [easy to install](https://code.visualstudio.com/), and has an incredibly rich extension ecosystem. With proper configuration, it can nearly reach the level of an IDE (Integrated Development Environment). I write almost all my simple Python scripts in VSC. After a default installation, install the Chinese language pack if needed, then search for Python in the extensions page to install the Python extension bundle — and you're ready to write Python code (scripts) in VSC. For VSC installation and environment configuration, you can also refer to a [blog post](/posts/Tools_Note/VSC_Py/index.md) I wrote earlier.

I'm not recommending an IDE here, because for the simple applications we're doing with Python, an IDE is too "full-featured" — or rather, too heavy. Of course, if you're interested, you could try the renowned PyCharm. I won't elaborate further.

#### Virtual Environments, venv, and pip

Let's briefly introduce virtual environments. Python's rich ecosystem means you might encounter dependency conflicts, especially in collaborative development where everyone has different environment configurations. To address this, you can use Python's `virtualenv`. A virtual environment contains its own set of packages and is independent from everything outside it. Creating a `virtualenv` in VSC is straightforward: just press ``Ctrl`+`Shift`+`P`` to open VSC's command palette, search for `Python: Create Environment`, and follow the wizard step by step.

The created virtual environment lives in a `.venv` folder, which contains everything belonging to that environment, including all packages installed within it. If you no longer want the environment, just delete the folder. VSC automatically detects virtual environments and switches to them. If you're using a shell, you can manually run the `activate` script inside the `.venv` folder (under the `Scripts` subfolder on Windows, or `bin` on Linux) to activate the environment.

After setting up a virtual environment (or choosing not to use one), you'll need to download packages from the internet to help your Python scripts run and achieve various functionality. This is where a *package manager* comes in. Python's default package manager is `pip`. Installing or updating packages with `pip` is very simple — for example, to install `matplotlib`, just run `pip install matplotlib`. To update a package, use `pip install --upgrade matplotlib`. If you have a package list generated by `pip freeze` (typically named `requirements.txt`), you can install everything in it with `pip install -r requirements.txt`.

### Python Syntax Basics

That was probably too much preamble. Now let's cover the most essential Python syntax as a foundation for using Python, while also highlighting some concepts common across programming languages:

#### Types

Although Python is a dynamically typed language — data types are inferred from context — let's briefly go over the commonly used variable types in Python. The most common are the primitive types: `int`, `float`, `str`, `bool`, representing *integers*, *floating-point numbers*, *strings*, and *booleans* respectively. These types are natively supported by Python and are commonly built into most languages. Beyond these basics, there are many composite types, such as `List`, `Dict`, `Tuple`, and so on. These types are typically constructed from primitive types — for instance, a list is a container-like data structure formed by grouping together items of different types.

In Python, types are usually also *classes* themselves, meaning they come with member functions you can operate on. I won't go into detail here.

Additionally, despite being dynamically typed, Python still supports type annotations. Python uses postfix type notation — add `:` after a variable name followed by the type name to annotate it. It's worth noting that despite having type annotations, they should be seen more as hints for developers or users — these annotations carry *no enforcement power whatsoever*.

#### Variable Declaration

Variable declaration in Python is extremely simple: just follow the pattern `name = value` to declare and initialize a variable. Incidentally, variable assignment uses the same syntax, and since variables in Python have unique names, using `name = value` when `name` has already been declared will simply overwrite the old value with the new one. And because it's dynamically typed, no error will occur due to type mismatch. You can freely change a variable's type at any time. This is very flexible — especially when you're sure a variable's old value is no longer needed and its name happens to fit the next value perfectly; you can immediately overwrite it.

#### Scope

Programming languages commonly have the concept of *scope*. This concept can be understood as constraining a variable's lifetime. Generally, a variable's scope — unless specially declared — is only visible within its own region and that region's children.

One of Python's distinctive features is that scope is defined through indentation. Code written flush against the left margin belongs to the global scope. If code needs to be within a certain scope (e.g., inside a function definition, a `for` loop, or a conditional), you use a colon `:` to open a new child region, then use indentation to indicate which parts belong to that scope. This approach has mixed reviews — some find it clean and minimal, avoiding excessive symbols; others think it can make Python code logic unclear and hard to read. But regardless of opinion, Python's scope is defined through indentation. Variables defined in a parent scope are visible to child scopes, while variables defined within a child scope disappear once the program exits that scope, making them invisible to the outside. This is virtually universal across all programming languages.

For example:

```python
i = 10
outside = 1
if i > 0:
    inside = 10
    print(outside)
# The next line would error — name not found.
# Because when we left the scope above, `inside` was garbage-collected and vanished.
# print(inside)
```

Here `if` opens a new child scope; the variable `inside` defined within it is invisible outside, while `outside` is visible from within.

#### Control Flow: Loops and Conditionals

Python supports `for` loops, `while` loops, and others. The `for` loop is somewhat special — it can only loop over something that is *iterable*. "Iterable" includes things like the range generated by the `range` function, a List, a Tuple, etc. The syntax is:

```python
for i in iterable:
    # Do something
    # And something more
# Here is not inside the for loop.
```

Here `i` starts from the first element of `iterable`, and after each pass through the loop body, `i` becomes the next element in `iterable`, continuing until the iterable is exhausted. The `while` loop is simpler — it keeps looping as long as the condition is true, and stops when the condition becomes false. The syntax:

```python
while something_is_true:
    # Do something
    # And something more
# Here is not inside the while loop.
```

So in general, when using a `while` loop, you need to make the condition become false at some point within the loop body to exit.

Python's conditional statements follow a fairly universal form — here I'll just cover the `if else` pattern:

```python
if something_might_be_true :
    # Do something
elif something_might_also_be_true:
    # Do another thing
else:
    # No other condition is satisfied
# Not in condition
```

The syntax is very simple. Python also supports one-liner conditionals, comparable to C/C++'s ternary expression:

```python
do_something if condition_is_true else do_other_things
```

This syntax reads very naturally like English and avoids the cryptic ternary expression. But for code clarity, please try to use the full `if else` form.

#### Functions

Functions are a major component of many programming languages. Since Python is type-insensitive, function definition is very simple:

```python
def Some_function (parameter_1, parameter_2, parameter_with_init_value = init_value):
    # Do something
    # Do other things
    return some_value
```

This is all it takes to define a function. Here `Some_function` is the function name, which is itself a variable — so redefining it essentially assigns a new value to that variable.

`parameter*` are the function's parameters. These parameter names serve as placeholders for values passed into the function from outside, and are used within the function body. The last parameter, `parameter_with_init_value`, has a default value of `init_value`. Having a default value means you can omit this argument when calling the function, and it will use the default. When passing arguments to a function, you can pass them in order, or explicitly specify values by name — for example, `Some_function(parameter_2 = 1, parameter_1 = 3)` is perfectly valid.

The final `return` specifies the return value. A *return value* can be thought of as the result of the function's computation. This result must be explicitly designated with the `return` keyword; here `some_value` is used as a placeholder.

Besides facilitating code reuse, functions also make code structure clearer and help control the *input–output* logic of a piece of code. I won't cover *lambda* expressions here — these are anonymous functions without names but with function capabilities (parameter lists, return values), though most modern languages now support this feature.

### Python OOP, numpy, and matplotlib

Here we'll briefly introduce some more advanced language features and demonstrate the use of two common packages.

#### Object-Oriented Programming and Classes

Object-oriented programming (OOP) is an extremely popular programming paradigm. It packages data and operations on that data into *objects*, enabling unified data management. To achieve this, you need some way to create these packages — and that way is the *class*. Every language has its own take on OOP; in Python, class declaration and definition follows this syntax:

```python
class some_class:
    def __init__(self, param_1, param_2, param_default = default_val):
        # Define class members

        self.member_1 = param_1
        self.member_2 = param_2
        self.some_member = param_default

        # Do something, just like in a function

        self.do_something()
    
    def do_something():
        # Do something

# End of definition

my_variable = some_class(val_1, val_2) 

# Use Inheritance from some_class
class derived_class(some_class):
    def __init__(self, para_1, para_2, sub_para, para_default = default):
        # Must call parent class's __init__ method to avoid overwritting __init__ of parent class.
        some_class.__init__(self, para_1, para_2, para_default)
        self.sub_member = sub_para

        self.sub_class_method()

    def sub_class_method():
        # Do sub_class things

my_sub_variable = derived_class()
```

As you can see, Python lets you define what member variables a class has by defining the `__init__` function and calling some member functions. Defining member functions uses the exact same syntax as regular functions, but when accessing class contents, you need to use the keyword `self`. And when creating a variable from a class, you simply use the class name as a function name and pass in the parameters specified in `__init__` — this calls the member function `__init__`. Finally, one thing worth mentioning: Python's class member access control is managed through variable naming conventions — double underscores indicate the member is *private*, single underscores indicate it's *protected*, and regular names are *public*.

Private members are variables or methods only accessible from within the class itself. These are invisible outside the class. Protected members are only accessible within the class and its *subclasses* (derived classes). Public members have no access restrictions — they can be accessed from both inside and outside. Access control manages "who can access data inside the class," protecting data from accidental reads or tampering. How well you understand access control largely determines how well you understand the object-oriented paradigm.

However, we're not requiring OOP proficiency here (mainly because I don't know Python's OOP that well either) — this is just an introduction, and we'll only use its most basic parts.

#### Packages: numpy and matplotlib

Python's greatest strength is the vast collection of excellent packages contributed by its active community. For scientific computing, the go-to math library is `numpy`, and for plotting, `matplotlib`. Here's a brief introduction to their basic usage.

To import a package, use the `import` keyword. Typically, to use `numpy` and `matplotlib`, you'd write:

```python
import numpy as np
import matplotlib.pyplot as plt
# from matplotlib import pyplot as plt
```

The commented line and the line above it do the same thing. The `as` keyword creates an alias for the imported package, and to import a submodule you can use the `from` keyword or just dot into it and import.

First, let's cover some `numpy` usage. `numpy` mainly provides one data structure: `numpy.array`. This structure stores mathematical objects like arrays and matrices, and supports operations such as iteration, slicing, and common mathematical operations. You can initialize a `numpy.array` from a native Python `List`. For arrays of compatible shapes, you can perform addition, subtraction, multiplication, division, and other operations — both between arrays and between arrays and scalars — which is very convenient. Beyond that, `numpy` provides a wealth of mathematical functions, such as `numpy.exp`, `numpy.sin`, etc., as well as file operations to load data from files into `numpy.array` objects.

Now let's cover `matplotlib.pyplot` — a plotting library typically used together with `numpy` that can produce high-quality data visualizations. Here's an example plotting $y = \sin(2x)+1$, as a demonstration of both `numpy` and `matplotlib`:

```python 
import numpy as np
from matplotlib import pyplot as plt

x = np.linspace(0, 2*np.pi, 10000)
y = np.sin(2*x) + 1
plt.plot(x,y,"-b",label="$y = \sin(2x)+1$")
plt.xlabel("x")
plt.ylabel("y")
plt.legend(loc = 1)
plt.show()
```

This code first creates a `numpy.array` named `x` from 0 to $2\pi$ with 10,000 data points, then uses `x` to compute an array named `y` through arithmetic, and finally uses `matplotlib.pyplot.plot` to draw and style the plot. Note that `matplotlib` supports $\LaTeX$ syntax.

Python has a vast ocean of packages available, most with friendly APIs and gentle learning curves. I won't elaborate further here.

### Algorithm Implementation

The Python basics and more advanced topics end here. Now let's demonstrate how to implement the algorithms from the previous chapter in Python. The algorithms to implement are:

- Forward Euler method
- Numerical integration methods
- Finite difference computation of gradient and Laplacian

#### Forward Euler Method

The implementation of the forward Euler method mainly relies on its explicit formula. Let the ODE to be solved be:
$$
\dfrac{\partial y}{\partial x} = F(x, y),
$$
with the solution satisfying the initial condition $(x_0, y_0)$ over the interval $[x_0, x_t]$. Then by the forward Euler method, after choosing a suitable step size $\Delta x$, we have:
$$
y_{n+1} = y_{n} + \Delta x \cdot F(x_n, y_n)
$$

Thus, to implement this algorithm, the function should have the following:

> Input parameters:
> - $x$-axis discretization info (start position, end position, step size)
> - Initial value of the solution $y_0$
> - The explicit expression of the RHS function $F(x,y)$
> 
> Return value:
> - An array of computed $y$ values

Here's the Python implementation:

```python
from typing import Callable

def forwardEuler(
    x_0: float,
    x_end: float,
    dx: float,
    y_0: float,
    F_x_y: Callable[[float, float], float],
) -> list[float]:
    result: list[float] = [y_0]
    this_x = x_0
    this_y = y_0
    while this_x <= x_end:
        this_y = this_y + dx * F_x_y(this_x, this_y)
        result.append(this_y)
        this_x += dx
    return result
```

#### Numerical Integration

Implementing numerical integration is also relatively straightforward. Analyzing the algorithm's inputs and outputs:

> Input parameters:
> - $x$-axis discretization info (start position, end position, step size)
> - The integrand function
>
> Return value:
> - A single number, the integral value

Different integration algorithms yield different implementations. Below are four methods: the "Riemann"-style integral, the trapezoidal rule, Simpson's rule, and the Newton–Cotes formula.

```python {lineNos=inline}
from typing import Callable

def RiemannIntegral(
    f: Callable[[float], float], x_start: float, x_end: float, dx: float
) -> float:
    sum = 0
    x = x_start
    while x < x_end:
        sum += f(x)
        x += dx
    return sum * dx


def QuadratureIntegral(
    f: Callable[[float], float], x_start: float, x_end: float, dx: float
) -> float:
    sum = 0
    x = x_start
    while x < x_end:
        sum += f(x)
        x += dx
    sum -= (f(x_start) + f(x_end)) / 2
    return sum * dx


def SimpsonIntegral(
    f: Callable[[float], float], x_start: float, x_end: float, dx: float
) -> float:
    sum = 0
    x = x_start
    while x < x_end:
        sum += 4 * f(x + dx / 2)
        sum += 2 * f(x)
        x += dx
    sum -= f(x_start) + f(x_end)
    return sum * dx / 6


def N_C_Integral(
    f: Callable[[float], float], x_start: float, x_end: float, dx: float
) -> float:
    sum = 0
    x = x_start
    while x < x_end:
        sum += 32 * f(x + dx / 4)
        sum += 12 * f(x + dx / 2)
        sum += 32 * f(x + 3 * dx / 4)
        sum += 14 * f(x)
        x += dx
    sum -= 7 * (f(x_start) + f(x_end))
    return sum * dx / 90
```

#### Gradient and Laplacian

Here we'll compute these for the two-dimensional case. As before, consider the algorithm's inputs and outputs:

- **Gradient:**
  > Input
  > - The mesh to compute on (2D list)
  > - Mesh spacing
  > - Boundary condition field (fixed to periodic here for ease of implementation)
  >
  > Output
  > - Two 2D lists: the gradient in the $x$ direction and the gradient in the $y$ direction

- **Laplacian:**
  > Input
  > - Same as above
  > 
  > Output
  > - A 2D list storing the Laplacian at each grid point

Here's the code:

```python {lineNos=inline}
def calc_grad(
    mesh: list[list[float]], dx: float, boundary: str = "Periodic"
) -> tuple[list[list[float]], list[list[float]]]:
    Nx = len(mesh)
    Ny = len(mesh[0])
    grad_x = mesh
    grad_y = mesh
    for i in range(Nx):
        for j in range(Ny):
            v_l = 0
            v_d = 0
            v_r = 0
            v_u = 0
            if (boundary == "Periodic"):
                v_l = mesh[i - 1][j] if i != 0 else mesh[Nx - 1][j]
                v_d = mesh[i][j - 1] if j != 0 else mesh[i][Ny - 1]
                v_r = mesh[i + 1][j] if i != Nx - 1 else mesh[0][j]
                v_u = mesh[i][j + 1] if j != Nx - 1 else mesh[i][0]
            # elif (boundary == "Fixed"):
                # XXX
            grad_x[i][j] = (v_r - v_l) / (2 * dx)
            grad_y[i][j] = (v_u - v_d) / (2 * dx)
    return grad_x, grad_y

def calc_laps(
    mesh: list[list[float]], dx: float, boundary: str = "Periodic"
) -> list[list[float]]:
    Nx = len(mesh)
    Ny = len(mesh[0])
    laps = mesh
    for i in range(Nx):
        for j in range(Ny):
            v_l = 0
            v_d = 0
            v_r = 0
            v_u = 0
            v_c = mesh[i][j]
            if boundary == "Periodic":
                v_l = mesh[i - 1][j] if i != 0 else mesh[Nx - 1][j]
                v_d = mesh[i][j - 1] if j != 0 else mesh[i][Ny - 1]
                v_r = mesh[i + 1][j] if i != Nx - 1 else mesh[0][j]
                v_u = mesh[i][j + 1] if j != Nx - 1 else mesh[i][0]
            # elif (boundary == "Fixed"):
                # XXX
            laps[i][j] = (v_l + v_d + v_r + v_u - 4 * v_c) / (dx * dx)
    return laps
```

At this point, we've implemented in Python most of the algorithms we'll use in phase field simulations. In the actual simulation process, we may not need to package these algorithms as functions — implementing them inline may suffice.

### Summary

I hope this section provides further reinforcement of the algorithmic content from the previous chapter and helps bridge the gap between algorithms and their code implementations. At the same time, I hope the Python introduced here can become another useful tool in your daily learning and life, and that it gives you a basic entry point into the craft of programming, laying the groundwork for writing code going forward. The next chapter will cover how to implement these algorithms in C++ and use C++ to complete a small-scale simulation — an attempt to understand the problems faced during simulation and how to visualize the resulting data.
