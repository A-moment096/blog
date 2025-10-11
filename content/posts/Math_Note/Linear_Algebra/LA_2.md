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
\gdef       \mrep           #1#2#3{[{#1}]^{#2}_{#3}}                      % representation [L]_{C,B}
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

对比上下两种路径，我们发现：通过将向量表达为基的线性表示，我们将向量在线性映射下的像的问题，转换为了两种系数之间的运算：一个是 $\vect{v}$ 在 $V$ 中基的组合系数，另一个则是 $\vect{b}_j$ 在经过 $L$ 映射后在 $W$ 中基的组合系数。前者是我们一定能得到的，因为 $V$ 中有基则所有向量都可以被基线性表出，这就说明，$L$ 的所有性质全部依赖于后者，我们需要知道 $\vect{b}_j$ 被映射后，在 $W$ 中的基被表达为了什么样的线性组合。由于 $V$ 有 $n$ 个基向量，每个基向量在 $W$ 的基下都被表达为 $m$ 个向量的线性组合，所以每个基向量都有 $m$ 个线性组合系数，则这个过程一共要确定 $mn$ 个线性组合系数，这也是 $A^i{}_j$ 这个记号的（一部分）由来。

等一下，$m$ 乘以 $n$ 个系数？你一定等不及把它写成矩阵的形状了。

## 矩阵与线性映射

现在我们给矩阵赋予线性映射下的意义。

> [!REM]{矩阵的线性映射意义}
>
> 设有 $n$ 维线性空间 $V$ 和 $m$ 维线性空间 $W$，二者之间的线性映射 $L\vcentcolon V\to W$ 可以在 $V$ 的一组基 $\basis{B}{V}$ 和 $W$ 的一组基 $\basis{C}{W}$ 下表达为一个矩阵，我们将它记作 $\mat{A} = \mrep{L}{\BaseBV}{\BaseCW} = \mrep{L}{\BaseB}{\BaseC}$，这个矩阵有 $m$ 行 $n$ 列，我们简记为 $m\times n$ 矩阵。
> 
> 使用类似的记号，我们将 $V$ 中的向量 $\vect{v}$ 在它的基 $\BaseBV$ 下的表示记为 $\vrep{v}{\BaseBV} = \vrep{v}{\BaseB}$

