# Control

Control 模块提供 OpenLayers 控件包装，并遵循统一生命周期协议。

| API          | 用途                                         |
| ------------ | -------------------------------------------- |
| `Control`    | 控件基类、ID、properties、事件和原生实例访问 |
| `Zoom`       | 地图缩放按钮                                 |
| `FullScreen` | 全屏切换控件                                 |

```ts
import { FullScreen, Map, Zoom } from 'omap'

const map = new Map(target, { controls: [] })
const zoom = new Zoom()
const fullScreen = new FullScreen()

map.addControl(zoom)
map.addControl(fullScreen)
map.removeControl(zoom)
map.dispose()
```

`remove()` 与 `dispose()` 可重复调用。Map 销毁时也会释放仍由其管理的控件。
