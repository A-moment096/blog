---
categories:
- Mathematics
# - Programming
# - Phase Field
# - Others
tags:
- Linear Algebra
- Note
title: 线性代数笔记 II
description: 线性映射，矩阵和对偶空间
date: 2025-10-11T09:03:01+08:00
image: 
math: true
hidden: false
comments: true
draft: true
---
$$
% =====  =====
\gdef       \vect           #1{\mathbf{#1}}                             % abstract vector
\gdef       \cvect          #1{\boldsymbol{#1}}
\gdef       \basis          #1#2{\mathcal{#1}_{#2}}                            % basis of vector space
\gdef       \basev          #1#2#3{\{\vect{#1}_{#2}\}_{#2=1}^{#3}}                     % base vector collection
\gdef       \cbasev         #1#2#3{\{\cvect{#1}^{#2}\}_{#2=1}^{#3}}                      % dual basis e^i
\gdef       \vrep           #1#2{[\vect{#1}]_{#2}}                           % coordinate representation [v]_B
\gdef       \rep            #1{[\vect{#1}]}
\gdef       \mrep           #1#2#3{[{#1}]_{#2}^{#3}}                      % representation [L]_{C,B}
% 
\gdef       \iprod          #1#2{\langle #1, #2 \rangle}                % inner product
\gdef       \mat            #1{\mathbf{#1}}                             % matrix (representation)
\gdef       \field          #1{\mathbb{#1}}                             % 
\gdef       \xto            #1{\xrightarrow{#1}}                        % arrow with label
\gdef       \xfrom          #1{\xleftarrow{#1}}                         % left arrow with label
\gdef       \Hom            #1{\operatorname{Hom}(#1)}             % morphisms between A and B
\gdef       \Iso            #1{\operatorname{Iso}(#1)}
\gdef       \End            #1{\operatorname{End}(#1)}                  % 
\gdef       \Aut            #1{\operatorname{Aut}(#1)}                  % 
\gdef       \cat            #1{\mathsf{#1}}                             % category symbol: e.g., \cat{Vect}, \cat{Set}
\gdef       \Mat            #1{\mathcal{M}(#1)}
\gdef       \t              {^{\mathsf{T}}}
\gdef       \id             {\mat{I}}                                % identity matrix
\gdef       \R              {\field{R}}                                % 
\gdef       \C              {\field{C}}                                % 
\gdef       \ot             {\otimes}                                   % tensor product symbol
\gdef       \zero           {\vect{0}}                                  % 
\gdef       \one            {\vect{1}}                                  % 
\gdef       \idop           {\mathrm{id}}                               % identity morphism
\gdef       \comp           {\circ}                                     % composition symbol
\gdef       \Set            {\cat{Set}}                                 % category of sets
\gdef       \Vectk          {\cat{Vect}_{\field{k}}}                    % category of vector spaces
\gdef       \Vect           {\cat{Vect}}                                % 
% 
\gdef       \BaseB             {\basis{B}{}}
\gdef       \BaseC             {\basis{C}{}}
\gdef       \BaseBV             {\basis{B}{V}}
\gdef       \BaseCW             {\basis{C}{W}}
\gdef       \BaseE          {\basis{E}{}}
$$

## 前言

在上一章我们讨论完线性空间的基本情况后，一个自然的问题在于怎么研究线性空间之间的映射。我们已经拥有了那些定义，但是具体地，一个向量会怎么通过线性映射得到另一个空间中的向量的方式，我们暂时还没有结论。所幸，线性空间的基给了我们一些指引，借助它，我们可以把线性空间中的几乎所有线性的对象全部表达为 **矩阵** 的形式。所以本章我们将着重讨论矩阵本身，以及它与线性映射的关系

## 矩阵

在我们不给矩阵赋予任何的数学意义前，它其实就是一个普通的 *二维数表*。我们可以从一个数域 $\Bbbk$ 中取出一些数字，把它们排列成矩形，让它每行有相同数量的数，每列也有相同数量的数。这样的数表我们就称之为矩阵，具体地说，是定义在 $\Bbbk$ 上的一个矩阵。如果一个矩阵有 $m$ 行 $n$ 列，我们就称这个矩阵为 $m\times n$ 型矩阵。

我们把它的第 $i$ 行第 $j$ 列的元素简称为它的第 $(i,j)$ 个元素（矩阵元），记为 $[\mat{A}]^i{}_j = A^i{}_j$。它是 $\Bbbk$ 中的一个元素（数字）。

我们给所有 $\Bbbk$ 上定义的 $m\times n$ 型矩阵的集合记为 $\Mat{m,n,\Bbbk}$，在我们确定好数域时我们常常省略数域的标记，记作 $\Mat{m,n}$。我们后续考虑的矩阵，没有特殊提及时都认为是 $\R$ 上的。

