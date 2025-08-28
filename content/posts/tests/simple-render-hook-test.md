---
title: "简单的 Render Hook 测试"
description: "测试 Hugo Render Hook 是否正常工作"
date: 3000-08-08
categories:
- Others
tags:
- Test
draft: false
---

## Render Hook 测试

### 普通引用块

> 这是一个普通的引用块
> 应该显示默认样式

### GitHub 式引用块

> [!NOTE]
> 这是一个 NOTE 引用块

> [!TIP]
> 这是一个 TIP 引用块

> [!IMPORTANT]
> 这是一个 IMPORTANT 引用块

> [!WARNING]
> 这是一个 WARNING 引用块

> [!CAUTION]
> 这是一个 CAUTION 引用块

如果上面的引用块显示为带颜色和图标的样式，说明 Render Hook 工作正常。
如果显示为普通引用块，说明有问题。
