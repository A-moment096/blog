---
categories:
# - Mathematics
- Programming
# - Phase Field
# - Others
tags:
- Note
- VS Code
- Software
- Document
title: "VS Code 也许其实是 IDE"
description: "怎么用 VS Code 当 IDE：以 C++ 为例"
date: 2025-09-14T14:35:38+08:00
image: 猛独が襲う.png
imageObjectPosition: center 20%
math: true
hidden: false
comments: true
draft: true
---

*虽然 VS Code[^1] 严格来讲是编辑器（Editor），然而其实它更像是一个伪装起来的集成开发环境（IDE，Integrated Development Environment）。而且，它最强大的功能其实在于它强大的远程功能。这次我们就来聊聊怎么把 VS Code 配置成一个堪比 Visual Studio 的多用途 IDE 吧*

*本次挑选的歌曲是光受好评，翻唱无数，且我自己很喜欢的一首术曲：由 P主 [一二三](https://twitter.com/hihumi_v) 做词曲的 **猛独が襲う**。中午偶然听到了这首，感觉非常不错，就选择是她了。头图就顺手选择同样很好看的这首歌的 MV，由 [休符](https://twitter.com/kyu_fu) 所绘，实在是非常好看~ 另外还要特别指出，这首歌无敌的吉他是由 [じゅみ](https://twitter.com/junjun_mimi03) 演奏的。我必须立刻承认这首歌的吉他是我最喜欢的部分（）*

{{<music auto="https://music.163.com/#/song?id=487379581" loop="none">}}

## 介绍一下先

VS Code，一款备受瞩目的编辑器，由 Eric Gamma 于 2011 年开始开发，并于 2015 年 4 月 29 号正式发布[^2]。这款基于 Electron 框架（或者，浏览器）的编辑器目前已经成为几乎所有程序开发者工具库中必不可少的一部分了。它除了有美观、现代化的界面以外，开放的态度（VS Code 的基础功能是开源的，其开源打包称为 *Code-OSS*）更是吸引了许多开源爱好者的目光。而他杀手锏级别的特点，则是其极其丰富的插件市场以及生态环境，我只能说伟大，无需多言（可惜也只能伟大一点儿，因为插件市场很多插件是微软的版权，可惜）。

VS Code 其本体已经提供了许多的功能了：好用的集成终端、输出窗口、调试台等，标签式的页面，丰富的侧边栏功能，集成的文件浏览器等等，甚至提供了原生的 JavaScript / TypeScript 支持（因为这个编辑器就是用它们写成的）。而有了插件的加持，它真的就已经几乎成为一款 IDE 了。比如装上微软的 C/C++ 插件，你就可以使用 VS Code 编写 C++ 代码的同时，直接运行与调试 C++ 代码。而装上 CMake 插件之后，你就可以使用 CMake 管理整个项目了，右侧侧边栏会提供比较详细的配置项。我们后面就来以此为例，配置如何使用 GCC + CMake + VS Code。

<details>
<summary>编辑器，编译器和 IDE，它们到底是啥？</summary>

某种程度上，这也是一个老生常谈的问题了。

我们先说说（文本）**编辑器**，英文是 Editor。我们都不陌生，在电脑上写东西的时候经常会用到它们。它主要是为了编辑文本内容而生，最基础的功能就是换行，退格，保存等等这些也许你早已经习以为常的东西。我们介绍几个编辑器：VS Code，Vim，Emacs，微软记事本等等。总之，编辑器就是让你用来编辑文档的。除了文本编辑器之外，我们可能还会用到二进制编辑器以及其他的一些编辑器，它们的核心功能都是为了让用户编辑内容。

而**编译器**就是一个完全不一样的东西了。编译器的英文是 Compiler，它的功能是把程序（文本文件）根据语法规则编译成二进制文件，来让机器读取。编译的产物可能是一个可执行的文件，也有可能是不可执行的东西，但是它们的特点都是没法直接用文本编辑器等打开，或者你得用专用的二进制编辑器打开并编辑。编译器也有很多种，就拿 C/C++ 这门语言来讲，著名的三大编译器就分别是 `gcc`/`g++` （同属 GCC 编译器工具链），`clang`/`clang++` （LLVM 的编译器前端，后端同为 `llvm`），`cl` + `MSVC`（从名字就能看出来，是微软的家伙）。而别的编译型语言几乎也都有自己的编译工具。有趣的地方是，大多数的编译器都是依托于 GNU 的 `GCC` 工具链 （GNU Compiler Collection）或者依托于 LLVM 后端的。不过这都是后话了。

最后就是 **IDE**。全称是 *集成开发环境*，英文全称则是 *Integrated Development Environment*。它是编辑器和编译器以及其他许多工具比如调试器，性能分析，静态检查工具的集合体（*集成*一词的说法）。C/C++ 最著名的 IDE 就是传说中的宇宙第一 IDE：Visual Studio 了，或者是同样备受赞誉的 JetBrains 家的 Clion。另外 JetBrains 开发了多款 IDE，几乎所有主流语言 JetBrains 都有对应的 IDE 可用。

了解这些概念，在讨论相关话题的时候表述会清晰很多。不过即便不清楚，问题也不太大就是了（）这也是由于现在很多编辑器正朝着 IDE 的方向发展了，比如本期的主角，VS Code。所以也有开发者认为，VS Code 就是一款 IDE，我表示理解。

</details>

## 首先当然是下载咯





[^1]: 这款软件的全称应该叫做 *Visual Studio Code*，而日常我们会将它简称为 *VS Code*，*VSCode*，*vscode* 或者 *VSC*。我个人还是倾向于使用 *VS Code* 这样的写法。
[^2]: 消息来源：[The Untold Story of Visual Studio Code: A Revolution in Software Development ](https://dev.to/rajeshkumaryadavdotcom/the-untold-story-of-visual-studio-code-a-revolution-in-software-development-44pp)，讲了 VS Code 的故事，挺有意思的。