由于 $\Mat{m,n}$ 中的每个矩阵的每一个位置上的元素都是 $\R$ 上的数字，我们自然会考虑这样一件事：我们能不能给 $\Mat{m,n}$ 定义一些代数结构，让他有特别的性质？这里不卖关子了，没错，我们可以给它赋予加法与数乘，让它成为一个线性空间。

## 线性空间 \$\mathcal{M}(m,n)\$

我们给出 $m\times n$ 矩阵全体 $\Mat{m,n}$ 成为线性空间所需要的加法与数乘的定义。

> [!THM]{矩阵空间}
>
> 在 $m\times n$ 矩阵全体 $\Mat{m,n}$ 这个集合上定义加法和数乘运算如下：
> 
> $$\begin{align*} +&\vcentcolon \Mat{m,n}\times \Mat{m,n}\to \Mat{m,n}\\ &\quad [\mat{A}+\mat{B}]^i{}_j = A^i{}_j+B^i{}_j\ \  \forall \mat{A},\mat{B}\in \Mat{m,n}; \\[1.5ex] \cdot&\vcentcolon \R\times\Mat{m,n}\to\Mat{m,n}\\ &\quad [r\cdot\mat{A}]^i{}_j = rA^i{}_j \  \forall r\in \R, \mat{A}\in \Mat{m,n}. \end{align*} $$
>
> 在具备这两个运算后，$\Mat{m,n}$ 成为线性空间，我们称其为矩阵空间。

关于它是如何满足线性空间的八条公理的，我们这里不做完整叙述了，因为关于它的运算的性质实在是太简单了：就是 $\R$ 上的运算，批量地搬到了 $m\times n$ 的数表上而已。值得注意的是它的零向量被称为零矩阵 $\zero$，即所有的元素都是 $0$ 的矩阵。

我们自然很好奇，它作为线性空间，维数是多少？我们能给它选择怎样的一组基？这个问题也不难，因为我们立刻就能构造出一套基，它一共有 $mn$ 个矩阵，每个矩阵都只在一个位置上为 $1$，在其余的所有位置都是 $0$。这些矩阵之间是线性无关的甚至是非常显然的结论。由此，矩阵空间 $\Mat{m,n}$ 的维数为 $\dim \Mat{m,n} = mn$。

可以看到，同型矩阵集合能称为线性空间这件事还挺显然的，加法和数乘也都比较简单。它是一个很好的例子，我们后面会经常需要把一些奇怪的空间化归到矩阵空间上，来研究它们的性质。那么，矩阵就仅此而已了吗？

当然不是，我们完全可以给矩阵赋予一些含义。当我们将 *矩阵* 与 *线性映射* 结合起来的时候，它就具有了丰富的内涵。不过在此之前，我们先来研究一个向量经过线性映射后具体是怎么得到它的像的。

## 线性映射的两种路径

我们考虑这样的两个线性空间，一个 $n$ 维线性空间 $V$ 和一个 $m$ 维线性空间 $W$，并考虑它们之间的一个线性映射 $L$。此时，设有向量 $\vect{v}\in V$，把它映射到 $W$ 中的向量 $\vect{w}$ 就有两种路径：

- 将整个向量直接放入线性映射 $L$ 下，得到 $W$ 中的向量：$L(\vect{v}) = \vect{w}$；
- 将这个过程通过线性映射的特点拆分为下面的步骤：
  - 先将 $\vect{v}$ 表达为 $V$ 中的基 $\basis{B}{V} = \basev{b}{j}{n}$ 的基向量的线性组合: $$\sum_j^n v^j \vect{b}_{j}$$
  - 借助线性映射的定义，有 $$L(\vect{v}) = L(\sum_j^n v^j \vect{b}_j) = \sum_j^n v^j L(\vect{b}_j)$$
  - 将 $V$ 中的基向量映射到 $W$ 中后得到新向量: $$L(\vect{b}_j) = \vect{f}_{j} \in W$$
  - 将得到的新向量 $\vect{f}_{j}$ 表达为 $W$ 中的基向量 $\basis{C}{W} = \vect{c}_{i}$ 的线性组合: $$\vect{f}_{j} = \sum_i^m A^i{}_j\vect{c}_{i}$$
  - 将上面的结果依次带回，得到：$$L(\vect{v}) = \sum_j^n v^j L(\vect{b}_j) = \sum_j^n v^j \vect{f}_{j} = \sum_j^n v^j \sum_i^m A^i{}_j\vect{c}_{i}$$
  - 经过整理，我们有 $$L(\vect{v}) =  = \sum_j^n\sum_i^m v^jA^i{}_j\vect{c}_{i} = \sum_i^m (\sum_j^n A^i{}_jv^j)\vect{c}_{i} = \sum_i^m w^i \vect{c}_{i} = \vect{w}$$

对比上下两种路径，我们发现：通过将向量表达为基的线性表示，我们将向量在线性映射下的像的问题，转换为了两种系数之间的运算：

