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
\gdef       \basis          #1#2{\mathcal{#1}_{#2}}                            % basis of vector space
\gdef       \basev          #1#2#3{\{\vect{#1}_{#2}\}_{#2=1}^{#3}}                     % base vector collection
\gdef       \cbasev         #1#2{\mathbf{#1}^{#2}}                      % dual basis e^i
\gdef       \vrep           #1#2{[\vect{#1}]_{#2}}                           % coordinate representation [v]_B
\gdef       \rep            #1{[\vect{#1}]}
\gdef       \mrep           #1#2#3{[{#1}]_{#2}^{#3}}                      % representation [L]_{C,B}
% 
\gdef       \iprod          #1#2{\langle #1, #2 \rangle}                % inner product
\gdef       \mat            #1{\mathbf{#1}}                             % matrix (representation)
\gdef       \field          #1{\mathbb{#1}}                             % 
\gdef       \xto            #1{\xrightarrow{#1}}                        % arrow with label
\gdef       \xfrom          #1{\xleftarrow{#1}}                         % left arrow with label
\gdef       \Hom            #1#2{\operatorname{Hom}(#1,#2)}             % morphisms between A and B
\gdef       \Iso            #1#2{\operatorname{Iso}(#1,#2)}
\gdef       \End            #1{\operatorname{End}(#1)}                  % 
\gdef       \Aut            #1{\operatorname{Aut}(#1)}                  % 
\gdef       \cat            #1{\mathsf{#1}}                             % category symbol: e.g., \cat{Vect}, \cat{Set}
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

在我们不给矩阵赋予任何的数学意义前，它其实就是一个普通的 *二维数表*。我们可以把一些数字排列成矩形，让它每行有相同数量的数，每列也有相同数量的数。这样的数表我们就称之为矩阵。如果一个矩阵有 $m$ 行 $n$ 列，我们就称这个矩阵为 $m\times n$ 型矩阵。

然而，我们完全可以给矩阵赋予一些含义。当我们将 *矩阵* 与 *线性映射* 结合起来的时候，它就具有了丰富的内涵。我们先来研究，一个向量线性映射下具体是怎么得到它的像的。

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

一个是 $\vect{v}$ 在 $V$ 中基的组合系数 $v^j$，另一个则是 $\vect{b}_j$ 在经过 $L$ 映射后在 $W$ 中基的组合系数。前者是我们一定能得到的，因为 $V$ 中有基则所有向量都可以被基线性表出，这就说明，$L$ 的所有性质全部依赖于后者，我们需要知道 $\vect{b}_j$ 被映射后，在 $W$ 中的基被表达为了什么样的线性组合。由于 $V$ 有 $n$ 个基向量，每个基向量在 $W$ 的基下都被表达为 $m$ 个向量的线性组合，所以每个基向量都有 $m$ 个线性组合系数，则这个过程一共要确定 $mn$ 个线性组合系数，这也是 $A^i{}_j$ 这个记号的（一部分）由来。注意到我们使用了一个上标和一个下标来表示这个线性映射，其下标 $j$ 说明了 $\BaseBV$ 中的第 $j$ 个基向量被映射过来，其上标 $i$ 则说明了被映射过来的新向量 $\vect{f}_j$ 在基 $\BaseCW$ 下表达后的第 $i$ 个分量。我们将两个指标区分出顺序，用来方便后续的处理。

等一下，$m$ 乘以 $n$ 个系数？你一定等不及把它写成矩阵的形状了。

## 矩阵与线性映射

现在我们给矩阵赋予线性映射下的意义。

> [!REM]{矩阵的线性映射意义}
>
> 设有 $n$ 维线性空间 $V$ 和 $m$ 维线性空间 $W$，二者之间的线性映射 $L\vcentcolon V\to W$ 可以在 $V$ 的一组基 $\basis{B}{V}$ 和 $W$ 的一组基 $\basis{C}{W}$ 下表达为一个矩阵，我们将它记作 $\mat{A} = \mrep{L}{\BaseBV}{\BaseCW} = \mrep{L}{\BaseB}{\BaseC}$，这个矩阵有 $m$ 行 $n$ 列，我们简记为 $m\times n$ 矩阵。我们把它的第 $i$ 行第 $j$ 列的元素简称为它的第 $(i,j)$ 个元素，记为 $A^i{}_j$。

