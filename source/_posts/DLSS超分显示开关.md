---
title: DLSS 超分显示开关 —— 一键确认游戏到底开没开 DLSS
date: 2026-10-09 20:00:00
tags:
  - NVIDIA
  - DLSS
  - Windows工具
categories:
  - 旅行日志
cover: /img/dlss-repo.png
top_img: https://t.alcy.cc/ysz
---

在游戏里把画质设置翻了一遍、确认 DLSS 是「开启」状态，可画面到底有没有真的走超分？分辨率缩放比例是多少？——NVIDIA 其实内置了一个**超分状态指示器**，会在画面角落直接标出当前的 DLSS 状态文字，问题是它默认关闭，而且只能改注册表。

**DLSS 超分显示开关**就是把这个改注册表的动作做成一个按钮的 Windows 小工具。

项目地址：**<https://github.com/Iridescent10-art/dlss-display-switch>**

![DLSS 超分显示开关 项目主页](/img/dlss-repo.png "仓库首页：C# WinForms 小工具，含源码、注册表脚本与可直接运行的 exe")

## 为什么要用它

想开这个指示器，得手动往注册表里加键值：

```text
HKLM\SOFTWARE\NVIDIA Corporation\Global\NGXCore\ShowDlssIndicator
```

手动操作的麻烦在于：要管理员权限、要新建键值、开和关还得来回导入两个 `.reg` 文件，用完想关掉又是一轮操作。这个工具把这些步骤收成了两个按钮。

## 怎么用

1. 下载 `release/DLSS超分显示开关.exe`
2. **右键 → 以管理员身份运行**（写 HKLM 必须提权）
3. 点「打开超分显示」或「关闭超分显示」
4. 如果游戏正在运行，**重启游戏**后生效

程序界面上会直接显示当前处于哪种状态，不用自己去注册表编辑器里翻。

## 它是怎么实现的

| 项目 | 说明 |
| --- | --- |
| 技术栈 | C# WinForms（单文件 exe 约 38 KB） |
| 写入位置 | `HKLM\SOFTWARE\NVIDIA Corporation\Global\NGXCore\ShowDlssIndicator` |
| 权限 | 需要管理员身份运行 |
| 生效时机 | 游戏重新启动后 |

项目结构很清爽：

```text
src/Program.cs                    C# WinForms 源代码
src/app.ico / app.manifest        图标与清单（声明管理员权限）
src/make_icon.py                  生成图标的脚本
release/DLSS超分显示开关.exe       可直接运行的程序
reg/打开超分显示.reg               原始注册表脚本（不想用 exe 可以直接导）
reg/关闭超分显示.reg
```

也就是说，你既可以拿现成的 exe 用，也可以直接导入仓库里那两个 `.reg` 文件，甚至编译源码自己改界面。

## 下载

- 仓库里的 `release/` 目录：<https://github.com/Iridescent10-art/dlss-display-switch/tree/main/release>
- 或者在 Releases 页面下载 `v1.0.0` 的附件：<https://github.com/Iridescent10-art/dlss-display-switch/releases>

## 几点说明

- 它**只是显示开关**，不会改动 DLSS 的画质档位、超分比例或帧生成设置；开或关都不会影响帧数，指示器本身只是叠加在画面角落的一行状态文字。
- 如果你在游戏里看到的指示文字与设置不符（比如设了质量档却显示其它档位），那说明游戏的配置文件覆盖了设置，可以借这个指示器快速定位问题。
- 部分竞技类游戏对第三方叠加层比较敏感，联机前建议关掉指示器，避免被反作弊误判。

> 一个几十 KB 的小工具，解决的是"我到底开没开 DLSS"这个每天都在纠结的问题。
