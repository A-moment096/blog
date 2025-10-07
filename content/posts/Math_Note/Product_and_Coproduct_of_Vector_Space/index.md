---
categories:
- Mathematics
# - Programming
# - Phase Field
# - Others
tags:
- Linear Algebra
- Category Theory
- Algebra 
- Abstract Algebra
- Note
title: 线性空间的积与余积
description: 深藏在集合论中的区别
date: 2025-10-05T19:55:20+08:00
image: Eyjafjalla.jpg
imageObjectPosition: center 20%
math: true
hidden: false
comments: true
---

*线性空间的直积（积）和直和（余积）究竟有什么区别？它们区别的根源在哪里？这个困扰了我许久的问题终于在今天得到了答案，一起看看吧~*

*选曲为最近拜托朋友从日本买下（还没送到）的 [**鹿乃**]() 的专辑 [**two**]() 的一首歌，同时也是我很喜欢的 P 主 **電ポルP**（Koyori，又称电杆P，因为曲绘经常是电线杆）在 14 年发布的由 v flower 演唱的 **曖昧劣情Lover**。实在是非常好听，我很喜欢。头图则选择了某神秘群友的群友 **派佬** 生成的 AI 图，是可爱的艾雅法拉，希望你喜欢~*

{{<music auto="https://music.163.com/#/song?id=1302953067" loop="none">}}

$$
\gdef\field#1{\mathbb{#1}}
\gdef\zero{\mathbf{0}}
\gdef\one{\mathbf{1}}
\gdef\cat#1{\mathcal{#1}}
\gdef\catname#1{\mathsf{#1}}
\gdef\Hom{\operatorname{Hom}}
\gdef\Ob{\operatorname{Ob}}
\gdef\Mor{\operatorname{Mor}}
$$

## 前言

最近在写线性代数和张量代数相关的内容，突然就想起曾经困扰了我许久许久的问题：线性空间的直积和直和之间究竟有什么样的区别？这个问题有一个很简单的答案：有限维下直积和直和同构，但无限维下情况就不一样：直积就像集合的笛卡尔积那样就 OK，而直和则要求向量只能有有限多个非零元素。然而，这个答案依旧不让人满意：凭什么？为什么直积和直和区别这么大？这样看起来直和就成了直积的子集了？

虽然强行接受也不是不行，但这个显得很草率的答案依旧很难让人满意。好在，在范畴论以及伟大的互联网的帮助下，我还是摸到了这个问题的一些门道，得到了一个自己满意的答案。这里就斗胆聊聊我对这个问题的看法。

我们这里默认读者知道什么是线性空间、线性无关、基等概念。知道大概是什么即可，我们后面会再提起这些概念。另外我们的线性空间都是在 $\field{k}$ 上的。对于了解范畴论的朋友，我们谈论的问题限定在范畴 $\catname{Vect}_\field{k}$ 上。最后，我们不区分线性空间和向量空间，不区分无限和无穷，写手写爽了会随便从两个词中取一个，还请见谅。

## 线性空间的直积

我们先来看看直积，当然是从有限多个线性空间的直积开始。

### 两个线性空间的直积，以及推广

假如我们有两个线性空间，我们可以从它们构造出一个更大的线性空间，方法即为所谓的 *直积*。直积的方式很简单：我们把线性空间看成集合，对这两个集合做笛卡尔积，它的每一个元素就都成为了一个二元组。然后我们在这个集合上定义加法和数乘：二元组的加法定义为对应位置上的元素在原线性空间中的加法，而数乘则同时乘给两个位置。可以验证这样的结果依旧会给我们一个线性空间。我们称这样的构造过程为所谓的 **直积**。

举个例子，设我们有 $V$ 和 $W$ 两个 $\field{k}$ 上的线性空间，我们要从它们构建所谓的直积，记为 $V\times W$，它的元素形如 $(v,w)$，其中 $v\in V$，$w\in W$。为方便区分不同线性空间的加法和数乘，我们给它们的加法和数乘带一个下标。所以，根据上面所说的那样，直积的加法和数乘分别为：

$$
\begin{aligned}
+_\times \colon &(V \times W) \times (V \times W) \to V \times W,\\
&((v_1, w_1), (v_2, w_2)) \longmapsto 
(v_1 +_V v_2,\, w_1 +_W w_2);
\\[1em]
\cdot_\times \colon &\Bbbk \times (V \times W) \to V \times W,\\
&(\lambda, (v, w)) \longmapsto 
(\lambda \cdot_V v,\, \lambda \cdot_W w).
\end{aligned}
$$

上面两个运算对任意的 $v_1,v_2,v\in V$，$w_1,w_2,w\in W$，$\lambda\in\field{k}$ 都成立。

我们可以自然地将这个概念向后延伸。我们可以考虑将多个线性空间做直积，得到一个更大的线性空间，它上面的加法和数乘和上面的定义类似。我们称这样定义的加法为 **逐点加法**，这样的数乘也叫 **逐点数乘**。

我们甚至可以尝试把这个概念推广至无穷。

### 无穷个线性空间的直积

