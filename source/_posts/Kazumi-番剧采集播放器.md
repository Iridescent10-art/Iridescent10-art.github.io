---
title: Kazumi —— 用自定义规则追番的跨平台播放器
date: 2026-10-09 13:00:00
tags:
  - 动漫
categories:
  - 航行日志
cover: https://raw.githubusercontent.com/Predidit/Kazumi/main/static/screenshot/img_1.png
top_img: https://t.alcy.cc/ysz
---

如果你受够了在浏览器里翻来翻去地找一部番，**Kazumi** 值得放进收藏夹。它是用 Flutter 开发的番剧采集与在线观看应用，核心思路是：**用最多五行基于 XPath 语法的选择器定义自己的采集规则**，规则可以导入、可以分享，然后就能在应用里完成从搜索、追番到播放的全流程。

项目地址：**<https://github.com/Predidit/Kazumi>**（目前约 3.2 万 Star，使用 GPL-3.0 协议）

官网与文档：<https://kazumi.app>

![Kazumi 番剧目录界面](https://raw.githubusercontent.com/Predidit/Kazumi/main/static/screenshot/img_1.png "番剧目录：搜索、追番与时间表")

## 它凭什么好用

按项目自己的说法，Kazumi 是「使用 Flutter 开发的基于自定义规则的番剧采集与在线观看程序」：

- **规则自定义**：最多五行 XPath 选择器就能描述一个站点的采集方式，附带图形化的规则编辑器
- **规则生态**：支持规则导入与分享，官方还开了一个[规则仓库](https://github.com/Predidit/KazumiRules)收集大家写的规则
- **实时超分**：内置基于 Anime4K 的实时超分辨率，老番也能看清一点
- **完整播放体验**：分集播放、多视频源、弹幕、倍速、字幕、外部播放器接力

## 功能清单

项目 README 里已经打勾的部分（完整列表可以点进仓库看）：

| 功能 | 状态 | 功能 | 状态 |
| --- | --- | --- | --- |
| 规则编辑器 | ✅ | 番剧弹幕 | ✅ |
| 番剧目录 / 搜索 / 时间表 | ✅ | 番剧下载 | ✅ |
| 番剧字幕 / 分集播放 | ✅ | 一起看 | ✅ |
| 视频播放器 / 多视频源 | ✅ | 无线投屏（DLNA） | ✅ |
| 规则分享 / 在线更新 | ✅ | 外部播放器播放 | ✅ |
| 追番列表 / 历史记录 | ✅ | 超分辨率（Anime4K） | ✅ |
| 倍速播放 / 配色方案 | ✅ | 硬件加速 / 高刷适配 | ✅ |
| 跨设备同步 | ✅ | 番剧更新提醒 | ⏳ 计划中 |

![Kazumi 番剧详情与播放](https://raw.githubusercontent.com/Predidit/Kazumi/main/static/screenshot/img_3.png "番剧详情：多视频源、分集与弹幕")

## 支持平台

- **Android** 10 及以上
- **Windows** 10 及以上
- **macOS** 10.15 及以上
- **Linux**（实验性）
- **iOS** 13 及以上（需要[侧载](https://kazumi.app/docs/misc/how-to-install-in-ios)）
- **HarmonyOS** 5.0 及以上（位于[分支仓库](https://github.com/ErBWs/Kazumi/releases/latest)，需要[侧载](https://kazumi.app/docs/misc/how-to-install-in-ohos)）

## 怎么装

首选官方 Releases 页面：**<https://github.com/Predidit/Kazumi/releases/latest>**

Linux 和 Android 还有现成的软件源：

- Android：[F-Droid](https://f-droid.org/packages/com.predidit.kazumi)
- GNU/Linux：[Flathub](https://flathub.org/apps/io.github.Predidit.Kazumi)
- Arch Linux：AUR 里有 `kazumi`（源码构建）与 `kazumi-bin`（二进制包），直接 `yay -S kazumi` 或 `paru -S kazumi-bin`

## 写在后面

Kazumi 最舒服的地方在于它把「采集」这件事交还给用户：想加一个新源，写几行选择器就行，不用等作者更新应用本身。如果你写过规则，也可以顺手把它提交到官方规则仓库，让下一个人少折腾一会儿。

> 追番愉快，记得给喜欢的作品补一张正版票。
