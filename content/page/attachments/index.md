---
title: "Attachments"
image: "氷のプリンセス.jpg"
menu:
    main:
        weight: 80
        params:
            icon: bookmark
comment: true
toc: false
---

*头图出自 pixiv 画师 [KANOSE](https://www.pixiv.net/users/1460159)，链接：[氷のプリンセス](https://www.pixiv.net/artworks/70462748)，非常好冰之公主！*

## 简介

您也许会在博客中看到我放了一些文件，这里我维护了一份列表，您可以在这里下载文中提到的内容。

这些文件按照在博客中出现的顺序排列，目前主要是笔者自己用到的或者自己写的一些东西。

直接点击链接时，如果是纯文本文件或图片，您可能需要复制粘贴该文件，而如果是其他格式（如压缩文件等），则会自动下载。

如果您发现文件不全或文件有任何问题，请联系我。感谢您的支持！

![喜欢您来](喜欢您来.jpg)

### 文献阅读系列

- {{< filelink path="PF_Papers/Jin-Wang-Khachaturyan2001.pdf" text="Three-dimensional phase field microelasticity theory and modeling of multiple cracks and voids">}} : 

    讲了 Khachaturyan 的弹性力学理论在三维相场模拟中的应用

- {{< filelink path="PF_Papers/Nestler1999.pdf" text="A multiphase field model: sharp interface asymptotics and numerical simulations of moving phase boundaries and multijunctions">}} : 

    Britta Nestler 关于界面能的一些工作，基于反对称形式的界面能构造进行了一些分析。

- {{< filelink path="PF_Papers/Nestler-Wheeler1998.pdf" text="Anisotropic multi-phase-field model: Interfaces and junctions">}} : 

    Britta Nestler 关于界面能的一些工作，在多相场模型与 Cahn-Hoffman $\xi$ 向量的基础上进行了扩展。

- {{< filelink path="PF_Paper/Wang-Jin-Khachaturyan2002.pdf" text="Phase field microelasticity theory and modeling of elastically and structurally inhomogeneous solid">}} : 

    Khachaturyan 相场微弹性理论更详细的阐述。

### 相场模拟，但是用很多语言 I

- {{< filelink path="Impl_Spinodal/CPP/CPP_impl_v1.cpp">}} : 调幅分解的 C++ 基础实现
- {{< filelink path="Impl_Spinodal/CPP/CPP_impl_v2.cpp">}} : 调幅分解的 C++ 实现，使用了更多的 C++ 特性

### 相场模拟，但是用很多语言 II

- {{< filelink path="Impl_Spinodal/Python/PY_impl_v1.py">}} : 调幅分解的 Python 基础实现
- {{< filelink path="Impl_Spinodal/Python/PY_impl_v2.py">}} : 使用了 Numpy 提供的数组
- {{< filelink path="Impl_Spinodal/Python/PY_impl_v3.py">}} : 广泛使用了 Numpy 内置的方法，提高计算效率
- {{< filelink path="Impl_Spinodal/Python/PY_impl_v4.py">}} : 使用了 Python 的 matplotlib 库用于可视化

### 相场模拟，但是用很多语言 III

- {{< filelink path="Impl_Spinodal/JS/JS_impl_v1.js">}} : 调幅分解的 JavaScript 基础实现
- {{< filelink path="Impl_Spinodal/JS/JS_impl_v2.js">}} : 使用面向对象与 Stride 重写求解逻辑
- {{< filelink path="Impl_Spinodal/JS/JS_impl_v3.7z">}} : 分文件实现并允许使用输入文件，是 7z 压缩包
- {{< filelink path="Impl_Spinodal/TS/TS_impl_v1.ts">}} : 使用 TypeScript 实现了 JS_impl_v3 的代码
- {{< filelink path="Impl_Spinodal/TS/TS_impl_v2.ts">}} : 进一步使用 React 图形库实现浏览器端的可视化

