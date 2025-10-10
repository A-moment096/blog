---
categories:
- Mathematics
# - Programming
# - Phase Field
# - Others
tags:
- Linear Algebra
- Note
title: 线性代数笔记 I
description: 记号约定，线性空间及其基本性质
date: 2025-10-10T09:03:01+08:00
image: 
math: true
hidden: false
comments: true
draft: true
---
$$
% 
% Linear algebra notations
% 
% ===== Scalars, Vectors, Matrices, Operators, Tensors =====
\gdef\vect#1{\mathbf{#1}}        % abstract vector
\gdef\mat#1{\mathbf{#1}}         % matrix (representation)
\gdef\op#1{\mathsf{#1}}          % abstract linear operator/map
\gdef\ten#1{\mathcal{#1}}        % higher-order tensor
% ===== Basis and Dual Basis =====
\gdef\basis#1#2{\mathbf{ #1 }_{ #2 }}   % basis vector e_i
\gdef\cbasis#1#2{\mathbf{#1}^{#2}}  % dual basis e^i
% ===== Representations =====
\gdef\mrep#1#2#3{[{#1}]_{#3,#2}}      % representation [L]_{C,B}
\gdef\vrep#1#2{[{#1}]_{#2}}    % coordinate representation [v]_B
% ===== Common Linear Algebra Symbols =====
\gdef\id{\mathbf{I}}             % identity matrix
\gdef\iprod#1#2{\langle #1, #2 \rangle} % inner product
\gdef\ot{\otimes}                % tensor product symbol
% ===== Optional Pretty Aliases =====
\gdef\R{\mathbb{R}}
\gdef\C{\mathbb{C}}
\gdef\field#1{\mathbb{#1}}
% ==== ====
\gdef\zero{\vect{0}}
\gdef\one{\vect{1}}
% 
% Categorical Notations
% 
% --- Morphism arrows ---
\gdef\xto#1{\xrightarrow{#1}}             % arrow with label
\gdef\xfrom#1{\xleftarrow{#1}}            % left arrow with label
\gdef\isoto{\xrightarrow{\sim}}           % isomorphism arrow
\gdef\toiso{\xrightarrow{\cong}}          % congruence/isomorphism arrow
% --- Composition & Identity ---
\gdef\idop{\mathrm{id}}                   % identity morphism
\gdef\comp{\circ}                         % composition symbol
% --- Objects, Morphisms, Functors ---
\gdef\Obj#1{\operatorname{Obj}(#1)}                 % objects of a category
\gdef\Mor#1{\operatorname{Mor}(#1)}                 % morphisms of a category
\gdef\HomC#1#2#3{\operatorname{Hom}_{#1}(#2,#3)}    % morphisms in a category: Hom_C(A,B)
\gdef\Hom#1#2{\operatorname{Hom}(#1,#2)}            % morphisms between A and B
\gdef\End#1{\operatorname{End}(#1)}
\gdef\Aut#1{\operatorname{Aut}(#1)}
\gdef\cat#1{\mathsf{#1}}                            % category symbol: e.g., \cat{Vect}, \cat{Set}
\gdef\fun#1{\mathcal{#1}}                           % functor name (calligraphic)
\gdef\nat#1{\boldsymbol{#1}}                        % natural transformation (bold Greek or Latin)
% --- Special categories ---
\gdef\Set{\cat{Set}}                                % category of sets
\gdef\Vectk{\cat{Vect}_{\field{k}}}                % category of vector spaces
\gdef\Vect{\cat{Vect}}
$$

## 前言

由于鄙人需要学习一些力学（连续介质力学）的内容，涉及张量代数和张量微积分的概念，而要想理解它们就不得不提传说中的神秘课程：线性代数。所以既然如此，干脆就从代数学的角度，以线性代数为起点开始整个旅途。由于本文的内容掺杂了（也许很多的）我的个人理解，所以如果有错漏，请不吝赐教。

## 记号约定