设有一个指标集 $I$ 以及它上面的一个指标 $i\in I$（什么是指标集？不关心具体元素，只关心大小的集合就是了，比如有限集合 $\{1,2,3\}$，自然数集 $\field{N}$，不可数的集合比如 $\field{R}$）。我们定义 $\{V_i\}_{i\in I}$ 的直积 $\prod_{i\in I}V_i$ 为这样的集合：它在第 $i$ 个位置的元素从 $V_i$ 而来，它的加法和数乘按照逐点的形式定义。

可以证明，它是满足线性空间的八条公理的：

- 加法满足封闭性，因为每个 $i$ 上的逐点加法都是在 $V_i$ 上封闭的；
- 加法是结合且交换的，因为 $i$ 上的加法是结合且交换的；
- 加法有单位元，只需要让每个位置上的元素都成为 $\zero$；
- 加法有逆元，也只需要让每个位置的元素都给出 $V_i$ 中的逆；
- 数乘在 $\field{k}$ 上的乘法与 $\prod_{i\in I}V_i$ 上元素的乘法是可以交换次序的，因为在每个位置 $i$ 上都是有这样的结果的；
- 数乘对加法是分配的，只需要让数乘分配到每个 $V_i$ 的加法上；
- $\field{k}$ 上的加法对数乘是封闭的，也只需要让每个加法结果先数乘到第 $i$ 个位置上，再按照 $V_i$ 上的加法分配即可。

直积就是这样的东西，非常地简单（单纯？单调？）。那么，直和又是什么样的呢？

## 线性空间的直和

在讨论线性空间的直和之前，我们先讨论 *线性空间的子空间* 以及 *子空间的和*。

### 线性子空间

在有一个线性空间之后，作为一个集合我们自然地可以讨论线性空间的子集。如果这个子集在赋予了原空间的加法和数乘之后，依旧能成为一个线性空间，我们就称这个子集是一个线性子空间。线性子空间的存在允许我们可以从一个线性空间里拆出来一个更小的空间。我们自然会考虑这样一个问题：如果我们按照集合的减法那样把子空间从原空间中减掉，剩下的东西是什么？

我们这里指出：剩下的东西很奇怪，它是一个坏掉的线性空间：缺少了 $\zero$。如果我们把 $\zero$ 复制一份给剩下的东西，它又成为一个线性空间了，而且根据子空间的定义，剩下的部分带上 $\zero$ 之后也是一个线性子空间。提前剧透一下：这个线性空间就这样拆成了这样的两个线性子空间的直和。

不过直和并不是直接出现的，这样定义的直和必须得先有一个原空间和子空间，不太自由。直和的定义是在我们定义线性空间的和之后才出现的。

### 子空间的和

借助线性空间上定义的向量加法，我们可以定义两个子空间的和：我们任意地取两个子空间中的向量，然后再以任意的方式进行线性组合，最后把它们收集起来。它会得到什么东西？它里面的元素是什么？我们不用担心新得到的东西没有定义，因为它就是原线性空间中的一个向量，而这个和我们可以放心地说，它也是原向量空间的一个子空间。

我们记线性空间 $V$ 的子空间 $V_1$ 和 $V_2$ 的和为 $V_1+V_2$。根据定义，我们可以知道子空间的和是满足交换律的，我们可以交换两个线性子空间的次序，得到的子空间是相同的。另外，我们也可以自然地把 *两个* 线性空间的和推广到 *多个* 线性空间的和。这里不再赘述。

不过，子空间的和有很有趣的特点，如果 $V_1 = V_2$，那么 $V_1+V_2 = V_1 = V_2$，这一点可以从其定义验证得到。或者说，子空间的和不一定给出更大的子空间，而当它能给出更大子空间的时候，两个子空间只能有一部分的重叠。那么？它们最少能重叠多少呢？它们能完全不重叠吗（没有任何公共向量）？答案是：最少必须都得有 $\zero$，这是作为线性空间子空间的必要条件。

终于，我们可以讨论子空间的直和了。

### 子空间的直和

我们用不太严谨的方式来定义直和。当一个线性空间的若干个子空间们之间只有公共的 $\zero$ 时，它们的和就可以被称为直和。这样的描述可以用线性组合的语言来表述：线性子空间的和成为直和，当且仅当从和中的向量能 *唯一* 表达为每个子空间中的向量的线性组合，或者说，零向量只能由每个线性子空间中的零向量组合得到。如果借助原空间以及线性无关的概念，我们可以得知，一组线性子空间的和能成为直和当且仅当每个线性子空间中的向量任取一个非零向量之后组成一个向量组，这个向量组是线性无关的。

上面给出了四个线性子空间的和成为直和的条件。可以证明它们之间都是等价且相互推导的。

最后，线性子空间的直和可以类比集合的无交并。比如一个线性空间 $V$ 里有一个线性子空间 $W$ ，我们可以从线性空间删掉这个子空间得到另外的东西 $V\setminus W$，它自然和 $W$ 是不相交的，但是这个集合不是线性子空间；当我们给 $V\setminus W$ 补上 $\zero$ 之后，它能成为线性子空间，且和 $W$ 进行直和之后就能给出 $V$。或者我们这样说：由于线性子空间直和的性质，它们的公共子集只有一个 $\{\zero\}$，而如果我们从每个线性子空间中都挖掉 $\zero$ 之后，它们就成为交集为空的集合，做无交并之后我们再补上 $\zero$ 就又能得到一个线性子空间，这个子空间不是别的，就是对前面的子空间们做直和得到的结果。

