# Popup

> 稳定性：`stable-beta`

地图弹窗，对 OpenLayers Overlay 的封装，支持 DOM 内容、锚点定位与显隐控制。

## 引入

```ts
import { Popup } from 'openlayers-map-kit'
```

源码：`src/module/basic/Popup/index.ts`

## 构造

```ts
new Popup(params: OMapPopupParamsType<P>)
```

## 属性

| 属性                               | 说明               |
| ---------------------------------- | ------------------ |
| `content: string`                  | 弹窗内容(不一定有) |
| `events: Event<OMapPopupEventMap>` | 事件对象           |
| `id: OMapPopupIdType`              | Popup 的唯一ID     |
| `map: Map \| null`                 | 弹窗所属地图       |
| `properties: P`                    | 弹窗属性           |

## 方法

| 方法                                                                                                                                                                                               | 说明                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `dispose(): void`                                                                                                                                                                                  | 永久释放事件与原生 Overlay。重复调用是安全的。          |
| `getContent(): string`                                                                                                                                                                             | —                                                       |
| `getElement(): HTMLElement \| undefined`                                                                                                                                                           | —                                                       |
| `getId(): OMapPopupIdType`                                                                                                                                                                         | —                                                       |
| `getOffset(): Pixel`                                                                                                                                                                               | —                                                       |
| `getPopup(): Overlay`                                                                                                                                                                              | —                                                       |
| `getPosition(): LngLat \| undefined`                                                                                                                                                               | 获取弹窗位置                                            |
| `getPositioning(): PopupPositioningType \| undefined`                                                                                                                                              | —                                                       |
| `getProperties(): P`                                                                                                                                                                               | 获取弹窗属性                                            |
| `isDisposed(): boolean`                                                                                                                                                                            | Reports whether permanent release has already happened. |
| `on(type: "change:position" \| "change:positioning" \| "change:element" \| "change:offset" \| "change:content" \| "change:properties", callback: (event: OMapPopupEventTarget) => void): string`   | —                                                       |
| `once(type: "change:position" \| "change:positioning" \| "change:element" \| "change:offset" \| "change:content" \| "change:properties", callback: (event: OMapPopupEventTarget) => void): string` | —                                                       |
| `remove(): void`                                                                                                                                                                                   | 从当前地图解除挂载，Popup 仍可再次添加。                |
| `setContent(content: string): void`                                                                                                                                                                | —                                                       |
| `setElement(element: HTMLElement): void`                                                                                                                                                           | —                                                       |
| `setId(id: OMapPopupIdType): void`                                                                                                                                                                 | —                                                       |
| `setMap(map: Map \| null): void`                                                                                                                                                                   | —                                                       |
| `setOffset(offset: OMapPixelType): void`                                                                                                                                                           | —                                                       |
| `setPosition(coordinates: OMapCoordinateType): void`                                                                                                                                               | 设置弹窗位置                                            |
| `setPositioning(positioning: PopupPositioningType): void`                                                                                                                                          | —                                                       |
| `setProperties(properties: Partial<P>): void`                                                                                                                                                      | 设置弹窗属性                                            |
| `un(id: string): void`                                                                                                                                                                             | —                                                       |

## 说明与注意点

- 弹窗需通过 `Map.addPopup()` 挂载后才能显示。
- 定位方式见 [`PopupPositioning`](./PopupPositioning.md) 常量。
- 暂时隐藏用 `remove()`（可再次添加），不再使用时应彻底释放。

## 相关

- 挂载与生命周期：[Map](../core/Map.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