有了这样的表达方式后，我们能做一些什么呢？我们可以尝试计算两个线性映射的复合的矩阵表达。我们知道，线性映射的复合一定还是线性映射，而它也一定可以表达为一个矩阵。既然如此，我们就可以把两个矩阵的元素拿出来经过某种运算，得到新的矩阵，用来表达两个映射的复合。我们来看看这个过程。

## 线性映射的复合与矩阵乘法

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

## 矩阵与（列）向量

我们考虑考虑这样的一个线性映射：从一维线性空间 $\R$ 映射到 $n$ 维线性空间 $V$ 的线性映射 $L$，它在基下的表示矩阵为 $\mat{A} = \mrep{L}{\BaseE}{\BaseBV}$。根据我们上面的记号，我们知道这个线性映射的矩阵表示就有 $n$ 行，但是它只有 $1$ 列。

我们先来看看 $\R$，从上一章的讨论中我们已经知道它自身就是一个线性空间，它的典范基就是 $1$。再考虑这个线性映射 $L$，它 *把一个向量唯一确定地映射到另一个空间中的一个向量*，且保持线性。也就是说，这个线性映射把 $\R$ 中的 $0$ 映射到 $V$ 中的 $\zero$ 上，且每个数字都对应一个 $V$ 中的向量。

由于我们给它们两个线性空间都选择了基，由上一章的内容，我们可以考虑它们作为自由线性空间：$\{f\ \vert\ f\vcentcolon\{1\}\to\R\}$ 和 $\{g\vert\ g\vcentcolon\BaseBV\to \R\}$，即它们俩都唯一地由它们的基 $\BaseE = \{1\}$ 和 $\BaseBV$ 确定，而这两个线性空间之间的映射，就可以看成是这样的过程：从 $V$ 里选择一个向量，让它对应到 $\R$ 上的基 $\{1\}$ 上，原因无他：线性映射就是在给定义域的基找到陪域上的对应。

发现什么了吗？一个这样的线性映射，实际上就对应了一个 $V$ 上的向量。那么？所有这样的线性映射的集合呢？没错，就是 $V$ 本身了。这意味着，一个从 $\R$ 到 $n$ 维线性空间 $V$ 的线性映射，实际上 *就是 $V$ 中的一个向量*！这也不难理解，为什么我们使用所谓的 *列向量*，或者一些地方所说的，*列矩阵*，来表示一个向量了。

这里值得注意的是，我们是从 $\{1\}$ 到 $\BaseBV$ 做的对应。这个小细节我们后续会提到。

## \$\operatorname{Hom}(\R,V)\$ 作为线性空间

既然有了上一节的声明，我们就来看看 $\Hom{\R}{V}$，所有 从 $\R$ 到 $V$ 的线性映射的集合。照我们的声明，它也是一个线性空间，那么我们就得找到它要怎么定义加法和数乘。这样的做法也不困难：我们逐点地定义加法和数乘：

$$ +\vcentcolon \Hom{\R}{V}\times \Hom{\R}{V}\to \Hom{\R}{V},\quad (f+g)(r) = f(r)+g(r)\ \  \forall f,g\in \Hom{\R}{V},r\in\R;$$
$$ \cdot\vcentcolon \R\times\Hom{\R}{V}\to\Hom{\R}{V},\quad (r\cdot f)(a) = r\cdot f(a) = f(ra)\ \  \forall r,a\in\R, f\in \Hom{\R}{V}.$$

接下来我们证明它是线性空间：

