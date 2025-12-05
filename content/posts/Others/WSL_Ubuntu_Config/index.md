---
categories:
# - Mathematics
- Programming
# - Phase Field
# - Others
tags:
- CUDA
- WSL
- Linux
- Shell
- Python
title: 工作用 Ubuntu WSL 配置记录
description: 怎么快速配置一个能用的 WSL Ubuntu（以及几个包）
date: 2025-11-29T14:28:17+08:00
image: 
math: true
hidden: false
comments: true
draft: true
---

## 前情提要

参加完刚刚在西安举办的材料基因工程大会之后，某人深受触动：

> 机器学习真是好东西！我必须立刻启动！

于是他决定在自己的电脑上配置一些做机器学习要用的环境。然而他有一些洁癖…… 不希望因为工作用的环境影响自己的日常使用，于是他决定不在心爱的 Arch Linux 中安装这些环境，而是自己新安装一个 Ubuntu 的 WSL，后续的内容都在 WSL 里完成。

刚刚他算是配好了，我整理了一下他安装的过程以及中间踩的坑，记录在这里，希望能帮到需要的人~

（为了方便起见，后面还是用第一人称吧）

## 环境状态 & 目标

下面的表格汇总了我目前的环境状态：

|   项目   |         状态         |
| :------: | :------------------: |
|    OS    |    Windows 11 Pro    |
|   GPU    |   RTX 5060 Laptop    |
| Terminal |   Windows Terminal   |
|  Shell   |     Powershell 7     |
|   WSL    | Arch Linux（不使用） |
|   硬盘   |       只有C盘        |

即便微软罪大恶极，经过一些调教之后，Win11 还是变得能用了起来；Windows Terminal 真的很好用，推荐每个人玩了命地用（）；很难想象不用美丽优雅 **兼容部分 GNU/Linux 命令** 的 Powershell 7（`pwsh`）的样子；我们默认打开科学上网且开启虚拟网卡模式，免得 Shell 笨笨地不走代理。

我们的目标？自然是搞一个 Ubuntu 的 WSL，再在里面装上 Anaconda 以及 CUDA ，最后创建一个 conda 虚拟环境，在虚拟环境里装上测试用的 PyTorch。

那我们开始吧~

## 安装/配置 Ubuntu WSL

Ubuntu 在某种角度，已经成为了 Linux（GNU/Linux）的代名词了：市占率广，知名度高，还算简单易用，基于 Debian 的特性让它也许也还算稳定。最重要的是，Windows 的 WSL2 使用的默认发行版就是 Ubuntu，而也许也正因如此，CUDA 关于 WSL 的支持是默认用户用的是 Ubuntu。

说实在的，我不是很想在我已经有了一个配置地很不错的 Arch WSL 的前提下再大费周章地搞一个 Ubuntu WSL 来专门跑机器学习，而且 Arch Linux 实际上是有打包好的 CUDA 包的，可以用 `pacman` 方便地下载下来。然而考虑到我不希望复杂（冗杂）的 Anaconda 污染我的电脑，也不希望后面在跑程序的过程中因为 Arch 和 CUDA 之间的问题而反复调试，所以干脆就再开一个 Ubuntu 好了。

### 安装 Ubuntu WSL

安装的过程还算简单，因为之前我的电脑已经有了 Arch WSL 了，安装 Ubuntu WSL 也不用等太久的 WSL 初始化过程。使用的命令也算简单：

```pwsh
wsl --install
```

没错，一行就可以了，而且甚至不用指明是哪个发行版（没错，因为默认）。当然，想要查询有哪些 WSL 上可用的 Linux 发行版，可以

```pwsh
wsl -l -o
# 其实就是 wsl --list --online
```

然而我这里没有默认安装，本着能装新的就装新的原则，我选择安装了 Ubuntu 24.04 版本：

```pwsh
wsl --install Ubuntu-24.04
```

