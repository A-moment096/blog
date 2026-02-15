---
categories:
# - Mathematics
# - Programming
- Phase Field
# - Others
tags: 
- Paper Reading
- PF Model
- Interfacial Model
title: 文献阅读 - Nestler1999
description: A multiphase field model：sharp interface asymptotics and numerical simulations of moving phase boundaries and multijunctions
date: 2025-10-22T18:25:19+08:00
image: /posts/PF_Papers/Nev_Alice.jpg
math: true
hidden: false
comments: true
---

*Nestler 在他 1999 年的这篇文章里进一步介绍了他在之前的文献里的模型情况，后面大家用的比较多的结果应该是界面能的部分，这里读（翻译）一下这篇文章，做个笔记。*

*图图是 [**Neve_AI**](https://x.com/Neve_AI) 绘制的 AI 图来的，真可爱呀~~*

## 研究背景

本文主要是在比较尖锐界面的渐进结果以及多相场模型的模拟结果。在前一篇文章 [^1] 中已经建立了一个模型，通过使用广义 Cahn-Hoffman $\xi$-向量公式在窄界面条件下反推出了界面处的 Gibbs-Thomson-Herring 方程以及各向异性力在多相交接点的守恒。在另一篇文章 [^2] 里对多相 Allen-Cahn 方程做了渐进分析，确定了**渐进奇异极限（大概就是网格多粗的时候公式就失效了）**；另外在另一篇文章 [^3] 里给出了这个模型的详细数值分析结果。

简单来说这篇文章是这个新模型的一个部分，用来验证渐进行为的。大佬就是牛逼，全部自引用，大概看了一下，这篇文章是篇幅最短的，还好我从这儿看的（逃）

## 文献模型

### 总能量

$$
\begin{align*}
\mathcal{F} &= \int_V \mathcal{L}(\mathbf{\phi},\mathbf{\nabla}\mathbf{\phi})\,\mathrm{d}V \\
&= \int_V \sum_{\beta=1}^N \sum_{\alpha=1}^\beta [ \varepsilon_{\alpha\beta}\,{\gamma'}_{\alpha\beta}^2(\mathbf{r}_{\alpha\beta})+ \frac{1}{4 \varepsilon_{\alpha\beta}} \, g_{\alpha\beta}(\mathbf{\phi})] \\
&\qquad\qquad + \sum_{\alpha=1}^N h_{\alpha}(\mathbf{\phi},T)\,\mathrm{d}V ,
\end{align*}
$$

$\mathbf{\phi}$ 自然是序参量，希腊字母 $\alpha,\beta$ 代表的某个相，一共有 $N$ 个相； $\mathcal{L}$ 是**拉格朗日密度（？应该是能量密度，但是用的拉格朗日数乘过）**；$\varepsilon_{\alpha\beta}$ 与相互作用体势 $g_{\alpha\beta}(\mathbf{\phi})$ 的势垒高度成正比；$h_{\alpha}(\mathbf{\phi},T)$ 代表了体相自由能密度以及它对热力学平衡态的偏移程度；$\gamma_{\alpha\beta}$ 应该是界面能的各向异性参数，应该是假定的与方向矢量 $\mathbf{r}_{\alpha\beta} = \phi_\alpha \mathbf{\nabla} \phi_\beta - \phi_\beta \mathbf{\nabla}\phi_\alpha$ 有关。

### 序参量演化方程

$$
\begin{align*}
\frac{\partial\phi_\mu}{\partial t} &= -M\frac{\delta\mathcal{F}}{\delta\phi_\mu} = M\left\{\mathbf{\nabla}\!\left(\frac{\partial\mathcal{L}}{\partial\mathbf{\nabla}\phi_\mu}\right)-\frac{\partial\mathcal{L}}{\partial\phi_\mu}\right\},
\end{align*}
$$

这里用的是非常经典的 Allen-Cahn 方程。注意这里 Nestler 提到这个方程一定是要假设总能 $\mathcal{F}$ 是随着时间单调下降的。由于移动性参数 $M$ 一般是各向异性的所以 $M= M(\mathbf{\nabla} \mathbf{\phi})$；

### 广义 Cahn-Hoffman \$\xi\$-向量

$$\begin{align*}
\xi_{\alpha\beta}(\mathrm{r}_{\alpha\beta}) &= \frac{\partial \gamma_{\alpha\beta}(\mathbf{r}_{\alpha\beta})}{\partial \mathbf{r}_{\alpha\beta}} \;=\; \mathbf{\nabla}_{\mathbf{r}_{\alpha\beta}} \gamma_{\alpha\beta}(\mathbf{r}_{\alpha\beta})
\end{align*}$$

这个向量在文献 [^1] 中出现过，暂时不知道是干嘛的，看起来应该是各向异性的梯度。

### 结果带入与讨论

将以上结果带入就有：

$$
\begin{align*}
\frac{1}{M}\frac{\partial\phi_{\mu}}{\partial t} &= \sum_{\alpha\neq\mu}^{N}\Bigg[2\varepsilon_{\alpha\mu}\mathbf{\nabla}\!\cdot\!\big(\gamma_{\alpha\mu}\boldsymbol{\xi}_{\alpha\mu}\phi_{\alpha}\big)
+\gamma_{\alpha\mu}\boldsymbol{\xi}_{\alpha\mu}\!\cdot\!\mathbf{\nabla}\phi_{\alpha}
-\frac{1}{4\varepsilon_{\alpha\mu}}\frac{\partial g_{\alpha\mu}}{\partial\phi_{\mu}}\Bigg]
-\frac{\partial h_{\mu}}{\partial\phi_{\mu}}-\lambda
\end{align*}
$$

（不得不佩服老前辈的数学功底，这公式，我实在懒得带进去算，改天吧）

$\lambda$ 自然是拉格朗日乘数，用来保证一点上所有相的序参量是归一的；[^1] 和 [^2] 中指出，这里可以让界面能 $\varepsilon_{\alpha\beta}$ 趋于零来渐进到窄界面情况，从而得到各个界面上的 Gibbs-Thomson-Herring 方程。

### 无散应力张量 \$\Xi\$

这里为了进一步研究多相交接点处的 leading order force balance **（我猜是让主导地位的力保持平衡）**，搞出来了无散应力张量 $\Xi$：

$$\Xi = \sum_{\mu=1}^{N} \mathbf{\nabla}_{\phi_{\mu}}\phi_{\mu}\otimes\frac{\partial\mathcal{L}}{\partial\mathbf{\nabla}\phi_{\mu}}-\mathcal{L}\,I$$

这里由于它无散，要求 $\mathbf{\nabla}\cdot \Xi = 0$（好复杂，看不懂）。把这个定义放到上面的多相场模型里，然后用散度定理**（应该就是散度换闭合曲面积分）**，取窄界面极限并计算拉格朗日量密度到主导项，**就得到了（？）**多相点的力学平衡方程：

$$\sum_{\mu=0}^{m-1}\mathbf{F}_{\mu}=\mathbf{l}\times\sum_{\mu=0}^{m-1}\,\xi_{\mu\mu+1}=0,$$

这里的 $\mathbf{F}_{\mu}$ 就是 $\mu$ 和 $\mu+1$ 面之间的总力，向量 $\mathbf{l}$ 是与多相点平行的单位向量。假如把这个公式用球坐标写出来，可以看作杨氏定律结果再加上面自由能各向异性造成的额外剪切应力。

## 数值解法

他们采用了有限差分以及所谓的 Neumann boundary conditions，应该就是周期边界，具体信息可以参考 [^3]。

### 能量选择

他们测试了一系列的体自由能 $g_{\alpha\beta}(\mathbf{\phi})$，最后选择了这个：

$$
\begin{align*}
g(\mathbf{\phi}) &= \sum_{\alpha,\beta} g_{\alpha\beta}(\mathbf{\phi}) + \sum_{\alpha,\beta,\mu} g_{\alpha\beta\mu}(\mathbf{\phi})\\
&= \sum_{\alpha,\beta} \phi_{\alpha}\phi_{\beta} + \sum_{\alpha,\beta,\mu} \delta_{\alpha\beta\mu}\,\phi_{\alpha}\phi_{\beta}\phi_{\mu}
\end{align*}
$$

其中的 $\delta_{\alpha\beta\mu}$ 的选择是让沿 Gibbs 单纯形，连接两个 Gibbs 单纯形的曲线最短，这点保证了两相区没有第三相的出现。**（啥是吉布斯单纯形？）**

### 计算方法和模拟结果

为了数值求解双势阱方程，他们先把微分方程光滑的部分解出来，然后在投影回 Gibbs 单纯形上 **（？什么鬼）**。接下来就是模拟结果，大概就是在三相界面里，如果两个界面能相等而一个和它们不一样，在自由能驱动下界面能相等的两个界面会变 “平” 而不太一样的那个会变成垂直的；另外，在晶粒生长的模拟过程中，这个模型也是符合冯诺依曼定律的：von Neumann 定律要求接邻晶粒数量小于六个的晶粒会缩小，而接邻数量大于六的则会生长。另外，界面能相等的三个相会最终形成 120° 夹角的界面，而不形成这个三相夹角的相会早早消失掉。

## 总结

非常吓人。大佬的数学和物理背景果然不是盖的，公式我是看不懂一点，好在结论足够清晰易懂，这也许就是所谓的深入浅出吧。

从文章中发现需要深入的点有：

- 啥是吉布斯单纯形？什么光滑求解再投影……
- 那个神奇的 Gibbs-Hoffman $\xi$ 向量到底是什么？从后面的应力平衡公式里大概能看出它应该具有力学的含义；
- 那个无散应力张量是个什么东西？从张量积的形式以及减去了貌似乘了单位阵的东西来看，也许就是减去了那个静水压力张量的公式？值得进一步看看怎么回事；
- 自由能的构造应该再从一些老文献里查查，这些数字都是咋来的；
- 怎么带入的那个 $\xi$ 向量？这个应该是很关键的步骤，以及它怎么通过界面能趋零来得到后面的结论的。界面能趋零之后应该剩下插值函数、拉格朗日乘数两个东西才对。
- 各向异性为什么要平方？也许需要从其他地方找到答案……

总的来说就是继续读他 1998 年的这篇文章[^1]，并且手动带入一下看看情况。

当然也有收获：

- 原来大于六就生长小于六就消失是冯诺依曼先发现的？神奇。
- 了解了界面能对模型的影响，以及 Nestler 这个（界面能）模型的优势，第三个相不会出现在两相界面处，这一点还是很不错的，数值稳定性好
- 领略了大佬的风采吧，太牛逼了……

下次看看别的方向，看看力学方向微弹性力学的 Khachaturyan （这人名字真难记）发表的论文。


[^1]: B. Nestler, A.A. Wheeler, Phys. Rev. E 57 (3) (1998) 2602.
[^2]: H. Garcke, B. Nestler, B. Stoth, Physica D 115 (1998) 87.
[^3]: H. Garcke, B. Nestler, B. Stoth, SIAM J. Appl. Math. 60 (1) (1999) 295