既然从代数学出发，我们必须得约定一些符号。代数学的记号纷繁复杂，这里不讲清楚，后面铁定乱套。下面是一个符号表，为了简洁我们把它收起来。
<details>
<summary>符号表</summary>

| 含义 | 字体/字形 | 示例 |
|:-:|:--:|:---:|
| 标量 | 常规拉丁/希腊字母 | $x,\lambda$ |
| 向量空间 | 常规大写拉丁字母 | $U,V,W$ |
| 抽象向量 | 粗体小写拉丁字母 | $\vect{v}$ |
| 矩阵（线性算子的矩阵表示） | 粗体大写拉丁字母 | $\mat{A},\mat{B}$ |
| 单位矩阵，零矩阵 | - | $\mat{I,O}$ |
| 抽象线性算子/映射 | 无衬线体大写拉丁字母 | $\op{T},\op{L}$ |
| 高阶张量 | 花体拉丁字母 | $\ten{T},\ten{Q}$ |
| 数域 | 黑板粗体 | $\mathbb{k},\R,\C$ |
| 特殊范畴 | 无衬线体 | $\Set,\Vect{k}$ |
| 恒等态射 | - | $\idop_A$ |
|||
| 基向量 | 粗体+下（上）标 | $\basis{e}{i}$, $\cbasis{e}{i}$ |
| 线性空间的基 | 括号+基向量代表元 | $\{\basis{e}{i}\}$ |
| 线性算子 $\op{L}\vcentcolon B\to C$ 的矩阵表示 | 括号表示+下标 | $\mrep{\op{L}}{B}{C}$ |
| 矩阵的分量 | 常规大写拉丁字母与上下标 | $A^i{}_j$ |
| 向量 $\vect{v}\in B$ 的坐标表示 | 括号表示+下标 | $[\vect{v}]_B$ |
| 向量的分量 | 常规小写字母与上下标 | $u^i, v_j$ |
| 内积 | 角括号 | $\langle \vect{u}, \vect{v} \rangle$ |
| 张量积 | 叉积号 | $\vect{u}\otimes \vect{v}$ |
| 单态 | 带钩箭头 | $A \xhookrightarrow{f} B$ |
| 满态 | 双箭头 | $A \xtwoheadrightarrow{f} B$ |
| 同构 | 双向箭头 | $A \xleftrightarrow{f} B$ |
| 复合 | 复合符号 | $g\comp f$ |
| 对象集 | 正体 | $\operatorname{Obj}(\mathcal{C})$ |
| 态射集 | 正体 | $\operatorname{Mor}(\mathcal{C})$ |
| 在范畴 $\mathcal C$ 中的 Hom 集 | 运算符体+下标 | $\HomC{\mathcal C}{A}{B}$ |

</details>
简单来说，我们用黑体代表矩阵和向量，用普通小写字母代表标量，当普通字母带上了上下标则代表对应的矩阵/向量分量。然后，我们严格区分线性映射和矩阵。我们暂且使用这一套符号。另外，我们不使用爱因斯坦求和约定，直到我们彻底进入张量代数的内容。写清楚具体的求和过程在推导中是有帮助的。

有了这些铺垫，我们就开始吧。我们先介绍一个线性空间它都有哪些基本属性，以及它上面可以定义的一个特殊的函数。

## 线性空间

**线性空间**，又称 **向量空间**，我们很早就已经接触过了，比如我们在物理中经常用到的 $3$ 维线性空间 $\R^3$。直观理解就是线性空间是一个装满了向量的空间，最后这些向量可以被表达为一系列的数字。而如果从纯数学角度来讲，线性空间就是元素们满足 *线性* 的空间。下面我们给出定义。

