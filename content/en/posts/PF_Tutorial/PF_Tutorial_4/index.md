---
categories:
- Phase Field
- Programming
tags:
- Tutorial
- C++
title: "Phase Field: Phase Field Simulation Study Notes IV"
description: Notes on learning the phase field method
image: /images/Skadi.png
date: 2024-12-24
math: true
links:
  - title: PF_Tutorial_4 Spinodal Decomposition Phase Field Simulation
    description: Lecture recording on Bilibili
    website: https://www.bilibili.com/video/BV13niUYnEMu
  - title: Lecture Notes Repository on Github
    description: Lecture notes on Github, including slides and reference materials
    website: https://github.com/A-moment096/Phase-Field-Tutorial/tree/main/PF_T2-Numerical_Method_and_Python
---

*Finally, we're really going to do a phase field simulation. Let's start with the low-hanging fruit -- spinodal decomposition.*

## Introduction

So, after studying the previous three parts, we've almost acquired all the prerequisites for doing phase field simulation with C++: formula derivation, programming fundamentals, basic algorithms -- we've got nearly all of them. Starting from this part, we'll officially begin implementing phase field simulations in C++. We'll start with a classic and simple example: spinodal decomposition in an A-B alloy.

## Spinodal Decomposition

So what is spinodal decomposition? What's special about it? Why is the first example in the phase field method this somewhat unfamiliar thing? Let's answer these questions one by one.

First, it's worth clarifying that spinodal decomposition is a type of phase transformation process, and this type of process is particularly well-suited for the phase field method to compute its evolution. As a phase transformation, we naturally care about its phase diagram and free energy curve. Below is a schematic diagram of spinodal decomposition:

![Phase diagram and free energy curve of spinodal decomposition](/posts/PF_Tutorial/img/energy_pd.jpg)

From the diagram, we can see that the free energy curve under spinodal decomposition is very special, exhibiting a *double-well* morphology. Looking further at the phase diagram and free energy curve, you can see that the dashed line corresponds to the flatter region of the free energy curve. Indeed, this point is the so-called spinodal point, which is where the "Spinodal" in spinodal decomposition comes from. Due to the special nature of the free energy curve of spinodal decomposition, when the second-order partial derivative of the free energy with respect to composition is less than 0, if the composition happens to fall within the spinodal region inside the miscibility gap, any tiny compositional perturbation will destroy the stability of the entire system, and the resulting free energy difference (the so-called phase transformation driving force) will increase and drive the system to evolve toward the "valley bottom" of the free energy curve, forming the characteristic morphology of spinodal decomposition.

The most special thing about spinodal decomposition is that the phase field method itself can almost be said to have originated from the spinodal decomposition process. Looking at the free energy curve of spinodal decomposition, it describes a process in which an intermediate-state substance, driven by the need to minimize its own energy, separates into two substances of different compositions. This energy curve will be one of the cores of the phase field method as a computational approach -- the idea is that, given a description of the bulk free energy of a system, the minimization of the bulk free energy will drive the evolution of the entire system. Cahn and Hilliard, building on the Ginzburg-Landau free energy model, established a free energy functional to describe the spinodal decomposition process and derived the evolution equation for this functional, which is the so-called Cahn-Hilliard equation. Therefore, starting from spinodal decomposition to learn the phase field method may be the most ideal choice.

## Model Analysis

### Energy Construction
The free energy construction we use this time is as follows:

$$
\begin{align*}
F &= \int_\Omega f_{bulk} + f_{int}\, \mathrm{d}\omega;\\
f_{bulk}\left(c \right) &= Ac^2(1-c)^2; \\
f_{int}\left(\nabla c \right) &= \kappa \left|\nabla c \right| ^2. \\
\end{align*}
$$

Here, $F$ is the total energy of the system, composed of the integral of two parts of energy density. The first part is the bulk free energy $f_{bulk}$, whose graph is a double well:

![Bulk free energy density function graph, with model parameter A = 1](/posts/PF_Tutorial/img/AB_free_energy.png)

