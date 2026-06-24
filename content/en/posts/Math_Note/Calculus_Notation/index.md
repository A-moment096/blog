---
categories:
- Mathematics
# - Programming
# - Phase Field
# - Others
tags:
- Calculus
- Notations
- Talk
title: "The Notation of Calculus"
description: A chat about these somewhat chaotic calculus notations
date: 2025-07-24T15:16:10+08:00
image: /images/Postscript.png
math: true
license: 
hidden: false
comments: true
---

*One major characteristic of mathematics is probably its diverse array of symbols. When mathematics is mentioned, everyone can recall all sorts of formulas. Even in my mind, physics can perhaps better showcase its profound mysteries through various formulas. Yet as a logically rigorous discipline, it still cannot do without using various symbols to stand in for various mathematical objects. This article takes just one subfield — **calculus** — and briefly discusses these notations of vastly different styles, to make it easier to engage with literature from different fields.*

*Recently I've really been enjoying Orangesar's "Postscript," and the MV drawn by 夏背 is also very nice. So I'll put both here~ Unfortunately this song requires VIP. If you want to listen freely, try the [Bilibili link](https://www.bilibili.com/video/BV1Qf421q7RA)*

{{<music auto="https://music.163.com/#/song?id=2603846010" loop="none">}}

$$
\gdef\d{\space\mathrm{d}}
\gdef\p{\partial}
\gdef\Del{\nabla}
\gdef\R{\mathbb{R}}
\gdef\pfrac#1#2{\dfrac{\p #1}{\p #2}}
\gdef\ddfrac#1#2{\dfrac{\mathrm{d} #1}{\mathrm{d} #2}}
$$

## The Integral Symbol: Perhaps Chaotic Good?

Although calculus, as a discipline, is logically more reasonable when introduced starting from derivatives and differentials — a point that can perhaps be glimpsed from the name *calculus* (literally "differential-integral" in Chinese) — however, since we are mainly here to chat about the symbols in calculus, and the integral symbol is relatively simpler, let's begin with that.

### The Single Integral Symbol $\int$

Introduced by Leibniz, $\int$ is almost the most common integral symbol, originating from an elongated letter $S$. When it appears alone, it often represents seeking the indefinite integral of an expression, i.e., finding the antiderivative of the expression. When a region needs to be specified, it is customary to write upper and lower limits on the definite integral of a univariate function to express the region of integration. This symbol is not necessarily only used for univariate functions: it can represent a *line integral*, and when expressing an integral in a general context, this symbol can also be used. In that case, the region of integration is a set in a general sense, placed as a subscript on the integral symbol to indicate the region of integration.

Let's give a few examples. For instance, our beloved ordinary indefinite integral:

$$
\int f(x) \d x,
$$

It is saying that we are trying to find the antiderivative of $f(x)$, i.e., trying to find a **family of functions** $F(x)$ such that its derivative is $f(x)$. And below is an example of a definite integral:

$$
\int_0^{\pi} \sin (x) \d x,
$$

It is computing the integral of $\sin (x)$ over the interval $(0,\pi)$. We could also say it is the integral over the interval $[0,\pi]$ — this depends on your view of integrals. Due to the continuity of $\sin(x)$, these two integrals are equivalent. Let's seize the *one-dimensional* characteristic, and thus we can consider integrating over a *one-dimensional manifold* (oh my, can I really say that?), that is, a general curve:

$$
\int_l f \d s,
$$

Here $l$ naturally represents the region of integration, a curve, and $\d s$ is what is called the *line element* of the integral. We won't go into the specific method of computation here. Because a curve is one-dimensional (should be called intrinsic dimension, right?), we can directly view the integral over this curve as simply the integral of a parametric function, so using such an integral symbol is completely reasonable. Let me plant a small pitfall here: why use $f$ instead of $f(x)$ or $f(s)$ or something like that as the integrand. We'll talk about this later.

And when you have a function of unclear dimensionality, or a multiple (definite) integral in a general sense, you will also use this integral symbol, as in:

$$
    \int_{\Omega} f({\bf x}) \d^n {\bf x}
$$

