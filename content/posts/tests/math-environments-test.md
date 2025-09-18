---
title: "数学环境完整展示"
description: "展示博客中所有数学环境的使用方法和 LaTeX 公式渲染效果"
date: 2025-09-18T15:00:00+08:00
categories:
- Testing
- Mathematics
tags:
- Test
- Math
- LaTeX
- Theorem
- Demo
math: true
draft: false
weight: 1
---

## 数学环境类型总览

以下是所有可用的数学环境类型：

> [!THEOREM]{A.1}
> 
> 定理环境 - 蓝色样式，带铅笔图标。

> [!LEMMA]{A.2}
> 
> 引理环境 - 绿色样式，带链接图标。

> [!DEFINITION]{A.3}
> 定义环境 - 紫色样式，带书本图标。

> [!COROLLARY]{A.4}
> 推论环境 - 红色样式，带箭头图标。

> [!PROPOSITION]{A.5}
> 命题环境 - 橙色样式，带灯泡图标。

> [!PROOF]
> 证明环境 - 灰色样式，带验证图标，末尾自动添加 QED 符号。

> [!EXAMPLE]{A.6}
> 示例环境 - 青色样式，带文档图标。

> [!REMARK]
> 注释环境 - 紫罗兰色样式，带消息气泡图标。

## 语法细节

### 写法：

在关键词后要空一行，否则无法正确渲染第一行的行内公式

在跨行公式中只能使用一个 blockquote 标签 `>`，或者直接写在一行内。推荐使用 `\[ \]` 而非 `$$ $$`。

``` md
> [!KEYWORD]
> 
> Your contents

> [!KEYWORD]{Optional Text} 
> 
> \[
    
    \]
> Your contents
```

### 可用关键字

定理： `THEOREM | THM`  
引理： `LEMMA | LEM`  
定义： `DEFINITION | DEF`  
推论： `COROLLORY | COR`  
命题： `PROPOSITION | PROP`  
证明： `PROOF`  
示例： `EXAMPLE | EX`  
注释： `REMARK | REM`  

## 基础数学环境

### 定理 (Theorem)

``` markdown
> [!THEOREM]{}
>
> The contents

> [!THM]
```
> [!THEOREM]
> 
> 每个连续函数在闭区间上都能达到最大值和最小值。
> 
> 设 $f: [a,b] \to \mathbb{R}$ 是连续函数，则存在 $c, d \in [a,b]$ 使得：
> $$f(c) = \min_{x \in [a,b]} f(x) \quad \text{和} \quad f(d) = \max_{x \in [a,b]} f(x)$$

> [!THEOREM]{1.1 中值定理}
> 
> 如果 $f$ 在 $[a,b]$ 上连续且 $k$ 在 $f(a)$ 和 $f(b)$ 之间，则存在 $c \in (a,b)$ 使得 $f(c) = k$。

> [!THEOREM]{微积分基本定理}
> 
> 设 $f$ 在 $[a,b]$ 上连续，则函数 $F(x) = \int_a^x f(t) \, dt$ 在 $(a,b)$ 上可微且 $F'(x) = f(x)$。


> [!THM]{5.1}
> 每个有限维赋范向量空间都是完备的。
### 引理 (Lemma)

``` markdown
> [!LEMMA]{}
>
> The contents

> [!LEM]
```

> [!LEMMA]
> 
> 如果 $f$ 在 $[a,b]$ 上连续且 $f(a) < 0 < f(b)$，则存在 $c \in (a,b)$ 使得 $f(c) = 0$。

> [!LEMMA]{2.3}
> 
> 在完全度量空间中，每个柯西序列都收敛。

> [!LEM]{6.2}
> 
> 如果 $\{x_n\}$ 是完全度量空间中的柯西序列，则它收敛。


### 定义 (Definition)

``` markdown
> [!DEFINITION]{}
>
> The contents

> [!DEF]
```

> [!DEFINITION]
> 
> 函数 $f: \mathbb{R} \to \mathbb{R}$ 在点 $a$ 处连续，当且仅当对任意 $\varepsilon > 0$，存在 $\delta > 0$ 使得：
> $$|x - a| < \delta \implies |f(x) - f(a)| < \varepsilon$$

