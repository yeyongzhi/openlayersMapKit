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
| class     | 59   | 验收矩阵主体（2026-08-30 审计：152 导出）  |
| function  | 15   | 全部为源码内部参数 helper，拟标记 internal |
| const     | 23   | 含 12 个内部默认参数常量，拟标记 internal  |
| interface | 2    | `Disposable`、`Removable` 生命周期协议     |
| type      | 53   | 类型导出，随所属类一并验收                 |
| **合计**  | 152  |                                            |

## 5. Core 模块

| 类                | 稳定性       | 导入 | 类型 | 正常测试 | 边界测试 | 生命周期 | 回调类型 | 转换规则 | 文档 | 示例 | 浏览器 | 备注                                                                                                    |
| ----------------- | ------------ | ---- | ---- | -------- | -------- | -------- | -------- | -------- | ---- | ---- | ------ | ------------------------------------------------------------------------------------------------------- |
| `Map`             | stable-beta  | Y    | P    | Y        | P        | Y        | Y        | Y        | Y    | Y    | N      | 已拆分为 manager/controller/query/adapter；typed event map 已完成（on/once 接收精确 OMapEventCallBack） |
| `Projection`      | experimental | Y    | P    | N        | N        | -        | -        | P        | Y    | N    | N      | 无任何测试引用，需优先补测                                                                              |
| `Point`           | stable-beta  | Y    | Y    | Y        | Y        | -        | -        | Y        | Y    | Y    | N      | factory 参数化矩阵已覆盖                                                                                |
| `LineString`      | stable-beta  | Y    | Y    | Y        | Y        | -        | -        | Y        | Y    | Y    | N      | 同上                                                                                                    |
| `Polygon`         | stable-beta  | Y    | Y    | Y        | Y        | -        | -        | Y        | Y    | Y    | N      | 同上                                                                                                    |
| `MultiPoint`      | stable-beta  | Y    | Y    | Y        | P        | -        | -        | Y        | Y    | N    | N      | 边界输入待补                                                                                            |
| `MultiLineString` | stable-beta  | Y    | Y    | Y        | P        | -        | -        | Y        | Y    | N    | N      | 边界输入待补                                                                                            |
| `MultiPolygon`    | stable-beta  | Y    | Y    | Y        | P        | -        | -        | Y        | Y    | N    | N      | 边界输入待补                                                                                            |
| `Circle`          | stable-beta  | Y    | Y    | Y        | P        | -        | -        | Y        | Y    | N    | N      | 半径边界待补                                                                                            |
| `LinearRing`      | stable-beta  | Y    | Y    | Y        | P        | -        | -        | Y        | Y    | N    | N      | 闭合校验边界待补                                                                                        |

## 6. Layer 模块

