---
categories:
- Phase Field
- Programming
tags:
- Tutorial
- C++
title: "Phase Field: Phase Field Simulation Study Notes V"
description: Notes on learning the phase field method
image: /images/Skadi.png
date: 2024-12-25
math: true
links:
  - title: PF_Tutorial_5 Grain Growth Phase Field Simulation
    description: Lecture recording on Bilibili
    website: https://www.bilibili.com/video/BV15QkMYbE6W
  - title: Lecture Notes Repository on Github
    description: Lecture notes on Github, including slides and reference materials
    website: https://github.com/A-moment096/Phase-Field-Tutorial/tree/main/PF_T2-Numerical_Method_and_Python

---

*Actually, this section is just switching to the Allen-Cahn equation with multiple variables. Mainly, I just didn't want to implement a Voronoi structure (runs away*

## Introduction

In the previous part, we discussed the evolution of a concentration field under the Cahn-Hilliard equation, using spinodal decomposition as the basis. For the phase field method, another evolution equation that cannot be avoided is the Allen-Cahn equation, which applies to non-conserved field variables. In this part, we will analyze the grain growth process, understand the Allen-Cahn equation, and use it to simulate grain growth.

## Grain Growth

The grain growth process should already be quite familiar to materials science students. In this process, since the grain boundary energy is high while the bulk free energy is relatively low, the system energy, in pursuit of a global minimum, needs to reduce the proportion of grain boundary energy in the total energy as much as possible and increase the proportion of bulk free energy. However, the energy density of grain boundaries should be some value that doesn't change much -- it can almost be regarded as a constant. Therefore, to reduce grain boundary energy, the system tends to reduce the volume of grain boundaries and increase the volume of grains. Thus, from a macroscopic perspective, this manifests as the grain growth process.

Looking at it this way, the energy requirements of the grain growth process are: low energy inside grains, high energy at grain boundaries. So, would the previous combination of the Cahn-Hilliard equation + concentration work? We need to examine what quantities are involved in the grain growth process. Since different grains of the same phase all have the same composition, concentration cannot be used to represent a specific grain. Leaving aside orientation, the only differences between grains are in position and size -- purely geometric differences. At the interface, where one grain meets another, we also need some method to represent the interfaces between certain grains. Moreover, during the grain growth process, small grains may become even smaller and eventually disappear.

Taken together, the Cahn-Hilliard equation and concentration are not suitable for this problem, so how should we handle it? In the phase field method, we often use field variables to indicate the presence of a certain property in a certain region. So we could consider assigning a different variable to each distinct grain -- for example, if there are 10 small grains, we use 10 variables to represent the regions of these grains respectively. Furthermore, since these grains differ only in position, we need to ensure that they have no numerical differences when participating in thermodynamic discussions. We can make these variables analogous to concentration: the variable is 1 when it exists in a certain region, and 0 when it does not. In this way, the interface regions can also be simply represented: regions where none of the order parameters are 0 are the interface regions, which also saves us the trouble of tracking interfaces.

So, what kind of equation should we use to evolve such a field? This field, according to the analysis above, does not satisfy conservation conditions. We won't keep you in suspense (since the previous part already spoiled it) -- the answer is to use the Allen-Cahn equation. So what about the energy of this system? How do we understand this equation?

## Model Analysis

### Evolution Equation
Let's first look at the Allen-Cahn equation:

$$
\frac{\partial \eta_i}{\partial t} = -L_{ij}\frac{\delta F}{\delta \eta_j}
$$

Stunningly simple (maybe). Simply put, the rate of change of a certain variable is influenced by the weighted sum of all potentials. But how do we understand this formula? How did it come about? Actually, if you've read the [previous part](pf_tutorial_4/index.md#evolution-equation), you should have already guessed. If matter is not conserved, then the divergence term of the matter flux can be replaced with some other form. This so-called "other form" needs to satisfy these conditions:

- It must be related to energy/potential to satisfy thermodynamic requirements
- It should ultimately cause the system to evolve toward equilibrium

So we might as well just let the evolution rate be proportional to the potential, then adjust the sign so the direction of evolution moves toward a stable state for the system. That gives us the Allen-Cahn equation above.

Beyond this explanation, we can also adopt a more mathematical approach. When we want the system to evolve toward a stable state, what we actually mean is that we want the system free energy to evolve toward its minimum. And when the system is stable, we have the following relationship:

$$
\frac{\delta F}{\delta \eta_i} = 0
$$