The second part is the interfacial energy density term, where we use the value of the gradient inner product. This energy construction ensures that the system has a tendency to evolve (driven by the bulk free energy density) while also ensuring the existence of stable phase interfaces in the system (provided by the interfacial energy, which raises the energy in interfacial regions -- where the gradient is non-zero -- thereby forcing the material not to favor gathering at the interface). This kind of total energy $F$ construction is a very classical approach, while the specific expression of the energy density needs to be modified according to the system.

### Evolution Equation
Next, let's analyze the Cahn-Hilliard equation. We mentioned this equation before but didn't analyze it in detail. Its form is as follows:

$$
\frac{\partial c_i}{\partial t} = \nabla\cdot\left(M_{ij}\nabla\frac{\delta F}{\delta c_j}\right)
$$

It's worth noting that the product inside the parentheses actually uses the Einstein summation convention (yes, that Albert Einstein). I won't go into too much detail here; roughly speaking, it means adding up all the driving forces for each composition to get the total driving force, and then performing the calculation.

So how do we understand this formula? First, let's clarify the physical meaning of all the variables in this formula. The gradient term inside the parentheses should be the chemical potential of each component, and the tensor $M_{ij}$, which is multiplied with the chemical potential gradient and then summed, is the so-called mobility matrix -- it balances the contribution of each chemical potential gradient to the system. At this point, the right-hand side becomes the Laplacian of the chemical potential. Mathematically, it is the sum of second-order partial derivatives in all spatial directions, a quantity that can represent the flatness or undulation of space. If the Laplacian is very large at a certain point, it means the values near that point change dramatically. Considering that we're computing the Laplacian of the chemical potential here, if the chemical potential varies sharply, then the value of its Laplacian at that point will naturally be large.

From the above analysis, we can draw a very preliminary but important conclusion: the greater the variation in chemical potential, the faster the rate of change of the variable. This makes sense, because as the driving force for phase transformation, the redistribution of concentration or matter is primarily caused by changes in chemical potential -- matter should flow from regions of high chemical potential to regions of lower chemical potential. So why must it take the form of divergence wrapping a gradient? This is mainly due to the *conservative nature* of concentration -- concentration is a conserved variable and cannot be created or destroyed arbitrarily. According to the law of conservation of matter, we have

$$
\frac{\partial c_i}{\partial t} + \nabla \cdot J = 0,
$$

where $J$ is the concentration flux. Considering the matter flux, since we've been in a thermodynamic context all along, the matter flux must obey thermodynamic laws -- it can only flow from regions of high chemical potential to regions of low chemical potential. At this point, we try to construct an expression relating chemical potential and matter flux in the simplest possible form. Since the phenomenon of flowing from high-concentration regions to low-concentration regions, when condensed at a single point, manifests as an anti-concentration-gradient, and considering the requirement for the simplest form, the simplest form we can think of is:

$$
J = - \nabla \frac{\delta F}{\delta c}.
$$