This is saying: given an $n$-variable function $f({\bf x})$, integrate it over the region $\Omega$. Here there are a few key points: first, the $\d^n {\bf x}$ appearing at the end indicating the variable of integration should be

$$
\d x_1 \wedge\mathrm{d} x_2 \dots \wedge\mathrm{d} x_n
$$

abbreviated. Let's set aside the "$\wedge$" symbol for now — what the string above means is one differential element of the integration region $\Omega$. From a slightly more physical perspective, it represents a tiny volume. Furthermore, we generally consider $\Omega$ to be an open set:

$$
\Omega \subseteq \R^n .
$$

However, in less rigorous contexts, we might consider using $\d v$ to represent a *volume element*, and $V$ to denote the integration region. In this way, we can analogize this integral to "finding area," extending it to "finding volume" or "finding mass," making it easier to understand. For a multivariate function, ${\bf x}$ is generally understood as a position vector — this approach is more modern, but even understanding it as depending on $n$ elements rather than on an $n$-dimensional vector is fine. There shouldn't be any difference in the conclusion.

Concerning this symbol, let's pause here for now, because there are several other quite common integral symbols:

### Multiple Integral Symbols and Contour Integral Symbols

We often also encounter symbols for multiple integrals, such as $\iint$, $\iiint$, etc. Sometimes we also see such integral symbols with a small circle in the middle, representing integration over a closed region: $\oint$, $\oiint$, etc. Let's first look at multiple integrals.

The symbols representing multiple integrals are relatively clear in meaning, because however many $\int$ symbols appear to the eye, that's how many iterated integrals it represents. Since higher-dimensional spaces no longer have the concept of an *interval*, generally speaking, the integration region for multiple integrals is directly written beneath the integral symbol, expressed using a single symbol. For example:

$$
\iint\limits_{A} f(x,y) \d x\wedge\mathrm{d} y ,
$$

where $A$ represents a two-dimensional integration region. Some places also express the integration region directly through inequalities written below the integral symbol, like

$$
\iint\limits_{\substack{0\lt x\lt 1\\ y\gt x}} f(x,y) \d x\d y
$$

which means the integration region of this function is a small right triangle. However, I personally dislike this expression — it looks messy.

It should be noted that multiple integrals $\neq$ integrating multiple times, at least one cannot directly draw an equality. However, in general application processes, nobody cares about proving the equivalence of the two... Even if you omit the wedge product symbol (i.e., that $\wedge$), or even treat it as multiplication, nobody will bother you. We'll complain about this later.

Integrals over closed regions are actually nothing special — it's just reminding the reader that the integration region is a closed region. The *closed* mentioned here should be understood as "the shape is closed," distinct from the mathematical concept of a *closed interval*. In a more nerdy way of speaking, this "closed" means that the shape is the boundary of some figure. Anyway, intuitively it means it's like a loop, or a balloon, something like that (roughly). For example, $\oint$ means the integration region should be a closed curve, while $\oiint$ is a closed surface, like a balloon. Correspondingly, the integration element is also a line element or surface element — we won't elaborate further here.

### It's an Integral, but Not an Elongated $S$