> [!DEF]{线性空间}
>
> 给定一个数域 $\field{k}$ 和一个集合 $V$，我们给集合 $V$ 定义两个运算，（向量）加法以及数乘（标量乘法）：
>
> $$\begin{align*}
&+\vcentcolon V \times V \to V, \\ &(\vect{u},\vect{v})\mapsto \vect{u}+\vect{v} \ \  (\forall \vect{u},\vect{v} \in V) \\
&\cdot\vcentcolon \field{k} \times V \to V,\\ &(\lambda,\vect{v}) \mapsto  \lambda \cdot \vect{v} = \lambda \vect{v}\ \ (\forall \lambda \in \field{k}, \vect{v} \in V)
\end{align*}$$
> 
> 当 $V$ 和 $\field{k}$ 满足下面的性质时，我们就称 $V$ 是一个 $\field{k}$ 上的线性空间：
> 
> - 加法存在单位元 $\zero\in V$ 满足 $\zero + \vect{v} = \vect{v} + \zero = \vect{v}$ 对任意的 $\vect{v} \in V$ 都成立;
> - 任何 $V$ 中元素 $\vect{v}\in V$ 都在加法下存在一个逆元，记为 $-\vect{v}$，使得 $\vect{v} + (-\vect{v}) = (-\vect{v})+\vect{v} = \zero;$
> - 加法满足结合律：对于任意的 $\vect{u},\vect{v},\vect{w}\in V$，有 $(\vect{u}+\vect{v})+\vect{w} = \vect{u}+(\vect{v}+\vect{w});$
> - 加法满足交换律：对任意的 $\vect{u},\vect{v}\in V$，有 $\vect{u}+\vect{v} = \vect{v}+\vect{u};$
> - 数乘存在单位元 $\one \in V$ 满足 $\lambda \one = \one$ 对于任意的 $\lambda \in \field{k}$ 都成立；
> - 数乘在向量加法上可分配：$a\cdot(\vect{u}+\vect{v}) = a\cdot \vect{u} + a\cdot \vect{v}$ 对于任意的 $a\in \field{k}, \vect{u},\vect{v}\in V$ 都成立；
> - 数乘在域加法上也可分配：$(a+b)\cdot \vect{u} = a\cdot \vect{u} + b\cdot \vect{u}$ 对于任意的 $a,b\in \field{k}, \vect{u}\in V$ 都成立；
> - 数乘和域乘法次序可以交换：$a\cdot(b\cdot \vect{u}) = (a\times b)\cdot \vect{u}$ 对于任意的 $a,b\in \field{k}, \vect{u} \in V$ 都成立。
>
> 我们称 $V$ 中的元素为向量，上面的定义中我们混用了向量加法和标量加法，因为二者定义域完全不同；我们用 $\cdot$ 和 $\times$ 区分向量的标量乘法以及标量在域内的乘法。一般我们不将乘法记号写出。

我们也可以说，向量空间是在阿贝尔群的基础上赋予一个域上的标量乘法后形成的模。

而由于线性空间的 *线性*，我们可以自由数乘线性空间中向量们，再按照喜好加减它们。而如果我们选择合适的一组向量，我们可以把向量空间中的任何元素都表达为这组向量的数乘和加法的组合。我们下面将这个想法描述为数学语言，为此我们先引入线性组合和线性无关的概念。

下文我们始终将大写字母 $V$ 和 $W$ 作为我们要使用的线性空间。如果没有特殊声明，我们讨论的线性空间皆为数域 $\R$ 上的线性空间。

## 线性组合

对一组向量可以做 **线性组合**：给向量们数乘以某一些数字后相加。下面是定义：

> [!DEF]{线性组合}
>
> 设 $\field{k}$ 上的线性空间 $V$，由 $V$ 上的加法和数乘，我们定义 $V$ 的一个含有 $n$ 个元素（向量）的子集 $W$ 的 **线性组合** 为形如 
>
> $$\sum_i^n \lambda_i \vect{v}_i$$
>
> 的 **有限** 和，其中 $\lambda_i\in \field{k}$ 且 $\vect{v}_i\in W\subset V$。我们称 $\field{k}$ 中的标量为线性组合的系数。

有了线性组合，我们定义线性相关和线性无关。

## 线性相关与线性无关