可以看到，线性子空间的直和与集合的无交并之间只差了一个 “集合成为线性空间的条件之一”：零向量。那么我们能把 *子空间的直和* 推广到 *线性空间的直和* 吗？利用上面的类比，实际上这是可以的。就像无交并那样，我们这样操作：

- 从每个线性空间中挖掉 $\zero$。这样它们就成为了一组集合；
- 给每个线性空间赋予一个指标，做无交并。
- 给无交并的结果补上 $\zero$，根据直和的要求，令直和中的 $\zero$ 为从每个线性空间中取 $\zero$ 并放在对应的位置后得到的结果。

就这样，我们得到了线性空间的直和。它不再依赖某个线性空间的子空间存在，而且我们可以看到，如果按照上面的操作，得到的结果实际上和线性空间的直积是一样的：元素都是一个 $n$ 元组，第 $i$ 个位置都是从 $V_i$ 这个线性空间中得到的。

那么我们能把线性空间的直和推广到无穷个线性空间的直和吗？这是个很有趣的问题，答案是可以，但不是任意的。无穷个线性空间的直和是它们的直积的子空间（集合上是子集），直和对无穷维元组的元素提出了要求：只能有有限个非零的向量，剩下的位置都必须是各自线性空间上的 $\zero$。

为什么？为什么会这样？线性空间的直和为什么和直积在有限维的时候是相同的，而在无限的情况下就不是一样的了？我们先把这个问题放在一边，先来看看范畴论中是怎么看待直积以及直和的。如果您对范畴论的语言比较了解，可以跳过下面的一章

## 范畴

为什么从范畴论角度讨论这个问题？因为 *直积* 和 *直和* 这样的结构在数学的各个领域中都有出现，它们太普遍了，以至于我们可以从范畴论的角度把它们抽象出来统一研究。我们先来看看范畴是什么。

范畴会收集一系列的数学 *对象*，以及这些数学对象之间的 *箭头*，也称它们为 *态射*，最后规定这些箭头们要满足的公理。

### 范畴的定义

我这里借用李文威老师的 《代数学方法》 中对范畴的定义：

> [!DEF]{范畴}
>
> 一个范畴 $\cat{C}$ 是指以下的资料：
>
>1. 一个集合 $\Ob(\cat{C})$，其元素称为 $\cat{C}$ 的 **对象**；
>2. 另一个集合 $\Mor(\cat{C})$，其元素称为 $\cat{C}$ 的 **态射**。
>
> 另外，对上面两个集合之间有这样的要求：
> - 两集合间有一对映射： $s\vcentcolon\space\Mor(\cat{C}) \to \Ob(\cat{C})$ 和 $t\vcentcolon\space\Mor(\cat{C}) \to \Ob(\cat{C})$，它们分别指出了态射的**来源**与**目标**。
>
> 对于态射而言，有这样的要求：
> - 针对某两个对象 $X,Y\in\Ob(\cat{C})$，我们可以从上面这一对映射中得到这两个对象之间的所有态射的集合：$\Hom_\cat{C}(X,Y)\vcentcolon=\space s^{-1}(X)\cap t^{-1}(Y)$。在明确所指范畴的情况下可简记为 $\Hom(X,Y)$。这样的集合也被称为 $\mathrm{Hom-}$ 集；
> - 对于任意的一个对象 $X$，一定存在一个态射 $\mathrm{id}_ {X} \in \Hom_{\cat{C}}(X,X),$ 这个态射被称为 $X$ 到自身的恒等态射；
> - 给定任意的三个对象 $X,Y,Z\in\Ob(\cat{C})$，有这样在其 $\mathrm{Hom-}$ 集之间的映射，称为**合成映射**，定义为：
> $$\begin{align*} 
\circ\vcentcolon\space\Hom_\cat{C}(Y,Z) \times \Hom_\cat{C}(X,Y)&\to \Hom_\cat{C}(X,Z)\\ 
(f,g)&\mapsto f\circ g\\
\end{align*}$$
> 且当不至于混淆时可以省略中间的 $\circ$，将 $f\circ g$ 简记为 $fg$。
>
> 最后，对上面的合成映射而言，有这样的两个要求：
> 1.    结合律：对于任意的态射 $h,g,f\in\Mor(\cat{C})$，如果映射的合成 $f(gh)$ 和 $(fg)h$ 都有定义，那么 $$f(gh) = (fg)h.$$
> 2.    对于任意的态射 $f\in\Hom_\cat{C}(X,Y)$，其与恒等映射之间的复合满足关系：
> $$f\circ\mathrm{id}_X = f = \mathrm{id}_Y\circ f.$$

