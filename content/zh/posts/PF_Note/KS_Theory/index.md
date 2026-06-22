---
categories:
- Mathematics
# - Programming
- Phase Field
# - Others
tags:
- Green Function
- Elastic Mechanics
- KS Theory
title: 弹性力学 KS 理论推导
description: 手动推导一下微弹性力学的 KS 理论
date: 2025-11-22T00:39:45+08:00
image: 
math: true
hidden: false
comments: true
draft: true
---

这里大概写两笔吧。

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

注意到现在这里的这个应力、应变的表达式已经很像我们之前在 KS 理论中看到的形式了：有一坨东西乘在一起，然后减个什么东西。距离 KS 理论似乎只差一个傅里叶变换了。我们试试傅里叶变换：

我们假设应力做连续傅立叶展开之后得到的形式为：

$$
\begin{align*}
\epsilon_{ij}^*(\mathbf{x}) &= \int^\infty_{-\infty}\bar\epsilon_{ij}^*(\boldsymbol{\xi}) \exp\big(i\,\boldsymbol{\xi}\cdot\boldsymbol{x}\big)\,\mathrm{d}\boldsymbol{\xi}
\end{align*}
$$

其中的傅里叶展开系数为：

$$
\bar\epsilon_{ij}^*(\mathbf{x}) = (2\pi)^{-3}\int^\infty_{-\infty}\epsilon_{ij}^*(\boldsymbol{\xi}) \exp\big(-i\,\boldsymbol{\xi}\cdot\boldsymbol{x}\big)\,\mathrm{d}\boldsymbol{\xi}
$$

可以看到这个展开其实在上面我们已经见过了，只不过是换成了一个对 $\xi$ 的积分。相应的，我们给每个结果都改成做积分就可以了。这里就不再写一遍了。

