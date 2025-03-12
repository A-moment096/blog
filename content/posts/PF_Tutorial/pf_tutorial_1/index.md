---
categories:
- Phase Field
- Mathematics
- Programming
tags:
- Tutorial
- Phase Field
- Numerical Analysis
title: "Phase Field: 相场模拟学习笔记 I"
description: 记录相场方法的学习内容
image: Skadi.png
date: 2024-11-01
math: true
links:
  - title: PF_Tutorial_1 相场法介绍&部分数学基础
    description: 放在B站的讲课录播
    website: https://www.bilibili.com/video/BV1961uYiEpJ/
  - title: 相场理论基础-Foundation of Phase Field Modeling
    description: CSDN上发现的相场介绍文章, 内容很好
    website: https://blog.csdn.net/kuailezhizi1996/article/details/129011165
---
*这学期开了相场模拟培训, 故尝试将相场培训笔记性质的内容记录下来, 期望观感应该是目录式的笔记, 外带可有可无的说明文字.那么就开始吧*

## Phase Field Method 是什么？

Phase Field Method, 直译为相场法, 是一种材料模拟方法, 其通过宽界面(平滑界面)的特点, 克服了另一个模拟方法: Stefan 法的窄界面无法计算的缺点, 实现了对材料中的相的演化的模拟.

### 基本概念解析

- Phase Field: 所谓的相场, 可以理解为模拟域, 给每个点赋予一个值来表示不同的相以及相界面
- Order Parameter: 序参量, 即上一条中用来表示不同相的变量.一般0代表没有这个相, 1代表完全占据这个相, 介于0到1之间的即为相界面.
- Free Energy Functional: 自由能泛函, 相场背后的热力学机理, 通过系统对自由能最低构型方向的移动来演化出模拟域中每个点的值的变化.
- Governing Equations: 演化方程, 用来加工上述自由能泛函的方程.对不同特性的变量, 需要选择不同的演化方程以进行演化: 
  - AC: Allen-Cahn方程,  用来演化非保守场的方程(即变量之和可以不为某一定值, 比如相序参量), 可以认为是有源CH方程；
  - CH: Cahn-Hilliard方程, 用来演化保守场的方程(即变量值和为某个定值, 比如浓度).

### AC 和 CH 方程

AC方程的形式如下: 
$$
    \frac{\partial \eta_p}{\partial t} = -L_{pq}\frac{\delta F}{\delta\eta_q\left( r,t \right)} 
$$

CH方程形式如下: 
$$
    \frac{\partial c_i}{\partial t} = \nabla \cdot M_{ij} \nabla \frac{\delta F}{\delta c_j \left( r,t \right)}
$$

解两个方程需要的工具有: 解ODE/PDE(有限差分法, FDM), 求自由能的变分导数(欧拉-拉格朗日方程,  E-L方程), 向量微积分($\nabla$与$\nabla^2$)

---

<center>Nov 05 更新: </center>

## 解ODE: 有限差分法

数值方法解ODE有很多种不同的方法, 比如傅里叶谱 (Fourier Spectrum) 方法, 有限元法 (Finite Element Method, FEM), 以及这里讲到的有限差分法 (Finite Difference Method, FDM).

有限差分法应该是最方便的一种求解方法, 其基本思想便是简单地把"求导"过程中的"求极限"的步骤省略掉, 用极小的区间上的商来替代导数. 这样一来, 复杂的求导运算即可通过简单的乘法和加法完成, 而微分方程也就可以通过上一步(临近的上一个点)的值进行迭代来获得下一个点的结果, 从而实现微分方程的求解.

有限差分法相比与其他算法, 其优势不仅在于求解逻辑简单, 还在于该解法对于求解的区域的限制较小, 对于多种边界条件下的微分方程都可以作出求解, 因此是一种比较通用的解法.

下面给出有限差分法的基本公式以及部分代码实现:
 
