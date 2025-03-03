---
categories:
- Phase Field
- Programming
tags:
- Phase Field
- Software Engineering
title: "关于相场模拟软件的设想"
description: 一点“闭门造车”前的设想
image: star river.png
date: 2025-02-27
math: true
draft: true
---

*记录一下对相场计算模拟程序设计的构想。说不定什么时候就用到了呢？对吧？*

*头图出自 《BanG Dream! Ave Mujica》的 ED，图曲灵感来自 [【AI若叶睦】star river（原曲:感情の摩天楼 ～ Cosmic Mind）](https://www.bilibili.com/video/BV1DrNJe5ESg/)，一首很不错的 AI 翻调~*

*原曲出自 [IOSYS](https://space.bilibili.com/10923790)，B站也有[投稿](https://www.bilibili.com/video/BV1Ns411S7Sm/)*

{{< music auto="https://music.163.com/#/song?id=750876" loop="none">}}

## 简介

目前在做的 U-Nb 体系不连续析出的模拟，里面用到了这两个演化方程。之前一直没有仔细思考过这两个演化方程到底是什么来头，为什么这个体系适合使用这两个方程，导致现在想大概修改一下它们也无从下手。这里就作为笔记记录下这两个方程的推导方法，优缺点，以及我个人的一些看法吧。


