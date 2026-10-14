---
name: anzhiyu
description: Comprehensive guide, documentation, and reference for hexo-theme-anzhiyu (安知鱼主题). Use when modifying Hexo site settings, styling, navigation, background music, AI summary, shortcodes, creating new posts, or adding special pages (links, essay, about, music, album) using the official AnZhiYu theme documentation.
---

# 安知鱼（AnZhiYu）主题技能与官方文档指南

安知鱼（AnZhiYu）是一款基于 Hexo 框架并参考张洪 Heo 的 Card UI 设计风格打造的现代化博客主题。本技能收录了来自官方文档（[docs.anheyu.com](https://docs.anheyu.com/)）的完整离线参考手册，并在博客日常维护中为你提供规范指导。

---

## 本地官方文档索引

本插件已内置官方完整离线 Markdown 文档，位于 `references/` 目录下，可直接按需查阅：

| 文档模块 | 本地相对路径 | 核心内容 |
| :--- | :--- | :--- |
| **主题安装与快速起步** | `references/initall.md` | 安装方式、渲染插件、配置覆盖机制、版本号规范 |
| **站点与基础配置** | `references/base.md` | 语言、博主资料、菜单导航、代码高亮、社交图标、打赏 |
| **功能扩展与组件** | `references/extra.md` | 评论系统、本地/在线搜索、深色模式、特效、音乐播放器、CDN |
| **文章 Front-matter** | `references/front-matter.md` | 封面图、置顶权重、AI 摘要、版权声明、侧边栏控制 |
| **进阶定制与短代码** | `references/advanced.md` | 专属标签外挂（note/tabs/gallery/timeline）、自定义注入、SWPP 缓存 |
| **友情链接页** | `references/pages/links.md` | 友链页面模板、格式与 YAML 数据源 |
| **关于本人页** | `references/pages/about.md` | 个人介绍卡片、技能清单、访问统计图表 |
| **即刻说说页** | `references/pages/essay.md` | 瀑布流说说、B 言 B 语短动态配置 |
| **音乐馆页面** | `references/pages/music.md` | 专属完整音乐大页面、自定义歌单与模式 |
| **相册集页面** | `references/pages/album.md` | 瀑布流相册集、图库分组展示 |
| **追番页面** | `references/pages/bilibili.md` | Bilibili 追番/追剧列表集成 |
| **我的装备页** | `references/pages/equipment.md` | 数码与生活好物好物卡片清单 |
| **留言板页面** | `references/pages/message.md` | 独立全屏留言板界面 |

---

## 核心操作速查手册

### 1. 新建博文规范

在 `source/_posts/` 目录下创建 `.md` 文件，头部使用完整 Front-matter：

```yaml
---
title: 文章标题
date: 2026-10-15 10:00:00
tags:
  - 标签1
  - 标签2
categories:
  - 旅行日志
cover: /img/example.png
top_img: https://t.alcy.cc/ysz
top: 1 # 可选：数值越大置顶优先级越高
ai: false # 可选：true启用派蒙AI摘要，填入文本为自定义摘要，false禁用
---
```

### 2. 导航菜单配置（`_config.anzhiyu.yml`）

```yaml
menu:
  探索:
    文章归档: /archives/ || anzhiyu-icon-box-archive
    分类列表: /categories/ || anzhiyu-icon-shapes
    标签聚合: /tags/ || anzhiyu-icon-tags
  互动:
    友人帐: /link/ || anzhiyu-icon-link
    即刻说说: /essay/ || anzhiyu-icon-lightbulb
    音乐馆: /music/ || anzhiyu-icon-music
```
- 语法规则：`子项名: 路径 || 图标名`
- 图标名称支持主题自带的 `anzhiyu-icon-*` 以及 FontAwesome。

### 3. 新建独立特殊页面流程

例如新建**友情链接**页：
1. 在终端运行：`npx hexo new page link`
2. 打开 `source/link/index.md`，修改 Front-matter：
   ```yaml
   ---
   title: 友情链接
   date: 2026-10-15 10:00:00
   type: "link"
   ---
   ```
3. 在 `source/_data/link.yml` 中添加友链数据（参考 `references/pages/links.md`）。

其他页面对应的 `type`：
- 说说页面：`type: "essay"`（数据源 `source/_data/essay.yml`）
- 音乐馆页面：`type: "music"`
- 相册集页面：`type: "album"`
- 关于页面：`type: "about"`

### 4. 背景音乐（MetingJS）排障与配置

位于 `_config.anzhiyu.yml`：
```yaml
nav_music:
  enable: true
  type: song # 可选 song / playlist
  id: 1818031620
  server: netease
  api: https://api.injahow.cn/meting/?server=:server&type=:type&id=:id
```
- **自动播放问题**：现代浏览器默认阻止无交互音频自动播放。本站已在 `inject.bottom` 注入了触摸/按键自动播放唤醒脚本。

### 5. 编译、发布与 Git 同步流程

```powershell
# 1. 清理本地缓存并重新编译
hexo clean
hexo g

# 2. 本地实时预览
hexo s

# 3. 提交源码到 source 分支
git add .
git commit -m "更新博文与配置"
git push origin source

# 4. 发布静态页面到 GitHub Pages (main 分支)
hexo d
```