线性相关和线性无关描述了一组向量之间的关系，是某种 “独立性” 的检验。

> [!DEF]{线性相关与线性无关}
>
> 对 $\field{k}$ 上的线性空间 $V$ 的一个有 $n$ 个元素的子集 $W$，如果它们的线性组合满足条件：
>
> $$\sum_i^n \lambda_i \vect{v}_i = \zero \iff \lambda_i = 0 \ \ \forall \vect{v}_i \in W, 1\leq i \leq n,$$
>
> 则我们称这个子集 $W$ 是线性无关的，否则称其为线性相关的。

另外我们定义线性子空间以及线性张成，以及线性空间的基：

## 线性子空间、线性张成和基

在拥有一个线性空间之后，我们自然想问：它作为集合来看，它的子集能否具有一些特别的性质？我们指出：可以，且有所谓的 **线性子空间**。如果一个线性空间 $V$ 的子集 $U\subseteq V$ 在赋予了 $V$ 的加法和数乘之后依然满足线性空间八条公理，则我们称这个集合 $U$ 配以两种运算之后得到的是 $V$ 的一个线性子空间。

> [!DEF]{线性子空间}
>
> 给定线性空间 $V$ 的一个子集 $W$，如果它在原线性空间 $V$ 中定义的加法和数乘下依然满足线性空间的性质，我们就称 $W$ 是 $V$ 的一个线性子空间。
>

另外，当我们有了一组基之后，我们可以考虑用它自由地进行线性组合：乘以任何允许的系数，然后进行有限多次相加。这样的操作我们称之为线性张成。

> [!DEF]{线性张成}
>
> 依旧考虑线性空间 $V$ 的一个子集 $G$，它可以 **线性张成** 或者 **生成** 一个线性子空间 $W$，方法是在 $V$ 的运算定义下对 $G$ 中元素进行线性组合所得到的所有结果。此时我们称 $W$ 是 $G$ 的线性张成，$G$ 是$W$ 的生成集或者张成列表。

而且，线性空间中存在特殊的线性无关向量组，它能张成 $V$ 自己，我们称之为基：

> [!DEF]{基}
> 
> 如果一个 $V$ 的子集 $B$ 即能张成 $V$ 又是线性独立的，我们就称集合 $B$ 是 $V$ 的一组 **基**，$B$ 的基数（集合的大小）即为该线性空间的维数，记作 $\dim V$。

实际上线性子空间与基还有特殊的关系：如果线性空间 $V$ 有一组基 $B$，我们从中分出两份来，一份为 $B_1$，另一份为 $B_2$，然后让它们俩再进行线性张成，得到的两个线性空间都是 $V$ 的线性子空间。而更特别的是，由于这两个线性子空间作为集合来看，只在零向量 $\zero$ 处相交，所以我们可以定义所谓的 **直和**，并称 $V$ 可以分解为这两个子空间的直和。

直和有很多有趣的性质，感兴趣可以参考我的另一篇博文，这里就不再赘述了。

我们还有另一种方法，不依赖线性张成地定义基。一组线性无关的向量如果在添加空间内的任意一个别的向量后都会变得线性相关的的话，则称这组线性无关的向量为该线性空间的极大无关组。而线性空间的一个极大线性无关组就可以成为线性空间的一组基。这个定义和上面的定义方式是等价的，这里就不再赘述。

有了基，我们就可以对线性空间进行更复杂的描述以及操作了。比如，根据基的定义，每个线性空间中的向量都可以被表达为基的线性组合。注意到如果我们给定基且对其进行排序之后，线性组合的结果完全由其线性组合系数确定。我们可以把系数记录为一个数表，沿纵向排列即成为我们熟知的 *列向量*。

## 向量的表示

