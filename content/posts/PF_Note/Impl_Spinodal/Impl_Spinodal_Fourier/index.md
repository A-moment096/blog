---
categories:
- Phase Field
- Programming
- Mathematics
tags:
- C
- Fourier Spectrum
- Fourier Transformation
- FFT
- Numerical Analysis
title: "相场模拟，但是用很多语言——番外"
description: 傅里叶全家桶！！
image: /posts/PF_Note/Impl_Spinodal/Alice-2.png
imageObjectPosition: center 20%
date: 2026-05-01
math: true
mermaid: true
draft: true
---

*前几篇博文中，我们都使用了有限差分法来离散网格并计算 Cahn-Hilliard 方程的结果。这样的写法确实简单有效，但是问题是就没有别的更好的方法了吗？有的，兄弟！有的！那就是今天要向各位介绍的 **傅里叶谱法**。在这个方法下，我们不需要再可怜兮兮地做网格差分了，而是从另一个神秘空间：**谱空间** 去求解。本篇就以番外的形式，聊聊这个神奇的方法，关于它的数学原理，使用事项，以及实现时需要注意的若干细节。*

*为保持系列的统一，头图我们依旧选择了上期出现的，由 [Neve_AI](https://x.com/Neve_AI) 绘制的 AI 爱丽丝。选曲则是上季度知名动画 **Fate Strange Fake** 的片尾曲 **潜在的なアイ**，由 **13.3g** 献唱，节奏明快，非常欢乐的一首歌！希望你也喜欢~*

{{< music auto="https://music.163.com/#/song?id=3345663715" loop="none">}}

## 傅里叶全家桶！

相信当您看到 **傅里叶** 三个字（**Joseph Fourier**，也译作 **傅立叶**，旧译 **福里叶**）的时候，也许就已经秒变战斗脸了吧……作为通常高等数学教学的最后一部分，也是古典分析学最引以为傲的成果之一，这位伟大的法国数学家、物理学家的名字出现在了许多地方，傅里叶级数、傅里叶变换等一系列概念与技术都深刻地影响了现如今的各个科学技术领域，也是众多科普文章或视频绝佳的素材，而它的传热方程模型也在工程上解决了许多热传导相关问题。即便已有了许多对傅里叶级数等概念的非常好的介绍，我们这里也还是简单介绍一下 “傅里叶全家桶” 的基本概况。如果您对这方面的内容感兴趣，我搜集到了一些不错的文章和视频，对这些概念有一些不同层次与程度的介绍[^1][^2][^3]。

要了解傅里叶全家桶的情况，我们得从另一个您也许熟悉的名字开始讲起：**泰勒**（**Brook Taylor**，英国数学家）。

### 从函数项级数开始：泰勒展开与泰勒级数

给定任意一个函数，我们有什么好的办法把它拆成乘积的和的形式吗？如果说一个复杂函数能够被分成许多份简单函数的组合，那会极大地方便我们研究该复杂函数，因为它的性质将会完全由这些小的简单函数的性质决定。我们能做到吗？当然可以！事实上，各位最早接触到的函数项级数应该就是大名鼎鼎的 *泰勒级数* 了。通过将函数在某一点处进行 *泰勒展开*，我们可以获得在这一点处附近函数的各阶导数，同时还能得到非常好的近似结果，用来在该点处做近似的函数还是被得到了相当透彻的研究的多项式。也许您曾经听说过，泰勒展开是古典微积分学的终极杀手锏，这一点几乎是毋庸置疑的，因为当我们需要研究函数在某一点附近的性态时，泰勒展开能够让我们解剖开这个复杂函数，并在需要的时候做对应的简化，省略掉高阶项从而低成本地表示该函数。

然而上面的一切都有一个前提，那就是仅限在函数的 *某一点* 处。这个限制其实相当大，当把目光从古典微积分学研究某一点的问题转移到研究函数在某个较大区间内的性态时，泰勒级数就没那么好用了。每次展开我们都必须且只能选择某一个点进行展开，这让我们没法同时在区间上的每个点展开并研究。从下面的例子你也许能更清晰地感受到泰勒级数展开的局限性：

{{< react component="Impl_Spinodal_Fourier/taylor_expansion" >}}

可以看到，$\sin(x)$ 的泰勒展开在展开阶数不断上升时，有不错逼近结果的区间在快速拓宽；$\mathrm{e}^{x}$ 在正半轴的逼近效果很不错，但在负半轴的逼近情况就比较困难了；$\ln(1+x)$ 的逼近效果简直是灾难级别的，即便在零点处展开到 10 阶，效果依然不太好；另外当我们从另一个位置对函数展开时（这里以 $\ln(3+x)$ 来模拟在 $x=2$ 处展开 $\ln(1+x)$ 的情景），可以看到它的收敛区间比在 $0$ 处展开的效果稍微好一些，但很快就会受到自然定义域的限制（左侧 $x\leq 3$ 处无定义）。总体上来说，泰勒展开的效果在确定范围内的函数逼近时很不如人意。那么要怎么解决这个问题呢？

### 选择正确的函数：三角函数

问题其实在于多项式。当我们选定某个点时，我们可以快速地得到一组经过该点的多项式，而无需关心其他的点，而多项式的连续性能保证经过的那个点的附近性质是不会发生剧烈变化的。而要想将函数展开出来的级数每一项都对函数整个区间上的结果做出贡献，我们得找一组在整个区间上都分布均匀，但又各不相同的函数，来代替多项式。其中最简单的一组函数自然就是 *三角函数* 了。比如下面的这一组：

{{< react component="Impl_Spinodal_Fourier/trig_functions" >}}

可以看到，$\omega$ 为整数倍的不同频率的三角函数都近乎完美地均匀分布在 $-\pi$ 到 $\pi$ 的区间中，而且不同频率的函数也都相互之间有所区别，方便我们用它们自由组合出需要的函数。但是问题是，我们要怎么求出某个给定函数的组合系数呢？在泰勒级数中，我们只需要求导就可以了，因为求导可以 *让多项式降阶*，从而得到多项式中各个项的系数。但这在三角函数里行不通呀……

### 函数内积与傅里叶级数

好消息是，三角函数有着很特殊的性质，如果两个正弦或者两个余弦函数的频率 $\omega$ 不同，那么它们相乘后再在一个周期上积分之后会得到 $0$，而当它们的频率相同的时候，积分得到的结果才不为 $0$！具体的原因我们就不证明了，这样的特点让我们自然想到可以用不同频率的三角函数和这个函数求积分，得到的结果就能够来反求出这个频率下对应的系数了。在数学上，我们将 *相乘后积分* 的概念拓展到更一般的情景时，常常使用 *内积* 去称呼它，而如果两个函数内积后结果为 $0$，我们就称它们是 *正交* 的。我们对函数的内积做如下定义：

> [!DEF]{函数内积}
>
> 设有定义在同一集合 $S\in \R^n$ 或 $S\in \mathbb{C}^n$ 上的两个函数 $f$ 与 $g$，定义 *函数内积* 为：
>
> $$\langle f,g \rangle =  \int_S f(\mathbf{x}) \bar{g}(\mathbf{x}) \,\mathrm{d}\mathbf{x},$$
>
> 其中的 $\bar{g}$ 表示函数 $g$ 的复共轭，即函数值的逐点共轭。可以验证该定义满足内积的一般定义。

这里定义内积时我们有考虑让它的定义扩展到其他空间中，不过对于我们熟悉的实函数而言，就是简单的相乘后积分即可。三角函数系是我们常见的正交函数系之一，而除了三角函数外，也有一些别的函数系满足正交性，比如一些正交多项式系，这里我们就不展开了。总之借助内积计算，我们能够成功地将一个函数在某个区间上展开成不同 $\omega$ 下 $\sin(\omega x)$ 和 $\cos(\omega x)$ 的系数和，它也是一个级数。我们称这样展开的级数为这个函数的 *傅里叶级数*：

> [!DEF]{傅里叶级数}
> 
> 若合适的函数[^4] $f(x)$ 的周期为 $2L$，记 $\omega_n = n\pi / L$，则它的 *傅里叶级数* 展开式为：
> $$ f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty \left( a_n \cos(\omega_n x) + b_n \sin(\omega_n x) \right),$$
> 其中
> $$ a_n = \frac{1}{L} \int_{-L}^{L} f(x) \cos (\omega_n x) \,\mathrm{d}x = \frac{\langle f(x), \cos(\omega_n x )\rangle}{\langle \cos(\omega_n x), \cos(\omega_n x)\rangle} , $$
> $$ b_n = \frac{1}{L} \int_{-L}^{L} f(x) \sin (\omega_n x) \,\mathrm{d}x = \frac{\langle f(x), \sin(\omega_n x )\rangle}{\langle \sin(\omega_n x), \sin(\omega_n x)\rangle} . $$
 
注意到我们这里要求 $f(x)$ 是一个周期为 $2L$ 的函数，原因我们稍后提到。另外，如果我们应用 *欧拉公式* 的话，我们可以将上面的式子改写成更简洁的形式：

> [!COROLLARY]{傅里叶级数的复数形式}
>
> 若函数 $f(x)$ 的周期为 $2L$，设 $\omega_n = n\pi / L$，则它的傅里叶级数可以被展开为：
>
> $$ f(x) = \sum_{-\infty}^{\infty} c_n \mathrm{e}^{\mathbf{i} \omega_n x}, $$
> 其中，
> $$ c_n =  \frac{1}{2L} \int_{-L}^{L} f(x) \mathrm{e}^{ - \mathbf{i} \omega_n x}.$$
> 式中，$\mathbf{i}$ 为虚数单位。若记 $K_n(x) = \mathrm{e}^{ - \mathbf{i} \omega_n x}$，则 $c_n$ 亦可记为：
>
> $$ c_n =  \frac{\langle f(x), K_n(x)\rangle}{\langle K_n(x),K_n(x) \rangle}$$

我们要求周期是 $2L$，一方面是为了能够将经典傅里叶级数原本的 $2\pi$ 的周期扩展到任意的周期上，另一方面也是为了能更好地衔接后续的 *傅里叶变换* 与 *离散傅里叶变换*。另一个自然的问题是，非周期的函数在某个区间上可以进行这样的展开吗？答案是可以这么操作，但得到的就不是函数的展开了，而是在这个区间上的逼近。我们下面画一些函数在傅里叶级数下的逼近：

{{< react component="Impl_Spinodal_Fourier/fourier_expansion" >}}

可以看到，在指定区间上，傅里叶级数可以很快地逼近目标函数，另外傅里叶级数给出的结果自然地是周期性的，这也说明了如果处理的函数真的是周期函数，那么在周期上去展开的傅里叶级数将能非常好的代替函数本身。

另外，傅里叶级数每一项前面的系数也有特殊的含义，它们代表了函数中对应频率的正弦/余弦函数的 “强度”。这对于信号处理而言是非常好的消息，因为可以区分出信号的频率，从而将时间上的连续信号转换为空间上的频率强度。而且观察高频正弦/余弦函数，它们在 $-\pi$ 到 $\pi$ 上有许多的 “锯齿”，这说明它们主要会影响函数最终的 “细节”。当我们对这些细节不太在意的时候，就可以抛弃这些高频率的正弦/余弦部分，只保留较低频率的正弦/余弦，函数的形状也不会有太大的失真。

### 从离散频率走向连续频谱：傅里叶变换

傅里叶级数能将一个周期函数在其周期上用不同频率的三角函数叠加来表示，或者将一个非周期函数在指定区间上以不同三角函数的叠加实现逼近。但是这些方法里傅里叶系数始终是离散的点，就如同上面频率空间中显示的那样。而如果我们考虑让频率 *连续变化*，从离散的频率强度变成 *频谱*，那么我们就得到了所谓的 *傅里叶变换*，又称 *傅里叶积分*[^5]。推导方法我们放在下面，如果您感兴趣可以点击查阅。

<details>
<summary>从傅里叶级数到傅里叶积分</summary>

我们要怎么做呢？其实前面已经有了提示，我们让 $\omega_n = n \pi / L$，这里的 $\omega_n$ 自然地成为了三角函数的频率。我们需要让频率连续变化，最简单的方式，也最自然的方式，就是让 $L$ 趋近于无穷，这样我们还顺带让 “展开” 这个过程不只是定义在周期函数上，不再限制函数的周期性（因为现在周期是无穷了）。

我们将前面的傅里叶级数中 $a_n$ 和 $b_n$ 等带回，我们得到：

$$ 
f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty \left(\left[ \frac{1}{L}\int_{-L}^{L}  f(x) \cos (\omega_n x) \,\mathrm{d}x \right] \cos(\omega_n x) + \left[  \frac{1}{L}\int_{-L}^{L} f(x) \sin (\omega_n x) \,\mathrm{d}x \right] \sin(\omega_n x) \right),
$$

我们调整一下顺序：

$$
f(x) = \frac{1}{2L}\int_{-L}^{L} f(x)\,\mathrm{d}x + \sum_{n=1}^\infty \left[\int_{-L}^{L}  f(x) \cos (\omega_n x) \,\mathrm{d}x \right] \cos(\omega_n x)  \frac{1}{L} + \sum_{n=1}^\infty \left[ \int_{-L}^{L} f(x) \sin (\omega_n x) \,\mathrm{d}x \right] \sin(\omega_n x)  \frac{1}{L},
$$

注意到我们这里有两个 $1/L$，它们可以被表示为  $(\omega_n -\omega_n-1)/\pi = \Delta \omega / \pi$ ，我们就有了：
$$ 
 \sum_{n=1}^\infty \cdots \frac{1}{L} \Rightarrow \frac{1}{\pi}\sum_{n=1}^\infty \cdots \Delta \omega.
$$

诶！那我们让 $L$ 趋近无穷的时候，$\Delta \omega$ 就成了 $\mathrm{d}\omega$，且求和就自然变成了积分呀！而且此时，$a_0$ 对应的积分中，如果函数 $f(x)$ 是绝对可积的，这个积分就自动变成了 $0$，我们就有了：

$$
f(x) = \int_{0}^\infty \left[\int_{-\infty}^{\infty}  f(x) \cos (\omega x) \,\mathrm{d}x \right] \cos(\omega x)\,\mathrm{d}\omega 
     + \int_{0}^\infty\left[\int_{-\infty}^{\infty} f(x) \sin (\omega x) \,\mathrm{d}x \right] \sin(\omega x) \,\mathrm{d}\omega.
$$
</details>

最终，我们称下面的东西叫 *傅里叶积分*[^6]：

> [!DEF]{傅里叶积分}
>
> 称一个合适[^4]的函数 $f(x)$ 的 *傅里叶积分* 表达为：
> $$ f(x) = \int_{0}^{\infty} A(\omega) \cos(\omega x)\,\mathrm{d}\omega + \int_0^{\infty} B(\omega) \sin(\omega x) \,\mathrm{d}\omega,$$
> 其中
> $$ \begin{align*}
    A(\omega) &= \frac{1}{\pi}\int_{-\infty}^{\infty}  f(x) \cos (\omega x) \,\mathrm{d}x;\\
    B(\omega) &= \frac{1}{\pi}\int_{-\infty}^{\infty}  f(x) \sin (\omega x) \,\mathrm{d}x;
\end{align*} $$

当然，我们也可以将它表达为复数形式。我们称它的复数形式为 *傅里叶变换*[^6]：

> [!DEF]{傅里叶变换}
>
> 称一个合适的函数 $f(x)$ 的 *傅里叶变换* 为 $F(\omega)$，$F(\omega)$ 为 $f(x)$ 的傅里叶反变换，若二者满足：
> $$ F(\omega) = \int_{-\infty}^\infty f(x) \mathrm{e}^{-\mathbf{i}\omega x}\, \mathrm{d} x ,$$
> $$ f(x) = \frac{1}{2\pi}\int_{-\infty}^\infty F(\omega) \mathrm{e}^{ \mathbf{i}\omega x}\, \mathrm{d} \omega .$$
> 二者的关系可以记作：
> $$\begin{align*} F(\omega) &= \mathscr{F}\left\{f(x)\right\},\\f(x) &= \mathscr{F}^{-1}\left\{F(\omega)\right\}. \end{align*}$$
> 或表示为：
> $$ f(x) \longleftrightarrow F(\omega) $$

其中，我们称 $\mathrm{e}^{-\mathbf{i}\omega x}$ 为傅里叶（正）变换的 *核函数*（可以简称为核），相对应的 $\mathrm{e}^{\mathbf{i}\omega x}$ 为傅里叶逆变换的核。让一个函数乘以某个核之后做积分，就是 *积分变换* 了。核函数的概念总是伴随着积分变换，二者形影不离；而使用 *傅里叶核* 进行的积分变换，就是我们这里所要讲的傅里叶变换。

<details>
<summary>关于傅里叶变换的符号</summary>

上面我们使用大写字母 $F$ 作为函数 $f$ 在进行傅里叶（正）变换后的结果。除了使用 $\mathscr{F}\left\{f\right\}$ 以外，$\hat{f}$ 或者 $\left\{f\right\}_k$ 也时常被用来来表示 $f$ 的傅里叶变换。且除了使用 $\omega$ 角频率的记号外，有时人们也是用波数 $k$ 来表达傅里叶变换后的函数定义域，或是用 $\xi$ 来表达 $x$ 的对偶变量从而体现 $\hat{f}$ 是 $f$ 的对偶这一概念。

使用不同的变量时，也会带来一些不同的傅里叶变换公式。当使用角频率 $\omega$ 时，积分核通常为  $\mathrm{e}^{-\mathbf{i}\omega x}$，变换公式也同上。而当使用波数 $k$ 或 $\xi$ 时，二者的关系为 $\omega = 2\pi k$ 或 $\omega = 2\pi \xi$。此时积分核变为：$\mathrm{e}^{-2\pi \mathbf{i}k x}$ 或 $\mathrm{e}^{-2\pi \mathbf{i}\xi x}$，而变换公式也将成为：

$$ \hat{f}(\xi) = \int_{-\infty}^\infty f(x) \mathrm{e}^{-2\pi\mathbf{i} \xi x}\,\mathrm{d} x $$
$$ f(x) = \int_{-\infty}^\infty \hat{f}(\xi) \mathrm{e}^{-2\pi\mathbf{i} \xi x}\,\mathrm{d} \xi $$

此时傅里叶变换公式的积分前系数均为 $1$。有时人们为了让角频率下的傅里叶变换也有使用波数定义时的对称性，会将 $\frac{1}{2\pi}$ 拆开为两个 $\frac{1}{\sqrt{2\pi}}$ 并同时分给两个公式，从而保持对称性。除了这些以外，还有比如虚数单位是使用 $\mathbf{i}$ 还是 $i$，$\mathbf{j}$ 或 $j$，积分核内的符号排列顺序等，我们就不多提了。总的来讲，傅里叶变换就是这样的一种积分变换，根据需要的场景我们会选择合适的公式。在这个系列中，我们保持前面推导过程中使用的记号，并使用角频率 $\omega$ 且保持积分前的系数不对称。
</details>

这里我们讨论的是一维的情况，那么二维甚至更高维度下要怎么进行傅里叶变换呢？其实答案很简单：对每个方向依次做傅里叶变换就可以了。以二维为例，$f(x_1,x_2)$ 的变换结果为：

$$\begin{align*}
    F(\omega_1,\omega_2) &=  \int_{-\infty}^\infty \left[\int_{-\infty}^\infty f(x_1,x_2) \mathrm{e}^{-\mathbf{i} \omega_1 x_1}\,\mathrm{d} x_1\right] \mathrm{e}^{-\mathbf{i} \omega_2 x_2} \,\mathrm{d} x_2\\
    &= \int_{-\infty}^\infty  \int_{-\infty}^\infty f(x_1,x_2)  \mathrm{e}^{-\mathbf{i}(\omega_1 x_1 + \omega_2 x_2)}\,\mathrm{d} x_1 \mathrm{d} x_2
\end{align*} $$

而反变换结果则为：

$$\begin{align*}f(x_1,x_2) &= \frac{1}{(2\pi)^2}\int_{-\infty}^\infty \left[\int_{-\infty}^\infty F(\omega_1,\omega_2) \mathrm{e}^{\mathbf{i} \omega_1 x_1}\,\mathrm{d} \omega_1\right] \mathrm{e}^{\mathbf{i} \omega_2 x_2} \,\mathrm{d} \omega_1 \\ &=  \frac{1}{4\pi^2}\int_{-\infty}^\infty  \int_{-\infty}^\infty F(\omega_1,\omega_2)  \mathrm{e}^{\mathbf{i}(\omega_1 x_1 + \omega_2 x_2)}\,\mathrm{d} \omega_1 \mathrm{d} \omega_2\end{align*}$$

对于更高维度的函数，我们只需要执行更多次积分就好。注意到每个空间方向只对应一个频率方向。逆变换也是类似的，将积分核的指数改变符号，然后在前面乘以 $1/2\pi$ 的维度次方就好。

### 傅里叶变换的性质

有了傅里叶变换之后，我们自然会考虑它有什么样的性质。首先，毋庸置疑的，由于傅里叶变换是积分变换，积分满足线性性，因此：

> [!LEMMA]{傅里叶变换是线性的}
>
> 设有两个合适的函数 $f$ 和 $g$，以及复数 $a,b\in \mathbb{C}$ 则有：
>
> $$ \mathscr{F}\{af+bg\} = a\mathscr{F}\{f\} + b\mathscr{F}\{g\},$$
>
> 或记作
>
> $$ a f(x) + b g(x) \longleftrightarrow aF(\omega) + bG(\omega), $$
>
> 即该变换是线性的。

我们就不证明了，这个性质从积分就能得到，且对于多元函数来说这条性质依然是成立的。除此之外的性质就没那么明显了，我们就需要将它们带入来看看。这里我们就不进行推导了，直接将几个性质列出来：

> [!PROP]{傅里叶变换的性质} 
> 设两个合适的一元函数 $f$ 和 $g$，以及复数 $a\in \mathbb{C}$，则：
> 
> 1. 微分定理：$$ \frac{\mathrm{d}^n f(x)}{\mathrm{d} x ^n } \longleftrightarrow (\mathbf{i} \omega)^n F(\omega);$$
> 2. 积分定理：$$ \int_{x_0}^{x} f(x)\,\mathrm{d} x \longleftrightarrow \frac{F(\omega)}{\mathbf{i}\omega};$$
> 3. 位移定理：$$ f(x+x_0) \longleftrightarrow \mathrm{e}^{\mathbf{i}\omega x_0} F(\omega);$$
> 4. 卷积定理：$$ f(x)g(x) \longleftrightarrow  \frac{1}{2\pi} F*G(\omega), $$ $$ (f*g)(x) \longleftrightarrow F(\omega) G(\omega), $$ 其中 $*$ 为方程求卷积：$$ f*g(x) = \int_{-\infty}^\infty f(t) g(t-x)\,\mathrm{d} t .$$

可以看到，傅里叶变换有着神奇的性质：它能把求导变成简单的乘法，而让积分变成简单的除法！后两条性质则是为了完整性而添加上去的，但也能看到傅里叶变换的强大潜力。对于多元函数而言，我们最关心的第一条性质就变成：

$$ \left(\frac{\partial}{\partial \boldsymbol{x}}\right)^\alpha f(\boldsymbol{x}) \longleftrightarrow (\mathbf{i}\boldsymbol{\omega})^\alpha \mathscr{F}\{\boldsymbol{\omega}\}, $$

其中 $\alpha$ 是多重指标：$\alpha = \left(\alpha_1, \alpha_2,\dots\right)$，它的规则是将多元成分的每个分量都作用到对应的指数，然后相乘。比如 $\boldsymbol{x}^\alpha$ 代表的即为 $x_1^{\alpha_1}x_2^{\alpha_2}\cdots$。所以总体来讲，即便是多元函数，它的求导在进行傅里叶变换后，依旧还是让函数的傅里叶变换乘以角频率与虚数的若干次方，是一个十分简洁的关系！而我们想要介绍的 *傅里叶谱方法*，实际上也正是靠着傅里叶变换的这个神奇性质而得到了广泛的应用。

## 傅里叶谱方法

相信从上面的介绍，您也可以猜到傅里叶谱方法具体要怎么操作了。通过将待解的偏微分方程两端同时做傅里叶变换，我们可以把偏微分方程中难以处理的一些求导变成简单的乘法运算，进而在时间上得以简单迭代。比如下面的经典二阶偏微分方程：传热方程。

### 经典传热方程的傅里叶谱法

> [!EXAMPLE]{传热方程}
> 
> 设有一个含时函数 $T(x,t)$ 满足条件
> $$ \frac{\partial T}{\partial t} = a \frac{\partial^2 T}{\partial x^2},$$
> $$ T(x,0) = T_0(x), $$
> 其中 $T_0(x)$ 是一个已知函数。

那么我们可以怎么解它呢？从题目来看，$t=0$ 时刻的场分布是我们已知的，且等号左侧只有待求函数对时间的偏导。处理这种问题，最经典的方法就是在左边用经典差分代替微分，随后想方法整理得到等号右侧的偏导结果，并将它按时间差分迭代到自己。我们 除了使用传统的有限差分之外，我们可以对两边在 $x$ 上做傅里叶变换，得到这样的结果：

$$ \frac{\partial \mathscr{F}\left\{ f\right\}}{\partial t} = a \mathscr{F}\left\{\frac{\partial^2 f}{\partial x^2}\right\}, $$

根据傅里叶变换的性质，我们有：

$$ \mathscr{F}\left\{\frac{\partial^2 f}{\partial x^2}\right\}= (\mathbf{i}\omega)^2 \mathscr{F}\{f\};$$

带回，就得到了关于 $\mathscr{F}\left\{f\right\}$ 的一个只和时间相关的方程：

$$ \frac{\partial \mathscr{F}\left\{ f\right\}}{\partial t} = - a \omega^2 \mathscr{F}\{f\}, $$

接下来只需要直接在时间上求解即可，最后将得到的 $\mathscr{F}\{f\}$ 反变换回 $f$，就得到了我们需要的解了。

不过，操作虽然简单，它背后的数学逻辑其实要稍微复杂一些。我们这里介绍的傅里叶谱法，其实是 *谱方法* 这个大类下的一个最为人所熟知的方法。我们这里不对谱方法进行展开，但是值得了解的是，谱方法实际上是使用一系列 *正交函数* 对待求函数进行逼近的方法，这些正交函数被要求在要求解的空间上只有有限多个点为 $0$。傅里叶谱方法使用了三角函数（或者 $\mathrm{e}^{\mathbf{i}\omega x}$） 的性质，而除了傅里叶谱方法外，还有切比雪夫谱方法、勒让德谱方法等，它们借助的则是切比雪夫多项式和勒让德多项式这两种 *正交多项式*。此外，上面傅里叶谱方法展现出的特殊性质，其实源于 *微分算子* 的特殊性质：

$$ \frac{\mathrm{d} }{\mathrm{d} x }\mathrm{e}^{\mathbf{i} \omega x} = \mathbf{i}\omega \mathrm{e}^{\mathbf{i} \omega x},$$

正是这样的特点，让傅里叶变换能够如此简单地将求导转换成普通的乘法。可惜的是，其他的谱方法就没有这么简单的对应关系了，因此也相对少见一些。

傅里叶谱方法尽管强大，也依旧有一些自己的问题。比如它原生对周期性条件的问题有极强的能力，但对非周期性条件的问题就有些束手无策了。这一点限制可以有一些方法来绕过，但这样做的结果会带来大量的额外计算负担来处理边界问题，且得到的结果会不太准确。而且使用傅里叶谱方法时，它的收敛性需要一些额外的处理。这些我们会在后续使用傅里叶谱法实现调幅分解时进一步讨论。

### 离散傅里叶变换

## 快速傅里叶变换

### 从 \$O(N^2)\$ 到 \$O(N\log(N))\$

### 从递归到迭代

### FFTW


[^1]: https://www.bilibili.com/video/BV1pW411J7s8/ [3Blue1Brown](https://space.bilibili.com/88461692) 的一系列视频都谈及了傅里叶变换
[^2]: https://www.bilibili.com/video/BV1eUHjzgEAd/ [漫士沉思录](https://space.bilibili.com/266765166) 也做了对傅里叶变换的介绍
[^3]: https://numerical.recipes/book.html 它的第 12 章介绍了快速傅里叶变换的相关背景。
[^4]: 这实在是一个非常复杂的话题。因为我们只是想用它作为一种方法，我们这里不深入了解傅里叶级数和傅里叶变换的充分条件。感兴趣可以参考一些高等数学或数学分析教材。
[^5]: 这又是另一个非常复杂的话题。傅里叶积分和傅里叶变换，两个名字不可能完全代表同一个东西，它们到底有什么区别？感兴趣可以参考 [Stack Overflow上的讨论](https://math.stackexchange.com/questions/400679/difference-between-fourier-integral-and-fourier-transform)。总的来说，傅里叶变换一般都以复数形式表示，而二者的区别总体而言有两种看法。一种认为傅立叶积分是三角函数形式的展开，而傅里叶变换则是复数形式的函数积分变换，另一种则认为傅里叶积分只是一种积分的形式，而傅里叶变换是在 $L^2$ 空间上的 *线性等距同构*。前者更偏向形式，一些教材会采用这种讲法，而后者更偏调和分析/傅里叶分析的说法。我们采取前者的说法。
[^6]: 我们这里就应用了 *积分=三角函数形式，变换=复数形式* 的说法。