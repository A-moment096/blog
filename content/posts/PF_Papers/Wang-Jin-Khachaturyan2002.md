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
title: 文献阅读 - Wang-Jin-Khachaturyan2002
description: Phase field microelasticity theory and modeling of elastically and structurally inhomogeneous solid
date: 2025-11-15T23:25:19+08:00
image: posts/PF_Papers/Nev_Alice-2.jpg
math: true
hidden: false
comments: true
draft: true
---

*这篇文章算是他们三个人的工作的总结，发在了 J. Appl. Phys. 上，我其实很早就看过这篇，但是当时看得匆忙，一知半解，这次仔细看看*

*图图还是 [**Neve_AI**](https://x.com/Neve_AI) 绘制的 AI 图来的，歪头银发小妹妹真的好可爱呀~~*

$$
\gdef\misfit#1{\varepsilon_{#1}^0(\mathbf{r})}
\gdef\eigen#1{\varepsilon_{#1}^*0*(\mathbf{r})}
\gdef\avee#1{\overline{\varepsilon}_{#1}}
\gdef\dd{\mathrm{d}}
\gdef\Cr#1{C_{#1}(\mathbf{r})}
$$

## 背景介绍

其实和上一篇文章差不多，都是介绍了弹性力学中非均匀变形问题的解决困难大，而使用相场法与 KS 理论就可以巧妙地解决这个问题，实现对这类问题的数值求解。不过这篇文章对理论的阐述更加详细、且给出了使用傅里叶谱方法求解的方式。

## 等效应力应变下的弹性非均匀系统的平衡方程

考虑均匀的各向异性弹性系统，它和非均匀弹性系统有同样的形状和大小，但是内部存在非均匀的错配无应力的应变（所谓的 **本征应变** ）。本征应变在宏观上是非均匀的，但宏观上是均匀的。我们用 $\varepsilon_{ij}^0(\mathbf{r})$ 来标记这个应变。由 KS 理论可以给出用本征应变表达的弹性应变以及弹性能。

### 弹性均匀系统中任意无应力应变分布对应的应变能泛函

由于宏观上本征应变是均匀的，我们可以用平均应变来表示：

$$
\overline\varepsilon_{ij} = \frac{1}{V}\int_V \varepsilon_{ij}(\mathbf{r})\ \dd^3 {r},
$$

弹性能由 KS 理论可得：

$$
\begin{align*}
  E^{\mathrm{el}} = &\frac{1}{2}\int_V C_{ijkl}^0 \misfit{ij}\misfit{kl}\dd^3 r \\ &- \avee{ij}\int_V C_{ijkl}^0 \misfit{kl}\dd^3 r + \frac{V}{2}C_{ijkl}^0 \avee{ij}\avee{kl} \\ &- \frac{1}{2}\tilde{\int}\frac{\dd^3 k}{(2\pi)^3}n_i \tilde{\sigma}_{ij}^0(\mathbf{k})\Omega_{jk}(\mathbf{n})\tilde{\sigma}_{kl}^0(\mathbf{k})^* n_l,
\end{align*}
$$

依旧，这里的 $\tilde{\int}$ 代表在去掉 $\mathbf{k} = \mathbf{0}$ 处 $(2\pi)^3/V$ 的倒空间体积后，在倒空间中的积分，而 $\mathbf{n} = \mathbf{k}/k$ 还是倒空间中点的方向。而 $\Omega_{ij}(\mathbf{n})$ 是格林方程张量，是 $\Omega^{-1}_{ij}(C^0_{ijkl}n_kn_l)$ 的逆张量。这里的 $C_{ijkl}^0$ 是弹性模量，可以把倒空间中的弹性应力和应变通过它连接起来，即 $\tilde{\sigma}_{ij}^{o}(\mathbf{k}) = C_{ijkl}\,\tilde{\varepsilon}_{kl}^{o}(\mathbf{k})$。公式中倒空间应力的星号代表复共轭。这个形式的自由能适用于应变控制下的边界条件。

在 KS 理论下的等效应变则可以用本征应变表达为：

$$
\begin{align*}
\varepsilon_{ij}(\mathbf{r}) &= \overline{\varepsilon}_{ij} + \frac{1}{2}\tilde\int\frac{d^3k}{(2\pi)^3}\,[\,n_i\Omega_{jk}(\mathbf{n})+n_j\Omega_{ik}(\mathbf{n})\,]\,
\tilde{\sigma}^0_{kl}(\mathbf{k})\,n_l\,e^{i\mathbf{k}\cdot\mathbf{r}}.
\end{align*}
$$

上面的能量泛函以及应变对宏观均匀体系都是使用的，而宏观尺度的体系一般都是显著大于用错配应变 $\misfit{ij}$ 表征的介观尺度的。

### 非均匀体系中的弹性平衡方程

接下来考虑各向异性的弹性非均匀系统。它的弹性模量，由于弹性非均匀性，表达为 $\Cr{ijkl}$，结构非均匀性通过本征应变表示出来：$\eigen{ij}$。而体系的模量可以分成弹性模量部分以及模量因为非均匀性发生的变化，即：

$$
\begin{align*}
C_{ijkl}(\mathbf{r}) &= C^{0}_{ijkl} - \Delta C_{ijkl}(\mathbf{r}),
\end{align*}
$$

我们考虑体系被约束，其宏观变形是固定的且值为 $\avee{ij}$，这样的约束就造成了应变场 $\varepsilon_{ij}(\mathbf{r})$，因为弹性和结构都是非均匀的，这个应变场也是非均匀的。此时，应变与应力依旧可以通过胡克定律联系起来：

$$
\begin{align*}
\sigma_{ij}(\mathbf{r}) &= C_{ijkl}(\mathbf{r})\big[\varepsilon_{kl}(\mathbf{r}) - \varepsilon_{kl}^*(\mathbf{r})\big],
\end{align*}
$$

而且在体系静态时，满足静力平衡条件：

$$
\begin{align*}
\frac{\partial \sigma_{ij}(\mathbf{r})}{\partial r_j} &= 0
\end{align*}
$$

那么将上面的内容组合并整理，就得到了：

$$
\begin{align*}
& C^{0}_{ijk\ell}\,\frac{\partial \varepsilon_{kl}(\mathbf{r})}{\partial r_{j}}
\;=\;
\frac{\partial}{\partial r_{j}}\big\{\,C^{0}_{ijkl}\,\varepsilon^{*}_{kl}(\mathbf{r})
+\Delta C_{ijkl}(\mathbf{r})\,[\,\varepsilon_{kl}(\mathbf{r})-\varepsilon^{*}_{kl}(\mathbf{r})\,]\,\big\}.
\end{align*}
$$

对于应变，我们故伎重施，可以分成均匀部分 $\overline{\varepsilon}_{ij}(\mathbf{r})$ 和非均匀的部分 $e_{ij}(\mathbf{r})$：

$$
\begin{align*}
\varepsilon_{ij}(\mathbf{r}) &= \bar{\varepsilon}_{ij} + e_{ij}(\mathbf{r}),
\end{align*}
$$

而非均匀部分又可以通过位移向量 $\mathbf{v(r)}$ 得到：

$$
\begin{align*}
e_{ij}(\mathbf{r}) &= \tfrac{1}{2}\left[\frac{\partial v_i(\mathbf{r})}{\partial r_j} + \frac{\partial v_j(\mathbf{r})}{\partial r_i}\right]
\end{align*}
$$

由于体系在宏观上被限制，在表面区域有 $\mathbf{v}(\mathbf{r}^S) = 0$，这在介观尺寸下是合理的：介观尺寸的大小可以认为是远小于整个理论考虑的宏观尺寸的大小的。对于宏观均匀受控体系它边界上的总位移为 $\overline{\varepsilon}_{ij}r^S_j$。

将上面关于总应变的两个公式带入上面改写后的力学平衡表达式，可以得到：

$$
\begin{align*}
C^{0}_{ijkl}\,\frac{\partial^{2} v_{k}(\mathbf r)}{\partial r_{j}\partial r_{l}}
&= \frac{\partial}{\partial r_{j}}\big\{C^{0}_{ijkl}\,\varepsilon^{*}_{kl}(\mathbf r)\big\}
+ \Delta C_{ijkl}(\mathbf r)\big[\varepsilon_{kl}(\mathbf r)-\varepsilon^{*}_{kl}(\mathbf r)\big].
\end{align*}
$$

为简化模型，我们考虑体系表面处被包裹了一层无限小的材料，其模量为弹性模量 $C_{ijkl}^0$。这样的处理能够简化这个问题：原来边界上的材料模量、法向量等不需要单独描述，可以和材料体内部一同描述。另外我们进一步假设材料表面是没有结构不均匀存在，这样我们就有 $\varepsilon^{*}_{ij}\big(\mathbf{r}^s\big)=0$，即界面上没有本征应变。这样我们就能想办法求出位移场 $\mathbf{v}(\mathbf{r}^S)$ 来，具体地说，我们会把上面的公式做傅里叶变换，然后把边界上没有位移、没有本征应变、不改变弹性模量场的条件放进去，得到位移场的积分形式：

$$
\begin{align*}
v_i(\mathbf{r}) = &\tilde\int \frac{d^3k}{(2\pi)^3}\Bigg\{ -i\frac{1}{k}\,\Omega_{ij}(\mathbf{n})\Big[ C^0_{jklm}\,\varepsilon^*_{lm}(\mathbf{r}) \\
&+ \Delta C_{jklm}(\mathbf{r})\big(\varepsilon_{lm}(\mathbf{r})-\varepsilon^*_{lm}(\mathbf{r})\big)\Big]_\mathbf{k}\,n_k \Bigg\}\mathrm{e}^{i\mathbf{k}\cdot\mathbf{r}},
\end{align*}
$$

其中那个带下标 $\mathbf{k}$ 的括号是表示括号里的内容经过傅里叶变换的结果。那么再对这个结果做一次积分，就得到了应变场：

$$
\begin{align*}
\varepsilon_{ij}(\mathbf r) &= \bar{\varepsilon}_{ij} + \frac{1}{2}\tilde\int\frac{d^{3}k}{(2\pi)^{3}}\,[n_{i}\Omega_{jk}(\mathbf n)+n_{j}\Omega_{ik}(\mathbf n)]\\
&\quad\times\{C^{0}_{klmn}\,\varepsilon^{*}_{mn}(\mathbf r)+\Delta C_{klmn}(\mathbf r)[\varepsilon_{mn}(\mathbf r)-\varepsilon^{*}_{mn}(\mathbf r)]\}_\mathbf{k}n_l\,e^{i\mathbf{k}\cdot\mathbf{r}}.
\end{align*}
$$

上面的应变场积分公式是一个平衡公式，可以看到左边和右边都有应变 $\varepsilon(\mathbf{r})$ 在，这是用弹性和结构不均匀性用 $\Delta C_{ijkl}(\mathbf{r})$ 和 $\varepsilon^*(\mathbf{r})$ 表示出来的结果。这个公式的结果和我们之前得到的 KS 理论的结果非常像，只要我们把这个傅里叶变换的结果单提取出来，用一个特殊的应变表达它：

$$
\begin{align*}
C_{ijkl}^{0}\,\varepsilon_{kl}^{0}(\mathbf{r}) &= C_{ijkl}^{0}\,\varepsilon_{kl}^{*}(\mathbf{r}) + \Delta C_{ijkl}(\mathbf{r})\big[\varepsilon_{kl}(\mathbf{r}) - \varepsilon_{kl}^{*}(\mathbf{r})\big].
\end{align*}
$$

那么上面的应变场公式就成为：

$$
\begin{align*}
\varepsilon_{ij}(\mathbf{r}) &= \bar{\varepsilon}_{ij}+\tfrac{1}{2}\int\frac{\mathrm{d}^3\mathbf{k}}{(2\pi)^3}
\big[ n_i\Omega_{jk}(\mathbf{n})+n_j\Omega_{ik}(\mathbf{n})\big] \\
&\quad\times C^0_{klmn}\,\tilde{\varepsilon}^0_{mn}(\mathbf{k})\,n_l\,e^{i\mathbf{k}\cdot\mathbf{r}}\,.
\end{align*}
$$

这个公式和前面的 KS 理论的结果只差在 $C^0_{klmn}\tilde\varepsilon^0_{mn}(\mathbf{k})$ 上，而前面的这部分是 $\tilde\sigma_{kl}^0(\mathbf{k})$，而这里使用的变量 $\varepsilon_{kl}^{0}(\mathbf{r})$ 实际上就是错配应变。这一点说明了，在选择合适的错配应变 $\varepsilon_{ij}^0(\mathbf{r})$ 之后，弹性-结构非均匀体系的应力和应变就等于弹性均匀体系的应力和应。事实上，我们可以从前面那个代换式子得到：

$$
\begin{align*}
C^0_{ijkl}\big[\varepsilon_{kl}(\mathbf{r})-\varepsilon^0_{kl}(\mathbf{r})\big]
&= \big[C^0_{ijkl}-\Delta C_{ijkl}(\mathbf{r})\big]\big[\varepsilon_{kl}(\mathbf{r})-\varepsilon^*_{kl}(\mathbf{r})\big].
\end{align*}
$$

注意到上面的式子左边是弹性均匀部分的弹性常数乘以全应变与错配应变的差，表示的是弹性均匀部分的应力，右边是原本的弹性-结构非均匀部分的应力，这两者是相等的。这样我们就说明了上面的应力部分相等的原因。

而上面的式子我们还可以再做一些变化，比如利用本征应变、错配应变和全应变之间的关系，让上面的式子转而表达错配应变的平衡公式：

$$
\begin{align*}
&\Delta S_{ijkl}(\mathbf r)\,C^0_{klmn}\big[\varepsilon^0_{mn}(\mathbf r)-\varepsilon^*_{mn}(\mathbf r)\big]+\varepsilon^*_{ij}(\mathbf r)\\
&\quad= \bar\varepsilon_{ij}+\frac{1}{2}\int\frac{d^3k}{(2\pi)^3}\big[n_i\Omega_{jk}(\mathbf n)+n_j\Omega_{ik}(\mathbf n)\big]\\
&\qquad\times C^0_{klmn}\,\tilde\varepsilon^0_{mn}(\mathbf k)\,n_l\,e^{i\mathbf k\cdot\mathbf r}\,,
\end{align*}
$$

这样我们就能（？）通过迭代这个等效弹性均匀问题中的平衡公式来获得错配应变，进而由它求出应变场和应力场了。应变可以用那个积分式得到，而应力则直接可以用应变得到。

## 变分法和其在任意非均匀系统中求解弹性平衡的应用

有了前面的理论，我们可以考虑如何解平衡方程了。首先还是先构筑能量泛函：

### 弹性-结构非均匀体系的应变能泛函

弹性-结构非均匀体系的应变能，根据前面的理论，可以表达为等效弹性均匀体系的能量。弹性均匀系统能量可以表达为：

$$
\begin{align*}
E^{\mathrm{hom}} &= \tfrac{1}{2}\int_V C^{0}_{ijkl}\big[\varepsilon_{ij}(\mathbf r)-\varepsilon_{ij}^0(\mathbf r)\big]\big[\varepsilon_{kl}(\mathbf r)-\varepsilon_{kl}^0(\mathbf r)\big]\,\mathrm{d}^3r
\end{align*}
$$

而原始的弹性-结构非均匀系统的弹性能应该表达为：

$$
\begin{align*}
E^{\mathrm{inhom}} &= \tfrac{1}{2}\int_{V}\big[C^{0}_{ijkl}-\Delta C_{ijkl}(\mathbf r)\big]\big[\varepsilon_{ij}(\mathbf r)-\varepsilon^{*}_{ij}(\mathbf r)\big]\\
&\qquad\qquad\times\big[\varepsilon_{kl}(\mathbf r)-\varepsilon^{*}_{kl}(\mathbf r)\big]\,\mathrm{d}^{3}r.
\end{align*}
$$

那么二者之间的差就可以用前面错配应变与本征应变、全应变的关系来表达为：

$$
\begin{align*}
\Delta E &= E^{\text{inhom}}-E^{\text{hom}} \\[6pt]
&= \tfrac{1}{2}\int_{V}\Big[\,C^{0}_{ijmn}\,\Delta S_{mnpq}(\mathbf r)\,C^{0}_{pqkl}-C^{0}_{ijkl}\Big] \\
&\quad\times\big[\varepsilon^{0}_{ij}(\mathbf r)-\varepsilon^{*}_{ij}(\mathbf r)\big]\big[\varepsilon^{0}_{kl}(\mathbf r)-\varepsilon^{*}_{kl}(\mathbf r)\big]\,\mathrm{d}^{3}r.
\end{align*}
$$

（这个式子不是很好推，可以尝试先把均匀能量前面的 “应力” 部分换成非均匀的表示方法，然后再把 $\varepsilon (\mathbf{r})$ 表达为 $\varepsilon^0 (\mathbf{r}) - \varepsilon^* (\mathbf{r})$ 的形式。）

最最后，我们把 KS 理论给出的弹性能带入这里的均匀能量，就得到了：

$$
\begin{align*}
E^{\mathrm{inhom}} &= \frac{1}{2}\int_{V}\big[C^0_{ijmn}\,\Delta S_{mnpq}(\mathbf r)\,C^0_{pqkl}-C^0_{ijkl}\big]\\
&\quad\times[\varepsilon^0_{ij}(\mathbf r)-\varepsilon^*_{ij}(\mathbf r)]\,[\varepsilon^0_{kl}(\mathbf r)-\varepsilon^*_{kl}(\mathbf r)]\,\mathrm{d}^3r\\
&\quad +\frac{1}{2}\int_{V}C^0_{ijkl}\,\varepsilon^0_{ij}(\mathbf r)\,\varepsilon^0_{kl}(\mathbf r)\,\mathrm{d}^3r\\
&\quad -\bar{\varepsilon}_{ij}\int_{V}C^0_{ijkl}\,\varepsilon^0_{kl}(\mathbf r)\,\mathrm{d}^3r+\frac{V}{2}\,C^0_{ijkl}\,\bar{\varepsilon}_{ij}\bar{\varepsilon}_{kl}\\
&\quad -\frac{1}{2}\tilde\int\frac{\mathrm{d}^3k}{(2\pi)^3}\,n_i\,\tilde{\sigma}^0_{ij}(\mathbf k)\,\Omega_{jk}(\mathbf n)\,\tilde{\sigma}^0_{kl}(\mathbf k)^*\,n_l\ .
\end{align*}
$$

唉，恐怖又丑陋的式子……这么多积分，这么多张量缩并，真能算出来的吗？不管了……

### 无应力应变平衡方程的变分法求解

根据经典变分法，当能量最低时我们有

$$
\begin{align*}
\frac{\delta E^{\mathrm{inhom}}}{\delta \varepsilon^0_{ij}(\mathbf{r})} &= 0.
\end{align*}
$$

这个方程的结果会给出上面关于错配应变的平衡方程。而这里要说明的是，这个变分方程的结果将会给出弹性-结构非均匀体系的平衡应力和平衡应变。原因也很简单，满足这个方程的应变值就是我们要寻找的错配应变，而有了这个错配应变我们就能重构出来体系的平衡应力和平衡应变。这里我们将错配应变用弛豫法让它变成弛豫变量，由于它的性质，我们可以采用随时 Ginzburg-Landau 方程，也就是 Allen-Cahn 方程来解这个东西：

$$
\begin{align*}
\frac{\partial \varepsilon_{ij}^0(\mathbf{r},t)}{\partial t} &= -L_{ijkl}\,\frac{\delta E^{\mathrm{inhom}}}{\delta \varepsilon_{kl}^0(\mathbf{r},t)}\,,
\end{align*}
$$

然而要注意的是这里的 “时间” 是弛豫时间，因为我们需要的是力学的平衡解。这里 $L_{ijkl}$ 是动力系数，由于它是正定的且只控制收敛速率，我们不用太关心它的具体值，好用就成，最简单的形式就是

$$ L_{ijkl} = L \delta_{ik} \delta_{jl}. $$

我们把它非均匀体系的能量带到这里，就会得到：

$$
\begin{align*}
\frac{\partial \varepsilon^0_{ij}(\mathbf r,t)}{\partial t} &= L C^0_{ijkl}\Big\{\frac{1}{2}\tilde\int\frac{\mathrm{d}^3k}{(2\pi)^3}\big[n_k\Omega_{lm}(\mathbf n)\\
&\qquad+n_l\Omega_{km}(\mathbf n)\big]\widetilde\sigma^0_{mn}(\mathbf k)\,n_n e^{i\mathbf k\cdot\mathbf r}\\
&\qquad -\Delta S_{klmn}(\mathbf r)\,C^0_{mnpq}\big[\varepsilon^0_{pq}(\mathbf r)-\varepsilon^*_{pq}(\mathbf r)\big]-\varepsilon^*_{kl}(\mathbf r)\\
&\qquad +\varepsilon^0_{kl}+S^0_{klmn}\sigma^{ex}_{mn}\Big\}\,,
\end{align*}
$$

这里的 $\bar{\varepsilon}_{jk}^0 = (1/V)\int_V\varepsilon_{ij}^0(\mathbf{r})\mathrm{d}^3 r$，$S_{ijkl}^0$ 是弹性模量的逆张量：$C^0_{ijkl}{}^{-1}$，这个公式可以用应变来做边界条件，也可以用外应力来做边界条件。外应力可以表达为：

$$
\sigma^{\mathrm{ex}}_{ij} = C_{ijkl}^0 (\bar\varepsilon_{kl} - \bar\varepsilon^0_{kl})
$$

要处理结构不均匀性，可以设置他们的不均匀部分的弹性模量，比如说空位的地方，就可以将它们的弹性模量设为 0，即 $\Delta C_{ijkl} = C^0_{ijkl}$。这样我们就可以把结构非均匀的体系转化为弹性非均匀体系处理了。

## 相场法解弹性非均匀体系的弹性平衡

后面主要就是使用相场法去求解一些案例了。从结果可以看出这个模型的结果相当不错，在弹性-结构非均匀体系里解出来的几个结果都是比较符合实际的。我们这里就不深入了（）

## 总结

这篇文章也是拖了一段时间，有很多原因……其中一点是我查了一下这系列文章中的 “KS 理论” 和 “本征应变” 的内容，结论上讲，多多少少是有一些结论的，了解到了一些很有趣的东西。这里大概写两笔吧。

这些内容我主要是从 **Toshio Mura** 所著的 *Micromechanics of defects in solids* 这本书中得到的。感谢 AI 为我找到这本资料，第一章很快地解决了我遇到的问题。

首先，自然是认为总应变可以拆分为弹性应变以及本征应变的简单和，另外总应变完全由位移场决定，而弹性部分遵循传统的胡克定律。进一步地，我们考虑应力平衡条件，即应力场对三个方向求偏导后加和为0，在没有外力作用时，边界上法向无应力分量，写成公式就是：

$$
\begin{align*}
&\sigma_{ij,j} = 0\\ 
&\sigma_{ij}n_j = 0 
\end{align*}
$$

其中的逗号表示求偏导，$n_j$ 是边界上 $j$ 方向的单位法向。由此，我们可以得到位移场和本征应变之间的关系：

$$
\begin{align*}
C_{ijkl}\,u_{k,lj} &= C_{ijkl}\,\epsilon^*_{kl,j}\\
C_{ijkl}\,u_{k,l}\,n_j &= C_{ijkl}\,\epsilon^*_{kl}\,n_j
\end{align*}
$$

那么由上面的第一个式子，我们假设本征应变有这样的形式：

$$
\begin{align*}
\epsilon_{ij}^*(x) &= \bar{\epsilon}_{ij}^*(\xi)\exp\big(i\,\xi\cdot x\big),
\end{align*}
$$

其中非下标的 $i$ 代表虚数单位。那么位移场也一定有这样的形式：

$$
\begin{align*}
u_{i}^*(x) &= \bar{u}_{i}(\xi)\exp\big(i\,\xi\cdot x\big),
\end{align*}
$$

我们带入上面的结论，得到：

$$
\begin{align*}
C_{ijkl}\,\bar{u}_k\,{\xi}_l\,\xi_j &= -\,i\,C_{ijkl}\bar{\epsilon}_{kl}^*\xi_j
\end{align*}
$$

这里使用了求导 $(i\xi\cdot x)_{,l} = i\xi_l$。这个式子说明需要三个方程来确定位移场的三个分量。假如我们用 $K_{ik}(\xi) = C_{ijkl}\xi_j \xi_l$ 以及 $X_i = -i C_{ijkl}\bar{\epsilon}^*_{kl} \xi_j$ 这样的简记，那么上面的式子就可以改写为一个方程组：
$$
\begin{align*}
K_{11}\bar{u}_1 + K_{12}\bar{u}_2 + K_{13}\bar{u}_3 &= X_1,\\
K_{21}\bar{u}_1 + K_{22}\bar{u}_2 + K_{23}\bar{u}_3 &= X_2,\\
K_{31}\bar{u}_1 + K_{32}\bar{u}_2 + K_{33}\bar{u}_3 &= X_3.
\end{align*}
$$

就可以解得向量 $\bar u _i$：

$$
\bar{u}_i(\xi) = X_j N_{ij}(\xi)/D(\xi),
$$

其中 $N_{ij}$ 是矩阵 $K$ 的代数余子式，$D(\xi)$ 是它的行列式。这两个式子可以由 $C_{ijkl}$ 的对称性得到这样的形式：


$$
\begin{align*}
D(\xi)&=\epsilon_{mnl}K_{m1}K_{n2}K_{l3},\\
N_{ij}(\xi)&=\tfrac{1}{2}\epsilon_{ikl}\epsilon_{jmn}K_{km}K_{ln}\\
&=K_{im}K_{mj}-K_{mm}K_{ij}+\big(\epsilon_{mn1}K_{m2}K_{n3}+\epsilon_{mn2}K_{m3}K_{n1}+\epsilon_{mn3}K_{m1}K_{n2}\big)\delta_{ij},
\end{align*}
$$

注意这里三个下标的 $\epsilon_{ijk}$ 是 Levi-Civita 张量。

最后，我们把解得的 $\bar{u}_{i}$ 带入前面位移场的形式，得到：

$$
\begin{align*}
u_l(x) &= -\,i\,C_{jlmn}\,\epsilon_{mn}^*(\xi)\,\xi_lN_{ij}(\xi)\,D^{-1}(\xi)\,\exp\big(i\,\xi\!\cdot\!x\big).
\end{align*}
$$

根据应变场和位移场的关系，得到应变场：

$$
\begin{align*}
\epsilon_{ij}(\boldsymbol{x}) &= \tfrac{1}{2} C_{klmn}\,\epsilon^*_{mn}(\boldsymbol{\xi})\,\xi_l\big\{\xi_j N_{ik}(\boldsymbol{\xi})+\xi_i N_{jk}(\boldsymbol{\xi})\big\}\,D^{-1}(\boldsymbol{\xi})\,\exp\big(i\boldsymbol{\xi}\cdot\boldsymbol{x}\big)
\end{align*}
$$

以及应力的表达式：

$$
\begin{align*}
\sigma_{ij}(\boldsymbol{x})&=C_{ijkl}\big\{C_{pqmn}\,\bar{\epsilon}^*_{mn}(\boldsymbol{\xi})\,\xi_q\xi_s\,N_{kp}(\boldsymbol{\xi})\,D^{-1}(\boldsymbol{\xi})\,\exp(i\,\boldsymbol{\xi}\cdot\boldsymbol{ x})-\epsilon^*_{kl}(\boldsymbol{x})\big\},
\end{align*}
$$

