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
draft: true
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

## 线性空间与范畴论

我们首先引入线性空间以及其上的一些性质，并介绍一些些范畴论的内容。

### 线性空间

线性空间，又称向量空间，我们很早就已经接触过了，比如我们在物理中经常用到的 $3$ 维线性空间 $\R^3$。直观理解就是线性空间是一个装满了向量的空间，最后这些向量可以被表达为一系列的数字。而如果从纯数学角度来讲，线性空间就是元素们满足 *线性* 的空间。下面我们给出定义。

> [!DEF]{线性空间}
>
> 给定一个数域 $\field{k}$ 和一个集合 $V$，我们给集合 $V$ 定义两个运算，（向量）加法以及数乘（标量乘法）：
>
> $$\begin{align*}&+\vcentcolon V \times V \to V, \quad (u,v)\mapsto u+v \ \  (\forall u,v \in V) \\ &\cdot\vcentcolon \field{k} \times V \to V,\quad (\lambda,v) \mapsto  \lambda \cdot v = \lambda v\ \ (\forall \lambda \in \field{k}, v \in V)\end{align*}$$
> 
> 当 $V$ 和 $\field{k}$ 满足下面的性质时，我们就称 $V$ 是一个 $\field{k}$ 上的线性空间：
> 
> - 加法存在单位元 $\zero\in V$ 满足 $\zero + v = v + \zero = v$ 对任意的 $v \in V$ 都成立;
> - 任何 $V$ 中元素 $v\in V$ 都在加法下存在一个逆元，记为 $-v$，使得 $v + (-v) = (-v)+v = \zero;$
> - 加法满足结合律：对于任意的 $u,v,w\in V$，有 $(u+v)+w = u+(v+w);$
> - 加法满足交换律：对任意的 $u,v\in V$，有 $u+v = v+u;$
> - 数乘存在单位元 $\one \in V$ 满足 $\lambda \one = \one$ 对于任意的 $\lambda \in \field{k}$ 都成立；
> - 数乘在向量加法上可分配：$a\cdot(u+v) = a\cdot u + a\cdot v$ 对于任意的 $a\in \field{k}, u,v\in V$ 都成立；
> - 数乘在域加法上也可分配：$(a+b)\cdot u = a\cdot u + b\cdot u$ 对于任意的 $a,b\in \field{k}, u\in V$ 都成立；
> - 数乘和域乘法次序可以交换：$a\cdot(b\cdot u) = (a\times b)\cdot u$ 对于任意的 $a,b\in \field{k}, u \in V$ 都成立。
>
> 我们称 $V$ 中的元素为向量，上面的定义中我们混用了向量加法和标量加法，因为二者定义域完全不同；我们用 $\cdot$ 和 $\times$ 区分向量的标量乘法以及标量在域内的乘法。一般我们不将乘法记号写出。
>

我们也可以说，向量空间是在阿贝尔群的基础上赋予一个域上的标量乘法后形成的模。

<details><summary>域、阿贝尔群、模和向量空间</summary>

我们在这里补充阿贝尔群、域和模它们的定义，以便了解向量空间是什么。首先是阿贝尔群：

> [!DEF]{阿贝尔群（交换群）}
>
> 给定集合 $G$，配备二元运算（称之为加法）
>
> $$+\vcentcolon G\times G\to G, \quad (a,b)\mapsto a+b\ \ (\forall a,b\in G).$$
>
> 若满足以下条件，则称 $(G,+)$ 为阿贝尔群：
>
> - 存在加法单位元 $0\in G$，对任意 $a\in G$，有 $0+a=a+0=a$；
> - 对任意 $a\in G$，存在加法逆元 $-a\in G$，使得 $a+(-a)=(-a)+a=0$；
> - 结合律：对任意 $a,b,c\in G$，有 $(a+b)+c=a+(b+c)$；
> - 交换律：对任意 $a,b\in G$，有 $a+b=b+a$。

由此可以看出，我们给线性空间定义的前四条规则确实让 $V$ 在向量加法下形成一个阿贝尔群。值得一提的是，若去掉交换律，则成为一般的群，此时不用加法表示群内的运算，而使用乘法。而如果我们把两个阿贝尔群 “套” 在一起，就形成了域：