一个很不错的例子就是集合范畴 $\catname{Set}$，它的对象自然是各种各样的集合，而态射或者箭头则是集合之间的映射，没有任何的附加结构。对于别的范畴，我们还要求态射是要保持结构的：不然态射的目标就不在范畴里面了。而在这里，线性空间自然也可以有一个范畴。我们一般会固定一个数域 $\field{k}$ 后研究定义在它上面的线性空间，因此定义在 $\field{k}$ 的线性空间们，随着它们之间的线性映射（同态）一起，成为一个范畴。我们称之为 $\catname{Vect}_\field{k}$，数域 $\field{k}$ 上的线性范畴。可以说，我们学的线性代数这门课，就是在研究 $\catname{Vect}_\field{R}$ 或者 $\catname{Vect}_\field{C}$。

### 交换图

范畴论中的重要研究对象之一即为交换图。交换图把 *两个运算可交换顺序* 这一性质给可视化了。以线性空间中的线性映射为例，对于线性空间范畴 $\catname{Vect}_\field{k}$ 中的两个线性空间 $V,W$ 以及它们之间从 $V$ 到 $W$ 的一个态射 $f\vcentcolon V\to W$，根据定义我们有下面两个交换图成立：

对于向量空间加法，我们有：

<!-- https://q.uiver.app/#q=WzAsNCxbMCwwLCJWIFxcdGltZXMgViJdLFsxLDAsIlcgXFx0aW1lcyBXIl0sWzAsMSwiViJdLFsxLDEsIlciXSxbMCwxLCJmIFxcdGltZXMgZiJdLFswLDIsInsrX1Z9IiwyXSxbMSwzLCJ7K19XfSJdLFsyLDMsImYiLDJdXQ== -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwwLCJWIFxcdGltZXMgViJdLFsxLDAsIlcgXFx0aW1lcyBXIl0sWzAsMSwiViJdLFsxLDEsIlciXSxbMCwxLCJmIFxcdGltZXMgZiJdLFswLDIsInsrX1Z9IiwyXSxbMSwzLCJ7K19XfSJdLFsyLDMsImYiLDJdXQ==&embed" width="372" height="304" style="border-radius: 8px; border: none;"></iframe>

其中右下角的下标表示不同线性空间之间的向量加法。对于标量乘法，我们有：

<!-- https://q.uiver.app/#q=WzAsNCxbMCwwLCJcXG1hdGhiYntrfSBcXHRpbWVzIFYiXSxbMSwwLCJcXG1hdGhiYntrfSBcXHRpbWVzIFciXSxbMCwxLCJWIl0sWzEsMSwiVyJdLFswLDEsIntcXG1hdGhybXtpZH1fe1xcbWF0aGJie2t9fSBcXHRpbWVzIGZ9Il0sWzAsMiwie1xcY2RvdF9WfSIsMl0sWzEsMywie1xcY2RvdF9XfSJdLFsyLDMsImYiLDJdXQ== -->
<span style="display:block"><iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwwLCJcXG1hdGhiYntrfSBcXHRpbWVzIFYiXSxbMSwwLCJcXG1hdGhiYntrfSBcXHRpbWVzIFciXSxbMCwxLCJWIl0sWzEsMSwiVyJdLFswLDEsIntcXG1hdGhybXtpZH1fe1xcbWF0aGJie2t9fSBcXHRpbWVzIGZ9Il0sWzAsMiwie1xcY2RvdF9WfSIsMl0sWzEsMywie1xcY2RvdF9XfSJdLFsyLDMsImYiLDJdXQ==&embed" width="347" height="304" style="border-radius: 8px; border: none;"></iframe></span>

同样，右下角下标表示不同线性空间的数乘。我们说这两个图交换当且仅当有我们上面给出的那个关于线性映射的定义，或者使用范畴论的方式，用态射的复合，有下面两个式子成立：

$$ +_W \circ f\times f = f\circ +_V;$$
$$ \cdot_W\circ \mathrm{id}_\field{k}\times f = f\circ \cdot_V.$$

其中，$\circ$ 代表的是态射的复合，第一个式子代表第一个图交换，第二个式子则为第二个图交换。

### 泛性质

最后我们来谈谈范畴论中的所谓 *泛性质*。泛性质是这样的一种性质，当某些对象带着它们的态射之后和另一个对象之间有某种联系的时候，我们可以用具有泛性质的东西把它们联系起来。具体做法（按照抽象废话的方式）我们用一个例子说明，是这样的：

我们首先声称有一些确定的对象，我们称之为 $A_i$，让 $i$ 是指标集 $I$ 中的一个指标。下一步比较有趣，我们先不讲我们要描述的那个特殊对象，而是讲 *和这个特殊对象有一些关系的某个对象*。我们称它为 $X$，且 $X$ 和 $A_i$ 之间应该有一些态射 $f_i\vcentcolon X \to A_i$。我们来想象一下 $X$ 和 $A_i$ 之间的态射，它们在这些态射的连接下能形成一个锥形的结构：把 $A_i$ 们排成一个圆圈，把 $X$ 放在上面之后引出许多的 $f_i$ 连到 $A_i$ 上。