| 类                 | 稳定性       | 导入 | 类型 | 正常测试 | 边界测试 | 生命周期 | 回调类型 | 转换规则 | 文档 | 示例 | 浏览器 | 备注                                                                                                  |
| ------------------ | ------------ | ---- | ---- | -------- | -------- | -------- | -------- | -------- | ---- | ---- | ------ | ----------------------------------------------------------------------------------------------------- |
| `VectorLayer`      | stable-beta  | Y    | P    | Y        | P        | Y        | P        | Y        | Y    | Y    | N      | source 门面职责明确；properties 泛型已完成（B 批次）                                                  |
| `TileLayer`        | stable-beta  | Y    | P    | N        | N        | N        | -        | P        | Y    | N    | N      | 无测试引用                                                                                            |
| `ImageLayer`       | stable-beta  | Y    | P    | Y        | N        | N        | -        | P        | Y    | N    | N      | 静态/loader/WMS 三分支已测，新增 WMS 单图分支(getImageWMSSource)                                      |
| `WMSLayer`         | stable-beta  | Y    | P    | N        | N        | N        | -        | P        | Y    | N    | N      | 无测试引用，依赖外部 WMS 服务                                                                         |
| `WMTSLayer`        | stable-beta  | Y    | P    | N        | N        | N        | -        | P        | Y    | N    | N      | 无测试引用，依赖外部 WMTS 服务                                                                        |
| `XYZLayer`         | stable-beta  | Y    | P    | N        | N        | N        | -        | P        | Y    | N    | N      | 无测试引用                                                                                            |
| `TdtLayer`         | experimental | Y    | P    | Y        | N        | N        | -        | P        | Y    | N    | N      | 新增构造(vec/w)与 tdtType/url-token 测试（测试内注入 window+MapToken.tdt）                            |
| `GaodeLayer`       | experimental | Y    | P    | N        | N        | N        | -        | P        | Y    | N    | N      | 依赖高德服务，仅被间接引用一次                                                                        |
| `LayerGroup`       | stable-beta  | Y    | P    | Y        | P        | Y        | -        | Y        | Y    | N    | N      | 组内增删与 groupId 同步已测                                                                           |
| `VectorTileLayer`  | experimental | Y    | P    | Y        | N        | N        | -        | P        | Y    | N    | N      | 新增构造(params/VectorTileSource 实例)与 getVectorTileSource 测试                                     |
| `HeatmapLayer`     | experimental | Y    | P    | Y        | N        | N        | -        | P        | Y    | N    | N      | 新增构造(params/VectorSource 实例)+OL Heatmap 层断言；canvas 依赖用 node 内 document/canvas stub 跑通 |
| `VectorImageLayer` | experimental | Y    | P    | Y        | N        | N        | -        | P        | Y    | N    | N      | 新增构造(params/VectorSource 实例)与 getVectorSource 测试                                             |

> `BaseLayer` 为内部基类，未从根入口导出，不单独验收，其能力随各子类一并覆盖。

## 7. Source 模块

| 类                     | 稳定性        | 导入 | 类型 | 正常测试 | 边界测试 | 生命周期 | 回调类型 | 转换规则 | 文档 | 示例 | 浏览器 | 备注                                                                                        |
| ---------------------- | ------------- | ---- | ---- | -------- | -------- | -------- | -------- | -------- | ---- | ---- | ------ | ------------------------------------------------------------------------------------------- |
| `Source`               | stable-beta   | Y    | P    | Y        | N        | Y        | -        | P        | Y    | N    | N      | 基类能力已直接测试：构造/属性/get-set/unset/dispose 幂等                                    |
| `VectorSource`         | stable-beta   | Y    | P    | Y        | P        | Y        | P        | Y        | Y    | Y    | N      | Feature 唯一状态源，loader 类型待精确                                                       |
| `ImageSource`          | stable-beta   | Y    | P    | N        | N        | N        | -        | P        | Y    | N    | N      | 无测试引用                                                                                  |
| `TileSource`           | stable-beta   | Y    | P    | N        | N        | N        | P        | P        | Y    | N    | N      | 子类较多，基类缺直接测试                                                                    |
| `XYZSource`            | stable-beta   | Y    | P    | N        | N        | N        | -        | P        | Y    | N    | N      | 无测试引用                                                                                  |
| `WMTSSource`           | stable-beta   | Y    | P    | N        | N        | N        | -        | P        | Y    | N    | N      | 无测试引用                                                                                  |
| `TileWMSSource`        | stable-beta   | Y    | P    | Y        | P        | N        | -        | P        | Y    | N    | N      | 已有参数 set/update 回归                                                                    |
| `VectorTileSource`     | experimental  | Y    | P    | Y        | N        | N        | -        | P        | Y    | N    | N      | 新增构造(url+format)与 overlaps 切换测试                                                    |
| `OGCVectorTileSource`  | experimental  | Y    | P    | Y        | N        | N        | -        | P        | Y    | N    | N      | 新增构造(url+format)与 overlaps 测试；tileset 元数据异步拉取依赖网络                        |
| `DataTileSource`       | experimental  | Y    | P    | Y        | N        | N        | P        | P        | Y    | N    | N      | 新增构造(loader)测试；loader 类型待精确                                                     |
| `ImageTileSource`      | experimental  | Y    | P    | Y        | P        | N        | P        | P        | Y    | N    | N      | 新增构造(url)与 setUrl 守卫测试；url getter 类型待精确                                      |
| `TileDebugSource`      | experimental  | Y    | P    | Y        | N        | N        | -        | P        | Y    | N    | N      | 新增构造(默认参数)测试；调试用途                                                            |
| `UTFGridSource`        | experimental  | Y    | P    | Y        | P        | N        | P        | P        | Y    | N    | N      | 新增构造(url)与 forDataAtCoordinateAndResolution 守卫测试；DOM 依赖用 XHR stub 在 node 跑通 |
| `UrlTileSource`        | compatibility | Y    | P    | Y        | P        | N        | -        | P        | Y    | N    | N      | 新增构造(url)与 setUrls/setUrl 守卫测试；legacy 目录，仅为历史兼容                          |
| `TileImageSource`      | compatibility | Y    | P    | Y        | P        | N        | -        | P        | Y    | N    | N      | 新增构造(url)与 setUrl 守卫测试；legacy 目录，仅为历史兼容                                  |
| `OSMSource`            | experimental  | Y    | P    | Y        | N        | N        | -        | P        | Y    | N    | N      | 新增构造(默认/自定义 maxZoom+url)测试                                                       |
| `BingMapsSource`       | experimental  | Y    | P    | Y        | N        | N        | -        | P        | Y    | N    | N      | 新增构造(key+imagerySet)测试                                                                |
| `TileJSONSource`       | experimental  | Y    | P    | Y        | N        | N        | -        | P        | Y    | N    | N      | 新增构造(url)测试；XHR 依赖用 node 内 XHR stub 跑通                                         |
| `TileArcGISRestSource` | experimental  | Y    | P    | Y        | N        | N        | -        | P        | Y    | N    | N      | 新增构造(url)测试                                                                           |
| `ClusterSource`        | experimental  | Y    | P    | Y        | N        | N        | -        | P        | Y    | N    | N      | 新增构造(VectorSource 实例/OL 原生实例)与 getClusteredSource 测试                           |
| `ImageWMSSource`       | experimental  | Y    | P    | Y        | N        | N        | -        | P        | Y    | N    | N      | 新增构造(url+params)测试；经 ImageLayer WMS 分支接入                                        |

