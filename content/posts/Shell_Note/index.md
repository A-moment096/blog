---
categories:
# - Mathematics
- Programming
# - Phase Field
# - Others
tags:
- Linux
- Shell
- Note
title: "Shell 速查笔记：以 ZSH 为例"
description: "一份（也许）简单的 Shell 速查笔记"
date: 2025-06-04T15:09:18+08:00
image: SEASIDE_SOLILOQUIES.png 
math: true
license: 
hidden: false
comments: true
draft: false
---

*学了一些 `bash` 命令（然而也许是 `zsh`），感觉随时会忘，就干脆在这里记一下好了*

*头图出自 Orangestar 的专辑 **SEASIDE SOLILOQUIES**, 好看又好听。所以这里贴曲就贴这个专辑的主打歌好了：一首 **Alice in 冷凍庫**，希望你喜欢。*

{{< music auto="https://music.163.com/#/song?id=458231453" loop="none">}}

## 使用的配置

目前我使用了 `oh-my-zsh` 做插件管理，好用。几乎所有配置都是默认配置，因为默认就挺不错的。插件使用了 `colored-man-pages`, `git`, `zsh-vi-mode`。

## 历史命令操作

### 使用场景

有时候我们写了一长串命令，比如有很麻烦的路径之类的，这时候我们可能会希望用某个符号来自动地填上命令里的某些参数。`zsh` 的一些交互命令提供了这个方法：使用 `!`，感叹号。

### 使用案例

1. `!!` = `!-1`，代表 “上一个执行了的命令”。比如如下操作：
```bash
$ echo hello bash world!
hello bash world!
$ echo !! # !! 替换了上面整个执行了的命令，也就是替换了 "echo hello bash world"
echo hello bash world!
$ echo !-1 # 同上,也是替换上面执行的命令，所以替换了 "echo echo hello bash world"
echo echo hello bash world! 
```
2. `!<num>` 来选择某个历史命令。我们先用 `head` 来查看一下我们的命令历史里最早有一些什么：
```bash
$ head ~/.zsh_history # 这里我的 zsh 命令历史存在这个文件里，可以用 head 查看前几个命令
: 12345:0;clear
: 12346:0;echo hello
: 12347:0;ls
## ... ... 
```
随后我们可以使用 `!1` 来选择历史命令中的第一个命令，这里的第一个命令就是 `clear`：
```bash
$ !1 # 执行第一个历史命令，也就是 clear，会直接清空屏幕；
$ !2 # 执行第二个历史命令，会打印 hello；
hello
$ !3 # 执行第三个历史命令，会打印当前文件夹下的内容
file1 file2 file3
```
从这个例子可以看到，`!` 后面跟着的数字实际上表示了“第几个命令”，而举一反三，`!-1` 则代表的是“最后一个命令”，即上一个命令，那么 `!-2` 就是倒数第二个命令。

> 有了这两个命令，我们可以很方便地在忘记使用 `sudo` 权限时，使用 `sudo !!` 或者选择某个历史命令，来快速使用 `sudo` 权限执行命令。

3. 使用 `:<num>` 来选择第几个参数。它需要配合 `!` 进行使用。参数从 1 开始，而 0 有特殊含义，代表命令。比如：
```bash
$ echo one two three
one two three
$ echo !-1:2 # 相当于 echo two
two
$ echo !:0 # 上个命令使用了 echo，所以 0 代表 echo，这个命令相当于 echo echo
echo
```
当使用 `:` 来进行参数选择时，如果是从上一个命令中选择则可以简写为 `!:<num1>-<num2>`。

