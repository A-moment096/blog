---
categories:
- Mathematics
tags:
- Calculus of Variations
- Note
title: "关于泛函导数和变分法-来自相场公式推导的问题"
description: 相场演化方程究竟应该怎么推，才离正确不远
image: HelloWorld-r-906.jpg
date: 2025-01-04
math: true
draft: false
---

*本文系拾人牙慧之作，仅为解决公式推导过程中的一些边角料的数学问题，内容如有错漏还请谅解。另外，感谢老大中先生的《变分法基础》第三版。本文的主要内容几乎全部参考本书。*

*头图出自 [雨野](https://x.com/amn_amn_/status/1580863274081349632) 太太，为 [r-906](https://twitter.com/arukuremu) 所作的 [Hello World!](https://www.bilibili.com/video/BV1Ee4y1E7J6/) 的曲绘*

{{< music auto="https://music.163.com/#/song?id=2076684514" loop="none">}}


2025.06.06 更新：感谢[@which-is-my-way](https://github.com/which-is-my-way)指正，公式 [16](#modify) 补上点乘单位法向量


## 晶体相场公式带来的问题

在一个阳光明媚的晚上，师兄找到我问了一个问题：下面的这个相场公式是怎么组装起来的？具体来讲是：从下面的公式（2）和公式（3）是怎么得到公式（4）的：
$$
\begin{align}
F &= \int_V f \mathrm{d}v\\ &= \int_V \left(\frac{\psi}{2} \omega \left(\nabla ^2\right)\psi + \frac{\psi^4}{4}\right) \mathrm{d}v;\\
\frac{\partial \psi}{\partial t} &= \nabla^2 \frac{\delta F}{\delta \psi} + \xi;\\
\frac{\partial \psi}{\partial t} &= \nabla^2 \left( \omega\left( \nabla^2 \right) \psi + \psi^3 \right)+ \xi.
\end{align}
$$
这里我们做一些简单的背景介绍吧。这个公式来源于[这篇文章](https://doi.org/10.1103/PhysRevE.70.051605)，是提出晶体相场理论的文章，其重要性不言而喻，近乎所有的该领域的文章在使用这篇文章的结果时都需要引用这些个公式。我们这里不对晶体相场做太多介绍了（因为我也不了解，虽然也有相场两个字，但是几乎只有最最基础的假设相似而已了），简单介绍一下这些公式（名称）这些方便后面表述。其中公式（1）是指体系总能量可以表达为能量密度对体积的积分（这里先不给出能量和能量密度的参量），这里可以看到总能量实际上是一个泛函；（2）是指能量密度的具体构造，（3）是和传统相场形式相类似的一个演化方程，在传统相场里是 *Cahn-Hilliard* 方程。而（4）就是将（3）中的变分展开得到的结果，或者说是具体计算过程中使用的公式的显式表达。

另外我必须提到的一点是，这里列出的公式并不完整，比如 $\omega$ 是什么我并没有做说明，这是为了复述一下我的心路历程（即便是笔记，也不希望太死板，毕竟是从实际问题来的）。当然，后面会把完整的问题复述，以及推导过程完整地列出来的。

## 传统相场公式，对吗？

拿到这个公式的时候其实并不是直接从文献拿到的，而是几张图片（大概就是公式（2）（3）和（4））。而我看到公式的第一反应是：这符号不是很对吧？把 $\psi$ 放到括号外面？这不太对吧？然后我便开始按照以往推导传统相场能量变分的方式推导了。我们来看看传统相场公式吧。
$$
\begin{align}
    F(c, \nabla c ) &= \int_{\Omega} f(c, \nabla c )\, \mathrm{d}\omega = \int_{\Omega} f_b(c, \eta) + \kappa_c \left| \nabla c \right|^2 \mathrm{d}\omega;\\
    \frac{\partial c_i}{\partial t} &= \nabla \cdot M_{ij} \nabla \frac{\delta F}{\delta c_j \left( r,t \right)},
\end{align}
$$
其中，公式（6）即为 Cahn-Hilliard 方程，而公式（5）则是传统相场中的总能构造的一种常见（最基础的）形式，其中 $f$ 是能量密度，$f_b$ 是体自由能密度。可以看到能量泛函是依赖于（?）浓度和浓度的梯度的。对这个公式的推导我们直接使用三维条件下的 Euler-Lagrange 方程：
$$
\begin{align}
\frac{\delta F\left[ x,y,y' \right]}{\delta x} = \frac{\partial f}{\partial x} - \nabla \cdot \frac{\partial f}{\partial \nabla x}.
\end{align}
$$
这样一来，这个公式就可以被展开了，只需要按照能量泛函的具体表达形式带入，然后求一下偏导，很快就会得到结果。

说实话，这是在太棒了，只需要用很多现成（?）的内容，做一些非常简单（?）的推导，就（?）可以得到最后体系的演化方程具体表达形式。那心动不如行动，直接把这一套挪到上面的原始问题吧。很好，我们先对 $\psi$ 求偏导，得到（?）下面的东西：
$$
\frac{\partial f}{\partial \psi}  = \frac{1}{2}\omega\left( \nabla^2 \right)\psi + \psi^3,
$$
然后，我们要对 $\nabla \psi$ 求偏导了。嗯，$\nabla \psi$ …… 但是这里是 $\nabla^2$ ？话说回来为什么要用 $\omega$ 带括号把 Laplacian 算子包起来呀？啊？

这对吗？这不对吧？

## 重新审视问题，\$\omega\$ 是什么？

问题看来根本不是我想得那么简单。还是需要从零开始一步步建立起这个问题的合理描述，并找到真正的解决方法。首先要解决的，就是 $\omega(\nabla^2)$ 这个奇怪的写法。假如这个写法是对的，那 $\omega$ 就不是什么参数之类的东西了，就应该是算符的一个函数或者别的什么东西了。

找到原始文献，查看定义，我们得到了 $\omega$ 的真面目：
$$
\begin{align}
\omega (\nabla^2) = r + \left(1 + \nabla ^2\right)^2,
\end{align}
$$
其中的 $r$ 是一个复杂的常数，不用关心。果不其然。$\omega$ 应该解释为一个对 $\nabla^2$ 算子做一种变换得到的新的算子。或者说，它是把算子映射到算子的一个映射。太棒了，我们把这个结果带入公式（1）中的 $f$ 吧：
$$
\begin{align*}
f &=  \frac{\psi}{2} \omega \left(\nabla ^2\right)\psi + \frac{\psi^4}{4}\\
&=  \frac{\psi}{2} \left(r + \left(1 + \nabla ^2\right)^2 \right)\psi + \frac{\psi^4}{4}.
\end{align*}
$$
等一下，算子中的平方应该怎么解释？常数作用于一个变量应该怎么解释？根据算符的运算规则，我们得知：算符的平方，应该解释为算符作用于被作用量两次，而常数作用应解释为标量乘法。那么我们得到：
$$
\begin{align*}
f &=  \frac{\psi}{2} \left(r\psi + \left(1 + \nabla ^2\right)^2\psi \right) + \frac{\psi^4}{4}\\
&= r\frac{\psi^2}{2} + \frac{\psi^2}{2} + \psi \nabla^2\psi + \frac{1}{2}\psi\nabla^2\nabla^2\psi + \frac{\psi^4}{4}.
\end{align*}
$$
啊，看起来头好晕，怎么 Laplacian 也有个平方？我们更换符号：$\Delta = \nabla^2$，就有了：
$$
\begin{align}
f &= r\frac{\psi^2}{2} + \frac{\psi^2}{2} + \psi \Delta\psi + \frac{1}{2}\psi\Delta\Delta\psi + \frac{\psi^4}{4}.
\end{align}
$$
好了，这下我们搞清楚了 $\omega$ 到底是什么以及它对公式有何影响，现在我们对 $\psi$ 求的偏导应该就没问题了吧？

等等，什么是 $\Delta\Delta\psi$ ？对 $\psi$ 求偏导的话要管它吗？就算不管这个东西，这个公式里没有熟悉的 $\nabla\psi$ 呀，那我们的能量密度对 $\nabla\psi$ 求偏导等于 0 ？这不太对吧？话说回来我们的总能量泛函到底依赖于什么变量？再等一下，依赖？对于一个泛函而言，我们只需要找到最符合要求的一个函数就好了呀？这个函数自然就可以通过对坐标求导得到自己的偏导数了，那偏导数就不应该是一个独立变量才对吧，我们对它做偏导数到底是为什么？

完了，本来以为什么都知道，现在什么都不知道了。变分法，Euler-Lagrange 方程，这些都不应该是现成的吗？Laplacian，奇怪的 $\Delta\Delta\psi$，这些都不是能直接套到已有公式里的吧？

## 死胡同？从头开始吧！

其实 $\Delta\Delta\psi$ 或多或少能想到是怎么个形式，无非就是把 $\Delta$ 作用两次就行了，关键在于这个变量，以及 $\Delta \psi$ 怎么参与到这个泛函构造中的，并且它们应该怎么参与到泛函导数里面。而为了搞清楚这个问题，我们也许必须明白这个泛函的“自变量”都有哪些，或者说，依赖于哪些变量，并且要搞清楚变量函数本身和它对位置的求导之间到底是有着什么样的关系。

问题很多，我们干脆从头开始，一步步拆解吧，就从*泛函是什么*这个问题开始。

### 泛函

我们讨论的泛函其实是一类特殊的映射，这个映射拥有定义域和陪域，其定义域为在某个空间上定义的全体函数组成的空间（比如，$\mathbb{R} \supseteq \Omega\to\mathbb{R}$ 的函数组成的空间，或者 $\mathbb{R}^3 \supseteq \Omega\to\mathbb{R}$ 的函数空间，根据我们的问题是几维的来确定这些函数的定义域），而泛函的陪域则是一个数域，对于能量而言我们就选择 $\mathbb{R}$ 好了。所以这个映射，从形式上来写，应该就是：

$$
F:\left\{ y \;\Big|\; y: \Omega \to \mathbb{R} \right\} \to \mathbb{R}.
$$

另外我们的泛函的另一个特殊之处在于，它常常可以写成这样一个积分的形式：

$$
F = \int_\Omega f\, \mathrm{d}\omega.
$$

我们常遇到的变分问题，也就是说在求什么样的函数 $\phi \in \left\{ y \\;\Big|\\; y: \Omega \to \mathbb{R} \right\}$ 能够使得将之带入泛函 $F$ 时能让这个泛函取到最小值[^1]。甚至我们遇到的问题更加得特殊，因为我们要求函数族 $\left\{ y \\;\Big|\\; y: \Omega \to \mathbb{R} \right\}$ 满足这样的条件：在区域边界 $\partial \Omega$ 上这些函数族内的函数都必须相等，或者换句话说，就是我们的问题是固定边界问题。

太棒了，但是上面这些叙述，对我们的问题有什么帮助呢？我们把目光聚焦到泛函积分形式中的这个 $f$ 上。它没这里有具体的表达式，只是说明了要对它做积分。它具有什么样的意义呢？

### 被积函数（泛函的核）

我们这里指出：这个被积分的东西 $f$ 实际上是对泛函的要求。在部分文献中 $f$ 也称为泛函的核。$f$ 的具体表达形式，将会对最后得到的 $y$ 做出约束，使之满足泛函 $F$ 取到最小值的结果。那么，一个对 $y$ 的约束，要怎么表达它呢？或者说我们应该对 $y$ 做一些什么，来使之成为 $y$ 的约束呢？

为了用 $f$ 来约束 $y$，我们考虑使用 $f$ 来描述 $y$ 的行为。$y$ 在什么情况下，会得到什么样子的结果，大概就是这样的方式去描述。而我们常常在描述 $y$ 的行为时，会考虑到它的导数的行为，将导数 $y'$ 和 $y$ 二者相互作用时得到的结果结合起来。最后考虑到我们描述 $y$ 时很难避免加入函数自变量 $x \in \Omega$，最后我们得到的 $f$ 就会变成这样的东西：它看起来像是一个关于 $x\in \Omega$，$y : \Omega \to \mathbb{R}$ 以及 $y' : \Omega \to \mathbb{R}^n$ 三个变量的函数（其中 $n$ 的取值取决于考虑的函数的定义域维数）。当存在更多高阶导数参与描述 $y$ 的行为时，这个函数 $f$ 所依赖的变量就更多了。在这个函数中，我们不考虑 $y$ 是和 $y'$ 或者更高阶的导数相关的，因为它们都独立地描述函数 $y$ 的行为。可以这样理解：$y'$ 对函数 $y$ 的约束作用是没法直接用 $y$ 自己或者 $x$ 自己单独去描述的，所以它的影响就应该是独立于 $y$ 和 $x$ 的。 这样一来，令 $f$ 对 $y$，$y'$ 等求偏导也是可以理解的了。另外，我们只关注对 $y$ 起实际约束作用的量，假如 $f$ 中不含有 $y'$，我们认为 $f$ 是不显含 $y'$ 的，此时并不是说 $y'$ 不存在了，而是它不参与到对 $y$ 的行为约束中。

当我们想要求取得到的函数的定义域从一维上升到我们更常遇到的三维时，函数 $y$ 所依赖的变量也就更加复杂了，可能包括 $\nabla y$，$\nabla \cdot y$，$\nabla \cdot \nabla y$ 等等。和上面类似，我们依旧将这些处理为独立存在于 $f$ 中的变量。有了上面这些的铺垫，我们至少能让我们的问题变得更加清楚一些：问题中的能量形式，将其变量依赖状态完整地写出，应该是以下的形式（这里我们按照惯例将*双调和算子* $\Delta\Delta$ 写成 $\Delta^2$ 的形式，它也可以写作 $\nabla^4$）：

$$
\begin{align}
F\left[\psi\right] &= \int_V f \left(\psi,\Delta\psi,\Delta\Delta\psi\right) \mathrm{d}v\\ &= \int_V r\frac{\psi^2}{2} + \frac{\psi^2}{2} + \psi \Delta\psi + \frac{1}{2}\psi\Delta\Delta\psi + \frac{\psi^4}{4} \mathrm{d}v.
\end{align}
$$

### 再考察 Euler-Lagrange 方程

然而上面的一切似乎只是澄清了一些基本事实，并没有对解决这个问题起到非常实质的帮助呀。别灰心，至少我们知道了：上面的 Euler-Lagrange 方程，应该是只适用于 $f(x,y,\nabla y)$的，而对于新的 $f$，我们需要自己想办法得到这样的方程。因此，我们必须深入到变分法的根本，去了解变分法到底是怎么推导出了上面我们用到的 Euler-Lagrange 方程的。为此，我们采用我们一开始认为非常轻易地获得的 Euler-Lagrange 方程所对应的泛函形式来作为例子，自己推导一下它对应的 Euler-Lagrange 方程。

回忆我们面对的变分法的一般问题：在什么样子的函数 $y$ 下，我们构造出的泛函能够取最小值。我们的函数 $y$ 的定义域是固定的，所以我们要关心的是这个符合要求的函数在每一个点处的值应该是什么样的。不妨假设我们已经有了一个最佳的函数满足要求了，称这个函数为 $\varphi$。此时，由于这个函数已经是最好的，最满足需求的函数了，任何对这个函数某个值的改变，都会让我们的泛函不能取最小值。

我们来试着把这个结论写成更形式化一些的表达：假设函数 $\varphi : \Omega \to \mathbb{R}$ 是满足泛函 $F$ 的最小值需要的函数，则此时任意函数 $y \neq \varphi$ 都会造成这样的结果：$F[y] - F[\varphi] = \delta F > 0$ ，这里的 $\delta F$ 就是泛函 $F$ 的*变分*。这里大于 0 是因为我们已经知道了 $F[\varphi]$ 是最小值。反过来讲，当 $\delta F = 0$ 的时候，就能说明此时的函数 $y$ 就是我们需要的函数 $\varphi$。 

这个表达是否让你感到一丝熟悉？我们先继续向下推进。

可以看到，假如我们把这个不等式用我们之前熟悉的泛函的积分形式展开，并根据积分的线性性合并，得到的结果是：

$$
\delta F = \int_\Omega f(x,y, \nabla y) - f(x,\varphi,\nabla\varphi) \mathrm{d} \,\omega = \int_\Omega \delta f\, \mathrm{d}\omega.
$$

上面的第二个等号是我们把被积函数的差记为了这样对函数的全变分。这个积分不等式的被积分项里，变量 $x$ 没有什么变化，那我们干脆将 $f$ 在现在看作一个二元函数。我们把 $\varphi$ 改写为以 $y$ 为基础加上一个扰动的形式：$\varphi = y+\delta y$，那么我们可以模仿全微分那样，把这里对函数的全变分 $\delta f$ 做全微分式的处理，就可以根据它的两个变量的偏导来写出其全变分的表达式。带入上式，则有：

$$
\delta F = \int_\Omega \delta f\, \mathrm{d}\omega = \int_\Omega \left(\frac{\partial f}{\partial y}\delta y + \frac{\partial f}{\partial \nabla y}\cdot\delta\nabla y \right) \, \mathrm{d}\omega.
$$

这个形式已经是我们很熟悉的形式了，但是还有一些区别。这里我们指出，函数对向量求偏导得到的也是一个向量，所以这里需要用向量内积，其中的技术细节我们不多赘述，我们更关注的是：怎么把 $\delta \nabla y$ 写成别的形式，来进一步向我们的结果前进。注意到 $\nabla$ 是对坐标求导，而 $\delta$ 则是在保持定义域不发生改变的情况下，改变了函数的值。因此二者应该是相互独立的，也意味着两个算符是可以相交换的。再使用点乘的乘积律：$\nabla \cdot (f{\bf{}v}) = f\nabla\cdot{\bf v}+{\bf v}\cdot\nabla f$，这样一通操作，就得到：

$$
\begin{align}
 \delta F = \int_\Omega \delta f\, \mathrm{d}\omega &= \int_\Omega \left(\frac{\partial f}{\partial y}\delta y + \frac{\partial f}{\partial \nabla y}\cdot\nabla\delta y \right) \, \mathrm{d}\omega \\
&= \int_\Omega \left(\frac{\partial f}{\partial y}\delta y  - \nabla \cdot \frac{\partial f}{\partial \nabla y}\delta y \right) \, \mathrm{d}\omega + \int_\Omega \nabla\cdot\left(\frac{\partial f}{\partial \nabla y}\delta y\right) \, \mathrm{d}\omega\\
&= \int_\Omega \left(\frac{\partial f}{\partial y}  - \nabla \cdot \frac{\partial f}{\partial \nabla y} \right)\delta y \, \mathrm{d}\omega + \int_\Omega \nabla\cdot\left(\frac{\partial f}{\partial \nabla y}\delta y\right) \, \mathrm{d}\omega  .
\end{align}
$$

而在式（13）中，最后的积分可以根据多元积分的 Green 公式，化成对区域 $\Omega$ 的边界 $\partial \Omega$ 积分。而此时，由于在边界上所有的函数的值都要相等，此时 $\delta y = 0$，这样最后一项积分就化为0了。我们写为下面的结果：

<span id="modify"></span>
$$
\begin{align}
\delta F &= \int_\Omega \left(\frac{\partial f}{\partial y}  - \nabla \cdot \frac{\partial f}{\partial \nabla y} \right)\delta y \, \mathrm{d}\omega + \int_\Omega \nabla\cdot\left(\frac{\partial f}{\partial \nabla y}\delta y\right) \, \mathrm{d}\omega\\
&=\int_\Omega \left(\frac{\partial f}{\partial y}  - \nabla \cdot \frac{\partial f}{\partial \nabla y} \right)\delta y \, \mathrm{d}\omega + \int_{\partial\Omega} \left(\frac{\partial f}{\partial \nabla y}\delta y\right)\cdot\hat{n} \, \mathrm{d}A\\
&=\int_\Omega \left(\frac{\partial f}{\partial y}  - \nabla \cdot \frac{\partial f}{\partial \nabla y} \right)\delta y \, \mathrm{d}\omega.
\end{align}
$$

这样，我们就距离我们希望得到的形式，Euler-Lagrange 公式只差一步了。注意到这里使用的 $\delta y$ 是任意的，假如 $\delta F = 0$，从积分里的内容来看，只能是括号内的部分等于 0。

我们可以看到，上面的过程，可以分为大致四个部分：得到全变分形式，将非目标变分以变分和微分的交换律改写为目标函数变分，消去多余项，由变分任意性得到被积函数内部等于 0。我们因此，可以根据我们已经熟悉的函数导数的概念，将公式（18）中的被积函数括号内这个关键部分定义为泛函的导数，即：
$$
\frac{\delta F}{\delta y} = \frac{\partial f}{\partial y}  - \nabla \cdot \frac{\partial f}{\partial \nabla y},
$$
当其为 0 时，
$$
\frac{\delta F}{\delta y} = \frac{\partial f}{\partial y}  - \nabla \cdot \frac{\partial f}{\partial \nabla y} = 0,
$$
泛函即取到极值（在我们的情境下即为最小值）。这就是所谓的 Euler-Lagrange 方程。

### 最后一步

现在，我们对泛函的概念做了一些解释，并从头建立起了我们之前使用的 Euler-Lagrange 公式。这里我希望做一些补充说明。可以看到这里的泛函导数并不是直接的“某些东西的商然后做极限”，而是将某个对我们有用的部分定义为了泛函导数。对这个概念最佳的解释，就是它等于 0 时代表泛函的极值，通过解这个方程就能得到令泛函取得极值的极限函数。它不应被解释为变化率或者什么别的内容。

另外，我们上面用到了“二元函数全微分”这样的类比。平心而论，我自己并不是特别能接受这种说法。另一个可行的解释是，将函数 $y$ 化为 $y = \varphi + \varepsilon\eta$，也就是说我们使用了一个任意函数 $\eta : \Omega \to \mathbb{R}$，让它乘上一个极小的量 $\varepsilon$，这样就相当于用 $\varepsilon\eta$ 形成了一个函数的扰动，即 $\delta y$。我们要求 $\eta$ 是一个任意的函数，而在任何计算过程中都保持 $\eta$ 不变。此时整个式子将会成为只关于 $\varepsilon$ 的一元函数了。对于一个一元函数，其极值点就会出现在导数等于 0 的位置。那么此时对 $\varepsilon$ 求偏导，也能得到和上面类似的结论，并且通过格林公式化简得到最后的结论。当然，这也只是另一种思路，仅供参考。

最后要提出的是，上面的推导过程是和 $f$ 的表达式强相关的，尤其是其依赖的变量。然而当我们再考察其和变量之间的关系时，可以发现每个变量实际上对应到最后的 Euler-Lagrange 公式中都是相对独立的。比如，$x$ 这个部分没有在公式中出现，$y$ 的部分对应对 $y$ 求偏导，而 $\nabla y$ 的部分则对应着对 $\nabla y$ 求偏导后再对结果做散度。这个结果是可以预想到的：由于全微分公式，或者换成泛函的语境，全变分公式，的性质，是会出现这样的结果。那么我们也自然可以预想到，假如 $f$ 依赖的变量是别的变量，也应该有类似的结论才对。

到这里，我们近乎完全搞通了我们最后想要解决问题的路径。我们已经得到了泛函具体的表达式，搞清楚了泛函的核（即那个被积函数 $f$）的参数表，得到了对泛函做变分法的具体思路。我们的下一步，或者最后一步，便是真的带进去算了。

## 计算！

为了读者的精神健康，我们隐藏当 $f$ 依赖情况为 $f(p,\psi,\Delta \psi,\Delta\Delta \psi)$ （其中 $p \in V$ 代表位置）时的 Euler-Lagrange 公式的推导，直接给出结果：

$$
\begin{equation}
\frac{\delta F}{\delta \psi} = \frac{\partial f}{\partial \psi} + \Delta \left(\frac{\partial f}{\partial \Delta \psi}\right)+ \Delta\Delta \left(\frac{\partial f}{\partial \Delta\Delta \psi}\right)
\end{equation}
$$

<details>
<summary>如果你愿意看推导过程的话：</summary>

不，你其实不想看，你只是好奇我到底有没有真的写这些推导过程。事实是：写了，下面就是。

但是如果你真的想看这个部分，谢谢你，我的努力没有白费。

我们先根据全变分，写出泛函的核函数变分后的结果：

$$
\begin{align*}
        \delta F & = \delta \int_V f(p,\psi,\Delta\psi,\Delta\Delta\psi) \,\mathrm{d}v                   \\
                 & = \delta \int_V f(p,\psi,\Delta\psi,\Delta\Delta\psi) \,\mathrm{d}v                   \\
                 & =  \int_V \delta f(p,\psi,\Delta\psi,\Delta\Delta\psi) \,\mathrm{d}v                  \\
                 & =\int_V \left(\frac{\partial f}{\partial \psi}\right)\delta \psi
        + \left(\frac{\partial f}{\partial \Delta\psi}\right)\delta \Delta\psi
        + \left(\frac{\partial f}{\partial \Delta\Delta\psi}\right)\delta \Delta\Delta\psi \,\mathrm{d}v. \\
\end{align*}
$$

接下来我们分别考察被积分的每一项。其中第一项的对 $\psi$ 的变分 $\delta\psi$ 已经符合我们的要求了，第二项中的 $\delta \Delta \psi$ 和第三项中的 $\delta \Delta\Delta\psi$ 则需要我们处理为某个函数乘以 $\delta\psi$ 的形式，以便于最后的逻辑处理。

根据变分与求导和交换的关系，我们有：

$$
    \left(\frac{\partial f}{\partial \Delta\psi}\right)\delta \Delta\psi = \left(\frac{\partial f}{\partial \Delta\psi}\right)\Delta \delta \psi = f_1 \Delta\delta\psi;\\
    \left(\frac{\partial f}{\partial \Delta\Delta\psi}\right)\delta \Delta\Delta\psi = \left(\frac{\partial f}{\partial \Delta\Delta\psi}\right) \Delta\Delta\delta\psi = f_2\Delta\Delta\delta\psi,
$$

其中每行公式的第二个等号都是为了护眼做的处理，即将括号中的偏微分用记号表示。我们先看上面第一个式子，这是两个标量函数的乘积，其第二个因式展开应为:

$$
\Delta \delta \psi = \nabla \cdot \nabla \delta\psi,
$$

注意到散度存在恒等式：$\nabla \cdot (f\mathbf{v}) = f\nabla\cdot\mathbf{v} + \nabla f \cdot \mathbf{v}$，其中 $f$ 为标量函数或标量场， $v$ 为向量值函数或向量场，我们可以对上面的结果变换得到：

$$
\begin{align*}
f_1\nabla \cdot \nabla \delta\psi &= \nabla\cdot(f_1\nabla\delta\psi) - \nabla f_1\cdot \nabla\delta\psi \\
&= \nabla\cdot(f_1\nabla\delta\psi) - \nabla\cdot(\delta\psi\nabla f_1) + \delta \psi \nabla\cdot\nabla f_1.
\end{align*}
$$

上式对一个三维区域 $\Omega$ 的积分，根据散度定理，有：

$$
\begin{align*}
\int_V f_1 \nabla\cdot\nabla\delta\psi \,\mathrm{d}v &= \int_V \nabla\cdot(f_1\nabla\delta\psi)\,\mathrm{d}v -\int_V \nabla\cdot(\delta\psi\nabla f_1) \,\mathrm{d}v+\int_V \delta \psi \nabla\cdot\nabla f_1 \,\mathrm{d}v \\
&=\int_{\partial V} f_1\nabla\delta\psi\cdot\hat{n}\,\mathrm{d}s - \int_{\partial V} \delta\psi\nabla f_1\cdot\hat{n} \,\mathrm{d}s + \int_{V} \delta \psi \nabla\cdot\nabla f_1 \,\mathrm{d}v\\
&=\int_{V} \delta \psi \nabla\cdot\nabla f_1 \,\mathrm{d}v.
\end{align*}
$$

上式第二个等号使用了散度定理，第三个等号则是考虑到在边界处 $\delta\psi = 0$，$\nabla\delta\psi = \mathbf{0}$。这样我们就得到了原变分中被积函数第二项的表达形式。我们现在考虑其中的第三项，即 $f_2\Delta\Delta\delta\psi$。我们先将其中的 $\Delta\delta\psi$ 看作函数标量函数 $\varphi$，则原式写为 $f_2\Delta\varphi$。此时，套用我们上面已经得到的结果，有：

$$
\begin{align*}
 \int_V f_2 \Delta\Delta\delta\psi \,\mathrm{d}v &= \int_V f_2 \Delta\varphi \,\mathrm{d}v\\ 
 &= \int_{\partial V} f_2\nabla\varphi\cdot\hat{n}\,\mathrm{d}s -\int_{\partial V} \varphi\nabla f_2\cdot\hat{n} \,\mathrm{d}s+\int_V \varphi \nabla\cdot\nabla f_2 \,\mathrm{d}v \\
 &= \int_V \varphi \nabla\cdot\nabla f_2 \,\mathrm{d}v = \int_V \varphi \Delta f_2 \,\mathrm{d}v \\
 &= \int_V \Delta\delta\psi \Delta f_2 \,\mathrm{d}v = \int_V \nabla\cdot\nabla\delta\psi\, \Delta f_2 \,\mathrm{d}v\\
 &= \int_{\partial V} \Delta f_2\nabla\delta\psi \cdot\hat{n}\,\mathrm{d}s -\int_{\partial V} \delta\psi\,\nabla (\Delta f_2)\cdot\hat{n} \,\mathrm{d}s+\int_V \delta\psi \Delta \Delta f_2 \,\mathrm{d}v \\
 &= \int_V \delta\psi \Delta \Delta f_2 \,\mathrm{d}v,
\end{align*}
$$

其中所有的操作与前面是一样的，不断用恒等式拆开，然后由于在边界上的包含 $\delta\psi$ 的项全部归零，所有对 $V$ 的边界 $\partial V$ 的积分都会变成 0，最后就得到了我们想要的结果。我们把这些积分再合起来，将为了方便所做的记号带回，就有：

$$
\begin{align*}
\delta F & = \int_V \left(\frac{\partial f}{\partial \psi}\right)\delta \psi
        + \left(\frac{\partial f}{\partial \Delta\psi}\right)\delta \Delta\psi
        + \left(\frac{\partial f}{\partial \Delta\Delta\psi}\right)\delta \Delta\Delta\psi \,\mathrm{d}v \\
        &= \int_V \left(\frac{\partial f}{\partial \psi}\right)\delta \psi
        + \Delta\left(\frac{\partial f}{\partial \Delta\psi}\right)\delta \psi
        + \Delta\Delta\left(\frac{\partial f}{\partial \Delta\Delta\psi}\right)\delta \psi \,\mathrm{d}v \\
        &= \int_V \left(\left(\frac{\partial f}{\partial \psi}\right)
        + \Delta\left(\frac{\partial f}{\partial \Delta\psi}\right)
        + \Delta\Delta\left(\frac{\partial f}{\partial \Delta\Delta\psi}\right)\right)\delta \psi \,\mathrm{d}v. 
\end{align*}
$$

那么，由泛函导数的定义，我们就得到了 Euler-Lagrange 方程：
$$
\frac{\delta F}{\delta \psi} = \frac{\partial f}{\partial \psi} + \Delta \left(\frac{\partial f}{\partial \Delta \psi}\right)+ \Delta\Delta \left(\frac{\partial f}{\partial \Delta\Delta \psi}\right).
$$

</details>

现在,我们来把式子带进去吧。为了方便，我们先把公式待带入的公式写在下面：

$$
\begin{align}
F[\psi] &= \int_V f(p,\psi,\Delta\psi,\Delta\Delta\psi) \mathrm{d}v\\ 
&= \int_V \left(\frac{\psi}{2} \omega \left(\nabla ^2\right)\psi + \frac{\psi^4}{4}\right) \mathrm{d}v;\\
\omega (\nabla^2) &= r + \left(1 + \nabla ^2\right)^2;\\
\frac{\partial \psi}{\partial t} &= \nabla^2 \frac{\delta F}{\delta \psi} + \xi.\\
\end{align}
$$

我们的目的也就是将公式（21）先带入公式（20）得到能量的具体表达形式，然后将得到的结果带入公式（18）来计算能量变分，最后得到公式（22）的显式表达。其中第一步已经完成了，能量密度的具体表达形式为：

$$
\begin{equation}
f = r\frac{\psi^2}{2} + \frac{\psi^2}{2} + \psi \Delta\psi + \frac{1}{2}\psi\Delta\Delta\psi + \frac{\psi^4}{4}.
\end{equation}
$$

我们先对公式（23）计算需要的这些偏导数，得到：

$$
\begin{align}
    \frac{\partial f}{\partial \psi} &= r\psi + \psi + \Delta\psi + \frac{1}{2}\Delta\Delta\psi+\psi^3;\\
    \frac{\partial f}{\partial \Delta \psi} &= \psi;\\
    \frac{\partial f}{\partial \Delta\Delta \psi} &=\frac{1}{2}\psi.
\end{align}
$$

现在把这些得到的结果，即公式（24-26）带入到我们得到的 Euler-Lagrange 方程（18）中。注意在前面加上对应的 Laplace 算子或者双调和算子。得到的结果为：

$$
\begin{align}
\frac{\delta F}{\delta \psi} &= r\psi + \psi + \Delta\psi + \frac{1}{2}\Delta\Delta\psi+\psi^3 + \Delta\psi+\frac{1}{2}\Delta\Delta\psi \\
&=r\psi + \psi + 2\Delta\psi + \Delta\Delta\psi+\psi^3\\
&=\left(r + \left(1 + 2\Delta + \Delta\Delta\right)\right)\psi+\psi^3\\
&=\omega(\Delta)\psi + \psi^3.\\
\end{align}
$$

那么最后，把式（30）带回到式（22）中。此时我们尊重原文，把符号统一，将 $\Delta$ 重写回 $\nabla^2$，就有：

$$
\begin{equation}
\frac{\partial \psi}{\partial t} = \nabla^2 \left(\omega(\nabla^2)\psi + \psi^3\right) + \xi.
\end{equation}
$$

这就是我们一开始的目标，式（4）。

## 后记

其实这个问题一开始就很清楚：只要找到正确的 Euler-Lagrange 公式，带入无脑计算就行了。但是如何找到正确的 Euler-Lagrange 公式则是一个比较棘手的问题。本文的思路启发自老大中先生的《变分法基础》，翻开书，几乎所有的笔墨全都放在了如何去根据泛函的形式来推导出对应的 Euler-Lagrange 方程上。所幸，我们的这个方程形式非常简单，且答案几乎是现成的，只需要找到正确的位置后取用即可。

那么这篇文章前面的部分有什么用呢？像跳梁小丑一样跳来跳去，最后发现从一开始就不对劲，转而从头开始推导整个公式。如果一开始就找到这个合适的公式，不就好了吗？也许能够找到这个合适的公式确实能立马解决眼前的问题，但是以后呢？如果遇到了一个形式又不太一样的泛函，此时应该怎么推导出其对应的 Euler-Lagrange 方程呢？而且从文章前半部分可以看到：我对变分法的理解，在推导出这个公式以前，是有问题的。我机械地认为就是带入那个人尽皆知的 Euler-Lagrange 方程，然后算算算就好了。旋即就遇到了第一个问题：怎么让 Laplacian 对梯度求导。是的，我当时并不怀疑是公式问题，而是考虑怎么让这个公式能算下去。在网上搜索一段时间之后，我貌似得到了结果，但总归不太满意，因为带入后得不到最后的公式。

一段迷茫过后，我突然对变量之间的依赖情况产生了疑惑。网上搜寻的结果表明，不能单纯地看作相互关联的变量，或者说单纯的求导关系。最后我得到了上文中的解释，也许我在这部分的解释是错误的，但我用这个方法说服了自己。希望这个观点没有问题。顺带，我得到这个解释或多或少受到了热力学的启发：热力学中的偏导数必须标明哪些变量是固定不变的，这时因为热力学参数张成了一个高维空间，而体系的热力学状态则是这个空间上的一个超平面，热力学状态函数则是这个超平面上定义的场。因此，对热力学状态函数求偏导的时候必须固定求导方向，也就是固定某些变量不变。也许是这样的理解让我将泛函的核理解为了对函数的约束（我也不知道怎么联系上去的，所以说只可谓之*启发*）。

然而即便如此，我依旧没法得到最后最关键的公式。此时只能从头开始一步步推导 Euler-Lagrange 公式了。所幸，我找到了老大中先生的这本书，读过一部分之后，遍跳着找到了我需要的答案。感谢这本书，让我少走了不知道多少弯路。

最后，感谢您能阅读到这里，看这么久的流水账也挺辛苦的。希望这篇流水账一样的文章也能帮助正在阅读的你增进对 Euler-Lagrange 公式和变分法或者泛函导数的理解。

那么，祝您生活愉快~

[^1]:请容许我这里混淆最小值和极小值，以及最值和极值，因为我们默认需要这个泛函取到的是极小的部分，且这个极小值一定是全局的，即最小值。
