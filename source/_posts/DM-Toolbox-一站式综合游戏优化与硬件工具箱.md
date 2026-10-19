---
title: DM-Toolbox (DM工具箱) —— 一站式硬件深度定制、游戏多帧生成补丁与画质增强工具箱
date: 2026-10-19 14:30:00
tags:
  - Windows工具
  - 开源软件
  - 游戏优化
  - DLSS
  - 帧生成
  - HDR
categories:
  - 旅行日志
cover: /img/dm-toolbox-main.png
top_img: https://t.alcy.cc/ysz
top: 1
---

在 PC 游戏与硬件折腾的世界里，发烧友和玩家们经常会面临碎片化的烦恼：

- 想要自定义硬件信息或进行驱动总线级测试，往往需要手动翻 WMI、注册表与 DirectX Adapter；
- 想要在非 40/50 系显卡（GTX、RTX 20/30 系、AMD Radeon、Intel Arc）上解除插帧限制畅享 **DLSS-G / FSR3 / XeSS 多帧生成**，又要在 dashdogy 代理、RenoDX 光流调度与 OptiScaler 跨卡转译之间反复倒腾配置文件，还要提防 ReShade 钩子冲突；
- 许多经典的 DirectX 11/12 游戏因未获微软官方白名单认证，无法直接开启 Windows 原生 Auto HDR；
- 进了游戏摸不准到底有没有真正启用 DLSS、当前运行的是哪个模型 Preset、插帧后的真实帧率与输入延迟到底是多少；
- 在 HDR 屏上截下的 `.jxr` 截图，发到群聊或朋友圈一片惨白甚至变黑……

为了将这些分散在各处的痛点一次性彻底解决，**DM-Toolbox (DM工具箱)** 正式诞生！它采用全新统一的 **DM 通用设计语言底座 SDK (`dm_ui_core.py`)**，将五大核心独立功能模块深度整合为一款纯绿色、开箱即用的现代化桌面综合工具箱。

项目开源地址：**<https://github.com/Iridescent10-art/DM-Toolbox>**  
最新版本下载：**<https://github.com/Iridescent10-art/DM-Toolbox/releases>**

![DM-Toolbox 综合启动器主界面](/img/dm-toolbox-main.png "DM-Toolbox 现代化 Fluent UI 主界面")

---

## 🌟 核心特性与技术亮点

DM-Toolbox 基于 **Python 3.14 + PySide6 (Qt) + Fluent Design** 深度打磨，全窗口内嵌离线运行库，具有以下跨模块级设计规范：

- **DWM 硬件级无锯齿圆角抗锯齿合成 (`DWMWCP_ROUND=2`)**：调用系统 DWM 底层 API 进行物理合成，彻底消除 QSS 软裁剪带来的四角白边与毛边锯齿；
- **统一右下角双斜线 `//` 矢量缩放手柄 (`DMSizeGrip`)**：主启动器与所有子软件窗口风格实现 100% 像素级对齐；
- **跨窗口日夜主题无感热切换 (`DMThemeManager`)**：随系统深色/浅色偏好或手动切换，所有子软件窗口即时无闪烁同步响应。

---

## 🛠️ 五大核心功能模块深度解析

### 1. 全硬件配置大师 (`app1_hardware`)

为硬件调试、环境模拟与客户端检测提供全方位支持：

- **六大硬件板块全覆盖**：支持 CPU 处理器、独立显卡 GPU、显存容量、主板 BIOS、DDR5 内存、硬盘存储的深度自定义；
- **板块单独设置即时生效**：支持对各个硬件板块进行**单独设置与即时生效**（主页快捷卡片与各详情配置页均提供一键单独生效入口），无需全盘重写，灵活高效；
- **全层级驱动模拟覆盖**：穿透覆盖 DirectX Adapter GUID、`Control\Video`、`Enum\PCI` 硬件总线、Windows Class 注册表、BIOS 及 WMI 查询；
- **客户端深度支持与无损还原**：针对主流游戏客户端检测提供专属挂钩补丁与即时生效机制，支持一键备份与一键无损还原系统官方硬件配置；
- **原生标准对齐与气泡提示**：标准非编辑态单向下拉对齐视图，解决长型号横滚裁切问题，并附带悬浮气泡全称提示。