最后就轮到我们的主角出场。我们需要描述的对象，我们称之为 $S$，以及从 $S$ 到 $A_i$ 的一系列态射（我们称之为 $\pi_i$），它们具有这样的特点：我们说存在 **唯一** 的态射 $f\vcentcolon X\to S$，使得 $\pi_i \circ f = f_i$ 始终成立，或者就是说这个交换图交换：
<!-- https://q.uiver.app/#q=WzAsMyxbMCwyLCJYIl0sWzIsMiwiUyIsWzAsNjAsNjAsMV1dLFsyLDAsIkFfaSJdLFswLDEsIlxcZXhpc3QgIWYiLDAseyJjb2xvdXIiOlsxODAsNjAsNjBdfSxbMTgwLDYwLDYwLDFdXSxbMCwyLCJmX2kiXSxbMSwyLCJcXHBpX2kiLDAseyJjb2xvdXIiOlswLDYwLDYwXX0sWzAsNjAsNjAsMV1dXQ== -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMyxbMCwyLCJYIl0sWzIsMiwiUyIsWzAsNjAsNjAsMV1dLFsyLDAsIkFfaSJdLFswLDEsIlxcZXhpc3QgIWYiLDAseyJjb2xvdXIiOlsxODAsNjAsNjBdfSxbMTgwLDYwLDYwLDFdXSxbMCwyLCJmX2kiXSxbMSwyLCJcXHBpX2kiLDAseyJjb2xvdXIiOlswLDYwLDYwXX0sWzAsNjAsNjAsMV1dXQ==&embed" width="300" height="300" style="border-radius: 8px; border: none;"></iframe>

我们把 $S$ 和 $\pi_i$ 标红了，因为它们是我们要的特殊对象们；我们将底下的箭头标蓝，说明它是 $S$ 和 $\pi_i$ 满足的特殊性质。

值得注意的是，范畴论中我们最应关心的不是对象，而是对象之间的态射：态射会包含它的源与目标的信息，而单纯的对象不会有这么丰富的信息。如果我们将目光从 $S$ 和 $X$ 挪到三个对象之间的态射的话，可以看到我们现有 $A_i$，特殊的对象是 $\pi_i$ 以及与之而来的 $S$，对于任意的 $f_i$ 我们都可以有一个唯一的 $f$ 让 $f_i$ 分解为 $\pi_i$ 和 $f$。

有了泛性质，我们终于可以开始进入正题了。

## 积和余积

范畴论中有所谓的 *积* 和 *余积*。它们其实分属与所谓的 *极限* 和 *余极限*，然而我们不打算讨论这么深入。

### 积

我们使用交换图来定义范畴论的积：

> [!DEF]{积}
> 
> 在一个范畴 $\cat{C}$ 中，取其中的对象 $X_1$ 和 $X_2$，在 $\cat{C}$ 中有另一个对象 $X$ 被称为 $X_1$ 和 $X_2$ 的积，我们通常记为 $X_1\times X_2$，它是 $\cat{C}$ 中的一个对象，带有一对投影态射 $\pi_1\vcentcolon X\to X_1$ 和 $\pi_2\vcentcolon X\to X_2$，满足如下的泛性质：
>
> 对于任意 $\cat{C}$ 中对象 $Y$ 以及态射 $f_1\vcentcolon Y\to X_1$ 以及 $f_2\vcentcolon Y\to X_2$，都存在唯一的一个态射 $f\vcentcolon Y\to X$，使得下面的图交换：
>
> <!-- https://q.uiver.app/#q=WzAsNCxbMCwxLCJZIl0sWzIsMSwiWCJdLFszLDAsIlhfMSJdLFszLDIsIlhfMiJdLFswLDEsIlxcZXhpc3QhZiJdLFswLDIsImZfMSJdLFswLDMsImZfMiIsMl0sWzEsMiwiXFxwaV8xIiwyXSxbMSwzLCJcXHBpXzIiXV0= -->
> <iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwxLCJZIl0sWzIsMSwiWCJdLFszLDAsIlhfMSJdLFszLDIsIlhfMiJdLFswLDEsIlxcZXhpc3QhZiJdLFswLDIsImZfMSJdLFswLDMsImZfMiIsMl0sWzEsMiwiXFxwaV8xIiwyXSxbMSwzLCJcXHBpXzIiXV0=&embed" width="560" height="432" style="border-radius: 8px; border: none;"></iframe>
>
> 将该构造推广到一族对象 $\{X_1\}_{i\in I}$，则我们记它们的积为 $\prod_{i\in I}X_i$，带投影映射 $\pi_i\vcentcolon \prod_{i\in I} X_i \to X_i$，它能令下图交换：
>
> <!-- https://q.uiver.app/#q=WzAsMyxbMCwyLCJZIl0sWzIsMiwiXFxwcm9kX3tpXFxpbiBJfVhfaSJdLFsyLDAsIlhfaSJdLFswLDEsIlxcZXhpc3QhZiJdLFsxLDIsIlxccGlfaSIsMl0sWzAsMiwiZl9pIl1d -->
> <iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMyxbMCwyLCJZIl0sWzIsMiwiXFxwcm9kX3tpXFxpbiBJfVhfaSJdLFsyLDAsIlhfaSJdLFswLDEsIlxcZXhpc3QhZiJdLFsxLDIsIlxccGlfaSIsMl0sWzAsMiwiZl9pIl1d&embed" width="473" height="432" style="border-radius: 8px; border: none;"></iframe>

