---
categories:
- Phase Field
- Mathematics
- Programming
tags:
- Tutorial
- Numerical Analysis
title: "Phase Field: Simulation Study Notes I"
description: Notes on learning the phase field method
image: "/posts/PF_Tutorial/Skadi.png"
date: 2024-11-01
math: true
links:
  - title: PF_Tutorial_1 — Introduction to the Phase Field Method & Some Mathematical Foundations
    description: Recorded lecture on Bilibili
    website: https://www.bilibili.com/video/BV1961uYiEpJ/
  - title: Foundation of Phase Field Modeling
    description: A good introductory article on phase field found on CSDN
    website: https://blog.csdn.net/kuailezhizi1996/article/details/129011165
---
*This semester, our research group started a phase field simulation training course, so I'm attempting to record the training content as notes. The intended style should be catalog-like notes with optional explanatory text sprinkled in. Let's get started.*
<!--more-->
## What Is the Phase Field Method?

The **Phase Field Method** is a materials simulation method. By using a diffuse (smooth) interface, it overcomes the drawback of another simulation method — the Stefan method — whose sharp interface becomes computationally intractable, thus enabling the simulation of phase evolution in materials.

### Basic Concepts

- **Phase Field**: Think of it as the simulation domain, where each point is assigned a value to represent different phases and phase interfaces.
- **Order Parameter**: The variable used to represent different phases (see above). Generally, 0 means the phase is absent, 1 means it fully occupies the point, and values between 0 and 1 represent the phase interface.
- **Free Energy Functional**: The thermodynamic mechanism behind the phase field. The system evolves the value at each point by moving toward configurations with lower total free energy.
- **Governing Equations**: The equations used to process the free energy functional above. Different types of variables require different evolution equations:
  - **AC**: The Allen–Cahn equation, used for evolving *non-conserved* fields (where the sum of variables need not be constant, e.g., phase order parameters). Can be thought of as a CH equation with a source term.
  - **CH**: The Cahn–Hilliard equation, used for evolving *conserved* fields (where the sum of variables is a constant, e.g., concentration).

### The AC and CH Equations

The Allen–Cahn equation takes the form:
$$
    \frac{\partial \eta_p}{\partial t} = -L_{pq}\frac{\delta F}{\delta\eta_q\left( r,t \right)} 
$$

The Cahn–Hilliard equation takes the form:
$$
    \frac{\partial c_i}{\partial t} = \nabla \cdot M_{ij} \nabla \frac{\delta F}{\delta c_j \left( r,t \right)}
$$

The tools needed to solve both equations: solving ODEs/PDEs (Finite Difference Method, FDM), computing the variational derivative of the free energy (Euler–Lagrange equation), and vector calculus ($\nabla$ and $\nabla^2$).

## Solving ODEs: The Finite Difference Method

Numerical methods for solving ODEs come in many flavors — Fourier spectral methods, the Finite Element Method (FEM), and the one discussed here: the Finite Difference Method (FDM).

The Finite Difference Method is arguably the most convenient approach. Its core idea is simply to skip the "taking the limit" step in differentiation and replace the derivative with a quotient over a very small interval. This turns complex differentiation into simple multiplication and addition, and differential equations can then be solved iteratively — stepping forward from the previous (neighboring) point's value to obtain the next, thereby solving the differential equation step by step.

Compared to other algorithms, FDM's advantage lies not only in its simple logic but also in its relatively loose constraints on the solution domain — it can handle differential equations under a variety of boundary conditions, making it a fairly general-purpose method.

Below are the basic formulas of FDM along with some code implementations:

Consider the following initial value problem for an ODE:
$$ \dfrac{\mathrm{d}\,y}{\mathrm{d}\,x}  = f(x,y);$$
$$ y(x_0) = y(a) = y_0, $$
where $x \in \left[ a,b \right] \subseteq \mathbb{R}$ and $y : {\mathbb{R} \to \mathbb{R}}$.

Choose a large integer $N$, and let $h = \dfrac{b-a}{N}$, $x_0 = a$, $x_i = x_0 + ih$, $x_N = b$, $y_i = y(x_i)$.

Using finite differences, the initial value problem can be rewritten as:
$$ \dfrac{y_i - y_{i-1}}{h} = f(x_{i-1},y_{i-1}); \tag{Explicit Euler}$$
$$ \dfrac{y_i - y_{i-1}}{h} = f(x_{i},y_{i}). \tag{Implicit Euler}$$

The explicit method yields directly:
$$ y_i = h f(x_{i-1},y_{i-1}) + y_{i-1}. $$

Here is an implementation of the explicit Euler method in Python:
```python
'''
Explicit Euler Method
list x and y should have an initial value.
'''
from typing import Callable
def explicit_euler(
    x:list[float],y:list[float],h:float,N:int,f:Callable[[float,float],float]
):
    for i in range(N):
        x.append(x[i]+h)
        y.append(f(x[i],y[i])*h+y[i])
```

