---
categories:
- Mathematics
# - Programming
# - Phase Field
# - Others
tags:
- Linear Algebra
- Note
title: 线性代数笔记 III
description: 矩阵作为线性空间
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
\gdef       \Hom            {\operatorname{Hom}}             % morphisms between A and B
\gdef       \Iso            {\operatorname{Iso}}
\gdef       \End            {\operatorname{End}}                  % 
\gdef       \Aut            {\operatorname{Aut}}                  % 
\gdef       \cat            #1{\mathsf{#1}}                             % category symbol: e.g., \cat{Vect}, \cat{Set}
\gdef       \Mat            {\operatorname{Mat}}
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

上一章里，我们以 $\Hom(\R,V)$ 和 $V^* = \Hom(V,\R)$ 为例，简单看了看 $\Hom(V,W)$ 这一类线性空间中的两个特殊的例子，以及它们和矩阵表达之间的关系。由于线性空间、对偶空间和双对偶空间之间的关系，我们可以把余向量看作向量到 $\R$ 的函数，同时可以把向量看作它的二次对偶，从而成为余向量到 $\R$ 的函数。从线性映射的矩阵表达，我们也能理解它们为什么可以写成列向量和行向量。

然而，我们依旧没有搞清楚 $\Hom(V,W)$ 本身是什么样的，它到底和矩阵有什么关系？它不使用两边的基表达为一个具体的矩阵时，我们还能得到一些什么？行向量与列向量可以相乘、矩阵和行/列向量都可以相乘，这又暗示了什么？

我们先从 $\Hom(V,W)$ 开始吧。我们知道它能表达为矩阵，那它作为线性空间，也应该有自己的基才对。我们找找它的基是什么吧。

## 再探 \$\operatorname{Hom}(V,W)\$ 

上一章我们给出了如何定义加法和数乘，使它从集合成为一个线性空间。证明完它真的是线性空间外，我们只声称了它是和 $\Mat(m,n)$ 之间有一些联系：如果 $\dim V = n$ 而 $\dim W = m$， 则我们声称 $\Hom(V,W)$ 和 $\Mat(m,n)$ 是同构的。我们依旧很难直接从 $\Hom(V,W)$ 本身凭空创造出一个基来，但是好消息是，我们很早就有了一些线索：线性映射在选择好基如何映射到新空间后就唯一确定了。既然如此，何不看看能否从两边的基向量出发构建出 $\Hom(V,W)$ 的基？

我们取 $L\in \Hom(V,W)$，其中 $\dim V = n$，$\dim W = m$，以及 $V$ 和 $W$ 各自的基 $\BaseB$ 和 $\BaseC$。由于 $L$ 是一个线性映射，它一定把 $\BaseB$ 中的基向量唯一确定地映射到了 $W$ 中。或者说，通过确定怎么给 $\BaseB$ 中的每一个基向量找到 $W$ 的一个向量与之对应，我们就唯一确定了这个线性映射 $L$。这一步中，我们要给这 $n$ 个向量都在 $W$ 中确定一个向量，而为了确定这样一个向量，我们又需要 $m$ 个实数，因为每个向量都可以在 $W$ 中唯一分解为基的线性组合，选定基后就是 $m$ 个实数作为系数。

由此，我们可以得到一个初步的结论：为了确定一个线性映射，我们要确定每个基向量的映射结果，而这个过程需要确定 $n$ 个基向量的像，每个像由 $m$ 个实数确定，因此我们需要 $mn$ 个实数来确定一个 $\Hom(V,W)$。而这，正好就是我们想要的：如果 $mn$ 就能确定一个向量，那么这个向量所在的线性空间一定是 $mn$ 维的，基中一定有 $mn$ 个向量。那么，它的基应该是什么样的？

我们记 $\Hom(V,W)$ 的基为 $\basis{H}{}$，基向量为 $\{H_k\}_{k}^{mn}$，然后用刚刚的线性映射来尝试算一下它怎么将 $\vect{v}\in V$ 映射到 $L(\vect{v})\in W $。

首先，我们有线性组合 $\vect{v} = \sum_j^n v^j \vect{b}_{j}$ 以及 $L = \sum_k^{mn} \eta_k H_i$，

<!-- 记 ，则每个 $\vect{f}_j$ 有 $\vect{f}_{j} = \sum_i^m A^i{}_j\vect{c}_{i}$。  -->

$$
\begin{align*}
L(\vect{v}) &= L(\sum_j^n v^j \vect{b}_j) = \sum_j^n v^j L(\vect{b}_j)\\
            &= \sum_j^n \sum_k^{mn} v^i \eta_k H_k(\vect{b}_j) \\
\end{align*}
$$
  <!-- - 经过整理，我们有 $$L(\vect{v}) =   = \sum_i^m (\sum_j^n A^i{}_jv^j)\vect{c}_{i} = \sum_i^m w^i \vect{c}_{i} = \vect{w}$$ -->
然而，上一章中我们也算过这个例子，那时我们要求 $L(\vect{b}_j) = \vect{f}_{j} \in W$，有
$$
\begin{align*}
L(\vect{v}) &= \sum_j^n v^j \vect{f}_{j} = \sum_j^n v^j \sum_i^m A^i{}_j\vect{c}_{i}\\\
            &= \sum_j^n\sum_i^m v^jA^i{}_j\vect{c}_{i}\\
\end{align*}
$$

我们记

