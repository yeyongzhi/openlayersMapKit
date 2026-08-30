# Event

> 稳定性：`internal` — 基类，不直接从包入口导出

事件基类，提供类型化的 `on` / `once` / `un` 订阅接口。

## 引入

```ts
import { Event } from 'omap'
```

## 构造

```ts
new Event(target?: unknown)
```

## 方法

| 方法                                                                                          | 说明                                                                          |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `dispose(): void`                                                                             | Permanently releases listeners and native resources. Safe to call repeatedly. |
| `emit(type: K, ...args: Events[K]): this`                                                     | —                                                                             |
| `get(type: K): readonly EventItem<Events[K]>[]`                                               | —                                                                             |
| `getEventById(id: string): EventItem<readonly unknown[]> \| undefined`                        | —                                                                             |
| `isDisposed(): boolean`                                                                       | Reports whether permanent release has already happened.                       |
| `listenerCount(type: K): number`                                                              | —                                                                             |
| `off(type?: K): this`                                                                         | —                                                                             |
| `on(type: K, callback: (...args: Events[K]) => void, unlisten?: OMapEventsKeyType): string`   | —                                                                             |
| `once(type: K, callback: (...args: Events[K]) => void, unlisten?: OMapEventsKeyType): string` | —                                                                             |
| `remove(id: string): this`                                                                    | —                                                                             |

## 说明与注意点

- 不直接从包入口导出，作为各具备事件能力类的内部基类存在。
- 订阅返回监听标识，可用于精确取消单个监听。

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
