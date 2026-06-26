---
categories:
- Phase Field
- Mathematics
tags:
- PF Model
- Note
title: "Multiphase Field Model and Grand Potential Equation"
description: Notes on two phase field equations
image: /images/ShoujouRei_MikitoP.png
date: 2025-01-05
math: true
---

*Recording the two phase field models currently in use, including their derivations, assumptions, and shortcomings*

*The header image is by [Katorei](https://twitter.com/katorei_), an illustration for [みきとP](https://space.bilibili.com/108833238) (Mikito P)'s song [Shoujo Rei](https://www.bilibili.com/list/ml1197098078?spm_id_from=333.1007.0.0&oid=27304533&bvid=BV1Rs411N7Aq)(少女レイ)*

{{< music auto="https://music.163.com/#/song?id=1334077117" loop="none">}}

## Introduction

The discontinuous precipitation simulation I am currently working on uses these two evolution equations. I had never carefully thought about where these two evolution equations actually come from, or why they are suitable for this system, which left me with no idea where to start when I wanted to modify them somewhat. Here I will record the derivation methods, strengths and weaknesses of these two equations, as well as some of my personal thoughts.

## Multiphase Field Model

### Model Introduction

The multiphase field model (or interface field model, roughly the same thing) is an evolution equation suitable for non-conserved fields, originating from [the article by I. Steinbach and F. Pezzolla](https://doi.org/10.1016/S0167-2789(99)00129-3). Its form is:

$$
\frac{\partial \phi_\alpha}{\partial t} = -\frac{1}{\tilde{N}}\sum_{\beta \neq \alpha} \tilde{L}_{\alpha\beta}\left(\frac{\delta }{\delta \phi_\alpha} - \frac{\delta }{\delta \phi_\beta} \right)F,
$$

Here $F$ is the free energy functional, $\tilde{N}$ is the number of effective order parameters, $\tilde{L}_{\alpha\beta}$ is the interface mobility parameter between two phases among the effective order parameters, and the difference in parentheses represents an operator, namely:

$$
\left(\frac{\delta }{\delta \phi_\beta} - \frac{\delta }{\delta \phi_\alpha} \right)F = \frac{\delta F}{\delta \phi_\beta} - \frac{\delta F}{\delta \phi_\alpha}.
$$

Simply put, this article considered using interface fields to describe and evolve interfaces between different phases, rather than using the phase's own order parameter as the evolution parameter. Although in the end it still comes down to evolving the phase's own order parameter, the idea of interface fields is integrated into this evolution model. The main improvement should be that while considering interface fields, it also considers the effective order parameters at each point, i.e., the order parameters of phases that are not zero, which also simplifies the computation (although in practice one can just use the traditional computation with all phases as well).

To be honest, the logical structure of this article is not very clear, the formula derivation process is a disaster, and there are even issues with the notation, but hey, the model works, doesn't it? So let's skip the nonsense and dive right into deriving this equation. Note that the derivation process here differs slightly from the author's, and also references [this article by Q. Huang et al.](https://doi.org/10.1016/j.commatsci.2023.112047).

### Model Derivation

For multi-phase problems, we introduce a constraint: the sum of all order parameters at each point is a constant $1$. That is:

$$
\sum_{\alpha = 1}^{N} \phi_\alpha = 1,
$$

By the linearity of differentiation with respect to time, we also have:

$$
\sum_{\alpha = 1}^{N} \frac{\partial \phi_\alpha}{\partial t} = 0.
$$

Suppose we already have a free energy functional $F[\{\phi\},\{\nabla\phi\}]$ of the form:

$$
F[\{\phi\},\{\nabla\phi\}] = \int_\Omega f\left(\{\phi\},\{\nabla\phi\}\right) \,\mathrm{d}\omega,
$$

That is, we have written out its energy density form. We now wish to further introduce the above constraint into this energy functional, so we use the Lagrange multiplier method, introducing a Lagrange multiplier $\lambda$ into the free energy density:

$$
\begin{aligned}
    l \left(\left\{\phi \right\},\left\{\nabla\phi \right\}, \lambda\right)        & = f\left(\left\{\phi \right\},\left\{\nabla\phi \right\}\right) - \lambda\left( \sum_{\alpha = 1}^{N} \phi_\alpha - 1 \right); \\
    \mathcal{L}\left[\left\{\phi \right\},\left\{\nabla\phi \right\}, \lambda\right] &= \int_\Omega l \,\mathrm{d}\omega.
\end{aligned}
$$

Then we take the variational derivative of $\mathcal{L}$ with respect to $\phi_\alpha$:

$$
\begin{aligned}
        \frac{\delta \mathcal{L}}{\delta \phi_\alpha} & =  \frac{\partial l}{\partial \phi_\alpha} - \nabla \cdot \frac{\partial l}{\partial \nabla \phi_\alpha}          \\
                                                      & = \frac{\partial f}{\partial \phi_\alpha} - \nabla \cdot \frac{\partial f}{\partial \nabla \phi_\alpha} - \lambda \\
                                                      & = \frac{\delta F}{\delta \phi_\alpha} - \lambda .
    \end{aligned}
$$

At this point we apply the so-called "Relaxation Ansatz," meaning this variational derivative is the evolution rate of $\phi_\alpha$:

$$
\begin{aligned}
      \frac{\partial \phi_\alpha}{\partial t} &=  -\frac{\delta \mathcal{L}}{\delta \phi_\alpha}\\
      &= -\frac{\delta F}{\delta \phi_\alpha} + \lambda
    \end{aligned}
$$

Then from the constraint condition above, we can solve for $\lambda$:

$$
    \lambda = \frac{1}{N} \sum_{\alpha = 1}^{N} \frac{\delta F}{\delta \phi_\alpha}
$$

Now substituting $\lambda$ back into the variational result after applying the "Relaxation Ansatz":

$$
\begin{aligned}
      \frac{\partial \phi_\alpha}{\partial t} &= -\frac{\delta F}{\delta \phi_\alpha} + \frac{1}{N} \sum_{\beta = 1}^{N} \frac{\delta F}{\delta \phi_\beta} \\
      &= -\frac{N-1}{N} \frac{\delta F}{\delta \phi_\alpha} + \frac{1}{N} \sum_{\beta = 1}^{N} \frac{\delta F}{\delta \phi_\beta} - \frac{\delta F}{\delta \phi_\alpha} \\
      &= -\frac{N-1}{N} \frac{\delta F}{\delta \phi_\alpha} + \frac{1}{N} \sum_{\beta \neq \alpha} \frac{\delta F}{\delta \phi_\beta} \\
      &= - \frac{1}{N} \sum_{\beta \neq \alpha} \left( \frac{\delta }{\delta \phi_\alpha} -\frac{\delta }{\delta \phi_\beta} \right)F \\
    \end{aligned}
$$

Finally, considering that we only care about effective order parameters, i.e., those not equal to 0, the $N$ here can be modified to $\tilde{N}$; the content inside the parentheses describes the driving force of the interface field between two phases, and for different two-phase driving forces, the magnitude should be different, so we multiply the driving force by a phase-pair-dependent interface mobility parameter, $\tilde{L}_{\alpha\beta}$. Thus the result is:

$$
\frac{\partial \phi_\alpha}{\partial t} = -\frac{1}{\tilde{N}}\sum_{\beta \neq \alpha} \tilde{L}_{\alpha\beta}\left(\frac{\delta }{\delta \phi_\alpha} - \frac{\delta }{\delta \phi_\beta} \right)F,
$$

That is our multiphase field model.

### Model Interpretation

The derivation process above is fairly reasonable up until the last step. However, why can we just stuff $\tilde{L}_{\alpha\beta}$ into the summation at the end? Perhaps it can only be explained from a physical perspective. This formula, when considering the "Relaxation Ansatz," did not introduce some mobility-related parameters, such as the mobility matrix in the classical Allen-Cahn equation, which was also done to simplify the derivation. Otherwise we would fall into a summation hell, and the obtained value of $\lambda$ would become:

$$
\lambda = \frac{\sum_\alpha\sum_\beta{}L_{\alpha\beta}\frac{\delta F}{\delta \phi_\beta}}{\sum_\alpha\sum_\beta{}L_{\alpha\beta}},
$$

Substituting this back yields:

$$
\frac{\partial \phi_\alpha}{\partial t} = \frac{\sum_\beta{L_{\alpha\beta}}}{\sum_\xi\sum_\zeta L_{\xi\zeta}}{\sum_\xi\sum_{\zeta\neq\beta} L_{\xi\zeta}\left( \frac{\delta }{\delta \phi_\beta} -\frac{\delta }{\delta \phi_\zeta} \right)F}
$$

While rigorous, it is hard to understand. However, when we consider that the mobility parameters here can be directly integrated into $\tilde{L}_{\alpha\beta}$ and $\tilde{N}$, the entire expression becomes much cleaner and the physical meaning becomes clearer.

Furthermore, in [the article by I. Steinbach and F. Pezzolla](https://doi.org/10.1016/S0167-2789(99)00129-3), $\left( \frac{\delta }{\delta \phi_\alpha} -\frac{\delta }{\delta \phi_\beta} \right)F$ is interpreted as the interface field $\psi_{\alpha\beta}$, which is why this model is called the interface field model. In the derivation process of that article, if one considers using interface fields for the derivation, one can circumvent solving for the explicit expression of $\lambda$, because this $\lambda$ is the same for all phases, and the way the interface field is defined as a difference naturally cancels out the effect of $\lambda$.

Finally, we point out that this evolution equation does not impose any constraints on the free energy $F$, so the model is very broadly applicable. In fact, the multiphase field model is extremely widely used and can often be found in recent phase field simulation articles. So, although the derivation of this model (in my opinion, perhaps it's just me) is not sufficiently reliable, it works well. Yes, it works very well.

## Grand Potential Equation

### Model Introduction

To evolve conserved field variables, we often need to use the Cahn-Hilliard equation. However, to obtain better results, or when we encounter numerical issues introduced by the evolution equation, we may need to modify this classical equation, just like the relationship between the Allen-Cahn equation and the multiphase field model above. For the most classic variable, concentration, we have the total concentration field model (considering the concentration of the entire simulation domain), the phase concentration field model (considering the concentration of material within each phase), and the grand potential equation we are about to introduce here (evolving the chemical potential within the simulation domain).

Before introducing the specific expression of the grand potential equation, let's first take a look at the so-called "phase concentration" and "total concentration." We know that for the entire system, the number of components (elements) is fixed, and a system may have multiple grains, each of which may belong to different phases. For different phases, their compositions are likely different. Therefore, the concentration of a component within each phase should be constant (not varying with position), while it changes throughout the entire simulation domain (varying with different phases). Additionally, changes in concentration depend on the diffusion potential; the gradient of the diffusion potential drives concentration changes, causing material to flow from high potential to low potential. Thus, the change in concentration during phase growth can be viewed as being caused by the difference in diffusion potentials between phases resulting from different phase concentrations. Based on this, we can also indirectly simulate concentration changes by evolving the diffusion potential within the simulation domain. The grand potential equation we are about to introduce here is precisely such an equation for simulating the change in diffusion potential.

The expression of the grand potential equation is as follows:

$$
\frac{\partial \mu_i}{\partial t} = \left[\phi_\alpha \frac{\partial c_j^\alpha}{\partial \mu_i} \right]^{-1} \left( \nabla\cdot \bar{M}_{jk} \nabla\mu_k + R_j - c_j^\alpha\frac{\partial \phi_\alpha}{\partial t} \right).
$$

I need to explain the notation of this equation. First, as usual, $c$ represents the phase concentration (i.e., the concentration within a phase), and $\phi$ represents the phase. In addition, $\mu$ in this formula represents the chemical potential (strictly speaking it is the grand potential, which is the origin of this equation's name, but for ease of understanding we will call it the chemical potential), $M$ represents the concentration mobility parameter, and $R$ represents possible concentration/material sources. Furthermore, this equation actually uses Einstein summation convention, meaning that if an index appears twice in a product, summation is performed over that index. For example, the notation of the last term in the parentheses on the right-hand side of the equation represents:

$$
c_j^\alpha\frac{\partial \phi_\alpha}{\partial t} \coloneqq \sum_{\alpha}^{N}c_j^\alpha\frac{\partial \phi_\alpha}{\partial t}.
$$

Therefore, the above equation is actually a complex summation. Additionally, the indices $i,j,k$ in the notation are used to label elements (components); we assume there are $K$ components in total, so there are $K-1$ independent components (the quantity of the last one can be obtained by subtracting all other component quantities from 1). Meanwhile, $\alpha,\beta$ etc. are used to label phases; we assume there are $N$ phases in total. According to our notation, if a quantity in the above formula has no repeated index (repeated indices are also commonly called dummy indices), then this variable actually represents a vector, which has $N$ or $K-1$ components depending on the index notation. And if a variable has two indices, then this variable actually represents a matrix. In what follows, we denote $K-1$ as $\tilde{K}$ for convenience of writing.

Finally, we need to explain the square brackets and the $-1$ superscript. This notation means that we first form a matrix from the elements inside the brackets, and then invert the matrix. At this point, all the subscript notation in the equation should be completely clear.

### Equation Derivation

Let's try to derive this equation. We start directly from the Cahn-Hilliard equation:

$$
\frac{\partial \tilde{c}_i}{\partial t} = \nabla \cdot \sum_{j}^{\tilde{K}}\nabla M_{ij}\nabla \frac{\delta F}{\delta \tilde{c}_j} + R_i.
$$

Here we once again explain some notation. Here we temporarily do not use Einstein summation convention, to make it easier to explain what happens inside the equation. Additionally, $\tilde{c}_i$ here represents the total concentration in the system. We add a tilde to emphasize that it is the total concentration of the entire system, to distinguish it from the phase concentration later.

Since we use the total concentration here, it can actually be expressed using the phase concentration and phase fraction: $\tilde c_i = \sum_\alpha^N \phi_\alpha c^\alpha_i$. Moreover, we know that $\frac{\delta F}{\delta \tilde{c}_j}$ actually represents the chemical potential (grand potential) in the system. So we directly replace it with $\mu_j$. Thus we have:

$$
\frac{\partial \sum_\alpha^N \phi_\alpha c^\alpha_i}{\partial t} = \nabla \cdot \sum_{j}^{\tilde{K}}\nabla M_{ij}\nabla \mu_j + R_i.
$$

Now let's focus on the left-hand side, because the right-hand side, as can be seen, is already part of the final result. For the left-hand side, first, for a finite sum, the linearity of differentiation allows us to swap the order of differentiation and summation. Then we apply the product rule of differentiation:

$$
\frac{\partial \sum_\alpha^N \phi_\alpha c^\alpha_i}{\partial t}  = \sum_\alpha^N\left(\phi_\alpha \frac{\partial  c^\alpha_i}{\partial t} + c^\alpha_i \frac{\partial  \phi_\alpha }{\partial t} \right) = \nabla \cdot \sum_{j}^{\tilde{K}}\nabla M_{ij}\nabla \mu_j + R_i.
$$

We split the sum and move the part containing the time derivative of the phase fraction to the right-hand side:

$$
\sum_\alpha^N \phi_\alpha \frac{\partial  c^\alpha_i}{\partial t} = \nabla \cdot \sum_{j}^{\tilde{K}}\nabla M_{ij}\nabla \mu_j + R_i - \sum_\alpha^N c^\alpha_i \frac{\partial  \phi_\alpha }{\partial t} .
$$

Next is a crucial step, where we link concentration and chemical potential. That is, we consider the phase concentration as a function of the chemical potential: $c_i^\alpha = c_i^\alpha\left( \mu_1, \mu_2, \cdots, \mu_{\tilde{K}} \right)$. This allows us to use the chain rule of differentiation:

$$
\sum_\alpha^N \phi_\alpha \frac{\partial  c^\alpha_i}{\partial t} = \sum_\alpha^N \phi_\alpha \sum_k^{\tilde{K}}\frac{\partial  c^\alpha_i}{\partial \mu_k}\frac{\partial \mu_k}{\partial t},
$$

Then, noting that the summation over components is actually independent of the phase, we move the summation over components to the outermost:

$$
\sum_\alpha^N \phi_\alpha \sum_k^{\tilde{K}}\frac{\partial  c^\alpha_i}{\partial \mu_k}\frac{\partial \mu_k}{\partial t} = \sum_k^{\tilde{K}} \sum_\alpha^N \phi_\alpha \frac{\partial  c^\alpha_i}{\partial \mu_k}\frac{\partial \mu_k}{\partial t}.
$$

Let's pause here and recall the notation of matrix multiplication. Suppose we have two matrices, an $n\times m$ matrix $A = \{a_{ij}\}$ and an $m\times p$ matrix $B = \{b_{jk}\}$, then their product matrix $C$ should be an $n \times p$ matrix, whose elements can be written as: $\sum_j^m a_{ij}b_{jk}$. Additionally, let us examine the partial derivative $\frac{\partial  c^\alpha_i}{\partial \mu_k}$, which, when $i$ and $k$ both take values in the $\tilde{K}$ elements, actually forms the elements of a $\tilde{K} \times \tilde{K}$ matrix. Correspondingly, we can view $\partial \mu_k$ as a vector with $\tilde{K}$ components (or a $\tilde{K} \times 1$ matrix).

Based on the above, we can see that the summation here can actually be written as the product of two matrices (or a matrix multiplied by a vector). At this point we adopt Einstein summation convention:

$$
\sum_k^{\tilde{K}} \sum_\alpha^N \phi_\alpha \frac{\partial  c^\alpha_i}{\partial \mu_k}\frac{\partial \mu_k}{\partial t} \coloneqq \phi_\alpha\frac{\partial  c^\alpha_i}{\partial \mu_k}\frac{\partial \mu_k}{\partial t}.
$$

We make a simple distinction among the three factors on the right-hand side: the product of the first two factors actually represents a summation because the $\alpha$ index is repeated, and then because this summation and the $k$ index of the third factor are repeated, it represents matrix multiplication. Or we can understand $\sum_\alpha^N \phi_\alpha \frac{\partial  c^\alpha_i}{\partial \mu_k}$ as the $(i,k)$-th element of a matrix.

Then, after the above explanation, we substitute the equivalent variables back one by one and rewrite the entire equation using Einstein summation convention, obtaining the following result:

$$
\phi_\alpha \frac{\partial c_i^\alpha}{\partial \mu_k}\frac{\partial \mu_k}{\partial t} = \nabla\cdot \bar{M}_{ij} \nabla\mu_j + R_i - c_i^\alpha\frac{\partial \phi_\alpha}{\partial t}.
$$

Now we can translate the above equation as: a $\tilde{K} \times \tilde{K}$ matrix $\left\{\phi_\alpha \frac{\partial c_i^\alpha}{\partial \mu_k} \right\}$ is multiplied by a $\tilde{K} \times 1$ matrix $\frac{\partial \mu_k}{\partial t}$, yielding a result that is the sum of three $\tilde{K} \times 1$ matrices. What we want is an equation for evolving the change in the system's diffusion potential, which is precisely represented by $\frac{\partial \mu_k}{\partial t}$. So our final step is to left-multiply both sides of the equation by the inverse of this $\tilde{K} \times \tilde{K}$ matrix, obtaining:

$$
\frac{\partial \mu_k}{\partial t} = \left[\phi_\alpha \frac{\partial c_i^\alpha}{\partial \mu_k}\right]^{-1}\left(\nabla\cdot \bar{M}_{ij} \nabla\mu_j + R_i - c_i^\alpha\frac{\partial \phi_\alpha}{\partial t}\right).
$$

You may notice that this equation differs from the one we initially gave in terms of subscripts. This is actually just a rearrangement of subscript ordering for aesthetic purposes. As long as the order of notation within the formula is consistent, the logic of the formula, or matrix multiplication, remains consistent, so the result we obtained here is not fundamentally different from the formula given above.

### Model Interpretation

I know, many gaps have been left here, such as: what is the "grand potential" in the grand potential equation? What is the relationship between the grand potential and the chemical potential? Why must we use the chemical potential / grand potential to evolve the entire system — isn't using the total concentration good enough? How about the phase concentration? Let's explain these questions one by one.

First, what is the grand potential? We know that in thermodynamics there are many different thermodynamic functions, such as enthalpy $H$, entropy $S$, internal energy $U$, Gibbs free energy $G$, Helmholtz free energy $F$, etc. The grand potential, also known as the Landau free energy, is also a thermodynamic function, whose expression is:

$$
\Omega \coloneqq F-\mu N = U-TS-\mu N,
$$

where $F$ is the Helmholtz free energy, $U$ is the internal energy, $T$ is the system temperature, $S$ is the entropy, $\mu$ is the chemical potential, and $N$ is the number of particles in the system. The differential form of the grand potential is:

$$
\mathrm{d}\Omega = \mathrm{d}U-T\mathrm{d}S-S\mathrm{d}T-\mu\mathrm{d}N-N\mathrm{d}\mu = -P\mathrm{d}V-S\mathrm{d}T-N\mathrm{d}\mu.
$$

The grand potential reaches its minimum when the system reaches thermodynamic equilibrium. When the other variables $V$, $T$ of the system remain unchanged, the change in the grand potential actually reflects the change in the chemical potential. Furthermore, we can obtain the expression for concentration from this formula: consider dividing the grand potential by the system volume to obtain the energy density, at which point $N$ changes from the number of particles in the system to the particle concentration / number density $\rho$ of the system. Suppose we also know the atomic volume $V_a$ of the material, then the concentration $c$ can be expressed as:

$$
c = V_a \rho = V_a \left(\frac{\partial \Omega}{\partial \mu}\right)_{V,T}.
$$

Based on this, we can consider expressing concentration as a function of the chemical potential. This also serves as evidence that the concentration can be differentiated with respect to the chemical potential as mentioned earlier.

So, why use the grand potential equation? What advantages does it have compared to the total concentration or phase concentration approaches? Consider a multi-component, multi-phase system, where each phase contains multiple components. The concentration of these components within each phase is fixed, while the concentration of components between different phases is generally different. When a phase transformation occurs, the concentration of material within the phases may change. In this situation, if we want to evolve the concentration distribution of the entire system, we inevitably have to evolve the concentration distribution of each phase.

We would first think of using the phase concentration to evolve the entire system, and then combining the phase concentration with the phase fraction to obtain the concentration distribution of the entire system. This method sounds great in theory, but in practice some numerical issues arise: at phase interfaces, especially where the phase fraction is small, one inevitably has to divide a number by a very small (close to $0$) number. Since the Cahn-Hilliard equation directly evolves the total concentration, one must first separate the phase concentration from the total concentration before directly evolving the phase concentration. When back-calculating the phase concentration from the total concentration, one inevitably has to deal with the distribution of concentration at the interface, which requires some assumption to correctly allocate concentration to each phase. The commonly adopted assumption is that at each point on the interface, the chemical potential of each phase is equal. Based on this, the relationship between the total concentration and phase concentration can be expressed as:

$$
c^i = \sum_\alpha\phi_\alpha c_\alpha^i
$$

Here, $\phi_\alpha$, the phase fraction in front of the phase concentration, causes problems. Suppose we need to evolve a location very close to the interior of a certain phase (i.e., a region where $\phi_\alpha \approx 1$), at this point the phase fractions of many other phases will be approximately $0$. To evolve their respective phase concentrations, one needs to divide by this phase fraction, which, due to computer precision issues, can easily make the result unstable.

What about directly considering the total concentration? The total concentration is essentially the most traditional Cahn-Hilliard equation, but to obtain the phase evolution rate, one still needs to somehow infer the concentration distribution within each phase. This adds excessive computational cost: the process of back-solving for the phase concentration is essentially solving a system of linear equations. In other words, using the phase concentration encounters numerical issues, and using the total concentration adds a lot of computational cost, and in the end it's just swapping the order of operations with the phase concentration method, and numerical issues may still arise when back-solving for the phase concentration.

However, when using the diffusion potential, this problem is cleverly hidden within the partial derivatives. This is equivalent to bypassing such numerical issues through some method, while maintaining reasonable computational cost. In short, it's both fast and good.

## Summary

I'm actually a bit embarrassed to say that this post really only does some simple derivations of these two formulas, and the later interpretation part, I feel, is not written very well myself. It seems that all the explanations ultimately boil down to one conclusion: it works well. This point is actually not very useful when considering pure theory: I need precise theory to describe physical phenomena, but instead you tell me XXX and then YYY to finally obtain these things, and its theoretical background might not be strong enough, but it works well enough. I believe such an explanation is hard to truly move someone's heart.

However, "works well" is actually enough, because these theories are ultimately meant to help us do better simulations based on certain assumptions. Here, the fundamental assumptions can be said to be the relaxation ansatz and the equipotential assumption. The first assumption allows our system to *evolve* from a non-equilibrium state to an equilibrium state, rather than only being able to directly give the field quantities at equilibrium, while the second assumption resolves the problem of material distribution at interfaces in the phase field method, allowing evolution to proceed normally under multi-phase conditions. These assumptions, whether viewed from the process or the result, are very necessary. And aside from these assumptions, (without considering whether my own derivation process is rigorous enough,) the derivation process is as rigorous as possible. The obtained results, as stated above, work well.

What I hope to convey with the above paragraphs is that these formulas have been derived with usable, well-working results using as rigorous logic as possible based on relatively few and lenient assumptions. So for those who use these formulas, it's sufficient that they work well — adhering to pragmatism might be the more practical approach. Of course, you, reading this passage, may also think that this is just my excuse for lacking confidence in my own derivation process, hehehe~

Well then, I wish you a pleasant life~
