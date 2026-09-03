# Zoom

> 稳定性：`stable-beta`

缩放控件，在地图上渲染放大与缩小按钮。

## 引入

```ts
import { Zoom } from 'openlayers-map-kit'
```

源码：`src/module/control/Zoom/index.ts`

## 构造

```ts
new Zoom(options?: Options)
new Zoom(id: OMapControlIdType, options?: Options)
```

## 继承成员

继承链：Zoom → Control

### 继承自 Control

| 成员                                                                            | 说明                                                                                                                                             |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dispose(): void`                                                               | 永久释放控件事件与原生资源。重复调用是安全的。                                                                                                   |
| `events: Event<OMapControlEventMap>`                                            | 控件事件                                                                                                                                         |
| `getControl(): T`                                                               | 获取控制实例                                                                                                                                     |
| `getId(): OMapControlIdType`                                                    | 获取控制ID                                                                                                                                       |
| `getProperties(): P`                                                            | 获取控件属性字典。                                                                                                                               |
| `id: OMapControlIdType`                                                         | —                                                                                                                                                |
| `isDisposed(): boolean`                                                         | Reports whether permanent release has already happened.                                                                                          |
| `on(type: "change" \| "error", callback: (event: BaseEvent) => void): string`   | 订阅控件原生事件。 返回的订阅 id 可用于 {@link un} 精准退订；退订时会自动解绑底层 OpenLayers 监听， {@link dispose} 时统一释放，不会残留监听器。 |
| `once(type: "change" \| "error", callback: (event: BaseEvent) => void): string` | 订阅控件原生事件，回调触发一次后自动退订（含底层 OpenLayers 监听）。                                                                             |
| `remove(): void`                                                                | 从当前地图解除挂载，控件仍可再次添加。                                                                                                           |
| `setId(id: OMapControlIdType): void`                                            | 设置控制ID                                                                                                                                       |
| `setMap(map: Map \| null): void`                                                | —                                                                                                                                                |
| `setProperties(properties: Partial<P>): void`                                   | 合并写入控件属性。OpenLayers 的 `setProperties` 为合并语义， 因此入参按 `Partial<P>` 处理，允许只更新部分字段。                                  |
| `type: OMapControlTypeType`                                                     | 控件类型                                                                                                                                         |
| `un(id: string): void`                                                          | 按订阅 id 退订控件事件，并解绑其对应的底层 OpenLayers 监听。                                                                                     |

## 说明与注意点

- 两种构造：`new Zoom(options)` 与 `new Zoom(id, options)`，前者由内部自动分配 id。
- 未显式指定的选项会与默认配置合并，因此只需传入需要覆盖的字段。
- 暂时移除用 `remove()`，彻底释放用 `dispose()`。

## 示例

```ts
const zoom = new Zoom('main-zoom', { zoomInTipLabel: '放大' })

map.addControl(zoom)
zoom.remove() // 暂时卸载，仍可再次 addControl
zoom.dispose() // 永久释放
```

## 相关

- 基类：[Control](./Control.md)
- 示例：[控件用法](/examples/controls)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
