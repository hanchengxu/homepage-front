---
title: 欢迎来到我的博客
date: 2026-09-07
tags: 随笔, 建站
summary: 博客模块的第一篇示例文章，展示 markdown 渲染、代码高亮与图片引入的用法。
---

欢迎！这里是新上线的博客模块 ✍️

本模块支持标准的 Markdown 语法，日常写文章时直接本地编辑 markdown 即可。

## 代码高亮示例

```js
// 代码块会自动高亮
function greet(name) {
  return `Hello, ${name}!`;
}
```

## 图片引入

图片建议先上传到自己的 GitHub 图床（picture-host），然后在文章里引用 raw 链接，例如：

![Times CAR 数据面板](https://raw.githubusercontent.com/hanchengxu/picture-host/master/times.jpg)

## 常用排版

> 引用块、**加粗**、*斜体*、`行内代码`、[普通链接](https://hanchengxu.com) 都支持。

- 列表项 1
- 列表项 2

| 功能 | 状态 |
| --- | --- |
| markdown 渲染 | ✅ |
| 代码高亮 | ✅ |
| 图片自适应 | ✅ |

写作流程：用你习惯的编辑器（Typora / Obsidian / VSCode…）写好 md 文件，
放进 `public/blog/posts/` 目录，跑一次 `npm run build` 部署即生效（列表信息会自动生成）。
