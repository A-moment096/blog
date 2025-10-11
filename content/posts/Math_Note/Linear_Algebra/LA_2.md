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
description: 线性映射与矩阵
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
$$

## 前言

在上一节我们讨论完线性空间的基本情况后，一个自然的问题在于怎么研究线性空间之间的映射。我们已经拥有了那些定义，但是具体地，一个向量会怎么通过线性映射得到另一个空间中的向量的方式，我们暂时还没有结论。所幸，线性空间的基给了我们一些指引，借助它，我们可以把线性空间中的几乎所有线性的对象全部表达为 **矩阵** 的形式。所以本节我们将着重讨论矩阵本身，以及它与线性映射的关系

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

另外，上面的例子中，$\mat{B}$ 是 $p\times n$ 型矩阵，而 $\mat{A}$ 是 $n\times m$型矩阵，得到的结果 $\mat{C}$ 是一个 $p\times m$ 型矩阵。由此我们得知，只有第一个矩阵的行数等于第二个矩阵的列数的时候，才能让这个乘法成立。我们下面总结一下。

> [!REM]{矩阵乘法}
>
> 两个矩阵 $\mat{A}$ 和 $\mat{B}$ 若分别为 $m\times n$ 和 $n\times p$ 型矩阵，则它们的乘积 $\mat{AB}$ 为一个 $m\times p$ 型矩阵。这个过程可以解释为线性映射的复合，其中：
> - $\mat{B}$ 代表一个 $p$ 维到 $n$ 维线性空间的线性映射;
> - $\mat{A}$ 代表一个 $n$ 维到 $m$ 维线性空间的线性映射;
> - 它们的乘积 $\mat{AB}$ 则代表它们的复合，一个从 $p$ 维到 $n$ 维线性空间的线性映射。

## 矩阵与向量

我们考虑一个特殊的线性映射：从一维线性空间 $U$ 映射到 $n$ 维线性空间 $V$ 上线性映射 $L$，它在基下的表示矩阵为 $\mat{A} = \mrep{L}{\basis{B}{U}}{\basis{C}{V}}$。根据我们上面的记号，这个线性映射的矩阵表示就有 $n$ 行，但是它只有 $1$ 列。

我们先来看看线性空间 $U$，它只有一维，意味着它的基中只有一个基向量，而这个空间中的所有向量都可以表达为一个系数乘以这个基向量。再考虑这个线性映射 $L$，它 *把一个向量唯一确定地映射到另一个空间中的一个向量*，且保持线性。也就是说，


<!-- > 使用类似的记号，我们将 $V$ 中的向量 $\vect{v}$ 在它的基 $\BaseBV$ 下的表示记为 $\vrep{v}{\BaseBV} = \vrep{v}{\BaseB}$ -->