For the implicit Euler method, if the explicit form of $f(x,y)$ is given, a non-recursive algorithm can be derived; otherwise, since the unknown appears on the right-hand side, it cannot be solved step by step explicitly. Besides the two Euler methods, there are also the trapezoidal rule (averaging $f(x_i,y_i)$ and $f(x_{i-1},y_{i-1})$), the improved Euler method using *predictor–corrector* techniques, and the higher-order Runge–Kutta methods.

Here is a Python implementation of the fourth-order Runge–Kutta method:
```python
"""
Runge-Kutta Method
"""
def runge_kutta(
    x: list[float], y: list[float], h: float, N: int, f: Callable[[float, float], float]
):
    for i in range(N):
        x.append(x[i] + h)
        k_1: float = f(x[i], y[i])
        k_2: float = f(x[i] + h / 2, y[i] + h / 2 * k_1)
        k_3: float = f(x[i] + h / 2, y[i] + h / 2 * k_2)
        k_4: float = f(x[i] + h, y[i] + h * k_3)
        y.append(y[i] + h / 6 * (k_1 + 2 * k_2 + 2 * k_3 + k_4))
```

---

<center>Updated Nov 06:</center>

## Free Energy Functionals and Variational Derivatives: The Euler–Lagrange Equation

### Free Energy: The Driving Force Behind System Evolution

Let's first talk about free energy. The free energy used in phase field modeling is primarily the **Helmholtz free energy**. But whether it's the Helmholtz free energy or the Gibbs free energy, as a thermodynamic free energy, it describes the state of a system — and under the driving force of the free energy gradient, the system will evolve toward configurations of lower free energy. This is the main thermodynamic foundation behind the phase field method.

The free energy used in phase field typically takes the following form:

$$ F(c, \eta, \nabla c, \nabla \eta) = \int_{\Omega} f(c, \eta) + \kappa_c (\nabla c)^2 + \kappa_\eta (\nabla \eta)^2 + S\; \mathrm{d}\omega.$$

Here, $c$ is the concentration, $\eta$ is the order parameter (a variable indicating a particular phase region), the $f(c,\eta)$ part is the *bulk free energy* of the system — which can be understood as the free energy at equilibrium; the two gradient terms $\kappa_c (\nabla c)^2$ and $\kappa_\eta (\nabla \eta)^2$ describe and control the width and mobility of the phase interface, and can be thought of as the *interfacial energy* contribution to the total energy. The final $S$ term covers contributions from other sources — magnetic fields, electric fields, temperature fields, and so on. These components interact with one another, collectively pointing the system's evolution in a particular direction and marking the equilibrium state.

### Functionals: Functions of Functions

