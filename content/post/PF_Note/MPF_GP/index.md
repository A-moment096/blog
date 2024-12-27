---
categories:
- Phase Field
- Mathematics
tags:
- Phase Field
- PF Model
title: "多相场模型与巨势方程"
description: 关于两个方程的笔记
# image: Skadi.png
date: 2024-12-26
math: true
draft: true
---

*记录一下目前使用到的两个相场模型，包括它们的推导，假设和缺陷*

## 简介

目前在做的 U-Nb 体系不连续析出的模拟，里面用到了这两个演化方程。之前一直没有仔细思考过这两个演化方程到底是什么来头，为什么这个体系适合使用这两个方程，导致现在想大概修改一下它们也无从下手。这里就作为笔记记录下这两个方程的推导方法，优缺点，以及我个人的一些看法吧。

## 多相场模型

### 模型介绍

多相场模型（或者说是界面场模型，差不多吧）是适用于非保守场的演化方程，来自于 [I. Steinbach 和 F. Pezzolla 的文章](https://doi.org/10.1016/S0167-2789(99)00129-3)。它的形式为：

$$
\frac{\partial \phi_\alpha}{\partial t} = -\frac{1}{\tilde{N}}\sum_{\beta \neq \alpha} \tilde{L}_{\alpha\beta}\left(\frac{\delta }{\delta \phi_\alpha} - \frac{\delta }{\delta \phi_\beta} \right)F,
$$

这里的 $F$ 是自由能泛函，$\tilde{N}$ 是有效序参量的个数，$\tilde{L}_{\alpha\beta}$ 是有效序参量里两相之间的界面移动参数，而括号内的差则是表示一种算符，即

$$
\left(\frac{\delta }{\delta \phi_\beta} - \frac{\delta }{\delta \phi_\alpha} \right)F = \frac{\delta F}{\delta \phi_\beta} - \frac{\delta F}{\delta \phi_\alpha}.
$$

简单来说，这篇文章考虑了使用界面场来描述不同相之间的界面并且演化，而非使用相自身的序参量作为演化参量。虽然最后还是会落到使用相自身的序参量来演化，但是界面场的思想融入到来这个演化模型中。最主要的改进应该是在考虑界面场的同时，考虑每个点处的有效序参量，也就是不为 0 的相的序参量，这样一来还可以简化计算（虽然实际计算过程中也可以只用传统的所有相的计算就是了）。

平心而论，这篇文章写的逻辑结构并不是非常清晰，公式推导过程更是灾难，甚至符号都有一些问题，但是谁让这个模型好用呢？那就不多讲废话了，直接开始推导这个方程吧。要注意的是，这里的推导过程和作者的推导过程略有出入，同时也参考了 [Q. Huang et al 的这篇文章](https://doi.org/10.1016/j.commatsci.2023.112047)。

### 模型推导

对多相问题而言，我们引入一个约束：每个点上的所有序参量之和为一常数 1。即：

$$
\sum_{\alpha = 1}^{N} \phi_\alpha = 1,
$$

由于对时间求导的线性性，又有：

$$
\sum_{\alpha = 1}^{N} \frac{\partial \phi_\alpha}{\partial t} = 0.
$$

设我们现在已经有一个自由能泛函 $F[\{\phi\},\{\nabla\phi\}]$，其形式为：

$$
F[\{\phi\},\{\nabla\phi\}] = \int_\Omega f\left(\{\phi\},\{\nabla\phi\}\right) \,\mathrm{d}\omega,
$$

即我们写出了其能量密度形式。我们现在希望能把上面引入的约束进一步引入这个能量泛函内，因此我们使用 Lagrange 乘数法，引入 Lagrange 乘数 $\lambda$ 到自由能密度中，则有：

$$
\begin{aligned}
    l \left(\left\{\phi \right\},\left\{\nabla\phi \right\}, \lambda\right)        & = f\left(\left\{\phi \right\},\left\{\nabla\phi \right\}\right) - \lambda\left( \sum_{\alpha = 1}^{N} \phi_\alpha - 1 \right); \\
    \mathcal{L}\left[\left\{\phi \right\},\left\{\nabla\phi \right\}, \lambda\right] &= \int_\Omega l \,\mathrm{d}\omega.
\end{aligned}
$$

然后我们令 $\mathcal{L}$ 对 $\phi_\alpha$ 做变分，得到：

$$
\begin{aligned}
        \frac{\delta \mathcal{L}}{\delta \phi_\alpha} & =  \frac{\partial l}{\partial \phi_\alpha} - \nabla \cdot \frac{\partial l}{\partial \nabla \phi_\alpha}          \\
                                                      & = \frac{\partial f}{\partial \phi_\alpha} - \nabla \cdot \frac{\partial f}{\partial \nabla \phi_\alpha} - \lambda \\
                                                      & = \frac{\delta F}{\delta \phi_\alpha} - \lambda .
    \end{aligned}
$$

此时我们应用所谓的 “Relaxation Ansatz”，即这个变分导数值为 $\phi_\alpha$ 的演化速率，即：

$$
\begin{aligned}
      \frac{\partial \phi_\alpha}{\partial t} &=  -\frac{\delta \mathcal{L}}{\delta \phi_\alpha}\\
      &= -\frac{\delta F}{\delta \phi_\alpha} + \lambda
    \end{aligned}
$$

则根据上面的约束条件，我们能解出 $\lambda$ 为：

$$
    \lambda = \frac{1}{N} \sum_{\alpha = 1}^{N} \frac{\delta F}{\delta \phi_\alpha}
$$

此时将 $\lambda$ 带入应用 “Relaxation Ansatz” 后的变分结果中，得到：

$$
\begin{aligned}
      \frac{\partial \phi_\alpha}{\partial t} &= -\frac{\delta F}{\delta \phi_\alpha} + \frac{1}{N} \sum_{\beta = 1}^{N} \frac{\delta F}{\delta \phi_\beta} \\
      &= -\frac{N-1}{N} \frac{\delta F}{\delta \phi_\alpha} + \frac{1}{N} \sum_{\beta = 1}^{N} \frac{\delta F}{\delta \phi_\beta} - \frac{\delta F}{\delta \phi_\alpha} \\
      &= -\frac{N-1}{N} \frac{\delta F}{\delta \phi_\alpha} + \frac{1}{N} \sum_{\beta \neq \alpha} \frac{\delta F}{\delta \phi_\beta} \\
      &= - \frac{1}{N} \sum_{\beta \neq \alpha} \left( \frac{\delta }{\delta \phi_\alpha} -\frac{\delta }{\delta \phi_\beta} \right)F \\
    \end{aligned}
$$

最后，我们考虑到由于我们只考虑有效序参量，即不为 0 的序参量，这里的 $N$ 可以修改为 $\tilde{N}$；括号内属于对两相间的界面场的驱动力描述，对于不同的两相驱动力，驱动力大小应该是不同的，所以我们给驱动力前面乘以和两相相关的界面移动参数，$\tilde{L}_{\alpha\beta}$。这样一来结果为：

$$
\frac{\partial \phi_\alpha}{\partial t} = -\frac{1}{\tilde{N}}\sum_{\beta \neq \alpha} \tilde{L}_{\alpha\beta}\left(\frac{\delta }{\delta \phi_\alpha} - \frac{\delta }{\delta \phi_\beta} \right)F,
$$

即我们的多相场模型。

### 模型解释

上面的推导过程，在最后一步之前都是比较合理的。然而为什么最后能把 $\tilde{L}_{\alpha\beta}$ 硬生生塞进求和里面呢？也许只能通过物理的角度去尝试解释。这个公式在考虑 “Relaxation Ansatz” 时没有引入移动性的一些参数，比如经典 Allen-Cahn 方程里的移动性矩阵，也是为了方便公式推导，否则会陷入求和地狱，得到的 $\lambda$ 的值会变成：

$$
\lambda = \frac{\sum_\alpha\sum_\beta{}L_{\alpha\beta}\frac{\delta F}{\delta \phi_\beta}}{\sum_\alpha\sum_\beta{}L_{\alpha\beta}},
$$

带入公式后会得到：

$$
\frac{\partial \phi_\alpha}{\partial t} = \frac{\sum_\beta{L_{\alpha\beta}}}{\sum_\xi\sum_\zeta L_{\xi\zeta}}{\sum_\xi\sum_{\zeta\neq\beta} L_{\xi\zeta}\left( \frac{\delta }{\delta \phi_\beta} -\frac{\delta }{\delta \phi_\zeta} \right)F}
$$

虽然严谨，但是难以理解，而当考虑到这里的移动性参数可以直接集成在 $\tilde{L}_{\alpha\beta}$ 和 $\tilde{N}$ 后，整个式子都会变得更简洁，物理意义也更加明确。

另外，在 [I. Steinbach 和 F. Pezzolla 的文章](https://doi.org/10.1016/S0167-2789(99)00129-3) 里，$\left( \frac{\delta }{\delta \phi_\alpha} -\frac{\delta }{\delta \phi_\beta} \right)F$ 被解释为界面场 $\psi_{\alpha\beta}$，这也是为什么这个模型叫做界面场模型。而这篇文章中的推导过程里，如果考虑使用界面场进行推导的话，可以绕过求取 $\lambda$ 的显式表达，因为这个 $\lambda$ 对所有相都是相同的，而界面场这样差值的定义方式注定会消去 $\lambda$ 的影响。

最后，我们指出，这个演化方程并没有对自由能 $F$ 做出任何的约束，因此该模型适用性非常广。事实上，多相场模型的应用极为广泛，经常可以在近年的相场模拟文章中见到。所以，尽管看起来这个模型的推导（在我看来，也许是我的问题）并不足够可靠，但是它很好用。是的，很好用。

## 巨势方程

### 模型介绍

为了演化保守场变量，我们经常需要使用 Cahn-Hilliard 方程。然而，为了得到更好的结果，又或者当我们遇到了一些由演化方程引入的数值上的问题，我们也许需要对这个经典的方程做一些改变，就像上面的 Allen-Cahn 方程和多相场模型之间的关系一样。对于浓度这个最经典的变量而言，我们有总浓度场模型（考虑整个模拟域的浓度），相浓度场模型（考虑每个相内部的物质浓度），以及我们这里要介绍的巨势方程（演化模拟域内的化学势）。

巨势方程的表达式如下：

$$

$$
