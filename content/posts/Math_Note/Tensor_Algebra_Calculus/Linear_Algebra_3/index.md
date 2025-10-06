---
categories:
- Mathematics
# - Programming
# - Phase Field
# - Others
tags:
- Tensor
- Linear Algebra
- Note
title: 张量代数笔记 III
description: 张量的定义和记号
date: 2025-10-05T15:01:56+08:00
image: 
math: true
hidden: false
comments: true
draft: true
---

$$
\gdef\field#1{\mathbb{#1}}
\gdef\Hom{\operatorname{Hom}}
$$

## 线性空间和对偶空间

我们定义线性空间 $V$ 的对偶空间 $V^*$：

> [!DEF]{对偶空间}
>
> 设有 $\field{F}$ 上的线性空间 $V$，其对偶空间 $V^*$ 定义为：
>
> $$V^*\coloneqq \Hom(V,\field{F}).$$

可以验证这个空间是一个线性空间。在选定一组 $V$ 的基后，我们得到 $V^*$ 的基：

> [!DEF]{对偶空间的基}
>
> 在选择 $V$ 的一组基 $\{e_i\}_{i=1}^n$ 之后，给每个基向量定义其对偶基向量，其为一映射：
>  
> $$\begin{align*}e^j\vcentcolon &V\to \field{F}\\&e_i \mapsto e^j(e_i) = \delta_i^j\end{align*},$$
>
> 记这些基向量的对偶基向量为 $\{e^j\}_{j=1}^n$，由这组基向量张成的线性空间即为 $V$ 的对偶空间 $V^*$。

对偶空间具有这样的性质：

> [!REM]{对偶空间的性质}
>
> - 对偶空间的维度与原空间相等：$\dim V = \dim V^*$
> - 对偶空间与原空间之间存在线性同构，由对偶空间的基的定义给出
> - 向量空间的二次对偶和原向量空间存在自然同构：不需要给出一组 $V$ 的基即可定义 $V^{**}$

## 线性空间的笛卡尔积

我们不加证明地指出，线性空间 $V$ 和 $W$ 的笛卡尔积 $V\times W$ 给出一个线性空间，其维度为原两线性空间之和：

$$\dim V\times W = \dim V + \dim W$$

在给定 $V$ 和 $W$ 的基后，$V\times W$ 的元素可以由 $V$ 中元素的表示和 $W$ 中元素的表示拼接得到。对于该线性空间，我们可以定义其对偶空间：$\Hom(V\times W,\field{F})$。我们称该对偶空间中的向量为双线性的：

> [!DEF]{双线性}
>
> 设有数域 $\field{F}$ 上的两线性空间 $V$ 和 $W$，映射 $f\vcentcolon V\times W \to \field{F}$，$v,v'\in V$，$w,w'\in W$，称该映射是双线性的，当
> 
> $$f(av+bv',cw+dw') = a(cf(v,w)+df(v,w'))+b(cf(v',w)+df(v',w'))$$
>
> 即其对 $V$ 中元素有线性性，对 $W$ 中元素也具有线性性。

## 线性空间和向量的张量积

我们定义两个线性空间的张量积为其对偶空间的笛卡尔积的对偶空间：

> [!DEF]{张量积}
>
> 设 $V$ 与 $W$ 为 $\field{F}$ 上的线性空间，其张量积 $V\otimes W$ 定义为线性空间
>
> $$ V\otimes W \coloneqq \Hom(V^*\times W^*, \field{F}),$$
>
> 则该线性空间中的元素为双线性映射。取 $\varphi\in V^*$ 和 $\psi\in W^*$，则可以定义两个元素 $v\in V$ 和 $w\in W$ 之间的张量积为：
>
> $$\begin{align*}v\otimes w \vcentcolon & V\times W \to \field{F}\\ &(\varphi,\psi)\mapsto \varphi(v)\psi(w) \end{align*} $$

对于这样的一个向量空间的张量积，它有以下性质

> [!REM]{张量积的性质}
>
> - 张量积为一线性空间，其维度为 $\dim V\otimes W = \dim V\times\dim W$；
> - 张量积的


## 张量的定义

我们首先定义张量。它是一个多重线性映射，从线性空间 $V$ 的若干个拷贝和它的对偶空间 $V^*$ 的若干个拷贝的笛卡尔积映射到数域 $\field{F}$ 上。

> [!DEF]{张量（多重线性映射）}
>
> 一个 $(p,q)$ 型张量 $T$ 定义为一个多重线性映射：
>
> $$T\vcentcolon \underbrace{V^*\times \cdots \times V^*}_{p\text{ 个}}\times \underbrace{V \times \cdots \times V}_{q\text{ 个}} \to \field{F},$$
>
> 或者以向量空间的张量基记号：
>
> $$T\in \underbrace{V\otimes \cdots \otimes V}_{p\text{ 个}}\otimes \underbrace{V^* \otimes \cdots \otimes V^*}_{q\text{ 个}},$$
> 
> 其中 $V$ 是 $\field{F}$ 上的线性空间，$V^*$ 是 $V$ 的对偶空间，给出 $V$ 的基 $\{e_i\}_{i=1}^n$ 和 $V^*$ 对应的一组基 $\{e^j\}_{j=1}^n$ 后，我们可以把 $(p,q)$ 型张量 $T$ 表示为：
> 
> $$T = T(e^{j_1},\dots , e^{j_p},e_{i_1},\dots , e_{i_q}),$$
>
> 将该张量表达为基向量的张量基后，我们得到：
>
> $$T = T_{j_1\cdots j_q}^{i_1\cdots i_p} \underbrace{e_{i_1}\otimes\dots \otimes e_{i_p}}_{p\text{个}} \otimes \underbrace{e^{j_1} \otimes \dots \otimes e^{j_q}}_{q\text{个}}$$