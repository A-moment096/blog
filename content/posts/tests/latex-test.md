---
title: "LaTeX 公式渲染测试"
description: "测试 KaTeX 渲染引擎的 LaTeX 公式支持"
date: 3000-01-22T10:00:00+08:00
categories:
- Testing
- Mathematics
tags:
- LaTeX
- KaTeX
- Mathematics
math: true
draft: true
---

# LaTeX 公式渲染测试

本页面专门测试 KaTeX 渲染引擎对各种 LaTeX 公式的支持情况。

## 基础公式测试

### 行内公式
这是一个简单的行内公式：$E=mc^2$，以及爱因斯坦的质能方程。

圆的面积公式：$A = \pi r^2$，欧拉恒等式：$e^{i\pi} + 1 = 0$

### 块级公式
高斯积分：
$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

二项式定理：
$$(a+b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k$$

## 多行公式和对齐

使用 align 环境：
$$\begin{align}
\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} &= \frac{4\pi}{c}\vec{\mathbf{j}} \\
\nabla \cdot \vec{\mathbf{E}} &= 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} &= \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} &= 0
\end{align}$$

分段函数：
$$f(x) = \begin{cases}
x^2 & \text{if } x > 0 \\
0 & \text{if } x = 0 \\
-x^2 & \text{if } x < 0
\end{cases}$$

## 矩阵和行列式

矩阵乘法：
$$\begin{pmatrix}
1 & 2 & 3 \\
4 & 5 & 6
\end{pmatrix}
\begin{pmatrix}
a & b \\
c & d \\
e & f
\end{pmatrix} = 
\begin{pmatrix}
a+2c+3e & b+2d+3f \\
4a+5c+6e & 4b+5d+6f
\end{pmatrix}$$

单位矩阵：
$$I_3 = \begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}$$

行列式：
$$\det(A) = \begin{vmatrix}
a & b & c \\
d & e & f \\
g & h & i
\end{vmatrix} = aei + bfg + cdh - ceg - afh - bdi$$

## 求和、积分与极限

级数求和：
$$\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}$$

定积分：
$$\int_0^1 \frac{dx}{\sqrt{1-x^2}} = \frac{\pi}{2}$$

多重积分：
$$\iiint_V (x^2 + y^2 + z^2) \, dx \, dy \, dz$$

极限：
$$\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e$$

$$\lim_{x \to 0} \frac{\sin x}{x} = 1$$

## 特殊符号和运算符

### 希腊字母
$\alpha, \beta, \gamma, \delta, \epsilon, \varepsilon, \zeta, \eta, \theta, \vartheta$

$\iota, \kappa, \lambda, \mu, \nu, \xi, \pi, \varpi, \rho, \varrho$

$\sigma, \varsigma, \tau, \upsilon, \phi, \varphi, \chi, \psi, \omega$

大写希腊字母：
$\Gamma, \Delta, \Theta, \Lambda, \Xi, \Pi, \Sigma, \Upsilon, \Phi, \Psi, \Omega$

### 二元运算符
$\pm, \mp, \times, \div, \cdot, \ast, \star, \circ, \bullet$

$\oplus, \ominus, \otimes, \oslash, \odot$

### 关系符号
$<, >, =, \leq, \geq, \neq, \equiv, \approx, \cong, \sim, \simeq, \propto$

$\subset, \supset, \subseteq, \supseteq, \in, \notin, \ni$

### 箭头
$\leftarrow, \rightarrow, \leftrightarrow, \Leftarrow, \Rightarrow, \Leftrightarrow$

$\mapsto, \longmapsto, \hookleftarrow, \hookrightarrow$

### 逻辑符号
$\forall, \exists, \nexists, \neg, \land, \lor, \implies, \iff$

### 其他符号
$\infty, \partial, \nabla, \emptyset, \varnothing, \triangle, \square, \diamond$

$\cdots, \ldots, \vdots, \ddots, \therefore, \because$

## 上标、下标与修饰符

### 基本上下标
$x_i, x^2, x_i^j, x_{i+1}^{n-1}, {}^{14}C, H_2O$