我们以某种确定的顺序对这组基进行排序，记这组基为 $B = \{\basis{e}{i}\}$ ，在这一组基下我们可以将线性空间中的每一个向量 *唯一地* 表示为一个数表，这个数表有 $n$ 个数字有序地构成，我们称这些数字为向量在第 $i$ 个基（方向）上的分量。后续我们认为所有的基都是经过了排序的。我们把这 $n$ 个数字纵向依次排列，成为列向量；不致引起误会时，我们简称为向量。由此，向量有两重含义：抽象线性空间中的一个元素，或者在线性空间有一组基后的一个纵向排列的数表。我们记 $n$ 维向量空间 $V$ 中的向量 $\vect{v}\in V$ 第 $i$ 个分量为 $v^i$，则有

$$
\vect{v} = \sum_i^n v^i \basis{e}{i}。
$$

进一步地，由于这样的对应关系，我们可以考虑把 $\field{k}$ 上的 $n$ 维线性空间与一个特殊的，我们很熟悉的线性空间 $\field{k}^n$ 联系起来，在 $\field{k} = \R$ 的情况下我们得到了熟悉的 $\R^n$ 空间。这个对应方法便是把一个向量在一组基下的表示，即列向量数表，变成 $\R^n$ 的一个坐标。我们提前剧透：这个对应关系是一种同构，而所有的 $n$ 维线性空间在给自己选择一组基之后都与 $\field{k}^n$ 有一个同构。我们后面主要考虑 $\R$ 上的线性空间。

## 线性映射

一个线性空间本身并没有特别多可说的，而要想更深入研究线性空间，就必须将不同的线性空间联系起来。而这个联系不同线性空间的东西是所谓的 **线性映射**。

线性映射首先是从线性空间到线性空间的 *映射*，随后再要求它具有 *线性性*。线性性即保持线性空间结构（加法和数乘）的性质，拥有这样性质的映射不会破坏线性空间的结构：一个线性空间在映射后一定是一个线性空间。这样的想法在严格化后成为所谓的线性映射，或者 **线性同态**。

> [!DEF]{线性映射（线性同态）}
>
> 设 $V,W$ 为同一数域 $\field{k}$ 上的线性空间。映射
> 
> $$\op{L}\vcentcolon V\to W$$
> 
> 称为线性映射或线性同态，若对任意 $\vect{u},\vect{v}\in V$ 与 $\lambda\in\field{k}$，有
> 
> $$\op{L}(\vect{u}+\vect{v})=\op{L}(\vect{u})+\op{L}(\vect{v}),\qquad \op{L}(\lambda \vect{u})=\lambda \op{L}(\vect{u}).$$
> 
> 等价地，对任意有限和，
> 
> $$\op{L}\Bigl(\sum_{i=1}^n \lambda_i v_i\Bigr)=\sum_{i=1}^n \lambda_i \op{L}(v_i).$$
> 
> 我们记全体线性映射为集合 $\Hom{V}{W}$。若 $\op{L}$ 为双射，则称 $\op{L}$ 为线性同构。

总的来讲，$V$ 到 $W$ 的线性映射 $\op{L}$ 让下面的做法是完全可行的：我们可以直接将 $\vect{v}\in V$ 映射到 $\vect{w} = \op{L}(\vect{v}) \in W$，也可以先将 $\vect{v}$ 变为几个向量 $\vect{v}_i$ 的线性组合，再把这些向量映射到 $\vect{w}_i = \op{L}(\vect{v}_i) \in W$ 中，最后再对它们进行线性组合。这两条路径将给出完全相同的结果。我们称从线性空间 $V$ 到其自身的线性映射为 *线性变换* 或者 *线性算子*，$V$ 上全体线性变换形成的集合可以记为 $\End{V}$。

## 线性空间范畴

有了线性映射，我们就有了把不同的线性空间联系在一起的方法，而如果我们综合考虑所有的 $\field{k}$ 上的线性空间以及它们之间的所有线性映射，我们就可以得到所谓的 **线性空间范畴**。我们记这样的范畴为 $\Vectk$。而当我们已经明确了定义线性空间使用的数域时，我们可以使用 $\Vect$ 来简记。