![全硬件配置大师界面](/img/dm-toolbox-hardware.png "全硬件配置大师：单独板块即时生效与全层级驱动模拟")

---

### 2. DLSS 多帧生成补丁 (`app2_mfg`)

突破硬件架构限制，全架构显卡帧率倍增黑科技：

- **全架构显卡支持**：为全架构显卡（RTX 20/30/40/50 系、GTX、AMD Radeon、Intel Arc）解除 DLSS-G / FSR3 / XeSS 插帧限制；
- **内置 3 大主流插帧核心模式**：
  - **模式 A (dashdogy 独立代理)**：高稳定性帧生成解除核心，支持 2X/3X/4X 多倍率插帧、Bink 链式劫持与原生代理；进游戏按 `Backspace` 呼出调参菜单；
  - **模式 B (RenoDX 插件优化)**：RenoDX 深度光流调度插件，支持 2X~6X 极速插帧、Blackwell 架构内核、薄几何体 ISR/VWB 与 BAM 边缘抗撕裂；进游戏按 `Home` 呼出调参面板；
  - **模式 C (OptiScaler 跨卡转译)**：跨架构转译框架，原生解锁 Intel XeFG 2X~4X 官方插帧与 XeSS 2.0 AI 超分；进游戏按 `Insert`（或自选快捷键）呼出 ImGui 菜单，完美解决高分辨率（2K/4K）UI 缩放与按键响应。
- **DLSS 4/4.5 Transformer 超分模型矩阵**：
  - 扩充完整 AI 模型预设矩阵：包含 **Preset M**（DLSS 4.5 第二代 Transformer 旗舰画质）、**Preset L**（DLSS 4.5 超性能）、**Preset K**（DLSS 4 经典锐利推荐）、**Preset J**（DLSS 4 细节强化）以及 CNN 终极版（Preset E/C/F）；
  - 默认选中项与一键恢复推荐统一设为 **`Default`**（保持游戏原生默认档位），支持 INI 正向反向双向无缝映射同步。
- **ReShade 框架防冲突与 `dxgi.dll` 避让锁**：
  - 存在 ReShade 底座时，`dxgi.dll` 绝对锁死留给 ReShade，OptiScaler 自动退避使用 `version.dll` 或 `winmm.dll`，实现两大框架无冲突丝滑共存。
- **PE 导入表动态分析**：
  - 针对未静态链接 `dxgi.dll` 的游戏（如《燕云十六声》等），智能分析 PE 导入表并优先选择 `winmm.dll`，确保游戏启动第一时间加载并拦截 Streamline。
- **游戏内外参数【双向实时同步】**：
  - **正向同步**：统一通过 `IniConfigManager` 保持注释与结构，UI 调整参数后即刻写入游戏根目录 `RTXMFG-UI.ini`、`mfg_unlocker.ini`、`OptiScaler.ini`（v0.9.4 唯一合法配置，自动清除遗留 `nvngx.ini`）与 `ReShade.ini` (`[RenoDX.MFGUnlock]`)；
  - **反向同步**：内置 `QFileSystemWatcher` 后台防抖监听（400ms Debounce + 抑制自循环），游戏内按快捷键调参保存后，桌面软件 UI 自动反向同步刷新！
- **集成 ReShade HDR (RHI)**：内置 42MB 独立离线 `RHI-Setup.exe` 与主程序路径直达助手，一键为游戏注入高动态 HDR 滤镜。

---

### 3. 全局游戏 SDR 转 Auto HDR 画质增强 (`app3_autohdr`)

释放 HDR 显示器的真实实力：

- **强制全局高动态范围**：解决部分 DirectX 11/12 游戏因未获微软官方认证而无法开启 Auto HDR 的问题；
- **自动游戏检测与配置**：智能识别系统中已安装的兼容游戏，一键配置 10-bit / 8-bit 高精度颜色映射；
- **精致交互体验**：内嵌高品质矢量 Chevron 下拉指示箭头与平滑胶囊圆角，操作简洁明了。

---

### 4. 全架构超分与插帧水印指示器 (`app4_dlss`)

帧数、管线与画质档位一目了然：