$$w^i = \sum_j^n A^i{}_jv^j$$

一个是 $\vect{v}$ 在 $V$ 中基的组合系数 $v^j$，另一个则是 $\vect{b}_j$ 在经过 $L$ 映射后在 $W$ 中基的组合系数。前者是我们一定能得到的，因为 $V$ 中有基则所有向量都可以被基线性表出，这恰好说明，$L$ 的所有性质全部依赖于后者，我们需要知道 $\vect{b}_j$ 被映射后，在 $W$ 中的基被表达为了什么样的线性组合。

由于 $V$ 有 $n$ 个基向量，每个基向量在 $W$ 的基下都被表达为 $m$ 个向量的线性组合，所以每个基向量都有 $m$ 个线性组合系数，则这个过程一共要确定 $mn$ 个线性组合系数，这也是 $A^i{}_j$ 这个记号的（一部分）由来。注意到我们使用了一个上标和一个下标来表示这个线性映射，其下标 $j$ 说明了 $\BaseBV$ 中的第 $j$ 个基向量被映射过来，其上标 $i$ 则说明了被映射过来的新向量 $\vect{f}_j$ 在基 $\BaseCW$ 下表达后的第 $i$ 个分量。我们将两个指标区分出顺序，用来方便后续的处理。

然而，$A^i{}_j$ 不是我们给矩阵的记号吗？竟能，如此相像？那为何不直接把一个线性映射在左右两端选好基之后表达为一个矩阵呢？现在我们给矩阵赋予线性映射下的意义。

> [!REM]{矩阵的线性映射意义}
>
> 设有 $n$ 维线性空间 $V$ 和 $m$ 维线性空间 $W$，二者之间的线性映射 $L\vcentcolon V\to W$ 可以在 $V$ 的一组基 $\basis{B}{V}$ 和 $W$ 的一组基 $\basis{C}{W}$ 下表达为一个矩阵，我们将它记作 $\mat{A} = \mrep{L}{\BaseBV}{\BaseCW} = \mrep{L}{\BaseB}{\BaseC}$，这个矩阵有 $m$ 行 $n$ 列，即 $\mat{A}\in\Mat{m,n}$。该矩阵第 $(i,j)$ 个元素 $A^i{}_j$ 的含义是 $V$ 中第 $j$ 个基向量在经过线性映射 $L$ 后，它在 $W$ 的第 $i$ 个基向量上的分量。

有了这样的表达方式后，我们能做一些什么呢？我们可以尝试计算两个线性映射的复合的矩阵表达。我们知道，线性映射的复合一定还是线性映射，而它也一定可以表达为一个矩阵。既然如此，我们就可以把两个矩阵的元素拿出来经过某种运算，得到新的矩阵，用来表达两个映射的复合。我们来看看这个过程。

## 线性映射复合与矩阵

假设我们有线性空间 $U,V,W$，它们的维数分别为 $m,n,p$，且有 $T\vcentcolon U\to V$ 和 $S\vcentcolon V\to W$，则线性映射的复合 $S\circ T = R$ 就是一个由 $U$ 到 $W$ 的线性映射。我们分别给 $U,V,W$ 选择基 $\BaseB$，$\BaseC$ 和 $\basis{D}{}$，那么 $T$，$S$ 和 $R$ 就可以被表达为 $\mat{A} = \mrep{T}{\BaseB}{\BaseC}$，$\mat{B} = \mrep{S}{\BaseC}{\basis{D}{}}$ 和 $\mat{C} = \mrep{R}{\BaseB}{\basis{D}{}}$。

现在取 $U$ 中的一个向量 $\vect{u} = \sum_i^m u^i \vect{b}_i$，根据我们上面的步骤，就有：

$$T(\vect{u}) = \sum_k^n \sum_j^m A^k{}_j u^j \vect{c}_k = \sum_k^n v^k \vect{c}_k = \vect{v};$$
$$S(\vect{v}) = \sum_i^p \sum_k^n B^i{}_k v^k \vect{d}_i = \sum_i^p w^i \vect{d}_i = \vect{w},$$

把底下的结果带入上面，就得到了映射复合的结果：

$$S(\vect{v}) = S(T(\vect{u})) =  \sum_i^p \sum_k^n B^i{}_k v^k \vect{d}_i =  \sum_i^p \sum_k^n B^i{}_k \sum_j^m A^k{}_j u^j \vect{d}_i;$$

而如果我们直接用 $R$ 来作用到 $\vect{u}$ 上，可以得到：

$$R(\vect{u}) = \sum_i^p \sum_j^m C^i{}_j u^j \vect{d}_i,$$

比较一下，我们得到这样的结果：

$$C^i{}_j = \sum_k^n B^i{}_k A^k{}_j.$$

所以，$R$ 的矩阵表达 $\mat{C}$ 完全可以由 $\mat{A}$ 和 $\mat{B}$ 确定！我们把这种操作称为所谓 **矩阵的乘法**，而如此一来，我们就将线性映射的复合通过它们的对应的矩阵的乘法表达出来了。

