# Util

Util 模块提供 SDK 内部与公开可用的通用基础设施：事件管理、格式转换、投影换算、token 管理与统一错误类型。

```ts
import {
  Event,
  Format,
  OMapFormatType,
  ProjUtil,
  MapToken,
  OMapError,
  OMapErrorCode
} from 'openlayers-map-kit'
```

> **稳定性**：`Event`、`Format`、`ProjUtil`、`MapToken`、`OMapError`/`OMapErrorCode` 为 `stable-beta`；`LnglatUtil` 为辅助工具；`Disposable`/`Removable` 为接口约定（不单独验收）。

## Event

支持 typed event map 的事件注册、单次监听、移除与销毁。泛型 `Events` 描述「事件名 → 参数元组」的映射，编译期即可校验回调参数。

### 构造

```ts
new Event<Events extends Record<string, readonly unknown[]>>(target?: unknown)
```

- `target`：绑定对象，仅用于生成事件 ID 命名空间，可选。

### 方法

| 方法            | 签名                                                                             | 说明                                     |
| --------------- | -------------------------------------------------------------------------------- | ---------------------------------------- |
| `on`            | `<K>(type: K, callback: (...args: Events[K]) => void, unlisten?) => EventIdType` | 订阅事件，返回用于移除的 ID              |
| `once`          | `<K>(type: K, callback: (...args: Events[K]) => void, unlisten?) => EventIdType` | 单次订阅，触发后自动移除                 |
| `emit`          | `<K>(type: K, ...args: Events[K]) => this`                                       | 触发事件，依次执行订阅回调               |
| `remove`        | `(id: EventIdType) => this`                                                      | 按 ID 移除单个订阅（未找到会 warn）      |
| `off`           | `<K>(type?: K) => this`                                                          | 传类型移除该类型所有订阅；不传则清空全部 |
| `getEventById`  | `(id: EventIdType) => EventItem \| undefined`                                    | 按 ID 查询订阅项                         |
| `get`           | `<K>(type: K) => ReadonlyArray<EventItem>`                                       | 获取某类型的全部订阅                     |
| `listenerCount` | `<K>(type: K) => number`                                                         | 某类型的订阅数量                         |
| `dispose`       | `() => void`                                                                     | 清空全部订阅（等效于 `off()`）           |
| `isDisposed`    | `() => boolean`                                                                  | 是否已释放                               |

> 回调内部抛错会被捕获并 `error_` 上报，不会中断其他订阅。销毁后调用 `on/once` 会触发 `OMapError`（事件管理器已释放）。

## Format

GeoJSON、KML、WKT 的统一 Feature 读写入口。根据 `type` 构造底层 OL 格式实例，并向外暴露强类型的读写方法（统一接收 OMap 的 `BasicFeature`）。

### 构造

```ts
new Format(type: typeof OMapFormatType.GeoJSON, options: OMapFormatGeoJSONOptions)
new Format(type: typeof OMapFormatType.WKT, options?: OMapFormatWKTOptions)
new Format(type: typeof OMapFormatType.KML, options?: OMapFormatKMLOptions)
```

- 非法 `type` 或缺失时通过 `error_` 报错并提前返回（实例不可用）。
- `options` 会与各类型的默认选项合并（`getDefaultOptionsByType`）。

### 方法

| 方法                  | 签名                                                                             | 说明                        |
| --------------------- | -------------------------------------------------------------------------------- | --------------------------- |
| `readFeature`         | `(source: unknown, options?: OMapFormatReadFeatureOptionsType) => unknown`       | 读取单个 Feature            |
| `readFeatures`        | `(source: unknown, options?: OMapFormatReadFeatureOptionsType) => unknown`       | 读取 Feature 数组           |
| `writeFeature`        | `(feature: BasicFeature, options?: OMapFormatWriteFeatureOptionsType) => string` | 序列化为字符串              |
| `writeFeatureObject`  | `(feature: BasicFeature, options?) => unknown`                                   | 序列化为对象                |
| `writeFeatures`       | `(features: BasicFeature[], options?) => string`                                 | 批量序列化字符串            |
| `writeFeaturesObject` | `(features: BasicFeature[], options?) => unknown`                                | 批量序列化为对象            |
| `writeFeaturesNode`   | `(features: BasicFeature[], options?) => unknown`                                | 序列化为 DOM Node（KML 等） |

