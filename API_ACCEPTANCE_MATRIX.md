# OMap 公开 API/类验收矩阵

> 项目：`openlayersMapKit` / npm 包：`omap`
> 版本：`0.1.0-beta.1`（内部预发布）
> 建立日期：2026-08-28
> 依据：[NEXT_STEPS_PLAN.md](./NEXT_STEPS_PLAN.md) 第二阶段
> 数据来源：`node scripts/audit-public-api.mjs --out .tmp-api-audit/public-api.txt`

## 1. 矩阵用途与维护方式

本矩阵逐个确认根入口 `src/index.ts` 的公开导出是否达到可用和可维护标准。任何类只有满足“本阶段完成定义”中的全部条件，才可标记为已完成。

维护规则：

1. 公开导出清单以审计脚本输出为准，禁止手工增删条目。
2. 每次增删导出、补测或收紧类型后，重新运行审计脚本并同步本矩阵。
3. 稳定性标记变更必须同步到 VitePress 文档对应 API 页面。
4. 标记为 `internal` 的导出必须在公开 Beta 发布前从根入口移除。

复跑方式：

```bash
npx tsc -p tsconfig.json --declaration --emitDeclarationOnly --noEmit false --outDir .tmp-api-audit
node scripts/audit-public-api.mjs --out .tmp-api-audit/public-api.txt
```

## 2. 验收字段

每个公开类按以下字段验收：

| 字段     | 说明                                              |
| -------- | ------------------------------------------------- |
| 导入     | 可从约定的公开入口 `omap` 根入口导入              |
| 类型     | 构造参数、默认值和可选值类型准确                  |
| 正常测试 | 正常功能具有自动化测试                            |
| 边界测试 | 无效输入和边界条件具有自动化测试                  |
| 生命周期 | 生命周期和资源释放经过验证                        |
| 回调类型 | loader、filter、style 和事件 payload 类型准确     |
| 转换规则 | OpenLayers 原生对象与 OMap wrapper 的转换规则明确 |
| 文档     | 至少有一份最小使用文档                            |
| 示例     | 核心或复杂类具有可运行示例                        |
| 浏览器   | 需要 DOM 或交互环境的能力经过真实浏览器验证       |

状态符号：`Y` 已完成 / `P` 部分完成 / `N` 未完成 / `-` 不适用。

## 3. 稳定性分级

| 分级            | 含义                                              |
| --------------- | ------------------------------------------------- |
| `stable-beta`   | Beta 期间承诺修复缺陷，避免无迁移说明的破坏性变更 |
| `experimental`  | 允许根据试用反馈调整 API，文档必须明确标识        |
| `compatibility` | 仅为历史兼容保留，不推荐新项目使用                |
| `internal`      | 不应从公共入口导出，必须在公开 Beta 前移除        |

## 4. 导出总览

| 类别      | 数量 | 说明                                       |
| --------- | ---- | ------------------------------------------ |
| class     | 58   | 验收矩阵主体                               |
| function  | 15   | 全部为源码内部参数 helper，拟标记 internal |
| const     | 23   | 含 12 个内部默认参数常量，拟标记 internal  |
| interface | 2    | `Disposable`、`Removable` 生命周期协议     |
| type      | 47   | 类型导出，随所属类一并验收                 |
| **合计**  | 145  |                                            |

## 5. Core 模块