另外，上面的例子中，$\mat{B}$ 是 $p\times n$ 型矩阵，而 $\mat{A}$ 是 $n\times m$型矩阵，得到的结果 $\mat{C}$ 是一个 $p\times m$ 型矩阵。由此我们得知，只有第一个矩阵的行数等于第二个矩阵的列数的时候，才能让这个乘法成立。我们下面总结如下：

> [!REM]{矩阵乘法}
>
> 两个矩阵 $\mat{A}$ 和 $\mat{B}$ 若分别为 $m\times n$ 和 $n\times p$ 型矩阵，则它们的乘积 $\mat{AB}$ 为一个 $m\times p$ 型矩阵。这个过程可以解释为线性映射的复合，其中：
> - $\mat{B}$ 代表一个 $p$ 维到 $n$ 维线性空间的线性映射;
> - $\mat{A}$ 代表一个 $n$ 维到 $m$ 维线性空间的线性映射;
> - 它们的乘积 $\mat{AB}$ 则代表它们的复合，一个从 $p$ 维到 $n$ 维线性空间的线性映射。

## 线性空间 \$\operatorname{Hom}(V,W)\$

上面我们给矩阵赋予了线性映射的意义。只要在给线性空间选定基之后，它们之间的所有线性映射都是可以唯一地表达为一个矩阵的。然而我们已经知道了，矩阵空间 $\Mat{m,n}$ 是一个线性空间，那么它能对应的 $n$ 维线性空间 $V$ 到 $m$ 维线性空间 $W$ 之间的线性映射全体 $\Hom{V,W}$，是否也是一个线性空间呢？

没错，它也是能在合理的加法和数乘下成为线性空间的：

> [!THM]{$ 线性空间 \operatorname{Hom}(V,W)$ }
>
> 集合 $\Hom{V,W}$ 上可以定义加法与数乘运算如下：
>
> $$\begin{align*} +&\vcentcolon \Hom{V,W}\times \Hom{V,W}\to \Hom{V,W}\\ &\quad (R+S)(\vect{v}) = R(\vect{v}) + S(\vect{v})\ \  \forall R, S\in \Hom{V,W},\vect{v}\in V; \\[1.5ex] \cdot&\vcentcolon \R\times\Hom{V,W}\to\Hom{V,W}\\ &\quad (r\cdot L)(\vect{v}) = r\cdot L(\vect{v})= L(r\cdot \vect{v}) \  \forall r\in \R, L\in \Hom{V,W},\vect{v}\in V. \end{align*} $$
>
> 在定义这两个运算后，$\Hom{V,W}$ 成为线性空间。

我们可以看到，上面的加法定义和数乘定义都是非常自然的：两个映射相加等于把它们每个点上的值都加起来作为这个点上的新值；映射与数的点乘就是把每个点的值都做个数乘。这个操作能实现也依赖了 $W$，映射的陪域，也是个线性空间的缘故。我们称这样定义运算的方法为所谓的 **逐点定义**。

然而，我们上面只是声明了它是线性空间。它真的是吗？它满足线性空间的八条公理吗？我们需要证明一下。


