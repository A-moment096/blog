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

其实关于 VS Code 的下载问题，我在 [这篇文章]({{< ref "VSC_Py/index.md">}}) 中已经提过了。不过如果你不想翻那里的内容，那也可以跟着下面的内容来。

### 我们先下载程序本体

我们仅考虑 Windows 端的使用，请使用 GNU/Linux 的朋友自行选择自己家的包管理器以及想安装的版本（毕竟，使用以开源著称的 Linux 的你可能不希望使用 Microsoft 的专有软件：Visual Studio Code）。这里介绍两种下载方式，一种是从官网下载，点[这个链接](https://code.visualstudio.com/download) 就会直达下载页面。

![]()

我们可以注意到这里有一个大大的下载按钮，底下还有几个选项，什么用户安装，系统安装，x64 啊 ARM 啊的。如果你不知道该选哪个，点那个大按钮。它会下载用户版的。如果你清楚自己需要什么版本，请自便。这里简单提一下用户安装和系统安装的区别。如果你的电脑只有你一个账户使用，用户安装方便又快捷，不会出错；如果你的电脑有多个账户且你想让每个账户都可以用上 VS Code，请使用系统安装版本。但是这样会有 UAC (User Access Control)的烦恼，且很多时候你修改个什么文件都会让你用管理员权限搞 （即会弹出 UAC）。下好安装包之后我的建议就是一路默认冲刺，默认选项真的挺好的。

![]()

另一种下载方式我个人不是特别地推荐，即使用 Windows 的包管理器下载。较新的 Windows 版本搭载了一款还不错的包管理器，`WinGet`，你可以使用 `winget install Microsoft.VisualStudioCode` 来直接使用 `winget` 的命令行安装，但是这样的安装方式有个问题：它没有文件浏览器集成（即右键菜单的 “以 VS Code 打开” 这样的选项）。WinGet 给了解决方案，但是有点丑陋：`winget install Microsoft.VisualStudioCode --override '/SILENT /mergetasks="!runcode,addcontextmenufiles,addcontextmenufolders"'`，而这个问题的原因竟出奇地搞笑：传给 WinGet 的默认命令行参数里写错了，把 `MERGETASKS` 写成了 `MERGETAKS` （少写个 S）。以上信息来自 [这个讨论串](https://github.com/microsoft/winget-cli/discussions/1798)，感兴趣可以看看。

不过无论如何，你这时应该已经安装好了。激动的心，颤抖的手，点开软件准备大展身手的你也许会发现：界面全是英文的。也许你觉得英文界面全对，但是这样还是比较小众的（）那怎么汉化呢？这么牛逼的软件应该有不错的本地化才对呀？别急，解决方案在下面：

### 必须立刻开始安装插件

考虑到我们是第一次装 VS Code，应该不需要考虑从账户同步安装的插件。所以，我们的第一件事就是，点击左边的插件市场图标，或者快捷键 `Ctrl+Shift+X`，打开插件市场。

![]()

如果你需要中文插件，请安装 **Chinese (Simplified)（简体中文）Language Pack for Visual Studio Code** 的插件（搜索 Chinese Language Pack 就会出来）。是的，VS Code 的所有本地化都是通过微软发布的这个本地化插件实现的。如果你喜欢异域风情，你也可以试试其他语言的本地化插件。

下载插件时，如果你是第一次下载某个人/组织打包的插件， VS Code 会问你要不要信任这个插件作者。一般而言，不要瞎装的前提下，这些作者都是可信的。VS Code 的插件是有过投毒历史的，还是请小心行事。

下来就是我们的主题了，我们需要在 VS Code 上开发 C++ 项目，为此我们需要下载 **C/C++ Extension Pack** 这个插件包，它算是微软的 C++ 插件全家桶，里面有 **CMake Tools**（用于集成 CMake 项目管理），**C/C++**（微软家实现的 C/C++ Language Server Protocol，包括代码高亮，连接编译器/调试器等），以及让你的代码有好看的语义高亮样式的 **C/C++ Themes**。有了它们，你就可以愉快地在 VS Code 里写 C++ 了！

最后，注意到我们还需要在远程做开发，为此我们还得安装 **Remote - SSH**，**Remote - SSH: Editing Configuration Files** 以及 **Remote Explorer** 这三个插件。当这些都安装好之后，我们就可以开始准备工作啦。

## 先在本地试试 C/C++ 开发吧！

在直接开始在远程进行开发前，我们最好先熟悉怎么在本地进行 C/C++ 开发。原因很简单：远程配置我们还没搞，而 C/C++ 开发不管在本地还是在远程都是差不多的。

实际上，VS Code 在它的官网上写了很多指南，比如这篇 [C/C++ for Visual Studio Code](https://code.visualstudio.com/docs/languages/cpp) 就大概介绍了一下怎么用 VS Code 编写、调试简单的 C/C++ 代码。而后面更是有专门的一部分（从在上面这篇文章的左侧栏就能找到）用多篇指南文章来介绍各个平台、各个编译器下的 C/C++ 开发配置。详细到我觉得我单独写一遍是完全没有必要的。

那么，我们这里写什么呢？我们介绍一下 CMake。

### CMake 是什么？

虽然但是，我们不得不介绍一点点 C/C++ 的历史。在最最最开始的时候，一切都很简单：我们写好源码之后，告诉编译器 “你给我编译了” 就行了。拿我们亲爱的老牌编译器 `gcc`（或者 `g++`，这个是 C++ 专用的）来说吧，当我们要编译写好的程序的时候，我们只需要 `gcc source-code.c` 或者 `g++ source-code.cpp` 就可以编译出来一个 `a.out` 的文件了。

然而，随着工程越来越复杂，我们已经没法让 `gcc` 一个个地编译这些文件了。也许我们可以用 Shell 的一些功能来批量选择文件编译，那要选择性编译的时候呢？对不同的对象要采用不同的编译选项的时候呢？这些问题当时给出的解决方案，在 Linux 上是 Makefile。人们在项目文件夹里添加一个 `makefile` 文件，在里面像是写脚本一样告诉编译器应该怎么编译文件夹中的文件，对它们中的哪些要做什么处理，等等。而当写好之后，只需要在命令行里使用 `make` 命令，就会自动读取 `makefile` 然后调用对应的工具进行编译了。

那 CMake 又是怎么回事呢？是这样的，C/C++ 代码在设计上是能在多种架构的机器上都能运行的，但是需要有对应的编译方式。而且，Makefile 的语法还是有一点难学。为了实现一份代码、到处编译的这样崇高的理想，自然地就诞生了 CMake，这样一个 “调用 Makefile 这样的生成器的构建系统”。为了适应不同平台的各种生成器，它必须有一套独立的配置方式。而又由于它是通过调用平台已有的生成器来编译代码的，你需要告诉它你要用哪个生成器。如果是 Windows 平台，你也许会使用 MSVC；如果你在 Linux 发行版上，你大概率会使用 Makefile；如果你想尝鲜，或者你的项目尤其庞大，希望提高构建速度，你可能会使用 Google 出品的 Ninja …… 但是你需要告诉 CMake 你要用哪个。

CMake 目前已经逐渐成为事实标准：各大知名库都会提供 CMake 的模块来方便调用它们，而各大包管理器（没错，C++还是有一点包管理的，虽然不多且不统一）通常也提供了 CMake 的集成。虽然 CMake 的语法十分难评（怎么 if-elseif-endif 都像是用函数实现的？！？？！？），但是目前而言，受广泛检验的，比较好用的项目构建工具，还得是它。

CMake 也是有在尝试变得好用的。比如 Presets 可以让我们快速应用某些构建选项，而 AI 的出现几乎完美解决了 `CMakeLists.txt` 难写的顽疾。所以，还是用吧。有 VS Code 的集成和 AI 的帮助，构建项目就是点点鼠标而已，还是挺方便的啦。




[^1]: 这款软件的全称应该叫做 *Visual Studio Code*，而日常我们会将它简称为 *VS Code*，*VSCode*，*vscode* 或者 *VSC*。我个人还是倾向于使用 *VS Code* 这样的写法。
[^2]: 消息来源：[The Untold Story of Visual Studio Code: A Revolution in Software Development ](https://dev.to/rajeshkumaryadavdotcom/the-untold-story-of-visual-studio-code-a-revolution-in-software-development-44pp)，讲了 VS Code 的故事，挺有意思的。