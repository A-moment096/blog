# Hugo 主题覆盖说明

## 文件结构

本项目使用了以下方式来扩展和自定义 Hugo Stack 主题，而不直接修改主题文件：

### 模板覆盖

```
layouts/
└── partials/
    └── article/
        └── components/
            └── header.html    # 覆盖主题的文章头部模板，添加图片位置控制
```

### 样式扩展

```
assets/
└── scss/
    ├── custom.scss                    # 主样式文件，导入所有模块
    └── modules/
        ├── _image-position.scss       # 图片位置控制样式 [新增]
        ├── _article-layout.scss       # 文章布局样式
        ├── _variables.scss            # CSS 变量定义
        └── ...                        # 其他样式模块
```

## Hugo 模板优先级

Hugo 按以下优先级查找模板文件：

1. **项目根目录** `layouts/` （最高优先级）
2. **主题目录** `themes/stack/layouts/` 

这意味着：
- 我们在项目根目录创建的 `layouts/partials/article/components/header.html` 会覆盖主题的同名文件
- 主题的原始文件保持不变，便于主题更新
- 可以随时删除我们的覆盖文件来恢复主题默认行为

## 添加新功能的最佳实践

1. **不要直接修改 `themes/` 目录中的文件**
2. **在项目根目录创建相同的文件结构**
3. **只覆盖需要修改的文件**
4. **保持修改的最小化，只添加必要的功能**

## 自定义功能

### 图片位置控制

- **文件位置**：`layouts/partials/article/components/header.html`
- **样式文件**：`assets/scss/modules/_image-position.scss`
- **使用方法**：在文章 front matter 中设置 `imagePosition` 或 `imageObjectPosition`

更多详细说明请查看 `docs/image-position-guide.md`。