However, considering that there may be multiple substances in the system, each contributing to the chemical potential, and conversely, all chemical potentials will influence the evolution of any single component, we should consider the effects of all chemical potentials. Then, since different substances contribute differently to the chemical potential, we use $M_{ij}$ to balance these contributions. Thus, we piece together the Cahn-Hilliard equation shown above. The above analysis and derivation process references [this Review](http://dx.doi.org/10.3934/era.2022143) and [this blog post](https://mogadalai.wordpress.com/2008/09/13/spinodal-decomposition-and-its-modelling-using-cahn-hilliard-equation/).

Now, following this line of thought, if we didn't require matter conservation, what would the simplest form look like? The answer is already on the tip of the tongue -- it's the Allen-Cahn equation, which will be covered in the next section. Some might have noticed that these two equations can be compared to the diffusion equation. I'll leave that content for the next part, otherwise I won't have enough words to pad things out (lol)

## Problem Analysis

We hope to simulate the process of spinodal decomposition. In two dimensions, we can create a simulation domain, specify its length and width, assign a concentration $c$ to every point on it, and then add random noise at each point so that the initial concentration has a tiny perturbation. Then we can evolve the simulation domain according to the energy and evolution equations listed above. Considering that the simulation needs to maintain matter conservation, we use periodic boundary conditions -- that is, when the rightmost point needs to take the point to its right, it instead wraps around to the leftmost point; when the bottommost point needs to take the point below, it wraps around to the topmost point, etc. We start from concentration $c = 0.4$, consider a noise magnitude of $0.001$, and use index arithmetic when handling boundary conditions to ensure we obtain points under periodic boundary conditions.

Here, let's further derive the formulas we used earlier, substituting the energy into the evolution equation to directly obtain the expression needed for iterating the concentration field.

$$
\frac{\partial c}{\partial t} =  M \nabla^2\left( 2Ac(1-c)(1-2c)-\kappa\nabla^2c\right)
$$

According to this formula, we first need to compute the Laplacian of the concentration, then after calculating the chemical potential, compute the Laplacian of the whole expression inside the parentheses, and finally use forward Euler iteration to update the concentration. Here we use some simple values for the calculation: $A = 1.0$, $M = 1.0$, $\kappa = 0.5$. For the discrete step sizes, we take $\Delta t= 0.01$, $\Delta x= 1.0$.

## Code Implementation

Below, I'll present all the code in one go:

```cpp {lineNos=inline}
#include <filesystem>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

void write_vtk(std::vector<std::vector<double>> mesh, std::string file_path, int time_step, double dx) {
    std::filesystem::create_directory(file_path);
    std::filesystem::path f_name{"step_" + std::to_string(time_step) + ".vtk"};
    f_name = file_path / f_name;

    std::ofstream ofs{f_name};
    size_t Nx{mesh.size()}, Ny{mesh.at(0).size()};

    ofs << "# vtk DataFile Version 3.0\n";
    ofs << f_name.string() << std::endl;
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

    ofs << "SCALARS " << "CON " << "float 1\n";
    ofs << "LOOKUP_TABLE default\n";
    for (size_t i = 0; i < Nx; i++) {
        for (size_t j = 0; j < Ny; j++) {
            ofs << mesh.at(i).at(j) << std::endl;
        }
    }

    ofs.close();
}

void energy_curve(std::vector<double> f_list, double kappa, std::string file_path, int pstep) {
    std::filesystem::create_directory(file_path);
    std::filesystem::path f_name{"energy_time.csv"};
    f_name = file_path / f_name;

    std::ofstream ofs;
    ofs.open(f_name);
    ofs << "time" << "," << "value\n";
    for (size_t i = 0; i < f_list.size(); i++) {
        ofs << i * pstep << "," << f_list.at(i) << std::endl;
    }
    ofs.close();
}

double laplacian(double cl, double cr, double cd, double cu, double cc, double dx) {
    return (cl + cr + cd + cu - 4.0 * cc) / (dx * dx);
}

double df_dc(double mu, double kappa, double lap_c) {
    return mu - kappa * lap_c;
}

double chem_potential(double A, double c) {
    return 2.0 * A * (c * (1 - c) * (1 - c) - c * c * (1 - c));
}

double chem_energy(double A, double c) {
    return A * c * c * (1 - c) * (1 - c);
}

double F_total(std::vector<std::vector<double>> mesh, double kappa, double A) {
    double energy{0};

    for (size_t i = 0; i < mesh.size() - 1; i++) {
        for (size_t j = 0; j < mesh.at(0).size() - 1; j++) {
            double cc = mesh.at(i).at(j);
            double cr = mesh.at(i + 1).at(j);
            double cu = mesh.at(i).at(j + 1);

            energy += (cr - cc) * (cr - cc) * kappa / 2.0;
            energy += (cu - cc) * (cu - cc) * kappa / 2.0;
            energy += chem_energy(A, cc);
        }
    }
    return energy;
}

const int Nx = 64;
const double dx = 1.0;
const double dt = 0.01;
const int nstep = 10000;
const int pstep = 50;
const double c0 = 0.4;
const double mobility = 1.0;
const double kappa = 0.5;
const double A = 1.0;

int main() {

    std::vector<std::vector<double>> mesh(Nx, std::vector<double>(Nx, 0));
    for (int i = 0; i < Nx; i++) {
        for (int j = 0; j < Nx; j++) {
            mesh.at(i).at(j) = c0 + (double)(100 - rand() % 200) / 1000.0;
        }
    }
    std::vector<double> F_time_curve{};

    auto df_dc_mesh{mesh};

    for (int istep = 0; istep < nstep + 1; istep++) {
        for (int i = 0; i < Nx; i++) {
            for (int j = 0; j < Nx; j++) {
                int im = i - 1;
                if (im == -1)
                    im = Nx - 1;
                int ip = i + 1;
                if (ip == Nx)
                    ip = 0;
                int jm = j - 1;
                if (jm == -1)
                    jm = Nx - 1;
                int jp = j + 1;
                if (jp == Nx)
                    jp = 0;
                double cl{mesh.at(im).at(j)};
                double cr{mesh.at(ip).at(j)};
                double cd{mesh.at(i).at(jm)};
                double cu{mesh.at(i).at(jp)};
                double cc{mesh.at(i).at(j)};

                df_dc_mesh.at(i).at(j) = df_dc(chem_potential(A, cc), kappa, laplacian(cl, cr, cd, cu, cc, dx));
            }
        }
        for (int i = 0; i < Nx; i++) {
            for (int j = 0; j < Nx; j++) {
                int im = i - 1;
                int ip = i + 1;
                int jm = j - 1;
                int jp = j + 1;
                if (im == -1)
                    im = Nx - 1;
                if (ip == Nx)
                    ip = 0;
                if (jm == -1)
                    jm = Nx - 1;
                if (jp == Nx)
                    jp = 0;
                double df_dc_l{df_dc_mesh.at(im).at(j)};
                double df_dc_r{df_dc_mesh.at(ip).at(j)};
                double df_dc_d{df_dc_mesh.at(i).at(jm)};
                double df_dc_u{df_dc_mesh.at(i).at(jp)};
                double df_dc_c{df_dc_mesh.at(i).at(j)};

                mesh.at(i).at(j) += dt * mobility * laplacian(df_dc_l, df_dc_r, df_dc_d, df_dc_u, df_dc_c, dx);
            }
        }
        if (istep % pstep == 0) {
            write_vtk(mesh, "./result", istep, dx);
            F_time_curve.push_back(F_total(mesh, kappa, A));
        }
    }
    energy_curve(F_time_curve, kappa, "./result", pstep);
}
```

Let me briefly introduce the `write_vtk` function. This function follows the *VTK* file format standard and outputs a `vtk` file after every `pstep` steps. The file format is controlled using `std::fstream` for I/O.

## Results

The output `vtk` files need to be visualized using *Paraview*. If the program runs correctly, the output results will be saved in a newly created subfolder `result` under the folder where the program resides, containing a number of `vtk` files. After opening these files in Paraview, you can see the evolution of the entire system. Here are some screenshots.

| | |
|:-:|:-:|
|![alt text](/posts/PF_Tutorial/img/Spinodal_5.png) |![alt text](/posts/PF_Tutorial/img/Spinodal_25.png) 
|Step 5|Step 25|
|![alt text](/posts/PF_Tutorial/img/Spinodal_75.png)| ![alt text](/posts/PF_Tutorial/img/Spinodal_150.png)
|Step 75|Step 150|

## Summary

This part has relatively little content, because once you've analyzed the energy model used and understood the evolution equation, almost all the remaining work is just continuous debugging -- tweaking parameters based on the results to observe how different parameters affect the simulation outcome. Here are some ideas for parameter tuning:

- Adjust the spatial and temporal step sizes. The solution should become more diffuse as either increases.
- Adjust the diffusion rate (mobility). Higher mobility makes the phase aggregation more rapid.
- Adjust the parameters of the free energy function. A stronger potential well makes phase separation faster and the boundaries sharper.
- Adjust the initial concentration.
- Adjust the interfacial energy parameter. A larger interfacial energy parameter leads to a wider phase interface. If this parameter is too small, numerical instability may occur.

You can use these suggestions as a reference for parameter tuning and observe the effects of the parameters. Parameter tuning is almost an indispensable part of phase field simulation.

So, see you in the next section!
