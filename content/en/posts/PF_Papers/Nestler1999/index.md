---
categories:
# - Mathematics
# - Programming
- Phase Field
# - Others
tags:
- Paper Reading
- PF Model
- Interfacial Model
title: Paper Reading - Nestler1999
description: A multiphase field model：sharp interface asymptotics and numerical simulations of moving phase boundaries and multijunctions
date: 2025-10-22T18:25:19+08:00
image: /images/Nev_Alice.jpg
math: true
hidden: false
comments: true
---

*In his 1999 article, Nestler further introduced the model situation from his earlier papers. The part that everyone later used more was probably the interfacial energy formulation. Here I read (translate) this article and make some notes.*

*The image is an AI illustration drawn by [**Neve_AI**](https://x.com/Neve_AI), so cute~~*

## Research Background

This paper primarily compares the asymptotic results of sharp interfaces with the simulation results of the multiphase field model. In a previous article[^1], a model had already been established that, using the generalized Cahn-Hoffman $\xi$-vector formulation, derived the Gibbs-Thomson-Herring equation at interfaces under the sharp interface limit, as well as the conservation of anisotropic forces at multi-phase junctions. In another article[^2], an asymptotic analysis of the multi-phase Allen-Cahn equation was performed, determining the **asymptotic singular limit (roughly, how coarse the grid must be before the formula breaks down)**; additionally, another article[^3] provided detailed numerical analysis results for this model.

Simply put, this article is a part of this new model, used to verify the asymptotic behavior. The big shots are truly impressive; it's all self-citations. After a rough look, this article is the shortest one — good thing I started reading from here (escape)

## Model from the Paper

### Total Energy

$$
\begin{align*}
\mathcal{F} &= \int_V \mathcal{L}(\mathbf{\phi},\mathbf{\nabla}\mathbf{\phi})\,\mathrm{d}V \\
&= \int_V \sum_{\beta=1}^N \sum_{\alpha=1}^\beta [ 36 \varepsilon_{\alpha\beta}\,{\gamma}_{\alpha\beta}^2(\mathbf{r}_{\alpha\beta})+ \frac{1}{4 \varepsilon_{\alpha\beta}} \, g_{\alpha\beta}(\mathbf{\phi})] \\
&\qquad\qquad + \sum_{\alpha=1}^N h_{\alpha}(\mathbf{\phi},T)\,\mathrm{d}V ,
\end{align*}
$$

$\mathbf{\phi}$ is naturally the order parameter. The Greek letters $\alpha,\beta$ represent some phase, with $N$ phases in total. $\mathcal{L}$ is the **Lagrangian density (? should be energy density, but a Lagrangian multiplier was applied)**; $\varepsilon_{\alpha\beta}$ is proportional to the barrier height of the interaction bulk potential $g_{\alpha\beta}(\mathbf{\phi})$; $h_{\alpha}(\mathbf{\phi},T)$ represents the bulk phase free energy density and its degree of deviation from thermodynamic equilibrium; $\gamma_{\alpha\beta}$ should be the anisotropy parameter of the interfacial energy, presumably assumed to be related to the direction vector $\mathbf{r}_{\alpha\beta} = \phi_\alpha \mathbf{\nabla} \phi_\beta - \phi_\beta \mathbf{\nabla}\phi_\alpha$.

### Order Parameter Evolution Equation

$$
\begin{align*}
\frac{\partial\phi_\mu}{\partial t} &= -M\frac{\delta\mathcal{F}}{\delta\phi_\mu} = M\left\{\mathbf{\nabla}\!\left(\frac{\partial\mathcal{L}}{\partial\mathbf{\nabla}\phi_\mu}\right)-\frac{\partial\mathcal{L}}{\partial\phi_\mu}\right\},
\end{align*}
$$

Here, the very classical Allen-Cahn equation is used. Note that Nestler mentions this equation necessarily assumes that the total energy $\mathcal{F}$ decreases monotonically with time. Since the mobility parameter $M$ is generally anisotropic, $M= M(\mathbf{\nabla} \mathbf{\phi})$;

### Generalized Cahn-Hoffman $\xi$-vector

$$\begin{align*}
\xi_{\alpha\beta}(\mathrm{r}_{\alpha\beta}) &= \frac{\partial \gamma_{\alpha\beta}(\mathbf{r}_{\alpha\beta})}{\partial \mathbf{r}_{\alpha\beta}} \;=\; \mathbf{\nabla}_{\mathbf{r}_{\alpha\beta}} \gamma_{\alpha\beta}(\mathbf{r}_{\alpha\beta})
\end{align*}$$

This vector appeared in reference[^1]. I don't yet know what it does — it looks like it should be the gradient of the anisotropy.

### Substituting Results and Discussion

Substituting the above results yields:

$$
\begin{align*}
\frac{1}{M}\frac{\partial\phi_{\mu}}{\partial t} &= \sum_{\alpha\neq\mu}^{N}\Bigg[2\varepsilon_{\alpha\mu}\mathbf{\nabla}\!\cdot\!\big(\gamma_{\alpha\mu}\boldsymbol{\xi}_{\alpha\mu}\phi_{\alpha}\big)
+\gamma_{\alpha\mu}\boldsymbol{\xi}_{\alpha\mu}\!\cdot\!\mathbf{\nabla}\phi_{\alpha}
-\frac{1}{4\varepsilon_{\alpha\mu}}\frac{\partial g_{\alpha\mu}}{\partial\phi_{\mu}}\Bigg]
-\frac{\partial h_{\mu}}{\partial\phi_{\mu}}-\lambda
\end{align*}
$$

(I can't help but admire the mathematical prowess of the old masters. This formula — I honestly can't be bothered to substitute and compute it; maybe another day)

$\lambda$ is naturally the Lagrange multiplier, used to ensure that the sum of all phase order parameters at a point is unity. References[^1] and [^2] point out that one can let the interfacial energy $\varepsilon_{\alpha\beta}$ tend to zero to asymptotically approach the sharp interface case, thereby obtaining the Gibbs-Thomson-Herring equation at each interface.

### Divergence-Free Stress Tensor $\Xi$

Here, to further study the leading order force balance at multi-phase junctions (**I guess it's about keeping the dominant forces balanced**), a divergence-free stress tensor $\Xi$ is introduced:

$$\Xi = \sum_{\mu=1}^{N} \mathbf{\nabla}_{\phi_{\mu}}\phi_{\mu}\otimes\frac{\partial\mathcal{L}}{\partial\mathbf{\nabla}\phi_{\mu}}-\mathcal{L}\,I$$

Since it is divergence-free, it requires $\mathbf{\nabla}\cdot \Xi = 0$ (so complex, I can't understand it). Putting this definition into the above multiphase field model, then using the divergence theorem (**should be converting divergence to a closed surface integral**), taking the sharp interface limit, and computing the Lagrangian density to the dominant term, **one obtains (?)** the mechanical equilibrium equation at multi-phase points:

$$\sum_{\mu=0}^{m-1}\mathbf{F}_{\mu}=\mathbf{l}\times\sum_{\mu=0}^{m-1}\,\xi_{\mu\mu+1}=0,$$

Here, $\mathbf{F}_{\mu}$ is the total force between the $\mu$ and $\mu+1$ faces, and the vector $\mathbf{l}$ is a unit vector parallel to the multi-phase point. If this formula is expressed in spherical coordinates, it can be seen as a Young's law result plus the additional shear stress caused by the anisotropy of the surface free energy.

## Numerical Solution Method

They used finite differences and so-called Neumann boundary conditions, which should be periodic boundaries. Specific information can be found in reference[^3].

### Energy Choice

They tested a series of bulk free energy functions $g_{\alpha\beta}(\mathbf{\phi})$ and ultimately chose this one:

$$
\begin{align*}
g(\mathbf{\phi}) &= \sum_{\alpha,\beta} g_{\alpha\beta}(\mathbf{\phi}) + \sum_{\alpha,\beta,\mu} g_{\alpha\beta\mu}(\mathbf{\phi})\\
&= \sum_{\alpha,\beta} \phi_{\alpha}\phi_{\beta} + \sum_{\alpha,\beta,\mu} \delta_{\alpha\beta\mu}\,\phi_{\alpha}\phi_{\beta}\phi_{\mu}
\end{align*}
$$

The choice of $\delta_{\alpha\beta\mu}$ is such that along the Gibbs simplex, the curve connecting two Gibbs simplexes is the shortest. This ensures that no third phase appears in a two-phase region. **(What is a Gibbs simplex?)**

### Computational Method and Simulation Results

To numerically solve the double-well equation, they first solved the smooth part of the differential equation, and then projected it back onto the Gibbs simplex **(? What the heck)**. Next are the simulation results. Roughly, in a three-phase interface, if two interfacial energies are equal and one is different from them, driven by the free energy, the two interfaces with equal interfacial energies become "flat" while the different one becomes perpendicular. Additionally, during grain growth simulations, this model also conforms to von Neumann's law: von Neumann's law requires that grains with fewer than six neighboring grains shrink, while those with more than six grow. Moreover, three phases with equal interfacial energies will eventually form interfaces with 120-degree angles, while phases that do not form such three-phase angles will disappear early.

## Summary

Very frightening. The mathematical and physical background of the big shots is truly not for show — I can't understand a single formula. Fortunately, the conclusions are sufficiently clear and easy to understand. Perhaps this is what is meant by explaining profound ideas in simple terms.

Points discovered from the article that need deeper investigation:

- What is a Gibbs simplex? What does smooth solving and then projecting mean...
- What exactly is that magical Gibbs-Hoffman $\xi$ vector? From the later stress balance formula, it seems to carry mechanical meaning;
- What exactly is that divergence-free stress tensor? Judging from the tensor product form and the part subtracted that looks like multiplying the identity matrix, perhaps it is exactly the formula with the hydrostatic pressure tensor subtracted? Worth further investigation;
- The construction of the free energy should be further consulted from some older literature — where do all these numbers come from;
- How was that $\xi$ vector substituted in? This should be a very crucial step, as well as how it leads to the later conclusions by letting the interfacial energy tend to zero. After the interfacial energy tends to zero, what should remain are the interpolation function and the Lagrange multiplier;
- Why is the anisotropy squared? Perhaps answers need to be found elsewhere...

Overall, I will continue reading his 1998 article[^1] and manually do the substitution to see what happens.

Of course, there are also gains:

- So it was von Neumann who first discovered that more than six leads to growth and fewer than six to shrinkage? Amazing.
- Understood the influence of interfacial energy on the model, as well as the advantages of Nestler's (interfacial energy) model: the third phase does not appear at two-phase interfaces, which is a very good point for numerical stability
- Appreciated the brilliance of the big shots — too incredible...

Next time, I'll look at a different direction and read papers by Khachaturyan (this guy's name is really hard to remember) on microelasticity from the mechanics perspective.


[^1]: B. Nestler, A.A. Wheeler, Phys. Rev. E 57 (3) (1998) 2602.
[^2]: H. Garcke, B. Nestler, B. Stoth, Physica D 115 (1998) 87.
[^3]: H. Garcke, B. Nestler, B. Stoth, SIAM J. Appl. Math. 60 (1) (1999) 295
