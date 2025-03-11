---
title: "有限元方法笔记"
description: 学习一下有限元求解法
date: 2025-03-11
categories:
- Mathematics
- Programming
tags:
- Numerical Analysis
- Finite Element Method
- Python
image: star river.png
math: true
comments: true
draft: true
---

*一些关于有限元求解法的学习笔记，希望是能涉及一些理论方法，并且用一些简单代码做实践*

*头图出自 《BanG Dream! Ave Mujica》的 ED，图曲灵感来自 [【AI若叶睦】star river（原曲:感情の摩天楼 ～ Cosmic Mind）](https://www.bilibili.com/video/BV1DrNJe5ESg/)，一首很不错的 AI 翻调~*

*原曲出自 [IOSYS](https://space.bilibili.com/10923790)，B站也有[投稿](https://www.bilibili.com/video/BV1Ns411S7Sm/)*

{{< music auto="https://music.163.com/#/song?id=750876" loop="none">}}

## 为啥突然想做这个？

在遥远的本科时代，我还是一个懵懂无知的傻孩子。当时有一门课应该叫 *Computational Method*，说白了就是 Python 课，不过课上还包含了很多各种各样的计算方法与模拟方法。当时有一节的内容是教做有限元模拟，算的是一个一维的简单案例，不过由于那会儿对数学一窍不通，只能说是跟着稀里糊涂瞎做了作业，就草草交差了事了。现在回想起来，也许我应该多看看这个部分，毕竟有限元作为一个微分方程数值求解方法，现在能称为非常主流的一种模拟方法代名词，一定有它的独到之处。