> [!PROOF]{集合 $\operatorname{Hom}(V,W)$ 是线性空间}
>
> 要证明它是线性空间，我们需要验证它满足线性空间的八条公理。
>
> - 存在加法单位元 $O$，将任何实数都恒等映射到 $\zero_W$ 上：$O(\vect{v}) = \zero_W$ 对于任意的 $\vect{v}\in V$ 都成立。如此，有 $$\begin{align*}(O+L)(\vect{v}) &= O(\vect{v}) + L(\vect{v}) \\ &= L(\vect{v}) = L(\vect{v}) + O(\vect{v})\\ &= (L+O)(\vect{v})\end{align*}$$ 对于任意的 $\vect{v}\in V$ 和 $L\in\Hom{V,W}$ 都成立；
> - 任意元素都有逆元。对任意的 $S\in \Hom{V,W}$ ，定义线性映射 $T\in\Hom{V,W}$，对任意 $\vect{v}\in V$ 都有 $T(\vect{v}) = S(-\vect{v})$。由线性映射的性质，$T(\vect{v}) = -S(\vect{v})$，则对任意 $\vect{v}\in V$，都有 $$\begin{align*}(T+S)(\vect{v}) &= T(\vect{v}) + S(\vect{v})\\ &= -S(\vect{v})+S(\vect{v}) = \zero_W = S(\vect{v}) + T(\vect{v})\\ &=(S+T)(\vect{v})\end{align*}$$ 成立。则 $T$ 确为 $S$ 的逆元；
> 
> - 加法有结合律和交换律。对任意 $R,S,T\in\Hom{V,W}$，任取 $\vect{v}\in V$，则有 $$\begin{align*}(R+(S+T))(\vect{v}) &= R(\vect{v})+(S+T)(\vect{v})\\ & = R(\vect{v})+S(\vect{v})+T(\vect{v})= (R+S)(\vect{v})+T(\vect{v}) \\ &= ((R+S)+T)(\vect{v}) \\ &= S(\vect{v})+T(\vect{v})+R(\vect{v})\\ & = ((S+T)+R)(\vect{v})\end{align*}$$ 始终成立；
> 
> - 取 $\R$ 中单位元 $1$，有 $$(1\cdot L)(\vect{v}) = 1\cdot_W L(\vect{v}) =L(1\cdot_V\vect{v})= L(\vect{v})$$ 对任何 $L\in\Hom{V,W},\vect{v}\in V$都成立，则数乘确有单位元；
> 
> - 数乘对向量加法有分配率：对任意 $r\in\R, S, T\in\Hom{V,W}$ 和 $\vect{v}\in V$，下式始终成立：$$\begin{align*}(r\cdot( S+ T))(\vect{v}) &= ( S+ T)(r\cdot\vect{v})=  S(r\cdot\vect{v})+ T(r\cdot\vect{v}) \\ &= r\cdot S(\vect{v})+r\cdot T(\vect{v}) = (r\cdot S)(\vect{v})+(r\cdot T)(\vect{v})\\ &= (r\cdot( S+ T))(\vect{v});\end{align*}$$
> - 数量加法对数乘有分配率：对任意 $r,s\in\R, S\in\Hom{V,W}$ 和 $\vect{v}\in V$，下式始终成立：$$\begin{align*}((r+s)\cdot S)(\vect{v}) &=  S((r+s)\cdot\vect{v})=  S(r\cdot\vect{v}+s\cdot\vect{v}) \\ &= r\cdot S(\vect{v})+s\cdot T(\vect{v}) = (r\cdot S)(\vect{v})+(s\cdot S)(\vect{v})\\ &= (r\cdot S+s\cdot S)(\vect{v});\end{align*}$$
> - 数量乘法有交换律：对任意 $r,s\in\R, S\in\Hom{V,W}$ 和 $\vect{v}\in V$，下式始终成立：$$((rs)\cdot S)(\vect{v}) =  S((rs)\cdot\vect{v}) =  S((sr)\cdot\vect{v}) = ((sr)\cdot S)(\vect{v}).$$
>
> 至此，我们验证完毕，$\Hom{V,W}$ 的确在上述加法和数乘下成为一个向量空间。

这个证明真是好长，但是实际上却又真的只是把所有的公理都按照定义和线性映射的性质验证一遍，唉，真是好累呀。后面再不证明这么繁琐的东西了，除非是一个很特殊的线性空间，它不那么显然地满足公理。

那么现在，我们知道 $\Mat{m,n}$，所有 $m\times n$ 型矩阵，它是一个 $mn$ 维线性空间; $\Hom{V,W}$，所有从线性空间 $V$ 到 $W$ 的线性映射，也是一个线性空间。而一个 $m\times n$ 型矩阵可以被解释为一个 $n$ 维线性空间到 $m$ 维线性空间的一个线性映射（在给两边选定基后）。它们之间一定有某种特殊的联系！说不定，如果 $\dim V = n, \dim V = m$ 的话，$\Mat{m,n}$ 和 $\Hom{V,W}$ 是同构的！

我们要怎么确认这个事呢？我们先来看两个特殊的例子：$\Hom{\R,V}$ 和 $\Hom{V,\R}$。

## \$\operatorname{Hom}(\R,V)\$ 与 \$V\$

我们考虑 $\Hom{\R,V}$ 中的一个线性映射 $L$，根据线性映射和矩阵的关系，它在 $\R$ 和 $V$ 的基下的表示矩阵为 $\mat{A} = \mrep{L}{\BaseE}{\BaseBV}$。根据我们上面的记号，我们知道这个线性映射的矩阵表示就有 $n$ 行，但是它只有 $1$ 列。

我们先来看看 $\R$，从上一章的讨论中我们已经知道它自身就是一个线性空间，它的典范基就是 $1$。再考虑这个线性映射 $L$，它 *把一个向量唯一确定地映射到另一个空间中的一个向量*，且保持线性。也就是说，这个线性映射把 $\R$ 中的 $0$ 映射到 $V$ 中的 $\zero$ 上，且每个数字都对应一个 $V$ 中的向量。

由于我们给它们两个线性空间都选择了基，由上一章的内容，我们可以考虑它们作为自由线性空间：$\{f\ \vert\ f\vcentcolon\{1\}\to\R\}$ 和 $\{g\vert\ g\vcentcolon\BaseBV\to \R\}$，即它们俩都唯一地由它们的基 $\BaseE = \{1\}$ 和 $\BaseBV$ 确定，而这两个线性空间之间的映射，就可以看成是这样的过程：从 $V$ 里选择一个向量，让它对应到 $\R$ 上的基 $\{1\}$ 上，这一点也能从它表示出来的矩阵的第 $(i,1)$ 个矩阵元的含义看出：它代表了从线性空间 $\R$ 的基 $1$ 映射到 $V$ 之后，在 $V$ 的第 $i$ 个基上的分量。

