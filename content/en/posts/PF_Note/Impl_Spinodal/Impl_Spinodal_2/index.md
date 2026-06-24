---
categories:
- Phase Field
- Programming
tags:
- Python
- Numerical Analysis
- Spinodal Decomposition
title: "Phase Field Simulation, but in Many Languages II"
description: Let's try Python!
image: /images/Alice-2.png
imageObjectPosition: center 20%
date: 2026-04-01
math: true
---

*In the previous post, we tried using C++ to run phase field simulations. Besides C++, another major favorite in scientific computing is the extremely popular language Python. What interesting features can Python bring to this simulation? How can its implementation be done? Let's take a look together~*

*To maintain the consistency of the series, we once again chose the header image from last time: AI Alice drawn by [Neve_AI](https://x.com/Neve_AI). The song choice is one I've recently become obsessed with, the theme song of the 2025 summer event *Misty Memory*, released by [Monster Siren](https://monster-siren.hypergryph.com/) (which is actually Hypergryph): [Misty Memory](https://monster-siren.hypergryph.com/music/048708). This song has three versions: Day version, Night version, and Instrumental; we're playing the Day version here. The languid vocal line is perfect for leisurely listening alone. Hope you enjoy it!*

{{< music auto="https://music.163.com/#/song?id=2070352215" loop="none">}}

## Phase Field Method and Python

When it comes to scientific computing, I believe the vast majority of people will immediately think of Python, and indeed that is the case. Let's briefly introduce this language once again here.

### Python: Magical Glue and Universal Tool

Python is a high-level programming language. It was born from a project by Guido van Rossum (affectionately known as Uncle Turtle) in the 1980s, creating a scripting language for an operating system called Amoeba at the time. It was subsequently vigorously developed by the community, undergoing several transformations, and ultimately became what it is today. Python exists on virtually every computer — even the GNU debugger `gdb` depends on Python! Countless programs more or less need a bit of Python functionality, especially many computational simulation software packages. Their kernels may be written in other languages, but they very likely provide a customized Python Shell to facilitate automation work, such as Abaqus and Paraview.

So, what magical features give Python such widespread application? This brings us to the characteristics of the Python language.

- First, Python's syntax rules are relatively simple:
  - No (seemingly) cumbersome rules — almost WYSIWYG;
  - Flexible syntax, widely applying duck typing (if it quacks and walks like a duck, it's a duck);
  - Many convenient and interesting syntactic features (list comprehensions, etc.);
  - An intelligent interpreter that doesn't require explicit type declarations (even though types actually exist);
  - Many useful standard libraries, using which one can already do many things.
- Second, Python runs on the Python virtual machine and can be interpreted line by line at runtime, making debugging easy:
  - In contrast, many compiled languages are somewhat more difficult, like C/C++, which require using a debugger on the compiled product to *intervene* in the running program for debugging;
  - However, this is only *possible* — there are some means to approximately *compile* Python scripts to generate faster-running binary products;
  - The latest Python 3.15 is advancing *JIT* (Just In Time compilation), and I believe it will be even easier to use in the future.
- Finally, Python's success cannot be separated from the support of its vast community:
  - Python's ecosystem is extremely rich, with many outstanding open-source libraries in the scientific computing domain, such as [Numpy](https://numpy.org/), [matplotlib](https://matplotlib.org), [SciPy](https://scipy.org), etc., providing many convenient and useful libraries;
  - Beyond scientific computing, fields like data analysis, statistics, and machine learning also extensively use Python as their base language, developing many frameworks on top of it. The famous project [PyTorch](https://pytorch.org) provides excellent Python support;
  - Compared to some other languages, Python's CUDA support is better and more convenient, allowing programmers to easily leverage the power of GPUs for large-scale computation;
  - All of this ecosystem cannot be separated from the friendly atmosphere of the community and many excellent package managers. Besides the official package management system `pip` and [PyPI](https://pypi.org/), Python also has outstanding package/environment managers like `conda`. They make setting up development environments simpler and more modern.

Oh my. Python is truly so outstanding — no wonder it repeatedly tops many programming language rankings. But with all this glowing praise, does this language have any shortcomings?

Yes, my friend, it does. The most criticized point is probably the poor performance of native Python due to it running on a virtual machine, which is also why Python is not often the first choice in HPC (High-Performance Computing). However, what if we don't use native Python? Simply put, we use Python as glue, *gluing* together many practical utility libraries. This gluing operation does not involve any high-intensity computation, and high-intensity computation is generally placed inside these glued-together tools, many of which are compiled libraries. This way, the problem of insufficient performance can also be well resolved.

To verify our ideas, this time we will again use two code examples to illustrate this issue, and also compare with the previous C++ implementation. Of course, since we are using such an excellent tool as Python, we can let Python directly handle our visualization work. But before starting to write the program, so that this series is not a monotonous repetition of simulations, let's chat a bit more about the phase field here (padding).

### Phase Field and Evolution Equations

Although the phase field is commonly used for phase transformation simulations in materials science, stripped of its materials science background, it is nothing more than solving partial differential equations that rely on some kind of energy. Let's recall the Cahn-Hilliard (CH) equation:

$$
\frac{\partial c_i}{\partial t} = \nabla \cdot M_{ij} \nabla \frac{\delta F}{\delta c_j \left( r,t \right)};
$$

According to the theory that the system is at its thermodynamically most stable state when the system's free energy reaches a global minimum, if the free energy is at its lowest point, the variational derivative of the free energy functional with respect to concentration $\delta F/\delta c_j$ should be identically $0$. We are quite confident about this point, but why can we then construct a dynamic equation for evolving the phase field based on this?

#### Relaxation Ansatz

This stems from a concept in physics: the *Relaxation Ansatz*. When we know the equilibrium state of a system, we naturally want to know: what does the process of a system evolving from a non-equilibrium state to an equilibrium state look like? However, this is clearly a dynamic process, and we must obtain a dynamic equation that can describe its evolution, i.e., an equation containing time. But obtaining an equation that accurately and completely describes the motion of the entire system is no easy task, especially when we only know what the equilibrium state of this system looks like.

The good news, however, is that in the vast majority of physical systems, the following situation holds: a system is primarily driven by a certain physical quantity, and there is a simple relationship between the evolution rate of the entire system and the "distance" between this main driving force and the equilibrium state. For a thermodynamic system, its main driving force is naturally the free energy, and its "distance" from the equilibrium state can be well measured by the variational derivative; and what is the relationship between the system evolution rate and the change in free energy? Among the many possible relationships, *direct proportionality* is the simplest one. From this we obtain the Allen-Cahn (AC) equation:

$$
    \frac{\partial \eta_p}{\partial t} = -L_{pq}\frac{\delta F}{\delta\eta_q\left( r,t \right)}.
$$

What about the CH equation? From its form, its biggest feature is not a direct proportional relationship, but being wrapped in two layers of $\nabla$ shells. The appearance of these shells is actually closely related to the variable being evolved: for a conserved field, we need the material in the system not to flow in or out arbitrarily, meaning the divergence of this field should be $0$. So how can this constraint be realized from the perspective of the driving force? We can look at it from the perspective of material flux. Taking concentration, a typical conserved field, as an example, when the total material neither increases nor decreases, the change in material per unit time must be fully reflected in the form of material flux, i.e.:

$$
\frac{\partial c }{\partial t} + \nabla\cdot \mathbf{J} = 0.
$$

This constraint guarantees that any concentration change at an arbitrary point will produce a material flux that counteracts its effect. The divergence here is precisely the tool for measuring the magnitude of the flux. Therefore, we shift the task of directly evolving concentration to evolving the material flux. And the magnitude of the material flux, according to classical kinetic theory, is in turn directly *proportional* to the chemical potential gradient, i.e., $\nabla (\delta F/ \delta c_j)$. Finally, reassembling all of this yields the CH equation.

As can be seen, in the final *classical kinetic theory*, we once again used the relaxation ansatz. In fact, if we consider the most classical diffusion theory, the relaxation ansatz can be seen everywhere: the system's kinetic rate is always proportional to some key quantity.

#### Evolution Equations and Phase Field Models

From a certain perspective, the two classical evolution equations of the phase field can be obtained this way. Consulting some literature, one can see that the *multiphase field model* proposed by Ingo Steinbach et al. starts from the description of the equilibrium state, supplemented by the relaxation ansatz, and ultimately arrives at the evolution equation. The CH equation may not have been obtained so simply at first (it probably came from a crystallographic perspective, supplemented by some diffusion theory), but the relaxation ansatz still resides deep within the theory.

In fact, purely from the perspective of the evolution of dynamical systems, a 1977 review article excellently summarizes the dynamical models of critical-state systems in condensed matter physics: [Hohenberg and Halperin: Theory of dynamic critical phenomena](https://doi.org/10.1103/RevModPhys.49.435). In phase field, our AC equation corresponds to the *System with no conservation laws: Model A* in this paper, and the CH equation corresponds to *Conserved order parameter: Model B*. What's frightening is that this review lists a full eight major classes of related models, and phase field only uses categories A and B. However, these two categories are actually already quite rich, and we can actually develop more models from these two categories to overcome various new difficulties and solve new problems.

Nevertheless, one point must be noted here: evolution equations are not equivalent to phase field models. A phase field model, strictly speaking, is a system of partial differential equations used to describe the system. This system of equations can have a formalized *evolution equation*, but this formalized equation must also have a *specific energy expression* that can be plugged in. Fortunately, for the phase field method, the choice of energy is relatively broad and convenient, because all kinds of energies with physical backgrounds can be directly plugged into this energy functional and take effect. Therefore, in program implementation, we will consider separating the evolution equation from the energy description, thereby structurally implementing the phase field simulation.

Enough idle chat, let's start implementing the code in Python!

## Python Implementation

We plan to use two approaches here to simulate the spinodal decomposition from the previous post. First, we'll try using only native Python and its standard libraries to see how the simulation performs. The second approach will use some external libraries such as *Numpy* to observe whether computational efficiency changes, and compare both with the results from the previous post.

The Python version used in this post is 3.13.12 (MSC v.1944 64 bit (AMD64) on win 32). Since the Python interpreter implementation is roughly the same across platforms, we won't try it on other platforms.

### Native Python

The first version of the code is, to put it bluntly, just a direct Python rewrite of the previous [CPP_impl_v1.cpp](/attachments/Impl_Spinodal/CPP/CPP_impl_v1.cpp). However, even so, this rewriting process is quite interesting.

First, we can find that in the Python code, implementing the features of the C++ version while only depending on the standard library requires very few libraries, namely:

- `os` library for folder creation;
- `random` library for random numbers;
- `time` library for timing,

And everything else including data types, function objects, etc., is built-in, requiring no additional library imports — truly very convenient (of course, at a cost; it's slightly bloated). In order, let's first examine the `write_vtk` function.

#### `write_vtk`, Formatted Strings, and Loops

```python
def write_vtk(mesh, folder_path, time_step, Nx, Ny, dx):
    os.makedirs(folder_path, exist_ok=True)
    file_name = folder_path + "/step_" + str(time_step) + ".vtk"
    with open(file_name, "w") as f:
        f.write(
            f"""# vtk DataFile Version 3.0
{file_name}
ASCII
DATASET STRUCTURED_GRID
DIMENSIONS {Nx} {Ny} 1
POINTS {Nx*Ny*1} float
"""
        )
        for j in range(Ny):
            for i in range(Nx):
                f.write(f"{float(i*dx)} {float(j*dx)} {1}\n")

        f.write(
            f"""POINT_DATA {Nx*Ny*1}
SCALARS CON float
LOOKUP_TABLE default
"""
        )
        for j in range(Ny):
            for i in range(Nx):
                f.write(f"{mesh[j][i]}\n")

        f.close()

```

Python function definitions only need the `def` keyword and a parameter list, without needing to specify the function's parameter types or return result, and the return value type does not need to be annotated. This is precisely the power of the so-called automatic type inference system and duck typing: the user does not need to care about types that can be inferred, nor specify what type a parameter is. As long as the operations performed on that type within the function body are satisfied, one need not worry about what exactly it is.

Also observable is that Python uses the `open` function when writing files, with the following string representing the mode of opening the file (read or write), and finally `with open() as f` gives a name to the opened content. This way of writing fits English reading order very closely, which is one reason Python is well-liked. Additionally, this approach also ensures that internal operations are only executed while the file object `f` is open, and when the file is closed, execution immediately stops. Within the written content, something like this appears:

```python
f"""# vtk DataFile Version 3.0
{file_name}
ASCII
DATASET STRUCTURED_GRID
DIMENSIONS {Nx} {Ny} 1
POINTS {Nx*Ny*1} float
"""
```

This is a combination of the so-called formatted string *f-string* and *docstring*; it can store string formatting information literally within `"""`, which is quite handy in this situation, avoiding the ugly approach in the C++ implementation of using stream output to intersperse variables and strings little by little.

In this function, another interesting point is Python's loops. In Python, all `for` loops are generated through iteration. Therefore, when using a `for` loop, there must be an iterable container-like object. To loop from `0` to `N-1`, Python provides the `range()` object to solve this problem. When using `range(N)`, it automatically creates a traversable iterable object, successively fetching `0`, `1`, up to `N-1` from it. To some extent, this approach more clearly distinguishes `for` loops from `while`/`do while` loops, making `for` loops appear not merely as shorthands for `while` loops.

#### `mesh_periodic` and Python Variables

The next function, `mesh_periodic`, once again demonstrates the advantage of Python's duck typing:

```python
def mesh_periodic(mesh, Nx, Ny, dx, ker_func):
    new_mesh = [[0.0] * Nx for _ in range(Ny)]
    # new_mesh = [[0.0] * Nx] * Ny
    for j in range(Ny):
        for i in range(Nx):
            v_c = mesh[j][i]
            v_l = mesh[j][i - 1] if i != 0 else mesh[j][-1]
            v_r = mesh[j][i + 1] if i != Nx - 1 else mesh[j][0]
            v_d = mesh[j - 1][i] if j != 0 else mesh[-1][i]
            v_u = mesh[j + 1][i] if j != Ny - 1 else mesh[0][i]
            new_mesh[j][i] = ker_func(v_c, v_l, v_r, v_u, v_d, dx)

    return new_mesh
```

Here, our function parameters do not need to explicitly specify types, thus saving us from using a long and clumsy type description for `ker_func` being some specific function object. Additionally, when creating the temporary grid, you may have noticed that we have two ways of writing it:

```python
new_mesh = [[0.0] * Nx for _ in range(Ny)]
# new_mesh = [[0.0] * Nx] * Ny
```

In Python, multiplying a `list` by an integer means repeating the values in that `list` by the integer factor, so `[0.0] * Nx` means creating a list of length `Nx` filled with `0.0`; and `[xxx for _ in range(Ny)]` is a Python language feature called list comprehension. Its purpose is to directly fill a list using the following expression, somewhat like generating the elements of the list in place, with the generation rule written inside `[]`. The meaning of this snippet here is to take `[0.0] * Nx` as a representative element and generate it `Ny` times. Thus we obtain a list that has `Ny` elements inside, each element being a list holding `Nx` copies of `0.0`.

But in that case, why not use `[[0.0] * Nx] * Ny`? Let's do a small experiment. Open a terminal, type `python` to enter the interactive environment, and then enter the following line by line:

```python
a = [[0.0]*2]*5
a
a[0][0] += 1.0
a
```

Are you confused, my friend? () Let's also try this:

```python
b = [0.0]*2
c = [b]*5
c[0][0] += 1.0
b
```

Upon seeing this result, you may have already guessed what's going on. The two ways of writing above and below are the same in Python's eyes: that is, we take the single *reference* `b` stored in the list `c` from each position in `c`, and then add `1.0` to the first element of that reference. Because every element stored in `c` is a reference, changes to the reference are directly reflected in the variable itself, so naturally, the first position of each element of `c` (i.e., the first position of `b`) becomes `1.0`. In other words, if we use the approach `new_mesh = [[0.0] * Nx] * Ny`, we don't really get `Nx * Ny` copies of `0.0`, but rather `Ny` references to the single object `[0.0] * Nx`.

Why is this? Why does `b = [0.0] * 3` not produce `[1.0, 1.0, 1.0]` when `b[0] += 1.0`, while `c[0][0] += 1.0` causes every element's first position of the list to increment by 1? This involves Python's unique variable management strategy. Python variables are *not necessarily* simple "boxes" for holding some values like in other languages. A portion of Python objects are classified as *mutable*, while the rest are *immutable*. (Some) integers, (some) strings, and some data structures are immutable — if the value of the variable "storing" them changes, a new object will be created and rebound to the variable, rather than directly operating on these immutable values. Correspondingly, for mutable objects, operations that cause them to change generally do not create a new object, but rather directly change the original object. So, for Python, objects are bound to variable names, and operations on variable names are actually all attempts to operate on the values (objects) they are bound to, and then based on the object's type, decide whether to rebind or change the existing object.

So how do these distinctions affect `b` and `c`? This actually goes back to what the `expr * N` operation does. When using `* N` on a list, it tries to *evaluate* the preceding expression *once*, and then tries to bind the reference to that result in `N` positions of the list. For immutable objects, when operating on the immutable object at one of the positions, because it is *immutable*, the only way to change that position is to reconstruct an object that meets the requirements; for mutable objects, since each position is bound to a reference to the *single result* computed earlier, a change to one position directly changes the value of this *single result* (because it is mutable), and `* N` only copies the reference, not the value, so the change at this position is reflected in all positions of this list.

And the reason `[[0.0] * Nx for _ in range(Ny)]` achieves what we want is simply that the `for` loop honestly creates this object `Ny` times and stuffs them into this list, where each list of length `Nx` is independent of the others. After this long detour, I hope you understand what happens with `[[0.0] * Nx] * Ny` and why we need to change the approach. This problem puzzled the author for a while, and was ultimately solved with the help of Stack Overflow and AI. Surprisingly, the Python official documentation Q&A includes [this question](https://docs.python.org/3/faq/programming.html#how-do-i-create-a-multidimensional-list) — those interested can take a look.

The operations inside the loop are actually very simple, just that we've written the conditional judgments in single-line form, making it look fancier. However, this `expression1 if condition else expression2` syntax was only finalized after several rounds of discussion in [PEP 308](https://peps.python.org/pep-0308/#id4), with some stories behind it, which we won't expand on here. Finally, we use `-1` directly instead of `Nx - 1` to fetch the last element of the list — this is also one of the conveniences Python provides us. At the end, we directly let `ker_func` eat 6 parameters in order and bind the result at row `j`, column `i` of `new_mesh`, completing the calculation for one point.

#### The `main` Function and Main Loop

We know that Python, as an interpreted language, does not need a `main()` function as a program entry point. However, we still use `main` here. This is also to reflect another feature of Python: "file as module." Python treats every script as a module and provides them with several variables as module meta-information. For example, `__name__` and `__main__` used at the end of this implementation. If the source code is run directly, then the `__name__` variable is assigned the value `__main__`, which is why we write `if __name__ == "__main__"` at the end. Of course, since there are no other files/modules in our implementation, writing `main()` directly would have the same effect. These special variables are called *magic attributes*, and the double underscores also have a corresponding English term: *dunder*, short for Double-Underscore.

Let's enter the main loop. For timing, we use the `perf_counter` function provided by the `time` module, which provides high-precision timing points. Next, we assign values to the parameters to be used later in the simulation. In Python, people commonly use all-uppercase variable names to indicate that this is a constant, but since Python has no enforced constants, all-uppercase is merely a naming convention, not a rule. Additionally, to conveniently define variables in bulk, we use the *tuple unpacking* syntax here, writing the parameters to be used in a tuple and then using a corresponding number of variable names to "catch" the results from the tuple, avoiding the awkward situation of needing as many lines of code as there are variables.

```python
start = time.perf_counter()
Nx, Ny, Nstep = (64, 64, 10000)
dx, dt = (1.0, 0.01)
kappa, M, A = (0.5, 1.0, 1.0)
dcon, con_init = (0.05, 0.4)
```

In initializing the structure, we mimic the approach from the C++ implementation earlier: after filling the list with initial values, we use the `uniform` function provided by the `random` library to conveniently generate random numbers within a range and assign them to the corresponding points.

```python
con_mesh = [[con_init] * Nx for _ in range(Ny)]
for j in range(Ny):
    for i in range(Nx):
        con_mesh[j][i] += random.uniform(-dcon, dcon)
```

Next, we prepare the computation kernels to be used later in advance. Here we still use Lambda expressions, but compared to the C++ definition approach, Python requires the `lambda` keyword to define Lambda expressions. Also, Python's Lambda expressions capture all capturable variables by default, without needing to explicitly specify which variables to capture like in C++. After the `lambda` keyword, write all the variables and separate the parameters from the return value with a colon, and the `lambda` expression is done.

```python
df_dc_ker = lambda v_c, v_l, v_r, v_u, v_d, dx: df_bulk_dc(
    v_c, A
) - kappa * laplacian(v_c, v_l, v_r, v_u, v_d, dx)
```

However, note that the purpose of `lambda` expressions is to provide a quick, disposable expression. This expression here will actually be used multiple times, and we have even given it an explicit name. According to [PEP 8](https://peps.python.org/pep-0008/#programming-recommendations), in this situation we should preferably use the `def` keyword to define a function object:

```python
# def df_dc_ker(v_c, v_l, v_r, v_u, v_d, dx):
#     return df_bulk_dc(v_c, A) - kappa * laplacian(v_c, v_l, v_r, v_u, v_d, dx)
```

Since the `def` keyword actually defines a function object, we don't need to specifically pull it in front of the `main()` function to define it; we can directly define it in place.

Next is the loop iteration, writing results to files via the `write_vtk()` function, and timing:

```python
for istep in range(Nstep + 1):
    df_dc = mesh_periodic(con_mesh, Nx, Ny, dx, df_dc_ker)
    dc = mesh_periodic(df_dc, Nx, Ny, dx, laplacian)
    for j in range(Ny):
        for i in range(Nx):
            con_mesh[j][i] += dt * M * dc[j][i]

    if istep % 100 == 0:
        write_vtk(con_mesh, "./output", istep, Nx, Ny, dx)
        print(f"Result {istep} outputed")

end = time.perf_counter()
print(f"Elapsed: {(end-start):.3f} seconds.")
```

What's noteworthy here is the `print` function. In Python, we finally have a very easy-to-use `print` function, which, combined with formatted strings, conveniently outputs results to the console, and it also automatically adds a newline. Of course, if we don't want it to add a newline, we can specify the `end` parameter to change what should be printed at the end of printing. Its default value is `"\n"`, the newline character.

At this point, we have successfully implemented the spinodal decomposition simulation completely in Python. This version of the code can be browsed and downloaded by clicking [this link](/attachments/Impl_Spinodal/Python/PY_impl_v1.py). Running results show that with file output, the computation takes about 19.7 seconds, and without file output, the computation still takes about 19.3 seconds. This indicates that the inefficiency of this Python version is not at all due to file IO, but purely because the computation itself is too slow. Comparing with the C++ results (see the comments section of the previous post), when we output to files, 5000 steps take about 2.4 seconds (10000 steps would take about 4.9 seconds), and when file output is not needed, 5000 steps take 0.29 seconds (10000 steps would take about 0.5 seconds).

So, is there anything that can be optimized with this code? Can using classic third-party libraries like Numpy help us compute faster?

### Python with Numpy

Let's jump right in and try! The version of Numpy installed by the author is 2.4.4. After installing `numpy` using `pip install numpy`, we simply replace our grid with `numpy.array` from `numpy`, i.e.:

```python
# new_mesh = [[0.0] * Nx for _ in range(Ny)]
new_mesh = np.array([[0.0] * Nx for _ in range(Ny)])
```

Conveniently, we can also update `dc` onto `con_mesh` like matrix scalar multiplication and matrix addition:

```python
con_mesh += dt * M * dc
# for j in range(Ny):
#     for i in range(Nx):
#         con_mesh[j][i] = dt * M * dc[j][i]
```

How does it turn out? Visibly slow! A computation that originally took less than 20 seconds now takes 87 seconds... Is something wrong?

Ah, it must be because we aren't updating directly inside `np.array` but instead creating new variables repeatedly! Let's make some modifications so that `mesh_periodic` no longer creates new temporary objects, but instead directly updates the result into the variable passed in via the parameter list. Then, before the time loop starts, create two temporary variables to hold the variables that will be updated shortly:

```python
def mesh_periodic_update(mesh, updated_mesh, Nx, Ny, dx, ker_func):
    for j in range(Ny):
        for i in range(Nx):
            v_c = mesh[j][i]
            v_l = mesh[j][i - 1] if i != 0 else mesh[j][-1]
            v_r = mesh[j][i + 1] if i != Nx - 1 else mesh[j][0]
            v_d = mesh[j - 1][i] if j != 0 else mesh[-1][i]
            v_u = mesh[j + 1][i] if j != Ny - 1 else mesh[0][i]
            updated_mesh[j][i] = ker_func(v_c, v_l, v_r, v_u, v_d, dx)

# ...

def main():
    # ...
    con_mesh = np.array([[con_init] * Nx for _ in range(Ny)])
    df_dc = con_mesh.copy()
    dc = con_mesh.copy()
    # ...
```

Additionally, we swap the Lambda expressions for functions defined with the `def` keyword:

```python
def df_dc_ker(v_c, v_l, v_r, v_u, v_d, dx):
    return df_bulk_dc(v_c, A) - kappa * laplacian(v_c, v_l, v_r, v_u, v_d, dx)
```

Try again! ...No good. The moment it started running, we knew something was wrong. The output every hundred steps popped up one by one — this didn't look fast at all... What else, what else can be optimized?

Right! How about splitting `df_dc_ker`? This way the computation kernel actually fails to leverage Numpy's batch computation features. Let's try:

```python
# mesh_periodic_update(con_mesh, df_dc, Nx, Ny, dx, df_dc_ker)
mesh_periodic_update(con_mesh, df_dc, Nx, Ny, dx, laplacian)
df_dc = df_bulk_dc(con_mesh, A) - kappa * df_dc
```

How about it? Will this be much faster? Wait, we realize that computing division is always more complex than computing multiplication, and division in our code almost only appears in the Laplacian calculation process. We can perfectly well precompute $\frac{1}{\mathrm{d} x ^2}$ and then simply multiply by it later. Let's call this new algorithm `laplacian_inv_dx2`:

```python
def laplacian_inv_dx2(v_c, v_l, v_r, v_u, v_d, inv_dx2):
    return ((v_l + v_r + v_u + v_d) - 4 * v_c) * inv_dx2
# ...
dx, dt = (1.0, 0.01)
inv_dx2 = 1/(dx * dx)
# ...
```

Let's try again this time. The result is great! We successfully shaved off 10 seconds!

Ugh, what a clown... Wasn't Numpy supposed to be fast? How come using Numpy actually made things slower!?!? Regardless, here is the complete code: [PY_impl_v2.py](/attachments/Impl_Spinodal/Python/PY_impl_v2.py). Feel free to read/download/mock ().

### Numpy's True Power!

Since we've become clowns, what's the harm in asking AI? Let's ask!

And wouldn't you know it, asking revealed that the extra time was primarily consumed at the *interface* between Python and Numpy. What does that mean? Originally, if we used Python's native lists, we just honestly computed and that was it. The speed being slower than C++ is understandable — after all, Python as an interpreted language has lower loop efficiency than C++ and that's not strange. But once we swapped native lists for Numpy's `np.array`, things changed.

When Numpy's `np.array` is created, it actually creates a structure akin to C language arrays. And the main reason this mathematical library is efficient is that it uses many algorithms and good data structures summarized by predecessors, such as the `np.array` wrapped up here. But the bad news is: we didn't truly use the methods of this data structure; we just clumsily moved it out and then used its matrix scalar multiplication and addition, and that's it. And for the most computationally expensive part — the Laplacian calculation — we still used the traditional manual approach.

No, it's even worse: when computing the Laplacian of `con_mesh` as an `np.array`, we need to fetch the four neighboring values and the center value at a given position. When fetching values, we used the `[]` subscript operator, which actually further increased the computational overhead. We tell Numpy, using Python syntax, to extract a value from a certain position in an array. This almost translational process — the time cost of a single call may not be noticeable, but after $64\times 64\times 5 \times 2 \times 10 000= 409 600 000$ calls, no matter how fast the call is, its weakness will be exposed. Furthermore, our algorithm completely fails to exploit Numpy's enormous advantage: vectorization. If all data groups could be processed in batch, all at once, rather than honestly walking through them one by one in a loop, computational efficiency would surely undergo a qualitative leap!

So what exactly should we do to unleash Numpy's true power? Given that our simulation uses periodic boundary conditions, and Numpy happens to have a function `np.roll` that can *rotate* the operated grid, thereby facilitating our Laplacian computation, here we harness its power and define a new function `laplacian_np`:

```python
def laplacian_np(mesh, inv_dx2):
    return (
        np.roll(mesh, 1, axis=1)  # left
        + np.roll(mesh, -1, axis=1)  # right
        + np.roll(mesh, 1, axis=0)  # down
        + np.roll(mesh, -1, axis=0)  # up
        - 4 * mesh
    ) * inv_dx2
```

This function does not compute the Laplacian value point by point; instead, it computes the Laplacian of the entire grid all at once, thus avoiding Python's loop operations. We use this function to implement the computational steps in the time loop:

```python
for istep in range(Nstep + 1):

    lap_c = laplacian_np(con_mesh, inv_dx2)
    df_dc = df_bulk_dc(con_mesh, A) - kappa * lap_c
    dc = laplacian_np(df_dc, inv_dx2)
    con_mesh += dt * M * dc
    # ...
```

How long does this take to run? 10,000 steps of computation (including file output) took a total of: 1.15 seconds! This is even much faster than our previous C++ implementation! And when we choose not to output to files, the result is about 0.52 seconds, comparable to the C++ result.

So, why is it so much faster? A key point is: we no longer need to have data frequently cross the barrier between Python and Numpy. Additionally, we no longer rely on Python's inefficient loops, but instead use the efficient loops of Numpy's own data structures.

You might ask: it's just not using Python's own loops anymore, and letting Numpy handle the internal loops of the structure — how can it be this much faster? The key point is actually that the CPU, when executing, perhaps doesn't honestly loop either, but instead uses *vectorization* technology, directly *adding, subtracting, multiplying, and dividing* the $64\times 64$ data here. That is to say, compared to honest looping, a conservative estimate would be about 400 times faster. In fact, vectorization technology is an important technique in modern CPU computing and a key optimization direction in HPC (High-Performance Computing). If a computation process can be vectorized, then the computation speed can be greatly improved.

Additionally, there is the question of whether memory can be rapidly loaded into CPU cores for computation. Modern computer technology is already quite advanced — addition, subtraction, multiplication, division, and modulo operations have long been optimized to require only a few clock cycles to produce results — but finding the objects to be computed from memory is still relatively slow. To solve this problem, people designed multi-level CPU caches. If the computation data can be loaded all at once into the fastest (and also smallest) L1d cache, the computation speed will be very fast (because you really just need to compute, and hardly need to search for data, i.e., hardly any *cache misses* occur). If the data is too large, but can be placed in the slightly slower L2, then there won't be multiple cache misses either; if the data is even larger, or the computation flow is poorly designed, the CPU may not be able to load the data well into these two locations, and the computation may become very slow.

Generally, modern CPUs have three levels of cache: L1, L2, and L3, where L1d is the space reserved for data, and L2 and L3 basically all go to data. To check the cache sizes at each level of your own CPU, Linux users can use the `lscpu` command; Windows users... I use WSL (). Below is the CPU situation of my laptop as listed by `lscpu` in WSL:

```
Caches (sum of all):
  L1d:                    768 KiB (16 instances)
  L1i:                    512 KiB (16 instances)
  L2:                     16 MiB (16 instances)
  L3:                     32 MiB (1 instance)
```

My L1d cache has a full 768 KiB! And if a $64\times 64$ grid stores all `double` type data, assuming `double` type data is 64 bits (8 bytes), the memory occupied by this grid would be 32 KiB, which fits entirely in the L1d cache. This is also why the computation is so fast when using Numpy arrays *under the condition of using internal loops*.

Likewise, we've posted the code [here](/attachments/Impl_Spinodal/Python/PY_impl_v3.py). Feel free to browse, download, and use~.

### What About Other Open-Source Libraries?

Besides Numpy, the available open-source libraries for Python are actually quite vast. Here we add some more content to the final version of the program to showcase more of Python's language features. Such as matplotlib, which is almost inseparable from Numpy, and PyQt6, the Python implementation of the veteran GUI framework Qt.

In the final version of the code, we try to further modularize, since Python is arguably the language I'm familiar with where it's easiest to show off fancy tricks, and modularization is perhaps one of the fancy tricks I know.

First, we define two major classes: one to store our data grid `Mesh`, and another, `Solver_CahnHilliard` (abbreviated as `Solver` below), dedicated to serving this simulation. In the data grid, we *only* record all information related to the grid, while in the solver we *only* record all information related to the solution.

Therefore, in the `Mesh` class, we mainly care about these things: grid size, spacing, the data stored by the grid, and some initial operations on this grid, such as assignment, creation, adding noise, computing the Laplacian (this might not be a great idea, but I put it here because it is strongly tied to the grid). In the `Solver`, what we care about is: total number of solution steps, output step interval, time step size, the grid being solved, solver-related parameters, the partial derivative form of the energy, and the operations on these data can be simply summarized as the time loop and result output.

After defining these two classes, what we have to do is very simple: directly create the grid, then initialize the solver, and finally solve and start! The results are obtained. Because our case actually has a very small grid, it can be completely stuffed into memory, so we can output to text files after finishing all computation as needed, or leverage the power of matplotlib + PyQt6 to directly open a graphical window to observe the results:

![The power of matplotlib + PyQt6!](matplotlib+pyqt6.png)

This code actually still has many areas that can be optimized, such as: should the "solver" define the main loop internally? If multiple energies need to be coupled, would it be best to put energy contributions into a List and iterate over them? Should some partial derivative forms of the free energy be built into the Cahn-Hilliard solver?

However, we won't delve into these questions for now. The specific content of this code is placed [here](/attachments/Impl_Spinodal/Python/PY_impl_v4.py) — feel free to download and try running it! Note that you need to install the three libraries `numpy`, `matplotlib`, and `pyqt6`~ As for runtime efficiency, completing the simulation on my machine takes about 1.6 seconds, which is quite a bit worse than our previous implementation results, but its advantage lies in showing off skills and premature optimization, i.e., it has no advantages. However, if you think this code helps you understand other language features of Python, then even if it has no advantages, it still has meaning ().

## Summary and Afterword

Python was much harder than I imagined. As a "tool language," my understanding of Python is actually not deep — many things were looked up on the fly while writing (and of course, AI assistance was indispensable). I hope to compare the four cases here with the two C++ code examples from last time from perspectives such as code structure, writing style, and runtime efficiency, to illustrate this point: the execution efficiency of code ultimately comes down to *whether the programmer can write efficient programs*, rather than *whether the language itself is efficient*. A language may itself be relatively slow, but such a cost must be traded for some better results, and in Python's case, what is traded is extreme ease of use, and even the enormous user base that has developed because of that ease of use. I believe it is precisely because of this enormous user base that open-source libraries like Numpy, SciPy, and matplotlib are willing to continuously contribute to the community, making the ecosystem of this language so rich.

However, whether a language itself is "efficient" still influences which language people prefer when dealing with certain tasks. For instance, many people criticize Python for its speed. Yet, if we use Numpy arrays *plus some understanding of the library*, we can write code that is no less performant than C/C++, languages typically considered "closer to the metal" and "more efficient." In fact, the key to Numpy's efficiency is that it is actually a compiled binary library callable from Python, and within the library it uses specialized mathematical tool libraries such as BLAS, thus effectively anticipating the user's usage behavior and better optimizing the data computation process.

Such precompiled binary operations are not only applicable to computation libraries like Numpy, but also to many machine learning libraries/frameworks. This is also why people are willing to use Python: under the premise of reasonably using library functions, one can both ensure efficiency and quickly validate/implement one's own ideas. This is precisely the most resounding slogan of the Python language: Life is short, I use Python!

So that's it! I hope you enjoyed this content. Since the lovely group member [開源 lib(](https://ex-tasty.com/) equipped my blog with modern frontend kits like React and TailwindCSS at lightning speed, I see no reason to postpone the JavaScript version of the implementation any further. In the next installment of this series, we will try implementing spinodal decomposition in JavaScript, which also gives the author a chance to learn the latest and trendiest JavaScript~ Finally, thank you for reading. I wish you physical and mental well-being, and happy coding!~
