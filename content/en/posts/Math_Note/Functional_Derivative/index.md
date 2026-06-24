---
categories:
- Mathematics
tags:
- Calculus of Variations
- Note
title: "On Functional Derivatives and Variational Calculus — Questions from Phase-Field Formula Derivation"
description: How to derive phase-field evolution equations correctly, or at least not far off
image: /images/HelloWorld-r-906.jpg
date: 2025-01-04
math: true
draft: false
---

*This article is a work of patchwork learning, written solely to resolve some marginal mathematical issues encountered in formula derivation. I apologize for any errors or omissions. Additionally, I thank Mr. Lao Dazhong for his book "Fundamentals of the Calculus of Variations," 3rd edition. Almost all of the main content of this article references this book.*

*The featured image is by [雨野](https://x.com/amn_amn_/status/1580863274081349632), a song illustration for [Hello World!](https://www.bilibili.com/video/BV1Ee4y1E7J6/) by [r-906](https://twitter.com/arukuremu)*

{{< music auto="https://music.163.com/#/song?id=2076684514" loop="none">}}


2025.06.06 Update: Thanks to [@which-is-my-way](https://github.com/which-is-my-way) for the correction — formula [16](#modify) now has the dot product with the unit normal vector added.


## The Problem from the Crystal Phase-Field Formula

On a sunny evening, my senior labmate came to me with a question: How is the following phase-field formula assembled? Specifically: from formula (2) and formula (3) below, how do we obtain formula (4)?
$$
\begin{align}
F &= \int_V f \mathrm{d}v\\ &= \int_V \left(\frac{\psi}{2} \omega \left(\nabla ^2\right)\psi + \frac{\psi^4}{4}\right) \mathrm{d}v;\\
\frac{\partial \psi}{\partial t} &= \nabla^2 \frac{\delta F}{\delta \psi} + \xi;\\
\frac{\partial \psi}{\partial t} &= \nabla^2 \left( \omega\left( \nabla^2 \right) \psi + \psi^3 \right)+ \xi.
\end{align}
$$
Let me give some brief background here. This formula comes from [this paper](https://doi.org/10.1103/PhysRevE.70.051605), which proposed the crystal phase-field theory. Its importance is self-evident — nearly all papers in this field cite these formulas when using the results of this article. I won't go into too much detail about crystal phase-field theory here (since I don't really understand it either; although it also has the word "phase-field," only the most basic assumptions are similar). Let me briefly introduce these formulas (by name) for later reference. Formula (1) means that the total energy of the system can be expressed as the integral of the energy density over the volume (I won't specify the parameters of energy and energy density yet) — note here that the total energy is actually a functional; (2) is the specific construction of the energy density, (3) is an evolution equation similar to the traditional phase-field form, which in traditional phase-field theory is the Cahn-Hilliard equation. And (4) is the result obtained by expanding the variation in (3), or rather, the explicit expression of the formula used in actual calculations.

One thing I must mention is that the formulas listed here are not complete — for example, I haven't explained what $\omega$ is — this is to retrace my thought process (even if it's notes, I don't want it to be too rigid; after all, it came from a real problem). Of course, I will later restate the full problem and the complete derivation process.

## The Traditional Phase-Field Formula — Is It Right?

When I received this formula, it was not directly from the paper, but rather from a few images (roughly formulas (2), (3), and (4)). My first reaction upon seeing the formula was: Isn't the notation a bit off? Putting $\psi$ outside the brackets? Isn't that wrong? So I began deriving it the way I had previously derived the traditional phase-field energy variation. Let's take a look at the traditional phase-field formula.
$$
\begin{align}
    F(c, \nabla c ) &= \int_{\Omega} f(c, \nabla c )\, \mathrm{d}\omega = \int_{\Omega} f_b(c, \eta) + \kappa_c \left| \nabla c \right|^2 \mathrm{d}\omega;\\
    \frac{\partial c_i}{\partial t} &= \nabla \cdot M_{ij} \nabla \frac{\delta F}{\delta c_j \left( r,t \right)},
\end{align}
$$
where formula (6) is the Cahn-Hilliard equation, and formula (5) is a common (most basic) form of the total energy construction in traditional phase-field theory, where $f$ is the energy density and $f_b$ is the bulk free energy density. We can see that the energy functional depends (?) on the concentration and the gradient of the concentration. To derive this formula, we directly use the three-dimensional Euler-Lagrange equation:
$$
\begin{align}
\frac{\delta F\left[ x,y,y' \right]}{\delta x} = \frac{\partial f}{\partial x} - \nabla \cdot \frac{\partial f}{\partial \nabla x}.
\end{align}
$$
Thus, this formula can be expanded — we just need to plug in the specific expression of the energy functional, compute partial derivatives, and the result comes out quickly.

Honestly, this is wonderful. We just need to use a lot of ready-made (?) content and do some very simple (?) derivations to obtain (?) the specific expression of the final evolution equation of the system. So let's stop thinking and start doing — directly apply this approach to the original problem above. Great, let's first take the partial derivative with respect to $\psi$, obtaining (?) the following:
$$
\frac{\partial f}{\partial \psi}  = \frac{1}{2}\omega\left( \nabla^2 \right)\psi + \psi^3,
$$
Then we need to take the partial derivative with respect to $\nabla \psi$. Hmm, $\nabla \psi$ ... but here it's $\nabla^2$? And why wrap the Laplacian operator inside parentheses with $\omega$? Huh?

Is this right? It's not right, is it?

## Re-examining the Problem — What is $\omega$?

The problem clearly isn't as simple as I thought. We need to start from scratch and build a reasonable description of this problem step by step, and find the real solution. The first thing to address is this strange notation $\omega(\nabla^2)$. If this notation is correct, then $\omega$ is not some parameter or something like that; it should be a function of an operator or something of that sort.

Finding the original paper and checking the definition, we see the true face of $\omega$:
$$
\begin{align}
\omega (\nabla^2) = r + \left(1 + \nabla ^2\right)^2,
\end{align}
$$
where $r$ is a complicated constant — don't worry about it. Indeed. $\omega$ should be interpreted as a new operator obtained by applying a transformation to the $\nabla^2$ operator. In other words, it is a mapping that maps operators to operators. Great, let's plug this result into $f$ in formula (1):
$$
\begin{align*}
f &=  \frac{\psi}{2} \omega \left(\nabla ^2\right)\psi + \frac{\psi^4}{4}\\
&=  \frac{\psi}{2} \left(r + \left(1 + \nabla ^2\right)^2 \right)\psi + \frac{\psi^4}{4}.
\end{align*}
$$
Wait, how should we interpret the square of an operator? How should we interpret a constant acting on a variable? According to the rules of operator algebra: the square of an operator should be interpreted as the operator acting on the operand twice, and the action of a constant should be interpreted as scalar multiplication. Then we obtain:
$$
\begin{align*}
f &=  \frac{\psi}{2} \left(r\psi + \left(1 + \nabla ^2\right)^2\psi \right) + \frac{\psi^4}{4}\\
&= r\frac{\psi^2}{2} + \frac{\psi^2}{2} + \psi \nabla^2\psi + \frac{1}{2}\psi\nabla^2\nabla^2\psi + \frac{\psi^4}{4}.
\end{align*}
$$
Ah, this looks dizzying. Why does the Laplacian also have a square? Let's change notation: $\Delta = \nabla^2$, giving us:
$$
\begin{align}
f &= r\frac{\psi^2}{2} + \frac{\psi^2}{2} + \psi \Delta\psi + \frac{1}{2}\psi\Delta\Delta\psi + \frac{\psi^4}{4}.
\end{align}
$$
Alright, now we've figured out what $\omega$ really is and how it affects the formula. Now our partial derivative with respect to $\psi$ should be fine, right?

Hold on, what is $\Delta\Delta\psi$? Do we need to worry about it when taking the partial derivative with respect to $\psi$? Even if we ignore that, there's no familiar $\nabla\psi$ in this formula. So the partial derivative of our energy density with respect to $\nabla\psi$ equals 0? Isn't that wrong? And for that matter, what variables does our total energy functional actually depend on? Wait a moment — dependence? For a functional, we only need to find the single function that best meets the requirements, right? That function can of course obtain its own partial derivatives through differentiation with respect to coordinates, so the partial derivatives shouldn't be independent variables. Then why do we take partial derivatives with respect to them?

I'm done for. I thought I knew everything, but now I know nothing. The calculus of variations, the Euler-Lagrange equation — aren't these supposed to be ready-made? The Laplacian, that strange $\Delta\Delta\psi$ — these can't just be directly plugged into existing formulas, can they?

## Dead End? Let's Start from Scratch!

Actually, one can more or less imagine what form $\Delta\Delta\psi$ takes — it's just applying $\Delta$ twice. The key lies in this variable, and how $\Delta \psi$ participates in the construction of this functional, and how they should participate in the functional derivative. To figure this out, we perhaps must understand what "independent variables" this functional has, or rather, what variables it depends on, and understand the relationship between the variable function itself and its derivatives with respect to position.

There are many questions. We might as well start from scratch and break things down step by step, starting from the question of *what a functional is*.

### Functionals

The functionals we are discussing are actually a special class of mappings. This mapping has a domain and a codomain: its domain is the space of all functions defined on some space (for instance, the space of functions $\mathbb{R} \supseteq \Omega\to\mathbb{R}$, or the function space $\mathbb{R}^3 \supseteq \Omega\to\mathbb{R}$ — the domain of these functions is determined by the dimensionality of our problem), while the codomain of the functional is a number field — for energy, we simply choose $\mathbb{R}$. So this mapping, written formally, should be:

$$
F:\left\{ y \;\Big|\; y: \Omega \to \mathbb{R} \right\} \to \mathbb{R}.
$$

Another special feature of our functional is that it can often be written in the form of an integral:

$$
F = \int_\Omega f\, \mathrm{d}\omega.
$$

The variational problem we commonly encounter is: what function $\phi \in \left\{ y \;\Big|\; y: \Omega \to \mathbb{R} \right\}$ can, when substituted into the functional $F$, make this functional attain its minimum value[^1]. Our problem is even more special, because we require the function family $\left\{ y \;\Big|\; y: \Omega \to \mathbb{R} \right\}$ to satisfy this condition: on the boundary $\partial \Omega$ of the region, all functions in this family must be equal. In other words, our problem is a fixed-boundary problem.

Great, but how do the above statements help with our problem? Let's focus our attention on this $f$ in the integral form of the functional. It doesn't have a specific expression given there; it merely says to integrate it. What significance does it hold?

### The Integrand (Kernel of the Functional)

Let us point out here: this thing being integrated, $f$, is actually a requirement on the functional. In some literature, $f$ is also called the kernel of the functional. The specific expression of $f$ will constrain the resulting $y$ so that it satisfies the condition that the functional $F$ attains its minimum. So, how does one express a constraint on $y$? Or rather, what should we do to $y$ to make it a constraint on $y$?

To constrain $y$ using $f$, we consider using $f$ to describe the behavior of $y$. What result does $y$ produce under what circumstances — that's roughly the way to describe it. And when we describe the behavior of $y$, we often consider the behavior of its derivative, combining the results obtained when the derivative $y'$ and $y$ interact. Finally, considering that it is difficult to describe $y$ without involving the function's independent variable $x \in \Omega$, the resulting $f$ becomes something like this: it looks like a function of three variables — $x\in \Omega$, $y : \Omega \to \mathbb{R}$, and $y' : \Omega \to \mathbb{R}^n$ (where $n$ depends on the dimension of the domain of the function under consideration). When more higher-order derivatives participate in describing the behavior of $y$, this function $f$ depends on even more variables. In this function, we do not consider $y$ to be related to $y'$ or higher-order derivatives, because they all independently describe the behavior of the function $y$. It can be understood this way: the constraining effect of $y'$ on the function $y$ cannot be directly described by $y$ itself or $x$ itself alone, so its influence should be independent of $y$ and $x$. Thus, it makes sense to let $f$ take partial derivatives with respect to $y$, $y'$, etc. Furthermore, we only pay attention to quantities that actually constrain $y$; if $f$ does not contain $y'$, we say that $f$ does not explicitly contain $y'$ — this does not mean that $y'$ does not exist, but rather that it does not participate in constraining the behavior of $y$.

When the domain of the function we want to obtain rises from one dimension to the three dimensions we more commonly encounter, the variables that the function $y$ depends on become more complex — possibly including $\nabla y$, $\nabla \cdot y$, $\nabla \cdot \nabla y$, and so on. Similar to above, we still treat these as independently existing variables in $f$. With the above groundwork laid, we can at least clarify our problem a bit more: the energy form in the problem, with its variable dependence fully written out, should be the following form (here, following convention, we write the biharmonic operator $\Delta\Delta$ as $\Delta^2$, which can also be written as $\nabla^4$):

$$
\begin{align}
F\left[\psi\right] &= \int_V f \left(\psi,\Delta\psi,\Delta\Delta\psi\right) \mathrm{d}v\\ &= \int_V r\frac{\psi^2}{2} + \frac{\psi^2}{2} + \psi \Delta\psi + \frac{1}{2}\psi\Delta\Delta\psi + \frac{\psi^4}{4} \mathrm{d}v.
\end{align}
$$

### Re-examining the Euler-Lagrange Equation

However, everything above seems only to clarify some basic facts without providing substantial help in solving this problem. Don't be discouraged — at least we now know: the Euler-Lagrange equation above should only be applicable to $f(x,y,\nabla y)$, and for the new $f$, we need to figure out such an equation on our own. Therefore, we must delve into the fundamentals of the calculus of variations, to understand exactly how the calculus of variations derived the Euler-Lagrange equation we used above. To do this, let's take the functional form corresponding to the Euler-Lagrange equation that we initially thought we had obtained so effortlessly as an example, and derive its corresponding Euler-Lagrange equation ourselves.

Recall the general problem of the calculus of variations we face: under what function $y$ can the functional we construct attain its minimum. The domain of our function $y$ is fixed, so what we need to care about is what value this qualifying function should take at each point. Let's suppose that we already have an optimal function that satisfies the requirements — call this function $\varphi$. At this point, since this function is already the best, the function that best meets the requirements, any change to some value of this function will prevent our functional from attaining its minimum.

Let's try to write this conclusion in a more formal expression: suppose the function $\varphi : \Omega \to \mathbb{R}$ is the function needed for the functional $F$ to attain its minimum. Then any function $y \neq \varphi$ will produce this result: $F[y] - F[\varphi] = \delta F > 0$, where $\delta F$ is the *variation* of the functional $F$. Here, the inequality $> 0$ holds because we already know that $F[\varphi]$ is the minimum. Conversely, when $\delta F = 0$, it indicates that the function $y$ at that moment is exactly the function $\varphi$ we need.

Does this expression seem somewhat familiar? Let's proceed further.

We can see that if we expand this inequality using the integral form of the functional we are familiar with, and combine terms using the linearity of integration, the result is:

$$
\delta F = \int_\Omega f(x,y, \nabla y) - f(x,\varphi,\nabla\varphi) \mathrm{d} \,\omega = \int_\Omega \delta f\, \mathrm{d}\omega.
$$

The second equality above is where we denote the difference of the integrands as the total variation of the function in this way. In the integrand of this integral inequality, the variable $x$ hasn't changed, so let's simply view $f$ here as a function of two variables. We rewrite $\varphi$ as the form of $y$ plus a perturbation: $\varphi = y+\delta y$. Then we can mimic the total differential — treat the total variation $\delta f$ of the function here using total-differential-style manipulation, and write out its total variation expression based on the partial derivatives of its two variables. Substituting into the above equation gives:

$$
\delta F = \int_\Omega \delta f\, \mathrm{d}\omega = \int_\Omega \left(\frac{\partial f}{\partial y}\delta y + \frac{\partial f}{\partial \nabla y}\cdot\delta\nabla y \right) \, \mathrm{d}\omega.
$$

This form is already familiar to us, but there are still some differences. Let us point out here that the partial derivative of a function with respect to a vector also yields a vector, so we need to use the vector dot product here. We won't dwell on the technical details; we are more concerned with: how to rewrite $\delta \nabla y$ into another form to further advance toward our result. Notice that $\nabla$ is differentiation with respect to coordinates, while $\delta$ changes the value of the function while keeping the domain unchanged. Therefore, the two should be independent of each other, meaning that the two operators are commutative. Then using the product rule for the dot product: $\nabla \cdot (f{\bf{}v}) = f\nabla\cdot{\bf v}+{\bf v}\cdot\nabla f$, with all these manipulations we obtain:

$$
\begin{align}
 \delta F = \int_\Omega \delta f\, \mathrm{d}\omega &= \int_\Omega \left(\frac{\partial f}{\partial y}\delta y + \frac{\partial f}{\partial \nabla y}\cdot\nabla\delta y \right) \, \mathrm{d}\omega \\
&= \int_\Omega \left(\frac{\partial f}{\partial y}\delta y  - \nabla \cdot \frac{\partial f}{\partial \nabla y}\delta y \right) \, \mathrm{d}\omega + \int_\Omega \nabla\cdot\left(\frac{\partial f}{\partial \nabla y}\delta y\right) \, \mathrm{d}\omega\\
&= \int_\Omega \left(\frac{\partial f}{\partial y}  - \nabla \cdot \frac{\partial f}{\partial \nabla y} \right)\delta y \, \mathrm{d}\omega + \int_\Omega \nabla\cdot\left(\frac{\partial f}{\partial \nabla y}\delta y\right) \, \mathrm{d}\omega  .
\end{align}
$$

And in equation (13), the last integral can be converted, via the Green's theorem for multiple integrals, into an integral over the boundary $\partial \Omega$ of the region $\Omega$. At this point, since all functions must have equal values on the boundary, we have $\delta y = 0$, and thus the last integral term vanishes. We write it as the following result:

<span id="modify">

$$
\begin{align}
\delta F &= \int_\Omega \left(\frac{\partial f}{\partial y}  - \nabla \cdot \frac{\partial f}{\partial \nabla y} \right)\delta y \, \mathrm{d}\omega + \int_\Omega \nabla\cdot\left(\frac{\partial f}{\partial \nabla y}\delta y\right) \, \mathrm{d}\omega\\
&=\int_\Omega \left(\frac{\partial f}{\partial y}  - \nabla \cdot \frac{\partial f}{\partial \nabla y} \right)\delta y \, \mathrm{d}\omega + \int_{\partial\Omega} \left(\frac{\partial f}{\partial \nabla y}\delta y\right)\cdot\hat{n} \, \mathrm{d}A\\
&=\int_\Omega \left(\frac{\partial f}{\partial y}  - \nabla \cdot \frac{\partial f}{\partial \nabla y} \right)\delta y \, \mathrm{d}\omega.
\end{align}
$$

</span>
Thus, we are only one step away from the form we desire — the Euler-Lagrange equation. Note that the $\delta y$ used here is arbitrary; if $\delta F = 0$, then from the content inside the integral, the part inside the parentheses must equal 0.

We can see that the above process can be roughly divided into four parts: obtaining the total variation form, rewriting the non-target variations in terms of the target function variation using the commutativity of variation and differentiation, eliminating the excess terms, and by the arbitrariness of the variation obtaining that the interior of the integrand equals 0. We can therefore, based on the concept of the derivative of a function that we are already familiar with, define the key part inside the parentheses of the integrand in formula (18) as the functional derivative, i.e.:
$$
\frac{\delta F}{\delta y} = \frac{\partial f}{\partial y}  - \nabla \cdot \frac{\partial f}{\partial \nabla y},
$$
When it equals 0,
$$
\frac{\delta F}{\delta y} = \frac{\partial f}{\partial y}  - \nabla \cdot \frac{\partial f}{\partial \nabla y} = 0,
$$
the functional attains an extremum (in our context, a minimum). This is the so-called Euler-Lagrange equation.

### The Last Step

Now, we have offered some explanation of the concept of a functional and built up from scratch the Euler-Lagrange formula we previously used. Here I would like to add some supplementary remarks. Note that the functional derivative here is not literally "the quotient of some things and then taking a limit"; rather, a certain part that is useful to us is defined as the functional derivative. The best explanation of this concept is that when it equals 0, it represents the extremum of the functional — solving this equation yields the extremal function that makes the functional attain its extremum. It should not be interpreted as a rate of change or anything else.

Additionally, we used the analogy of the "total differential of a two-variable function" above. Honestly, I myself am not particularly comfortable with this way of saying it. Another plausible explanation is to transform the function $y$ into $y = \varphi + \varepsilon\eta$, meaning we use an arbitrary function $\eta : \Omega \to \mathbb{R}$ multiplied by an extremely small quantity $\varepsilon$. This is equivalent to forming a perturbation of the function using $\varepsilon\eta$, namely $\delta y$. We require $\eta$ to be an arbitrary function, and throughout any calculation, $\eta$ is kept unchanged. At this point, the entire expression becomes a single-variable function of $\varepsilon$ alone. For a single-variable function, its extremum point occurs at the position where the derivative equals 0. Then, taking the partial derivative with respect to $\varepsilon$ also yields conclusions similar to those above, and through simplification using Green's theorem, the final conclusion is obtained. Of course, this is merely another way of thinking, for reference only.

Finally, it is worth pointing out that the derivation process above is strongly tied to the specific expression of $f$, especially the variables it depends on. However, when we further examine its relationship with the variables, we can discover that each variable corresponds, in the final Euler-Lagrange formula, relatively independently. For example, the part $x$ does not appear in the formula; the part $y$ corresponds to taking the partial derivative with respect to $y$; and the part $\nabla y$ corresponds to taking the partial derivative with respect to $\nabla y$ and then taking the divergence of the result. This result is foreseeable: due to the nature of the total differential formula — or in the context of functionals, the total variation formula — such a result arises. Thus, we can also naturally anticipate that if the variables $f$ depends on are different variables, there should be analogous conclusions.

At this point, we have almost completely figured out the path to solving the problem we ultimately wanted to solve. We have obtained the specific expression of the functional, clarified the parameter list of the kernel of the functional (i.e., that integrand $f$), and grasped the concrete train of thought for performing the calculus of variations on the functional. Our next step, or the final step, is to actually plug things in and compute.

## Computation!

For the mental health of the reader, we hide the derivation of the Euler-Lagrange formula when $f$ depends on $f(p,\psi,\Delta \psi,\Delta\Delta \psi)$ (where $p \in V$ represents position) and directly present the result:

$$
\begin{equation}
\frac{\delta F}{\delta \psi} = \frac{\partial f}{\partial \psi} + \Delta \left(\frac{\partial f}{\partial \Delta \psi}\right)+ \Delta\Delta \left(\frac{\partial f}{\partial \Delta\Delta \psi}\right)
\end{equation}
$$

<details>
<summary>If you're willing to see the derivation process:</summary>

No, you actually don't want to. You're just curious whether I really wrote these derivations. The fact is: I did, and here they are below.

But if you really do want to read this part, thank you — my effort hasn't been in vain.

Let's first write out the result after varying the kernel function of the functional, according to the total variation:

$$
\begin{align*}
        \delta F & = \delta \int_V f(p,\psi,\Delta\psi,\Delta\Delta\psi) \,\mathrm{d}v                   \\
                 & = \delta \int_V f(p,\psi,\Delta\psi,\Delta\Delta\psi) \,\mathrm{d}v                   \\
                 & =  \int_V \delta f(p,\psi,\Delta\psi,\Delta\Delta\psi) \,\mathrm{d}v                  \\
                 & =\int_V \left(\frac{\partial f}{\partial \psi}\right)\delta \psi
        + \left(\frac{\partial f}{\partial \Delta\psi}\right)\delta \Delta\psi
        + \left(\frac{\partial f}{\partial \Delta\Delta\psi}\right)\delta \Delta\Delta\psi \,\mathrm{d}v. \\
\end{align*}
$$

Next, let's examine each term of the integrand separately. The first term, the variation $\delta\psi$ with respect to $\psi$, already meets our requirements. The second term, $\delta \Delta \psi$, and the third term, $\delta \Delta\Delta\psi$, need to be manipulated into the form of some function multiplied by $\delta\psi$, to facilitate the final logical treatment.

From the commutativity of variation and differentiation, we have:

$$
    \left(\frac{\partial f}{\partial \Delta\psi}\right)\delta \Delta\psi = \left(\frac{\partial f}{\partial \Delta\psi}\right)\Delta \delta \psi = f_1 \Delta\delta\psi;\\
    \left(\frac{\partial f}{\partial \Delta\Delta\psi}\right)\delta \Delta\Delta\psi = \left(\frac{\partial f}{\partial \Delta\Delta\psi}\right) \Delta\Delta\delta\psi = f_2\Delta\Delta\delta\psi,
$$

where the second equality sign in each line is a notation conversion for readability, denoting the partial derivatives inside the parentheses with shorthand symbols. Let's first look at the first expression above, which is the product of two scalar functions; its second factor expands as:

$$
\Delta \delta \psi = \nabla \cdot \nabla \delta\psi,
$$

Noting the divergence identity: $\nabla \cdot (f\mathbf{v}) = f\nabla\cdot\mathbf{v} + \nabla f \cdot \mathbf{v}$, where $f$ is a scalar function or scalar field and $\mathbf{v}$ is a vector-valued function or vector field, we can transform the above result to obtain:

$$
\begin{align*}
f_1\nabla \cdot \nabla \delta\psi &= \nabla\cdot(f_1\nabla\delta\psi) - \nabla f_1\cdot \nabla\delta\psi \\
&= \nabla\cdot(f_1\nabla\delta\psi) - \nabla\cdot(\delta\psi\nabla f_1) + \delta \psi \nabla\cdot\nabla f_1.
\end{align*}
$$

For the integral of the above expression over a three-dimensional region $\Omega$, by the divergence theorem, we have:

$$
\begin{align*}
\int_V f_1 \nabla\cdot\nabla\delta\psi \,\mathrm{d}v &= \int_V \nabla\cdot(f_1\nabla\delta\psi)\,\mathrm{d}v -\int_V \nabla\cdot(\delta\psi\nabla f_1) \,\mathrm{d}v+\int_V \delta \psi \nabla\cdot\nabla f_1 \,\mathrm{d}v \\
&=\int_{\partial V} f_1\nabla\delta\psi\cdot\hat{n}\,\mathrm{d}s - \int_{\partial V} \delta\psi\nabla f_1\cdot\hat{n} \,\mathrm{d}s + \int_{V} \delta \psi \nabla\cdot\nabla f_1 \,\mathrm{d}v\\
&=\int_{V} \delta \psi \nabla\cdot\nabla f_1 \,\mathrm{d}v.
\end{align*}
$$

The second equality above uses the divergence theorem, and the third equality considers that on the boundary, $\delta\psi = 0$ and $\nabla\delta\psi = \mathbf{0}$. Thus we have obtained the expression form of the second term of the integrand in the original variation. Now let's consider the third term, namely $f_2\Delta\Delta\delta\psi$. Let's first treat $\Delta\delta\psi$ as the scalar function $\varphi$; then the original expression becomes $f_2\Delta\varphi$. At this point, applying the result we have already obtained above, we have:

$$
\begin{align*}
 \int_V f_2 \Delta\Delta\delta\psi \,\mathrm{d}v &= \int_V f_2 \Delta\varphi \,\mathrm{d}v\\ 
 &= \int_{\partial V} f_2\nabla\varphi\cdot\hat{n}\,\mathrm{d}s -\int_{\partial V} \varphi\nabla f_2\cdot\hat{n} \,\mathrm{d}s+\int_V \varphi \nabla\cdot\nabla f_2 \,\mathrm{d}v \\
 &= \int_V \varphi \nabla\cdot\nabla f_2 \,\mathrm{d}v = \int_V \varphi \Delta f_2 \,\mathrm{d}v \\
 &= \int_V \Delta\delta\psi \Delta f_2 \,\mathrm{d}v = \int_V \nabla\cdot\nabla\delta\psi\, \Delta f_2 \,\mathrm{d}v\\
 &= \int_{\partial V} \Delta f_2\nabla\delta\psi \cdot\hat{n}\,\mathrm{d}s -\int_{\partial V} \delta\psi\,\nabla (\Delta f_2)\cdot\hat{n} \,\mathrm{d}s+\int_V \delta\psi \Delta \Delta f_2 \,\mathrm{d}v \\
 &= \int_V \delta\psi \Delta \Delta f_2 \,\mathrm{d}v,
\end{align*}
$$

where all the manipulations are the same as before: repeatedly breaking things apart using the identity, and since all terms containing $\delta\psi$ on the boundary vanish, all integrals over the boundary $\partial V$ of $V$ become 0, and we finally obtain the desired result. Now reassembling these integrals and restoring the shorthand notations, we have:

$$
\begin{align*}
\delta F & = \int_V \left(\frac{\partial f}{\partial \psi}\right)\delta \psi
        + \left(\frac{\partial f}{\partial \Delta\psi}\right)\delta \Delta\psi
        + \left(\frac{\partial f}{\partial \Delta\Delta\psi}\right)\delta \Delta\Delta\psi \,\mathrm{d}v \\
        &= \int_V \left(\frac{\partial f}{\partial \psi}\right)\delta \psi
        + \Delta\left(\frac{\partial f}{\partial \Delta\psi}\right)\delta \psi
        + \Delta\Delta\left(\frac{\partial f}{\partial \Delta\Delta\psi}\right)\delta \psi \,\mathrm{d}v \\
        &= \int_V \left(\left(\frac{\partial f}{\partial \psi}\right)
        + \Delta\left(\frac{\partial f}{\partial \Delta\psi}\right)
        + \Delta\Delta\left(\frac{\partial f}{\partial \Delta\Delta\psi}\right)\right)\delta \psi \,\mathrm{d}v. 
\end{align*}
$$

Then, by the definition of the functional derivative, we obtain the Euler-Lagrange equation:
$$
\frac{\delta F}{\delta \psi} = \frac{\partial f}{\partial \psi} + \Delta \left(\frac{\partial f}{\partial \Delta \psi}\right)+ \Delta\Delta \left(\frac{\partial f}{\partial \Delta\Delta \psi}\right).
$$

</details>

Now, let's plug things in. For convenience, let's first write the formulas to be substituted below:

$$
\begin{align}
F[\psi] &= \int_V f(p,\psi,\Delta\psi,\Delta\Delta\psi) \mathrm{d}v\\ 
&= \int_V \left(\frac{\psi}{2} \omega \left(\nabla ^2\right)\psi + \frac{\psi^4}{4}\right) \mathrm{d}v;\\
\omega (\nabla^2) &= r + \left(1 + \nabla ^2\right)^2;\\
\frac{\partial \psi}{\partial t} &= \nabla^2 \frac{\delta F}{\delta \psi} + \xi.\\
\end{align}
$$

Our goal is to first substitute formula (21) into formula (20) to obtain the specific expression of the energy, then plug the result into formula (18) to compute the energy variation, and finally obtain the explicit expression of formula (22). The first step is already complete; the specific expression of the energy density is:

$$
\begin{equation}
f = r\frac{\psi^2}{2} + \frac{\psi^2}{2} + \psi \Delta\psi + \frac{1}{2}\psi\Delta\Delta\psi + \frac{\psi^4}{4}.
\end{equation}
$$

Let's first compute the necessary partial derivatives of formula (23), obtaining:

$$
\begin{align}
    \frac{\partial f}{\partial \psi} &= r\psi + \psi + \Delta\psi + \frac{1}{2}\Delta\Delta\psi+\psi^3;\\
    \frac{\partial f}{\partial \Delta \psi} &= \psi;\\
    \frac{\partial f}{\partial \Delta\Delta \psi} &=\frac{1}{2}\psi.
\end{align}
$$

Now plug these obtained results, i.e., formulas (24-26), into the Euler-Lagrange equation (18) that we derived. Note to prepend the corresponding Laplace operator or biharmonic operator. The result is:

$$
\begin{align}
\frac{\delta F}{\delta \psi} &= r\psi + \psi + \Delta\psi + \frac{1}{2}\Delta\Delta\psi+\psi^3 + \Delta\psi+\frac{1}{2}\Delta\Delta\psi \\
&=r\psi + \psi + 2\Delta\psi + \Delta\Delta\psi+\psi^3\\
&=\left(r + \left(1 + 2\Delta + \Delta\Delta\right)\right)\psi+\psi^3\\
&=\omega(\Delta)\psi + \psi^3.\\
\end{align}
$$

Finally, substitute equation (30) back into equation (22). At this point, respecting the original text, we unify notation and rewrite $\Delta$ back as $\nabla^2$, yielding:

$$
\begin{equation}
\frac{\partial \psi}{\partial t} = \nabla^2 \left(\omega(\nabla^2)\psi + \psi^3\right) + \xi.
\end{equation}
$$

This is exactly our target from the very beginning, formula (4).

## Afterword

Actually, this problem was clear from the start: just find the correct Euler-Lagrange formula, plug things in, and compute mechanically. But how to find the correct Euler-Lagrange formula is the tricky part. The inspiration for this article came from Mr. Lao Dazhong's "Fundamentals of the Calculus of Variations." Flipping open the book, almost all of the ink is devoted to how to derive the corresponding Euler-Lagrange equation based on the form of the functional. Fortunately, the form of our equation is very simple, and the answer is almost ready-made — we just needed to find the right place and take it.

So what use was the earlier part of this article? Jumping around like a clown, and in the end discovering that something was off from the very beginning, then turning around and deriving the whole formula from scratch. If we had found that suitable formula from the start, wouldn't that have been fine? Perhaps finding that suitable formula could indeed solve the immediate problem before our eyes, but what about later? If we encounter a functional whose form is somewhat different again, how should we derive its corresponding Euler-Lagrange equation then? And as can be seen from the first half of the article: my understanding of the calculus of variations, before deriving this formula, was flawed. I mechanically thought it was just plugging into that well-known Euler-Lagrange equation and then computing, computing, computing. Then I immediately ran into the first problem: how to make the Laplacian differentiate with respect to a gradient. Yes, at the time I did not suspect that it was a formula problem; I was instead thinking about how to make this formula computable. After searching online for a while, I seemed to get a result, but I was ultimately not very satisfied, because after plugging it in, I still couldn't obtain the final formula.

After a period of confusion, I suddenly became puzzled about the dependence relationships among the variables. Results from searching online indicated that they cannot simply be viewed as interrelated variables, or as a simple differentiation relationship. In the end, I arrived at the explanation given in the text above. Perhaps my explanation in that part is wrong, but I used this method to convince myself. I hope this viewpoint is not problematic. Incidentally, my arriving at this explanation was more or less inspired by thermodynamics: in thermodynamics, partial derivatives must indicate which variables are held fixed, because thermodynamic parameters span a high-dimensional space, and the thermodynamic state of a system is a hypersurface on this space, with thermodynamic state functions being fields defined on this hypersurface. Therefore, when taking partial derivatives of thermodynamic state functions, one must fix the direction of differentiation, i.e., fix certain variables as constant. Perhaps it was this understanding that made me interpret the kernel of the functional as a constraint on the function (I don't know how I made that connection either, so it can only be called *inspiration*).

However, even so, I still couldn't obtain the ultimate crucial formula. At this point, I could only start from scratch and derive the Euler-Lagrange formula step by step. Fortunately, I found Mr. Lao Dazhong's book, and after reading part of it, I jumped around and found the answer I needed. I thank this book for saving me from who knows how many detours.

Finally, thank you for reading this far. Reading such a long rambling account must have been quite tiring. I hope this stream-of-consciousness-style article can also help you, the reader, deepen your understanding of the Euler-Lagrange equation, the calculus of variations, and functional derivatives.

So, have a pleasant day~

[^1]: Please allow me to conflate minimum value and minimal value here, as well as extremum and optimum, because we assume by default that this functional attains the minimal part, and that this minimal value must be global, i.e., the minimum value.