发现了吗？一个这样的线性映射，实际上就唯一地对应了一个 $V$ 上的向量。那么？所有这样的线性映射的集合呢？没错，就是 $V$ 本身了。这意味着，一个从 $\R$ 到 $n$ 维线性空间 $V$ 的线性映射，实际上 *就是 $V$ 中的一个向量*！这也不难理解，为什么我们使用所谓的 *列向量*，或者一些地方所说的，*列矩阵*，来表示一个向量了。

## 列向量 与 \$\R\to V\$ ：自然同构

事实上，我们可以给 $\Hom{\R,V}$ 和 $V$ 之间定义一个 **自然同构**：

$$ \eta\vcentcolon\Hom{\R,V}\to V,\quad  f \mapsto f(1)\ \ \forall f\in\Hom{\R,V},$$

其中 $1$ 就是我们熟悉的那个数字 $1$。也就是说，只需要我们让 $\Hom{\R,V}$ 中的每个映射都取到 $1$，我们就能得到 $V$ 上对应的向量。这个同构之所以是同构，是因为我们可以立刻定义它的逆映射：

$$ \phi\vcentcolon V\to\Hom{\R,V},\quad (\phi(\vect{v}))(r) = r\cdot\vect{v}\ \ \forall\vect{v}\in V, r\in\R, $$

即我们把一个向量映射到一个从 $\R$ 到 $V$ 的线性映射上。这个线性映射取 $\R$ 中的一个数字后就把它数乘到这个向量上。可以证明这个东西是同构：

> [!PROOF]{映射 $\eta$ 是线性空间同构}
> 
> 由于 $\eta$ 两边都是线性空间，且我们已经构造了它的可能逆映射 $\phi$。要验证同构，我们可以证明 $\phi$ 确实是它的逆映射，即 $\phi\comp\eta = \idop_{\Hom{\R,V}}$ 和 $\eta\comp\phi = \idop_{V}$ 都是单位变换:
> - 对于任意 $f\in \Hom{\R,V}$，对于任意的 $r\in\R$ 我们都能让 $f$ 转一圈回到自己，就能证明第一部分了，而我们有：$$ (\phi\comp\eta)(f(r)) = (\phi\comp\eta(f))(r) = \phi(f(1))(r) = r\cdot f(1) = f(r);$$
> - 对于任意的 $\vect{v}\in V$，我们有 $$\eta\comp\phi(\vect{v}) = \eta(\phi(\vect{v})) = \phi(\vect{v})(1) = 1\cdot \vect{v} = \vect{v}.$$
> 两个式子的最后一个等号都用了线性映射和线性空间的性质，它们之前的等号则都是映射的复合。由此，我们得到它是一个同构。

那么，它为什么叫 **自然** 同构？这是因为我们再次借用了范畴论的语言，它的定义应该借助所谓的 **函子**，我们这里就不再展开（因为我是菜鸡）。可以这样理解所谓的 *自然*：如果这个同态的构造不依赖于任何额外的信息，只从定义域和值域的关于这个范畴的基本信息就可以了，而且这个同态中用到的对象不是特定的，这个范畴中的任何对象都是可以的。这里我们讨论的范畴是线性空间，那么 “一个同态是自然的” 就是在说，这个映射的构造只需要关于线性空间的基本性质，用来定义它的 $V$ 可以是任何一个合法的线性空间。

为什么我们强调了 *自然*？因为当我们把向量表达为 *列矩阵* 时，通过上一节的描述，我们需要两组基来确定它；但是实际上，我们只需要 $V$ 上的一组基就可以表达了，这和我们对 *向量需要一组基来表达为列向量* 是相符的。我们不需要另一组 $\R$ 的基的原因就出自这里的 *自然* 性了，这样的对应不需要选择特定的基，所以如果我们想表达为列矩阵，我们真的只需要 $V$ 上的基就可以。

而这，也完美地保证了我们完全可以把向量在线性映射下的像的计算过程，化作矩阵与列向量之间的乘法运算，只需要运用矩阵乘法就可以了。一个运算，两种含义，针不戳！

## 对偶空间 \$V^*\$

我们再来考察 $\Hom{V,\R}$，在这之前，由于 $\Hom{V,\R}$ 有特殊的含义，它被定义为 $V$ 的所谓 **对偶空间**：