### 修饰符
$\hat{x}, \bar{y}, \vec{v}, \dot{x}, \ddot{x}, \tilde{z}, \check{w}$
$\acute{a}, \grave{b}, \breve{c}, \widehat{abc}, \widetilde{abc}$

### 括号和分隔符
小括号：$(x+y)$，$\left(\frac{a}{b}\right)$
中括号：$[x+y]$，$\left[\frac{a}{b}\right]$
大括号：$\{x+y\}$，$\left\{\frac{a}{b}\right\}$
绝对值：$|x|$，$\left|\frac{a}{b}\right|$
范数：$\|x\|$，$\left\|\frac{a}{b}\right\|$

## 字体样式

### 数学字体
$\mathrm{Roman}$, $\mathit{Italic}$, $\mathbf{Bold}$, $\mathsf{Sans}$, $\mathtt{Typewriter}$

### 数学符号集
$\mathbb{N, Z, Q, R, C, H}$ (自然数、整数、有理数、实数、复数、四元数)
$\mathcal{A, B, C, L, F}$ (花体字母)
$\mathfrak{a, b, c, g, h}$ (哥特体)
$\mathscr{A, B, C, L, M}$ (手写体，如果支持)

### 文字模式
$\text{这是文字}$, $\text{Hello, World!}$
$x = 5 \text{ 当且仅当 } x^2 = 25$

## 化学公式 (mhchem)

### 基本化学式
$\ce{H2O}$ (水), $\ce{CO2}$ (二氧化碳), $\ce{H2SO4}$ (硫酸)
$\ce{C2H5OH}$ (乙醇), $\ce{NaCl}$ (氯化钠), $\ce{CaCO3}$ (碳酸钙)

### 离子
$\ce{Na+}$, $\ce{Cl-}$, $\ce{SO4^2-}$, $\ce{Cu^2+}$, $\ce{Fe^3+}$

### 化学反应方程式
燃烧反应：
$$\ce{CH4 + 2O2 -> CO2 + 2H2O}$$

酸碱中和：
$$\ce{HCl + NaOH -> NaCl + H2O}$$

复杂反应：
$$\ce{2KMnO4 + 16HCl -> 2KCl + 2MnCl2 + 8H2O + 5Cl2 ^}$$

## 高级功能

### 组合数学
二项式系数：$\binom{n}{k} = \frac{n!}{k!(n-k)!}$

多项式系数：$\binom{n}{k_1, k_2, \ldots, k_m} = \frac{n!}{k_1! k_2! \cdots k_m!}$

### 特殊函数
$\sin x, \cos x, \tan x, \cot x, \sec x, \csc x$
$\arcsin x, \arccos x, \arctan x$
$\sinh x, \cosh x, \tanh x$
$\log x, \ln x, \lg x, \exp x$

### 概率和统计
期望值：$E[X] = \sum_{x} x \cdot P(X = x)$

方差：$\text{Var}(X) = E[X^2] - (E[X])^2$

正态分布：$f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$

## 颜色测试（如果支持）

$\color{red}{\text{红色文字}}$, $\color{blue}{\text{蓝色文字}}$
$\color{green}{x^2} + \color{orange}{y^2} = \color{purple}{1}$

## 公式标记

带标记的公式：
$$E = mc^2 \tag{Einstein}$$

$$a^2 + b^2 = c^2 \tag{勾股定理}$$

$$\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6} \tag{巴塞尔问题}$$

## 复杂综合示例

薛定谔方程：
$$i\hbar \frac{\partial}{\partial t} \Psi(\mathbf{r}, t) = \hat{H} \Psi(\mathbf{r}, t)$$

麦克斯韦方程组：
$$\begin{align}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{align}$$

广义相对论中的爱因斯坦场方程：
$$G_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}$$

弦理论中的作用量：
$$S = \frac{1}{4\pi\alpha'} \int d^2\sigma \sqrt{-h} h^{ab} \partial_a X^\mu \partial_b X_\mu$$

---

*本页面测试了 KaTeX 引擎的各种 LaTeX 功能。如果某些公式无法正确显示，请检查 KaTeX 版本和配置。*