> [!DEF]{域}
>
> 给定集合 $\field{k}$，配备两种二元运算（分别称为加法和乘法）：
>
> $$+\vcentcolon \field{k}\times\field{k}\to\field{k},\quad \times\vcentcolon \field{k}\times\field{k}\to\field{k}.$$
>
> 若满足以下条件，则称 $(\field{k},+,\times)$ 为一个域：
>
> - $(\field{k},+)$ 构成阿贝尔群，记加法单位元为 $0$，元素 $a$ 的加法逆元为 $-a$；
> - $(\field{k}\setminus\{0\},\times)$ 构成阿贝尔群，乘法单位元记为 $1$，且 $1\neq 0$；
> - 乘法对加法分配：对任意 $a,b,c\in\field{k}$，
>   $a\times(b+c)=a\times b+a\times c$ 且 $(a+b)\times c=a\times c+b\times c$。
>
> 我们通常省略乘法记号 $\times$，直接记作 $ab$。

可以看到，我们只需要给一个集合上定义大家都有的加法以及挖掉 $0$ 之后的乘法，让它们都是交换的，且乘法可以分配进加法，就形成了一个域。最常见的数域有有理数域 $\field{Q}$，实数域 $\field{R}$，复数域 $\field{C}$ 等。另外值得一提的是，如果我们去掉域乘法中的交换律和可逆元（即乘法不可以交换次序，且一个元素在乘法下不一定可逆），我们就得到了环：

> [!DEF]{环}
>
> 给定集合 $R$，配备二元运算（加法与乘法）
>
> $$+\vcentcolon R\times R\to R,\qquad \times\vcentcolon R\times R\to R.$$
>
> 若满足以下条件，则称 $(R,+,\times)$ 为带幺结合环（简称环）：
>
> - $(R,+)$ 是阿贝尔群，记加法单位元为 $0$，元素 $a$ 的加法逆元为 $-a$；
> - 乘法结合且存在单位元 $1_R$：对任意 $a,b,c\in R$，有 $(ab)c=a(bc)$，且 $1_Ra=a1_R=a$；
> - 分配律：对任意 $a,b,c\in R$，有 $a(b+c)=ab+ac$ 且 $(a+b)c=ac+bc$。
>
> 通常约定 $1_R\neq 0$。若乘法交换，则称为交换环；若每个非零元在乘法下可逆，则为除环；既交换且每个非零元可逆即为域。

有了环，我们就可以定义模了：

> [!DEF]{模}
>
> 给定带幺结合环 $R$ 与集合 $M$，定义加法与标量乘法：
>
> $$+\vcentcolon M\times M\to M,\qquad \cdot\vcentcolon R\times M\to M,\ (r,u)\mapsto r\cdot u.$$
>
> 若满足以下条件，则称 $M$ 是一个左 $R$-模：
>
> - $(M,+)$ 是阿贝尔群，记加法单位元为 $0$；
> - 分配律（对 $M$ 的加法）：对任意 $r\in R,\,u,v\in M$，有 $r\cdot(u+v)=r\cdot u+r\cdot v$；
> - 分配律（对 $R$ 的加法）：对任意 $r,s\in R,\,u\in M$，有 $(r+s)\cdot u=r\cdot u+s\cdot u$；
> - 相容性：对任意 $r,s\in R,\,u\in M$，有 $(rs)\cdot u=r\cdot(s\cdot u)$；
> - 单位元作用：对任意 $u\in M$，有 $1_R\cdot u=u$。
>
> 若上面的标量乘法中 $r\in R$ 是从右侧作用在 $u\in M$ 的，保持其他性质不变，我们就称它为一个右 $R$ 模。当 $R$ 是一个交换环的时候，左模和右模是一样的；当 $R$ 是域时，$R$-模即为我们熟悉的向量空间。

可以看到，模就是向量空间的一个推广，它不再要求 “标量” 是域中元素，而是一个环里的元素。

</details>