从上面的交换图来看，我们可以对积做出这样的评论：一族数学对象的积是这样的一个特殊对象，当有一个对象 $Y$ 里包含了这一族数学对象的中的一个（记作 $X_i$）里的信息时，我们总可以先把这个对象映射到积上，然后再从积中还原出这些到 $X_i$ 的信息。或者说，我们不是从数学对象构建出的积，而是有一个对象名字叫积，它包含了这些数学对象的所有信息，也正因如此，任何对象和它到 $X_i$ 的一个映射都可以先在积中找到 $X_i$ 的信息，最后再从积传给 $X_i$ 自己。

### 余积

而当我们反转上面定义中的所有箭头后，我们就得到了所谓的余积。

> [!DEF]{余积}
>
> 在范畴 $\cat{C}$ 中，给定对象 $X_1,X_2$，若存在对象 $X$（记作 $X_1 \amalg X_2$）及插入态射 $\iota_1\vcentcolon X_1 \to X$、$\iota_2\vcentcolon X_2 \to X$，使得：
>
> 对任意对象 $Y$ 与态射 $g_1\vcentcolon X_1 \to Y$、$g_2\vcentcolon X_2 \to Y$，存在唯一态射 $g\vcentcolon X \to Y$，满足
> $g \circ \iota_1 = g_1,\quad g \circ \iota_2 = g_2$，
> 则称 $X$ 为 $X_1$ 与 $X_2$ 的余积。
>
> 使下图交换：
> <!-- https://q.uiver.app/#q=WzAsNCxbMSwxLCJYIl0sWzMsMSwiWSJdLFswLDAsIlhfMSJdLFswLDIsIlhfMiJdLFswLDEsIlxcZXhpc3QhZyIsMCx7ImxhYmVsX3Bvc2l0aW9uIjo0MH1dLFsyLDAsIlxcaW1hdGhfMSIsMl0sWzMsMCwiXFxpbWF0aF8yIl0sWzMsMSwiZ18yIiwyXSxbMiwxLCJnXzEiXV0= -->
> <iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMSwxLCJYIl0sWzMsMSwiWSJdLFswLDAsIlhfMSJdLFswLDIsIlhfMiJdLFswLDEsIlxcZXhpc3QhZyIsMCx7ImxhYmVsX3Bvc2l0aW9uIjo0MH1dLFsyLDAsIlxcaW1hdGhfMSIsMl0sWzMsMCwiXFxpbWF0aF8yIl0sWzMsMSwiZ18yIiwyXSxbMiwxLCJnXzEiXV0=&embed" width="560" height="432" style="border-radius: 8px; border: none;"></iframe>
> 
> 推广到一族对象 $\{X_i\}_{i\in I}$，其余积记作 $\coprod_{i\in I} X_i$，带插入态射 $\iota_i\vcentcolon X_i \to \coprod_{i\in I} X_i$，满足：
>
> 对任意对象 $Y$ 与一族态射 $g_i\vcentcolon X_i \to Y$，存在唯一态射
> $g\vcentcolon \coprod_{i\in I} X_i \to Y$，使得对每个 $i$ 都有
> $g \circ \iota_i = g_i$。
>
> 使下图交换：
>
> <!-- https://q.uiver.app/#q=WzAsMyxbMCwyLCJZIl0sWzIsMiwiXFxjb3Byb2Rfe2lcXGluIEl9WF9pIl0sWzIsMCwiWF9pIl0sWzEsMCwiXFxleGlzdCFnIiwyXSxbMiwxLCJcXGltYXRoX2kiXSxbMiwwLCJnX2kiLDJdXQ== -->
> <iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMyxbMCwyLCJZIl0sWzIsMiwiXFxjb3Byb2Rfe2lcXGluIEl9WF9pIl0sWzIsMCwiWF9pIl0sWzEsMCwiXFxleGlzdCFnIiwyXSxbMiwxLCJcXGltYXRoX2kiXSxbMiwwLCJnX2kiLDJdXQ==&embed" width="473" height="432" style="border-radius: 8px; border: none;"></iframe>

而对于余积，仿照我们对积的评论，我们可以说余积包含了所有的从一族对象出发的信息。如果从某一族对象出发来组合里面的信息形成一个新的对象，我们总是可以先把它们的信息放在余积中，最后再从余积里面进行这个组合操作。

### 小结：积与余积的区别

有了积和余积，我们指出：在集合范畴里，积就是笛卡尔积，余积则是集合的无交并，而在集合范畴中，它们二者是同构的。但是在别的大多数范畴中，例如今天的主角，线性空间范畴里，积和余积是不一样的。积在线性空间范畴中是直积，而余积则成为直和。