Besides the common above-mentioned use of an elongated $S$ to denote integration, there is another less common branch, namely using an operator to denote integration — i.e., using the symbol $D^{-1}$ to highlight that integration is the inverse operation of differentiation[^1] (naturally, $D$ is then used as the differentiation operator). Such notation might be encountered in more algebra-oriented disciplines, or in differential equations. After all, this symbol is very concise, and compared to $\int$, it is more readily accepted as an operator. And indeed that is the case: integration is something that can be understood as taking a function as input and outputting a real number / a family of functions (depending on whether it's a definite or indefinite integral). Regarding this symbol, let's stop here for now.

### No $\mathrm{d} x$ — Is That Right?

I think nearly everyone learning calculus for the first time has had this question: isn't the $\int$ symbol enough to show that this is an integral? Why must there be that tail of $\d x$ at the end?! Then with subsequent study — like substitution methods, multiple integrals, and after seeing cases where variables other than the integration variable appear in the function — one mentally accepts this way of writing it. After all, isn't it nice to specify which variable this integral is with respect to? And then one regards the notation with only $\int$ and without the trailing $\d x$ as a shorthand. This is nearly how most people view the integral symbol.

But, can we legally and properly drop the trailing $\d x$? After all, it's a differential! Why must the differential be placed together with the integral symbol? This question might find a reasonable answer under Lebesgue integration or in the theory of differentiable manifolds, but what if we are only discussing Riemann integration?

The good news is, [Professor Yu Pin's Mathematical Analysis lecture notes](https://www.bananaspace.org/wiki/%E8%AE%B2%E4%B9%89:%E6%95%B0%E5%AD%A6%E5%88%86%E6%9E%90) do not use the traditional $\int f(x) \d x$ notation; instead, they adopt $\int f$ as the notation for the integral. Here is how it's done: consider $\int_I$ as a mapping defined on the **set of Riemann-integrable functions $\mathcal{R}(I)$** to the real number field. Then for any Riemann-integrable function $f \in \mathcal{R}(I)$, we can legitimately write $\int_I f$, and call it the integral of $f$.

Unfortunately, we don't plan to delve into these technical details here; we're just introducing these mathematical symbols. But if you're interested, Professor Yu Pin's lecture notes are excellent and well worth a look. On this topic, you can refer to [18. The Definition of the Riemann Integral](https://www.bananaspace.org/wiki/%E8%AE%B2%E4%B9%89:%E6%95%B0%E5%AD%A6%E5%88%86%E6%9E%90/Riemann_%E7%A7%AF%E5%88%86%E7%9A%84%E5%AE%9A%E4%B9%89). Besides Professor Yu Pin's textbook handling it this way, Terence Tao's *Analysis* also adopts the approach of not using $\d x$ in integrals. You can check it out if interested.

## Derivatives: Chaotic Evil!

Having discussed integrals, whose symbolic form is relatively simple, let's now look at the diverse and somewhat chaotic differentiation notations. The chaos is mainly because many mathematicians invented their own differentiation notations. So, let's simply take different mathematicians as our axis and introduce these notations.

### Leibniz: Unintentional Invention, Mysterious Implications

Let's first look at the notation introduced by Leibniz:

$$
\ddfrac{f(x)}{x},
$$

For higher-order derivatives, it is:

$$
\ddfrac{^nf(x)}{x^n}.
$$

This notation is perhaps the most familiar in advanced mathematics. It clearly indicates which function above is being differentiated with respect to which independent variable below, and the order of differentiation. It also nicely captures the relationship between differentiation and differentials — a point that Leibniz probably did not anticipate at first. However, we still shouldn't directly interpret the derivative as "one thing, divided by another thing," even though many theorems/laws still work normally under such an interpretation — one still shouldn't do that.

However, we can of course use this method as a mnemonic, can't we? For example, the derivative of a composite function $g(f(x))$, obtained using the chain rule:

$$
\ddfrac{g(f(x))}{x} = \ddfrac{g(f(x))}{f(x)} \ddfrac{f(x)}{x},
$$

Or we can adopt a more "reader-friendly" form, letting $f(x) = y$, giving:

$$
\begin{align*}
\ddfrac{g(f(x))}{x} &= \ddfrac{g(y)}{x} \\
                    &= \ddfrac{g(y)}{y} \ddfrac{y}{x} \\
                    &= \ddfrac{g(y)}{y} \ddfrac{f(x)}{x}, 
\end{align*}
$$

I have to say, it really looks like simply breaking a division expression into two divisions multiplied together.

However, this notation might cause some misunderstandings: why isn't it $\d f(x) ^n$ "divided by" $\d x^n$? What exactly is the connection between it and the differential? Why $\d x^n$ and not $\d^n x$? When I was learning calculus, this was also a question that troubled me for a long time.

To explain this issue, let's first answer what was mentioned earlier: why one cannot interpret the derivative as "one thing divided by another thing." You may have seen the following differentiation notation:

$$
\ddfrac{}{x} f(x)
$$

This also represents the derivative of $f(x)$, and it is perhaps the notation that best meets the requirement of "rigor." Because in this notation, we can more clearly see that $\ddfrac{}{x}$ is a whole! And we can better describe what this notation is doing: we have performed the operation of differentiation on a function $f(x)$ (acting $\ddfrac{}{x}$ on the left). From this perspective, why higher-order derivatives are $\ddfrac{^nf(x)}{x^n}$ can also be well explained, because we can write:

$$
\ddfrac{^nf(x)}{x^n} = \ddfrac{^n}{x^n} f(x) = \left(\ddfrac{}{x}\right)^n f(x),
$$

That is, we *act $\ddfrac{}{x}$ on a function $f(x)$ multiple times*.

In fact, this is already explaining the process from the perspective of an **operator**. And precisely because $\ddfrac{}{x}$ is a complete operator, we cannot separately split it apart and represent it as the division of two differentials. This is not the only way to represent an operator, but its details are rich, and when it's necessary to display all the computational details, I really like using this notation. However, we don't always need to display all the details; at such times, Leibniz's notation seems very verbose. This brings us to another very popular differentiation notation: Lagrange's notation.

### Lagrange: The Beauty of Brevity

The notation introduced by Lagrange — $f'(x)$, $f''(x)$, and $f^{(n)}(x)$ — is also widely used. This notation is almost neck and neck with Leibniz's notation in popularity, but Lagrange's notation wins out in its concise and clear form. However, because Lagrange's notation is so deeply ingrained, if one wishes to give a notation to a function related to but actually different from $f$, it is out of the question to consider $f'(x)$, which is already broadly accepted as a derivative notation. One can only consider adding a little hat on top: $\hat{f}(x)$, or a bar: $\bar{f}(x)$, and so on.

The place where Lagrange's notation is most commonly seen is probably in various differential equations. Since in differential equations, the variable of differentiation is usually very clearly given, Lagrange's notation is easier to write and does not cause ambiguity compared to Leibniz's notation. Moreover, when the context is clear, this notation is indeed very convenient to write. If I wanted to explain something involving derivatives but not requiring too much detail about the derivatives to someone, I would be more inclined to write this notation. However, if it's for writing an article, this notation might still take a back seat.

Speaking of brevity, Lagrange's notation is indeed good, but it is not the only one — one that was, however, not so lucky.

### Newton: The Legacy of Physics

As a mathematician who co-founded calculus with Leibniz, Newton's notation seems somewhat niche. He used dots to represent differentiation: $\dot{f}(x)$ for the first derivative, $\ddot{f}(x)$ for the second derivative. But this notation does not have a good method for representing the $n$-th derivative; higher-order derivatives also appear exceptionally bloated: simply piling on dots. In some older literature, one can typically see functions covered with dots, and to determine which order of derivative it is, one needs to count them one by one. In contrast, Lagrange's approach is much smarter — directly using a number to represent it, very simple and clear.

However, due to Newton's nearly foundational status in the field of modern physics, this notation is still widely used in physics and related fields. People today continue the meaning Newton envisioned when he introduced this notation: differentiation with respect to time (i.e., what Newton called *fluxions* when he invented calculus). One dot is the first derivative with respect to time, two dots the second derivative. Since physics doesn't often encounter higher-order time derivatives, this notation still seems quite decent.

For example, in the calculus of variations commonly used in physics, specifically in the Euler-Lagrange equation, there is a somewhat peculiar practice, namely taking the derivative of a variable's derivative. For specifics, you can also refer to previously written content on the [introduction to the Euler-Lagrange equation](/posts/PF_Tutorial/pf_tutorial_1/index.md#euler-lagrange-方程) or this [article on the calculus of variations](Functional_Derivative/index.md). For instance, consider a mechanical system whose state can be determined by the positions of the particles in the system and their velocities. We can then write its Lagrangian:

$$
L = L(q,v,t),
$$

And if we use Newton's notation, it can be written as:

$$
L = L(q,\dot{q},t),
$$

This nicely captures the relationship between position and velocity. Most importantly, compared to writing $\ddfrac{q}{t}$ or $q'$, this notation very well expresses that it is differentiation with respect to time. Furthermore, it also makes the expression of the Euler-Lagrange equation very concise, allowing it to be written in the following form:

$$
\frac{\partial L}{\partial q}-\frac{\mathrm{d} }{\mathrm{d} t}\frac{\partial L}{\partial \dot{q}} = 0.
$$

One can only say that Sir Newton had good intentions, and later mathematicians/physicists have carried them out well.

### Euler: The Operationalization of Differentiation

Another great mathematician, Euler, also introduced a notation, using $D$ to represent the differentiation of a function. This is the inverse operator of the integral operator, $D^{-1}$, mentioned above. It has operator-like characteristics: the first derivative is $D f$, the second derivative is $D^2 f$, and higher-order derivatives are naturally denoted as $D^n f$. Precisely because of these operator-like characteristics, this notation is now widely used in the field of functional analysis.

Furthermore, with the help of such notation, we can even perform algebraic manipulations on the differentiation operator. For example, the familiar second-order ordinary differential equation can be "mnemonically" treated in a principled way using operator form. For instance:

$$
ay'' + by' + cy  = 0
$$

This kind of second-order homogeneous linear differential equation can be broken down into operator form:

$$
(aD^2 + bD + c)y = 0,
$$

Doesn't the extracted operator form bear some resemblance to the so-called characteristic equation? That's right — solving this differential equation is actually equivalent to finding the eigenfunctions (analogous to eigenvalues) of the operator inside the parentheses.

Centered around this operator, we can even derive many other very interesting discussions, such as the so-called "commutator" in quantum mechanics, or discussions of "the relationship between position and momentum," etc. Someone on Bilibili has shared a video about [the derivative of differentiation](https://www.bilibili.com/video/BV1CdNDz1EcB/), which is quite interesting and involves some viewpoints that regard derivatives as operators — worth checking out if interested. Also, consulting [Wikipedia](https://en.wikipedia.org/wiki/Differential_operator), one can see there is yet another way to write operators: $\partial_x$. This way of writing is occasionally seen in partial differential equations, though it is generally not very common — or maybe it's just that I rarely encounter differential equations?

### Jacobi: Multivariate Functions and Matrices

However, looking at the several notations above, not a single one considered the case of multivariate functions. In response to this issue, the first to introduce notation was Jacobi. He introduced four kinds of notation to represent different derivatives:

- For partial derivatives, use $\pfrac{f(x,y,\dots)}{x}$, $\pfrac{^nf(x,y,\dots)}{x^{m}\p y^{n-m}}$ — notation similar to Leibniz's;
- To abbreviate the above notation, he introduced $f_x = \pfrac{f(x,y,\dots)}{x}$, $f_{xy} = \pfrac{^2f(x,y,\dots)}{x\p y}$ — such notation;
- To express the derivative of vector-valued functions, he introduced the Jacobian matrix and Jacobian determinant to denote first-order derivatives. The notation for the Jacobian matrix of a multivariate function is $\mathbf{J}_\mathbf{f(x)} = \dfrac{\p(f_1,\dots,f_m)}{\p(x_1,\dots,x_n)}$;
- To express the second-order total derivative of multivariate functions, he introduced the Hessian matrix, denoted $\mathbf{H}_f$, with matrix elements $(\mathbf{H}_f)_{i,j} = \pfrac{^2f(x)}{x_i\p y_j}$.

These symbols have greatly enriched the expression of multivariate functions. It's no exaggeration to say that without these notations, research on multivariate functions would take ages just writing out the words. Most importantly, the **matrix** form very well illustrates the linearity of the operation of differentiation. When I first learned that the total derivative of a bivariate function is a matrix, and that it represents the tangent plane at a point, I was somewhat awestruck. For specifics, one can refer to the famous *Baby Rudin*, i.e., *Principles of Mathematical Analysis* by Walter Rudin. [I learned this from that book](/posts/Book_Review/Baby_Ruding/index.md).

Additionally, as mentioned above, Leibniz's notation has a corresponding operator version, and Jacobi's notations also have their own operator version, written in the form $\pfrac{}{x}$. The advantages of this form are similar to those of Leibniz's notation, which we won't elaborate on further here. However, it's worth mentioning that due to the study of the connection between higher-dimensional geometric objects and calculus in the theory of differentiable manifolds / differential geometry, this notation for partial derivatives, which preserves the operator nature, is heavily used in these two disciplines, and has even gone beyond merely expressing ordinary partial derivatives. For example, *tangent vectors*, abstracted from partial derivatives / directional derivatives, are directly denoted using such partial derivative notation.

### Perhaps Done by Domestic Textbooks? But Very Frustrating...

The study of multivariate functions in calculus is not merely a matter of having a few more dependent variables. Considering the case of multivariate composite functions, when we take (partial) derivatives of a multivariate function, we must consider all variables. This introduces enormous complexity into the differentiation of multivariate functions. Precisely for this reason, carelessness with the notation during differentiation will cause great ambiguity.

For instance, consider such a function: $f(u(x,y),x,y)$, where $x$ and $y$ are independent, and $u$ depends on these two variables. Suppose we now wish to find the partial derivative of $f$ with respect to $x$. How should we do it? By the differentiation rules for multivariate functions and the chain rule, we should write:

$$
\pfrac{f(u(x,y),x,y)}{x} = \pfrac{f}{u}\pfrac{u}{x} + \pfrac{f}{x}
$$

Wait a minute, is this right? If a beginner tries to write this problem, wouldn't they end up canceling the $\pfrac{f}{x}$ on both sides, finally obtaining an equation $\pfrac{f}{u}\pfrac{u}{x} = 0$? This is clearly problematic, and such ambiguity mainly arises because, when we try to differentiate a multivariate function, we are first differentiating with respect to **a position**, not with respect to a **variable**. So the second part of the above equation should be trying to express that this function needs to take the partial derivative with respect to the second position.

To resolve such ambiguity — perhaps a special offering of domestic textbooks — we use $f'$ with subscript numbers to indicate "differentiation with respect to which position number." For example, writing $f'_1(u(x,y),x,y)$ to stand for differentiation with respect to "position number one." Sometimes, the prime may even be omitted. In this way, the above expression can be written as:

$$
\pfrac{f(u(x,y),x,y)}{x} = f'_1 \pfrac{u}{x} + f'_2\pfrac{x}{x} = f'_1 \pfrac{u}{x} + f'_2
$$

This can be considered a way to solve the problem. But actually, a better method is to distinguish between functions and variables, for example, initially denoting the functions as:

$$
\begin{align*}
w = f(g(x,y),x,y)\\
u = g(x,y)
\end{align*}
$$

And writing the partial derivative as:

$$
\pfrac{w}{x} = \pfrac{f}{u}\pfrac{u}{x} + \pfrac{f}{x},
$$

This can also effectively avoid ambiguity, but explaining this process becomes rather complicated. We must first clarify one point: when we perform differentiation, there are two levels of differentiation:

- Differentiating with respect to *the function itself* — finding the derivative of this function with respect to some variable, such as $\pfrac{w}{x}$ or $\pfrac{u}{x}$ here;
- Differentiating with respect to *the function rule* — which is actually applying the differentiation formula, purely formal differentiation, such as $\pfrac{f}{u}$ and $\pfrac{f}{x}$ here.

When we apply differentiation rules, our goal is to differentiate the function itself, while the computational process mechanically uses purely symbolic fill-in-the-blanks rules to fill in the contents. Then in concrete calculation, we try not to expand expressions as much as possible — for example, when computing $\pfrac{f}{u}$, treat $x$ and $y$ as non-variables for the computation, and when computing $\pfrac{f}{x}$, treat $u$ and $y$ as non-variables for the computation.

But overall, it is still terribly confusing...

### A Small Summary

As can be seen, the notation for derivatives is truly chaotic. Almost every field has its own way of writing. A moment's carelessness can cause ambiguity (yes, I'm looking at you, multivariate differentiation). Perhaps before discussing the calculus of multivariate functions, it would be best to first stipulate an unambiguous notational standard? Then what about problem sets? Truly agonizing... Chaotic Evil, well-deserved!

## Differential Notation: Neutral Good

After seeing those headache-inducing symbols above, let's look at something a bit more relaxed. The differential notation is one of the few symbols on which almost everyone agrees — all choose to use a simple $\d\ $ to express the differential...

### Upright vs. Italic

Wait a moment, is that really so? Isn't this the upright $\d\ $? Why do many places (including Wikipedia) directly use $d$?

This is yet another hair-pulling story. In fact, mathematical symbols in many places are supposed to be written in upright type. For instance, trigonometric functions should use $\sin$, $\cos$, $\tan$ — this kind. Meanwhile, writing $sin$, $cos$, $tan$ is nonstandard. The differential operator is no exception: $\d\,$ should be the more standard way of writing. However, the AMS stepped in: in the AMS standards, places where differentials appear should be written in *italics*! So you can see many places, following AMS standards, writing italic $d$ instead of upright $\d$.

But some authors still disagree with this way of writing. For example, the famous Zorich's *Mathematical Analysis* adopts the upright way of writing. So perhaps this symbol mainly depends on the author's preference. Of course, you can tell that I support the upright way of writing. After all, an italic $d$ looks more like a variable, doesn't it?

### Can Differentials Be Directly Multiplied?

Another point that might be slightly ambiguous lies in the question of "whether differentials can be multiplied." This issue perhaps mainly comes from the integral side: we often see iterated integrals written as integrating a function multiple times. For example, what you might frequently see:

$$
\iiint\limits_{V} f(x,y,z) \d v = \int_{x_1}^{x_2} \int_{y_1}^{y_2} \int_{z_1}^{z_2} f(x,y,z) \d x \mathrm{d} y\mathrm{d} z
$$

This way of writing is fine, but the key point is that writing the form below is not very rigorous:

$$
\iiint\limits_{V} f(x,y,z)\d x \mathrm{d} y \mathrm{d} z.
$$

This is because a multivariate function cannot be matched with a one-dimensional differential element. Such a way of writing has a bit of a square-peg-in-a-round-hole feel. So what is the correct way to write it? One should adopt the *wedge product* notation that we used when introducing the integral symbol above, namely:

$$
\iiint\limits_{V} f(x,y,z)\d x \wedge\mathrm{d} y\wedge\mathrm{d} z.
$$

What sort of thing is this wedge product? We won't introduce it in too much detail, but what can be said is that the wedge product is an operation among differentials that can combine low-order differentials, making them into higher-order differentials. As done here, connecting three differentials using the wedge product yields a third-order differential. In this way, it can be matched with a three-variable function, and a triple integral can be performed. If interested in this issue, one can refer to textbooks on mathematical analysis or on differentiable manifolds. The texts will provide detailed explanations, from an algebraic level, of "what exactly a differential is."

However, if you ask me how I express a multiple integral in less rigorous contexts on a daily basis? Then I probably also lazily omit this wedge product symbol. After all, context explains everything — one must trust the reader's reading ability, right? (*flees*)

## Afterword

First of all, I want to thank my group chat friend [Harviiiii](https://github.com/Har-W) for the opinions and suggestions provided for this article. Thank you~!

This short article was inspired by problems from equations I encountered while learning the finite element method. I can no longer recall the specific content clearly, but roughly it was that I had a doubt about some symbol, and then just like this, got to the bottom of it. To be honest, very few people have such big doubts about symbols, especially the calculus notation commonly used in engineering, or have such high requirements for its rigor. After all, when it is "calculus" rather than "analysis," mathematics is more like a tool — usability is the top priority.

However, the process of exploring these symbols was also quite interesting, right? And perhaps, maybe some reviewer might think more highly of me because my use of notation is relatively standard? Hahaha.

Another supplementary point: this article deliberately conceals a very large pitfall. I wonder if you, the reader who has reached this point, have noticed it. That is: which symbol exactly is the function? For example, $y = f(x)$ — in this expression, which part is the so-called function? $y$? $f$? $f(x)$? Which symbol should we ultimately use to write the differential/integral of a function? And, at the end of the day, the concept of *function* itself — there seem to be many different views on it, too? Is it a general mapping? A special mapping? Is it a func**number**?

OMG, this topic, to be honest, can serve as yet another blog post for me. So, until we meet again — who knows, maybe a casual talk about the all-too-common mathematical object called the **function** will be written soon?

Then finally, as always, I wish you good health, a happy mind, and a wonderful day~

[^1]: What is the inverse operation of integration? This depends on what kind of integral it is: if it's an indefinite integral, then it should be the operation of differentiation; and if it refers to a definite integral, then it should be the operation of taking the differential. Let's not dwell on this issue here; perhaps this pitfall will be filled in later?