| 类                | 稳定性       | 导入 | 类型 | 正常测试 | 边界测试 | 生命周期 | 回调类型 | 转换规则 | 文档 | 示例 | 浏览器 | 备注                                                                  |
| ----------------- | ------------ | ---- | ---- | -------- | -------- | -------- | -------- | -------- | ---- | ---- | ------ | --------------------------------------------------------------------- |
| `Map`             | stable-beta  | Y    | P    | Y        | P        | Y        | P        | Y        | Y    | Y    | N      | 已拆分为 manager/controller/query/adapter；typed event payload 未完成 |
| `Projection`      | experimental | Y    | P    | N        | N        | -        | -        | P        | P    | N    | N      | 无任何测试引用，需优先补测                                            |
| `Point`           | stable-beta  | Y    | Y    | Y        | Y        | -        | -        | Y        | P    | Y    | N      | factory 参数化矩阵已覆盖                                              |
| `LineString`      | stable-beta  | Y    | Y    | Y        | Y        | -        | -        | Y        | P    | Y    | N      | 同上                                                                  |
| `Polygon`         | stable-beta  | Y    | Y    | Y        | Y        | -        | -        | Y        | P    | Y    | N      | 同上                                                                  |
| `MultiPoint`      | stable-beta  | Y    | Y    | Y        | P        | -        | -        | Y        | P    | N    | N      | 边界输入待补                                                          |
| `MultiLineString` | stable-beta  | Y    | Y    | Y        | P        | -        | -        | Y        | P    | N    | N      | 边界输入待补                                                          |
| `MultiPolygon`    | stable-beta  | Y    | Y    | Y        | P        | -        | -        | Y        | P    | N    | N      | 边界输入待补                                                          |
| `Circle`          | stable-beta  | Y    | Y    | Y        | P        | -        | -        | Y        | P    | N    | N      | 半径边界待补                                                          |
| `LinearRing`      | stable-beta  | Y    | Y    | Y        | P        | -        | -        | Y        | P    | N    | N      | 闭合校验边界待补                                                      |

## 6. Layer 模块

| 类            | 稳定性       | 导入 | 类型 | 正常测试 | 边界测试 | 生命周期 | 回调类型 | 转换规则 | 文档 | 示例 | 浏览器 | 备注                                       |
| ------------- | ------------ | ---- | ---- | -------- | -------- | -------- | -------- | -------- | ---- | ---- | ------ | ------------------------------------------ |
| `VectorLayer` | stable-beta  | Y    | P    | Y        | P        | Y        | P        | Y        | Y    | Y    | N      | source 门面职责明确；properties 泛型待收敛 |
| `TileLayer`   | stable-beta  | Y    | P    | N        | N        | N        | -        | P        | P    | N    | N      | 无测试引用                                 |
| `ImageLayer`  | stable-beta  | Y    | P    | N        | N        | N        | -        | P        | P    | N    | N      | 无测试引用                                 |
| `WMSLayer`    | stable-beta  | Y    | P    | N        | N        | N        | -        | P        | P    | N    | N      | 无测试引用，依赖外部 WMS 服务              |
| `WMTSLayer`   | stable-beta  | Y    | P    | N        | N        | N        | -        | P        | P    | N    | N      | 无测试引用，依赖外部 WMTS 服务             |
| `XYZLayer`    | stable-beta  | Y    | P    | N        | N        | N        | -        | P        | P    | N    | N      | 无测试引用                                 |
| `TdtLayer`    | experimental | Y    | P    | N        | N        | N        | -        | P        | P    | N    | N      | 依赖天地图 token，测试需替换为本地资源     |
| `GaodeLayer`  | experimental | Y    | P    | N        | N        | N        | -        | P        | P    | N    | N      | 依赖高德服务，仅被间接引用一次             |
| `LayerGroup`  | stable-beta  | Y    | P    | Y        | P        | Y        | -        | Y        | P    | N    | N      | 组内增删与 groupId 同步已测                |

> `BaseLayer` 为内部基类，未从根入口导出，不单独验收，其能力随各子类一并覆盖。

## 7. Source 模块