积和余积区别在哪？其实就在于箭头的反转。我们知道，这些箭头一定是从 *定义域* 射向 *陪域* 的。我们仔细考察那个 *存在唯一的映射* 的部分，在积中这个箭头是从任意的一个对象映射到积，也就是说积是在陪域的位置的。作为被动接受的一方，映射到积时并不需要做什么特别的操作，把信息转发给原映射的目标，即那一族对象中的某个即可。然而在余积中，这个箭头是从余积指向某个任意的对象的。这意味着，我们在那一族对象中选取一个元素之后，它必须得先在余积中找到一个对应，然后再走那个唯一的映射对应到目标上，并保证和不经过自己得到的结果相同。

举个可能不太恰当的例子，积的情况下，好比过去人们通过电话交流，你要与某人通信时可以花大价钱拉一条专线过去，但如果你要打给的人很多，这样就不太方便，此时可以先拨电话给总台，让总台的接线员帮你处理你要打给谁的问题。总台接线员那里的电话名册就相当于那个积。而余积的情况下，就像给班级的人们安排座位，可以让所有人直接去教室里坐下，也可以先拿出一张纸，让每个人在上面选好位置之后再让他们坐在纸上画好的位置。

积和余积二者微妙的区别就成为了直积和直和的区别的根源。而导致它们区别的导火索则是数学中的常客：无限/无穷。

## 无限维的噩梦

我们先来看看有限维下二者的情况。

### 有限维的状况

在有限维时，直积自不必说，每个向量就是一个 $n$ 元组，每个位置上都是一个线性空间中的向量；直和则也类似，因为每个直和中的向量都可以写为这一族线性空间里每个线性空间中唯一一个向量的和，在我们给这些线性空间排好序之后依旧可以把它们表达为一个 $n$ 元组。一切都合情合理，非常符合我们的预期。

然而到了无限维，事情就发生了变化。

### 无限维的情况

在无限维下，直积我们已经验证过了，由于它的构造方式的原因，它的存在合情合理，只需要把每个向量空间中的向量拼起来就能得到直积中的向量，直积也同样是一个线性空间。

然而对于直和，事情就没那么简单了。考虑直和的定义过程，我们是从线性子空间的和发展而来的线性子空间的直和，再将直和的含义抽离出 “无交并类似物” 的部分，发展出的线性空间的直和。这个过程中，构建直和元素的过程依旧是依赖 *向量加法* 的概念的，即便有了 “无交” 来避免两个相同线性空间无法直和，直和的产生依旧是需要对每个向量空间中向量做加法的。

问题就出现在这里。我们定义向量加法的时候，只定义了两个向量的加法。而我们对它的推广只能推广到有限个向量之间的加法，是 **没法自然地推广到无穷多个向量之间的加法的**。而这一点就导致无穷多个向量空间做直和时，其元素中是不能有无限多个非零的向量的，因为那就代表了需要对无交的无穷多个向量空间中的 **无穷多个非零向量做加法**，而这是不被允许的，代数学中不允许这样奇怪的东西存在。试想，无限多个 $1$ 相加，结果是什么？在没有拓扑结构之前我们是没法下任何的结论的。

所以说，只有有限多个元素非零，才能保证我们在直积的构造过程中不使用非法的 “无穷多个非零向量相加” 的情况出现。

### 范畴论在哪里？

那么，范畴论中积和余积的特点为什么是这个区别的根源呢？我们依旧采用上面的记号，考虑积的泛性质，从一个对象，这里是线性空间 $Y$， 映射到一族线性空间中的第 $i$ 个即 $X_i$ 时，我们不太需要考虑什么特殊的规约，它在经过 $X$ 中转的时候也不需要有什么特殊的限制，因此只要 $X$ 的确是一个线性空间就可以了，无限引来的问题在 $X$ 成为接受 $Y$ 的信息的对象的时候被绕过去了（不管是不是无限，反正整个过程是合法的）；

而考虑余积的泛性质，首先如果对任何的 $Y$ 为目标的箭头 $g_i\vcentcolon X_i\to Y$ 都能有一个对象来实现这个映射的分解，这个对象就必须得包含所有 $\{X_i\}_{i\in I}$ 的信息，且每个 $X_i$ 都得能被区分开 (两个空间不能被映射到同一个空间上)。否则这样的分解就无法成功进行：有的地方可能会缺一块。既然如此，每个空间中的元素都会（以某种形式）出现在余积中了，那么它们的出现形式呢？我们第一个想到的自然是和积同样的构造：即啥都不做限制。那么此时考虑那个 *存在且唯一* 的箭头，我们取一个有无限个非零分量的向量，它表示每个线性空间都贡献了一个非零的向量，它在被通过那个唯一的箭头带到 $Y$ 上的时候就出现了问题：从 $\{X_i\}_{i\in I}$ 到 $Y$ 的时候，我们从 $X_i$ 中取一个元素之后它只能对应 $Y$ 中一个元素，而它也只能在余积（我们此时假设它是积）上对应一个元素，再把这个元素放到 $Y$ 中。但是 **无限** 个非零元素会导致 **这个从余积到 $Y$ 的箭头不唯一**，因为我们有无限多个槽位，可以任意安排除必须对应的向量之外的所有向量随心所欲地放在不同的 $Y$ 中，形成不同的态射。