对于如下的常微分方程初值问题:
$$ \dfrac{\mathrm{d}\,y}{\mathrm{d}\,x}  = f(x,y);$$
$$ y(x_0) = y(a) = y_0, $$
其中 $x \in \left[ a,b \right] \subseteq \mathbb{R} $, $y(x) \in \mathbb{R} \to \mathbb{R}$
由此可以选定一大整数 $ N $, 记 $h = \dfrac{b-a}{N}$, $ x_0 = a, x_i = x_0 + ih, x_N = b, y_i = y(x_i).$ 
则由有限差分, 该初值问题方程可以改写为:
$$ \dfrac{y_i - y_{i-1}}{h} = f(x_{i-1},y_{i-1}); \tag{显式欧拉法}$$
$$ \dfrac{y_i - y_{i-1}}{h} = f(x_{i},y_{i}). \tag{隐式欧拉法}$$
其中显式方法可以直接求得:
$$ y_i = h f(x_{i-1},y_{i-1}) + y_{i-1}. $$


这里使用 Python 实现显式欧拉法：
```python
'''
Explicit Euler Method
list x and y should have an initial value.
'''
from typing import Callable
def explicit_euler(
    x:list[float],y:list[float],h:float,N:int,f:Callable[[float,float],float]
):
    for i in range(N):
        x.append(x[i]+h)
        y.append(f(x[i],y[i])*h+y[i])
```

对于隐式欧拉法, 在给出$f(x,y)$的具体表达式的情况下, 可以显式给出非递归的算法, 否则由于等式右侧存在待求量, 无法显式逐步解出. 除了两种欧拉法, 还有梯形公式 (算术平均 $ f(x_i,y_i) $ 与 $f(x_{i-1},y_{i-1})$), 通过*预估-校正*技术实现的改进欧拉公式, 以及精度较高的 Runge-Kutta 方法. 
这里给出四阶 Runge-Kutta 法的 Python 实现: 
```python
"""
Runge-Kutta Method
"""
def runge_kutta(
    x: list[float], y: list[float], h: float, N: int, f: Callable[[float, float], float]
):
    for i in range(N):
        x.append(x[i] + h)
        k_1: float = f(x[i], y[i])
        k_2: float = f(x[i] + h / 2, y[i] + h / 2 * k_1)
        k_3: float = f(x[i] + h / 2, y[i] + h / 2 * k_2)
        k_4: float = f(x[i] + h, y[i] + h * k_3)
        y.append(y[i] + h / 6 * (k_1 + 2 * k_2 + 2 * k_3 + k_4))
```

---

<center>Nov 06 更新: </center>

## 自由能泛函与变分导数: Euler-Lagrange 方程

### 自由能: 引导体系演化的主趋力

先谈谈自由能. 相场中使用的自由能主要是亥姆霍兹自由能. 不过无论是亥姆霍兹自由能, 还是吉布斯自由能, 其作为自由能, 都表明了一个体系的状态, 且在自由能梯度的驱使下, 体系将朝着体系自由能最低的方向发展. 而这即为相场法背后的主要热力学依据.

相场中所用的自由能通常具有以下的形式:

$$ F(c, \eta, \nabla c, \nabla \eta) = \int_{\Omega} f(c, \eta) + \kappa_c (\nabla c)^2 + \kappa_\eta (\nabla \eta)^2 + S\; \mathrm{d}\omega.$$

其中, $c$ 为浓度, $\eta$ 为序参量 (标示某个相区域的变量), $f(c,\eta)$ 部分是体系的*体自由能*, 可以认为是体系平衡时的自由能; 两个梯度项 $\kappa_c (\nabla c)^2 $, $ \kappa_\eta (\nabla \eta)^2$ 为描述并控制相界面宽度与迁移速率的项, 可以认为是*界面能*对总能量的贡献. 最后的 $S$ 则是其余部分对体系自由能的贡献, 如磁场, 电场, 温度场等等. 这几个部分相互作用, 共同指明了体系的演化方向, 并标示了平衡状态.