> [!DEF]{对偶空间}
>
> 一个线性空间 $V$ 的对偶空间记作 $V^*$，它是通过在集合 $\Hom{V,\R}$ 上定义加法和数乘得到的，其加法和数乘分别定义为：
> 
> $$\begin{align*} +&\vcentcolon  V^*\times  V^*\to  V^*\\ &\quad(\cvect{\varphi}+\cvect{\psi})(\vect{v}) = \cvect{\varphi}(\vect{v})+\cvect{\psi}(\vect{v})\ \  \forall \cvect{\varphi},\cvect{\psi}\in  V^*,\vect{v}\in V;\\[1.5ex] \cdot&\vcentcolon \R\times V^*\to V^*\\ &\quad(r\cdot\cvect{\varphi})(\vect{v}) = r\cdot \cvect{\varphi}(\vect{v}) = \cvect{\varphi}(r\cdot\vect{v})\ \  \forall r\in \R, \cvect{\varphi}\in  V^*,\vect{v}\in V.\end{align*}$$
>
> 我们称原空间 $V$ 中的元素为 *向量*，称 $V^*$ 中的元素为 **余向量**。

可以看到，$V^*$ 中的余向量，每一个都是从 $V$ 到 $\R$ 的线性映射，在给定一个 $V$ 中的向量后它都给出一个实数。有了这样的定义之后，我们继续研究之前的问题：怎么把 $\Hom{V,\R}$，即 $V^*$，和 $V$ 以及矩阵表示三者联系起来。

## 线性空间与对偶空间

我们还是给先给 $V$ 和 $\R$ 两边选定它们的基，分别为 $\BaseBV$ 和 $\BaseE$，则线性映射 $T\in V^*$ 可以表达为 $\mat{B} = \mrep{T}{\BaseBV}{\BaseE}$，这个矩阵它有 $1$ 行 $n$ 列，即所谓的 **行矩阵** 或者 **行向量** 了。

下面我们尝试用之前 *自由线性空间* 的概念来研究它和 $V$ 之间的关系。照我们之前的做法，两个空间在选择好基之后即唯一确定了，那么它们两之间的映射就可以规约到 $\BaseBV$ 到 $\{1\}$ 的映射。然后我们就可以……

等一下，从任意集合 $S$ 到 单点集 $\{\bullet\}$ 的映射有且只能有一个，就是恒等映射呀！？自由线性空间的路数看来是不大行了。那么，我们应该怎么考虑它和线性空间 $V$ 之间的关系？

好在我们还有 $\cvect{\varphi}\in V^* = \Hom{V,\R}$ 的矩阵表示。$\cvect{\varphi}\in V^*$ 在表示为一个 $1\times n$ 型矩阵后，它的第 $(1,j)$ 个矩阵元的含义就是 $V$ 中的第 $j$ 个基向量经过线性映射后在 $\R$ 中的基 $\{1\}$ 的分量，或者说就是第 $j$ 个基向量在经过映射后的值。这说明，这个矩阵的 $n$ 个值对应了 $\cvect{\varphi}$ 在 $\BaseBV$ 上的值。

于是我们得到了一个三角形的关系：一个对偶空间中的余向量，在作为 $V\to \R$ 的线性映射时能唯一确定一个 $1\times n$ 型矩阵，而这个矩阵中的 $n$ 个矩阵元分别代表了 $V$ 中的基向量在余向量映射下的值。这也就意味着，如果我们能确定 $V$ 中基向量在余向量下的值，我们就能唯一确定一个余向量了。 

然而，把向量表达为基向量的线性组合的时，也有这样的对应关系：在给线性空间选定一组基之后，只需要一组线性表出系数就可以唯一地确定一个向量了。这暗示着我们完全可以就将 $V$ 中的那些基向量在余向量下的值作为这个余向量的线性表出系数。那么问题来了，我们这次竟然是先有了余向量线性表出系数，那这组线性表出系数应该配以什么样的基来表达一个余向量呢？

我们需要找到 $V^*$ 它的基。

## 对偶空间的基

我们就取一个余向量 $\cvect{\varphi} \in V^*$，它有线性表出系数 $\varphi_1,\varphi_2,\dots,\varphi_n$，我们虽然不知道 $V^*$ 的基具体是什么样的，那么我们就假设这组基为：$\cbasev{\\beta}{i}{n}$，于是 $\cvect{\varphi}$ 就可以表达为线性组合：

$$\cvect{\varphi} = \sum_i^n \varphi_i\cvect{\beta}^i,$$

我们的当务之急是找到 $\cvect{\beta}^i$ 的表达式，它也是 $V^*$ 中的一个余向量，即一个从 $V$ 到 $\R$ 的线性映射。要确定一个映射，最好的方法就是给它喂一个定义域上的值，看看它的结果是什么样的。毫无悬念地，如果我们给它 $\vect{v}\in V$，得到的结果是：

$$\cvect{\varphi}(\vect{v}) = \sum_i^n \varphi_i\cvect{\beta}^i(\vect{v}),$$

然而 $\vect{v}$ 也是可以表达为 $V$ 的基 $\basev{b}{j}{n}$ 的线性组合的，我们带入就有：