## 8. Interaction 模块

| 类                  | 稳定性       | 导入 | 类型 | 正常测试 | 边界测试 | 生命周期 | 回调类型 | 转换规则 | 文档 | 示例 | 浏览器 | 备注                                 |
| ------------------- | ------------ | ---- | ---- | -------- | -------- | -------- | -------- | -------- | ---- | ---- | ------ | ------------------------------------ |
| `Draw`              | stable-beta  | Y    | P    | Y        | P        | Y        | Y        | Y        | Y    | Y    | N      | abort 与 clearFeatures 语义已明确    |
| `Modify`            | stable-beta  | Y    | P    | Y        | Y        | Y        | Y        | Y        | Y    | Y    | N      | 快照恢复已测                         |
| `Select`            | stable-beta  | Y    | P    | Y        | P        | Y        | Y        | Y        | Y    | Y    | N      | filter/layers 边界已修复             |
| `Measure`           | stable-beta  | Y    | P    | Y        | P        | Y        | Y        | Y        | Y    | Y    | N      | 已有 typed event map 与 DOM 生命周期 |
| `DragBox`           | experimental | Y    | P    | P        | N        | P        | Y        | -        | Y    | N    | N      | 需真实指针事件验证                   |
| `DragPan`           | experimental | Y    | P    | P        | N        | P        | Y        | -        | Y    | N    | N      | 需真实指针事件验证                   |
| `DragZoom`          | experimental | Y    | P    | N        | N        | N        | Y        | -        | Y    | N    | N      | 无测试引用                           |
| `InteractionExtent` | experimental | Y    | P    | N        | N        | N        | Y        | -        | Y    | N    | N      | 无测试引用                           |
| `Link`              | experimental | Y    | P    | N        | N        | N        | Y        | -        | Y    | N    | N      | 无测试引用，需多地图环境             |
| `KeyboardZoom`      | experimental | Y    | P    | N        | N        | N        | Y        | -        | Y    | N    | N      | 无测试引用                           |
| `MouseWheelZoom`    | experimental | Y    | P    | N        | N        | N        | Y        | -        | Y    | N    | N      | 无测试引用，依赖滚轮事件             |
| `DoubleClickZoom`   | experimental | Y    | P    | N        | N        | N        | Y        | -        | Y    | N    | N      | 无测试引用，依赖双击事件             |

