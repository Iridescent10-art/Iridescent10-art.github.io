---
title: JXR HDR 转换器 —— 把 Windows HDR 截图变成能分享的 Ultra HDR
date: 2026-10-09 18:00:00
tags:
  - HDR
  - Ultra HDR
  - 工具推荐
categories:
  - 旅行日志
cover: /img/jxr-repo.png
top_img: https://t.alcy.cc/ysz
---

用 Win + PrtSc 在 HDR 显示器上截的图，存下来是 `.jxr`（JPEG XR）格式——Windows 能看，但微信、群聊、网页、剪辑软件基本都不认，发出去就是一片黑或者死白。**JXR HDR 转换器**就是解决这件事的：把它批量转成 **Ultra HDR JPEG**（能在支持的手机上看到 HDR）或 **SDR PNG**。

项目地址：**<https://github.com/Iridescent10-art/jxr-to-ultrahdr>**

![JXR HDR 转换器 项目主页](/img/jxr-repo.png "仓库首页：C++ 与 C# 混合的 Windows 工具")

## 它是什么

一句话概括：**带图形界面的 JXR → Ultra HDR 批量转换器**。

- **界面**：C# + WPF，主线程只负责收集文件与刷新界面，Win11 液态玻璃（亚克力毛玻璃）风格、圆角卡片布局、设置项等宽对齐
- **解码**：Windows 原生 WIC（JPEG XR → scRGB FP16/FP32），不依赖第三方解码器
- **编码**：Google 官方 **libultrahdr 1.5.1**（动态库直接编译自官方源码）
- **架构**：`C# WPF → P/Invoke → JxrNative.dll（C++）→ WIC + libultrahdr`

## 两种版本，按需选择

| 版本 | 说明 | 依赖 |
| --- | --- | --- |
| **单文件版** | 一个约 66 MB 的 exe，已压缩 | 无，拷到任何 Win10/11 x64 上双击即用 |
| **常规版** | exe + `JxrNative.dll` | 需已安装 .NET 10 Desktop Runtime |

日志与设置都保存在 exe 同目录，绿色免安装；也可以运行「启动转换器.bat」启动常规版。

## 使用流程

1. **添加文件**：点「添加文件…」多选 `.jxr`，或点「添加文件夹…」扫描目录（含子目录），也可以直接把文件/文件夹拖进列表
2. **输出格式**：`Ultra HDR JPEG`（默认）或 `PNG（SDR）`
3. **Tone Mapping 算法**：
   - `libultrahdr（默认）`：SDR 底图与增益图全部由 libultrahdr 内部生成（Reinhard 色调映射）
   - `ACES`：Narkowicz ACES 拟合曲线
   - `BT.2446`：膝点 + 对数显示映射
   - 选后两者时程序自己生成 SDR 底图，再交给 libultrahdr 计算 `Log2(HDR/SDR)` 增益图
4. **JPEG 质量**：60–100，只对 Ultra HDR 输出有效（PNG 无损）
5. **HDR 峰值亮度**：
   - `自动`：优先读 JXR 的 EXIF/XMP 峰值元数据（`hdrgm:HDRCapacityMax` / `GainMapMax` 按 ×203 换算，或直读 `MaxCLL`），没有元数据时按 **1000 nit** 处理
   - 也可直接选预设 1000 / 1500 / 2000 / 4000 / 10000 nit，或用「自定义」输入 203–10000 之间的任意值
6. **输出目录**：默认 `发布\输出`，可自定义
7. **最大并发数**：默认 1，可调到 CPU 逻辑核心数上限
8. **开始转换**：任务压入队列，后台线程池顺序处理，进度条显示 `待处理 / 已处理 / 总数`；失败任务行标红并在「详情」里给出原因，然后自动跳过继续
9. **环形日志**：底部「处理记录」保留最近 16 次批次摘要，同时每次任务都会写入 `logs\转换日志-yyyyMMdd.txt`（UTF-8），字段包括时间、文件、输入路径、输入尺寸、输入色彩空间、HDR 峰值、输出格式、耗时