$$\cvect{\varphi}(\vect{v}) = \sum_i^n \varphi_i \cvect{\beta}^i(\sum_j^n v^j\vect{b}_j) = \sum_i^n\sum_j^n\varphi_i v^j\cvect{\beta}^i(\vect{b}_j),$$

此时我们回忆这些 “线性表出系数” 的原本意义：$V$ 中的基向量被 $\cvect{\varphi}$ 映射后的值，即

$$\cvect{\varphi}(\vect{v}) = \sum_i^n\sum_j^n v^j\cvect{\beta}^i(\vect{b}_j)\cvect{\varphi}(\vect{b}_i),$$

我们的 $\cvect{\varphi}$ 又一次出现了！更重要的是，$v^i$，$\cvect{\beta}^i(\vect{b}_j)$ 都是 $\R$ 中的实数，因此根据线性映射的性质，我们有

$$\cvect{\varphi}(\vect{v}) = \cvect{\varphi}(\sum_j^n v^j \sum_i^n \cvect{\beta}^i(\vect{b}_j)\vect{b}_i),$$

又因为 $\vect{v} = \sum_j^n v^j \vect{b}_j$，经过 *比较*，我们得到了：

$$\sum_i^n \cvect{\beta}^i(\vect{b}_j)\vect{b}_i = \vect{b}_j,$$

说明 $\vect{b}_j$ 是基向量的线性组合。可是它本身就已经是基向量了，如果表示成线性组合，就只能是让对应的第 $j$ 个位置的系数为 $1$，其余全部为 $0$。也就是说：

$$\cvect{\beta}^i(\vect{b}_j) = \begin{cases}
  1 &\text{if }\ i=j\\
  0 &\text{if }\ i\neq j\\
\end{cases}$$

我们构造出了一组 $V^*$ 的基！吗？

## \$\\{\boldsymbol{\beta}^i\\}_{i=1}^n\$ 是基的证明

我们上面的构造有一个巨大的漏洞：$f(a) = f(b)$ 从来都不能说明 $a = b$，必须证明 $f$ 是单射才能有这样的结论。然而，我们没有证明上面的余向量 $\cvect{\varphi}$ 是单的。

其实是能够证明所有 $V^*$ 中的余向量都是单的，可是坏消息是，这在我们现有的工具条件下是没法方便地证明的。难道我们的努力全都木大了吗？也不是。至少，结论是对的，它距离我们可以放心使用，差的其实不是严丝合缝地把它构造出来，而是证明它的确是一组基就行。那么，我们就来尝试证明下面这个命题（定理）吧。

> [!THM]{对偶空间的基}
>
> 设向量空间 $V$ 有一组基 $\BaseBV = \basev{b}{i}{n}$，则其对偶空间 $V^*$ 有一组基 $\cbasev{\beta}{i}{n}$，定义为 
> 
> $$\cvect{\beta}^i(\vect{b}_j) = \delta^i{}_j,$$
>
> 其中 $\delta^i{}_j$ 称为 **Kronecker delta（克罗内克 delta）**，定义为
>
> $$\delta^i{}_j = \begin{cases} 1 &\text{if }\ i=j\\ 0 &\text{if }\ i\neq j\\\end{cases}.$$

我们接下来证明这个命题。这里值得注意的是这个 Kronecker delta 符号：

> [!REM]{Kronecker delta 的含义}
>
> 这个符号之所以是被称为 “符号”，是因为它的功能太简单，却又可以拥有多种解释。这个符号实际上代表了一个函数，它比较两个正整数值，如果它们相等则输出 $1$，如果不相等则输出 $0$。因此，我们可以说它是一个这样的函数：
> 
> $$ \delta \vcentcolon \field{N}\times\field{N}\to \R,$$
>
> 然后用 $\delta^i{}_j$ 来记录它取 $(i,j)$ 时候的值。然而这样做又有两个小问题：
> - 首先是，它的值域是否合适。倘若采用 $\R$，可能又显得太大了；倘若采用 $\{0,1\}$，那它就丢失了和别的数相乘相加等算术运算。为了在我们这里能与乘法相容，我们还是采用了 $\R$ 的定义；
> - 另外就是它的定义域是否合适。这个问题主要源于这个符号实在是太简单了：判断两个东西是否相等。如果相等，那就输出 $1$，否则就输出 $0$。我们完全没必要限制在 $\field{N}$ 上，而是可以扩充到 $\field{Z}$，甚至更一般的任意集合上。不过我们这里还是不这么做了：限定在我们需要的指标集 $I = \field{N}$ 上就可以了。
>
> 另外我们注意，在引入 *爱因斯坦求和约定* 以前，我们完全将 $\delta^i{}_j$ 看作一个实数。即便它可以被解释为单位矩阵，它也是矩阵中的元素，而非真的是一个矩阵。

