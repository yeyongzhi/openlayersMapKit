# Control

> 稳定性：`internal` — 基类，不直接从包入口导出

控件基类，封装 id、类型、属性字典、事件订阅与生命周期管理。

## 引入

```ts
import { Control } from 'omap'
```

## 构造

```ts
new Control(type: OMapControlTypeType)
```

## 属性

| 属性                                 | 说明     |
| ------------------------------------ | -------- |
| `events: Event<OMapControlEventMap>` | 控件事件 |
| `id: OMapControlIdType`              | —        |
| `type: OMapControlTypeType`          | 控件类型 |

## 方法

| 方法                                                                            | 说明                                                                                                                                             |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dispose(): void`                                                               | 永久释放控件事件与原生资源。重复调用是安全的。                                                                                                   |
| `getControl(): T`                                                               | 获取控制实例                                                                                                                                     |
| `getId(): OMapControlIdType`                                                    | 获取控制ID                                                                                                                                       |
| `getProperties(): P`                                                            | 获取控件属性字典。                                                                                                                               |
| `isDisposed(): boolean`                                                         | Reports whether permanent release has already happened.                                                                                          |
| `on(type: "change" \| "error", callback: (event: BaseEvent) => void): string`   | 订阅控件原生事件。 返回的订阅 id 可用于 {@link un} 精准退订；退订时会自动解绑底层 OpenLayers 监听， {@link dispose} 时统一释放，不会残留监听器。 |
| `once(type: "change" \| "error", callback: (event: BaseEvent) => void): string` | 订阅控件原生事件，回调触发一次后自动退订（含底层 OpenLayers 监听）。                                                                             |
| `remove(): void`                                                                | 从当前地图解除挂载，控件仍可再次添加。                                                                                                           |
| `setId(id: OMapControlIdType): void`                                            | 设置控制ID                                                                                                                                       |
| `setMap(map: Map \| null): void`                                                | —                                                                                                                                                |
| `setProperties(properties: Partial<P>): void`                                   | 合并写入控件属性。OpenLayers 的 `setProperties` 为合并语义， 因此入参按 `Partial<P>` 处理，允许只更新部分字段。                                  |
| `un(id: string): void`                                                          | 按订阅 id 退订控件事件，并解绑其对应的底层 OpenLayers 监听。                                                                                     |

## 说明与注意点

- 不直接从包入口导出，仅作为 [`Zoom`](./Zoom.md)、[`FullScreen`](./FullScreen.md) 的基类存在。
- `remove()` 从当前地图解除挂载，控件仍可再次添加；`dispose()` 为永久释放，释放后不可再用。
- `isDisposed()` 用于判断是否已永久释放，`dispose()` 重复调用是安全的。

## 相关

- 子类：[FullScreen](./FullScreen.md)、[Zoom](./Zoom.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