而由于线性空间的 *线性*，我们可以自由数乘线性空间中向量们，再按照喜好加减它们。而如果我们选择合适的一组向量，我们可以把向量空间中的任何元素都表达为这组向量的数乘和加法的组合。我们下面将这个想法描述为数学语言，为此我们先引入线性组合和线性无关的概念。

### 线性组合、线性无关、子空间、基

我们先定义线性组合，这是最基础的概念之一，有了它我们就可以定义线性相关和线性无关。

> [!DEF]{线性组合}
>
> 设 $\field{k}$ 上的线性空间 $V$，由 $V$ 上的加法和数乘，我们定义 $V$ 的一个含有 $n$ 个元素（向量）的子集 $W$ 的 **线性组合** 为形如 
>
> $$\sum_i^n \lambda_i v_i$$
>
> 的 **有限** 和，其中 $\lambda_i\in \field{k}$ 且 $v_i\in W\subset V$。我们称 $\field{k}$ 中的标量为线性组合的系数。

有了线性组合，我们定义线性相关和线性无关。

> [!DEF]{线性相关与线性无关}
>
> 对 $\field{k}$ 上的线性空间 $V$ 的一个有 $n$ 个元素的子集 $W$，如果它们的线性组合满足条件：
>
> $$\sum_i^n \lambda_i v_i = \zero \iff \lambda_i = 0 \ \ \forall v_i \in W, 1\leq i \leq n,$$
>
> 则我们称这个子集 $W$ 是线性无关的，否则称其为线性相关的。

另外我们定义线性子空间以及线性张成，以及线性空间的基：

> [!DEF]{线性子空间，线性张成}
>
> 给定线性空间 $V$ 的一个子集 $W$，如果它在原线性空间 $V$ 中定义的加法和数乘下依然满足线性空间的性质，我们就称 $W$ 是 $V$ 的一个线性子空间。
>
> 依旧考虑线性空间 $V$ 的一个子集 $G$，它可以 **线性张成** 或者 **生成** 一个线性子空间 $W$，方法是在 $V$ 的运算定义下对 $G$ 中元素进行线性组合所得到的所有结果。此时我们称 $W$ 是 $G$ 的线性张成，$G$ 是$W$ 的生成集或者张成列表。
>
> 如果一个 $V$ 的子集 $B$ 即能张成 $V$ 又是线性独立的，我们就称集合 $B$ 是 $V$ 的一组 **基**，$B$ 的基数（集合的大小）即为该线性空间的维数。

有了基，我们就可以对线性空间进行更复杂的描述以及操作了。比如，根据基的定义，每个线性空间中的向量都可以被表达为基的线性组合。注意到如果我们给定基且对其进行排序之后，线性组合的结果完全由其线性组合系数确定。我们可以把系数记录为一个数表，沿纵向排列即成为我们熟知的 *列向量*。

### 线性映射（线性同态）

接下来我们讨论线性空间之间的映射。我们自然希望这样的映射不会破坏线性空间的结构：一个线性空间在映射后依旧还是一个线性空间。这样的想法在严格化后成为所谓的线性映射：

> [!DEF]{线性映射（线性同态）}
>
> 设 $V,W$ 为同一数域 $\field{k}$ 上的线性空间。映射
> 
> $$f\vcentcolon V\to W$$
> 
> 称为线性映射或线性同态，若对任意 $u,v\in V$ 与 $\lambda\in\field{k}$，有
> 
> $$f(u+v)=f(u)+f(v),\qquad f(\lambda u)=\lambda f(u).$$
> 
> 等价地，对任意有限和，
> 
> $$f\Bigl(\sum_{i=1}^n \lambda_i v_i\Bigr)=\sum_{i=1}^n \lambda_i f(v_i).$$
> 
> 记全体线性映射为 $\Hom_{\field{k}}(V,W)$ 或 $\mathcal{L}(V,W)$。当 $V=W$ 时称为线性算子；若 $f$ 为双射且 $f^{-1}$ 亦线性，则称为线性同构。

总的来讲，$V$ 到 $W$ 的线性映射 $f$ 让下面的做法是完全可行的：我们可以直接将 $v\in V$ 映射到 $w = f(v) \in W$，也可以先将 $v$ 变为几个向量 $v_i$ 的线性组合，再把这些向量映射到 $w_i = f(v_i) \in W$ 中，最后再对它们进行线性组合。这两条路径将给出完全相同的结果。

