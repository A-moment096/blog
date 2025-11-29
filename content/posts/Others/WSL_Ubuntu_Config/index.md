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

## 工具清单

下面的表格汇总了

|项目|状态|
|:-:|:-:|
|OS|Windows 11 Pro|
|Terminal|Windows Terminal|
|Shell|Powershell 7|

即便微软罪大恶极，经过一些调教之后，Win11 还是变得能用了起来；Windows Terminal 真的很好用，推荐每个人玩了命地用（）；很难想象不用