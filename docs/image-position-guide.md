# 文章头图位置控制功能说明

## 概述

现在你可以通过在文章的 front matter 中添加新的参数来控制文章头图的显示位置，解决图片因为元素大小而遮蔽重要内容的问题。

## 使用方法

在文章的 YAML front matter 中添加以下参数：

### 1. imagePosition（预设位置）

使用预定义的位置值：

```yaml
---
title: "你的文章标题"
image: "your-image.jpg"
imagePosition: center  # 选择一个预设位置
---
```

可用的预设位置：
- `center` - 居中（默认）
- `top` - 顶部对齐
- `bottom` - 底部对齐
- `left` - 左侧对齐
- `right` - 右侧对齐
- `top-left` - 左上角对齐
- `top-right` - 右上角对齐
- `bottom-left` - 左下角对齐
- `bottom-right` - 右下角对齐

### 2. imageObjectPosition（自定义位置）

如果预设位置不能满足需求，可以使用自定义的 CSS object-position 值：

```yaml
---
title: "你的文章标题"
image: "your-image.jpg"
imageObjectPosition: "center 30%"  # 自定义位置
---
```

常用的自定义位置示例：
- `"center 20%"` - 水平居中，垂直向上偏移20%
- `"center 80%"` - 水平居中，垂直向下偏移80%
- `"30% center"` - 垂直居中，水平向左偏移30%
- `"70% center"` - 垂直居中，水平向右偏移70%
- `"25% 25%"` - 自定义水平和垂直位置

## 优先级

如果同时设置了 `imagePosition` 和 `imageObjectPosition`，`imageObjectPosition` 会优先生效。

## 示例

### 示例 1：使用预设位置
```yaml
---
title: "风景摄影作品"
image: "landscape.jpg"
imagePosition: bottom  # 显示图片底部，适合地平线在下方的风景照
---
```

### 示例 2：使用自定义位置
```yaml
---
title: "人物特写"
image: "portrait.jpg"
imageObjectPosition: "center 25%"  # 突出显示人物头部
---
```

### 示例 3：完整配置
```yaml
---
categories:
- Photography
tags:
- Landscape
title: "山间日出"
description: "记录一次难忘的登山摄影经历"
date: 2025-01-15T06:00:00+08:00
image: "sunrise.jpg"
imagePosition: top  # 显示天空和阳光
math: false
comments: true
draft: false
---
```

## 技术细节

这个功能通过以下方式实现：

1. **模板覆盖**：在项目根目录的 `layouts/partials/article/components/header.html` 覆盖主题模板
   - 不直接修改 `themes/stack` 中的文件，保持主题的纯净性
   - 在 `article-image` div 上添加位置类名
   - 支持自定义 `object-position` 样式

2. **CSS 样式**：使用 `object-position` 属性控制图片在容器中的位置
   - 位置样式定义在 `assets/scss/modules/_image-position.scss`
   - 通过 `assets/scss/custom.scss` 导入

3. **响应式设计**：在不同屏幕尺寸下保持良好的显示效果

## 注意事项

1. 这个功能只影响文章详情页的头图，不影响文章列表页的缩略图
2. 图片仍然保持 `object-fit: cover` 属性，确保图片填满容器
3. 在移动设备上，图片高度会自动调整以保证良好的阅读体验
4. 建议在设置位置后预览效果，确保重要内容没有被遮挡

## 兼容性

此功能与现有的图片设置完全兼容，如果不设置新参数，图片将保持默认的居中显示。