我们称线性空间是这个范畴中的一个对象，而线性空间之间的线性映射则是它们之间的同态。两个对象之间可以有许多种不同的同态，我们可以将这些同态收集起来，就得到了上面的 $\Hom{V}{W}$。如果两个对象之间具有保持结构的双射及逆映射，我们就称它们二者之间有一个同构，而这两个对象也成为同构的对象。我们还可以让一个对象和它自身形成同态，得到的就是上面的 $\End{V}$；进一步地，考虑所有的该对象到自己的同构，我们得到的集合记作 $\Aut{V}$。这些集合上面都有丰富的性质，我们以后会聊到。所以其实上面的记号是借用了范畴论的一些记号得到的。

我们这里介绍范畴的概念主要原因是为了方便后续使用交换图的语言来讨论一些问题，比如线性空间的对偶，双对偶，自然映射等等。关于范畴的定义，我们这里不给出，感兴趣可以参考之前的一些文章，里面有对范畴进行详细严格的定义。

## 内积

最后，我们给向量空间额外定义一个运算：内积。这不是线性空间天生具有的属性，但是我们会经常用到它。

> [!DEF]{内积}
>
> 内积（有时根据上下文，也称作点积）是满足下面性质的一个 $\langle\cdot,\cdot\rangle\vcentcolon V\times V\to \field{k}$ 的二元运算：
>
> - 共轭对称：$\langle \vect{x},\vect{y}\rangle = \overline{\langle \vect{y},\vect{x}\rangle};$
> - 对第一个元素有线性性：$\langle a\vect{x}+b\vect{y},\vect{z}\rangle = a\langle \vect{x},\vect{z}\rangle + b\langle \vect{y},\vect{z}\rangle;$
> - 非负性：对任意的非 $0$ 元素 $\vect{x}$，$\langle \vect{x},\vect{x}\rangle > 0;$

带有内积的向量空间成为内积空间。由于我们讨论的向量空间在 $\R$ 上，共轭对称退化为单纯的对称，而它也自然地成为 **双线性函数**。在内积定义后我们可以定义正交：内积为 $0$ 的两个向量是正交的。借助内积我们可以定义向量之间的 *角度* 以及向量的 *长度*。我们以我们熟悉的方式定义内积：$\langle \vect{u},\vect{v} \rangle = \vect{u}\cdot\vect{v} = \sum_i u_i{v}_i$。在这样的定义后，我们 **声明** 我们之前定义的这组基是单位正交基，即基中每个向量的长度为 $1$，且彼此正交。而在这样的定义下，$\R^n$ 由 “坐标” 形成的基自然成为一组单位正交基。

定义了内积的向量空间我们会称之为内积空间。涉及 “正交” 的部分概念是需要内积的参与的，当需要用到内积时我们会提及。而双线性函数是一类非常特殊的函数，我们会在后面快要讨论张量时聊起它。

## 小结

我们这里简单做一个小结。本节中我们做了这些事：

- 定义什么是线性空间：满足八条公理的集合为一个线性空间；
- 从线性空间的定义发展了线性组合的概念：由系数和向量进行数乘后相加就叫线性组合；
- 根据线性组合，我们发展了线性相关和线性无关，这给出了一组向量之间的关系；
- 借助线性无关的概念，我们进一步得到了所谓的基。基允许我们将向量空间中的所有元素都表达为基的线性组合。
- 基允许我们将一个抽象的线性空间和我们熟悉的 $\R^n$ 联系起来。
- 线性空间之间可以通过线性映射联系起来，如果它是保持线性空间结构的双射，则我们进一步称之为线性同构
- 线性空间和它们之间的同态的全体成为线性空间范畴，借助范畴的语言我们可以讨论更多有关线性空间之间的关系。
- 我们在线性空间上可以定义内积，借助它可以定义正交、长度等性质。

本节我们聊完了线性空间的基本情况。下一节我们将讨论线性代数中最重要的对象，矩阵，它的基本情况以及与线性空间之间的关系。