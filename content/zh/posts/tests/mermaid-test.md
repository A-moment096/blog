---
title: "Mermaid 图表测试页面"
description: "展示博客中各种 Mermaid 图表的效果"
date: 3000-01-22T10:00:00+08:00
categories:
- Testing
tags:
- Test
mermaid: true
draft: true
# hidden: true
---

这个页面展示了博客中 Mermaid 图表的各种使用方式。

## 流程图 (Flowchart)
```mermaid {title="Figure 1: GitHub Actions 工作流"}
graph TD
    A[推送代码到私有仓库] --> B[触发 GitHub Actions]
    B --> C[检出代码和子模块]
    C --> D[设置 Hugo 环境]
    D --> E[构建静态网站]
    E --> F[部署到公共仓库]
    F --> G[GitHub Pages 自动更新]
    G --> H[网站上线]
    
    classDef startEnd fill:#e1f5fe,stroke:#01579b
    classDef process fill:#f3e5f5,stroke:#4a148c
    classDef deploy fill:#e8f5e8,stroke:#1b5e20
    
    class A,H startEnd
    class B,C,D,E process
    class F,G deploy
```

## 序列图 (Sequence Diagram)

```mermaid {title="Hugo 博客部署序列图"}
sequenceDiagram
    participant Dev as 开发者
    participant Private as 私有仓库
    participant Actions as GitHub Actions
    participant Public as 公共仓库
    participant Pages as GitHub Pages
    
    Dev->>Private: git push
    Private->>Actions: 触发 workflow
    Actions->>Actions: 构建 Hugo 网站
    Actions->>Public: 推送静态文件
    Public->>Pages: 自动部署
    Pages-->>Dev: 网站更新完成
```
## 甘特图 (Gantt Chart)

```mermaid {title="博客搭建项目时间线"}
gantt
    title 博客搭建与优化计划
    dateFormat  YYYY-MM-DD
    section 基础搭建
    安装 Hugo        :done,    setup, 2025-01-01, 2025-01-03
    选择主题         :done,    theme, 2025-01-02, 2025-01-05
    基础配置         :done,    config, 2025-01-05, 2025-01-08
    
    section 内容创作
    写作第一篇文章    :done,    first, 2025-01-08, 2025-01-10
    SCSS 模块化      :done,    scss, 2025-01-15, 2025-01-18
    
    section 高级功能
    Mermaid 集成     :active,  mermaid, 2025-01-20, 2025-01-22
    自动化部署       :         deploy, 2025-01-22, 2025-01-25
    性能优化         :         perf, 2025-01-25, 2025-01-30
```

## 类图 (Class Diagram)

```mermaid {title="Hugo 项目结构类图"}
classDiagram
    class HugoSite {
        +config.toml
        +content/
        +layouts/
        +static/
        +build()
        +serve()
    }
    
    class Theme {
        +layouts/
        +assets/
        +static/
        +config.yaml
    }
    
    class Content {
        +posts/
        +pages/
        +frontmatter
        +markdown
    }
    
    class Deployment {
        +GitHub Actions
        +peaceiris/actions-gh-pages
        +DEPLOY_TOKEN
        +deploy()
    }
    
    HugoSite ||--o{ Content : contains
    HugoSite ||--|| Theme : uses
    HugoSite ||--|| Deployment : deploys with
```

## 饼图 (Pie Chart)

```mermaid title="博客内容分布"
pie title 博客文章分类分布
    "相场模拟" : 45
    "编程技术" : 25
    "数学笔记" : 15
    "其他内容" : 15
```

## 使用方法

### 1. 在文章 Front Matter 中启用 Mermaid

```yaml
---
title: "你的文章标题"
mermaid: true
---
```

### 2. 使用 Shortcode

```markdown
{{</* mermaid caption="图表说明" */>}}
graph TD
    A[开始] --> B[结束]
{{</* /mermaid */>}}
```

### 3. 支持的图表类型

- **流程图 (Flowchart)**: `graph TD` 或 `graph LR`
- **序列图 (Sequence)**: `sequenceDiagram`
- **甘特图 (Gantt)**: `gantt`
- **类图 (Class)**: `classDiagram`
- **状态图 (State)**: `stateDiagram`
- **饼图 (Pie)**: `pie`
- **用户旅程图 (User Journey)**: `journey`
- **Git 图 (Git Graph)**: `gitGraph`

### 4. 样式特性

- ✅ **响应式设计**: 图表自动适应屏幕尺寸
- ✅ **深色模式**: 自动切换深色/浅色主题
- ✅ **优雅样式**: 与 Stack 主题完美集成
- ✅ **图表说明**: 支持添加图表标题和说明
