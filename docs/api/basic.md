# Basic

Basic 提供地图 API 通用的值对象、样式和 Popup。

| API             | 用途                                     |
| --------------- | ---------------------------------------- |
| `LngLat`        | 经纬度坐标；`Lnglat` 为废弃兼容名        |
| `Extent`        | `[minX, minY, maxX, maxY]` 范围值        |
| `Pixel`、`Size` | 固定长度像素与尺寸 tuple 包装            |
| `Color`         | 颜色解析、转换、比较与克隆               |
| `Style`         | OpenLayers 样式的类型安全包装            |
| `Popup`         | Overlay 弹窗、位置、偏移、属性和生命周期 |

```ts
import { Color, LngLat, Popup, Size } from 'omap'

const center = new LngLat(116.397428, 39.90923)
const viewport = new Size(1280, 720)
const accent = new Color('#1677ff')
const popup = new Popup({ element: document.createElement('div') })

popup.dispose()
```

值对象保持可变，并提供 `clone()` 创建独立副本。坐标、范围、像素与尺寸在公共类型中使用固定 tuple。