4. 使用 `:<num1>-<num2>` 来范围式地选择命令的参数。比如，使用 `!!:1-2` 就说明要取第一个和第二个参数。（注意这里是参数，不是空格分隔的字符串，也不包含第一个词（也就是命令））。比如：
``` bash
$ echo one two three four
one two three four
$ echo !!:1-2 # 相当于 echo one two 
one two
$ echo one two three four # 这行用来重置最后一个命令
one two three four
$ echo !!:-3 # 没有 <num1> 则会自动替换为0，相当于 echo echo one two three
echo one two three
$ echo !-2:1-2 # 配合 !<num> 使用，相当于 echo one two 
one two 
$ echo !-3:1- # 没有 <num2> 则会匹配到除了最后一个参数外的参数，相当于 echo one two three
one two three
$ echo !-4:$ # 使用 $ 来获取最后一个参数，相当于 echo four
four
$ echo !-5:3-$ # 同样 $ 也支持范围选择，相当于 echo three four
three four
$ echo !-6:* # 使用 * 来表示所有的参数，相当于 echo !-6:1-$，也就是 echo one two three four
one two three four 
$ echo !:* # !: 是在使用冒号时 !!: 或者 !-1: 的简写，相当于 echo one two three four
one two three four 
```
如果没有 `<num1>`，则默认从 `0` 开始，也就是会包含所有内容；如果没有 `<num2>`，则默认停在最后一个参数前。可以使用 `*` 来选择所有的参数，使用 `$` 选择最后一个参数。

5. 在冒号后使用一些字母来做相应的处理。假设有命令 `ls /path/to/a/file.txt`，则下面的参数选择器可以做到：

- `:r`（root）取文件的完整文件名，结果为 `/path/to/a/file`
- `:e`（extension）取文件的后缀名，结果为 `txt`
- `:h`（head）取文件路径的地址，结果为 `/path/to/a/`
- `:t`（tail）取文件的名称，结果为 `file.txt`
- `:s/to/has`（search）可以在参数中寻找*第一个* `to` 并替换为 `has`，结果为 `/path/has/a/file.txt`
- `:gs/to/has`（global search）同上，但是全局查找替换。

### TL;DR

下面是一个表格简单描述这些用法

#### 命令选择（使用 `!`）
| 语法       | 含义                  | 示例         |
| -------- | ------------------- | ---------- |
| `!!`     | 上一条命令               | `sudo !!`  |
| `!-n`    | 倒数第 n 条命令           | `!-2`      |
| `!n`     | 第 n 条历史命令           | `!42`      |
| `!字符串`   | 最近以该字符串开头的命令        | `!ls`      |
| `!?字符串?` | 最近包含该字符串的命令         | `!?foo?`   |
| `^旧^新`   | 将上一条命令中第一个“旧”替换为“新” | `^cat^bat` |

#### 参数选择 （使用 `:`）

下面的示例命令使用 `echo file.txt` 来做演示。

| 语法       | 含义                 | 示例                  |
| -------- | ------------------ | ------------------- |
| `!!:0`   | 上一条命令的命令名          | `!!:0` → `echo`     |
| `!!:1`   | 第一个参数              | `!!:1` → `file.txt` |
| `!!:2`   | 第二个参数              |                     |
| `!!:$`   | 最后一个参数             | `!!:$`              |
| `!!:*`   | 所有参数（等同于 `!!:1-$`） | `!!:*`              |
| `!!:1-3` | 第 1 到第 3 个参数       | `!!:1-3`            |
| `!!:2-$` | 从第 2 个到最后一个参数      | `!!:2-$`            |
| `!$`     | 上一条命令的最后一个参数 (可以省略冒号)       | `cat !$`            |
| `!*`     | 上一条命令的所有参数（可以省略冒号）         | `rm !*`             |

#### 参数修饰

下面的示例命令使用 `echo /path/to/file.txt` 来做演示。

| 修饰符        | 含义                    | 示例                         |
| ---------- | --------------------- | -------------------------- |
| `:p`       | 只打印命令，不执行             | `sudo !!:p`                |
| `:q`       | 给参数加引号，避免空格或特殊字符问题    | `echo !!:1:q`              |
| `:h`       | 获取路径头部（类似 `dirname`）  | `echo !!:1:h` → `/path/to` |
| `:t`       | 获取路径尾部（类似 `basename`） | `echo !!:1:t` → `file.txt` |
| `:r`       | 去掉文件扩展名（保留主名）         | `echo !!:1:r` → `file`     |
| `:e`       | 获取文件扩展名               | `echo !!:1:e` → `txt`      |
| `:s/旧/新/`  | 替换第一个出现的子串            | `!!:1:s/foo/bar/`          |
| `:gs/旧/新/` | 替换所有出现的子串             | `!!:1:gs/foo/bar/`         |