> `Interaction` 基类未从根入口导出，其 `remove()`/`dispose()` 协议经各子类验收。

## 9. Control 模块

| 类           | 稳定性       | 导入 | 类型 | 正常测试 | 边界测试 | 生命周期 | 回调类型 | 转换规则 | 文档 | 示例 | 浏览器 | 备注                     |
| ------------ | ------------ | ---- | ---- | -------- | -------- | -------- | -------- | -------- | ---- | ---- | ------ | ------------------------ |
| `Zoom`       | stable-beta  | Y    | P    | N        | N        | N        | -        | P        | Y    | N    | N      | 无测试引用，DOM 依赖强   |
| `FullScreen` | experimental | Y    | P    | N        | N        | N        | -        | P        | Y    | N    | N      | 无测试引用，需真实浏览器 |

## 10. Basic 模块

| 类       | 稳定性        | 导入 | 类型 | 正常测试 | 边界测试 | 生命周期 | 回调类型 | 转换规则 | 文档 | 示例 | 浏览器 | 备注                                                    |
| -------- | ------------- | ---- | ---- | -------- | -------- | -------- | -------- | -------- | ---- | ---- | ------ | ------------------------------------------------------- |
| `Lnglat` | compatibility | Y    | Y    | Y        | Y        | -        | -        | Y        | Y    | Y    | N      | 已废弃，推荐 `LngLat` 别名                              |
| `LngLat` | stable-beta   | Y    | Y    | Y        | Y        | -        | -        | Y        | P    | Y    | N      | `Lnglat` 的推荐别名（文档见 `Lnglat` 页）               |
| `Pixel`  | stable-beta   | Y    | Y    | Y        | P        | -        | -        | Y        | Y    | N    | N      | 固定 tuple 已收敛                                       |
| `Size`   | stable-beta   | Y    | Y    | Y        | P        | -        | -        | Y        | Y    | N    | N      | 固定 tuple 已收敛                                       |
| `Extent` | stable-beta   | Y    | Y    | Y        | P        | -        | -        | Y        | Y    | N    | N      | 固定四元组已收敛                                        |
| `Color`  | stable-beta   | Y    | Y    | Y        | P        | -        | -        | -        | Y    | N    | N      | 颜色格式边界待补                                        |
| `Style`  | stable-beta   | Y    | Y    | Y        | P        | -        | P        | -        | Y    | P    | N      | 回调签名已精确化，返回值数组收窄已测                    |
| `Popup`  | stable-beta   | Y    | P    | Y        | P        | Y        | Y        | Y        | Y    | Y    | N      | Manager 与 typed payload 已测；Overlay 定位需真实浏览器 |

## 11. Util 模块

| 类          | 稳定性       | 导入 | 类型 | 正常测试 | 边界测试 | 生命周期 | 回调类型 | 转换规则 | 文档 | 示例 | 浏览器 | 备注                          |
| ----------- | ------------ | ---- | ---- | -------- | -------- | -------- | -------- | -------- | ---- | ---- | ------ | ----------------------------- |
| `Format`    | stable-beta  | Y    | P    | Y        | P        | -        | -        | Y        | Y    | P    | N      | KML/WKT/GeoJSON 选项矩阵待补  |
| `ProjUtil`  | stable-beta  | Y    | P    | N        | N        | -        | -        | P        | Y    | N    | N      | 无测试引用，坐标转换依赖它    |
| `MapToken`  | experimental | Y    | P    | N        | N        | -        | -        | -        | Y    | N    | N      | 天地图 token 全局配置，无测试 |
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

