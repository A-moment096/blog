---
title: "LaTeX 渲染测试页面"
description: "测试 LaTeX 的支持情况"
date: 3000-01-22T10:00:00+08:00
categories:
- Testing
tags:
- Test
mermaid: true
draft: true
# hidden: true
---

这个页面用以测试 $\LaTeX$ 的渲染情况

## Inline LaTeX

这是一个行内公式示例：$E=mc^2$。

## Block LaTeX

下面是一个块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

## 多行公式

$$
\begin{align}
a^2 + b^2 &= c^2 \\
e^{i\pi} + 1 &= 0
\end{align}
$$

## 矩阵示例

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$

## 分数和根号

这是分数 $\frac{a}{b}$ 和根号 $\sqrt{2}$ 的示例。

## 希腊字母

$\alpha, \beta, \gamma, \delta, \epsilon$

## 复杂表达式

$$
f(x) = \sum_{n=0}^{\infty} \frac{x^n}{n!}
$$

## 括号和分隔符

行内大括号：$\{ x \}$  
自动调整大小：$\left( \frac{a}{b} \right)$  
绝对值：$|x|$  
范数：$\|x\|$

## 箭头和关系符号

$\rightarrow$, $\Leftarrow$, $\leftrightarrow$, $\mapsto$, $\implies$, $\iff$  
$\leq$, $\geq`, $\neq`, $\approx`, $\equiv`, $\propto`

## 上下标和极限

$x_i$, $x^2$, $x_{i,j}$, $x^{n+1}$  
$\lim_{x \to 0} \frac{\sin x}{x}$  
$\sum_{i=1}^n i$  
$\prod_{k=1}^n k$  
$\int_0^1 x^2 dx$

## 文字格式

$\text{Hello, LaTeX!}$  
$\mathrm{ABC}$, $\mathit{ABC}$, $\mathbf{ABC}$, $\mathbb{R}$, $\mathcal{F}$

## 空格和对齐

$a\ b\quad c\qquad d$  
$a\,b\:c\;d$

## 特殊符号

$\infty$, $\partial$, $\nabla$, $\forall$, $\exists$, $\neg$, $\emptyset$, $\varnothing$, $\triangle$, $\Box$, $\cdots$, $\ldots$

## 重音和装饰

$\hat{x}$, $\bar{y}$, $\vec{v}$, $\dot{x}$, $\ddot{x}$, $\tilde{z}$

## 复杂环境

$$
\begin{cases}
x^2 & x > 0 \\
-x^2 & x \leq 0
\end{cases}
$$

$$
\begin{array}{cc}
a & b \\
c & d
\end{array}
$$

## 嵌套公式

$$
\sum_{i=1}^{n} \left( \int_{0}^{1} x^i dx \right)
$$

## 逻辑和集合

$\land$, $\lor$, $\cup$, $\cap$, $\subset$, $\supset$, $\subseteq$, $\supseteq$, $\in$, $\notin$

## 颜色（如支持）

$\color{red}{红色}$, $\color{blue}{蓝色}$

## 公式编号（如支持）

$$
a^2 + b^2 = c^2 \tag{毕达哥拉斯}
$$

## 错误和边界测试

未闭合括号：$\left( x^2 + y^2 $  
非法命令：$\notacommand{x}$

## 化学式测试（mhchem）

水的分子式：$\ce{H2O}$  
二氧化碳：$\ce{CO2}$  
硫酸：$\ce{H2SO4}$  
乙醇：$\ce{C2H5OH}$  
氯化钠：$\ce{NaCl}$

## 化学反应方程式（mhchem）

$$
\ce{2H2 + O2 -> 2H2O}
$$

$$
\ce{CH4 + 2O2 -> CO2 + 2H2O}
$$

## 化学键和离子（mhchem）

$\ce{Na+}$, $\ce{Cl-}$, $\ce{SO4^{2-}}$  
$\ce{Cu^{2+}}$, $\ce{Fe^{3+}}$

## 结构式（mhchem）

$\ce{CH3CH2OH}$  
$\ce{CH3COOH}$