### 泛函: 函数的函数

上面的自由能表达式实际上是一种泛函, 其中的浓度和序参量均为模拟域位置的函数. 除此之外, 且是一类经典泛函:
$$
J\left[ y \right]=\int_{\Omega} L(x,y(x),y'(x)) \,\mathrm{d}\omega.
$$
的空间形式 (即替换一般导数为梯度). 其中 $\Omega$ 是函数 $y$ 的定义域, 函数 $y$ 在泛函中充当自变量的作用. 这类泛函通常带有物理背景, 因此得到了广泛研究, 对其极限函数的研究 (即能使 $J$ 取到极值的函数 $u$)也已经有一套成熟的方法.

### Euler-Lagrange 方程

所谓 Euler-Lagrange 方程, 是指对上述类型的泛函的方程:
$$
\frac{\partial L}{\partial f}-\frac{\mathrm{d} }{\mathrm{d} x}\frac{\partial L}{\partial f'} = 0. \tag{1}
$$
该方程的作用与一般函数 $y = \phi(x)$的极值判断方程
$$ 
\phi'(\xi) = 0 \tag{2}
$$
类似, 都是指明了极值点出现的条件: (1) 指出极限函数 $f$ 应满足 E-L 方程, 而 (2) 则指出极值点 $\xi$ 应满足导数在该点处取值为0. 由此也不难理解泛函导数 (或者叫变分导数) 的形式应为方程(1)的左半部分:
$$
\frac{\delta J[y]}{\delta y} = \frac{\partial L}{\partial y}-\frac{\mathrm{d} }{\mathrm{d} x}\frac{\partial L}{\partial y'}.
$$
当然, 这里只给出了一阶导参与泛函定义的情况. 对于更一般的情况
$$
J\left[ y \right]=\int_{\Omega} L(x,y(x),y'(x),\dots,y^{(n)}(x)) \,\mathrm{d}\omega,
$$ 
有如下表达式:
$$
\frac{\delta J[y]}{\delta y} = \frac{\partial L}{\partial y}-\frac{\mathrm{d} }{\mathrm{d} x}\frac{\partial L}{\partial y'} + \dots + (-1)^n \frac{\mathrm{d}^n }{\mathrm{d} x^n}\frac{\partial L}{\partial y^{(n)}}.
$$

## 向量微积分: \$\nabla\$

这里主要讨论 $\nabla$ 算符运算法则, 以及该算符与不同函数之间的作用结果. $\nabla$ 算符定义如下:

设一三维线性欧式空间 $\mathbb{R}^3$ 的三个基向量分别为 $\mathbf{x_1}$, $\mathbf{x_2}$, $\mathbf{x_3}$, 则其上定义的 $\nabla$ 算符为:
$$ \nabla = \frac{\partial}{\partial x_1}\mathbf{x_1}+ \frac{\partial}{\partial x_2}\mathbf{x_2}+\frac{\partial}{\partial x_3}\mathbf{x_3},$$
写作向量形式则为:
$$ \nabla = \left[ \frac{\partial}{\partial x_1}, \frac{\partial}{\partial x_2}, \frac{\partial}{\partial x_3}\right]^{\mathsf{T}}.$$
因此, $\nabla$ 算符在直接作用于标量值函数 (如 $f: \mathbb{R}^3 \to \mathbb{R}$) 时, 结果为 $\nabla f : \mathbb{R}^3 \to \mathbb{R}^3$, 得到该函数的*梯度*; 当其与向量值函数 (如 $\phi:\mathbb{R}^3 \to \mathbb{R}^3 $ ) 点乘时, 结果为一标量值函数 $\nabla \cdot \phi :\mathbb{R}^3 \to \mathbb{R} $, 得到该*向量场* (即为定义域每个点赋予一个向量而非标量值) 的*散度*; 而当该算符与向量值函数叉乘时, 得到的结果则为一向量值函数 $\nabla \times \phi : \mathbb{R}^3 \to \mathbb{R}^3$, 是该向量场的*旋度*.

如何考虑这样的算符运算结果呢? 注意到不论如何作用, 函数的定义域都是没有变化的, 亦即: 都是把一个向量映射到了某个值. 既然如此, 可以仅考虑其作用到的函数的定义域的影响, 即: *给每个坐标一个值, 则形成一个向量; 向量点乘给出一个标量; 向量叉乘给出一个向量*. 也可以把三种运算看作三种不同的"函数": $$\nabla:\mathbb{R} \to \mathbb{R}^3 ;$$ $$\nabla\cdot: \mathbb{R}^3 \to \mathbb{R}; $$ $$\nabla\times :\mathbb{R}^3 \to \mathbb{R}^3$$与原函数相复合的结果.

下面给出三种作用方式的具体表达式:
$$\nabla f = \mathbf{x}_1 \frac{\partial f}{\partial x_1} + \mathbf{x}_2\frac{\partial f}{\partial x_2}+\mathbf{x}_3\frac{\partial f}{\partial x_3};$$
$$\nabla \cdot \mathbf{f} = \frac{\partial f_1}{\partial x_1} + \frac{\partial f_2}{\partial x_2}+\frac{\partial f_3}{\partial x_3};$$
$$\nabla \times \mathbf{f} = \begin{vmatrix}
      \mathbf{x}_1                      & \mathbf{x}_2                      & \mathbf{x}_3                      \\
      \frac{\partial }{\partial x_1} & \frac{\partial }{\partial x_2} & \frac{\partial }{\partial x_3} \\
      f_1                            & f_2                            & f_3
    \end{vmatrix},
$$
其中 $f_i$ 表示 $\mathbf{f}$ 的分量函数. 下来再考察 $\nabla$ 算符的运算性质. 设 $a,b\in\mathbb{R}$ 为标量, $f,g : \mathbb{R}^3 \to \mathbb{R}$ 为标量函数, $\phi,\psi : \mathbb{R}^3 \to \mathbb{R}^3$ 为向量值函数.

直接作用 (梯度):
- 线性性: $\nabla(a f+bg) = a\nabla{f} + b\nabla g$
- 莱布尼兹律: $\nabla(fg) =  f\nabla{g} + g\nabla{f}$

点乘 (散度):
- 线性性: $\nabla\cdot(a\phi+b\psi) = a\nabla\cdot{\phi} + b\nabla\cdot{\psi}$
- 乘法律: $\nabla\cdot(f\phi) =  f\nabla\cdot{\phi} + \phi\cdot\nabla{f}$

叉乘 (旋度):
- 线性性: $\nabla\times(a\phi+b\psi) = a\nabla\times{\phi} + b\nabla\times{\psi} $
- 乘法律: $\nabla\times(f\phi) =  f\nabla\times{\phi} + \phi\times\nabla{f}$

其他:
- 梯度无旋: $\nabla\times(\nabla{f}) = 0$
- 旋度无散: $\nabla\cdot(\nabla\times{f}) = 0$
- 拉普拉斯算符 (先梯后散): $\nabla\cdot\nabla{f} = \nabla^2{f} = \Delta{f}$ 

以上是比较常用的 $\nabla$ 算符性质. 实际上三种算符的组合恒等式非常多, 而实际上常用的等式则为以上所列.

## 总结

相场法作为一种材料模拟方法, 其内容涉及范围广, 包括材料学(热力学, 动力学), 数值方法, 计算机编程等等相关内容. 解决上述列出的若干问题是开始相场模拟所必须的数学方法基础. 下一部分计划通过 Python 代码实现本文中的若干算法, 包括数值解ODE, 向量微积分的实现, 以及数值积分方法.