线性映射在给两边的线性空间选定基之后还可以表达为我们常听到的另一个概念：*矩阵*。不过今天它不是我们的主角，我们不去谈它。我们转而讨论一个神秘的东西，代数学中经常提到的，也是今天主角之一：范畴。

## 范畴

范畴是这样的一个东西，它收集一系列的数学 *对象*，以及这些数学对象之间的 *箭头*，也称它们为 *态射*，最后规定这些箭头们要满足的公理。

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

我们提出所谓的交换图。交换图把 *两个运算交换顺序* 这一性质给可视化了。以线性空间中的线性映射为例，对于线性空间范畴 $\catname{Vect}_\field{k}$ 中的两个线性空间 $V,W$ 以及它们之间从 $V$ 到 $W$ 的一个态射 $f\vcentcolon V\to W$，根据定义我们有下面两个交换图成立：

对于加法，我们有：

<!-- https://q.uiver.app/#q=WzAsNCxbMCwwLCJWIFxcdGltZXMgViJdLFsxLDAsIlcgXFx0aW1lcyBXIl0sWzAsMSwiViJdLFsxLDEsIlciXSxbMCwxLCJmIFxcdGltZXMgZiJdLFswLDIsInsrX1Z9IiwyXSxbMSwzLCJ7K19XfSJdLFsyLDMsImYiLDJdXQ== -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwwLCJWIFxcdGltZXMgViJdLFsxLDAsIlcgXFx0aW1lcyBXIl0sWzAsMSwiViJdLFsxLDEsIlciXSxbMCwxLCJmIFxcdGltZXMgZiJdLFswLDIsInsrX1Z9IiwyXSxbMSwzLCJ7K19XfSJdLFsyLDMsImYiLDJdXQ==&embed" width="372" height="304" style="border-radius: 8px; border: none;"></iframe>

其中右下角的下标表示不同线性空间之间的向量加法。对于标量乘法，我们有：

<!-- https://q.uiver.app/#q=WzAsNCxbMCwwLCJcXG1hdGhiYntrfSBcXHRpbWVzIFYiXSxbMSwwLCJcXG1hdGhiYntrfSBcXHRpbWVzIFciXSxbMCwxLCJWIl0sWzEsMSwiVyJdLFswLDEsIntcXG1hdGhybXtpZH1fe1xcbWF0aGJie2t9fSBcXHRpbWVzIGZ9Il0sWzAsMiwie1xcY2RvdF9WfSIsMl0sWzEsMywie1xcY2RvdF9XfSJdLFsyLDMsImYiLDJdXQ== -->
<span style="display:block"><iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwwLCJcXG1hdGhiYntrfSBcXHRpbWVzIFYiXSxbMSwwLCJcXG1hdGhiYntrfSBcXHRpbWVzIFciXSxbMCwxLCJWIl0sWzEsMSwiVyJdLFswLDEsIntcXG1hdGhybXtpZH1fe1xcbWF0aGJie2t9fSBcXHRpbWVzIGZ9Il0sWzAsMiwie1xcY2RvdF9WfSIsMl0sWzEsMywie1xcY2RvdF9XfSJdLFsyLDMsImYiLDJdXQ==&embed" width="347" height="304" style="border-radius: 8px; border: none;"></iframe></span>

同样，右下角下标表示不同线性空间的数乘。我们说这两个图交换当且仅当有我们上面给出的那个关于线性映射的定义，或者使用范畴论的方式，用态射的复合，有下面两个式子成立：

$$ +_W \circ f\times f = f\circ +_V;$$
$$ \cdot_W\circ \mathrm{id}_\field{k}\times f = f\circ \cdot_V.$$

其中，$\circ$ 代表的是态射的复合，第一个式子代表第一个图交换，第二个式子则为第二个图交换。

有了这些铺垫，我们可以来讨论范畴论中的 *积* 和 *余积* 了。

### 积-直积

### 余积-直和

## 无限维的噩梦

## 原来是集合论

## 后记
