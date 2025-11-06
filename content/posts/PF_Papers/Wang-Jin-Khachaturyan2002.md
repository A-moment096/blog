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
date: 2025-10-24T23:25:19+08:00
image: posts/PF_Papers/Nev_Alice-2.jpg
math: true
hidden: false
comments: true
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
C^{0}_{ijkl}\,\frac{\partial^{2}\nu_{k}(\mathbf r)}{\partial r_{j}\partial r_{l}}
&= \frac{\partial}{\partial r_{j}}\big\{C^{0}_{ijkl}\,\varepsilon^{*}_{kl}(\mathbf r)\big\}
+ \Delta C_{ijkl}(\mathbf r)\big[\varepsilon_{kl}(\mathbf r)-\varepsilon^{*}_{kl}(\mathbf r)\big].
\end{align*}
$$

为简化模型，我们考虑体系表面处被包裹了一层无限小的材料，其模量为弹性模量 $C_{ijkl}^0$。这样的处理能够简化这个问题：原来边界上的材料模量、法向量等不需要单独描述，可以和材料体内部一同描述。