### 类型与默认值

- `OMapFormatType`：`'GeoJSON' | 'WKT' | 'KML'`。
- `OMapFormatGeoJSONOptions`：`dataProjection`（必填）、`featureProjection?`、`geometryName?`、`extractGeometryName`、`featureClass?`。
- `OMapFormatWKTOptions`：`splitCollection?`。
- `OMapFormatKMLOptions`：`extractStyles`、`showPointNames`、`defaultStyle?`（Style 数组）、`writeStyles`、`crossOrigin`、`iconUrlFunction?`。
- `OMapFormatWriteFeatureOptionsType`：`dataProjection?`、`featureProjection?`、`rightHanded?`、`decimals?`；默认 `DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS = {}`。

## ProjUtil

经纬度 ↔ 投影坐标换算工具。输入支持 `Lnglat` 或 `[lng, lat]` 数组；缺省投影为 `EPSG:3857`。

| 方法         | 签名                                                                                 | 说明                                                                 |
| ------------ | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `fromLonLat` | `(coordinate: Lnglat \| number[], projection?: OMapProjType) => Lnglat \| undefined` | 经纬度转指定投影坐标；`coordinate` 为空时 `warn_` 并返回 `undefined` |
| `toLonLat`   | `(coordinate: Lnglat \| number[], projection?: OMapProjType) => Lnglat \| undefined` | 指定投影坐标转经纬度；同上边界处理                                   |

> 两个方法均返回 `Lnglat`（包装 `[lng, lat]`），便于继续链式几何计算；空入参不会产生异常，仅告警并返回 `undefined`。

## MapToken

地图服务 token 管理（当前支持天地图 `tdt`）。写入时同步持久化到 `window.OMapToken`，便于多实例共享。

```ts
import { MapToken } from 'openlayers-map-kit'
MapToken.tdt = '你的天地图密钥'
```

- `MapToken.tdt: string | null`：天地图 token，赋值即生效并写入 `window.OMapToken`。
- 其余地图厂商扩展可复用同一 `MapToken` 命名空间（`MapTokenName = 'OMapToken'`）。

## LnglatUtil

经纬度类型判断辅助。

| 方法       | 签名                                    | 说明                                 |
| ---------- | --------------------------------------- | ------------------------------------ |
| `isLnglat` | `(lnglat: unknown) => lnglat is Lnglat` | 判断是否为 `Lnglat` 实例（类型谓词） |

## Disposable / Removable

公开的生命周期接口约定（被 Control、Event 等实现），供消费者以统一方式释放资源。

| 接口         | 方法                                        | 说明                                 |
| ------------ | ------------------------------------------- | ------------------------------------ |
| `Disposable` | `dispose(): void` / `isDisposed(): boolean` | 永久释放监听器与原生资源，可重复调用 |
| `Removable`  | `remove(): void`                            | 从挂载目标摘除，可随后重新挂载       |

## OMapError / OMapErrorCode

SDK 统一错误类型与稳定错误码，便于调用方按 `code` 区分处理。

```ts
import { OMapError, OMapErrorCode } from 'openlayers-map-kit'

throw new OMapError('参数非法', OMapErrorCode.InvalidParameter)
```

- `OMapErrorCode.Runtime = 'OMAP_RUNTIME_ERROR'`
- `OMapErrorCode.InvalidParameter = 'OMAP_INVALID_PARAMETER'`
- `OMapError extends Error`，构造签名：`new OMapError(message: string, code?: OMapErrorCodeType)`，`code` 默认 `Runtime`。

由 Format、Source、Layer 或 Interaction 接收的原生 OpenLayers Feature 会经过统一 resolver，保持 OMap wrapper 身份稳定。
