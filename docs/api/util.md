# Util

| API                          | 用途                                                  |
| ---------------------------- | ----------------------------------------------------- |
| `Event`                      | 支持 typed event map 的事件注册、单次监听、移除和销毁 |
| `Format`                     | GeoJSON、KML、WKT 的统一 Feature 读写入口             |
| `ProjUtil`                   | 投影与坐标转换工具                                    |
| `LngLatUnit`                 | 经纬度单位常量                                        |
| `MapToken`                   | 地图服务 token 管理                                   |
| `Disposable`                 | `isDisposed()` 与 `dispose()` 的公共生命周期协议      |
| `OMapError`、`OMapErrorCode` | 可识别的 SDK 异常基类与稳定错误码                     |

```ts
import { Event, Format, OMapFormatType } from 'omap'

const events = new Event<{ ready: [payload: { count: number }] }>()
events.on('ready', ({ count }) => console.log(count))
events.emit('ready', { count: 1 })
events.dispose()

const format = new Format(OMapFormatType.GeoJSON, {})
```

由 Format、Source、Layer 或 Interaction 接收的原生 OpenLayers Feature 会经过统一 resolver，保持 OMap wrapper 身份稳定。