中间需要设置用户名和管理员密码，用户名**只能是小写**，而且 **输入密码时你看不见输入的内容**，最重要的是 **请保管好你的管理员密码**，不然就只能卸掉重装咯，那样就很亏了。不过行文至此，怎么卸载安装好的 WSL 发行版呢？很简单：

```pwsh
wsl --unregister Ubuntu-24.04
```

这行命令就会删掉你的 Ubuntu-24.04 发行版了。顺带，查询电脑上装了什么 WSL 的方式也很简单：

```pwsh
wsl --list --verbose
# wsl -l -v
```

这个命令不止会列出已经安装的 WSL，还会显示它们的状态。想要彻底关闭运行中的 WSL（而不是简单地关掉 Shell），可以 

```pwsh
wsl --shutdown
```

（这个会关掉 WSL，也就是所有运行中的发行版都会被关掉）

有点啰嗦了，不过这么几个简单的命令就能操作 WSL 的安装、卸载、查询之类的了。

### 配置新到手的 Ubuntu WSL

刚到手的新系统，怎么能不先设置一下呢？工欲善其事，必先利其器嘛。我装了这些东西：

- `zsh`: 替代 `bash`
- `fd`: 替代 `find`
- `rg`: 替代 `grep`
- `eza`: 替代 `ls`
- `bat`: 替代 `cat`
- `nvim`
- `cmake`
- `build-essential`
- `git`
- `gdb`

然后给 ZSH 装一些插件，插件管理选择了经典的 `oh-my-zsh`，一款基于 `git clone` 仓库到对应文件夹下的插件管理器（）安装的插件有：

- `zsh-autosuggestions`: 让你的 ZSH 拥有 FISH 那样的补全（既然如此，为什么不直接用 FISH 呢？别问……）；
- `zsh-syntax-highlighting`: 给正确/错误/特殊命令以多样的颜色，很方便，就像 FISH 那样（既然如此……）；
- `zsh-completions`: 让你的 ZSH 补全更聪明；
- `conda-zsh-completion`: 给你的 ZSH 加上 conda 命令的补全
- `zsh-vi-mode`: 按下 ESC，使用 vi mode 来编辑你的命令行！偶尔会用到，但是要注意光标形状……

我们给出用到的命令：

```bash
# Upgrade the source first
sudo apt upgrade
# fd has package name fd-find; rg has package name ripgrep; nvim has package name neovim
sudo apt install zsh fd-find ripgrep eza bat neovim cmake build-essential git gdb
# download oh-my-zsh, install and use it
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" 
# several zsh plugins
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-completions.git ${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions
git clone https://github.com/conda-incubator/conda-zsh-completion ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/conda-zsh-completion
git clone https://github.com/jeffreytse/zsh-vi-mode $ZSH_CUSTOM/plugins/zsh-vi-mode
```

接着把之前我一直在用的 `.zshrc` 文件复制到 Ubuntu WSL 里：

```zsh
# $HOME/.zshrc
export ZSH="$HOME/.oh-my-zsh"

ZSH_THEME="robbyrussell"

# Use zsh-completions plugin
fpath+=${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions/src
autoload -U compinit && compinit

# Update when available
zstyle ':omz:update' mode reminder 

plugins=(
	git
	colored-man-pages
    zsh-vi-mode
	zsh-autosuggestions
	zsh-syntax-highlighting
    conda-zsh-completion
)

source "$ZSH/oh-my-zsh.sh"

# Source everything in the custom env folder
if [ -d $ZSH_CUSTOM/env ]; then
    for f in $ZSH_CUSTOM/env/*; do
        source $f
    done
fi

# Set ~win as the windows user home folder
hash -d win=/mnt/c/Users/AMoment
# Disable pipe override (>)
set -o noclobber

```

这里的 `.zshrc` 文件是删掉了很多没用到的注释的。这些注释实际上是 `oh-my-zsh` 自动提供的，为的是方便用户自己调整，如果你有需要的话请只修改和添加上面的内容到特定的行就可以了。注意要保持顺序，特别是 `zsh-completion` 是特别要求要保持顺序的。