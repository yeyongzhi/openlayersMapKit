# OMap — openlayersMapKit

> 基于 OpenLayers 封装的地图引擎开发包，提供一系列面向对象的地图开发类，用于快速开发地图应用。

[![Version](https://img.shields.io/badge/version-1.0.0--beta1-blue)](package.json)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![OpenLayers](https://img.shields.io/badge/OpenLayers-10.6.1-orange)](https://openlayers.org/)

---

## 项目概览

OMap 是对 OpenLayers (v10.x) 的面向对象封装，将原生 OpenLayers 功能包装为语义化、类型安全的 TypeScript 类。核心目标是**简化地图应用开发**，统一 API 交互方式，内置常用国内地图服务（高德、天地图等）快捷接入能力。

### 技术栈

| 项目         | 说明                     |
| ------------ | ------------------------ |
| **语言**     | TypeScript (ESNext)      |
| **基础依赖** | OpenLayers 10.6.1        |
| **构建工具** | Vite 6.3.5 (Rollup 底层) |
| **输出格式** | UMD + ES Module          |
| **包管理器** | pnpm                     |
| **npm 包名** | `omap`                   |

---

## 目录结构

```
openlayersMapKit/
├── .github/workflows/            # CI、文档部署与 npm 发布工作流
├── docs/                         # VitePress 指南、示例与 API 文档
├── scripts/                      # 构建、文档生成和公共 API 审计脚本
├── src/                          # SDK 源代码
│   ├── index.ts                  # 主入口，导出所有模块
│   ├── source/
│   │   └── index.ts              # OpenLayers 原始依赖的统一导出层
│   ├── utils/                    # 工具函数层
│   │   ├── index.ts              # 工具模块总导出
│   │   ├── type.ts               # 核心类型定义（OlMap, OlView, 坐标类型等）
│   │   ├── omapType.ts           # OMap 内部类型
│   │   ├── define.ts             # 常量定义
│   │   ├── message.ts            # 日志/警告/错误消息处理
│   │   ├── transform.ts          # 数据转换工具
│   │   ├── handle.ts             # 通用处理函数
│   │   ├── dataType.ts           # 数据类型判断工具
│   │   └── olType/               # OpenLayers 类型映射（map/layer/source/view/projection）
│   └── module/                   # 核心模块层
│       ├── core/                 # 🔑 核心模块（Map、Feature、Projection）
│       ├── layer/                # 🗺️ 图层模块
│       ├── interaction/          # ✋ 交互模块
│       ├── control/              # 🎛️ 控件模块
│       ├── source/               # 📦 数据源模块
│       ├── basic/                # 🧱 基础类模块
│       └── util/                 # 🔧 工具模块
├── tests/                        # Vitest 与 ESM/CJS/类型消费测试
├── dist/                         # 构建产物
│   ├── omap.es.mjs               # ES Module 格式
│   ├── omap.umd.cjs              # CommonJS/UMD 格式（全局名: OMap）
│   └── index.d.ts                # TypeScript 类型声明
├── global.d.ts                   # 项目级编译时全局声明
├── vitest.config.ts              # Vitest 与覆盖率配置
├── vite.config.ts                # Vite 构建配置
├── tsconfig.json                 # TypeScript 配置
└── package.json                  # 项目元信息
```

---

## 架构设计

项目采用**面向对象 + 模块化**架构，每个模块内部使用 **index / type / handle** 三分法组织代码：

```
module/
└── <ModuleName>/
    ├── index.ts       # 类定义（构造函数 + 方法）
    ├── type.ts        # 类型定义（接口、类型别名、枚举）
    └── handle.ts      # 私有/辅助逻辑（事件处理、数据转换等）
```

### 模块总览

| 模块            | 路径                  | 核心职责                                                                                                      |
| --------------- | --------------------- | ------------------------------------------------------------------------------------------------------------- |
| **core**        | `module/core/`        | 核心类：Map、Projection、Feature 系列（Point/LineString/Polygon 等几何要素）                                  |
| **layer**       | `module/layer/`       | 图层类：BaseLayer 基类及其派生（Vector/Tile/XYZ/WMTS/WMS/Image/Gaode/Tdt + LayerGroup）                       |
| **interaction** | `module/interaction/` | 交互类：Draw、Modify、Measure、Select、DragBox、DragPan、DragZoom、MouseWheelZoom 等                          |
| **control**     | `module/control/`     | 控件类：Control 基类、Zoom、FullScreen                                                                        |
| **source**      | `module/source/`      | 数据源类：Source、TileSource、XYZ、VectorSource、DataTileSource、ImageTile、TileGrid                          |
| **basic**       | `module/basic/`       | 基础类：Lnglat（坐标）、Extent（范围）、Pixel、Size、Color、Style、Popup                                      |
| **util**        | `module/util/`        | 工具类：ProjUtil（投影转换）、Format（GeoJSON/WKT/KML 格式转换）、Event（事件系统）、MapToken（天地图 Token） |

### 依赖层次

```
Map (core)
 ├── View (core)
 ├── Projection (core)
 ├── BaseLayer (layer) → LayerGroup → Source (source)
 ├── Interactive (interaction) → Draw / Modify / Measure / Select ...
 ├── Control (control)
 ├── Popup (basic)
 ├── Event (util)
 └── Feature (core/Feature) → Lnglat / Extent / Size / Pixel / Style (basic)
```

---

## 核心类说明

### 1. Map（地图核心）

[src/module/core/Map/index.ts](src/module/core/Map/index.ts) — 一切操作的中心。

```
Map(element, options) → 创建地图实例
├── 图层管理：addLayer / removeLayer / getLayerById / getAllLayers
├── 图层组管理：addLayerGroup / removeLayerGroup / getLayerGroupById
├── 交互管理：addInteraction / removeInteraction / getInteractions
├── 控件管理：addControl / removeControl / getControls
├── 弹窗管理：addPopup / removePopup / getPopupById
├── 事件系统：on / once / un
├── 视图操作：getCenter / setCenter / getZoom / setZoom / fit / animate
├── 坐标转换：getCoordinateFromPixel / getPixelFromCoordinate
└── 几何计算：getLength / getArea / getFeaturesAtPixel / forEachFeatureAtPixel
```

### 2. Feature（要素体系）

[src/module/core/Feature/](src/module/core/Feature/) — 所有几何要素的抽象。

```
BasicFeature (抽象基类)
├── Point          — 点
├── LineString     — 线段
├── Polygon        — 多边形
├── MultiPoint     — 多重点
├── MultiLineString— 多重线段
├── MultiPolygon   — 多重多边形
├── LinearRing     — 线性环
└── Circle         — 圆形
```

每个 Feature 继承自 `BasicFeature<T>`，拥有 `getFeature()`、`getGeometry()`、`setStyle()`、`getExtent()`、`getProperties()` 等通用方法。

### 3. Layer（图层体系）

[src/module/layer/](src/module/layer/) — 图层继承链。

```
BaseLayer<T> (基类：透明度、可见性、范围、缩放等通用属性)
├── TileLayer    — 瓦片图层基类
│   ├── GaodeLayer — 高德地图（支持多种瓦片类型）
│   ├── TdtLayer   — 天地图（需 Token）
│   ├── XYZLayer   — 通用 XYZ 瓦片
│   ├── WMTSLayer  — WMTS OGC 标准
│   └── WMSLayer   — WMS OGC 标准
├── VectorLayer  — 矢量图层（Feature 管理、样式、交互绑定）
├── ImageLayer   — 单图片图层
└── LayerGroup   — 图层组（批量管理）
```

### 4. Interaction（交互体系）

[src/module/interaction/](src/module/interaction/) — 交互继承链。

```
Interaction<T> (基类：active、事件、图层绑定)
├── Draw            — 绘图交互（点/线/面/圆）
├── Modify          — 编辑交互（修改要素）
├── Measure         — 量测交互（距离/面积）
├── Select          — 选择交互
├── Extent          — 框选范围交互
├── DragBox         — 拖拽框选
├── DragPan         — 拖拽平移
├── DragZoom        — 拖拽缩放
├── MouseWheelZoom  — 滚轮缩放
├── DoubleClickZoom — 双击缩放
├── KeyboardZoom    — 键盘缩放
└── Link            — URL 同步
```

### 5. Basic（基础类型体系）

[src/module/basic/](src/module/basic/) — 几何相关的值对象。

| 类       | 说明                                   |
| -------- | -------------------------------------- |
| `Lnglat` | 经纬度坐标包装，支持 `[lng, lat]` 格式 |
| `Extent` | 范围包装，`[minX, minY, maxX, maxY]`   |
| `Pixel`  | 像素坐标 `[x, y]`                      |
| `Size`   | 尺寸 `[width, height]`                 |
| `Color`  | 颜色工具（预设色板）                   |
| `Style`  | 样式封装（对应 OL Style）              |
| `Popup`  | 弹窗封装（对应 OL Overlay）            |

### 6. Util（工具体系）

| 类         | 说明                                          |
| ---------- | --------------------------------------------- |
| `Format`   | 数据格式转换（GeoJSON / WKT / KML ↔ Feature） |
| `ProjUtil` | 投影坐标转换（fromLonLat / toLonLat）         |
| `Event`    | 全局事件系统（on / once / emit / remove）     |
| `MapToken` | 天地图 Token 管理                             |

---

## 开发指南

### 环境准备

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 混淆构建（生产环境）
pnpm build:obf
```

### 使用方式

```bash
pnpm add omap ol
```

`ol` 是 OMap 的 peer dependency。ESM 项目会复用该实例，避免重复打包 OpenLayers。

```typescript
// ES Module
import { Map, GaodeLayer, GaodeLayerType } from 'omap'

// UMD (浏览器直接引入)
// 全局变量: OMap.Map, OMap.GaodeLayer, OMap.GaodeLayerType
```

### 基本示例

```typescript
import { Map, GaodeLayer, GaodeLayerType, Draw, DrawMode } from 'omap'

// 1. 创建地图
const map = new Map('map-container', {
  view: {
    center: [116.397428, 39.90923], // 北京
    zoom: 10
  }
})

// 2. 添加高德底图
const gaodeLayer = new GaodeLayer(GaodeLayerType.VEC, {
  name: '高德矢量地图'
})
map.addLayer(gaodeLayer)

// 3. 监听事件
map.on('map:click', (e) => {
  console.log('点击坐标:', e.coordinate)
})

// 4. 添加绘图交互
const draw = new Draw(DrawMode.Point)
map.addInteraction(draw)
```

### 构建产物

```
dist/
├── omap.es.mjs       # ES Module
├── omap.umd.cjs      # CommonJS/UMD
└── index.d.ts        # TypeScript 类型声明文件
```

- ESM 产物将 OpenLayers (`ol`) 作为 peer dependency，由宿主项目复用，避免重复打包和多实例
- UMD/CJS 产物内置 OpenLayers，确保 `require('omap')` 与独立脚本加载可以直接运行
- `pnpm check:consumers` 会验证 ESM、CommonJS 和 TypeScript 声明入口
- 支持代码混淆：`pnpm build:obf` 同时生成混淆后的 ESM 与 UMD/CJS 产物

---

## 项目规范

### 代码原则

1. **面向对象封装** — 所有 OpenLayers 原生对象通过 OMap 类包装，对外暴露统一 API
2. **类型安全** — 完整的 TypeScript 类型定义，导出类型声明文件
3. **防御性编程** — 所有公开方法入参均有类型校验与错误提示
4. **模块解耦** — `src/source/` 层统一管理与隔离 OpenLayers 依赖

### 文件命名规范

| 文件        | 内容                           |
| ----------- | ------------------------------ |
| `index.ts`  | 类定义（export default class） |
| `type.ts`   | 类型/接口/枚举定义             |
| `handle.ts` | 辅助处理函数、事件回调逻辑     |

### 命名约定

- OMap 内部类：PascalCase（如 `Map`、`BaseLayer`、`VectorLayer`）
- OpenLayers 原生对象：以 `Ol` 前缀区分（如 `OlLayer`、`OlSource`、`OlFeature`）
- 类型定义：以 `OMap` 前缀命名（如 `OMapExtentType`、`OMapCoordinateType`）
- 导出名冲突处理：`Extent` 交互类导出为 `InteractionExtent`

---

## 作者

- **Author**: Aurora
- **License**: MIT
- **当前版本**: 0.1.0-beta.1（内部预发布）
- **参与贡献**: 见 [CONTRIBUTING.md](./CONTRIBUTING.md)
- **版本变化**: 见 [CHANGELOG.md](./CHANGELOG.md)