- **4 大独立分项与一键总控**：
  1. `🟢 NVIDIA DLSS 官方超分水印`：注册表底层 `ShowDlssIndicator=1024`，在屏幕左下角显示 DLSS 版本、渲染分辨率与 Preset 档位；
  2. `🔵 OptiScaler 性能叠加`：写入游戏目录 `OptiScaler.ini` 的 `[Menu] ShowFps`，在左上角显示当前超分引擎、渲染→输出分辨率与实时帧率；
  3. `⚡ 帧生成 Full 叠加`：将 OptiScaler 叠加升级为 `FpsOverlayType=4`，显示实时/插帧后双 FPS、FG 管线与 Reflex 延迟，用双 FPS 比值秒判 2X / 3X / 4X；
  4. `📊 ReShade 帧率监控`：写入游戏 `ReShade.ini` 的 `[OVERLAY] ShowFPS / ShowFrameTime`（需已安装 ReShade 底座）。
- **刷新率匹配防撕裂最佳实践**：
  - **2X 插帧**：适合 120Hz ~ 144Hz 刷新率显示器；
  - **3X 插帧**：适合 165Hz ~ 180Hz 刷新率显示器；
  - **4X ~ 6X 极速插帧**：适合 240Hz ~ 360Hz 甚至更高刷新率电竞屏。

---

### 5. JXR HDR 转换器 (`app5_jxr`)

把 Windows 原生 HDR 截图转换为能在手机和社交网络流通的画质：

- **批量拖拽转换**：把 Windows HDR 截图（JPEG XR / `.jxr`）批量转换为 **Ultra HDR JPEG** 或 **SDR PNG**，支持文件/文件夹拖拽与后台多线程并发队列；
- **专业级编解码算法**：内置 Google 官方 **libultrahdr 1.5.1** + **libjpeg-turbo 3.2.0**，支持 `libultrahdr` / `ACES` / `BT.2446` 三种 Tone Mapping 算法；
- **元数据完整保留**：支持 JPEG 质量 60–100、峰值亮度自动/预设/自定义（1000~10000 nit），完整透传 EXIF 与 XMP 增益图元数据；
- **独立单文件运行**：内置免 .NET 运行时的独立单文件 `JxrConverter.exe`，窗口保持原版统一 Fluent 设计。

---

## 📦 获取与使用指南

1. 进入 GitHub Releases 下载最新安装包 **`DM-BOX.exe`**：  
   👉 **[GitHub Releases: DM-Toolbox](https://github.com/Iridescent10-art/DM-Toolbox/releases)**
2. 运行安装包，安装完成后直接点击桌面 **DM工具箱** 快捷方式启动；
3. **绿色无冗余**：全套 Python 3.14 + PySide6 离线内嵌运行库，无需在电脑上预装 Python、.NET 或第三方依赖环境，真正做到开箱即用！

---

## 🙏 致谢开源项目 (Acknowledgments)

DM-Toolbox 深度致敬以下杰出的上游开源项目与社区开发者：

- **[OptiScaler](https://github.com/cdozdil/OptiScaler)** (by cdozdil)
- **[MFG-Unlocker](https://github.com/dashdogy)** (by dashdogy)
- **[RenoDX](https://github.com/clshortfuse/renodx)** (by clshortfuse / mavismmg)
- **[ReShade](https://reshade.me/)** (by Crosire & ReShade Community)
- **[Intel® XeSS / XeFG](https://github.com/intel/xess)**
- **[AMD FidelityFX™ SDK](https://github.com/GPUOpen-LibrariesAndSDKs/FidelityFX-SDK)**
- **[PySide6 / Qt Project](https://www.qt.io)**

---

## 🚫 严禁倒卖与开源声明 (Anti-Resale Notice)

- **永久免费开源**：DM-Toolbox 为公益免费开源项目，官方发布的源码与安装包均完全免费！
- **严禁倒卖售卖**：严禁任何个人或商家在各电商平台（淘宝、闲鱼、拼多多等）、社交群聊或自媒体以任何形式收费、倒卖或捆绑售卖！
- **谨防受骗**：切勿购买任何收费“定制版”或“内部加速器”，谨防上当受骗！
