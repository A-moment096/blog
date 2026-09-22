---
categories:
- Mathematics
# - Programming
# - Phase Field
# - Others
tags:
- Linear Algebra
- Note
title: 线性代数笔记 IV
description: 线性空间与标量函数
date: 2026-09-22T23:45:01+08:00
image: /images/Alice-sky.jpg
imageObjectPosition: "center 40%"
math: true
hidden: false
comments: true
draft: true
---

*在前两章讨论对偶的过程中我们非常广泛地应用了“对偶基”的概念，而根据向量与余向量的坐标表示我们似乎总能将向量和余向量通过某种方式联系起来。*

我们给向量空间额外定义一个运算：内积。这不是线性空间的内禀属性，但是我们会经常用到它。

> [!DEF] 内积
>
> 内积是满足下面性质的一个 $\langle\cdot,\cdot\rangle\vcentcolon V\times V\to \field{F}$ 的二元运算：
>
> - 共轭对称：$\langle \vect{x},\vect{y}\rangle = \overline{\langle \vect{y},\vect{x}\rangle};$
> - 对第一个元素有线性性：$\langle a\vect{x}+b\vect{y},\vect{z}\rangle = a\langle \vect{x},\vect{z}\rangle + b\langle \vect{y},\vect{z}\rangle;$
> - 非负性：对任意的非 $0$ 元素 $\vect{x}$，$\langle \vect{x},\vect{x}\rangle > 0;$
