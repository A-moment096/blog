---
categories:
- Phase Field
- Programming
- Mathematics
tags:
- C
- Fourier Spectrum
- Fourier Transformation
- FFT
- Numerical Analysis
title: "Phase Field Simulation, but in Many Languages -- Bonus Chapter"
description: Fourier Full Course!!
image: /images/Alice-2.png
imageObjectPosition: center 20%
date: 2026-05-30
math: true
---

*In the previous blog posts, we all used the finite difference method to discretize the grid and compute the results of the Cahn-Hilliard equation. This approach is indeed simple and effective, but the question is: aren't there better methods? Yes, my friend! Yes, there are! That would be the **Fourier Spectral Method** that I'm going to introduce to you today. Under this method, we no longer need to pitifully do grid differencing, but instead solve the problem from another mysterious space: **spectral space**. This post, in the form of a bonus chapter, will chat about this magical method -- its mathematical principles, usage considerations, and several details to note during implementation.*

*To maintain the consistency of the series, we once again chose the header image from last time: AI Alice drawn by [Neve_AI](https://x.com/Neve_AI). The song choice is the ending theme of last season's well-known anime **Fate Strange Fake**, **潜在的なアイ**, sung by **13.3g** -- a lively, bright, and very joyful song! Hope you enjoy it too~*

{{< music auto="https://music.163.com/#/song?id=3345663715" loop="none">}}

## Fourier Full Course!

I believe that when you see the three characters **Fourier** (**Joseph Fourier**, also translated as **傅立叶**, formerly **福里叶**), you might already have your battle face on... As the final part of standard advanced mathematics education and one of the proudest achievements of classical analysis, the name of this great French mathematician and physicist appears in many places. Concepts and techniques such as Fourier series and Fourier transforms have profoundly influenced various fields of science and technology today and are also excellent material for many popular science articles and videos. His heat conduction equation model has also solved many heat-transfer-related problems in engineering. Even though there are already many excellent introductions to concepts like Fourier series, we'll still briefly introduce the basic overview of the "Fourier Full Course" here. If you are interested in this topic, I've collected some good articles and videos that introduce these concepts at different levels and depths[^1][^2][^3].

To understand the Fourier full course, we have to start from another name you may be familiar with: **Taylor** (**Brook Taylor**, British mathematician).

### Starting from Series of Functions: Taylor Expansion and Taylor Series

Given an arbitrary function, do we have any good way to decompose it into a sum of products? If a complex function could be broken down into combinations of many simpler functions, that would greatly facilitate our study of the complex function, because its properties would be completely determined by the properties of these small simple functions. Can we do it? Of course! In fact, the first series of functions you probably encountered is the renowned *Taylor series*. By performing a *Taylor expansion* of a function at a certain point, we can obtain the derivatives of the function near that point and also obtain very good approximate results. The functions used for approximation near that point are polynomials, which have been studied quite thoroughly. You may have heard that Taylor expansion is the ultimate killer move of classical calculus -- this is almost beyond doubt, because when we need to study the behavior of a function near a certain point, Taylor expansion allows us to dissect the complex function and make corresponding simplifications when needed, omitting higher-order terms to represent the function at low cost.

However, everything above has one premise, which is that it is limited to *a certain point* of the function. This limitation is actually quite significant. When we shift our focus from studying a certain point in classical calculus to studying the behavior of a function over a relatively large interval, Taylor series are no longer so useful. Each expansion we must and can only choose one point to expand at, which prevents us from simultaneously expanding and studying at every point on the interval. From the example below, you may be able to feel the limitations of Taylor series expansion more clearly:

{{< react component="Impl_Spinodal_Fourier/taylor_expansion" >}}

As can be seen, the Taylor expansion of $\sin(x)$ rapidly widens the interval with good approximation as the expansion order increases; $\mathrm{e}^{x}$ has very good approximation on the positive half-axis, but approximation on the negative half-axis is more difficult; the approximation of $\ln(1+x)$ is simply catastrophic -- even expanding to order 10 at zero, the effect is still not great. Additionally, when we expand the function from a different position (here using $\ln(3+x)$ to simulate expanding $\ln(1+x)$ at $x=2$), we can see that its convergence interval is slightly better than expanding at $0$, but it quickly becomes limited by the natural domain of definition (undefined on the left for $x\leq 3$). Overall, the effect of Taylor expansion in function approximation over a determined range is quite unsatisfactory. So how do we solve this problem?

### Choosing the Right Functions: Trigonometric Functions

The problem actually lies in polynomials. When we select a certain point, we can quickly obtain a set of polynomials passing through that point without worrying about other points, and the continuity of polynomials ensures that the behavior near the passed point will not change drastically. To make every term of the expanded series contribute to the result over the entire interval of the function, we need to find a set of functions that are uniformly distributed over the entire interval, yet distinct from each other, to replace polynomials. Among them, the simplest set of functions is naturally the *trigonometric functions*. For example, the following set:

{{< react component="Impl_Spinodal_Fourier/trig_functions" >}}

As can be seen, trigonometric functions of different frequencies where $\omega$ is an integer multiple are almost perfectly uniformly distributed in the interval from $-\pi$ to $\pi$, and functions of different frequencies are distinct from each other, making it convenient for us to freely combine them into the needed function. But the problem is: how do we find the combination coefficients for a given function? In Taylor series, we only need to differentiate, because differentiation can *reduce the order of polynomials*, thereby obtaining the coefficients of each term in the polynomial. But this doesn't work for trigonometric functions...

### Function Inner Product and Fourier Series

The good news is that trigonometric functions have very special properties: if the frequencies $\omega$ of two sine or two cosine functions are different, then their product integrated over one period yields $0$; and only when their frequencies are the same does the integration result not equal $0$! We won't prove the specific reason. This characteristic naturally makes us think that we can use trigonometric functions of different frequencies to integrate with the function, and the result obtained can be used to back-solve for the coefficient at that frequency. In mathematics, when we extend the concept of *multiply and then integrate* to more general scenarios, we often use *inner product* to refer to it, and if the inner product of two functions yields $0$, we call them *orthogonal*. We define the inner product of functions as follows:

> [!DEF] Function Inner Product
>
> Given two functions $f$ and $g$ defined on the same set $S\in \R^n$ or $S\in \mathbb{C}^n$, define the *function inner product* as:
>
> $$\langle f,g \rangle =  \int_S f(\mathbf{x}) \bar{g}(\mathbf{x}) \,\mathrm{d}\mathbf{x},$$
>
> where $\bar{g}$ denotes the complex conjugate of the function $g$, i.e., the pointwise conjugate of the function values. It can be verified that this definition satisfies the general definition of an inner product.

When defining the inner product here, we have considered extending its definition to other spaces, but for the real functions we are familiar with, it is simply integrating after multiplication. The trigonometric function system is one of the common orthogonal function systems we know, and besides trigonometric functions, there are also other function systems that satisfy orthogonality, such as some orthogonal polynomial systems, which we won't expand on here. In summary, with the help of inner product calculations, we can successfully expand a function on a certain interval into the sum of coefficients of $\sin(\omega x)$ and $\cos(\omega x)$ at different $\omega$ -- it is also a series. We call the series obtained from this expansion the *Fourier series* of this function:

> [!DEF] Fourier Series
>
> If a suitable function[^4] $f(x)$ has period $2L$, let $\omega_n = n\pi / L$, then its *Fourier series* expansion is:
> $$ f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty \left( a_n \cos(\omega_n x) + b_n \sin(\omega_n x) \right),$$
> where
> $$ a_n = \frac{1}{L} \int_{-L}^{L} f(x) \cos (\omega_n x) \,\mathrm{d}x = \frac{\langle f(x), \cos(\omega_n x )\rangle}{\langle \cos(\omega_n x), \cos(\omega_n x)\rangle} , $$
> $$ b_n = \frac{1}{L} \int_{-L}^{L} f(x) \sin (\omega_n x) \,\mathrm{d}x = \frac{\langle f(x), \sin(\omega_n x )\rangle}{\langle \sin(\omega_n x), \sin(\omega_n x)\rangle} . $$

Note that we require $f(x)$ to be a function with period $2L$ here; the reason will be mentioned shortly. Additionally, if we apply *Euler's formula*, we can rewrite the above expression into a more compact form:

> [!COROLLARY] Complex Form of Fourier Series
>
> If the function $f(x)$ has period $2L$, let $\omega_n = n\pi / L$, then its Fourier series can be expanded as:
>
> $$ f(x) = \sum_{-\infty}^{\infty} c_n \mathrm{e}^{\mathbf{i} \omega_n x}, $$
> where,
> $$ c_n =  \frac{1}{2L} \int_{-L}^{L} f(x) \mathrm{e}^{ - \mathbf{i} \omega_n x}.$$
> In the formula, $\mathbf{i}$ is the imaginary unit. If we denote $K_n(x) = \mathrm{e}^{ - \mathbf{i} \omega_n x}$, then $c_n$ can also be written as:
>
> $$ c_n =  \frac{\langle f(x), K_n(x)\rangle}{\langle K_n(x),K_n(x) \rangle}$$

We require the period to be $2L$ partly to extend the original $2\pi$ period of the classical Fourier series to arbitrary periods, and partly to better connect with the subsequent *Fourier transform* and *Discrete Fourier transform*. Another natural question is: can non-periodic functions be expanded this way on some interval? The answer is that this can be done, but what is obtained is not the expansion of the function, but an approximation on that interval. Let's draw the approximation of some functions under Fourier series below:

{{< react component="Impl_Spinodal_Fourier/fourier_expansion" >}}

As can be seen, on the specified interval, the Fourier series can quickly approximate the target function. Moreover, the result given by the Fourier series is naturally periodic, which also illustrates that if the function being processed is truly periodic, then the Fourier series expanded over its period can very well replace the function itself.

Additionally, the coefficients in front of each term of the Fourier series also have special meaning -- they represent the "strength" of the sine/cosine functions at the corresponding frequency in the function. This is very good news for signal processing, because it allows distinguishing the frequencies of the signal, thereby converting a continuous signal in time into frequency intensities in space. Moreover, observe the high-frequency sine/cosine functions -- they have many "jagged edges" from $-\pi$ to $\pi$, which indicates that they mainly affect the final "details" of the function. When we are not very concerned with these details, we can discard these high-frequency sine/cosine parts and keep only the lower-frequency ones, and the shape of the function will not be greatly distorted.

### From Frequency to Spectrum: Fourier Transform

The Fourier series can represent a periodic function on its period as a superposition of trigonometric functions of different frequencies, or approximate a non-periodic function on a specified interval as a superposition of different trigonometric functions. However, in these methods, the Fourier coefficients are always discrete points, just as shown in the frequency space above. But if we consider letting the frequency *vary continuously*, changing from discrete frequency intensities to a *spectrum*, then we obtain the so-called *Fourier transform*, also known as the *Fourier integral*[^5]. The derivation method is placed below -- click to expand if you're interested.

<details>
<summary>From Fourier Series to Fourier Integral</summary>

How do we do it? Actually, there have been hints earlier: we set $\omega_n = n \pi / L$, where $\omega_n$ naturally becomes the frequency of the trigonometric functions. We need the frequency to vary continuously. The simplest and most natural way is to let $L$ tend to infinity. This also conveniently makes the "expansion" process not just defined on periodic functions, removing the restriction of periodicity (because now the period is infinite).

Substituting the $a_n$ and $b_n$ etc. from the earlier Fourier series back, we obtain:

$$
f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty \left(\left[ \frac{1}{L}\int_{-L}^{L}  f(x) \cos (\omega_n x) \,\mathrm{d}x \right] \cos(\omega_n x) + \left[  \frac{1}{L}\int_{-L}^{L} f(x) \sin (\omega_n x) \,\mathrm{d}x \right] \sin(\omega_n x) \right),
$$

We adjust the order:

$$
f(x) = \frac{1}{2L}\int_{-L}^{L} f(x)\,\mathrm{d}x + \sum_{n=1}^\infty \left[\int_{-L}^{L}  f(x) \cos (\omega_n x) \,\mathrm{d}x \right] \cos(\omega_n x)  \frac{1}{L} + \sum_{n=1}^\infty \left[ \int_{-L}^{L} f(x) \sin (\omega_n x) \,\mathrm{d}x \right] \sin(\omega_n x)  \frac{1}{L},
$$

Note that we have two $1/L$ here, which can be expressed as $(\omega_n -\omega_{n-1})/\pi = \Delta \omega / \pi$, so we have:
$$
 \sum_{n=1}^\infty \cdots \frac{1}{L} \Rightarrow \frac{1}{\pi}\sum_{n=1}^\infty \cdots \Delta \omega.
$$

Ah! Then when we let $L$ tend to infinity, $\Delta \omega$ becomes $\mathrm{d}\omega$, and the summation naturally becomes an integral! Moreover, at this point, in the integral corresponding to $a_0$, if the function $f(x)$ is absolutely integrable, this integral automatically becomes $0$, and we obtain:

$$
f(x) = \int_{0}^\infty \left[\int_{-\infty}^{\infty}  f(x) \cos (\omega x) \,\mathrm{d}x \right] \cos(\omega x)\,\mathrm{d}\omega
     + \int_{0}^\infty\left[\int_{-\infty}^{\infty} f(x) \sin (\omega x) \,\mathrm{d}x \right] \sin(\omega x) \,\mathrm{d}\omega.
$$
</details>

Finally, we call the following the *Fourier integral*[^6]:

> [!DEF] Fourier Integral
>
> The *Fourier integral* representation of a suitable[^4] function $f(x)$ is:
> $$ f(x) = \int_{0}^{\infty} A(\omega) \cos(\omega x)\,\mathrm{d}\omega + \int_0^{\infty} B(\omega) \sin(\omega x) \,\mathrm{d}\omega,$$
> where
> $$ \begin{align*}
    A(\omega) &= \frac{1}{\pi}\int_{-\infty}^{\infty}  f(x) \cos (\omega x) \,\mathrm{d}x;\\
    B(\omega) &= \frac{1}{\pi}\int_{-\infty}^{\infty}  f(x) \sin (\omega x) \,\mathrm{d}x;
\end{align*} $$

Of course, we can also express it in complex form. We call its complex form the *Fourier transform*[^6]:

> [!DEF] Fourier Transform
>
> The *Fourier transform* of a suitable function $f(x)$ is $F(\omega)$, and the inverse Fourier transform of $F(\omega)$ is $f(x)$, if the two satisfy:
> $$ F(\omega) = \int_{-\infty}^\infty f(x) \mathrm{e}^{-\mathbf{i}\omega x}\, \mathrm{d} x ,$$
> $$ f(x) = \frac{1}{2\pi}\int_{-\infty}^\infty F(\omega) \mathrm{e}^{ \mathbf{i}\omega x}\, \mathrm{d} \omega .$$
> The relationship between the two can be denoted as:
> $$\begin{align*} F(\omega) &= \mathscr{F}\left\{f(x)\right\},\\f(x) &= \mathscr{F}^{-1}\left\{F(\omega)\right\}. \end{align*}$$
> Or expressed as:
> $$ f(x) \longleftrightarrow F(\omega) $$

Here, we call $\mathrm{e}^{-\mathbf{i}\omega x}$ the *kernel function* (or simply kernel) of the (forward) Fourier transform, and correspondingly $\mathrm{e}^{\mathbf{i}\omega x}$ is the kernel of the inverse Fourier transform. Taking a function, multiplying it by some kernel, and then integrating is an *integral transform*. The concept of kernel functions always accompanies integral transforms -- the two are inseparable. The integral transform performed using the *Fourier kernel* is precisely the Fourier transform we are discussing here. We usually call the pre-transform function as residing in *real space*, while the post-transform function resides in *spectral space*.

Additionally, regarding the notation of the Fourier transform, if interested, click to expand the content below.

<details>
<summary>Regarding Fourier Transform Notation</summary>

Above, we used the uppercase letter $F$ as the result of the (forward) Fourier transform of the function $f$. Besides using $\mathscr{F}\left\{f\right\}$, $\hat{f}$ or $\left\{f\right\}_k$ are also frequently used to denote the Fourier transform of $f$. And besides using $\omega$ as the angular frequency notation, sometimes people also use the wavenumber $k$ to express the domain of the transformed function, or use $\xi$ to express the dual variable of $x$, thereby reflecting the concept that $\hat{f}$ is the dual of $f$.

Using different variables also brings some different Fourier transform formulas. When using angular frequency $\omega$, the integral kernel is usually $\mathrm{e}^{-\mathbf{i}\omega x}$, and the transform formula is also as above. When using wavenumber $k$ or $\xi$, the relationship between the two is $\omega = 2\pi k$ or $\omega = 2\pi \xi$. In this case, the integral kernel becomes: $\mathrm{e}^{-2\pi \mathbf{i}k x}$ or $\mathrm{e}^{-2\pi \mathbf{i}\xi x}$, and the transform formula will also become:

$$ \hat{f}(\xi) = \int_{-\infty}^\infty f(x) \mathrm{e}^{-2\pi\mathbf{i} \xi x}\,\mathrm{d} x $$
$$ f(x) = \int_{-\infty}^\infty \hat{f}(\xi) \mathrm{e}^{-2\pi\mathbf{i} \xi x}\,\mathrm{d} \xi $$

In this case, the coefficient before the integrals in both Fourier transform formulas is $1$. Sometimes, to give the Fourier transform under angular frequency the same symmetry as when using the wavenumber definition, people split $\frac{1}{2\pi}$ into two $\frac{1}{\sqrt{2\pi}}$ and distribute them to both formulas, thereby maintaining symmetry. Besides these, there are also matters such as whether the imaginary unit is $\mathbf{i}$ or $i$, $\mathbf{j}$ or $j$, the order of signs inside the integral kernel, etc. -- we won't say much more. Overall, the Fourier transform is simply this kind of integral transform, and we choose the appropriate formula according to the needed scenario. In this series, we maintain the notation used in the preceding derivation process, use angular frequency $\omega$, and keep the coefficients before the integrals asymmetric.
</details>

What we discussed here is the one-dimensional case. So how do we perform the Fourier transform in two dimensions or even higher dimensions? The answer is actually very simple: perform the Fourier transform sequentially in each direction. Taking two dimensions as an example, the transform result of $f(x_1,x_2)$ is:

$$\begin{align*}
    F(\omega_1,\omega_2) &=  \int_{-\infty}^\infty \left[\int_{-\infty}^\infty f(x_1,x_2) \mathrm{e}^{-\mathbf{i} \omega_1 x_1}\,\mathrm{d} x_1\right] \mathrm{e}^{-\mathbf{i} \omega_2 x_2} \,\mathrm{d} x_2\\
    &= \int_{-\infty}^\infty  \int_{-\infty}^\infty f(x_1,x_2)  \mathrm{e}^{-\mathbf{i}(\omega_1 x_1 + \omega_2 x_2)}\,\mathrm{d} x_1 \mathrm{d} x_2
\end{align*} $$

And the inverse transform result is:

$$\begin{align*}f(x_1,x_2) &= \frac{1}{(2\pi)^2}\int_{-\infty}^\infty \left[\int_{-\infty}^\infty F(\omega_1,\omega_2) \mathrm{e}^{\mathbf{i} \omega_1 x_1}\,\mathrm{d} \omega_1\right] \mathrm{e}^{\mathbf{i} \omega_2 x_2} \,\mathrm{d} \omega_1 \\ &=  \frac{1}{4\pi^2}\int_{-\infty}^\infty  \int_{-\infty}^\infty F(\omega_1,\omega_2)  \mathrm{e}^{\mathbf{i}(\omega_1 x_1 + \omega_2 x_2)}\,\mathrm{d} \omega_1 \mathrm{d} \omega_2\end{align*}$$

For functions of higher dimensions, we simply need to perform more integrals. Note that each spatial direction corresponds to only one frequency direction. The inverse transform is similar -- change the sign of the exponent in the integral kernel, then multiply in front by $1/2\pi$ raised to the power of the dimension.

### Properties of the Fourier Transform

Having the Fourier transform, we naturally consider what properties it has. First, without a doubt, since the Fourier transform is an integral transform and integration satisfies linearity, therefore:

> [!LEMMA] The Fourier Transform is Linear
>
> Given two suitable functions $f$ and $g$, and complex numbers $a,b\in \mathbb{C}$:
>
> $$ \mathscr{F}\{af+bg\} = a\mathscr{F}\{f\} + b\mathscr{F}\{g\},$$
>
> or denoted as
>
> $$ a f(x) + b g(x) \longleftrightarrow aF(\omega) + bG(\omega), $$
>
> i.e., the transform is linear.

We won't prove it -- this property can be obtained from the integral, and for multivariate functions this property still holds. The other properties are not so obvious, so we need to substitute them in to see. We won't do the derivations here, but directly list several properties:

> [!PROP] Properties of the Fourier Transform
> Given two suitable univariate functions $f$ and $g$, and a complex number $a\in \mathbb{C}$:
>
> 1. Differentiation theorem: $$ \frac{\mathrm{d}^n f(x)}{\mathrm{d} x ^n } \longleftrightarrow (\mathbf{i} \omega)^n F(\omega);$$
> 2. Integration theorem: $$ \int_{x_0}^{x} f(x)\,\mathrm{d} x \longleftrightarrow \frac{F(\omega)}{\mathbf{i}\omega};$$
> 3. Shift theorem: $$ f(x+x_0) \longleftrightarrow \mathrm{e}^{\mathbf{i}\omega x_0} F(\omega);$$
> 4. Convolution theorem: $$ f(x)g(x) \longleftrightarrow  \frac{1}{2\pi} F*G(\omega), $$ $$ (f*g)(x) \longleftrightarrow F(\omega) G(\omega), $$ where $*$ denotes convolution: $$ f*g(x) = \int_{-\infty}^\infty f(t) g(t-x)\,\mathrm{d} t .$$

As can be seen, the Fourier transform has magical properties: it can turn differentiation into simple multiplication, and integration into simple division! The latter two properties are added for completeness, but they also demonstrate the powerful potential of the Fourier transform. For multivariate functions, the first property that we care most about becomes:

$$ \left(\frac{\partial}{\partial \boldsymbol{x}}\right)^\alpha f(\boldsymbol{x}) \longleftrightarrow (\mathbf{i}\boldsymbol{\omega})^\alpha \mathscr{F}\{\boldsymbol{\omega}\}, $$

where $\alpha$ is a multi-index: $\alpha = \left(\alpha_1, \alpha_2,\dots\right)$, and its rule is to apply each component of the multivariate to the corresponding exponent and then multiply. For example, $\boldsymbol{x}^\alpha$ represents $x_1^{\alpha_1}x_2^{\alpha_2}\cdots$. So overall, even for multivariate functions, after Fourier transformation, taking a derivative still becomes multiplying the Fourier transform of the function by the angular frequency and the imaginary unit raised to some power -- a very concise relationship! And the *Fourier spectral method* that we want to introduce actually relies precisely on this magical property of the Fourier transform and has thus been widely applied.

## Fourier Spectral Method

I believe from the introduction above, you can also guess how exactly the Fourier spectral method operates. By simultaneously performing a Fourier transform on both sides of the partial differential equation to be solved, performing calculations in spectral space, and then returning to real space, we can obtain the solution of the partial differential equation. The advantage of this is that we can turn some difficult-to-handle differentiations in the partial differential equation into simple multiplication operations. However, there are also some downsides -- for example, simple multiplication in real space becomes convolution in spectral space. Of course, correspondingly, if convolution occurs in real space, it becomes ordinary multiplication in spectral space. This point is similar for integral equations -- integrals in real space can be transformed into division in spectral space.

However, simply transforming to spectral space is not always a wise choice. For example, when there are variables in the partial differential equation that clearly depend on other variables, we might not transform all variables simultaneously, but only those that are being depended upon. As the most basic example, consider the following classic second-order partial differential equation: the heat equation.

### Fourier Spectral Method for the Classic Heat Equation

> [!EXAMPLE] The Heat Equation
>
> Suppose there is a time-dependent function $T(x,t)$ satisfying the conditions
> $$ \frac{\partial T}{\partial t} = a \frac{\partial^2 T}{\partial x^2},$$
> $$ T(x,0) = T_0(x), $$
> where $T_0(x)$ is a known function.

So how can we solve it? From the problem statement, the field distribution at $t=0$ is known to us, and only the time partial derivative of the unknown function appears on the left-hand side. To handle it, we perform a Fourier transform on both sides of the equation with respect to $x$, obtaining the following result:

$$ \frac{\partial \mathscr{F}\left\{ T\right\}}{\partial t} = a \mathscr{F}\left\{\frac{\partial^2 T}{\partial x^2}\right\}, $$

By the properties of the Fourier transform, we have:

$$ \mathscr{F}\left\{\frac{\partial^2 T}{\partial x^2}\right\}= (\mathbf{i}\omega)^2 \mathscr{F}\{T\};$$

Substituting back, we obtain an equation about $\mathscr{F}\left\{T\right\}$ that is only explicitly dependent on time:

$$ \frac{\partial \mathscr{F}\left\{ T\right\}}{\partial t} = - a \omega^2 \mathscr{F}\{T\}, $$

Next, we only need to directly solve it in time, and finally inversely transform the obtained $\mathscr{F}\{T\}$ back to $T$, giving us the solution we need.

However, although the operation is simple, the mathematical logic behind it is actually somewhat more complex. The Fourier spectral method we introduced here is actually the most well-known method under the broader category of *spectral methods*. We won't expand on spectral methods here, but it's worth understanding that spectral methods are actually methods that use a series of *orthogonal functions* to approximate the function to be solved, and these orthogonal functions are required to have only finitely many zeros on the space being solved. The Fourier spectral method uses the properties of trigonometric functions (or $\mathrm{e}^{\mathbf{i}\omega x}$), and besides the Fourier spectral method, there are also Chebyshev spectral methods, Legendre spectral methods, etc., which rely on two types of *orthogonal polynomials*: Chebyshev polynomials and Legendre polynomials. Furthermore, the special property exhibited by the Fourier spectral method above actually originates from a special property of the *differential operator*:

$$ \frac{\mathrm{d} }{\mathrm{d} x }\mathrm{e}^{\mathbf{i} \omega x} = \mathbf{i}\omega \mathrm{e}^{\mathbf{i} \omega x},$$

That is, $\mathrm{e}^{\mathbf{i} \omega x}$ is an eigenfunction of the differential operator, and the eigenvalue is precisely $\mathbf{i} \omega$. It is precisely this characteristic that allows the Fourier transform to so simply convert differentiation into ordinary multiplication. Unfortunately, other spectral methods do not have such simple correspondences and are therefore relatively less common.

Despite its power, the Fourier spectral method still has some of its own problems. One of them is that if the functions on both sides of the equation are not simply composed of addition and differentiation, but contain multiplication, exponentials, logarithms, etc., then even after transforming to spectral space, it is still difficult to simply obtain an explicit expression of the unknown function in spectral space.

Fortunately, what we are doing is a numerical method, not solving from a purely mathematical perspective. To handle the problem just described, we can use the so-called *pseudo-spectral method*.

### Fourier Pseudo-Spectral Method

The so-called pseudo-spectral method is essentially only leveraging the powerful function of the Fourier transform for differential operators, while first computing the results of complex operations such as multiplication and division in real space and then transforming them into spectral space to continue the original computation.

Let's take the core of this series -- the Cahn-Hilliard equation -- with the most classic single-component double-well bulk energy and gradient interfacial energy as an example:

$$
\frac{\partial c}{\partial t} = \nabla \cdot M \nabla \frac{\delta F}{\delta c} = M \nabla^2\left( 2Ac(1-c)(1-2c)-\kappa\nabla^2c\right),
$$

Performing a Fourier transform on both sides simultaneously, we obtain:

$$
\frac{\partial \{c\}_k}{\partial t} = -\omega^2 M ( 2A \{c(1-c)(1-2c)\}_k - \omega^2 \kappa \{c\}_k),
$$

As can be seen, here we did not further expand the bulk energy part, but kept it in its state in real space and transformed it as a whole via the Fourier transform. In implementation, we will also follow this pattern: perform the bulk energy calculation in real space, then transform back to spectral space and participate in the iteration, thereby solving the problem that pure Fourier spectral methods have difficulty handling complex variable dependencies.

Even though the Fourier spectral method and Fourier pseudo-spectral method have such powerful capabilities, they still have many limitations. For example, they have extremely strong computational ability for problems with periodic conditions, but are somewhat helpless for problems with non-periodic conditions, even though the Fourier transform can support functions defined on the entire Euclidean space. This limitation can be circumvented through some methods, but doing so brings a large amount of additional computational overhead to handle boundary problems, and the obtained results may be somewhat inaccurate. Moreover, when using the Fourier spectral method, its convergence requires some additional handling.

But after talking so much, how exactly do we implement the Fourier spectral method? More importantly, how do we make the computer know how to compute the Fourier transform? This inevitably brings us to the legendary *Discrete Fourier Transform*.

### Discrete Fourier Transform

How does the Fourier transform become discrete? I actually think that the word *transform* in Discrete Fourier Transform is a bit deceptive, because the computation process takes discrete variables on some *interval* as input and transforms them to points in spectral space. Compared to the Fourier transform, it is actually more similar to the Fourier series. So, to understand the Discrete Fourier Transform, we can actually start from the Fourier series instead.

So, how do we further discretize the Fourier series? Just now, going from Fourier series to Fourier transform was letting the period of the function become infinite, which in turn let a continuous function possess a continuous spectrum; to further discretize from the Fourier series, we have to work on the function itself, letting *discrete points possess a discrete spectrum*. To achieve this, we can borrow the observation about inner products from earlier, and replace the continuous *function inner product* with a *sequence inner product*. We define the sequence inner product:

> [!DEF] Sequence Inner Product
>
> Given two sequences $\{a_n\}$ and $\{b_n\}$ of length $N$, their *sequence inner product* is:
>
> $$ \langle \{a_n\},\{b_n\}  \rangle = \sum_{k=1}^{N} a_k \bar{b_k}.$$
> where $\bar{b_k}$ denotes the conjugate of $b_k$.

Again, it can be verified that the sequence inner product defined here conforms to the general definition of an inner product. In fact, when we fix $N$, the sequence inner product becomes the inner product in an $N$-dimensional vector space. With the newly defined sequence inner product, we only need to replace the original function inner product with this new inner product to obtain the Discrete Fourier Transform:

> [!DEF] Discrete Fourier Transform
>
> Let a function $f(x)$ defined on $\R$ form a sequence $\{f_n\}$ from its values at $N$ equally spaced points on the interval $[0,kN]$. Let
>
> $$ \boldsymbol{\phi}_k =  \mathrm{e}^{\mathbf{i} k n 2 \pi /N} $$
> Then the Discrete Fourier Transform of the function $f(x)$ at the $N$ points on the interval $[a,b]$ is:
>
> $$ \{F_k\} = \frac{\langle\{f_n\}, \{\boldsymbol{\phi}_k\} \rangle}{\langle \{\boldsymbol{\phi}_k\} ,\{\boldsymbol{\phi}_k\} \rangle} = \frac{1}{N} \langle\{f_n\}, \{\boldsymbol{\phi}_k\} \rangle$$

That's right -- simply replacing the function inner product with the sequence inner product naturally yields the result of the Discrete Fourier Transform. And if the inverse transform is needed, simply replace $\phi_k$ with its conjugate, then do some normalization, and it's done. At this point, we can use our Discrete Fourier Transform to handle the points we discretized in numerical problems, thus obtaining their results in spectral space.

You might have a question: is the Discrete Fourier Transform really the discrete form of the Fourier transform? In other words, when we use the Discrete Fourier Transform, does it still possess those excellent properties of the continuous Fourier transform that we discussed earlier? The answer is affirmative: it can be proven that, under certain conditions, the result of the Discrete Fourier Transform of a sequence of function values, sampled in the same way, is just the point sequence obtained by sampling the continuous Fourier transform of that function in the same manner. As for the conditions here, the author hasn't investigated deeply -- generally speaking, it requires that all points must be uniformly distributed and completely cover the entire period of the function. Otherwise, some distortion (in English: *Aliasing*) will occur, such as high-frequency components of the function's spectrum being superimposed onto low frequencies. The good news, however, is that what we are considering from the start are simulation problems, not digital signal processing problems, so we don't need to overly focus on these issues during modeling and solving.

However, even with the Discrete Fourier Transform, we are still停留在 the mathematical model level. How can we implement the algorithm for the Discrete Fourier Transform? The first algorithm that comes to mind is naturally to honestly compute according to the definition, but the complexity of such an algorithm is $O(N^2)$, which is an algorithmic complexity that becomes very hard to accept when the problem scale is even slightly larger. Fortunately, such an algorithm still has room for improvement, which is what we will introduce below: the *Fast Fourier Transform (FFT)*.

## Fast Fourier Transform

Perhaps you have long heard this name, but that doesn't prevent us from reintroducing this algorithm here once again. The Fast Fourier Transform (FFT) is not some independent mathematical transform; it is merely a fast algorithm for computing the (Discrete) Fourier Transform. But this algorithm is so famous that perhaps many people first hear about FFT and only later learn what the Fourier transform is. So, for this famous algorithm, where does its *speed* lie?

### From $O(N^2)$ to $O(N\log N)$

Earlier, we mentioned that honestly computing according to the definition yields an algorithmic complexity of $O(N^2)$. Let's look at how this algorithm works -- perhaps we can glean some hints from it. But before that, let's carry forward the excellent tradition of *doing all data structures ourselves* and simply implement a complex number type compatible with `fftw_complex`, without using the complex number type provided by `<complex.h>`:

```c
#include <math.h>
#include <string.h>
typedef double my_complex[2];

/* Allocate and zero-initialise N complex numbers. */
static inline my_complex *alloc_complex(size_t N) {
    my_complex *p = calloc(N, sizeof(my_complex));
    if (!p) {
        fprintf(stderr, "calloc failed\n");
        exit(EXIT_FAILURE);
    }
    return p;
}

/* Deep-copy dest ← src (N elements). */
static inline void copy_complex(my_complex *dest, my_complex *src, size_t N) {
    memcpy(dest, src, sizeof(my_complex) * N);
}

static inline void cassign(my_complex dest, my_complex src) {
    dest[0] = src[0];
    dest[1] = src[1];
}

static inline void cadd(my_complex a, my_complex b, my_complex out) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
}

static inline void csub(my_complex a, my_complex b, my_complex out) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
}

static inline void cmul(my_complex a, my_complex b, my_complex out) {
    my_complex res;
    res[0] = a[0] * b[0] - a[1] * b[1];
    res[1] = a[0] * b[1] + a[1] * b[0];
    cassign(out, res);
}

static inline void c_exp_pure_image(double theta, my_complex out) {
    out[0] = cos(theta);
    out[1] = sin(theta);
}
```

As can be seen, our complex number is actually just an array of length $2$, with the first position storing the real part and the second storing the imaginary part. This should be completely consistent with the `fftw` implementation. In terms of computation, we mainly need to implement assignment, addition, subtraction, and multiplication, as well as an exponential function $\mathrm{e}^{\mathbf{i}\theta}$ that will be needed. Here, I conveniently wrote two utility functions to facilitate creating complex arrays and deep-copying arrays, or batch assignment.

There is actually a point worth noting here: the implementation of multiplication needs to first store the result in a temporary variable and then assign it all at once at the end. The reason for not directly changing the value of `out` to the computed result is that there is no way to guarantee that `in` and `out` are not the same variable here. If they are the same variable, directly writing to `out` would cause the imaginary part calculation to be wrong. I have stumbled into this pitfall before -- here I'm reminding myself and you as well.

#### The Honest $O(N^2)$ Algorithm

To be honest, implementing the algorithm according to the definition is very simple, only requiring these few lines:

```c
void my_fourier_transform(
    my_complex *in,
    my_complex *out,
    size_t N,
    int sign) {

    my_complex *phi_k = alloc_complex(N);
    for (size_t k = 0; k < N; k++) {
        for (size_t n = 0; n < N; n++) {
            double theta = (double)sign * 2.0 * M_PI * n * k / (double)N;
            c_exp_pure_image(theta, phi_k[n]);
            my_complex f_n_phi_n;
            cmul(phi_k[n], in[n], f_n_phi_n);
            cadd(out[k], f_n_phi_n, out[k]);
        }
    }
    free(phi_k);
}
```

Simply put, we only need to create two loops: the first loop traverses each output position, and the second loop executes the inner product we need (pointwise multiplication followed by accumulation) -- and the algorithm is done. Here, we didn't normalize the inverse transform, to keep the results consistent with `fftw`. However, the glaring double $N$-fold loop means this algorithm is a barefaced $O(N^2)$ algorithm -- as soon as $N$ becomes even slightly larger, it will be very slow. Where can we start optimizing this algorithm?

#### The Clever $O(N\log N)$ Algorithm

Perhaps you've already glimpsed a hint from the computation process of `theta`: when $n$ and $k$ each traverse $N$ times, there are only $N^2/2$ independent values, meaning half of the computations are unnecessary. Although this doesn't immediately lower its $O(N^2)$ complexity, it can remind us that the results of the Fourier transform possess strong symmetry. Searching for the [Fast Fourier transform](https://en.wikipedia.org/wiki/Fast_Fourier_transform) entry on Wikipedia, you will see the so-called *Cooley-Tukey algorithm* in the *Algorithm* section, and it has its own standalone entry page. Indeed, what we commonly refer to as FFT is precisely this Cooley-Tukey algorithm.

How does this algorithm work? It actually exploits the mathematical symmetry of the Discrete Fourier Transform. Here, we roughly outline the idea of this algorithm. If you want a detailed understanding of this algorithm, you can refer to [Cooley-Tukey algorithm - Wikipedia](https://en.wikipedia.org/wiki/Cooley%E2%80%93Tukey_FFT_algorithm#The_radix-2_DIT_case).

Let the sequence to be transformed be $x_n$, and the result after Fourier transformation be

$$
X_k = \sum_{n=0}^{N-1}x_n \mathrm{e}^{-\mathbf{i} k n 2\pi / N},
$$

We can split the sum on the right-hand side into odd-indexed terms and even-indexed terms, and using some properties of $\mathrm{e}^{2n\pi\mathbf{i}}$, we can discover that the sequence $X_k$ can be divided into two halves, each half independently expressible in terms of the Fourier transforms of the odd terms and the even terms:

$$\begin{align*}
     X_k = E_k + W_k O_k,\\
     X_{k+N/2} = E_k - W_k O_k,\\
\end{align*}$$

where

$$
\begin{align*}
    W_k &= \mathrm{e}^{-\mathbf{i} k 2\pi / N};\\
    E_k &= \sum_{m=0}^{N/2 -1} x_{2m}\mathrm{e}^{-\mathbf{i} k m 2\pi / N};\\
    O_k &= \sum_{m=0}^{N/2 -1} x_{2m+1}\mathrm{e}^{-\mathbf{i} k m 2\pi / N}.\\
\end{align*}
$$

In this way, after obtaining the two sequences $E_k$ and $O_k$ of length $N/2$, we can combine them into the original $X_k$, thereby successfully eliminating half of the redundant computation. But at the same time, we can see that $E_k$ and $O_k$ themselves are also Fourier transforms of sequences of length $N/2$, so they can also undergo this splitting computation. We can perform a total of $\log_2 N$ (abbreviated as $\log N$ below) splits. The $k$-th split yields $2^k$ sequences, each of length $N/(2^k)$. In the result of each split, we need to separate out $E_k$ and $O_k$ and perform multiplication and addition on them. The number of multiplications is $2^k/2 * N/(2^k) = N/2$ (the number of sequences divided by $2$ is because only $O_k$ needs multiplication). The number of additions is $2^k/2 * N/(2^k) * 2 = N$ (the number of sequences divided by $2$ is because addition/subtraction is done in pairs (on the corresponding $E_k$ and $O_k$), and the final multiplication by $2$ is because two halves need to be computed (addition gives the first half, subtraction gives the second half)). Therefore, the result of each split requires $3N / 2$ computations. With a total of $\log N$ splits, $3N/2 \log N$ computations are needed, and the time complexity is $O(N \log N)$. This is also one way to derive its algorithmic complexity.

So, how do we implement this Cooley-Tukey algorithm? From the analysis process above, it is not hard to see that we need to repeatedly split the Fourier transform of the sequence, and then compute $O_k$ and $E_k$ of each layer bottom-up from the results of the splits. Therefore, this task is naturally suited for a recursive algorithm. Below is its implementation:

```c
void my_fft_1d_v1(
    my_complex *in,
    my_complex *out,
    size_t N,
    int sign) {
    // N is assumed power of 2
    if (N == 1) {
        cassign(out[0], in[0]);
        return;
    }
    my_complex *Ek = (my_complex *)malloc(sizeof(my_complex) * N / 2);
    my_complex *Ek_out = (my_complex *)malloc(sizeof(my_complex) * N / 2);
    my_complex *Ok = (my_complex *)malloc(sizeof(my_complex) * N / 2);
    my_complex *Ok_out = (my_complex *)malloc(sizeof(my_complex) * N / 2);
    if (!Ek || !Ek_out || !Ok || !Ok_out) {
        free(Ek);
        free(Ek_out);
        free(Ok);
        free(Ok_out);
        fprintf(stderr, "%s", "Allocation Failed!");
        return;
    }

    for (size_t i = 0; i < N / 2; ++i) {
        cassign(Ek[i], in[2 * i]);
        cassign(Ok[i], in[2 * i + 1]);
    }
    my_fft_1d_v1(Ek, Ek_out, N / 2, sign);
    my_fft_1d_v1(Ok, Ok_out, N / 2, sign);
    double theta = (double)sign * 2.0 * M_PI / (double)N;
    for (size_t i = 0; i < N / 2; i++) {
        my_complex Wk;
        c_exp_pure_image((double)i * theta, Wk);
        my_complex WOk_k;
        cmul(Wk, Ok_out[i], WOk_k);
        cadd(Ek_out[i], WOk_k, out[i]);
        csub(Ek_out[i], WOk_k, out[i + N / 2]);
    }
    free(Ek);
    free(Ek_out);
    free(Ok);
    free(Ok_out);
    return;
}
```

Here, the convenient `complex_alloc` was not used, and the traditional `malloc` was used instead, so the code appears somewhat longer, but the core algorithm is simple. First, when the length of the sequence being processed is $1$, the recursion reaches its endpoint, and the split result is simply assigned to the output part. When the sequence length is not $1$, we first separate the odd and even sequences, and then perform Fourier transforms on both the odd and even sequences separately (sending them into the recursive logic). After the Fourier transforms of the odd and even sequences are computed, we first compute the needed $W_k$, then compute $E_k + W_k O_k$ and $E_k - W_k O_k$ respectively, and finally pass the result to `out`, completing the design of the recursive logic.

I believe this logic is still fairly clear, because it really is just translating the original algorithm into formulas. However, recursion is never a particularly good approach in application, because it requires repeatedly calling functions until the function reaches the position where recursion returns, at which point the function calls can be completed one by one, causing a large number of functions to linger in the call stack waiting for calls to complete. For small-scale problems, recursion is still usable, but for large-scale problems, recursion can easily cause a stack overflow. Therefore, it is very necessary to find a way to rewrite the recursive algorithm into an iterative algorithm.

### From Recursion to Iteration

In theory, recursive algorithms can always be rewritten into iterative algorithms. For the FFT algorithm, the idea of rewriting it from recursion to iteration is actually very clear: multiply the elements of certain sequences in the current loop by the needed $W_k$, then add them to the corresponding sequences to obtain the sequences to be used in the next loop. But the problem is: which ones are *certain* and which ones are *corresponding* sequences? Let's look at an example with $N=8$ to see how to implement this algorithm.

![FFT process](FFT.png)

In the simple diagram above, the left side is the reordering process. Because each time we compute the Fourier transform, we need to first distinguish the parity of the indices, the final arranged result is `0, 4, 2, 6, 1, 5, 3, 7`. The superscripts on the right are for distinguishing which subsequence, and the subscripts are the element indices within the subsequence. After successfully arranging the elements on the left, we naturally obtain the bottommost layer on the right: $8$ alternating odd-even subsequences, each of length $1$. At this point, since we have already arranged all the elements, we only need to take every two adjacent subsequences (the left one is the even subsequence, the right one is the odd subsequence) and perform computation to obtain the subsequences of the next layer. Addition gives the first half of the new subsequence, and subtraction gives the second half. Let's give a concrete example here, letting $x_n$ be the integers from $0$ to $7$:

![FFT simple example](FFT_example.png)

In the example above, some decimals have been rounded off; they should be results of adding or subtracting $4\mathbf{i}$ and $4\sqrt{2}\mathbf{i}$.

From the examples above, we can see that the problems to be solved are: how to generate such an arrangement (left side), and how to use loops to dynamically handle the current sequence length and number of sequences (right side).

#### Bit Reversal

First, let's look at the first problem. The answer is actually quite interesting: if numbers are expressed in binary digits, the relationship between the initial arrangement and the arranged result is precisely the mirror image of the indices converted to binary digits, also known as the bit-reversed / digit-reversed result:

![Bit reversal](Bit_Reverse.png){width="400"}

We won't delve into the origin of this conclusion. The important point is how we implement such an arrangement. For simplicity, we consider the number of sampling points to be a power of $2$, so we can use a clever method to implement bit reversal: implement our own addition, but carry from left to right:

```c
void bit_reverse_rearrange(my_complex* array, size_t N) {
    // N is power of 2
    for (size_t i = 1, j = 0; i < N; i++) {
        size_t bit = N >> 1;
        for (; j & bit; bit >>= 1) {
            j ^= bit;
        }
        j ^= bit;
        if (i < j) {
            my_complex temp;
            cassign(temp, array[j]);
            cassign(array[j], array[i]);
            cassign(array[i], temp);
        }
    }
}
```

Here, what we mainly need to do is index arithmetic, obtaining the two indices that need to be swapped, so we use `i` to represent the pre-reversal index and `j` to represent the bit-reversed index of `i`. Our goal is to sequentially reverse the bits of numbers from $1$ to $N-1$ and place the reversed result in `j`. Since we don't need to reverse `0`, `i` starts from `1` here.

To implement such bit reversal, our plan is to start from the leftmost digit and sequentially add `1` to the corresponding digit of `j`. Therefore, within each loop, we set a variable `bit` pointing to the current digit, initialized to the position of the highest bit (making this digit `1` and the rest `0`). Then, in the inner small loop, we check the carry situation: if `j & bit` is `1`, it means `j` already has a value at the `bit` digit, and this addition should carry at that digit, so we use `^=` (i.e., XOR) to do a half-addition at that digit, and record the carried bit by right-shifting `bit` by one position (compared to normal addition which shifts left, we shift right here); if the value of `j & bit` is `0`, it means the value of `j` at the `bit` digit is `0`, and we don't need to consider carrying at this point, so we directly break out of the loop and let `j` add the value of `bit` (still using XOR to implement it).

It's worth noting that `j` is only initialized to `0` at the very beginning, and thereafter never directly assigned but only continuously updated, so the values of `j` and `i` are always each other's bit-reversed result. When the line `j ^= bit;` completes, we have obtained the bit-reversed result of `i`. The conditional check here is to avoid swapping the order twice (only one swap is needed).

The author personally likes this interesting algorithm very much; it feels like implementing addition oneself, and I've gotten a taste of the computer science person's life, hehe. In any case, in this way, we have achieved arranging the data into the order we need.

#### Dynamic Loop

Next is the second problem to be solved for FFT: how to change the recursive algorithm into a loop. From the earlier FFT example block diagram, you may be able to see that each time we complete one loop (the computation of one horizontal block), the length of each $O_k$ and $E_k$ to be processed doubles, and the number of problems to be processed also becomes half of the original. This suggests that we can set a variable `len` representing the current length of $O_k$/$E_k$. Having the length and the total problem length `N`, we only need to divide `N` by `len` to get the total number of multiplications and additions/subtractions to be performed. After performing all multiplications and additions/subtractions, we double the length of `len`, naturally entering the next loop. And when this length equals `N`, the loop should terminate (because $O_k$ and $E_k$ always appear in pairs, `len = N/2` is already the last loop).

Based on this idea, we have the following code:

```C
void my_fft_1d_v2(
    my_complex *in,
    my_complex *out,
    size_t N,
    int sign) {
    // reorder
    copy_complex(out, in, N);
    bit_reverse_rearrange(out, N);

    for (size_t len = 1; len < N; len <<= 1) {
        my_complex W_len;
        double theta = (double)sign * 2.0 * M_PI / (2.0 * (double)len);
        c_exp_pure_image(theta, W_len);
        for (size_t i = 0; i < N; i += 2 * len) {
            my_complex W = {1.0, 0.0};
            for (size_t j = 0; j < len; j++) {
                size_t k_this = i + j;
                size_t k_next = i + j + len;
                my_complex WO;
                cmul(W, out[k_next], WO);

                my_complex out_this, out_next;
                cadd(out[k_this], WO, out_this);
                csub(out[k_this], WO, out_next);

                cassign(out[k_this], out_this);
                cassign(out[k_next], out_next);
                cmul(W, W_len, W);
            }
        }
    }
}
```

Let's look at the specific approach. As described above, in the outermost large loop, we first set the length `len` of each subproblem, requiring it to end the loop when it equals `N`. Then, at the start of the large loop, we can compute the `W_len` to be used later, which is the value of $W_k$ that varies with `len`. It acts as the twiddle factor for $W_k$, and its value is determined solely by the large loop.

Next, we enter the loop for processing different $O_k$ and $E_k$ pairs. Here, `i` represents the index of the first element in the $E_k$-$O_k$ pair. Then we declare a complex number `W`, which will be continuously multiplied by `W_len`. After combining with `W_len` through computation to obtain $W_k$, it will form `WO` together with $O_k$ and then be added and subtracted with $E_k$. It is placed here because each $E_k$-$O_k$ pair should have its own independent `W`.

Finally, we enter the interior of $E_k$ and $O_k$, using `k_this` to mark the position of the value in $E_k$ and `k_next` to mark the position of the value in the corresponding `WO`. After computing the `WO` at the current position, we only need to compute the addition and subtraction results, then place them back in the corresponding positions, completing the computation of one pair of values within an $E_k$-$O_k$ pair. Finally, remember to update `W` to the next value, i.e., multiply by `W_len`, to complete the loop.

This is the so-called dynamic loop algorithm for the Fast Fourier Transform FFT, or more formally, the Cooley-Tukey radix-2 algorithm. Its advantage is that it no longer needs to rely on recursion, which is very important when computing the Fourier transform of large datasets — after all, you wouldn't want the function stack to be suddenly stuffed to bursting during computation. The code we implemented ourselves is placed here: [complex class C_my_fft_complex.h](/attachments/Impl_Spinodal/Fourier/C_my_fft_complex.h), [test case C_my_fft_test_main.c](/attachments/Impl_Spinodal/Fourier/C_my_fft_test_main.c), [library source C_my_fft.c](/attachments/Impl_Spinodal/Fourier/C_my_fft.c), [library header C_my_fft.h](/attachments/Impl_Spinodal/Fourier/C_my_fft.h). Please feel free to download, compile, and use.

However, our implementation still has many problems. The biggest problem is that when the input array length is no longer a power of $2$, our algorithm needs to find a way to make its length a power of $2$. The usual approach is to pad the data with $0$s at the end, which also doesn't affect the transform result for the length we care about. But to be honest, this is very bad news, especially in some extreme cases — for instance, if the array length is a power of $2$ plus $1$, we have to pad with nearly the same length of $0$s. This still puts great pressure on memory, and these $0$s are merely values forcibly added for the algorithm to run, without much significance.

However, the Fast Fourier Transform algorithm was proposed so long ago, and there are so many engineering problems requiring fast Fourier transforms — there must certainly be very good library functions for handling this problem. Ultimately, it's not our turn to hand-craft such broken wheels. As of now, among the universally recognized Fast Fourier Transform libraries, the most famous is the *FFTW* project. Its greatness needs no elaboration. Let's give a brief introduction to this library, since we will use it to run phase field simulations later.

### FFTW

FFTW, borrowing its [official website's](https://fftw.org) self-introduction, is the abbreviation for *Fastest Fourier Transform in the West*:

> ... Hence the name, "FFTW," which stands for the somewhat whimsical title of "**Fastest Fourier Transform in the West**."

I don't get it, but I am greatly impressed.

The interesting feature of FFTW is that it does not directly perform computation, but has a so-called *plan* mechanism. According to FFTW's documentation, when an *fftw_plan* is created, it will select the most suitable Fourier computation method based on factors such as computer configuration, usage environment, problem size, etc., and store this method together with the data. When a Fourier transform computation is needed, one simply executes that plan to complete a transform. According to the documentation, *fftw_plan* has multiple strategies for finding an approximately optimal scheme, and sometimes the generated algorithm is something even humans cannot understand how it computes, yet it still computes correctly. This is quite mystical, but I am willing to believe it.

For such a powerful tool, its basic usage method is unexpectedly simple. Let's give an example below:

```C
#include <stdio.h>
#include <math.h>
#include <fftw3.h>

int main(void) {
    int N = 8;

    /* Allocate input and output arrays.
       fftw_complex is a double[2]: [0] = real part, [1] = imaginary part. */
    fftw_complex *in  = fftw_malloc(sizeof(fftw_complex) * N);
    fftw_complex *out = fftw_malloc(sizeof(fftw_complex) * N);

    /* Create a plan BEFORE filling the input.
       FFTW_FORWARD = forward transform (sign -1 in the exponent).
       FFTW_ESTIMATE picks a plan quickly without timing measurements. */
    fftw_plan plan = fftw_plan_dft_1d(N, in, out, FFTW_FORWARD, FFTW_ESTIMATE);

    /* Fill the input: a simple cosine wave of frequency 1. */
    for (int i = 0; i < N; i++) {
        in[i][0] = cos(2.0 * M_PI * i / N);  /* real part */
        in[i][1] = 0.0;                       /* imaginary part */
    }

    /* Run the transform. */
    fftw_execute(plan);

    /* Print the result. */
    for (int i = 0; i < N; i++) {
        printf("out[%d] = %7.3f + %7.3fi\n", i, out[i][0], out[i][1]);
    }

    /* Clean up. */
    fftw_destroy_plan(plan);
    fftw_free(in);
    fftw_free(out);
    return 0;
}
```

(This example was written with AI's help — forgive the author's laziness. For example code, AI really does a much better job than I do.)

As can be seen, after including the header file, we first use `fftw_malloc` to create arrays — it's actually just the `fftw`-specialized version of `malloc`. Then we can create the `fftw_plan`. It's worth noting that the `fftw_plan` must be created before filling the arrays with appropriate values, because during the creation of the `fftw_plan`, some values are written into the arrays to attempt the fastest computation scheme, so the data in the original arrays will be contaminated after creating the `fftw_plan`. Therefore, the correct approach is to initialize the arrays after creating the `fftw_plan`.

After filling the arrays with some values, we only need to use `fftw_execute` to execute the previously created `plan` to complete one Fourier transform. Additionally, at the end we must use the correct memory deallocation method — what was allocated with `fftw_malloc` should be deallocated with `fftw_free`, and the created `fftw_plan`, being a pointer as well, should be deallocated using `fftw_destroy_plan`. Incorrectly using `free` will cause the program to exit abnormally, and the `fftw_plan` will linger in memory with delayed destruction — it counts as a bug either way.

To compile and run the code above, note that we used the `<math.h>` library. For instance, if the source file is `main.c`, when compiling, use:

```console
> gcc main.c -lfftw3 -lm
```

to compile correctly; otherwise, the linker will report errors, complaining that it cannot find the definitions of some symbols. It is especially important to note the order of `-lfftw3` and `-lm`. Since FFTW uses `<math.h>`, our own code and FFTW's common dependency should be passed later — first `-lfftw3` to link FFTW, then `-lm` to link the common dependency `<math.h>`. If this order is reversed, it won't work. This counts as a small pitfall.

Beyond the example above, FFTW's usage actually goes far beyond just a 1D Fourier transform. In fact, it supports many discrete transforms related to the Fourier transform, including the multidimensional Fourier transform that we will use, as well as some so-called sine transforms and cosine transforms that we won't use, and some real-array Fourier transforms that are slightly more cumbersome to use. We won't elaborate further here. Our next post will use it to implement the spinodal decomposition simulation using the Fourier pseudo-spectral method — please look forward to it~

## Afterword

Oh my god, who knows how long I've delayed this blog post... The bonus chapter originally planned for release before May Day ended up being dragged all the way to before Children's Day!? During this period, the author experienced going home for break, packing up and heading to Germany for academic exchange, being in an unfamiliar place unable to buy still (non-carbonated) drinking water, as well as unstable-to-terrifying internet and damned awful weather. Finally, on a bored afternoon (it's still afternoon as long as the sky hasn't darkened), I managed to finish writing this.

Even now that it's finished, looking back at the existing content, I can't help but feel it's a bit verbose, a bit wanting-it-all: wanting to introduce the mathematical background of the Fourier transform, wanting to clearly explain the specific implementation of the Discrete Fourier Transform, and wanting to introduce FFTW, this useful mathematical library. If your viewing experience was poor, please criticize lightly, show some mercy wuwuwu. During the process of writing the mathematical background, the author can be said to have consulted a large amount of material. I think I've figured out some of the nuances here, but I don't know if the expressed result is simple and easy to understand. To convey my thoughts as much as possible, I once again used React to do some visualization. Once again, thanks to the great group member [開源 lib](https://ex-tasty.com/) for the support! Without React, watashi wa!

Regarding the process of implementing FFT (and using my own broken wheel and FFTW to do spinodal decomposition), to be honest, the author benefited greatly. Some algorithms, if you don't write them yourself, you simply cannot understand what they are actually doing. The author, with AI's help, asked while writing, and finally wrote the Cooley-Tukey iterative algorithm for FFT, as well as using it to implement the 2D spinodal decomposition Fourier pseudo-spectral method simulation. Moreover, since according to the article plan, the latest installment of the spinodal decomposition simulation would be implemented in **C language**, I went ahead and directly wrote the FFT implementation in C. While sincerely lamenting the power of the C language, I also felt that sense of *With great power, comes much greater responsibility* in C — forgetting to check for null pointers (actually, the AI-written code forgot to check for null pointers after `fftw_malloc`), forgetting to actively `free` pointers, incorrectly using `free` to deallocate `fftw_plan`... similar problems are countless. Going further, I felt the advantage of C++: RAII largely avoids such memory management problems — anyway, types satisfying RAII automatically call their destructor to release resources when leaving scope, which is truly quite worry-free. Beyond this, I also felt the wisdom of C programmers: in the absence of a host of modern language features, they can flexibly and cleverly use pointers in multiple ways to achieve their goals, which truly deserves the description "easy to learn."

So, thank you for reading this far. I hope you were in a good mood while reading this article. The next post will be about using the C language and the Fourier pseudo-spectral method to simulate spinodal decomposition, which is also the main purpose of this bonus chapter: to lay the groundwork for the next post, avoiding too much and too cumbersome content (even though this post is already very cumbersome). Please look forward to it! Finally, as always, I wish you physical and mental well-being, smooth work, happiness every day, and that you can drink cheap and thirst-quenching water.


[^1]: https://www.bilibili.com/video/BV1pW411J7s8/ A series of videos by [3Blue1Brown](https://space.bilibili.com/88461692) all touch on the Fourier transform
[^2]: https://www.bilibili.com/video/BV1eUHjzgEAd/ [漫士沉思录](https://space.bilibili.com/266765166) also made an introduction to the Fourier transform
[^3]: https://numerical.recipes/book.html Its Chapter 12 introduces the relevant background of the Fast Fourier Transform.
[^4]: This is truly a very complex topic. Because we just want to use it as a method, we won't delve deeply into the sufficient conditions for Fourier series and Fourier transforms here. If interested, refer to some advanced mathematics or mathematical analysis textbooks.
[^5]: This is yet another very complex topic. Fourier integral and Fourier transform — two names cannot possibly represent exactly the same thing. What exactly is their difference? If interested, refer to [the discussion on Stack Overflow](https://math.stackexchange.com/questions/400679/difference-between-fourier-integral-and-fourier-transform). Overall, the Fourier transform is generally expressed in complex form, and the difference between the two broadly has two views. One view holds that the Fourier integral is the expansion in trigonometric function form, while the Fourier transform is the integral transform of functions in complex form. The other view holds that the Fourier integral is merely a form of integral, while the Fourier transform is a *linear isometric isomorphism* on $L^2$ space. The former leans more toward form — some textbooks adopt this approach — while the latter leans more toward the harmonic analysis / Fourier analysis parlance. We adopt the former view.
[^6]: Here we apply the view of *integral = trigonometric form, transform = complex form*.
