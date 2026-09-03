# OMap 0.1.0-beta.1 发布说明

`0.1.0-beta.1` 是 OMap 的首次公开 Beta，npm 包名为 `openlayers-map-kit`。该版本面向试用和集成验证，核心 API 已形成，但次要模块、兼容性与文档仍可能在后续 Beta 中继续调整。

## 安装

```bash
pnpm add openlayers-map-kit ol
```

```ts
import { GaodeLayer, GaodeLayerType, Map } from 'openlayers-map-kit'
```

`ol` 是 peer dependency。ESM 构建复用宿主项目的 OpenLayers 实例；UMD/CJS 构建内置 OpenLayers，可用于 CommonJS 或浏览器脚本场景。

## 主要能力

- 提供 Map、Layer、Source、Feature、Interaction、Control、Popup 和常用 GIS 工具的类型安全封装。
- 支持高德、天地图、XYZ、WMS、WMTS、矢量与静态图片等常见图层和数据源。
- 提供绘制、编辑、选择、测量、拖拽与缩放等常用地图交互。
- 提供 VitePress 指南、模块文档、逐类 API 参考和独立示例。

## 质量与兼容性

- 完整质量门禁覆盖类型检查、Lint、格式、测试覆盖率、构建、示例、文档与包结构。
- ESM、CommonJS/UMD 和 TypeScript 声明均通过消费者验证。
- 核心生命周期模块行覆盖率不低于 85%，分支覆盖率不低于 75%。
- 公开资源统一提供 `dispose()` 或等价清理能力，并覆盖重复挂载和销毁场景。

## 重要变更

- npm 包名确定为 `openlayers-map-kit`，构建产物同步命名为 `openlayers-map-kit.es.mjs` 和 `openlayers-map-kit.umd.cjs`。
- OpenLayers 调整为 ESM 构建的 peer dependency，避免宿主应用重复打包和多实例。
- 收紧公开 API、事件、坐标、回调和 properties 类型，并提供公开 `OMapError` 错误体系。
- 修复交互重复派发、监听器残留、默认参数污染、数据源包装丢失和销毁后仍可操作等问题。

完整变更请参阅[更新日志](https://github.com/yeyongzhi/openlayersMapKit/blob/main/CHANGELOG.md)。

## Beta 注意事项

- 不建议在未经验证的关键生产系统中直接使用。
- `Lnglat` 已废弃，请改用 `LngLat`；旧名称计划在下一个主版本移除。
- 部分此前从源码内部路径或桶文件导入的非公开运行时符号已不再从包根导出。
- 升级或试用发现问题时，请在 GitHub Issues 中附上版本、构建器、浏览器和最小复现。