The free energy expression above is actually a **functional** — both the concentration and the order parameter are functions of position within the simulation domain. Moreover, it belongs to a classic class of functionals:
$$
J\left[ y \right]=\int_{\Omega} L(x,y(x),y'(x)) \,\mathrm{d}\omega,
$$
in its spatial form (i.e., replacing the ordinary derivative with the gradient). Here $\Omega$ is the domain of the function $y$, and the function $y$ itself acts as the independent variable of the functional. Such functionals often arise from physical backgrounds and have therefore been studied extensively; the study of their extremal functions (i.e., the function $u$ that extremizes $J$) is by now a mature field.

### The Euler–Lagrange Equation

The **Euler–Lagrange equation** refers to the equation for functionals of the above type:
$$
\frac{\partial L}{\partial f}-\frac{\mathrm{d} }{\mathrm{d} x}\frac{\partial L}{\partial f'} = 0. \tag{1}
$$

The role of this equation is analogous to the extremum condition of an ordinary function $y = \phi(x)$:
$$ 
\phi'(\xi) = 0, \tag{2}
$$
both specifying the conditions for an extremal point: (1) states that the extremal function $f$ must satisfy the E–L equation, while (2) states that the extremal point $\xi$ must have derivative zero. From this it is easy to see why the functional derivative (or **variational derivative**) takes the form of the left-hand side of equation (1):
$$
\frac{\delta J[y]}{\delta y} = \frac{\partial L}{\partial y}-\frac{\mathrm{d} }{\mathrm{d} x}\frac{\partial L}{\partial y'}.
$$

Of course, only the case with first-order derivatives was given above. For the more general case
$$
J\left[ y \right]=\int_{\Omega} L(x,y(x),y'(x),\dots,y^{(n)}(x)) \,\mathrm{d}\omega,
$$ 
the expression becomes:
$$
\frac{\delta J[y]}{\delta y} = \frac{\partial L}{\partial y}-\frac{\mathrm{d} }{\mathrm{d} x}\frac{\partial L}{\partial y'} + \dots + (-1)^n \frac{\mathrm{d}^n }{\mathrm{d} x^n}\frac{\partial L}{\partial y^{(n)}}.
$$

## Vector Calculus: $\nabla$

Here we mainly discuss the operational rules of the $\nabla$ (nabla) operator and the results of applying it to different kinds of functions. The $\nabla$ operator is defined as follows:

Let the three basis vectors of a three-dimensional Euclidean space $\mathbb{R}^3$ be $\mathbf{x_1}$, $\mathbf{x_2}$, $\mathbf{x_3}$. Then the $\nabla$ operator on this space is:
$$ \nabla = \frac{\partial}{\partial x_1}\mathbf{x_1}+ \frac{\partial}{\partial x_2}\mathbf{x_2}+\frac{\partial}{\partial x_3}\mathbf{x_3},$$
or in vector form:
$$ \nabla = \left[ \frac{\partial}{\partial x_1}, \frac{\partial}{\partial x_2}, \frac{\partial}{\partial x_3}\right]^{\mathsf{T}}.$$

Thus, when the $\nabla$ operator acts directly on a scalar-valued function (e.g., $f: \mathbb{R}^3 \to \mathbb{R}$), the result is $\nabla f : \mathbb{R}^3 \to \mathbb{R}^3$ — the **gradient** of the function. When it is dotted with a vector-valued function (e.g., $\phi:\mathbb{R}^3 \to \mathbb{R}^3$), the result is a scalar-valued function $\nabla \cdot \phi :\mathbb{R}^3 \to \mathbb{R}$ — the **divergence** of that *vector field* (i.e., each point in the domain is assigned a vector rather than a scalar). When the operator is crossed with a vector-valued function, the result is a vector-valued function $\nabla \times \phi : \mathbb{R}^3 \to \mathbb{R}^3$ — the **curl** of that vector field.

How should one think about these operations? Notice that regardless of the operation, the domain of the function remains unchanged — in every case, we are mapping a vector to some value. With this in mind, we can simply consider the effect on the function's domain: *assigning a value to each coordinate yields a vector; a dot product of vectors yields a scalar; a cross product of vectors yields a vector*. One can also view the three operations as three different "functions": $$\nabla:\mathbb{R} \to \mathbb{R}^3;$$ $$\nabla\cdot: \mathbb{R}^3 \to \mathbb{R};$$ $$\nabla\times :\mathbb{R}^3 \to \mathbb{R}^3,$$ composed with the original function.

Below are the explicit expressions for the three operations:
$$\nabla f = \mathbf{x}_1 \frac{\partial f}{\partial x_1} + \mathbf{x}_2\frac{\partial f}{\partial x_2}+\mathbf{x}_3\frac{\partial f}{\partial x_3};$$
$$\nabla \cdot \mathbf{f} = \frac{\partial f_1}{\partial x_1} + \frac{\partial f_2}{\partial x_2}+\frac{\partial f_3}{\partial x_3};$$
$$\nabla \times \mathbf{f} = \begin{vmatrix}
      \mathbf{x}_1                      & \mathbf{x}_2                      & \mathbf{x}_3                      \\
      \frac{\partial }{\partial x_1} & \frac{\partial }{\partial x_2} & \frac{\partial }{\partial x_3} \\
      f_1                            & f_2                            & f_3
    \end{vmatrix},
$$
where $f_i$ denotes the component functions of $\mathbf{f}$.

Now let's examine the algebraic properties of the $\nabla$ operator. Let $a,b\in\mathbb{R}$ be scalars, $f,g : \mathbb{R}^3 \to \mathbb{R}$ be scalar functions, and $\phi,\psi : \mathbb{R}^3 \to \mathbb{R}^3$ be vector-valued functions.

**Direct action (gradient):**
- Linearity: $\nabla(a f+bg) = a\nabla{f} + b\nabla g$
- Leibniz rule: $\nabla(fg) =  f\nabla{g} + g\nabla{f}$

**Dot product (divergence):**
- Linearity: $\nabla\cdot(a\phi+b\psi) = a\nabla\cdot{\phi} + b\nabla\cdot{\psi}$
- Product rule: $\nabla\cdot(f\phi) =  f\nabla\cdot{\phi} + \phi\cdot\nabla{f}$

**Cross product (curl):**
- Linearity: $\nabla\times(a\phi+b\psi) = a\nabla\times{\phi} + b\nabla\times{\psi}$
- Product rule: $\nabla\times(f\phi) =  f\nabla\times{\phi} + \phi\times\nabla{f}$

**Other identities:**
- Gradient is curl-free: $\nabla\times(\nabla{f}) = 0$
- Curl is divergence-free: $\nabla\cdot(\nabla\times{f}) = 0$
- Laplace operator (gradient then divergence): $\nabla\cdot\nabla{f} = \nabla^2{f} = \Delta{f}$ 

The above covers the more commonly used properties of the $\nabla$ operator. There are actually a great many identities involving combinations of the three operations, but the ones actually used in practice are those listed above.

## Summary

As a materials simulation method, the phase field method spans a broad range of topics — materials science (thermodynamics, kinetics), numerical methods, computer programming, and more. Tackling the problems outlined above forms the necessary mathematical foundation for beginning phase field simulations. In the next part, I plan to implement several of the algorithms from this article in Python, including numerical ODE solving, vector calculus operations, and numerical integration methods.