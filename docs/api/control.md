# Control

Control 模块提供 OpenLayers 控件的强类型包装，并遵循统一的生命周期协议：

- `remove()`：从当前地图解除挂载，控件实例仍保留，可再次添加。
- `dispose()`：永久释放事件与原生资源，重复调用安全。

> **稳定性**：`Control` 为内部基类（文档辅助，不单独验收）；`Zoom`、`FullScreen` 当前为 `stable-beta`。

```ts
import { FullScreen, Map, Zoom } from 'openlayers-map-kit'

const map = new Map(target, { controls: [] })
const zoom = new Zoom()
const fullScreen = new FullScreen()

map.addControl(zoom)
map.addControl(fullScreen)
map.removeControl(zoom)
map.dispose()
```

Map 销毁时也会释放仍由其管理的控件；`remove()` 与 `dispose()` 可重复调用。

## Control（基类）

所有控件继承自 `Control<T, P>`。`T` 为原生 OpenLayers Control 类型，`P` 为控件属性字典类型（默认 `PropertiesType`，传入更具体结构后 `getProperties()` 按该结构推导）。

### 构造

```ts
new Control(type: OMapControlTypeType)
```

- `type`：控件类型标识，由子类在构造时固定写入（如 `'Zoom'`、`'FullScreen'`）。

### 属性

| 属性       | 类型                  | 说明                                           |
| ---------- | --------------------- | ---------------------------------------------- |
| `id`       | `OMapControlIdType`   | 控件 ID，由子类在传入 `id` 构造重载时赋值      |
| `type`     | `OMapControlTypeType` | 控件类型标识                                   |
| `_control` | `T`                   | 底层原生 OpenLayers 控件实例（不建议直接依赖） |
| `events`   | `Event`               | 控件事件管理器（见 Util / Event）              |

### 方法

| 方法            | 签名                               | 说明                                                                      |
| --------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| `getControl`    | `() => OMapControlCommonType`      | 获取原生 OpenLayers 控件实例                                              |
| `getId`         | `() => OMapControlIdType`          | 获取控件 ID                                                               |
| `getProperties` | `() => P`                          | 获取控件属性字典                                                          |
| `setProperties` | `(properties: Partial<P>) => void` | 合并写入属性（OpenLayers `setProperties` 为合并语义，允许只更新部分字段） |
| `setMap`        | `(map: Map \| null) => void`       | 设置/清空所属地图（通常由 `Map.addControl` 内部调用）                     |
| `remove`        | `() => void`                       | 从当前地图解除挂载，控件可再次添加                                        |
| `dispose`       | `() => void`                       | 永久释放事件与原生资源                                                    |
| `isDisposed`    | `() => boolean`                    | 是否已永久释放                                                            |

## Zoom

缩放控件，提供放大/缩小按钮。`DEFAULT_ZOOM_OPTIONS` 给出默认按钮文案、动画时长与缩放步长。

### 构造

```ts
new Zoom(options?: OMapControlZoomOptionsType)
new Zoom(id: OMapControlIdType, options?: OMapControlZoomOptionsType)
```

- 仅传 `options` 时自动生成 ID；先传 `id` 再传 `options` 可指定控件 ID。
- `options`：`OMapControlZoomOptionsType`（继承自 OpenLayers `ZoomOptions`），默认值见 `DEFAULT_ZOOM_OPTIONS`。

### 默认配置 `DEFAULT_ZOOM_OPTIONS`

| 字段               | 默认            | 说明             |
| ------------------ | --------------- | ---------------- |
| `duration`         | `250`           | 动画时长（ms）   |
| `className`        | `'ol-zoom'`     | 容器类名         |
| `zoomInLabel`      | `'+'`           | 放大按钮文本     |
| `zoomOutLabel`     | `'-'`           | 缩小按钮文本     |
| `zoomInTipLabel`   | `'放大'`        | 放大按钮提示     |
| `zoomOutTipLabel`  | `'缩小'`        | 缩小按钮提示     |
| `zoomInClassName`  | `'ol-zoom-in'`  | 放大按钮类名     |
| `zoomOutClassName` | `'ol-zoom-out'` | 缩小按钮类名     |
| `delta`            | `1`             | 单次缩放层级步长 |

## FullScreen

全屏切换控件。`DEFAULT_FULLSCREEN_OPTIONS` 给出默认类名与提示。

### 构造

```ts
new FullScreen(options?: OMapControlFullScreenOptionsType)
new FullScreen(id: OMapControlIdType, options?: OMapControlFullScreenOptionsType)
```

- 构造重载规则与 `Zoom` 一致。
- `options`：`OMapControlFullScreenOptionsType`（继承自 OpenLayers `FullScreenOptions`）。

### 默认配置 `DEFAULT_FULLSCREEN_OPTIONS`

| 字段                | 默认                     | 说明                       |
| ------------------- | ------------------------ | -------------------------- |
| `className`         | `'ol-full-screen'`       | 容器类名                   |
| `activeClassName`   | `'ol-full-screen-true'`  | 激活态类名                 |
| `inactiveClassName` | `'ol-full-screen-false'` | 非激活态类名               |
| `tipLabel`          | `'全屏'`                 | 提示文案                   |
| `keys`              | `false`                  | 是否启用键盘切换（`f` 键） |
