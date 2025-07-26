---
categories:
# - Mathematics
# - Programming
# - Phase Field
# - Others
tags:
# - 
title: "Use_Rsync"
description: 
date: 2025-07-25T20:12:39+08:00
image: 
math: true
license: 
hidden: false
comments: true
draft: true
---

## 使用 `rsync` 进行同步

### 使用场景

有时候我们有多个远程电脑，或者是服务器，上面的文件内容我们希望下载到本地。我们通常有这么几个选择：使用一些功能成熟的，专用于 SSH 连接的终端模拟器，比如 MobaXTerm 这样的软件；或者我们可以使用 `scp`，`sftp` 这样的工具，但是界面有点简陋，特别是 `sftp`，需要反复确认文件名是否输入错误。而且有时我们只需要下载不同的部分，不希望重复下载已经有了的部分。这时候，`rsync` 作为 *remote sync* 的工具，就到了发挥其作用的地方了。

#### 使用方法

`rsync` 命令使用方法是：

```bash
rsync --option1 --option2 /pass/files/from/here/ /path/file/to/here
```
所以大概就是遵循：`命令，选项，从哪里来，到哪里去` 这样的规则。另外，既然 `rsync` 是 *remote sync* 的简称，自然这个命令也是可以被用于远程服务器之间的文件传输的。方法也很简单，就是给对应的文件路径添加上使用 `ssh` 的用户名、服务器地址等信息。具体用法我们下面介绍。

首先，这里需要强调的是，请注意 `从哪里来` 的

## 帮到我的链接

这里简单记录一些我学习这些命令时用到的网页链接。感谢~

- 首先，ChatGPT 和 Deepseek，完全不了解的时候和这些 AI 问一下还是挺好用的；
- [rsync tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories): 一个简单的 rsync walkthrough，帮了我很多；
<!-- - [](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories) -->



