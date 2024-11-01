---
categories:
- Phase Field
tags:
- Tutorial
- Python
- C++
title: "Phase Field：相场模拟学习笔记"
description: 记录相场方法的学习内容
image: Skadi.png
date: 2024-11-01
math: true
links:
  - title: PF_Tutorial_1 相场法介绍&部分数学基础
    description: 放在B站的讲课录播
    website: https://www.bilibili.com/video/BV1961uYiEpJ/
---
*这学期开了相场模拟培训，故尝试将相场培训笔记性质的内容记录下来，期望观感应该是目录式的笔记，外带可有可无的说明文字。那么就开始吧*

## Phase Field Method 是什么？

Phase Field Method, 直译为相场法，是一种材料模拟方法，其通过宽界面（平滑界面）的特点，克服了另一个模拟方法：Stefan 法的窄界面
无法计算的缺点，实现了对材料中的相的演化的模拟。

### Phase Field, Order Parameter, Free Energy Functional, Governing Equation (AC & CH)

- Phase Field：所谓的相场，可以理解为模拟域，给每个点赋予一个值来表示不同的相以及相界面
- Order Parameter：序参量，即上一条中用来表示不同相的变量。一般0代表没有这个相，1代表完全占据这个相，介于0到1之间的即为相界面。
- Free Energy Functional: 自由能泛函，相场背后的热力学机理，通过系统对自由能最低构型方向的移动来演化出模拟域中每个点的值的变化。
- Governing Equations：演化方程，用来加工上述自由能泛函的方程。对不同特性的变量，需要选择不同的演化方程以进行演化：
  - AC: Allen-Cahn方程， 用来演化非保守场的方程（即变量之和可以不为某一定值，比如相序参量），可以认为是有源CH方程；
  - CH：Cahn-Hilliard方程，用来演化保守场的方程（即变量值和为某个定值，比如浓度）。

### AC 和 CH 方程

AC方程的形式如下：
$$
    \frac{\partial \eta_p}{\partial t} = -L_{pq}\frac{\delta F}{\delta\eta_q\left( r,t \right)} 
$$

CH方程形式如下：
$$
    \frac{\partial c_i}{\partial t} = \nabla \cdot M_{ij} \nabla \frac{\delta F}{\delta c_j \left( r,t \right)}
$$

解两个方程需要的工具有：解ODE/PDE（有限差分法，FDM），求自由能的变分导数（欧拉-拉格朗日方程， E-L方程），向量微积分（$\nabla$与$\nabla^2$）

## To Be Continue...