> [!DEFINITION]{向量空间}
> 
> 向量空间 $V$ 是集合配备两个运算（向量加法和标量乘法），满足八个公理的代数结构。

> [!DEFINITION]{3.1}
> 
> **度量空间**: 集合 $M$ 配备函数 $d: M \times M \to \mathbb{R}$ 满足：
> 1. $d(x,y) \geq 0$ 且 $d(x,y) = 0 \iff x = y$
> 2. $d(x,y) = d(y,x)$
> 3. $d(x,z) \leq d(x,y) + d(y,z)$（三角不等式）


> [!DEF]{度量空间}
> 
> 度量空间是配备距离函数的集合，满足度量公理。

### 推论 (Corollary)

``` markdown
> [!COROLLARY]{}
>
> The contents

> [!COR]
```

> [!COR]
> 
> 闭区间上的连续函数是一致连续的。

### 命题 (Proposition)

``` markdown
> [!PROPOSITION]{}
>
> The contents

> [!PROP]
```

> [!PROPOSITION]
> 
> 设 $V$ 是内积空间，$u, v \in V$，则柯西-施瓦茨不等式成立：
> $$|\langle u, v \rangle| \leq \|u\| \|v\|$$

> [!PROP]{柯西-施瓦茨不等式}
> 
> 对内积空间中的向量 $u$ 和 $v$，有 $|\langle u,v \rangle| \leq \|u\| \|v\|$。

### 证明环境

``` markdown
> [!PROOF]{}
>
> The contents
```

> [!PROOF]
> 
> 我们用反证法证明。假设 $f$ 在某点 $c \in [a,b]$ 处不连续。则存在 $\varepsilon > 0$ 使得对任意 $\delta > 0$，都存在 $x$ 满足 $|x - c| < \delta$ 但 $|f(x) - f(c)| \geq \varepsilon$。
> 
> 这与 $f$ 在 $[a,b]$ 上的一致连续性矛盾。

### 示例环境

``` markdown
> [!EXAMPLE]{}
>
> The contents

> [!EX]
```

> [!EX]{7.1}
> 
> 考虑函数 $f(x) = x^2$ 在区间 $[-1,1]$ 上。该函数在 $x = 0$ 处取得最小值 $0$，在 $x = \pm 1$ 处取得最大值 $1$。
> 
> 验证：$f'(x) = 2x$，所以 $f'(0) = 0$ 是唯一的临界点。

### 注释环境

``` markdown
> [!REMARK]
>
> The contents

> [!REM]
```

> [!REM]
> 
> 区间必须是闭且有界的条件是必要的。函数 $f(x) = x$ 在开区间 $(0,1)$ 上不能达到其上确界。

## 复杂数学内容示例

### 微分方程

> [!THEOREM]{解的存在唯一性}
> 
> 考虑初值问题：
> 
> \[
\begin{cases}
y' = f(t, y) \\
y(t_0) = y_0
\end{cases}
\]
> 如果 $f$ 和 $\frac{\partial f}{\partial y}$ 在包含点 $(t_0, y_0)$ 的矩形区域内连续，则存在 $h > 0$ 使得在区间 $[t_0 - h, t_0 + h]$ 上初值问题有唯一解。

### 线性代数

> [!DEFINITION]{特征值和特征向量}
> 
> 设 $A$ 是 $n \times n$ 矩阵。标量 $\lambda$ 称为 $A$ 的特征值，如果存在非零向量 $\mathbf{v}$ 使得：
> $$A\mathbf{v} = \lambda\mathbf{v}$$
> 
> 此时 $\mathbf{v}$ 称为对应于特征值 $\lambda$ 的特征向量。

### 复分析

> [!THEOREM]{柯西积分公式}
> 
> 设 $f$ 在简单闭曲线 $C$ 上和内部解析，$a$ 在 $C$ 内部，则：
> $$f(a) = \frac{1}{2\pi i} \oint_C \frac{f(z)}{z-a} \, dz$$