1. **10 个公开类的测试引用已全部补齐**（2026-08-30 完成）：`DataTileSource`、`ImageTileSource`、`OGCVectorTileSource`、`Source`（基类，经最小具体子类直接测试）、`TdtLayer`、`TileDebugSource`、`TileImageSource`、`UrlTileSource`、`UTFGridSource`、`VectorTileSource`。新增 6 个测试文件（27 用例）覆盖构造（最小合法参数）、公共 getter、生命周期 `dispose` 与输入守卫；`UTFGridSource` 的 DOM 依赖用 node 内的 XHR stub 跑通，`TdtLayer` 在测试内注入 `window` + `MapToken.tdt`。真实浏览器验证仍为空（见第 3 项）。
2. **29 个内部 helper 已显式标记 `@internal`**（16 个 `handleGet*Params` 函数 + 13 个 `DEFAULT_*_PARAMS` 常量；较原计划 27 因新增 `ImageStaticSource` 多 2 个）。经审计回溯确认：这些符号原本即经 `export type *` 仅作类型透传，从未进入公共入口（不在 `dist/index.d.ts` 运行时导出、也不在 bundle 的 `export {}` 块中）；审计脚本 `getExportsOfModule` 对 `export type *` 的已知行为曾误报为"泄露"。现已在源码加 `@internal` 并在 `audit-public-api.mjs` 中排除 `@internal` 符号，公共导出计数由 152 降为 122（59 类 / 0 公开函数 / 11 公开常量）。`TILE_SOURCE_EVENT_TYPES` 仍待确认是否为公共契约（暂留公共，供消费者 `import type` 引用瓦片事件类型）。
3. **全部类的浏览器验证为空**：`Map`、`Draw`、`Modify`、`Select`、`Measure`、`Popup` 等强 DOM 依赖类均未经真实浏览器验证。
4. **properties 泛型已收敛**（2026-08-30 完成 B 批次）：全仓 `Record<string, any>` 已清零，`get<Value>(key): Value` / `getProperties<P>()` / `setProperties(properties: Partial<P>)` 均泛型化；涉及 properties 的类的“类型”字段可据实际情况逐步标记为完成。
5. **typed event map 已全量完成**（2026-08-30）：Map/Popup/Control 与全部 12 个 Interaction 子类（`Draw`/`Modify`/`Select`/`Measure`/`DragBox`/`DragPan`/`DragZoom`/`InteractionExtent`/`Link`/`KeyboardZoom`/`MouseWheelZoom`/`DoubleClickZoom`）均接入 `Event<OMapXxxEventMap>`，`on/once` 回调收到精确事件对象；Interaction 桥接层 `transform/callback` 的 3 处 `any` 为泛型分发器负载边界，属刻意保留。
6. **逐类 API 页面已逐类核对**（2026-08-30）：以 `audit:api` 导出清单为准，对 `docs/api/<group>/` 下 70 个实际页面逐类确认——全部公开类（除 `LngLat` 别名文档见 `Lnglat` 页、`OMapError` 无独立页）均已有独立 API 页面，矩阵“文档”列已统一标记为 Y；页面由 `scripts/gen-api-docs.mjs` 从源码自动提取，签名与代码始终一致，不会随重构腐化。
7. **新增 9 个公开类补齐 Layer/Source 缺口**（2026-08-30）：经核查 OL 已提供、omap 尚未包装，用户确认新增 P1+P2 共 9 类并全部落地、通过四道门禁——Source 侧 `OSMSource`/`BingMapsSource`/`TileJSONSource`/`TileArcGISRestSource`/`ClusterSource`/`ImageWMSSource`；Layer 侧 `VectorTileLayer`(修复矢量瓦片此前无渲染图层)/`HeatmapLayer`/`VectorImageLayer`；`ImageLayer` 同步新增 WMS 单图分支与 `getImageWMSSource` 收窄 getter。新增 5 个测试文件（19 用例）：`tests/source/osm-bing-arcgis-source.test.ts`、`tests/source/tilejson-source.test.ts`(node 内 XHR stub)、`tests/source/cluster-imagewms-source.test.ts`、`tests/layer/heatmap-layer.test.ts`(node 内 document/canvas stub)、`tests/layer/vector-tile-vector-image-layer.test.ts`；并扩展 `tests/layer/layer-source-wrapper.test.ts` 覆盖 ImageLayer WMS 分支。全量 **32 文件 / 187 用例 passed** + 7 happy-dom 环境 error（基线一致，非回归）；`audit:api` 重跑无 `tests:0` 公开类。

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
