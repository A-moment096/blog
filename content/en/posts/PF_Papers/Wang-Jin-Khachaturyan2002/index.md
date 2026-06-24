---
categories:
# - Mathematics
# - Programming
- Phase Field
# - Others
tags:
- Paper Reading
- PF Model
- Microelasticity
title: Paper Reading - Wang-Jin-Khachaturyan2002
description: Phase field microelasticity theory and modeling of elastically and structurally inhomogeneous solid
date: 2025-11-15T23:25:19+08:00
image: /images/Nev_Alice-2.jpg
math: true
hidden: false
comments: true
---

*This article can be considered a summary of the work of the three of them, published in J. Appl. Phys. I actually read this paper quite a while ago, but I read it hastily at the time and only half-understood it. This time, I'll take a careful look.*

*The image is still an AI illustration drawn by [**Neve_AI**](https://x.com/Neve_AI), the little silver-haired sister with a tilted head is so cute~~*

$$
\gdef\misfit#1{\varepsilon_{#1}^0(\mathbf{r})}
\gdef\eigen#1{\varepsilon_{#1}^*0*(\mathbf{r})}
\gdef\avee#1{\overline{\varepsilon}_{#1}}
\gdef\dd{\mathrm{d}}
\gdef\Cr#1{C_{#1}(\mathbf{r})}
$$

## Background Introduction

It's actually quite similar to the previous article -- both introduce the difficulty of solving heterogeneous deformation problems in elasticity, and how using the phase field method with KS theory can cleverly solve this problem, enabling numerical solutions to such problems. However, this article provides a more detailed exposition of the theory and gives a solution approach using the Fourier spectral method.

## Equilibrium Equations for Elastically Heterogeneous Systems Under Equivalent Stress and Strain

Consider a homogeneous anisotropic elastic system. It has the same shape and size as a heterogeneous elastic system, but internally contains heterogeneous, stress-free mismatch strain (the so-called **eigenstrain**). The eigenstrain is macroscopically heterogeneous but mesoscopically homogeneous. We use $\varepsilon_{ij}^0(\mathbf{r})$ to denote this strain. The KS theory can provide the elastic strain and elastic energy expressed in terms of the eigenstrain.

### Strain Energy Functional Corresponding to an Arbitrary Stress-Free Strain Distribution in an Elastically Homogeneous System

Since the eigenstrain is macroscopically homogeneous, we can express it using the average strain:

$$
\overline\varepsilon_{ij} = \frac{1}{V}\int_V \varepsilon_{ij}(\mathbf{r})\ \dd^3 {r},
$$

The elastic energy is obtained from the KS theory:

$$
\begin{align*}
  E^{\mathrm{el}} = &\frac{1}{2}\int_V C_{ijkl}^0 \misfit{ij}\misfit{kl}\dd^3 r \\ &- \avee{ij}\int_V C_{ijkl}^0 \misfit{kl}\dd^3 r + \frac{V}{2}C_{ijkl}^0 \avee{ij}\avee{kl} \\ &- \frac{1}{2}\tilde{\int}\frac{\dd^3 k}{(2\pi)^3}n_i \tilde{\sigma}_{ij}^0(\mathbf{k})\Omega_{jk}(\mathbf{n})\tilde{\sigma}_{kl}^0(\mathbf{k})^* n_l,
\end{align*}
$$

As before, $\tilde{\int}$ here represents integration in reciprocal space after removing the reciprocal space volume of $(2\pi)^3/V$ at $\mathbf{k} = \mathbf{0}$, while $\mathbf{n} = \mathbf{k}/k$ is still the direction of the point in reciprocal space. And $\Omega_{ij}(\mathbf{n})$ is the Green's function tensor, the inverse tensor of $\Omega^{-1}_{ij}(C^0_{ijkl}n_kn_l)$. Here $C_{ijkl}^0$ is the elastic modulus, which can connect the elastic stress and strain in reciprocal space via it, i.e., $\tilde{\sigma}_{ij}^{o}(\mathbf{k}) = C_{ijkl}\,\tilde{\varepsilon}_{kl}^{o}(\mathbf{k})$. The asterisk on the reciprocal space stress in the formula denotes the complex conjugate. This form of the free energy is applicable to boundary conditions under strain control.

Under KS theory, the equivalent strain can be expressed in terms of the eigenstrain as:

$$
\begin{align*}
\varepsilon_{ij}(\mathbf{r}) &= \overline{\varepsilon}_{ij} + \frac{1}{2}\tilde\int\frac{d^3k}{(2\pi)^3}\,[\,n_i\Omega_{jk}(\mathbf{n})+n_j\Omega_{ik}(\mathbf{n})\,]\,
\tilde{\sigma}^0_{kl}(\mathbf{k})\,n_l\,e^{i\mathbf{k}\cdot\mathbf{r}}.
\end{align*}
$$

The energy functional and strain above are both applicable to macroscopically homogeneous systems, and macroscale systems are generally significantly larger than the mesoscopic scale characterized by the mismatch strain $\misfit{ij}$.

### Elastic Equilibrium Equations in Heterogeneous Systems

Next, consider an anisotropic elastically heterogeneous system. Its elastic modulus, due to elastic heterogeneity, is expressed as $\Cr{ijkl}$. The structural heterogeneity is represented through the eigenstrain: $\eigen{ij}$. The modulus of the system can be divided into the elastic modulus part and the change in modulus due to heterogeneity, i.e.:

$$
\begin{align*}
C_{ijkl}(\mathbf{r}) &= C^{0}_{ijkl} - \Delta C_{ijkl}(\mathbf{r}),
\end{align*}
$$

We consider the system to be constrained, with its macroscopic deformation fixed at a value of $\avee{ij}$. Such constraint creates a strain field $\varepsilon_{ij}(\mathbf{r})$. Because both elasticity and structure are heterogeneous, this strain field is also heterogeneous. At this point, strain and stress can still be related through Hooke's law:

$$
\begin{align*}
\sigma_{ij}(\mathbf{r}) &= C_{ijkl}(\mathbf{r})\big[\varepsilon_{kl}(\mathbf{r}) - \varepsilon_{kl}^*(\mathbf{r})\big],
\end{align*}
$$

And when the system is static, it satisfies the static equilibrium condition:

$$
\begin{align*}
\frac{\partial \sigma_{ij}(\mathbf{r})}{\partial r_j} &= 0
\end{align*}
$$

Then, combining and organizing the above content yields:

$$
\begin{align*}
& C^{0}_{ijk\ell}\,\frac{\partial \varepsilon_{kl}(\mathbf{r})}{\partial r_{j}}
\;=\;
\frac{\partial}{\partial r_{j}}\big\{\,C^{0}_{ijkl}\,\varepsilon^{*}_{kl}(\mathbf{r})
+\Delta C_{ijkl}(\mathbf{r})\,[\,\varepsilon_{kl}(\mathbf{r})-\varepsilon^{*}_{kl}(\mathbf{r})\,]\,\big\}.
\end{align*}
$$

For strain, we can play the same trick and split it into a homogeneous part $\overline{\varepsilon}_{ij}(\mathbf{r})$ and a heterogeneous part $e_{ij}(\mathbf{r})$:

$$
\begin{align*}
\varepsilon_{ij}(\mathbf{r}) &= \bar{\varepsilon}_{ij} + e_{ij}(\mathbf{r}),
\end{align*}
$$

And the heterogeneous part can be obtained through the displacement vector $\mathbf{v(r)}$:

$$
\begin{align*}
e_{ij}(\mathbf{r}) &= \tfrac{1}{2}\left[\frac{\partial v_i(\mathbf{r})}{\partial r_j} + \frac{\partial v_j(\mathbf{r})}{\partial r_i}\right]
\end{align*}
$$

Since the system is macroscopically constrained, on the surface region $\mathbf{v}(\mathbf{r}^S) = 0$. This is reasonable at the mesoscopic scale: the mesoscopic size can be considered to be much smaller than the macroscopic size of the entire theoretically considered domain. For a macroscopically homogeneous, constrained system, its total displacement at the boundary is $\overline{\varepsilon}_{ij}r^S_j$.

Bringing the two above formulas for total strain into the rewritten mechanical equilibrium expression above yields:

$$
\begin{align*}
C^{0}_{ijkl}\,\frac{\partial^{2} v_{k}(\mathbf r)}{\partial r_{j}\partial r_{l}}
&= \frac{\partial}{\partial r_{j}}\big\{C^{0}_{ijkl}\,\varepsilon^{*}_{kl}(\mathbf r)\big\}
+\Delta C_{ijkl}(\mathbf r)\big[\varepsilon_{kl}(\mathbf r)-\varepsilon^{*}_{kl}(\mathbf r)\big].
\end{align*}
$$

To simplify the model, we consider that the system surface is coated with an infinitely thin layer of material whose modulus is the elastic modulus $C_{ijkl}^0$. This treatment can simplify the problem: the modulus, normal vector, etc. of the material at the original boundary need not be described separately, and can be described together with the interior of the material body. We further assume that there is no structural heterogeneity on the material surface, so $\varepsilon^{*}_{ij}\big(\mathbf{r}^s\big)=0$, i.e., there is no eigenstrain on the surface. In this way, we can find a way to solve for the displacement field $\mathbf{v}(\mathbf{r}^S)$. Specifically, we will Fourier transform the above formula, then incorporate the conditions of no displacement, no eigenstrain, and no change in the elastic modulus field at the boundary, obtaining the integral form of the displacement field:

$$
\begin{align*}
v_i(\mathbf{r}) = &\tilde\int \frac{d^3k}{(2\pi)^3}\Bigg\{ -i\frac{1}{k}\,\Omega_{ij}(\mathbf{n})\Big[ C^0_{jklm}\,\varepsilon^*_{lm}(\mathbf{r}) \\
&+ \Delta C_{jklm}(\mathbf{r})\big(\varepsilon_{lm}(\mathbf{r})-\varepsilon^*_{lm}(\mathbf{r})\big)\Big]_\mathbf{k}\,n_k \Bigg\}\mathrm{e}^{i\mathbf{k}\cdot\mathbf{r}},
\end{align*}
$$

where the brackets with the subscript $\mathbf{k}$ indicate that the content inside the brackets has been Fourier transformed. Then, integrating this result one more time yields the strain field:

$$
\begin{align*}
\varepsilon_{ij}(\mathbf r) &= \bar{\varepsilon}_{ij} + \frac{1}{2}\tilde\int\frac{d^{3}k}{(2\pi)^{3}}\,[n_{i}\Omega_{jk}(\mathbf n)+n_{j}\Omega_{ik}(\mathbf n)]\\
&\quad\times\{C^{0}_{klmn}\,\varepsilon^{*}_{mn}(\mathbf r)+\Delta C_{klmn}(\mathbf r)[\varepsilon_{mn}(\mathbf r)-\varepsilon^{*}_{mn}(\mathbf r)]\}_\mathbf{k}n_l\,e^{i\mathbf{k}\cdot\mathbf{r}}.
\end{align*}
$$

The strain field integral formula above is an equilibrium formula. We can see that both the left and right sides contain the strain $\varepsilon(\mathbf{r})$. This is the result expressed using the elastic and structural heterogeneities through $\Delta C_{ijkl}(\mathbf{r})$ and $\varepsilon^*(\mathbf{r})$. The result of this formula looks very similar to the result from the KS theory we obtained earlier, as long as we extract the result of this Fourier transform alone and express it using a special strain:

$$
\begin{align*}
C_{ijkl}^{0}\,\varepsilon_{kl}^{0}(\mathbf{r}) &= C_{ijkl}^{0}\,\varepsilon_{kl}^{*}(\mathbf{r}) + \Delta C_{ijkl}(\mathbf{r})\big[\varepsilon_{kl}(\mathbf{r}) - \varepsilon_{kl}^{*}(\mathbf{r})\big].
\end{align*}
$$

Then the strain field formula above becomes:

$$
\begin{align*}
\varepsilon_{ij}(\mathbf{r}) &= \bar{\varepsilon}_{ij}+\tfrac{1}{2}\int\frac{\mathrm{d}^3\mathbf{k}}{(2\pi)^3}
\big[ n_i\Omega_{jk}(\mathbf{n})+n_j\Omega_{ik}(\mathbf{n})\big] \\
&\quad\times C^0_{klmn}\,\tilde{\varepsilon}^0_{mn}(\mathbf{k})\,n_l\,e^{i\mathbf{k}\cdot\mathbf{r}}\,.
\end{align*}
$$

This formula differs from the earlier KS theory result only in $C^0_{klmn}\tilde\varepsilon^0_{mn}(\mathbf{k})$, whereas the previous part was $\tilde\sigma_{kl}^0(\mathbf{k})$. And the variable $\varepsilon_{kl}^{0}(\mathbf{r})$ used here is actually the mismatch strain. This point illustrates that, after choosing an appropriate mismatch strain $\varepsilon_{ij}^0(\mathbf{r})$, the stress and strain of the elastic-structurally heterogeneous system equal the stress and strain of the elastically homogeneous system. In fact, from the earlier substitution equation we can obtain:

$$
\begin{align*}
C^0_{ijkl}\big[\varepsilon_{kl}(\mathbf{r})-\varepsilon^0_{kl}(\mathbf{r})\big]
&= \big[C^0_{ijkl}-\Delta C_{ijkl}(\mathbf{r})\big]\big[\varepsilon_{kl}(\mathbf{r})-\varepsilon^*_{kl}(\mathbf{r})\big].
\end{align*}
$$

Note that the left-hand side of the above equation is the elastic constant of the elastically homogeneous part multiplied by the difference between the total strain and the mismatch strain, representing the stress of the elastically homogeneous part; the right-hand side is the stress of the original elastic-structurally heterogeneous part. These two are equal. This demonstrates why the stress parts above are equal.

And we can also make some further transformations to the above equation. For example, using the relationship between eigenstrain, mismatch strain, and total strain, we can turn the above equation into an equilibrium formula expressing the mismatch strain:

$$
\begin{align*}
&\Delta S_{ijkl}(\mathbf r)\,C^0_{klmn}\big[\varepsilon^0_{mn}(\mathbf r)-\varepsilon^*_{mn}(\mathbf r)\big]+\varepsilon^*_{ij}(\mathbf r)\\
&\quad= \bar\varepsilon_{ij}+\frac{1}{2}\int\frac{d^3k}{(2\pi)^3}\big[n_i\Omega_{jk}(\mathbf n)+n_j\Omega_{ik}(\mathbf n)\big]\\
&\qquad\times C^0_{klmn}\,\tilde\varepsilon^0_{mn}(\mathbf k)\,n_l\,e^{i\mathbf k\cdot\mathbf r}\,,
\end{align*}
$$

In this way, we can (?) obtain the mismatch strain by iterating the equilibrium formula in this equivalent elastically homogeneous problem, and then from it determine the strain field and stress field. The strain can be obtained using that integral expression, and the stress can be directly obtained from the strain.

## Variational Method and Its Application to Solving Elastic Equilibrium in Arbitrary Heterogeneous Systems

With the preceding theory, we can consider how to solve the equilibrium equations. First, we still construct the energy functional:

### Strain Energy Functional of Elastic-Structurally Heterogeneous Systems

The strain energy of an elastic-structurally heterogeneous system, according to the preceding theory, can be expressed as the energy of an equivalent elastically homogeneous system. The energy of an elastically homogeneous system can be expressed as:

$$
\begin{align*}
E^{\mathrm{hom}} &= \tfrac{1}{2}\int_V C^{0}_{ijkl}\big[\varepsilon_{ij}(\mathbf r)-\varepsilon_{ij}^0(\mathbf r)\big]\big[\varepsilon_{kl}(\mathbf r)-\varepsilon_{kl}^0(\mathbf r)\big]\,\mathrm{d}^3r
\end{align*}
$$

And the elastic energy of the original elastic-structurally heterogeneous system should be expressed as:

$$
\begin{align*}
E^{\mathrm{inhom}} &= \tfrac{1}{2}\int_{V}\big[C^{0}_{ijkl}-\Delta C_{ijkl}(\mathbf r)\big]\big[\varepsilon_{ij}(\mathbf r)-\varepsilon^{*}_{ij}(\mathbf r)\big]\\
&\qquad\qquad\times\big[\varepsilon_{kl}(\mathbf r)-\varepsilon^{*}_{kl}(\mathbf r)\big]\,\mathrm{d}^{3}r.
\end{align*}
$$

Then the difference between the two can be expressed using the earlier relationship among mismatch strain, eigenstrain, and total strain as:

$$
\begin{align*}
\Delta E &= E^{\text{inhom}}-E^{\text{hom}} \\[6pt]
&= \tfrac{1}{2}\int_{V}\Big[\,C^{0}_{ijmn}\,\Delta S_{mnpq}(\mathbf r)\,C^{0}_{pqkl}-C^{0}_{ijkl}\Big] \\
&\quad\times\big[\varepsilon^{0}_{ij}(\mathbf r)-\varepsilon^{*}_{ij}(\mathbf r)\big]\big[\varepsilon^{0}_{kl}(\mathbf r)-\varepsilon^{*}_{kl}(\mathbf r)\big]\,\mathrm{d}^{3}r.
\end{align*}
$$

(This expression is not very easy to derive. One can try first replacing the "stress" part in front of the homogeneous energy with the heterogeneous representation, and then expressing $\varepsilon (\mathbf{r})$ in the form of $\varepsilon^0 (\mathbf{r}) - \varepsilon^* (\mathbf{r})$.)

Finally, finally, substituting the elastic energy given by the KS theory into the homogeneous energy here yields:

$$
\begin{align*}
E^{\mathrm{inhom}} &= \frac{1}{2}\int_{V}\big[C^0_{ijmn}\,\Delta S_{mnpq}(\mathbf r)\,C^0_{pqkl}-C^0_{ijkl}\big]\\
&\quad\times[\varepsilon^0_{ij}(\mathbf r)-\varepsilon^*_{ij}(\mathbf r)]\,[\varepsilon^0_{kl}(\mathbf r)-\varepsilon^*_{kl}(\mathbf r)]\,\mathrm{d}^3r\\
&\quad +\frac{1}{2}\int_{V}C^0_{ijkl}\,\varepsilon^0_{ij}(\mathbf r)\,\varepsilon^0_{kl}(\mathbf r)\,\mathrm{d}^3r\\
&\quad -\bar{\varepsilon}_{ij}\int_{V}C^0_{ijkl}\,\varepsilon^0_{kl}(\mathbf r)\,\mathrm{d}^3r+\frac{V}{2}\,C^0_{ijkl}\,\bar{\varepsilon}_{ij}\bar{\varepsilon}_{kl}\\
&\quad -\frac{1}{2}\tilde\int\frac{\mathrm{d}^3k}{(2\pi)^3}\,n_i\,\tilde{\sigma}^0_{ij}(\mathbf k)\,\Omega_{jk}(\mathbf n)\,\tilde{\sigma}^0_{kl}(\mathbf k)^*\,n_l\ .
\end{align*}
$$

Sigh, a terrifying and ugly expression... So many integrals, so many tensor contractions -- can this really be computed? Never mind...

### Variational Solution of the Stress-Free Strain Equilibrium Equation

According to classical variational calculus, when the energy is at a minimum, we have:

$$
\begin{align*}
\frac{\delta E^{\mathrm{inhom}}}{\delta \varepsilon^0_{ij}(\mathbf{r})} &= 0.
\end{align*}
$$

The result of this equation will yield the equilibrium equation for the mismatch strain given above. What should be noted here is that the result of this variational equation will produce the equilibrium stress and equilibrium strain of the elastic-structurally heterogeneous system. The reason is also very simple: the strain value that satisfies this equation is precisely the mismatch strain we are looking for, and with this mismatch strain, we can reconstruct the equilibrium stress and equilibrium strain of the system. Here, we make the mismatch strain a relaxational variable using the relaxation method. Due to its nature, we can use the time-dependent Ginzburg-Landau equation, i.e., the Allen-Cahn equation, to solve this:

$$
\begin{align*}
\frac{\partial \varepsilon_{ij}^0(\mathbf{r},t)}{\partial t} &= -L_{ijkl}\,\frac{\delta E^{\mathrm{inhom}}}{\delta \varepsilon_{kl}^0(\mathbf{r},t)}\,,
\end{align*}
$$

However, it should be noted that the "time" here is relaxation time, because what we need is a mechanical equilibrium solution. Here, $L_{ijkl}$ is the kinetic coefficient. Since it is positive definite and only controls the convergence rate, we don't need to worry too much about its specific value -- as long as it works, it's fine. The simplest form is:

$$ L_{ijkl} = L \delta_{ik} \delta_{jl}. $$

Substituting the energy of the heterogeneous system here yields:

$$
\begin{align*}
\frac{\partial \varepsilon^0_{ij}(\mathbf r,t)}{\partial t} &= L C^0_{ijkl}\Big\{\frac{1}{2}\tilde\int\frac{\mathrm{d}^3k}{(2\pi)^3}\big[n_k\Omega_{lm}(\mathbf n)\\
&\qquad+n_l\Omega_{km}(\mathbf n)\big]\widetilde\sigma^0_{mn}(\mathbf k)\,n_n e^{i\mathbf k\cdot\mathbf r}\\
&\qquad -\Delta S_{klmn}(\mathbf r)\,C^0_{mnpq}\big[\varepsilon^0_{pq}(\mathbf r)-\varepsilon^*_{pq}(\mathbf r)\big]-\varepsilon^*_{kl}(\mathbf r)\\
&\qquad +\varepsilon^0_{kl}+S^0_{klmn}\sigma^{ex}_{mn}\Big\}\,,
\end{align*}
$$

Here $\bar{\varepsilon}_{jk}^0 = (1/V)\int_V\varepsilon_{ij}^0(\mathbf{r})\mathrm{d}^3 r$, and $S_{ijkl}^0$ is the inverse tensor of the elastic modulus: $C^0_{ijkl}{}^{-1}$. This formula can use strain as the boundary condition, or use external stress as the boundary condition. The external stress can be expressed as:

$$
\sigma^{\mathrm{ex}}_{ij} = C_{ijkl}^0 (\bar\varepsilon_{kl} - \bar\varepsilon^0_{kl})
$$

To handle structural heterogeneity, one can set the elastic modulus of the heterogeneous parts. For example, for void locations, one can set their elastic modulus to $0$, i.e., $\Delta C_{ijkl} = C^0_{ijkl}$. In this way, we can transform a structurally heterogeneous system into an elastically heterogeneous system for processing.

## Solving Elastic Equilibrium of Elastically Heterogeneous Systems Using the Phase Field Method

The latter part mainly uses the phase field method to solve some cases. From the results, it can be seen that the results of this model are quite good -- several results solved in elastic-structurally heterogeneous systems are quite consistent with reality. We won't go deeper here ().

## Summary

This article was also delayed for a while, for many reasons... One of them is that I looked into the "KS theory" and "eigenstrain" content in this series of articles. In conclusion, there were more or less some conclusions, and I learned some very interesting things. ~~I'll write about them here~~ (I originally wanted to write about them here, but it turned out to be way too long, so I guess forget it now ()).

It still contains many frightening equations and frightening energy constructions. It feels like the approach is cut from the same cloth as their 2001 article, except this article has more and more detailed theoretical derivations, giving one the illusion of "I understand it"... But I have a premonition that I will soon be able to thoroughly understand this part -- I just need a little more notation, a little more derivation, and a little fewer brain cells...

The main takeaways from this article are:

- Derived the method of constructing the energy functional for structural-elastically heterogeneous systems
- Thanks to the three authors, obtained the phase field evolution equation needed for solving the eigenstrain
- I am gradually understanding everything (referring to the derivation of this part)
- Once again experienced the power of the big shots ()

Points that can still be further explored:

- KS theory -- must face it head-on. Without understanding this core theory, all this content feels like castles in the air.
- Write this mechanical solver myself -- how would I know if it works without writing it myself? (Though it's obviously going to be difficult.)
- Still, learn how to manipulate formulas like the big shots do.

The paper reading segment may temporarily end here, because the next installment will probably be reading notes (Toshio Mura's *Micromechanics of Defects in Solids*). I might perhaps be able to dig out the true form of the so-called KS theory from it (or perhaps I'll need to pair it with a few more articles). Then I might consider using dear Python to implement this algorithm.