| 类                    | 稳定性        | 导入 | 类型 | 正常测试 | 边界测试 | 生命周期 | 回调类型 | 转换规则 | 文档 | 示例 | 浏览器 | 备注                                  |
| --------------------- | ------------- | ---- | ---- | -------- | -------- | -------- | -------- | -------- | ---- | ---- | ------ | ------------------------------------- |
| `Source`              | stable-beta   | Y    | P    | N        | N        | P        | -        | P        | P    | N    | N      | 基类能力经子类间接覆盖                |
| `VectorSource`        | stable-beta   | Y    | P    | Y        | P        | Y        | P        | Y        | Y    | Y    | N      | Feature 唯一状态源，loader 类型待精确 |
| `ImageSource`         | stable-beta   | Y    | P    | N        | N        | N        | -        | P        | P    | N    | N      | 无测试引用                            |
| `TileSource`          | stable-beta   | Y    | P    | N        | N        | N        | P        | P        | P    | N    | N      | 子类较多，基类缺直接测试              |
| `XYZSource`           | stable-beta   | Y    | P    | N        | N        | N        | -        | P        | P    | N    | N      | 无测试引用                            |
| `WMTSSource`          | stable-beta   | Y    | P    | N        | N        | N        | -        | P        | P    | N    | N      | 无测试引用                            |
| `TileWMSSource`       | stable-beta   | Y    | P    | Y        | P        | N        | -        | P        | P    | N    | N      | 已有参数 set/update 回归              |
| `VectorTileSource`    | experimental  | Y    | P    | N        | N        | N        | -        | P        | N    | N    | N      | 无测试引用                            |
| `OGCVectorTileSource` | experimental  | Y    | P    | N        | N        | N        | -        | P        | N    | N    | N      | 无测试引用                            |
| `DataTileSource`      | experimental  | Y    | P    | N        | N        | N        | P        | P        | N    | N    | N      | loader 类型待精确                     |
| `ImageTileSource`     | experimental  | Y    | P    | N        | N        | N        | P        | P        | N    | N    | N      | loader/url getter 类型待精确          |
| `TileDebugSource`     | experimental  | Y    | P    | N        | N        | N        | -        | P        | N    | N    | N      | 调试用途                              |
| `UTFGridSource`       | experimental  | Y    | P    | N        | N        | N        | P        | P        | N    | N    | N      | 回调数据仍为宽松类型                  |
| `UrlTileSource`       | compatibility | Y    | P    | N        | N        | N        | -        | P        | N    | N    | N      | legacy 目录，仅为历史兼容             |
| `TileImageSource`     | compatibility | Y    | P    | N        | N        | N        | -        | P        | N    | N    | N      | legacy 目录，仅为历史兼容             |

## 8. Interaction 模块

| 类                  | 稳定性       | 导入 | 类型 | 正常测试 | 边界测试 | 生命周期 | 回调类型 | 转换规则 | 文档 | 示例 | 浏览器 | 备注                                 |
| ------------------- | ------------ | ---- | ---- | -------- | -------- | -------- | -------- | -------- | ---- | ---- | ------ | ------------------------------------ |
| `Draw`              | stable-beta  | Y    | P    | Y        | P        | Y        | P        | Y        | Y    | Y    | N      | abort 与 clearFeatures 语义已明确    |
| `Modify`            | stable-beta  | Y    | P    | Y        | Y        | Y        | P        | Y        | Y    | Y    | N      | 快照恢复已测                         |
| `Select`            | stable-beta  | Y    | P    | Y        | P        | Y        | P        | Y        | Y    | Y    | N      | filter/layers 边界已修复             |
| `Measure`           | stable-beta  | Y    | P    | Y        | P        | Y        | Y        | Y        | Y    | Y    | N      | 已有 typed event map 与 DOM 生命周期 |
| `DragBox`           | experimental | Y    | P    | P        | N        | P        | P        | -        | P    | N    | N      | 需真实指针事件验证                   |
| `DragPan`           | experimental | Y    | P    | P        | N        | P        | P        | -        | P    | N    | N      | 需真实指针事件验证                   |
| `DragZoom`          | experimental | Y    | P    | N        | N        | N        | P        | -        | P    | N    | N      | 无测试引用                           |
| `InteractionExtent` | experimental | Y    | P    | N        | N        | N        | P        | -        | P    | N    | N      | 无测试引用                           |
| `Link`              | experimental | Y    | P    | N        | N        | N        | P        | -        | P    | N    | N      | 无测试引用，需多地图环境             |
| `KeyboardZoom`      | experimental | Y    | P    | N        | N        | N        | P        | -        | P    | N    | N      | 无测试引用                           |
| `MouseWheelZoom`    | experimental | Y    | P    | N        | N        | N        | P        | -        | P    | N    | N      | 无测试引用，依赖滚轮事件             |
| `DoubleClickZoom`   | experimental | Y    | P    | N        | N        | N        | P        | -        | P    | N    | N      | 无测试引用，依赖双击事件             |