## 色彩与亮度是怎么标定的

这是这类工具最容易出错的地方，作者的说明写得很清楚：

- Windows 的 JXR 截图是 **scRGB（FP16/FP32）**，数值不是 nit
- scRGB `1.0` ≈ SDR 白 ≈ **80 nit**
- libultrahdr 内部约定线性 HDR 的 `1.0` = **203 nit**
- 于是解码后统一换算：`nits = scRGB × 80`，传给 libultrahdr 时 `= nits / 203`
- 增益图元数据：`hdr_capacity_max = 峰值亮度 / 203`

作者用 4K HDR 截图（3840×2160）做过往返验证：

| 指标 | 源 JXR | 转换后解码 |
| --- | --- | --- |
| 平均亮度 | 28.9 nit | 28.5 nit |
| 峰值亮度 | 987 nit | 1063 nit（元数据 1000） |

也就是说，HDR 内容在编码往返后基本保持一致，没有"转完就变灰"的问题。

## 元数据也没丢

- **XMP**：JXR 里的 XMP（Game DVR 等）会被解析出来，合并进成品 Ultra HDR JPEG 的 XMP APP1，与 libultrahdr 写入的 `hdrgm` 增益图元数据共存；PNG 输出会尝试写入 `tEXt` 块
- **EXIF**：JXR 若带 EXIF，WIC 读取后重建为 TIFF EXIF 块，通过 `uhdr_enc_set_exif_data` 写入成品
- JXR 与 Ultra HDR 的 EXIF/XMP 存储格式不同，程序做的是**转换**而不是直接复制字节

## 命令行也能用

主程序支持自动模式，方便做「发送到」菜单：

```text
发布\JxrConverter.exe --auto <jxr文件> [--png] [--out <目录>]
```

另外 `tools\JxrCli` 提供了纯命令行版本，适合写进批处理：

```text
JxrCli.exe <输入.jxr> <输出.jpg|png> [-tm 0|1|2] [-q 95] [-peak 1000] [-nometa] [-multi]
```

## 想自己编译

运行「构建.bat」（调用 `build.ps1`）就能从源码完整重建：

1. 复用/下载工具链：.NET SDK 10、MinGW-w64（GCC 16）、CMake 4.4
2. 编译 libjpeg-turbo 3.2.0（静态）与 Google libultrahdr 1.5.1
3. 编译 `JxrNative.dll`（WIC 解码 + 色调映射 + libultrahdr 全部静态链接，无外部 DLL 依赖）
4. `dotnet publish` 出 WPF 应用到 `发布\`，并额外生成单文件版

> 小坑提醒：MinGW 的 make 处理不了中文路径，所以原生库统一在 `%TEMP%\jxrbuild`（纯 ASCII 路径）里编译，产物再复制回来；首次构建需要联网下载工具链。

## 已知说明

- PNG（SDR）在默认模式下会先让 libultrahdr 生成 Ultra HDR、再取 SDR 底图存 PNG，以保证观感一致，因此比 ACES/BT.2446 略慢
- 单幅 4K 截图约耗时 1.2–2.5 秒（与算法有关），并发数默认 1
- 日志为 UTF-8（带 BOM），记事本、Notepad++ 打开都不会乱码

## 目录结构

```text
src/JxrNative/            原生 DLL（WIC + tone mapping + libultrahdr），含 probe 诊断工具
src/JxrConverter.App/     WPF 图形界面
tools/JxrCli/             命令行转换工具（同一套 P/Invoke）
third_party/              libultrahdr 1.5.1 / libjpeg-turbo 3.2.0 官方源码
发布/                     构建产物（可直接运行）
```

如果你也经常在 HDR 屏上截图，这个工具值得放进收藏夹——转完的 Ultra HDR JPEG 在支持 HDR 的手机相册里能直接看到亮度层次，发到不支持的地方也至少是一张正常的图。
