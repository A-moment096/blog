---
categories:
- Phase Field
- Mathematics
tags:
- Phase Field
- PF Model
- Note
title: "多相场模型与巨势方程"
description: 关于两个相场方程的笔记
image: ShoujouRei_MikitoP.png
date: 2025-01-05
math: true
---

*记录一下目前使用到的两个相场模型，包括它们的推导，假设和缺陷*

*头图出自 [かとうれい](https://twitter.com/katorei_) 太太， 为 [Mikito P](https://space.bilibili.com/108833238) 所作的 [少女レイ](https://www.bilibili.com/list/ml1197098078?spm_id_from=333.1007.0.0&oid=27304533&bvid=BV1Rs411N7Aq) 的曲绘*

{{< music auto="https://music.163.com/#/song?id=1334077117" loop="none">}}

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

在介绍巨势方程具体的表达式之前，我们先来看一下所谓的“相浓度”和“总浓度”吧。我们知道，对于整个体系而言，其组分数量（元素）是固定的，而一个体系中可能有多个晶粒，而每个晶粒又可能分属不同的相。对不同的相而言，其成分很有可能是不同的。因此，一个组分的浓度在每个相内应该是不变的（不随位置变化），而在整个模拟域内会发生改变（随着相的不同而变化）。另外，浓度的改变是依赖于扩散势的，扩散势梯度会引导浓度进行变化，从高势处流向低势处。因此，相生长过程中浓度的变化可以认为是相浓度不同所导致的相之间扩散势不同所引发的。根据这一点，我们还可以通过演化模拟域内扩散势的变化来间接地模拟浓度的变化。这里我们要介绍的巨势方程，就是这么一个用来模拟扩散势变化的方程。

巨势方程的表达式如下：

$$
\frac{\partial \mu_i}{\partial t} = \left[\phi_\alpha \frac{\partial c_j^\alpha}{\partial \mu_i} \right]^{-1} \left( \nabla\cdot \bar{M}_{jk} \nabla\mu_k + R_j - c_j^\alpha\frac{\partial \phi_\alpha}{\partial t} \right).
$$

我需要解释一下这个方程的记号。首先，和往常相似，$c$ 代表相浓度（即一个相内部的浓度），$\phi$ 代表相。此外，这个公式中的 $\mu$ 代表化学势（严格来讲是巨势，这也是这个方程名称的由来，但为方便理解我们就称为化学势），$M$ 代表浓度的移动性参数， $R$ 代表可能存在的浓度/物质源。再者，这个方程实际上使用了爱因斯坦求和约定，即如果一个乘积中一个指标出现了两次，那么就对这个指标求和。我们举个例子，比如方程右侧圆括号中的最后一项的记号代表的是：

$$
c_j^\alpha\frac{\partial \phi_\alpha}{\partial t} \coloneqq \sum_{\alpha}^{N}c_j^\alpha\frac{\partial \phi_\alpha}{\partial t}.
$$

因此，上面的方程实际上是一个复杂求和。另外，记号中的 $i,j,k$ 都是用以标记元素（组分）的，我们设一共有 $K$ 个组分，所以独立组分一共有 $K-1$ 个（最后一个的量可以用 1 减去其余所有的组分的量），同时 $\alpha,\beta$ 等是用来标记相的，我们设一共有 $N$ 个相。根据我们的记号，上面的公式中如果有某个量没有重复指标（重复指标通常也称为哑指标，dummy index），则说明这个变量实则是代表了一个向量，这个向量根据指标的记号区别有 $N$ 或者 $K-1$ 个分量。而如果一个变量有两个指标，则说明这个变量实则是一个矩阵。我们后文记 $K-1$ 为 $\tilde{K}$ 以方便书写。

最后我们要解释的是中括号和 $-1$ 的上标。这个记号是代表我们先以括号内的元素组成一个矩阵，然后对矩阵求逆。至此方程中的下标记号应该已经全部清晰明了了。

### 方程推导

下面我们来尝试对这个方程进行推导。我们直接从 Cahn-Hilliard 方程出发：

$$
\frac{\partial \tilde{c}_i}{\partial t} = \nabla \cdot \sum_{j}^{\tilde{K}}\nabla M_{ij}\nabla \frac{\delta F}{\delta \tilde{c}_j} + R_i.
$$

这里我们再次对记号做一些解释。这里我们先不使用爱因斯坦求和约定，方便解释方程内部发生了什么，另外这里的 $\tilde{c}_i$ 代表的是体系内的总浓度。我们加上了波浪线是为了强调是整个体系内的总浓度，方便和后面的相浓度做出区分。

由于我们这里使用了总浓度，它实际上可以使用相浓度和相分数来表示：$\tilde c_i = \sum_\alpha^N \phi_\alpha c^\alpha_i$。另外我们知道，$\frac{\delta F}{\delta \tilde{c}_j}$ 实际上是表示的体系内化学势（巨势）。所以我们直接用 $\mu_j$ 来替代。这样就有：

$$
\frac{\partial \sum_\alpha^N \phi_\alpha c^\alpha_i}{\partial t} = \nabla \cdot \sum_{j}^{\tilde{K}}\nabla M_{ij}\nabla \mu_j + R_i.
$$

现在我们把目光聚焦在等式左侧，因为等式右侧，可以看到，其实已经是最终结果的一部分了。对于等式左侧，首先对有限求和而言，求导的线性性保证了我们可以把求导和求和交换次序。然后我们考虑使用对乘积偏导（求导）的规则，则有：

$$
\frac{\partial \sum_\alpha^N \phi_\alpha c^\alpha_i}{\partial t}  = \sum_\alpha^N\left(\phi_\alpha \frac{\partial  c^\alpha_i}{\partial t} + c^\alpha_i \frac{\partial  \phi_\alpha }{\partial t} \right) = \nabla \cdot \sum_{j}^{\tilde{K}}\nabla M_{ij}\nabla \mu_j + R_i.
$$

我们考虑把求和拆开，把含有相分数对时间求偏导的部分挪到等式右侧，则有：

$$
\sum_\alpha^N \phi_\alpha \frac{\partial  c^\alpha_i}{\partial t} = \nabla \cdot \sum_{j}^{\tilde{K}}\nabla M_{ij}\nabla \mu_j + R_i - \sum_\alpha^N c^\alpha_i \frac{\partial  \phi_\alpha }{\partial t} .
$$

接下来是比较关键的一步，我们考虑把浓度和化学势联系起来。即考虑相浓度作为化学势的函数：$c_i^\alpha = c_i^\alpha\left( \mu_1, \mu_2, \cdots, \mu_{\tilde{K}} \right)$。这样我们就可以使用求（偏）导的链式法则，有：

$$
\sum_\alpha^N \phi_\alpha \frac{\partial  c^\alpha_i}{\partial t} = \sum_\alpha^N \phi_\alpha \sum_k^{\tilde{K}}\frac{\partial  c^\alpha_i}{\partial \mu_k}\frac{\partial \mu_k}{\partial t},
$$

然后考虑到对成分求和实际上与相无关，我们把对成分求和的求和号挪到最外面，这样就得到了：

$$
\sum_\alpha^N \phi_\alpha \sum_k^{\tilde{K}}\frac{\partial  c^\alpha_i}{\partial \mu_k}\frac{\partial \mu_k}{\partial t} = \sum_k^{\tilde{K}} \sum_\alpha^N \phi_\alpha \frac{\partial  c^\alpha_i}{\partial \mu_k}\frac{\partial \mu_k}{\partial t}.
$$

我们先在这里暂停一下，回忆矩阵乘法的记号。设我们有两个矩阵，一个 $n\times m$ 矩阵 $A = \{a_{ij}\}$ 和一个 $m\times p$ 矩阵 $B = \{b_{jk}\}$，则它们的乘积矩阵 $C$ 应该是一个 $n \times p$ 矩阵，它的元素可以记为：$\sum_j^m a_{ij}b_{jk}$。另外，我们考察偏导 $\frac{\partial  c^\alpha_i}{\partial \mu_k}$ ，这个偏导在当 $i$ 和 $k$ 都在 $\tilde{K}$ 个元素中取值时，实际上它组成了一个 $\tilde{K} \times \tilde{K}$ 矩阵中的元素。对应的，我们可以把 $\partial \mu_k$ 看作一个具有 $\tilde{K}$ 个分量的向量（或者 $\tilde{K} \times 1$ 的矩阵）。

根据上面的内容，我们可以发现，实际上这里的求和可以写作两个矩阵的乘积（或者矩阵乘以一个向量）。至此我们采用爱因斯坦求和约定，则有：

$$
\sum_k^{\tilde{K}} \sum_\alpha^N \phi_\alpha \frac{\partial  c^\alpha_i}{\partial \mu_k}\frac{\partial \mu_k}{\partial t} \coloneqq \phi_\alpha\frac{\partial  c^\alpha_i}{\partial \mu_k}\frac{\partial \mu_k}{\partial t}.
$$

我们把上面等式右边的三个因子做简单的区分，前两个因子的乘积实际上由于 $\alpha$ 指标重复的原因，代表了一个求和，而后又因为这个求和与第三个因子的 $k$ 指标重复，代表了矩阵的乘法。或者我们可以把 $\sum_\alpha^N \phi_\alpha \frac{\partial  c^\alpha_i}{\partial \mu_k}$ 理解为矩阵中的第 $\left( i,k \right)$ 个元素

那么经过上面的说明，我们将等价变量依次带回，并对整个方程使用爱因斯坦求和约定重写，则有下面的结果：

$$
\phi_\alpha \frac{\partial c_i^\alpha}{\partial \mu_k}\frac{\partial \mu_k}{\partial t} = \nabla\cdot \bar{M}_{ij} \nabla\mu_j + R_i - c_i^\alpha\frac{\partial \phi_\alpha}{\partial t}.
$$

现在我们可以将上式翻译为：一个 $\tilde{K} \times \tilde{K}$ 的矩阵 $\left\{\phi_\alpha \frac{\partial c_i^\alpha}{\partial \mu_k} \right\}$ 与一个 $\tilde{K} \times 1$ 矩阵 $\frac{\partial \mu_k}{\partial t}$ 相乘，得到的结果是三个 $\tilde{K} \times 1$ 矩阵相加。而我们希望的是能够得到演化体系扩散势变化的方程，这正好可以用 $\frac{\partial \mu_k}{\partial t}$ 来表示。所以我们的最后一步就是在等式两边同时左乘上这个 $\tilde{K} \times \tilde{K}$ 矩阵的逆矩阵，得到了：

$$
\frac{\partial \mu_k}{\partial t} = \left[\phi_\alpha \frac{\partial c_i^\alpha}{\partial \mu_k}\right]^{-1}\left(\nabla\cdot \bar{M}_{ij} \nabla\mu_j + R_i - c_i^\alpha\frac{\partial \phi_\alpha}{\partial t}\right).
$$

也许你会发现这个式子和我们一开始给出的式子在下标上有差别。这个实际上是为了公式美观而改变了下标的排列顺序。只要保证公式内部的记号顺序一致，就可以保证公式，或者说矩阵乘法的逻辑顺序一致，因此我们这里得到的结果和上面给出的公式是没有本质区别的。

### 模型解释

我知道，这里其实留了很多的坑，比如说什么是巨势方程里的“巨势”？巨势和化学势有什么关系？为什么非要用化学势/巨势来演化整个体系，用总浓度不好吗？相浓度不行吗？我们来一个个解释这些问题。

首先，巨势是什么呢？我们知道，热力学中有很多不同的热力学函数，比如焓 $H$，熵 $S$，内能 $U$，吉布斯自由能 $G$，亥姆霍兹自由能 $F$ 等等。巨势，又称朗道自由能也是一种热力学函数，其表达式为：

$$
\Omega \coloneqq F-\mu N = U-TS-\mu N,
$$

其中 $F$ 是亥姆霍兹自由能，$U$ 是内能，$T$ 是体系温度，$S$ 是熵，$\mu$ 是化学势，$N$ 是体系内的粒子数。巨势的微分形式为：

$$
\mathrm{d}\Omega = \mathrm{d}U-T\mathrm{d}S-S\mathrm{d}T-\mu\mathrm{d}N-N\mathrm{d}\mu = -P\mathrm{d}V-S\mathrm{d}T-N\mathrm{d}\mu.
$$

巨势在体系达到热力学平衡的时候会取到最小值。当体系内的其余变量 $V$，$T$ 不变时，巨势的变化实际上就反映了化学势的变化。另外我们还可以从这个公式中得到浓度的表达方式：考虑将巨势除以体系的体积得到能量密度，此时 $N$ 将从体系内粒子数量变为体系内的粒子浓度/数密度 $\rho$。假设我们还得到了物质的原子体积 $V_a$，那么浓度 $c$ 就可以表达为：

$$
c = V_a \rho = V_a \left(\frac{\partial \Omega}{\partial \mu}\right)_{V,T}.
$$

据此，我们可以考虑将浓度表达为化学势的函数。这也是前述的浓度能对化学势求导的一个佐证吧。

那么，为什么要用巨势方程呢？它对比总浓度或者相浓度有什么优势呢？我们考虑一个多元多相体系，每个相内部都有多种组元，在相内部这些组元的浓度是固定的，而相与相之间的组元浓度一般是不同的。当发生相变时，相内物质浓度可能会发生变化。在这个情况下，我们如果想演化整个体系的浓度分布情况，就不可避免地必须演化每个相的浓度分布。

我们首先会想到使用相浓度去演化整个体系，这样再将相浓度和相分数相结合就可以得到整个体系内的浓度分布。这个方法从理论上讲很不错，但从实际处理过程中会发生一些数值问题：在相界面处，特别是相分数较小的情况下，不可避免的要用一个数去除以一个非常小的（接近于0）的数字。由于 Cahn-Hilliard 方程是直接对总浓度进行演化的，因此必须先从总浓度中拆分出相浓度才可以直接演化相浓度。从总浓度反推相浓度时，不可避免要处理在界面上的浓度分配，这时必须要借助某种假设来正确地把浓度分配到每个相中。一般采用的假设是假设界面上的每个点上，每个相的化学势都相等。根据这点，总浓度和相浓度的关系可以表达为：

$$
c^i = \sum_\alpha\phi_\alpha c_\alpha^i
$$

这里，相浓度前的 $\phi_\alpha$，相分数，就会引发问题。假设现在需要演化某个很靠近某个相内部的位置（或者说 $\phi_\alpha \approx 1$ 的区域），此时将会有很多别的相的相分数约等于 0。为了演化各自的相浓度，就需要把这个相分数除过去，此时由于计算机精度问题，很容易造成结果不稳定。

那如果直接考虑总浓度呢？总浓度实际上就是最传统的 Cahn-Hilliard 方程，而为了求得相的演化速率，还是需要通过某种方式去推出每个相中的浓度分配问题。这样会增加过多的计算量：反求相浓度的过程实际上是解线性方程组问题。也就是说，使用相浓度，会遇到数值问题，使用总浓度，又会增加很多的计算量，到头来不过是和相浓度方法的先后顺序调换一下，在反求相浓度的时候依旧可能遇到数值问题。

然而，使用扩散势时，这个问题被巧妙地隐藏到了偏导数中。这样相当于用某种方法绕过了这样的数值问题，保持了合理的计算开销。简单来说就是，又快又好。

## 总结

其实很不好意思地说，这篇内容实际上只是对这两个公式做了一些简单的推导，而后面的解释部分我自认为写的并不好。好像所有的解释最后都要归结到一个结论上：好用。这个点实际上在考虑纯理论时是没有什么用处的：我需要精准的理论来描述物理现象，结果你却告诉我 XXX 然后 YYY 最后得到这些东西，它的理论背景可能不够强，但是它好用就够了。我相信这样的解释是很难真正地打动某个人的心的。

然而，好用其实就已经够了，因为这些理论到头来本就是为了能够帮助我们在某个假设的基础上能够更好地做模拟。在这里，这个基础假设可以说是 relaxation ansatz 以及等势假设。首先第一个假设能够让我们的体系从一个非平衡态*演化*到平衡态，而不是只能直接地给出一个平衡态下的数量场，而第二个假设则能够解决相场法中界面上物质分配的问题，让演化能够得以在多相的情况下正常进行下去。这些假设，不论从过程还是结果来看，都是很有必要的。而除了这些假设外，（在不考虑我自己推导过程不够严谨的情况下，）推导过程都是尽可能严谨的。得到的结果，也正如上面所说，好用。

上面这一大段，我希望能传达到的意思就是，这些公式已经在较少的叫宽松的假设的基础上用尽可能严谨的逻辑推导出了可用，好用的结果，那么作为使用这些公式的人来讲，它好用就够了，坚持实用主义也许是更实际的做法。当然了，阅读本段的您也可以认为是我对自己的推导过程没有什么自信的开脱就是了，嘿嘿嘿~

那么最后，祝您生活愉快~