> `Interaction` 基类未从根入口导出，其 `remove()`/`dispose()` 协议经各子类验收。

## 9. Control 模块

| 类           | 稳定性       | 导入 | 类型 | 正常测试 | 边界测试 | 生命周期 | 回调类型 | 转换规则 | 文档 | 示例 | 浏览器 | 备注                     |
| ------------ | ------------ | ---- | ---- | -------- | -------- | -------- | -------- | -------- | ---- | ---- | ------ | ------------------------ |
| `Zoom`       | stable-beta  | Y    | P    | N        | N        | N        | -        | P        | P    | N    | N      | 无测试引用，DOM 依赖强   |
| `FullScreen` | experimental | Y    | P    | N        | N        | N        | -        | P        | P    | N    | N      | 无测试引用，需真实浏览器 |

## 10. Basic 模块

| 类       | 稳定性        | 导入 | 类型 | 正常测试 | 边界测试 | 生命周期 | 回调类型 | 转换规则 | 文档 | 示例 | 浏览器 | 备注                                                    |
| -------- | ------------- | ---- | ---- | -------- | -------- | -------- | -------- | -------- | ---- | ---- | ------ | ------------------------------------------------------- |
| `Lnglat` | compatibility | Y    | Y    | Y        | Y        | -        | -        | Y        | P    | Y    | N      | 已废弃，推荐 `LngLat` 别名                              |
| `LngLat` | stable-beta   | Y    | Y    | Y        | Y        | -        | -        | Y        | P    | Y    | N      | `Lnglat` 的推荐别名                                     |
| `Pixel`  | stable-beta   | Y    | Y    | Y        | P        | -        | -        | Y        | P    | N    | N      | 固定 tuple 已收敛                                       |
| `Size`   | stable-beta   | Y    | Y    | Y        | P        | -        | -        | Y        | P    | N    | N      | 固定 tuple 已收敛                                       |
| `Extent` | stable-beta   | Y    | Y    | Y        | P        | -        | -        | Y        | P    | N    | N      | 固定四元组已收敛                                        |
| `Color`  | stable-beta   | Y    | Y    | Y        | P        | -        | -        | -        | P    | N    | N      | 颜色格式边界待补                                        |
| `Style`  | stable-beta   | Y    | Y    | Y        | P        | -        | P        | -        | P    | P    | N      | 回调签名已精确化，返回值数组收窄已测                    |
| `Popup`  | stable-beta   | Y    | P    | Y        | P        | Y        | Y        | Y        | Y    | Y    | N      | Manager 与 typed payload 已测；Overlay 定位需真实浏览器 |

## 11. Util 模块

| 类          | 稳定性       | 导入 | 类型 | 正常测试 | 边界测试 | 生命周期 | 回调类型 | 转换规则 | 文档 | 示例 | 浏览器 | 备注                          |
| ----------- | ------------ | ---- | ---- | -------- | -------- | -------- | -------- | -------- | ---- | ---- | ------ | ----------------------------- |
| `Format`    | stable-beta  | Y    | P    | Y        | P        | -        | -        | Y        | Y    | P    | N      | KML/WKT/GeoJSON 选项矩阵待补  |
| `ProjUtil`  | stable-beta  | Y    | P    | N        | N        | -        | -        | P        | P    | N    | N      | 无测试引用，坐标转换依赖它    |
| `MapToken`  | experimental | Y    | P    | N        | N        | -        | -        | -        | P    | N    | N      | 天地图 token 全局配置，无测试 |
| `OMapError` | stable-beta  | Y    | Y    | Y        | Y        | -        | -        | -        | P    | N    | -      | 统一错误类型与错误码          |

> `Event` 为内部基类，未从根入口导出，其协议经 Map、Popup、Interaction 等子类验收。