> [!PROOF]{集合 $\operatorname{Hom}(\R,V)$ 是线性空间}
>
> 要证明它是线性空间，我们需要验证它满足线性空间的八条公理。
>
> - 它存在加法单位元，将任何实数都恒等映射到 $\zero_V$ 上，因为加法的单位性在 $V$ 的零向量上得到了保证；
> - 在这个加法单位元下，$f\in\Hom{\R}{V}$ 如果将 $1$ 映射到 $\vect{v}\in V$，则它的逆元为 $-f$，把 $1$ 映射到 $-\vect{v}$ 即可；
> - 加法是结合且交换的，因为 $V$ 上的加法是结合且交换的；
> - 存在数乘单位元 $1$，与函数的数乘即不改变函数结果；
> - 数乘在向量加法上有分配律：$$a\cdot(f+g)(r) = (f+g)(ar) = f(ar)+g(ar) = a\cdot f(r)+a\cdot g(r)$$ 对任意的 $a,r\in \R$ 和 $f,g\in \Hom{\R}{V}$ 都成立。其中第一个和第三个等号使用数乘定义，第二个等号使用加法定义；
> - 数乘在 $\R$ 的加法上有分配率：$$ (a+b)\cdot f(r) = f((a+b)r) = f(ar+br) = a\cdot f(r) + b\cdot f(r)$$ 对任意的 $a,b,r\in \R$ 和 $f\in \Hom{\R}{V} $ 都成立。其中第一个等号是线性映射的性质，第二个等号为实数乘法，第三个等号使用线性映射的性质以及数乘的定义；
> - 数乘次序可交换，依旧可以使用线性映射的性质以及在 $\R$ 上的交换律即可验证。
>
> 如此，我们成功证明了 $\Hom{\R}{V}$ 是一个线性空间。

通过上面的证明过程，我们能感受到它和 $V$ 之间的关系特别密切。那么，它们之间到底是什么样的关系呢？我们说，它们之间有一个同构，而且还是特殊的同构。

## 列向量 与 \$\R\to V\$ ：自然同构

事实上，我们可以给 $\Hom{\R}{V}$ 和 $V$ 之间定义一个 **自然同构**：

$$ \eta\vcentcolon\Hom{\R}{V}\to V,\quad  f \mapsto f(1)\ \ \forall f\in\Hom{\R}{V},$$

其中 $1$ 就是我们熟悉的那个数字 $1$。也就是说，只需要我们让 $\Hom{\R}{V}$ 中的每个映射都取到 $1$，我们就能得到 $V$ 上对应的向量。这个同构之所以是同构，是因为我们可以立刻定义它的逆映射：

$$ \phi\vcentcolon V\to\Hom{\R}{V},\quad (\phi(\vect{v}))(r) = r\cdot\vect{v}\ \ \forall\vect{v}\in V, r\in\R, $$

即我们把一个向量映射到一个从 $\R$ 到 $V$ 的线性映射上。这个线性映射取 $\R$ 中的一个数字后就把它数乘到这个向量上。可以证明这个东西是同构：

> [!PROOF]{映射 $\eta$ 是线性空间同构}
> 
> 由于 $\eta$ 两边都是线性空间，且我们已经构造了它的可能逆映射 $\phi$。要验证同构，我们可以证明 $\phi$ 确实是它的逆映射，即 $\phi\comp\eta = \idop_{\Hom{\R}{V}}$ 和 $\eta\comp\phi = \idop_{V}$ 都是单位变换:
> - 对于任意 $f\in \Hom{\R}{V}$，对于任意的 $r\in\R$ 我们都能让 $f$ 转一圈回到自己，就能证明第一部分了，而我们有：$$ (\phi\comp\eta)(f(r)) = (\phi\comp\eta(f))(r) = \phi(f(1))(r) = r\cdot f(1) = f(r);$$
> - 对于任意的 $\vect{v}\in V$，我们有 $$\eta\comp\phi(\vect{v}) = \eta(\phi(\vect{v})) = \phi(\vect{v})(1) = 1\cdot \vect{v} = \vect{v}.$$
> 两个式子的最后一个等号都用了线性映射和线性空间的性质，它们之前的等号则都是映射的复合。由此，我们得到它是一个同构。

那么，它为什么叫 **自然** 同构？这是因为我们再次借用了范畴论的语言，它的定义应该借助所谓的 **函子**，我们这里就不再展开（因为我是菜鸡）。可以这样理解所谓的 *自然*：如果这个同态的构造不依赖于任何额外的信息，只从定义域和值域的关于这个范畴的基本信息就可以了，而且这个同态中用到的对象不是特定的，这个范畴中的任何对象都是可以的。这里我们讨论的范畴是线性空间，那么 “一个同态是自然的” 就是在说，这个映射的构造只需要关于线性空间的基本性质，用来定义它的 $V$ 可以是任何一个合法的线性空间。

