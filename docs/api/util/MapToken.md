# MapToken

> 稳定性：`stable-beta` — 全局配置对象（非类）

天地图服务的 token 配置对象。设置后，需要 token 的内置服务（如天地图底图）会从这里取值。

## 引入

```ts
import { MapToken } from 'openlayers-map-kit'
```

源码：`src/module/util/MapToken/index.ts`

## 属性

| 属性  | 类型             | 说明                            |
| ----- | ---------------- | ------------------------------- |
| `tdt` | `string \| null` | 天地图服务 token，默认为 `null` |

## 示例

```ts
import { MapToken, TdtLayer, TdtLayerType } from 'openlayers-map-kit'

// 使用天地图图层前先配置 token
MapToken.tdt = '你的天地图 token'

const layer = new TdtLayer({ type: TdtLayerType.Vec })
map.addLayer(layer)
```

## 说明与注意点

- 赋值会被 Proxy 拦截并同步写入 `window.OMapToken`，便于同页面内的多处代码共享同一份配置。
- **`MapToken` 不会在初始化时从 `window.OMapToken` 读回**，字段初值始终为 `null`。页面刷新或新开页面后需要重新赋值。
- token 属于凭证信息，请勿硬编码在公开的源码仓库或前端产物中，建议由后端下发或走运行时配置注入。
- 目前仅内置了天地图（`tdt`）一项；其他需要 token 的服务请自行在请求地址中携带。

## 相关

- 消费方：[TdtLayer](../layer/TdtLayer.md)
- 底图类型：[TdtLayerType](../layer/TdtLayerType.md)

<!-- 本页为手工维护（MapToken 是 Proxy 对象，非类），不由 scripts/gen-api-docs.mjs 生成 -->