Here we need to apply what we've learned about functional derivatives. When the functional derivative is 0, it means that this configuration of $\eta_i$ is a point where the functional $F$ attains an extremum. Considering that $F$ has the physical meaning of energy, this extremum is naturally a minimum. In thermodynamics, a minimum means the system is at least in a metastable state. When the energy of this configuration happens to be the lowest, the system is in a thermodynamically stable state.

In this way, the representation of the steady state of the system is completely fine, but what we need is to evolve toward the steady state, not to directly obtain the steady-state result. Here we need to use a classic numerical method: the relaxation method. We change the 0 on the right-hand side of the equation into some small variable. The meaning of this variable is to drive the system toward equilibrium, so this variable should get smaller and smaller. Through continuous iteration, this small variable will eventually approach 0, at which point we obtain the equilibrium steady-state result. According to our expectation, this small variable should be related to the field variable itself; the fact that it involves continuous iteration indicates it's also related to time. To keep making this small variable decrease, given the properties of the energy function (functional), we might as well set the relaxation variable as the evolution rate of the field variable, multiplied by a relaxation constant. Due to the direction of evolution, the relaxation constant should be a value less than 0. Finally, considering the effects of all terms, we arrive at this equation.

I should finally point out that all of the above is presented from some not-very-physical, rather phenomenological angles. In reality, the Allen-Cahn equation is derived from the conclusion that the grain boundary migration rate is proportional to the driving force, and this conclusion is itself obtained from the ground state of the crystal lattice configuration.

<details>
<summary>Some rambling about the A-C equation</summary>

Additionally, this form of equation is very common -- or rather, there's a lot of depth to it. You can find this equation in almost many areas of physics, and descriptions of it vary widely. Some call it the Landau–Khalatnikov equation (describing magnetism), some call it Model A (interface dynamics, [Theory of dynamic critical phenomena](https://doi.org/10.1103/RevModPhys.49.435)), and there are other peculiar names. Yet almost none of these papers provide a detailed explanation of this equation. Perhaps these equations came from some physical intuition? Or maybe they have deeper mathematical/physical backgrounds, but I have no way of knowing either.
</details>

### Energy Construction

The energy model used in this simulation comes from [the article by D. Fan and L.Q. Chen](https://doi.org/10.1016/S1359-6454%2896%2900200-5), and its construction is as follows:

$$
  \begin{align*}
  F &= \int_\omega f_{bulk} + f_{int} \,\mathrm{d}\Omega;\\
  f_{bulk}\left(\eta_0,\eta_1,\cdots,\eta_N\right) &= \sum_{i}^{N}\left( -\frac{A}{2}\eta_i^2 + \frac{B}{4}\eta_i^4 \right) + \sum_{i}^{N}\sum_{j\neq{}i}^{N}\eta_i^2\eta_j^2;\\
  f_{int}\left(\nabla\eta_0,\nabla\eta_1,\cdots,\nabla\eta_N\right) &=  \sum_{i}^{N}\frac{\kappa_i}{2} \left| \nabla \eta_i \right|^2.
  \end{align*}
$$

We won't elaborate on the interfacial energy term again, since it's just the energy introduced in the previous part, only now we add up the contributions of all order parameters. Let's focus on the bulk energy. Compared to last time, the bulk energy part has changed a lot, but there are also some familiar parts. Let's reorganize this bulk energy:

$$
  \begin{align}
  f_{bulk}&= \sum_{i}^{N}\left( -\frac{A}{2}\eta_i^2 + \frac{B}{4}\eta_i^4 \right) + \sum_{i}^{N}\sum_{j\neq{}i}^{N}\eta_i^2\eta_j^2\\
  &=\sum_{i}^{N}\left( -\frac{A}{2}\eta_i^2 + \frac{B}{4}\eta_i^4 \right) + \sum_{i}^{N}\eta_i^2 \sum_{j\neq{}i}^{N} \eta_j^2\\
  &=\sum_{i}^{N}\left(\left( -\frac{A}{2}\eta_i^2 + \frac{B}{4}\eta_i^4 \right) + \eta_i^2 \sum_{j\neq{}i}^{N} \eta_j^2\right)\\
  &=\sum_{i}^{N}\left( \left(-\frac{A}{2} + \sum_{j\neq{}i}^{N} \eta_j^2\right) \eta_i^2 + \frac{B}{4}\eta_i^4 \right)\\
  \end{align}
$$

In the second equality above, since the part of the summation over $j (j\neq i)$ is independent of $i$, we can factor $\eta_i^2$ out of the double sum. Then in the third equality, we extract and combine the parts of the summation over $i$. Finally, in the fourth equality, we factor out $\eta_i^2$ and combine $\sum_{j\neq{}i}^{N} \eta_j^2$ as a coefficient with $-\dfrac{A}{2}$. Now let's focus on the polynomial in $\eta_i$ inside the summation. For simplicity, let $A = B = 1$. Below is the graph of this function when $\sum_{j\neq{}i}^{N} \eta_j^2 = 0$, i.e., the first term of equation (1) (of course, this assumption is not entirely reasonable, but we can take a look first).

![Double well?](/zh/posts/PF_Tutorial/img/double_well.png)

It's the double well we're very familiar with, but there are some issues here: the order parameter actually cannot be less than $0$, nor should it be greater than $1$. If we only focus on values between $0$ and $1$, it's not hard to see that the minimum point of this energy is at $\eta = 1$. This makes sense: when all other order parameters (we'll call them all $j$, and the current order parameter $i$) are $0$ -- in other words, at a point where there are no $j$, it's only natural that $i$ occupies the point. Considering that all order parameters are on an equal footing, this shows that the equation satisfies the thermodynamic requirements of the bulk phase interior. Next, let's examine the case where this summation term is not $0$. Let the value range of the sum over $j$ be from $0$ to $2$ for now.