为什么我们强调了 *自然*？因为当我们把向量表达为 *列矩阵* 时，通过上一节的描述，我们需要两组基来确定它；但是实际上，我们只需要 $V$ 上的一组基就可以表达了，这和我们对 *向量需要一组基来表达为列向量* 是相符的。我们不需要另一组 $\R$ 的基的原因就出自这里的 *自然* 性了，这样的对应不需要选择特定的基，所以如果我们想表达为列矩阵，我们真的只需要 $V$ 上的基就可以。

而这，也完美地保证了我们完全可以把向量在线性映射下的像的计算过程，化作矩阵与列向量之间的乘法运算，只需要运用矩阵乘法就可以了。一个运算，两种含义，针不戳！


## 行向量与 \$V\to \R\$

自然我们有一个问题：按照我们上面的线性映射与矩阵表达的关系，一个 $V$ 到 $\R$ 的线性映射 $T$ 就可以在给两边各选择一组基之后表达为一个 $1\times n$ 的矩阵，即所谓的 **行矩阵** 或者 **行向量** 了。我们尝试用之前的过程研究这个类似的问题。

我们首先还是让它们有各自的基：$\BaseBV$ 和 $\BaseE$，它们之间的线性映射 $T\vcentcolon V\to \R$ 可以表达为 $\mat{B} = \mrep{T}{\BaseBV}{\BaseE}$，这个矩阵它有 $1$ 行 $n$ 列。照我们之前的做法，两个空间在选择好基之后即唯一确定了，那么它们两之间的映射就可以规约到 $\BaseBV$ 到 $\{1\}$ 的映射。然后我们就可以……

等一下，从任意集合 $S$ 到 单点集 $\{\bullet\}$ 的映射有且只能有一个，就是恒等映射呀！？那怎么办，之前的办法用不了了……不过我们似乎还有别的方案，即先证明 $\Hom{V}{\R}$ 是一个线性空间，然后它和 $V$ 是同构的，最后这个同构是自然的，这样就完成了我们的证明了。那么首先， $\Hom{V}{\R}$ 它是一个线性空间吗？

## \$\operatorname{Hom}(V,\R)\$ 作为线性空间

为了让它成为线性空间，我们需要给它定义加法和数乘。我们甚至可以故伎重施，使用逐点定义的方法，定义加法和数乘：

$$
\begin{align*} 
+&\vcentcolon \Hom{V}{\R}\times \Hom{V}{\R}\to \Hom{V}{\R}\\ 
&\quad(\varphi+\psi)(\vect{v}) = \varphi(\vect{v})+\psi(\vect{v})\ \  \forall \varphi,\psi\in \Hom{V}{\R},\vect{v}\in V;
\\[1.5ex] 
\cdot&\vcentcolon \R\times\Hom{V}{\R}\to\Hom{V}{\R}\\ 
&\quad(r\cdot\varphi)(\vect{v}) = r\cdot \varphi(\vect{v}) = \varphi(r\cdot\vect{v})\ \  \forall r\in \R, \varphi\in \Hom{V}{\R},\vect{v}\in V.
\end{align*}
$$

我们照葫芦画瓢，来证明 $\Hom{V}{\R}$ 在逐点定义的加法和数乘之下，确实成为一个线性空间。

