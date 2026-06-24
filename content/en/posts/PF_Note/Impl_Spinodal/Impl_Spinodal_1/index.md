---
categories:
- Phase Field
- Programming
tags:
- C++
- Numerical Analysis
- Spinodal Decomposition
title: "Phase Field Simulation, but in Many Languages I"
description: Besides C++, what else can run phase field?
image: /images/Alice-2.png
imageObjectPosition: center 20%
date: 2026-03-24
math: true
---

*Currently, everyone working with phase field seems to use C++ or Python to run simulations, yet there are so many programming languages out there... right? Why not? This series is a little experiment, implementing a certain phase field simulation in various languages~ But a journey of a thousand miles begins with a single step, so let's start with the most commonly used C++!~*

*The header image is once again AI Alice drawn by [Neve_AI](https://x.com/Neve_AI), so cute~ I seem to like AI images more and more. The song choice is **Duvet**, which I've been really into recently — it's the theme song of the anime *Serial Experiments Lain*. It has a somewhat poignant feel, very captivating... sharing it with you, who are about to read this post filled with program calculations~ (as always, image and song are unrelated to the content)*

{{< music auto="https://music.163.com/#/song?id=3956911" loop="none">}}

*Damned wyy requires a membership argh, but you can also listen directly on Bilibili: [Lain Theme Song - Duvet](https://www.bilibili.com/video/BV1bA4y1X7h4)*

## Origins: Simulation and Programming Languages

One sunny afternoon, everything was so pleasant, and dear group member [開源 lib(](https://ex-tasty.com/) shared his latest topic: making an oscilloscope in the browser (see: [Wireless Ranging System (Part 2) - AirTag's Physical Dominance and Bluetooth 6.0's Advance](https://ex-tasty.com/posts/013-wireless-ranging-2/))! He also suggested that I could interactively bring some things into the browser, into my blog.

I must say: an excellent suggestion, but HOW? To bring it into the browser, wouldn't that require Javascript? But how would JS run phase field? And what to do with the results? Generally, phase field results are stored as a series of VTS files and then visualized using Paraview. But in the browser... I can't think of a good approach.

However, this idea greatly inspired me! Although doing this in the browser might indeed be a bit difficult, and since I'm not very familiar with JS/TS (the programming part of this blog has an extremely high vibe-coding component), running phase field in the browser is currently somewhat challenging; but, why do we always choose C++ and Python for simulations? Indeed, the pursuit of *performance* is a very practical need, but we can also try implementing simulations in other programming languages, right? After all, phase field simulation is just doing some numerical computation.

So, let's start with C++, which the author is most familiar with (maybe), and try implementing phase field simulations in more programming languages!

### A Brief Introduction to Phase Field Simulation

But, before implementing the phase field simulation, you might ask: what is phase field?

Simply put, materials contain many phases. After experiments, one can see the phase structure of the material, but without using very, very expensive in-situ experimental methods, it is very difficult to observe the process of phase transformation. The phase field method is a computational method that simulates the phase transformation process through numerical calculation. In the simulation, we define a small region, using $1$ to represent that a certain region is completely occupied by a certain phase, $0$ to represent that a certain region has none of that phase at all, and values between $0$ and $1$ indicate the phase boundary. The main factor driving the evolution of the phase field is the energy of the system, which in most cases consists of two major parts: bulk energy and interfacial energy. The bulk energy is responsible for continuously separating phases from a disordered state, making the system fully assume the form described by thermodynamics; the interfacial energy plays the opposite role, helping the formation of interfaces, giving the phases a *diffuse* interface, or in other words, making the region where values fall between $0$ and $1$ a bit larger. By properly tuning these two competing energy contributions, the phase field can continue to evolve.

The actual evolution process is governed by partial differential equations. Based on the characteristics of the variables, we use two major classes of equations to advance the phase field evolution: when the variable is conserved, meaning the total amount of this variable in the simulation domain should remain fixed, we use the Cahn-Hilliard family of equations to evolve it, the most classic example being the concentration field; when the variable has no conservation condition, we use the Allen-Cahn family of equations to evolve the field. Both equations have a most basic form, where the Cahn-Hilliard (CH) equation is:
$$
    \frac{\partial c_i}{\partial t} = \nabla \cdot M_{ij} \nabla \frac{\delta F}{\delta c_j \left( r,t \right)};
$$
and the Allen-Cahn (AC) equation is:
$$
    \frac{\partial \eta_p}{\partial t} = -L_{pq}\frac{\delta F}{\delta\eta_q\left( r,t \right)}.
$$
In both equations, $F$ is the energy functional, and $M$ and $L$ are the kinetic coefficients of the two equations.

When doing phase field simulation, after constructing the phase field theory (energy description, evolution equation), one needs to set up the solution-related aspects. First, the initial structure needs to be modeled, in other words, the initial conditions; then appropriate boundary conditions are needed to allow the field to evolve properly. Once everything is ready, one writes the program, runs the simulation, and outputs the results.

So, what should we simulate in this series? Speaking of phase field simulation, it should trace back to Cahn using it to simulate the spinodal decomposition of binary alloys, and for such a classic simulation, the model is surprisingly simple. In *Programming Phase-Field Modeling* by S. Bulent Biner, the first case study is the spinodal decomposition of a binary alloy. The programming language used in that book is Matlab, a language I'm not too fond of (because I don't know it), but it's sufficient as a computational reference.

### Series Introduction and Plan for This Post

This series plans to try all mainstream programming languages, and then try some less mainstream languages and approaches, regardless of whether the author actually knows the language or not. If I know it, I'll write it; if not, I'll learn it and then write it. This post plans to start with C++ and Python, which the author is most familiar with, and then use C, one of the old veterans of programming, and Rust, the hottest new-generation "Programming Genshin," to implement these two simulations. Code will be posted after each section, with a brief introduction to the language before the implementation, followed by results and possible comments after the implementation. Subsequent posts may consider switching to a different simulation case, roughly following the cases in *Programming Phase-Field Modeling*.

Additionally, in the process of implementing these calculations, we try our best to highlight the characteristics of each language. This means that a certain language's implementation may have several versions.

## Spinodal Decomposition Phase Field Theory

Actually, spinodal decomposition was already introduced in [Phase Field Simulation Study Notes IV](/posts/PF_Tutorial_4), but for the sake of completeness, we'll paste it here.

### Brief Introduction to Spinodal Decomposition

Spinodal decomposition is a type of phase transformation that may occur in a system when the free energy-composition curve exhibits a double-well shape. Its main characteristics are the absence of a nucleation process for the phase transformation and the system possessing a double-well type free energy. Its free energy-composition curve and phase diagram are shown below:

![Free energy-composition curve and phase diagram of spinodal decomposition](/posts/PF_Note/Impl_Spinodal/Spinodal-energy-curve.jpg)

According to thermodynamic theory, if a process can lower the free energy of the system, then this process is highly likely to occur spontaneously. When the composition is located in the middle of the well (relatively high and within the two inflection points of the curve), small fluctuations in composition will cause the entire system to spontaneously lower its free energy, which in turn affects surrounding regions and drives phase separation.

### Phase Field Model

We naturally use the CH equation to evolve this system. What matters is the constitution of the free energy. To mimic such a double-well, we use a very simple function to represent this free energy curve:

$$f_{\mathrm{bulk}} = Ac^2(1-c)^2,$$

where $A$ is a parameter controlling the height of the curve. After having the bulk energy, we need interfacial energy to allow the system to form a diffuse interface. We use the most classic gradient energy model:

$$f_{\mathrm{bound}} = \frac{1}{2} \kappa |\nabla c|^2,$$

Such gradient energy only has a value when the composition at a point differs from its neighbors in the up, down, left, and right directions, and the larger the difference, the larger this value, thus successfully preventing the interface from being too sharp (like 0 on the left and 1 on the right).

After some (perhaps) not-too-difficult mathematical derivation, we quickly obtain the equation we need to solve:

$$\frac{\partial c}{\partial t} =  M \nabla^2\left( 2Ac(1-c)(1-2c)-\kappa\nabla^2c\right)$$

### Parameter Settings

For simplicity and correctness of calculation, we directly use the parameters from the book. Among the model parameters, $A = 1.0$, $M = 1.0$, $\kappa = 0.5$. For modeling, the initial concentration is set to $c_0 = 0.4$, and random concentration noise is generated at each point, with a maximum noise of $\delta c = 0.005$. Then for discretization steps, we take $\Delta t = 0.01$, $\Delta x = 1.0$. The simulation domain is set as a $64\times 64$ square region. The boundary conditions are set as periodic conditions, meaning that if a point on the left boundary goes further left, it takes the value of the rightmost point, and similarly for up and down.

## C++ Implementation

C++ is arguably the first language the author encountered when doing phase field. Using C++ for phase field is, in some sense, a choice that balances ease of use and computational efficiency, right? Let's start with this one.

### A Brief Introduction to C++

C++ is a high-level programming language designed and developed by Professor Bjarne Stroustrup at Bell Labs in 1979. It is, in some sense, an extension and development of the C language, but not completely compatible with C (the two gradually diverged over the long course of development). C++ is characterized by the introduction of *classes* for organizing and managing data, and during its development people discovered that C++ can support *template metaprogramming* to allow certain processing logic to handle different data types. Compared to the C language, which is very close to the hardware, C++ has more tool libraries and is more suitable for building complex applications. Today it is widely used in fields such as gaming and high-performance computing. However, after long-term development, C++'s features have become increasingly rich, but the syntax has also become increasingly complex, and the barrier to entry has become very high. The so-called *Modern C++* starting from the C++17 standard has a very different coding style from C++ before that, to the point where some people even think it has become a different language entirely.

The implementation here will use some modern C++ features and some very useful newly added standard libraries, such as some standard libraries for generating random numbers and for managing the file system. However, this code should not be too hard to understand. The author's environment is Windows 10, and the most reasonable choice is naturally MSVC, but efforts will also be made to ensure the code runs properly on various platforms.

Let's begin.

### One C++ Implementation

Let's first do some preparation work, then design the algorithm and perform the computation. The complete code will be attached at the end of this subsection.

#### Calculation Preparation

First, let's define various constants. We put them at the very beginning for later use. This practice has some controversy (define variables when they are needed, rather than at the very start of the program), but the main advantage of defining them all at the front is that these are all constants controlling the model/simulation process, and scattering them throughout the program would be inconvenient for unified management.

```cpp
constexpr int Nx = 64, Ny = 64, Nstep = 10000;
constexpr float dx = 1.0f, dt = 0.01f;
constexpr float M = 1.0f, A = 1.0f, kappa = 0.5f
constexpr float dcon = 0.05f, con_init = 0.4f;
```

Note that we use `constexpr` here, which expects the compiler to perform compile-time evaluation, though here its effect is roughly equivalent to `const`. Also, we append `f` as a suffix to the floating-point numbers to tell the compiler that they are indeed `float` type variables and not `float` types forcibly converted from `double`. Why use `float`? The answer is simple: our simulation doesn't need such high precision, and shorter variables benefit computational efficiency. Of course, replacing all floating-point parts in this program with `double` would also be a good choice — this computation is quite fast anyway.

Next, we use the `std::random_device` class from the `<random>` library to generate a random number seed, and then use the `std::uniform_real_distribution<float>()` template class to generate random concentration fluctuations from $-0.005$ to $0.005$:

```cpp
std::random_device rd;
std::uniform_real_distribution<float> dist(-dcon, dcon);
```

The class `dist` obtained here can be used as a function and later, by accepting `rd` as the random number seed parameter, can generate a random value within the specified range.

The final step is to prepare our grid. We use a double `vector` to hold the entire concentration grid `con_mesh`. Here, since we know the average concentration in the entire simulation domain is $0.4$, we directly fill every point across the entire $Nx\times Ny$ region with $0.4$:

```cpp
vector<vector<float>> con_mesh(64, vector<float>(64, 0.4));
```

Here we use the anonymous temporary object `vector<float>(64,0.4)`, which calls the class constructor `vector<Type>(Num,Value)`. Then we iterate over the entire grid, adding a small random concentration fluctuation to each point:

```cpp
for (auto &row : con_mesh) {
    for (auto &point : row) {
        point += dist(rd);
    }
}
```

Here we use iterator loops: the `for (type value : container)` syntax allows a `container` with iterators to be automatically traversed from the first value to the last. Generally, `auto` is used for `type` to let the compiler deduce the type. Also, `auto &` is used here to take values from the container by reference, ensuring that the values are correctly updated into the grid; otherwise the values would only be updated in the loop's temporary variable and not correctly updated into the container. Since our random numbers start from $-0.005$ to $0.005$, we can directly add them with confidence.

At this point, we have completed the model parameter definition and geometric modeling. Next comes the iterative calculation algorithm.

#### Iterative Calculation

In the forward difference method, each calculation is performed for a specific time step. To make time move forward continuously, we naturally need a large time loop, and within each time loop, we assume that everything happens instantaneously and simultaneously. Our time loop is written as:

```cpp
for (int istep = 0; istep < Nstep + 1; istep++){
    // ...
}
```

Here we add $1$ to the total number of time steps because we consider step $0$ to be the initial structure, before evolution has started. Alternatively, this is also to facilitate file output later (output every $100$ steps, and adding $1$ allows output of the final step).

Next, we naturally need to consider implementing the core calculation part. Examining the expression, we can see that the calculation process involves parts that do not reference the grid (bulk energy calculation) and parts that do (Laplacian). Since the function is defined point by point, calculations that do not involve the grid only need the value at that point; calculations involving the grid need to obtain information about the neighboring points around the grid point. The bulk energy calculation can be written as a function:

```cpp
float df_bulk_dc(float con, float A) {
    return 2 * A * con * (1 - con) * (1 - 2 * con);
}
```

The total solution expression above involves the Laplacian calculation twice, and the Laplacian calculation needs to compute the Laplacian value of the center point from the $3\times 3$ grid around each point. Let's first set aside the operation of fetching surrounding points and abstract them as 4 values; the algorithm is then very simple:

```cpp
float laplacian(float v_c, float v_l, float v_r, float v_u, float v_d, float dx) {
    return (v_l + v_r + v_u + v_d - 4 * v_c) / (dx * dx);
}
```

Finally, to compute with confidence, we first handle the boundary values and then compute the center points. And for the repeatedly occurring grid-dependent operations, we simply package the grid traversal process with boundary conditions into a function:

```cpp
vector<vector<float>> mesh_periodic(
    vector<vector<float>> mesh, int Nx, int Ny, float dx,
    std::function<float(float, float, float, float, float, float)> kernel_func) {

    float v_l, v_r, v_u, v_d, v_c;
    vector<vector<float>> next_mesh(Nx, vector<float>(Ny));
    for (int j = 0; j < Nx; j++) {
        for (int i = 0; i < Nx; i++) {

            v_c = mesh.at(j).at(i);
            // x-minus
            if (i == 0) {
                v_l = mesh.at(j).at(Nx - 1);
            } else {
                v_l = mesh.at(j).at(i - 1);
            }
            // x-plus
            if (i == Nx - 1) {
                v_r = mesh.at(j).at(0);
            } else {
                v_l = mesh.at(j).at(i + 1);
            }
            // y-minus
            if (j == 0) {
                v_d = mesh.at(Ny - 1).at(i);
            } else {
                v_l = mesh.at(j - 1).at(i);
            }
            // y-plus
            if (j == 0) {
                v_u = mesh.at(0).at(i);
            } else {
                v_l = mesh.at(j + 1).at(i);
            }

            next_mesh.at(i).at(j) = kernel_func(v_l, v_r, v_u, v_d, v_c, dx);
        }
    }
    return next_mesh;
}
```

Let's talk about this function. First, it accepts some 2D grid as the grid to be calculated, followed by geometric information to facilitate traversal and grid-dependent calculations. Finally, for the specific content to be calculated, we abstract it into a function object `kernel_func`. This function object represents a class of functions that accept 6 `float` parameters and return a `float` parameter. The advantage of function objects is that we can temporarily ignore the specific calculation process and focus on how to prepare the appropriate environment for this calculation.

Then, we consider periodic boundary conditions: when the center point is on the boundary, for instance the left boundary in the $x$ direction (x = 0), the right side of this point can naturally be accessed, but the left side has no result. To allow the right side to be accessed, we require that when fetching the left-side value, we instead fetch the right boundary value of the solution domain. This requires making two judgments (4 total) for the `i` and `j` of every traversed position, and to handle such boundary treatment, we store each fetched value in a temporary variable.

Finally, since our core calculation logic is abstracted into `kernel_func`, we only need to take a grid of the same size and update the result into it. Here we adopt the approach of returning the grid from the function; we could also have the function update the value into a parameter passed by reference.

After preparing the logical components of the calculation, we need to assemble these components. Since we need to compute the Laplacian twice, we apply the above traversal logic with boundary conditions twice. The grid obtained the first time is the result of $\frac{\delta F}{\delta c} = 2Ac(1-c)(1-2c)-\kappa\nabla^2c$. Here we need to combine `laplacian` and `df_bulk_dc` through appropriate assembly and place them into the `kernel_func` of the `mesh_periodic` function above. We use a Lambda expression to form an anonymous temporary function:

```cpp
vector<vector<float>> df_dc = mesh_periodic(
    con_mesh, Nx, Ny, dx,
    [kappa, A](float v_1, float v_2, float v_3, float v_4, float v_5, float v_6) {
        return df_bulk_dc(v_1, A) - kappa * laplacian(v_1, v_2, v_3, v_4, v_5, v_6);
    });
```

Let's explain the last parameter, which serves as a function object. Lambda expressions were added in C++11 as anonymous functions and are a common syntactic feature of modern programming languages. Through the preceding `[]`, it captures context variables related to the function but not passed as parameters; through `()`, it determines the function's parameter list; and finally in `{}`, it defines the function body. Since our function object requires 6 `float` variables as input, our Lambda expression's parameter list must have 6 `float`s; since our result should return a `float`, we return it as such in the function body. Note that our calculation requires the two constants `kappa` and `A` to participate, but they cannot go into the parameter list (although the parameter list uses the obscure `v_*`, their actual meaning is: the first 5 parameters are the center, left, right, up, down grid values, and the last parameter is the grid spacing). Therefore, we treat them as context that the function should know and tell it through the `[]` list.

After this iteration, we need to iterate further, computing the Laplacian of the $\frac{\delta F}{\delta c}$ grid again to obtain the change in concentration:

```cpp
vector<vector<float>> dc = mesh_periodic(
    df_dc, Nx, Ny, dx,
    laplacian);
```

Thus we obtain the time derivative of concentration. The final step is to multiply the concentration change by the concentration mobility $M$ and update the concentration field:

```cpp
for (int j = 0; j < Ny; j++) {
    for (int i = 0; i < Nx; i++) {
        con_mesh.at(j).at(i) += dt * M * dc.at(j).at(i);
    }
}
```

In this way, we have implemented the evolution within one time step. Simply throwing the assembled logic into the time step loop will already allow the computation to proceed.

#### Result Output

But our calculation results should be output in some way. Here we use the `filesystem` utility library introduced in C++17 to output the grid results to files in a prescribed format (VTK), which can then be visualized with Paraview. We package the output logic into a function:

```cpp
void write_vtk(vector<vector<float>> mesh, string file_path, int time_step, float dx) {
    fs::create_directory(file_path);
    fs::path f_name{"step_" + std::to_string(time_step) + ".vtk"};
    f_name = file_path / f_name;

    ofstream ofs{f_name};
    int Nx = static_cast<int>(mesh.size()), Ny = static_cast<int>(mesh.at(0).size());

    ofs << "# vtk DataFile Version 3.0\n";
    ofs << f_name.string() << endl;
    ofs << "ASCII\n";

    ofs << "DATASET STRUCTURED_GRID\n";
    ofs << "DIMENSIONS " << Nx << " " << Ny << " " << 1 << "\n";
    ofs << "POINTS " << Nx * Ny * 1 << " float\n";

    for (int j = 0; j < Ny; j++) {
        for (int i = 0; i < Nx; i++) {
            ofs << (float)i * dx << " " << (float)j * dx << " " << 1 << endl;
        }
    }
    ofs << "POINT_DATA " << Nx * Ny * 1 << endl;

    ofs << "SCALARS " << "CON " << "float 1\n";
    ofs << "LOOKUP_TABLE default\n";
    for (int j = 0; j < Ny; j++) {
        for (int i = 0; i < Nx; i++) {
            ofs << mesh.at(j).at(i) << endl;
        }
    }

    ofs.close();
}
```

This function first accepts the grid to be output as a parameter; secondly, to output the file to the appropriate location and distinguish different time steps, we input the file path and time step as parameters; finally, to accurately describe the geometric situation of the grid, we input the grid spacing.

Inside the function, we first check whether the corresponding folder path exists. `std::filesystem::create_directory` provides a very convenient method: when the folder exists, it does nothing; when it doesn't, it creates an empty folder. Then we name the file according to an appropriate rule, and after obtaining the full path of the file name, we use the `std::ofstream` object provided by `<fstream>` to output the values in memory to the file. This object can be initialized with a file path and can output file content line by line using stream operations, just like `std::cout` outputs text to the screen. Then we infer the sizes of `Nx` and `Ny` from the information of the grid itself. Since the `vector.size()` method returns a value of the size-safe type `size_t`, and we know we won't need such a large type, and the entire program uses `int` as the integer type, a data type conversion is needed here. `static_cast` is a static type conversion method introduced in C++, allowing us to safely convert data types.

Next is the VTK file format specification. First, determine the VTK format version, then enter the file's own name on the second line, and finally specify the file encoding to complete the file header definition.

Then we also need to specify the grid type described by the file. Since we are using a grid that is perfectly horizontal and vertical, where each point's position can be determined by Cartesian coordinates, this happens to be best described by a structured grid. Therefore we declare `DATASET STRUCTURED_GRID`; for a structured grid, we need to determine the grid size and the position (3D coordinates) of each grid point. Thus we first specify `DIMENSION NX NY NZ` to describe the number of grid points, then explicitly provide the total number of grid points and the data type of the coordinates (here `float`), and finally list the grid coordinates in order.

Finally, we need to describe the value at each point. The VTK format allows us to add multiple datasets, giving each point multiple properties. However, in this case, we only need to describe one piece of information: concentration. Each dataset starts with `POINT_DATA` and the data volume, describes the data type (scalar or vector), the dataset name, and the data storage type (again `float`), then defines the lookup table method `LOOKUP_TABLE` (here `default` is fine), and finally lists the values at each point in order.

After outputting all results into a file, it's best to explicitly call `ofstream.close()` to close this file stream. Of course, it's also fine not to — due to C++ RAII, classes that satisfy RAII will automatically call their destructor to destroy themselves when leaving scope.

With this file output function, we only need to call this function at the appropriate time points during the time loop to output results. A good approach is `if(istep %100 == 0){}`, which automatically outputs results every $100$ steps.

Additionally, we can time the calculation process. Using the `<chrono>` standard library provided by C++17, we can conveniently use `std::chrono::high_resolution_clock::now()` to obtain the time point when the program executes this statement, and then use `std::chrono::high_resolution_clock::duration_cast` to convert the difference between two time points into an appropriate time unit. We have the following implementation:

```cpp
int main(int, char**){
    using hrc = std::chrono::high_resolution_clock;
    namespace chrono = std::chrono;
    const auto timepoint_start = hrc::now();

    // other things ...

    const auto timepoint_stop = hrc::now();
    const auto time_cost = chrono::duration_cast<chrono::milliseconds>(timepoint_stop - timepoint_start);
    cout << "Calculation time cost: " << static_cast<double>(time_cost.count()) / 1000.0 << "seconds." << endl;
}
```

Above, we use `using` to declare a type alias for `std::chrono::high_resolution_clock`, and then use `namespace` to declare a namespace alias for `std::chrono`, for the convenience of our hands and eyes. Also, we have a little clever trick here: convert the time to a millisecond-based format, then convert to `double` type and divide by $1000$ to get seconds with 3 decimal places. Directly converting to `chrono::seconds` would only show whole seconds, whereas the technique here gives a slightly more precise time.

#### Complete Code

Finally, after filling in all the header files and reasonably using some names from the `std` namespace, we obtain a piece of phase field code that can be compiled and run by the three major compilers (GCC, Clang/LLVM, MSVC). Its running results are largely similar to those in [Phase Field Simulation Study Notes IV](/posts/PF_Tutorial_4), so we won't paste them here. You can click [this link](/attachments/Impl_Spinodal/CPP/CPP_impl_v1.cpp) to browse this file.

### Another C++ Version

The most outstanding feature of this version compared to the one written in the notes earlier is perhaps the use of function objects. The existence of function objects allows us to completely (and conveniently) extract a portion of the logic, thereby implementing the calculation logic in a layered, step-by-step fashion. Although similar things can be done without function objects (via function pointers), the function object approach is simpler, faster, and safer. Thanks to template classes and the RAII and Zero-overhead principles followed by the C++ standard library implementation, we have reason to believe that the compiler will handle the subtle details beneath the code for us, keeping the execution process sufficiently efficient, and that objects will be automatically reclaimed by the RAII mechanism when leaving scope, avoiding memory leaks caused by pointers everywhere.

However, this C++ implementation version still does not reflect C++'s object-oriented features. Overall, we merely used some already-packaged utility classes, without organizing data ourselves and endowing it with methods to operate on that data. Yet, the grid nature inherent to the phase field method is very suitable for packaging with classes. So our next version can consider adding this feature and see how a version using classes differs.

#### Designing the Data Structure

The most core data of the phase field method is, without a doubt, the grid used for computation. We can consider what properties such a computational grid needs to have:

- Grid data
- Grid size
- Grid spacing
- Boundary conditions

Among these, the second could perhaps be incorporated into the grid data, since the size can quickly be obtained from the actual data storage structure using a method like `.size()`, but we list it here for convenient access. Thus, we can immediately obtain the following data structure:

```cpp
template <typename T, typename = std::enable_if_t<std::is_floating_point_v<T>>>
class Mesh {
private:
    vector<vector<T>> mesh_data;
    size_t Nx;
    size_t Ny;
    T dx, dy;
    BoundFuncs<T> boundary_condition;

public:
    Mesh() = delete;

    Mesh(size_t _Nx, size_t _Ny, T _dx, T _dy, BoundFuncs<T> _bound_funcs,
         T _init_value = T())
        : Nx(_Nx), Ny(_Ny), dx(_dx), dy(_dy), boundary_condition(_bound_funcs) {
        mesh_data = vector<vector<T>>(_Ny, vector<T>(_Nx, _init_value));
    }

    Mesh(size_t _Nx, size_t _Ny, T _dx, T _dy, T _init_value = T())
        : Mesh(_Nx, _Ny, _dx, _dy, BoundFuncs<T>(), _init_value) {}

    Mesh(size_t _Nx, size_t _Ny, T _d_mesh, T _init_value = T())
        : Mesh(_Nx, _Ny, _d_mesh, _d_mesh, BoundFuncs<T>(), _init_value) {}

    Mesh(size_t _N_mesh, T _d_mesh, T _init_value = T())
        : Mesh(_N_mesh, _N_mesh, _d_mesh, _d_mesh, BoundFuncs<T>(), _init_value) {}

    Mesh(T _dx, T _dy, BoundFuncs<T> _bounds, vector<vector<T>> &_data) : mesh_data(_data) {
        Ny = mesh_data.size();
        Nx = mesh_data.at(0).size();
        dx = _dx;
        dy = _dy;
        boundary_condition = _bounds;
    }

    const size_t get_dim_x() const {
        return Nx;
    }

    const size_t get_dim_y() const {
        return Ny;
    }

    const T &get(size_t _x, size_t _y) const {
        return mesh_data.at(_y).at(_x);
    }


    vector<vector<T>> &get_data() const {
        return mesh_data;
    }

    // ...
};
```

Note that we use the `template` keyword here. This is the so-called *template*, which can be used to accept some data types and then implement a class/function with the corresponding data type. The main reason we use it is the hope that this code can be applicable to different floating-point precisions. When precision is not required, `float` can be used to instantiate this template, and when needed, `double` can be used. Since we only want such floating-point types as candidate data types, after the template type name we use `typename = std::enable_if_t<std::is_floating_point_v<T>>` to guarantee that it must be a computable floating-point number.

The main data of this class includes: grid point values, grid size, grid spacing, and grid boundary conditions. We have designed several ways to initialize a grid. Also, the way boundaries are organized here should be the biggest feature of this version. Considering that our boundary is essentially just defining what value to fetch when a subscript goes out of bounds so that computation can continue, we can abstract this task as assigning a function to each position, calling that function to obtain the corresponding value when the subscript goes out of bounds. We will talk about it shortly.

Additionally, since we have protected all the data, we must selectively expose data to the outside world. In actual computation, we find that we often need to fetch the value at a certain point, or need to take the entire data grid out for convenient traversal; at the same time, we often need the length and width of the grid. Such needs lead us to design four publicly exposed functions, whose function is also very simple: to tell the values to the outside world.

#### Calculation Logic

Next, we need to add calculation logic. Naturally, we can think of moving the previous `mesh_periodic` over and operating within the class. The new calculation function we obtain is as follows:

```cpp
Mesh iterate_mesh(std::function<float(float, float, float, float, float, float)> kernel_func) {
    float v_l, v_r, v_u, v_d, v_c;
    vector<vector<float>> next_mesh_data(Nx, vector<float>(Ny));

    for (int j = 0; j < Nx; j++) {
        for (int i = 0; i < Nx; i++) {
            v_c = mesh_data.at(j).at(i);
            // x-minus
            if (i == 0) {
                v_l = boundary_condition.x_m->bound_x_m(*this, j);
            } else {
                v_l = mesh_data.at(j).at(i - 1);
            }
            // x-plus
            if (i == Nx - 1) {
                v_r = boundary_condition.x_p->bound_x_p(*this, j);
            } else {
                v_r = mesh_data.at(j).at(i + 1);
            }
            // y-minus
            if (j == 0) {
                v_d = boundary_condition.y_m->bound_y_m(*this, i);
            } else {
                v_d = mesh_data.at(j - 1).at(i);
            }
            // y-plus
            if (j == Ny - 1) {
                v_u = boundary_condition.y_p->bound_y_p(*this, i);
            } else {
                v_u = mesh_data.at(j + 1).at(i);
            }

            next_mesh_data.at(j).at(i) = kernel_func(v_c, v_l, v_r, v_u, v_d, dx);
        }
    }
    Mesh next_mesh(dx, dy, boundary_condition, next_mesh_data);
    return next_mesh;
}
```

As can be seen, since much data is naturally covered by the class, we no longer need to pass data through function parameters. Also, because we consider using different boundary conditions, here we uniformly use the pattern `boundary_condition.{bd}->{bd-value-func}` to call functions to implement boundary computation. Since this function will generate another grid, we also need to repackage the computed result as `Mesh` before passing it out.

Besides computing a new grid from the grid itself, we also need two grids to interact to produce a third grid, as well as one grid updating itself with another grid. Since in this case we mainly need the concentration field to compute and then iterate itself with the new grid, we implement the latter. Also considering that sometimes we need to update the grid based on some scalar, we also introduce an overloaded implementation here. The results are as follows:

```cpp
void update(const Mesh &_mesh) {
    for (size_t j = 0; j < Ny; j++) {
        for (size_t i = 0; i < Nx; i++) {
            mesh_data.at(j).at(i) += _mesh.get(i, j);
        }
    }
}
void update(std::function<float()> kernel_func) {
    for (auto &row : mesh_data) {
        for (auto &point : row) {
            point += kernel_func();
        }
    }
}
```

Finally, we want the grid to be able to output results to a file, so we slightly modify the previous `write_vtk`:

```cpp
void write_vtk(string file_path, size_t time_step) {
    const auto &mesh = mesh_data;
    fs::create_directory(file_path);
    fs::path f_name{"step_" + std::to_string(time_step) + ".vtk"};
    f_name = file_path / f_name;
    ofstream ofs{f_name};
    ofs << "# vtk DataFile Version 3.0\n";
    ofs << f_name.string() << endl;
    ofs << "ASCII\n";
    ofs << "DATASET STRUCTURED_GRID\n";
    ofs << "DIMENSIONS " << Nx << " " << Ny << " " << 1 << "\n";
    ofs << "POINTS " << Nx * Ny * 1 << " float\n";
    for (size_t j = 0; j < Ny; j++) {
        for (size_t i = 0; i < Nx; i++) {
            ofs << (float)i * dx << " " << (float)j * dy << " " << 1 << endl;
        }
    }
    ofs << "POINT_DATA " << Nx * Ny * 1 << endl;
    ofs << "SCALARS " << "CON " << "float 1\n";
    ofs << "LOOKUP_TABLE default\n";
    for (size_t j = 0; j < Ny; j++) {
        for (size_t i = 0; i < Nx; i++) {
            ofs << mesh.at(j).at(i) << endl;
        }
    }
    ofs.close();
}
```

At this point, we have completed the design of the main grid.

#### More Flexible Boundary Conditions

Next, we need to design how to implement multiple boundary conditions. Since we may encounter a variety of boundary conditions, and in a 2D simulation domain we only have 4 boundaries, we can use a class to coordinate the management of these four boundaries, which is the `BoundFuncs<T>` that appeared in the grid earlier. As for what exactly these four boundaries are, we need to tell it in the main function based on actual needs. To achieve this, we use the abstract class `AbstractBounds<T>` and virtual functions `bound_x_m` that can be overridden by subclasses.

```cpp
template <typename T, typename = std::enable_if_t<std::is_floating_point_v<T>>>
struct AbstractBounds {
    virtual ~AbstractBounds() = default;
    virtual T bound_x_m(const Mesh<T> &mesh, size_t y) const = 0;
    virtual T bound_x_p(const Mesh<T> &mesh, size_t y) const = 0;
    virtual T bound_y_m(const Mesh<T> &mesh, size_t x) const = 0;
    virtual T bound_y_p(const Mesh<T> &mesh, size_t x) const = 0;
};

template <typename T, typename = std::enable_if_t<std::is_floating_point_v<T>>>
struct BoundFuncs {
    using BoundPtr = std::shared_ptr<const AbstractBounds<T>>;

    BoundPtr x_m;
    BoundPtr x_p;
    BoundPtr y_m;
    BoundPtr y_p;

    // default: periodic boundary

    BoundFuncs(BoundPtr _x_m, BoundPtr _x_p, BoundPtr _y_m, BoundPtr _y_p)
        : x_m(std::move(_x_m)), x_p(std::move(_x_p)), y_m(std::move(_y_m)), y_p(std::move(_y_p)) {
        if (!x_m || !x_p || !y_m || !y_p) {
            throw std::invalid_argument("Boundary condition pointers must not be null");
        }
    }
};
```

Here, functions like `bound_x_m` accept `const Mesh<T>$` and `size_t` as parameters by default, because these contents are extremely common when boundary calculations are involved. Instead of extracting them separately as members of the subclass for separate assignment and then calculation, we adopt this approach. When creating boundary conditions, we need to use `std::make_shared` to hold the abstract class, and the resulting `shared_ptr` can be copied and shared. Next is designing the corresponding boundary conditions; here we design two: periodic boundary conditions and fixed boundary conditions. The implementation is as follows:

```cpp
template <typename T, typename = std::enable_if_t<std::is_floating_point_v<T>>>
struct PeriodicBound : AbstractBounds<T> {
    T bound_x_m(const Mesh<T> &mesh, size_t y) const override {
        return mesh.get(mesh.get_dim_x() - 1, y);
    }
    T bound_x_p(const Mesh<T> &mesh, size_t y) const override {
        return mesh.get(0, y);
    }
    T bound_y_m(const Mesh<T> &mesh, size_t x) const override {
        return mesh.get(x, mesh.get_dim_y() - 1);
    }
    T bound_y_p(const Mesh<T> &mesh, size_t x) const override {
        return mesh.get(x, 0);
    }
};
template <typename T, typename = std::enable_if_t<std::is_floating_point_v<T>>>
struct FixedBound : AbstractBounds<T> {
    T fixed_val;
    FixedBound(T _val) : fixed_val(_val) {}
    T bound_x_m(const Mesh<T> &, size_t) const override {
        return fixed_val;
    }
    T bound_x_p(const Mesh<T> &, size_t) const override {
        return fixed_val;
    }
    T bound_y_m(const Mesh<T> &, size_t) const override {
        return fixed_val;
    }
    T bound_y_p(const Mesh<T> &, size_t) const override {
        return fixed_val;
    }
};
```

If other boundary conditions are needed, and the new boundary conditions require more complex parameters, one can create a new abstract class implementation, describing the parameters as members of the subclass. In the actual code, we also make `BoundFucs<T>` default to periodic boundary conditions for everyday convenience (many simulations favor periodic conditions).

With the above restructured classes, plus the previous functional components, we can begin assembling the entire calculation logic in the `main()` function.

#### Main Function

Finally, let's look at the writing of the `main()` function:

```cpp
int main(int, char **) {

    const auto timepoint_start = hrc::now();

    // Parameters ...

    auto dF_dc = [A, kappa](float v_1, float v_2, float v_3, float v_4, float v_5, float v_6) {
        return df_bulk_dc(v_1, A) - kappa * laplacian(v_1, v_2, v_3, v_4, v_5, v_6);
    };
    auto dc_dt = [M, dt](float v_1, float v_2, float v_3, float v_4, float v_5, float v_6) {
        return dt * M * laplacian(v_1, v_2, v_3, v_4, v_5, v_6);
    };
    auto add_noise = [dcon]() {
        std::random_device rd;
        std::uniform_real_distribution<float> dist(-dcon, dcon);
        return dist(rd);
    };

    using PB = PeriodicBound<float>;
    BoundFuncs<float> boundary(
        std::make_shared<PB>(),
        std::make_shared<PB>(),
        std::make_shared<PB>(),
        std::make_shared<PB>());
    Mesh<float> con_mesh(Nx, Ny, dx, dx, boundary, con_init);

    con_mesh.update(add_noise);

    cout << "Initialize complete" << endl;

    for (size_t istep = 0; istep < Nstep + 1; istep++) {

        auto df_dc = con_mesh.iterate_mesh(dF_dc);
        auto dc = df_dc.iterate_mesh(dc_dt);
        con_mesh.update(dc);

        // result output
        if (istep % 100 == 0) {
            con_mesh.write_vtk("./output", istep);
            cout << "Result " << istep << " outputed" << endl;
        }
    }

    const auto timepoint_stop = hrc::now();
    const auto time_cost = duration_cast<milliseconds>(timepoint_stop - timepoint_start);
    cout << "Calculation time cost: " << static_cast<double>(time_cost.count()) / 1000.0 << "seconds." << endl;
}
```

As can be seen, this code structure is much clearer. The `main()` function is completely divided into three major blocks: *Simulation Preparation*, *Time Loop*, and *Post-processing*. Moreover, the overall logic is clearer, entirely centered around `con_mesh` and its derived grid structures, and the obtained results can also be quickly iterated back to itself. With the help of the `Mesh.update()` function, we can turn the process of adding noise into a single numerical update applied to each point in the grid. And within the time loop, three steps are truly realized: computing two grid-dependent quantities, then iterating the result back into the original grid.

This code is also uploaded to this blog. You can browse and download this source code by clicking [here](/attachments/Impl_Spinodal/CPP/CPP_impl_v2.cpp).

## Summary and Afterword

Actually, initially I hoped to quickly finish the C++ and Python implementations and then fast-forward to some more interesting languages. But when I started writing the C++ implementation, I found many things were missing: no introduction to the phase field, no introduction to the simulation, no introduction to the language. After supplementing those, I was thinking: could the C++ implementation have some more interesting approaches that I hadn't tried before? That became the first case. And after that, I found that C++, as a language supporting multi-paradigm programming (procedural, object-oriented, functional, metaprogramming, etc.), I had only casually added some modern C++ utility classes and then written it in a procedural style. Hence the second implementation.

To be fair, the second implementation, involving rarely-used things like virtual functions and abstract classes, was written while learning, and for this reason, the performance of the second code is slightly lower than the first, with a strong suspicion of over-engineering. However, thanks to RAII, from the timer results the difference between the two is not large, at most less than 1 second. Furthermore, the implementation here did not overly consider computational efficiency, (perhaps) hoping more for code simplicity and readability, so no aggressive computational optimization measures were adopted here, such as using more efficient C++ computation libraries, or using a single `vector` to help the compiler with vectorization. But we will try these in other languages.

This post serves as the opening salvo of this series. Perhaps we will adopt a similar way in the follow-ups to record how I implement this simulation (or other simulations) in other languages. If this blog post has piqued your interest in the phase field method, and you are willing to run the code on your own machine and observe the evolution results under different boundary conditions, then that would be my great honor. And if there are any errors or omissions in the content of this blog post, please forgive me and point them out in the comments — among the many programming languages, I'm only somewhat familiar with C++, and as you can see, I don't write it very well either. If you have questions, opinions, or suggestions about the content of the post, you are also welcome to discuss them in the comments section~!

So, thank you for reading this far. I wish you a pleasant life, and happy coding!

<!-- Insert React phase field Demo -->
  <!-- {{< react component="Impl_Spinodal_1/simulation" >}} -->