## 12. 待清理的内部导出

以下导出属于源码内部实现细节，不应出现在公共入口，需在公开 Beta 发布前移除。

### 12.1 内部 helper 函数（15 个）

`handleGetTileSourceParams`、`handleGetTileGrid`、`handleGetTileGridParams`、`handleGetDataTileSourceParams`、`handleGetImageTileSourceParams`、`handleGetOGCVectorTileSourceParams`、`handleGetTileDebugSourceParams`、`handleGetTileWMSSourceParams`、`handleGetUrlTileSourceParams`、`handleGetUTFGridSourceParams`、`handleGetVectorTileSourceParams`、`handleGetWMTSSourceParams`、`handleGetWMTSTileGrid`、`handleGetXYZSourceParams`、`handleGetTileImageSourceParams`

### 12.2 内部默认参数常量（12 个）

`DEFAULT_TILE_SOURCE_PARAMS`、`DEFAULT_DATA_TILE_SOURCE_PARAMS`、`DEFAULT_IMAGE_TILE_SOURCE_PARAMS`、`DEFAULT_OGC_VECTOR_TILE_SOURCE_PARAMS`、`DEFAULT_TILE_DEBUG_SOURCE_PARAMS`、`DEFAULT_TILE_WMS_SOURCE_PARAMS`、`DEFAULT_URL_TILE_SOURCE_PARAMS`、`DEFAULT_UTF_GRID_SOURCE_PARAMS`、`DEFAULT_VECTOR_TILE_SOURCE_PARAMS`、`DEFAULT_WMTS_SOURCE_PARAMS`、`DEFAULT_XYZ_SOURCE_PARAMS`、`DEFAULT_TILE_IMAGE_SOURCE_PARAMS`

### 12.3 事件类型常量

`TILE_SOURCE_EVENT_TYPES` 需确认是否为公共契约；若为内部实现细节，应随上述项一并移除。

> **兼容性提示**：移除内部导出属于破坏性变更，必须先在 CHANGELOG 和迁移指南中说明，并在公开 Beta 之前完成。

## 13. 当前缺口汇总

1. **27 个公开类完全无测试引用**：`DataTileSource`、`DoubleClickZoom`、`DragZoom`、`FullScreen`、`ImageLayer`、`ImageSource`、`ImageTileSource`、`InteractionExtent`、`KeyboardZoom`、`Link`、`MouseWheelZoom`、`OGCVectorTileSource`、`Projection`、`ProjUtil`、`Source`、`TdtLayer`、`TileDebugSource`、`TileImageSource`、`TileLayer`、`UrlTileSource`、`UTFGridSource`、`VectorTileSource`、`WMSLayer`、`WMTSLayer`、`WMTSSource`、`XYZLayer`、`XYZSource`。
2. **27 个内部导出泄漏到公共入口**（15 函数 + 12 常量）。
3. **全部类的浏览器验证为空**：`Map`、`Draw`、`Modify`、`Select`、`Measure`、`Popup` 等强 DOM 依赖类均未经真实浏览器验证。
4. **properties 泛型未收敛**：所有涉及 properties 的类的“回调类型”与“类型”字段均无法标记为完成。
5. **typed event map 未全覆盖**：`Measure` 已完成，Map/Popup 部分完成，其余 Interaction 仍为宽松类型。
6. **文档为模块级骨架**：尚无逐类 API 页面，所有类的“文档”字段最高只能为部分完成。

## 14. 本阶段完成定义

任何公开类只有同时满足以下条件，才能在验收矩阵中标记完成：

1. 公开导出路径明确且消费者可正常导入。
2. 类型签名与运行时行为一致。
3. 正常路径、边界条件和清理路径均有自动化测试。
4. 需要浏览器的行为经过 Playwright 验证。
5. 文档包含用途、参数、方法、事件、错误和生命周期。
6. 至少提供一个最小示例；复杂类提供可运行示例。
7. 不新增顶层反向依赖、循环依赖或无意义宽泛类型。
8. `pnpm check` 和对应消费者测试通过。