![Graph when the sum of $j$ is 0.3](/zh/posts/PF_Tutorial/img/a03.png)

As we can see, when $j$ is not $0$, the result is also reasonable -- here the value of $i$ does not reach its minimum at $1$, but instead reaches its minimum somewhere between $0$ and $1$. If you're interested, you can try plotting the graph yourself and adjusting these values to observe the position of the minimum of the order-parameter-energy curve. Of course, we could also use a more mathematical approach to study the minimum point here, but the graphical approach is more intuitive. Finally, let's briefly describe the physical meaning of expression (1): each order parameter is given a well-like energy, and then these energies are coupled together through the cross-interaction term of the second part. The double sum in the second term represents the influence of other order parameters on the current one.

### Relationship Between Phase Field Evolution Equations and the Diffusion Equation

We actually noticed the similarity between the Allen-Cahn and Cahn-Hilliard equations and the diffusion equation (Fick's law) quite early on. Let's now take a closer look at the relationship between these equations and Fick's law.

For the Cahn-Hilliard equation, we can see that its form is very similar to Fick's second law. How should we view this similarity? We can say that for Fick's second law, it is the concentration itself -- or rather, the concentration gradient -- that provides the driving force for diffusion. But when this driving force is placed in a broader context, for instance when phenomena like uphill diffusion occur, we must use the diffusion potential, based on thermodynamic principles, to explain such phenomena. Therefore, the Cahn-Hilliard equation can be seen as a diffusion equation that better conforms to thermodynamic principles.

So what about the Allen-Cahn equation? We need to connect the Allen-Cahn equation with the classical energy functional construction and expand the formula. Doing so gives us:

$$
\frac{\partial \eta_i}{\partial t} = L_{ij}\nabla^2 \eta_j - L\mu_i
$$

Does this form look familiar? If we remove the second term, this equation is just Fick's second law! So what does the second term represent? The second term actually represents some kind of reaction occurring at the interface. Why say it's at the interface? Observing what this equation represents versus what Fick's second law represents, the first term indicates that a certain variable is conserved, but the presence of the chemical potential in the second term breaks this balance. Using an interfacial reaction to explain the appearance of this situation is the most appropriate: the non-conserved order parameter is being "consumed." In fact, following this line of thought, we can construct even more complex evolution equations -- by adding the energy changes caused by reactions present in the system into the energy, it will ultimately be reflected in the reaction term of the Allen-Cahn equation.

## Problem Analysis

OK, by now we should have some understanding of the evolution equation and energy construction needed for this simulation. The problem we want to tackle this time is: suppose there are two single-crystal grains, one located at the center of simulation region, shaped as a disk of radius $14$ units, and the other fills the rest of the simulation region. We need to simulate the grain growth process.

It's a very simple problem -- just create two order parameter grids and then iterate over each grid. The summation part might have some issues, but some programming tricks can simplify part of the computation. Let's go straight to the code.

## Code Implementation

We'll still use C++ for the implementation, and I'll paste everything here in one go.

```cpp {lineNos=inline}
#include <filesystem>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

double laplacian(double eta_l, double eta_r, double eta_d, double eta_u, double eta_c, double dx) {
    return (eta_l + eta_r + eta_d + eta_u - 4.0 * eta_c) / (dx * dx);
}

double df_deta(double A, double B, double eta_square_sum, double this_eta) {
    return -1.0 * A * this_eta + B * this_eta * this_eta * this_eta + 2.0 * this_eta * (eta_square_sum - this_eta * this_eta);
}

std::ofstream create_vtk(std::string file_path, int time_step) {
    std::filesystem::create_directory(file_path);
    std::filesystem::path f_name{"step_" + std::to_string(time_step) + ".vtk"};
    f_name = file_path / f_name;

    std::ofstream ofs{f_name};
    return ofs;
}

void write_vtk_head(std::ofstream &ofs, std::string filename, double dx, size_t Nx, size_t Ny) {
    ofs << "# vtk DataFile Version 3.0\n";
    ofs << filename << std::endl;
    ofs << "ASCII\n";
    ofs << "DATASET STRUCTURED_GRID\n";

    ofs << "DIMENSIONS " << Nx << " " << Ny << " " << 1 << "\n";
    ofs << "POINTS " << Nx * Ny * 1 << " float\n";

    for (size_t i = 0; i < Nx; i++) {
        for (size_t j = 0; j < Ny; j++) {
            ofs << (double)i * dx << " " << (double)j * dx << " " << 1 << std::endl;
        }
    }
    ofs << "POINT_DATA " << Nx * Ny * 1 << std::endl;
}

void write_vtk_data(std::vector<std::vector<double>> mesh, std::ofstream &ofs, std::string data_label, double dx) {
    size_t Nx{mesh.size()}, Ny{mesh.at(0).size()};
    ofs << "SCALARS " << data_label << " float 1\n";
    ofs << "LOOKUP_TABLE default\n";
    for (size_t i = 0; i < Nx; i++) {
        for (size_t j = 0; j < Ny; j++) {
            ofs << mesh.at(i).at(j) << std::endl;
        }
    }
}

int main() {
    int Nx = 64;
    double dx = 0.5, dt = 0.005;
    int nstep = 20000, pstep = 100;
    int radius = 14;
    double mobility = 5.0, kappa = 0.1;
    double A = 1.0, B = 1.0;
    double eta_trun = 1e-6;

    std::vector<std::vector<double>> grain_1(Nx, std::vector<double>(Nx, 0));
    auto grain_2 = grain_1;

    for (int i = 0; i < Nx; i++) {
        for (int j = 0; j < Nx; j++) {
            if ((i - Nx / 2) * (i - Nx / 2) + (j - Nx / 2) * (j - Nx / 2) < radius * radius) {
                grain_1.at(i).at(j) = 1.0;
                grain_2.at(i).at(j) = 0.0;
            } else {
                grain_1.at(i).at(j) = 0.0;
                grain_2.at(i).at(j) = 1.0;
            }
        }
    }

    std::vector<std::vector<std::vector<double>>> grains = {grain_1, grain_2};
    auto grains_temp = grains;

    for (int istep = 0; istep < nstep + 1; istep++) {
        std::vector<std::vector<double>> grain_square_sum(Nx, std::vector<double>(Nx, 0));
        for (int igrain = 0; igrain < 2; igrain++) {
            for (int i = 0; i < Nx; i++) {
                for (int j = 0; j < Nx; j++) {
                    grain_square_sum.at(i).at(j) += grains.at(igrain).at(i).at(j) * grains.at(igrain).at(i).at(j);
                }
            }
        }
        for (int igrain = 0; igrain < 2; igrain++) {
            for (int i = 0; i < Nx; i++) {
                for (int j = 0; j < Nx; j++) {
                    int im = i - 1, jm = j - 1, ip = i + 1, jp = j + 1;
                    if (im == -1) {
                        im = Nx - 1;
                    }
                    if (jm == -1) {
                        jm = Nx - 1;
                    }
                    if (ip == Nx) {
                        ip = 0;
                    }
                    if (jp == Nx) {
                        jp = 0;
                    }
                    double eta_l = grains.at(igrain).at(im).at(j);
                    double eta_r = grains.at(igrain).at(ip).at(j);
                    double eta_d = grains.at(igrain).at(i).at(jm);
                    double eta_u = grains.at(igrain).at(i).at(jp);
                    double eta_c = grains.at(igrain).at(i).at(j);

                    grains_temp.at(igrain).at(i).at(j) = eta_c - mobility * dt * (df_deta(A, B, grain_square_sum.at(i).at(j), eta_c) - kappa * laplacian(eta_l, eta_r, eta_d, eta_u, eta_c, dx));

                    if (grains_temp.at(igrain).at(i).at(j) > 1.0 - eta_trun) {
                        grains_temp.at(igrain).at(i).at(j) = 1.0;
                    }
                    if (grains_temp.at(igrain).at(i).at(j) < eta_trun) {
                        grains_temp.at(igrain).at(i).at(j) = 0.0;
                    }
                }
            }
        }
        grains = grains_temp;
        if (istep % pstep == 0) {
            auto ofs = create_vtk("./result", istep);
            write_vtk_head(ofs, "step_" + std::to_string(istep), dx, Nx, Nx);
            write_vtk_data(grains.at(0), ofs, "grain_1", dx);
            write_vtk_data(grains.at(1), ofs, "grain_2", dx);
        }
    }
}
```

This time we optimized the `vtk` file generation function so that it can write in parts. Everything else is very straightforward. Considering the computation process, this simulation is even a bit simpler than the last one. After running this code, the program will create a `result/` folder in its location and put all the result files inside. As before, use Paraview to open these files.

## Results
Same as last time, here are a few screenshots.

| | |
|:-:|:-:|
|![Step 5](/posts/PF_Tutorial/img/modified_5.png) |![Step 25](/posts/PF_Tutorial/img/modified_25.png) 
|Step 5|Step 25|
|![Step 75](/posts/PF_Tutorial/img/modified_75.png)| ![Step 100](/posts/PF_Tutorial/img/modified_100.png)
|Step 75|Step 150|

As we can see, over time, the small grain (the red region in the middle) is continuously consumed by the large grain (the blue region). And judging by the step numbers, we can see that initially, since the volumes of the two grains were similar, the evolution rate was not very high. As the evolution proceeded, the volume difference between the two grains grew larger and larger, and the evolution rate also increased. This matches our understanding of the grain growth process -- small grains disappear very quickly, while larger grains evolve relatively slowly.

## Conclusion

When I first started writing, I didn't expect to include so much model analysis content here. But I suppose it makes up for the lack of phase field model introduction in the earlier parts. As for the simulation part here, since it was based on Case Study II from *Programming Phase Field Modeling*, ideally I should have also implemented a Voronoi structure simulation and then refactored the code structure for the multi-order-parameter case. The code here probably doesn't fully support multi-phase-field situations. But honestly, I really don't want to hand-roll a Voronoi structure generation function, and the libraries that can generate this structure are all too large -- I didn't want to introduce any third-party libraries into this example/teaching code. So, the result is that I only implemented a two-grain simulation here. Maybe one day I'll suddenly have a flash of insight about Voronoi structure generation algorithms and then write it into this program? That's a matter for another day.

Like the previous part, a deeper understanding of the model and simulation process cannot be separated from parameter tuning and testing. These two cases are both relatively simple cases -- there aren't many adjustable parameters, and there were already reference parameters at the very start of the simulation. Also, since these aren't actual physical systems, the physical meaning of the numbers plugged in isn't very significant, or rather, these are somewhat result-oriented data. When dealing with actual physical systems, parameter adjustment is the most torturous part of the simulation process. How to precisely control these parameters so they work together to produce something that both matches physical characteristics and produces reasonable results -- this may be the most troublesome aspect of the phase field method. The interpretability of parameters often contradicts their numerical properties, and results that balance the two are almost always carefully engineered. In any case, more parameter tuning is never wrong.

So this is the final part of this (self-proclaimed) tutorial series. The phase field method, as a materials simulation method, can do a great many things, but it also has certain limitations of its own. Its greatest limitation is the so-called diffuse interface -- such an interface solves the problem of differential equations being hard to solve, but it also makes the method prone to sliding down the path of unclear physical meaning. It also frequently suffers from numerical instability in simulations due to the presence of interfaces (even though introducing interfaces is often precisely intended to solve numerical instability). These characteristics are destined to make phase field a rather complex interdisciplinary subject: it requires deep understanding of materials science, a clear physical picture of material properties, a clear grasp of numerical methods, an understanding of the pros and cons of various approaches to choose the right one, and finally a certain level of programming ability to support the implementation of simulations. This may also be part of what makes phase field complex.

The phase field method is not a very new simulation method, but it still has a great deal of room for development. Whether it's more traditional in-depth simulation studies of spinodal decomposition, using the phase field method to study more complex external fields like solid mechanics, electromagnetism, and fluid mechanics, developing new software to assist with phase field simulations, or even using machine learning to support phase field computations -- these are all directions in which phase field is currently developing. This tutorial series aims to provide the most fundamental parts of the phase field method, such as the mathematical foundations, programming foundations, and so on. This content should become important tools in the process of learning phase field, helping with the study and development of deeper, more complex theories and practice. I hope that readers of this tutorial can gain something from it.

Well, that's all. I wish you a pleasant life and smooth research~
