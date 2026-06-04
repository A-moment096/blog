---
categories:
- Phase Field
- Programming
tags:
- C
- Fourier Spectrum
- Fourier Transformation
- FFT
- Spinodal Decomposition
- Numerical Analysis
title: "相场模拟，但是用很多语言 IV"
description: 半隐式傅里叶谱方法！
image: /posts/PF_Note/Impl_Spinodal/Alice-2.png
imageObjectPosition: center 20%
date: 2026-06-10
math: true
draft: true
---

*谈到编程，稍早一些的时候大家几乎都会提到 C 语言。本期我们就来试试之前番外中使用过的 C 语言吧！用它来跑调幅分解看看~*

*为保持系列的统一，头图我们依旧选择了上期出现的，由 [Neve_AI](https://x.com/Neve_AI) 绘制的 AI 爱丽丝。选曲则是最近（……）[Ayase](https://space.bilibili.com/400813602/) 上传到 B 站的 [シネマ(CINEMA)](https://www.bilibili.com/list/ml1197098078)，由初音未来献唱。很有 Ayase 味道的一首歌，也算是一代神曲了，希望您能喜欢~*

{{< music auto="https://music.163.com/#/song?id=2623131352" loop="none">}}

## 古老的传说……

某种程度上，C 语言已经成为了传统编程的代名词了：复杂且庞大的代码库，庞杂的依赖项，强大的内存控制能力，以及各方 C 语言大神…… 不得不承认，C 语言即便不是那个最古老的高级编程语言，也是各个传统编程语言中最为人所知的那个。那么，为什么它如此出名呢？这就不得不提到现代计算机的操作系统了。

### 一次失败的尝试

上世纪 60 年代的美国，计算机操作系统的发展如火如荼，当时由 Bell 实验室，MIT 和通用电气三方共同合作的大型操作系统项目 *Multics* (*Multiplexed Information and Computer Services*) 正在推进中[^1]。Multics 项目有诸多创新之处：它是分时操作系统，实现了单层存储，且支持动态链接[^2] [^3] [^4]。当时 Multics 计划使用一个尚未实现的语言，PL/I，来进行开发，且在 1969 年， Doug McIlroy 等人实现了 TMG，一款高级编程语言，并用它成功实现了 PL/I 的编译器。

然而也许是因为项目管理混乱，又可能是当时的技术水平没法顺利推进这个项目，就在这一年，Bell 实验室的管理层和员工们觉得这个项目前景不足，纷纷退出该项目[^1] [^3] [^4]，这个项目就这样失败了。其中一批退出该项目的员工有 Ken Thompson, Dennis Ritchie，Douglas McIlroy, Joe Ossanna 等人。他们转而尝试一个更加小型化的操作系统项目，为了与 Multics 相对，他们给新项目起名为 *Unics*，即 *Uniplexed Information and Computing Service* [^3]。相比起 Multics，Unics 并非分时操作系统，但也吸取了许多从 Multics 上获得的经验。随后，Unics 的名字被改成发音相似的 *Unix*[^2]，这就是 Unix 的诞生。

### Unix 的诞生

在 1969 年的夏天，Ken Thompson 的妻子带着刚刚出生的宝宝去了祖父母家，而他也因此得以拥有了四周的时间。在这四周里，他在 PDP-7，一台老旧的设备上实现了内核，Shell，编辑器和汇编器，这就是第一代的 Unix [^4]。实现这些功能的过程也颇为传奇：他没有直接在 PDP-7 上编程，而是先在 GE-635 上通过交叉编译获得了能被 PDP-7 读取的纸带，纸带上记录的是能被 PDP-7 使用的汇编器。在这之后，就可以在 PDP-7 上使用汇编开发各种实用工具，随后的开发工作便得以直接在 PDP-7 上进行[^1]。

然而，PDP-7 不是一个好的平台，使用汇编开发也并非易事。在 PDP-7 的初次运行后没过多久，用来实现 PL/I 编译器的语言 TMG 被实现出来了，随后 Multics 使用的 PL/I 的编译器也被开发出来。但 PL/I 这门语言并不合 Unix 开发者的心意，而用它开发的 Multics 的失败让 Ken Thompson 下定决心，Unix 一定要有一款自己的系统编程语言[^1]。

### B 语言，与 NB

在尝试使用 TMG 编译 Fortran 编译器未果后，Ken Thompson 在 BCPL 的基础上实现了一款更小型化的编程语言编译器，称为 B 语言。（据 Ritchie 所说，*it's BCPL squeezed into 8K bytes of memory and filtered through Thompson’s brain.*）[^1] Ken Thompson 使用它来代替 PDP-7 上的汇编语言，成为了 Unix 的系统编程语言。B 和 BCPL 在很多地方都是相似的，比如它们都是无类型语言。但 B 语言中加入了一些好用的特性，比如 `++`，`--`，`+=` 运算符等等，且 B 不允许在程序段（procedures，也就是现在的 *函数*）中定义新的程序段 [^1]。

然而 B 语言也有它的问题，特别是当他们尝试把 Unix 从 PDP-7 移植到 PDP-11 上的时候，这些问题就暴露出来了。PDP-11 的字长是 16 比特，而最初开发 Unix 的 PDP-7 是 18 比特的，这意味着两个机器一个字（word）的长度并不相等。而 B 语言是字地址（word-addressed）而非字节地址 (byte-addressed) 的，且所有的数据都是一个 *cell*，没有所谓的字符类型 (*char*)，只有被整存在一个 cell 中的字符串，这就导致 B 语言编译器就很难处理单个字符；另外，浮点计算在一些老机器上是刚好能放进一个字里的，因为字长比较长，但这不再适用于字长更短的 PDP-11；还有指针的问题，B 语言继承了 BCPL 的指针模型，它以字为单位移动，而非字节。这在以字为地址单元的机器上没有问题，但在 PDP-11 这个以字节为地址的机器上时，就会需要额外的操作来把字地址转换成字节地址[^1]。

总体上来讲，问题主要在于以 *字* 为基本单元的 B 语言不再适用于不同字长的处理器。为此，Dennis Ritchie 在 1971 年开始向 B 语言添加字符类型，且重写了 B 的编译器来在 PDP-11 上生成机器码，而非以前的 threaded code，一种需要进一步解释运行的压缩代码。Dennis Ritchie 将略微修改的 B 语言称为 NB，意为 *new B*[^1] [^5]（意味深）。

### 从 NB 到 C

NB 后来又有了一些新的特性，比如有了类型系统（`int`，`char`，数组，指针等），再后来，在 Dennis Ritchie 的实验过程中，他发现这个版本的 NB 不方便创建复合数据结构，因此又引入了 `struct` 结构体；另外他又让 NB 拥有了完整的类型系统，支持指针的数组，数组的指针，函数等复杂的类型，而使用该类型的变量的方式正好与声明该变量的方式相同。

在拥有了以上的一切新东西之后，Dennis Ritchie 决定给这个语言一个单字母的名称，这就是 C 语言的开端。在 1971 到 1973 年间，C 语言不断完善，可以被移植到其他的机器上，而在 1973 年，Unix 系统成功使用 C 语言重写，标志着 C 语言成功成为了 Unix 系统的系统编程语言，也让 Unix 操作系统成为了可移植的操作系统。后来，由 Dennis Ritchie 和 Brian Kernighan 编著的 *The C Programming Language* 在 1978 年出版，C 语言自此有了参考标准[^1] [^4] [^5]。

### ANSI C，及后来

随后，C 语言不断发展，ANSI（American National Standards Institute，美国国家标准局）在 1989 年发布了 ANSI C 标准，添加了 `volatile`，`enum`，`void`，`const` 等关键字，成为 C89 版本；ISO（国际标准化组织）也在 1990 年接受 ANSI C 标准，被称为 C90，此后所有的版本都以年份后两位命名。C95 中添加了宽字符支持，对流式 IO 做出一些变更，而 C99 则添加了许多新的特性，如 `bool` 类型，`long long` 类型，`inline` 修饰符，使用 `//` 开启注释等等，成为了所谓的 *现代 C 语言*，这也是支持最为广泛的 C 语言标准。

C 语言至今仍然不断发展，最近的 C23 标准在弃用了许多特性（如 `ctime`）的同时，增加了许多新的语言特性，如属性标识（`[[deprecated]]`，`[[noreturn]]`），数位分隔符，新的预处理器指令，添加 `nullptr` 常量 和 `nullptr_t` 类型，让 `true` 和 `false` 成为关键字等等。

与此同时，C 语言也伴随着 Unix 操作系统走遍了大江南北。想要进行 Unix 系统开发，就绝对绕不开 C 语言，而不进行系统开发的程序员们或多或少也都写过一点 C 代码，许多现代基础设施都使用 C 语言写成（如大名鼎鼎的 Python，其 “标准解释器” 就是用 C 语言写成的 *CPython*），而许许多多的大学生在本科期间也都要学一学 C 语言，美其名曰提高技能，学习程序思维。C 语言已经成为了现代计算机科学不得不品尝的一部分了。

## C 语言速览





[^1]: Ritchie, Dennis M. (January 1993). ["The Development of the C Language"](https://www.nokia.com/bell-labs/about/dennis-m-ritchie/chist.pdf)
[^2]: [Wikipedia: Multics #Novel ideas](https://en.wikipedia.org/wiki/Multics#Novel_ideas)
[^3]: [Wikipedia: Unix #History](https://en.wikipedia.org/wiki/Unix#History)
[^4]: [Master Thesis of Nils Fredrik Gjerull: 4.3 Multics, Unix and AT&T](https://www.gjerull.net/site_media/static/html/masterthesis/masterthesisse12.html)
[^5]: [cppreference: History of C](https://en.cppreference.com/c/language/history)