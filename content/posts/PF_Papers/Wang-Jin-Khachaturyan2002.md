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
\gdef\eigen#1{\varepsilon_{#1}^0(\mathbf{r})}
\gdef\avee#1{\overline{\varepsilon}_{#1}}
\gdef\dd{\mathrm{d}}
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
  E^{\mathrm{el}} = &\frac{1}{2}\int_V C_{ijkl}^0 \eigen{ij}\eigen{kl}\dd^3 r \\ &- \overline{\varepsilon_{ij}}\int_V C_{ijkl}^0 \eigen{kl}\dd^3 r + \frac{V}{2}C_{ijkl}^0 \avee{ij}\avee{kl} \\ &- \frac{1}{2}\tilde{\int}\frac{\dd^3 k}{(2\pi)^3}n_i \tilde{\sigma}_{ij}^0(\mathbf{k})\Omega_{jk}(\mathbf{n})\tilde{\sigma}_{kl}^0(\mathbf{k})^* n_l,
\end{align*}
$$

