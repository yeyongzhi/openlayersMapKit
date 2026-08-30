# Basic

Basic 提供地图 API 通用的值对象、样式和 Popup。值对象保持可变并提供 `clone()` 创建独立副本（与 OpenLayers 原生 Coordinate/Pixel 风格一致）；公共类型中使用固定 tuple。

> 稳定性：`stable-beta`。

## LngLat / Lnglat（兼容别名）

```ts
new LngLat(116.397428, 39.90923) // 推荐
new LngLat([116.397428, 39.90923])
// Lnglat 与 LngLat 指向同一类、完全等价；新代码请使用 LngLat。
```

| 方法                       | 签名                              | 说明              |
| -------------------------- | --------------------------------- | ----------------- |
| `getLng()` / `setLng(lng)` | —                                 | 经度              |
| `getLat()` / `setLat(lat)` | —                                 | 纬度              |
| `toArray()`                | `() => [number, number]`          | 坐标数组          |
| `toString(place?)`         | `(place?: number) => string`      | 默认保留 3 位小数 |
| `equals(lnglat)`           | `(OMapCoordinateType) => boolean` | 相等判断          |
| `clone()`                  | `() => LngLat`                    | 副本              |
| `static from(value)`       | `(OMapCoordinateType) => LngLat`  | 归一化构造        |

## Extent

```ts
new Extent(minX, minY, maxX, maxY)
new Extent([minX, minY, maxX, maxY])
```

| 方法                                                                                      | 签名                                     | 说明          |
| ----------------------------------------------------------------------------------------- | ---------------------------------------- | ------------- |
| `getExtent()` / `toArray()`                                                               | `() => [number, number, number, number]` | 范围数组      |
| `getTopLeft()` / `getTopRight()` / `getBottomLeft()` / `getBottomRight()` / `getCenter()` | `() => Lnglat`                           | 角点与中心    |
| `getWidth()` / `getHeight()`                                                              | `() => number`                           | 宽高          |
| `getSize()`                                                                               | `() => Size`                             | 尺寸          |
| `toString(place?)`                                                                        | `() => string`                           | 默认 3 位小数 |
| `equals(extent)`                                                                          | `() => boolean`                          | 实例方法      |
| `static boundingExtent(coords)`                                                           | `(Array<OMapCoordinateType>) => Extent`  | 由点集构建    |
| `static containsCoordinate / containsExtent / containsXY`                                 | —                                        | 包含判断      |
| `static intersects(e1, e2)`                                                               | `() => boolean`                          | 相交判断      |
| `static extend / getArea / isEmpty / createEmpty`                                         | —                                        | 范围运算      |

## Pixel / Size

```ts
new Pixel(x, y) | new Pixel([x, y])
new Size(width, height) | new Size([width, height])
```

| 类      | 方法                                                                                                                              |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `Pixel` | `getX()`/`setX` · `getY()`/`setY` · `getPixel()`/`setPixel` · `toArray()` · `equals()` · `clone()` · `toString()`                 |
| `Size`  | `getWidth()`/`setWidth` · `getHeight()`/`setHeight` · `getSize()`/`setSize` · `toArray()` · `equals()` · `clone()` · `toString()` |

## Color

```ts
new Color('#ff0000') // 十六进制
new Color('#ff000099') // 十六进制 + 透明度
new Color('rgb(255,0,0)') // rgb / rgba 字符串
new Color([255, 0, 0]) // 数组
new Color({ color: '#1890FF', alpha: 0.8 }) // 对象
new Color('red') // 预设颜色名
```

| 方法                         | 签名                              | 说明                   |
| ---------------------------- | --------------------------------- | ---------------------- |
| `getColor()` / `toString()`  | `() => string`                    | 归一化后的 CSS 颜色串  |
| `setColor(color: ColorType)` | —                                 | 重新设置               |
| `withAlpha(alpha: number)`   | `(alpha: 0-1) => void`            | 设置透明度（保留原色） |
| `equals(color)`              | `(Color \| ColorType) => boolean` | 相等判断               |
| `clone()`                    | `() => Color`                     | 副本                   |
| `static from(value)`         | `(Color \| ColorType) => Color`   | 归一化构造             |

## Style

```ts
new Style({
  fill: { color: '#1677ff' },
  stroke: { color: '#333', width: 2 },
  circle: { radius: 6, fill, stroke },
  icon: { src: 'marker.png' },
  text: { text: '标注', font: '12px sans-serif' },
  regularShape: { points: 5, radius: 10 }
})
```

| 方法         | 签名                        | 说明               |
| ------------ | --------------------------- | ------------------ |
| `getStyle()` | `() => OlStyleInstanceType` | 原生 Style（透传） |

## Popup

```ts
new Popup({ id?, element?, content?, position?: OMapCoordinateType, offset?: OMapPixelType, positioning?: PopupPositioningType })
```

| 方法                                            | 签名                             | 说明                                                             |
| ----------------------------------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `getPosition()` / `setPosition(coord)`          | `() => Lnglat \| undefined`      | 位置（LngLat / 坐标）                                            |
| `getPositioning()` / `setPositioning(type)`     | —                                | 锚点对齐方式                                                     |
| `getContent()` / `setContent(html)`             | `() => string`                   | HTML 内容                                                        |
| `getElement()` / `setElement(el)`               | `() => HTMLElement \| undefined` | DOM 元素                                                         |
| `getOffset()` / `setOffset(pixel)`              | `() => Pixel`                    | 偏移                                                             |
| `getProperties()` / `setProperties(Partial<P>)` | —                                | 业务属性（合并语义）                                             |
| `getId()` / `setId(id)`                         | —                                | 弹窗 id                                                          |
| `getPopup()`                                    | `() => OMapPopupType`            | 原生 Overlay（透传）                                             |
| `on/once` / `un`                                | `OMapPopupEventType`             | 事件：`change:position` / `change:content` / `change:properties` |
| `remove()`                                      | `() => void`                     | 从地图解除挂载，可再次添加                                       |
| `dispose()`                                     | `() => void`                     | 永久释放事件与 Overlay                                           |