为了弥补这一点，就只能让余积中的元素里每个都只包含有限个 $X_i$ 中的非零元素，剩下的全都置零。这样我们还有办法且是唯一的办法，来将余积中的元素唯一映射到 $Y$ 上。

另外，我们还可以从纯范畴论的角度来证明余积只能有有限个非零的分量。它的证明利用了所有 $g_i$ 的像可以张成余积的子空间的特点，并证明了这个张成的子空间其实就是余积本身，由此证明了余积的元素只能是有限个 $X_i$ 中的非零向量构成的（根据张成的定义，只能有有限个向量的线性组合）。这个方法由 MSE 的上 [Martin Brandenburg 做的这个回答](https://math.stackexchange.com/questions/523670/infinite-coproduct-of-abelian-groups?noredirect=1&lq=1) 给出的。有趣的点在于，这个回答其实是针对阿贝尔群范畴的，不过由于线性空间本身的确就是一个阿贝尔群，且这个问题的根源也在于阿贝尔群上的加法，所以这里贴的这个问题的解答实际上是完全适用于我们的问题的。同样，由于模本身也是一个阿贝尔群，所以模也有这样的构造，也有这样的问题，和这样的解答。

## 后记

这个问题说实在的，困扰了我挺久的。在我知道线性空间的直积、直和以及范畴论之后，这个问题就时不时弹出来，困扰我几天。然而，偶然的机会，我又系统地了解了一下线性空间中的内容，（因为连续介质力学，谢谢你，线性代数？）了解了一些和线性空间的基、线性相关/无关、子空间的和之间的内容，对这个问题有了一些自己的看法。

实际上这个问题在没有引入范畴论前单纯就是一个定义或者概念无法任意拓展产生的问题。由于直和是来源于子空间的直和，强依赖于 *有限* 线性组合，这个概念在代数上就是没法拓展到无限，因而连带着直和无论如何都没法自然地拓展到无限个线性空间的情况。而又由于直积的构造和线性空间的性质没有半点关系：他就是单纯地把所有的东西放在不同位置后捏在了一起，结果正好在最简单的逐点的加法定义和数乘定义下能成为一个合法的线性空间，就让它这么成为直积了。

这个问题实际上在范畴论的框架下得到了新的解答，又或者是更复杂（更丰富）的诠释。范畴论下，线性空间的直积变成积，直和变成余积，它们是一个交换图的一体两面，区别来源于态射的 *方向性*，而泛性质的存在神奇地规约了积和余积的 *形状*。很难让人不感慨范畴论的神奇。而如果再深入范畴论，就我所了解到的而言，它们的特点的区别可以更进一步追溯到 *极限* 和 *余极限* 上面，其中的一个是 “最大的”，另一个是 “最小的”，不知道读到这里的您有没有这样的感觉。然而如果谈论极限和余极限的话，内容会变得更复杂，可能需要涉及函子和自然变换之类我都不好说我懂的东西。所以，我们就此打住，一个满意的答案已经不错了。

在寻找这个问题的答案的过程中，我还发现了很多有趣的内容。比如 “线性空间总有一组基” 和著名的 AC，即选择公理，是等价的。当我们承认 AC 之后，所有的线性空间，即便是无限维的，也是存在一组基的。而如果我们能给一个无穷维线性空间找出一组基，我们就可以从这组基来构造别的基，而这个操作和某个在承认 AC 之后会出现的神奇现象：巴拿赫-塔斯基分球怪论的操作是非常类似的。另外，我们说的 “总有一组基” 依旧是在我们已有的 **线性组合** 的定义下的，即 **线性空间中的所有元素都可以被唯一表达为基的线性组合**，而这里的线性组合总是有限的。

所以其实这篇文章我一开始是计划在最后写一些集合论和线性空间的基的内容的。不过总归它们是和主题偏离地有点多的，我还是放弃了。而这篇文章一开始还计划从线性空间的定义开始逐步介绍整个问题，后面我也否定了，因为那样的话这篇文章又会变成超级大长篇。关于线性代数的部分，还是整理一下放在计划中的 *张量代数/张量微积分* 系列里面吧。这篇文章的内容我也不是非常满意吧，写的过程中卡了很多壳，有些地方的表述并不令人足够满意。如果您在读的过程中发现有的地方并不通顺，请自由提出批评；如果您有任何的建议，也欢迎提出。

另外还要感谢和推荐 [quiver](https://q.uiver.app/) 这个工具，本篇文章中的交换图都是使用它绘制的，方便易用，实在是非常不错。它在 GitHub 开源了，感兴趣还可以看看它的 [仓库](https://github.com/varkor/quiver)；同时感谢 B站 UP 主 [数学わかんない](https://space.bilibili.com/27733394) 的这一期 [（科普）直积和直和的不同--从线性代数到范畴论](https://www.bilibili.com/video/BV1mJfaYxEQ5)，讲得很好，帮了我很多。

那么，非常感谢您能看到这里。这样又长又晦涩难懂的文章（也许）能让您愿意看到这儿，我也就心满意足了。最后一如既往地，祝您身体健康，双节愉快~（即便只剩一天了吧大概）