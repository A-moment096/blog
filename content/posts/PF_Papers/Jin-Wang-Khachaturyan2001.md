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
title: 文献阅读 - Jin-Wang-Khachaturyan2001
description: Three-dimensional phase field microelasticity theory and modeling of multiple cracks and voids
date: 2025-10-23T23:25:19+08:00
image: posts/PF_Papers/Nev_Alice.jpg
math: true
hidden: false
comments: true
---

*Jin，Wang 和 Khachaturyan 等人在 01 年的时候于 Appl. Phys. Lett. 发表了这篇文章（快报），应该是自此开创了相场的微弹性力学理论。今天就读读它，（尝试）以此为起点学习这个理论吧。*

*图图还是 [**Neve_AI**](https://x.com/Neve_AI) 绘制的 AI 图来的，真的好可爱呀~~*

## 研究背景

这个理论建立的原因是因为在载荷下对包含裂纹、孔隙的材料进行力学求解时几乎没法得到数学解析解，这主要是因为很多材料都是各向异性的多晶，而材料里的各种复杂缺陷也很难描述，只能用数值计算的方法对材料的真实力学状态进行求解。而相场法正好能解决一些材料的单/多晶问题，如果能用它再解一下材料内部的力学状态就好了。这就引出了本文的主要内容。

## 神秘 KS 理论

模型的建立主要依赖于 Khachaturyan-Shatalov (KS) 理论（也就是通讯作者（大佬）和另一个（一看就知道是）俄国大佬开创的理论），把裂纹/孔隙在加载应力 $\sigma_{ij}^{\mathrm{appl}}$ 下的问题转化成等效的另一个问题：连续弹性均匀 (Homogeneous) 基体中掺点儿宏观均匀，但介观不均匀 (Heterogeneous) 的、由晶格错配导致的无加载的应变 $\epsilon_{ij}^o(\mathbf{r})$ （也就是大名鼎鼎的 **本征应变 Eigenstrain**）。

### 均匀/非均匀应变

这里解释一下什么是均匀和非均匀的应变，如图[^1]：

|均匀 Homogeneous|非均匀 Heterogeneous|
|:-:|:-:|
|![](posts/PF_Papers/Homogeneous-strain-JWK2001.png)|![](posts/PF_Papers/Heterogeneous-strain-JWK2001.png)|

### 吓人公式

这个理论给出了应变能泛函和应力分布的准确解，其中应力为：

$$
\begin{align*}
\sigma_{ij}(\mathbf{r}) &= C_{ijkl}\Bigg[\int\frac{d^{3}k}{(2\pi)^{3}}\,n_{k}\,\Omega_{lm}(\mathbf{n})\,\tilde\sigma^{o}_{mn}(\mathbf{k})\,n_{n}\,e^{i\mathbf{k}\cdot\mathbf{r}}
-\bar\epsilon^{o}_{kl}(\mathbf{r})\Bigg]+ \sigma^{\mathrm{appl}}_{ij}
\end{align*}
$$

这个公式相当吓人，符号很多…… 其中的积分号带了一个小斜杠，表示这是在倒空间 (Reciprocal Space) 里的积分（也就是对原本的空间进行一次傅立叶变换），积分区域为无穷区域挖掉 $\mathbf{k} = 0$ 处的一个 $(2\pi)^3/V$ 的体积的区域，$\mathbf{n} = \mathbf{k}/k$ 应该是倒空间中的法向量，$\Omega_{ij}(\mathbf{n})$ 是所谓的格林方程张量，是 $\Omega^{-1}_{ij}(\mathbf{n}) = C_{ijkl}n_kn_l$ 的逆张量，里面的 $C_{ijkl}$ 是弹性模量，$\tilde{\sigma}_{ij}^{o}(\mathbf{k}) = C_{ijkl}\,\tilde{\epsilon}_{kl}^{o}(\mathbf{k})$ ，公式中的上标 $*$ 代表的是取复共轭，最后有
$$
\begin{align*}
\tilde{\epsilon}_{ij}^{0}(\mathbf{k}) &= \int_{V} \epsilon_{ij}^{0}(\mathbf{r})\, e^{-i\mathbf{k}\cdot\mathbf{r}}\, d^{3}r\\ 
\epsilon^{o}_{ij} &= \frac{1}{V}\int_{V}\epsilon^{o}_{ij}(\mathbf{r})\,\mathrm{d}^3r
\end{align*}
$$

我们来看这个公式，首先应力分布是一个标量场，自然是用弹性模量 “乘以” 材料本来就有的应变产生的张量 （其实是缩并），再加上一个外加的应力。这里的 $C_{ijkl}$ 没啥问题，重点在于怎么计算后面的应变张量。可以看到这个应变由三个部分组成，一个复杂的倒空间积分结果，减掉上面讲的那个宏观一致而微观不一致的本征应变 $\epsilon_{kl}^{o}(\mathbf{r})$，再加上这个应变的平均值。

再看积分，积分内部有一个所谓的格林方程张量，只跟方向有关，后面乘上了个 $\tilde\sigma^{o}_{mn}(\mathbf{k})$，这个东西又是用弹性模量乘了一个应变，而这个应变是什么呢？是那个本征应变的傅里叶变换，最后又乘以反变换因子，换回正空间里。也就是说，组成这个应变的三个部分里，第一部分在倒空间里把本征应变揉揉捏捏了一把，应该是能得到某种 “平均化” 的性质，然后减掉不揉捏的部分得到非均匀的主项，最后再加上平均应变得到材料内部的应变分布场。

这里的定性分析说实话我也是瞎猜的，以后得再找来看看原文献，了解一下这个所谓的 KS 理论到底是怎么建立的，为什么要用倒空间中的奇怪积分把那个应变揉揉捏捏一遍。

### 能量最小条件

Anyway，我们得到了应力分布之后就可以把弹性能表示出来，弹性能对应变求变分导数就得到了：

$$
\begin{align*}
\frac{\delta E^{\mathrm{el}}}{\delta \epsilon_{ij}^{o}(\mathbf r)} &= -\sigma_{ij}(\mathbf r)
\end{align*}
$$

我们再进一步考虑这里这个本征应变，它应该只在连续体内有错配的区域内部不为0，而在其余的地方都应该是0才对，而如果本征应变场是能让弹性能的能量最小化的特殊分布 $\epsilon^{oo}_{ij}(\mathbf{r})$，那么就有：

$$
\begin{align*}
\left.\frac{\delta E^{\mathrm{el}}}{\delta \epsilon^{o}_{ij}(\mathbf{r})}\right|_{\epsilon^{o}_{ij}(\mathbf{r})=\epsilon^{oo}_{ij}(\mathbf{r})}=0
\end{align*}
$$

又因为本征应变只能在错配（畸变）区域内不为0，所以自然上面那个特殊的能量也满足这个条件。比较上面两个公式，就可以发现在错配区域内部应力场的值应该都是 0 才对。因此我们带回那个很麻烦的方程，就有了：

$$
C_{ijkl}\Bigg[ \int\frac{d^3k}{(2\pi)^3}\, n_k\,\Omega_{lm}( \mathbf{n})\,\tilde{\sigma}^{oo}_{mn}(\mathbf{k})\,n_n\,e^{i\mathbf{k}\cdot\mathbf{r}_d}- \epsilon^{oo}_{kl}(\mathbf{r}_d) + \bar{\epsilon}^{oo}_{kl}\Bigg] + \sigma^{\mathrm{appl}}_{ij} = 0
$$

这就是通过能量最小得到的条件了。

### 移出错配区域与等价问题

由于在平衡时错配区域内部没有应力，我们可以把它们移出来而不改变内部的应力状态，而移出它们就相当于创造了空隙和裂纹！就这样我们实现了这个神奇的问题转化过程，而这个问题在 Khachaturyan 以前关于弹性均匀基体中分布有错配生成应变问题的工作[^2]里已经解决过了。前面的这一套就说明了 *弹性均匀基体与错配生成应变的体系的弹性应变和应变能实际上和非连续的包含空隙裂纹的体系中的弹性应变与应变能是一样的，如果后者的错配应变能使体系弹性能最小*。这就给我们使用相场法研究 *能量最小化问题* 提供了理论依据。

## 相场模型

根据上面的情况，我们自然使用 Allen-Cahn 模型：

$$
\begin{align*}
\frac{\partial \epsilon^{o}_{ij}(\mathbf{r},t)}{\partial t} &= -L_{ijkl}\frac{\delta E^{\mathrm{el}}}{\delta \epsilon^{o}_{kl}(\mathbf{r},t)}
\end{align*}
$$

其中的 $L_{ijkl}$ 是动力学因子，剩下的都解释过了。通过相场法解出来的结果和那些存在解析解的体系结果是吻合的。

### 另一种方法

另外还有一种相场方程可以用来解决这个问题，不过我们需要改变本征应变的描述，这个描述下它具有不变平面应变[^5]（？什么鬼）：

$$
\begin{align*}
\epsilon_{ij}^{o}(\mathbf{r}) &= \sum_{\alpha=1}^{p} h_i(\alpha,\mathbf{r})\,H_j(\alpha)
\end{align*}
$$

其中 $\mathbf{H}(\alpha)$ 是倒空间向量，表示了几种可能的解理面；$\mathrm{h}(\alpha,\mathrm{r})$ 是裂纹开口向量，用来描述在 $\alpha$ 型解理下位移不连续性。这两个量可以被看作长程非保守序参量，且能够描述具有任意混合裂纹的一般构型。不过它的应变能和本征应变还是利用 KS 理论给出的。

为了描述抵抗裂纹开口的力，必须描述其应变能，这个能量可以用 “粗晶” 朗道能来描述：

$$
\begin{align*}
E^{\mathrm{ch}} &= \sum_{\alpha=1}^{p} \int_{V} f^{\mathrm{ch}}\bigl[\,h(\alpha,\mathbf{r})\,\bigr]\,\mathrm{d}^{3}\mathbf{r}.
\end{align*}
$$

这里 $f^{\mathrm{ch}}[\mathbf{h}(\alpha)]$ 描述了开口过程中解理面上原子键连续断裂的效应。另外，用来表示裂纹表面的曲率的梯度能表示为：

$$
\begin{align*}
E^{\mathrm{grad}} &= \sum_{\alpha=1}^{p}\int_{V}\frac{1}{2}\,D_{ijkl}(\alpha)\,[\mathbf{H}(\alpha)\times\nabla]_i\,h_j(\alpha,\mathbf{r})\,[\mathbf{H}(\alpha)\times\nabla]_k\,h_l(\alpha,\mathbf{r})\,d^{3}r
\end{align*}
$$

又是个复杂的积分，还有叉乘！？这个能量会在平滑裂纹表面处为0，而在裂纹尖端会贡献一部分能量。最后我们就可以把总能构建出来，简单来讲就是把弹性能、化学键断裂能和这个梯度能加起来：

$$
\begin{align*}
E &= E^{\mathrm{el}} + E^{\mathrm{ch}} + E^{\mathrm{grad}}.
\end{align*}
$$

假如把 Allen-Cahn 形式的方程里的能量和本征应变用新方法中的能量和裂纹开口向量表示，就能得到作者之前工作中用来描述马氏体相变的相场模型[^3][^4][^5]。

## 总结

哈人的方程与哈人的能量构造，但是这个路径却能神奇地将连续体的力学情况和非连续体的力学情况统一起来，实现一个能量到处都用，而且这个能量最小化的方式正正好能和相场法结合起来，这一点实在是太妙了。如果这个方法的自由能形式更简单一些的话，那就更好咯。

这篇文章的收获主要有：

- 对相场微弹性力学理论有一个初步认识
- 明白了为什么这个神奇公式可以和相场结合起来
- 知道了 KS 理论这个神奇的东西
- 感受大佬对公式的玩弄

还可以深入了解的点有：

- KS 理论到底怎么得到那个复杂到根本不想看的积分的
- 为什么应变能分成这么三个部分
- 本征应变应该还有更特殊的意义才对
- 倒空间是怎么个积分法
- 后面的 “化学能” 和 “梯度能” 到底是怎么构建的，为什么有这样的形式
- 学习如何像大佬一样玩弄公式

感觉微弹性理论还是有很多需要学的东西呀，本来想着靠这篇文章简单速通，结果没想到这么多看不懂的内容。既然如此，下次就继续了解这个所谓的 KS 理论吧，理解这个理论的话很多东西就应该水到渠成了。

[^1]: 图片来自：[Visualizing Strain](https://earth.sdsu.edu/visualstructure/vss/htm_hlp/hom_het.htm)
[^2]: A. G. Khachaturyan, Fiz. Tverd. Tela **8**, 2710 (1966); Sov. Phys. Solid State **8**, 2163 (1967); A. G. Khachaturyan and G. A. Shatalov, Sov. Phys. JETP **29**, 557 (1969); A. G. Khachaturyan, *Theory of Structural Transformations in Solids* (Wiley, New York, 1983).
[^3]: Y. Wang and A. G. Khachaturyan, Acta Mater. **45**, 759 (1997).
[^4]: Y. M. Jin, A. Artemev, and A. G. Khachaturyan, Acta Mater. **49**, 2309 (2001).
[^5]: Y. M. Jin, Y. U. Wang, and A. G. Khachaturyan (unpublished).