> [!PROOF]{集合 $\operatorname{Hom}(V,\R)$ 是一个线性空间}
>
> 照旧，我们证明它满足八公理：
>
> - 存在加法单位元，即所谓的恒零映射，$\zero(\vect{v}) = 0\in\R\ \ \forall \vect{v}\in V$。则 $$(\varphi+\zero)(\vect{v}) = \varphi(\vect{v}) + 0 =\varphi(\vect{v})= 0 + \varphi(\vect{v}) = (\zero+\varphi)(\vect{v});$$
> - 可以为任意的 $\varphi\in\Hom{V}{\R}$ 定义加法逆元 $-\varphi$，令任意的 $\vect{v}\in V$ 都满足 $$(\varphi+(-\varphi))(\vect{v}) = \varphi(\vect{v}) - \varphi(\vect{v}) = 0 = - \varphi(\vect{v}) + \varphi(\vect{v}) = ((-\varphi)+\varphi)(\vect{v});$$
> - 对于任意的 $\varphi,\psi,\xi\in\Hom{V}{\R}$ 以及 $\vect{v}\in V$，有下式始终成立 $$((\varphi+\psi)+\xi)(\vect{v}) = \varphi(\vect{v})+\psi(\vect{v})+\xi(\vect{v}) = (\varphi+(\psi+\xi))(\vect{v}),$$ 两个等号皆通过加法定义得到；
> - 对于任意的 $\varphi,\psi\in\Hom{V}{\R}$ 都成立交换律，理由同上，因为 $\R$ 具有交换律；
> - 数域单位元在任意的 $\varphi\in\Hom{V}{\R}$ 上的作用都得到它本身，理由同上，利用 $\R$ 中乘法单位元的定义；
> 
> 下面我们不再阐述每个等号的成立理由。
> 
> - 数乘对向量加法有分配率：对任意 $r\in\R,\varphi,\psi\in\Hom{V}{\R}$ 和 $\vect{v}\in V$，下式始终成立：$$\begin{align*}(r\cdot(\varphi+\psi))(\vect{v}) &= (\varphi+\psi)(r\cdot\vect{v})= \varphi(r\cdot\vect{v})+\psi(r\cdot\vect{v}) \\ &= r\cdot\varphi(\vect{v})+r\cdot\psi(\vect{v}) = (r\cdot\varphi)(\vect{v})+(r\cdot\psi)(\vect{v})\\ &= (r\cdot(\varphi+\psi))(\vect{v});\end{align*}$$
> - 数量加法对数乘有分配率：对任意 $r,s\in\R,\varphi\in\Hom{V}{\R}$ 和 $\vect{v}\in V$，下式始终成立：$$\begin{align*}((r+s)\cdot\varphi)(\vect{v}) &= \varphi((r+s)\cdot\vect{v})= \varphi(r\cdot\vect{v}+s\cdot\vect{v}) \\ &= r\cdot\varphi(\vect{v})+s\cdot\psi(\vect{v}) = (r\cdot\varphi)(\vect{v})+(s\cdot\varphi)(\vect{v})\\ &= (r\cdot\varphi+s\cdot\varphi)(\vect{v});\end{align*}$$
> - 数量乘法有交换律：对任意 $r,s\in\R,\varphi\in\Hom{V}{\R}$ 和 $\vect{v}\in V$，下式始终成立：$$((rs)\cdot\varphi)(\vect{v}) = \varphi((rs)\cdot\vect{v}) = \varphi((sr)\cdot\vect{v}) = ((sr)\cdot\varphi)(\vect{v}).$$
>
> 至此，我们验证完毕，$\Hom{V}{\R}$ 的确在上述加法和数乘下成为一个向量空间。

很好，我们成功地证明它是一个线性空间（也很累）。那它和 $V$ 之间是同构的吗？

## 对偶空间与同构

前面的记号 $\Hom{V}{\R}$ 太麻烦了。好在，我们有 **对偶空间** 的概念，它不是别的，就是这个线性空间。

> [!DEF]{对偶空间}
>
> 一个线性空间 $V$ 的对偶空间记作 $V^*$，它是通过在集合 $\Hom{V}{\R}$ 上定义加法和数乘得到的，其加法和数乘分别定义为：
> $$\begin{align*} +&\vcentcolon  V^*\times  V^*\to  V^*\\ &\quad(\varphi+\psi)(\vect{v}) = \varphi(\vect{v})+\psi(\vect{v})\ \  \forall \varphi,\psi\in  V^*,\vect{v}\in V;\\[1.5ex] \cdot&\vcentcolon \R\times V^*\to V^*\\ &\quad(r\cdot\varphi)(\vect{v}) = r\cdot \varphi(\vect{v}) = \varphi(r\cdot\vect{v})\ \  \forall r\in \R, \varphi\in  V^*,\vect{v}\in V.\end{align*}$$
>
> 
