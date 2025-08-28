---
title: "Markdown 测试页面"
description: "展示博客支持的 Markdown 语法"
date: 3000-08-22T10:00:00+08:00
categories:
- Others
tags:
- Test
- Markdown
- Syntax
mermaid: true
math: true
draft: true
# hidden: true
---

这是一个全面的 Markdown 测试页面，展示了博客支持的各种 Markdown 语法特性。

## 标题 Headers

# 一级标题 H1
## 二级标题 H2
### 三级标题 H3
#### 四级标题 H4
##### 五级标题 H5
###### 六级标题 H6

## 文本格式 Text Formatting

P.S. 可以用 `_` 代替

**粗体文本 Bold Text**

*斜体文本 Italic Text*

***粗斜体文本 Bold Italic Text***

~~删除线文本 Strikethrough Text~~

~单个波浪线也可以做删除~

<u>下划线文本 Underlined Text</u>

<mark>高亮文本 Highlighted Text</mark>

`行内代码 Inline Code`

普通文本中的 **粗体**、*斜体* 和 `代码` 混合使用。

## 段落和换行 Paragraphs and Line Breaks

这是第一个段落。段落之间用空行分隔。

这是第二个段落。  
这里使用两个空格+回车来实现换行。

这是第三个段落，演示了段落的正常显示效果。

## 列表 Lists

### 无序列表 Unordered Lists

- 第一项
- 第二项
  - 嵌套项目 1
  - 嵌套项目 2
    - 深层嵌套项目
- 第三项

* 使用星号的列表
* 第二项
  + 混合使用不同符号
  + 另一个项目

### 有序列表 Ordered Lists

1. 第一项
2. 第二项
   1. 嵌套有序列表
   2. 另一个嵌套项
      1. 深层嵌套
3. 第三项

### 任务列表 Task Lists

- [x] 已完成的任务
- [ ] 未完成的任务
- [x] 另一个已完成的任务
- [ ] 待办事项

## 链接 Links

[普通链接](https://example.com)

[带标题的链接](https://example.com "这是链接标题")

[相对链接](/page/about/)

[内部锚点链接](#图片-images)

自动链接：https://example.com

邮箱链接：<test@example.com>

参考式链接：[Google][1] 和 [GitHub][2]

[1]: https://google.com "Google"
[2]: https://github.com "GitHub"

## 图片 Images

![替代文本](/avatar.jpg "图片标题")

![网络图片](https://via.placeholder.com/300x200?text=Placeholder)

带链接的图片：
[![图片链接](/avatar.jpg)](/page/about/)

## 代码块 Code Blocks

### 行内代码
使用 `console.log()` 输出信息。

### 行间代码
- 可以使用 `linenostart=<num>` 来指定第一行的行号是多少
- 可以使用 `hl_lines=[<num>,"<num>-<num>"]` 指定高亮的代码行（从 1 开始）

```python {linenos=true,hl_lines=[2,"4-6"],linenostart=10}
def example_function():
    # 这一行会被高亮
    x = 1
    # 这些行也会被高亮
    y = 2
    z = 3
    return x + y + z
```

## 表格 Tables

| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容1  |   内容2   |   内容3 |
| 长一点的内容 | 短内容 | 更长的内容项目 |
| A      |    B     |      C |

### 复杂表格

| 功能 | 支持程度 | 描述 | 示例 |
|------|:--------:|------|------|
| **粗体** | ✅ | 文本加粗 | `**text**` |
| *斜体* | ✅ | 文本倾斜 | `*text*` |
| ~~删除线~~ | ✅ | 划掉文本 | `~~text~~` |
| `代码` | ✅ | 行内代码 | `` `code` `` |
| [链接](/) | ✅ | 超链接 | `[text](url)` |

## 引用 Blockquotes

> 这是一个简单的引用。

> 嵌套引用示例：
> 
> > 这是嵌套的引用内容。
> > 
> > > 更深层的嵌套引用。

> 引用中可以包含其他元素：
> 
> - 列表项目
> - 另一个项目
> 
> ```python
> print("引用中的代码块")
> def test_function():
>     return "测试代码块在引用中的显示效果"
> ```
> 
> 这里还有一些 `行内代码` 在引用中的显示效果。

> [!WARNING]
> 
> 这是一段比较长的引用内容，用来测试背景色的显示效果。包含 `行内代码` 和其他格式。

> [!NOTE]
> 
> 这是 note 类型的引用块，背景色应该是淡蓝色。

> [!CAUTION]
> 
> 这是 danger 类型的引用块，应该显示为淡红色背景。

## 水平分割线 Horizontal Rules

---

***

___

- - -

## 数学公式 Mathematics

### 行内数学公式

这是行内公式：$E = mc^2$，爱因斯坦的质能方程。

圆的面积公式：$A = \pi r^2$

### 块级数学公式

$$
\frac{\partial u}{\partial t} = \nabla \cdot (D \nabla u) + f(u)
$$

$$
\begin{align}
\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\   
\nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} & = 0
\end{align}
$$

### 矩阵

等号不能单独成一行，否则会被认为是标题，会放大很大。

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\begin{pmatrix}
x \\
y
\end{pmatrix}
=\begin{pmatrix}
ax + by \\
cx + dy
\end{pmatrix}
$$

## HTML 元素 HTML Elements

<details>
<summary>点击展开详细信息</summary>

这是一个可折叠的内容区域。

- 列表项目 1
- 列表项目 2

```python
print("折叠区域中的代码")
```

</details>

<kbd>Ctrl</kbd> + <kbd>C</kbd> 复制

<sub>下标</sub> 和 <sup>上标</sup>

<abbr title="HyperText Markup Language">HTML</abbr> 缩写

## 定义列表 Definition Lists

术语 1
: 这是术语 1 的定义。

术语 2
: 这是术语 2 的定义。
: 一个术语可以有多个定义。

## 脚注 Footnotes

这里有一个脚注引用[^1]。

这里有另一个脚注[^note]。

这里有一个行内脚注^[这是行内脚注的内容]。

[^1]: 这是第一个脚注的内容。
[^note]: 这是命名脚注的内容，可以包含 **格式化文本** 和 `代码`。

## 特殊字符和转义 Special Characters

反斜杠转义：\* \_ \` \#

版权符号：© ™ ® 

箭头符号：← → ↑ ↓ ↔ ↕

数学符号：± × ÷ ≠ ≤ ≥ ∞ ∑ ∏ ∫

货币符号：$ ¥ € £ ₹

## 属性语法 Attribute Syntax

这是一个带有属性的段落。{.custom-class #custom-id}

{{% details title="Hugo Shortcode 示例" %}}
这是使用 Hugo shortcode 的内容。
{{% /details %}}

## 总结 Summary

这个测试页面展示了以下 Markdown 特性：

1. ✅ 标题（1-6级）
2. ✅ 文本格式化（粗体、斜体、删除线等）
3. ✅ 列表（有序、无序、任务列表）
4. ✅ 链接（普通、参考式、自动链接）
5. ✅ 图片（普通、带链接）
6. ✅ 代码块（多种语言语法高亮）
7. ✅ 表格（基础和复杂表格）
8. ✅ 引用（简单和嵌套引用）
9. ✅ 水平分割线
10. ✅ 数学公式（行内和块级）
11. ✅ HTML 元素
12. ✅ 定义列表
13. ✅ 脚注
14. ✅ Mermaid 图表
15. ✅ 特殊字符和转义
16. ✅ 表情符号
17. ✅ 属性语法
18. ✅ 高级代码高亮

---

*此页面最后更新于：2025年8月28日*