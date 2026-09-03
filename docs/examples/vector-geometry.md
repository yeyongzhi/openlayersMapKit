# Vector 与常用 Geometry

`VectorLayer` 承载矢量要素，几何要素由 `Point` / `LineString` / `Polygon` / `MultiPoint` / `MultiLineString` / `MultiPolygon` / `LinearRing` / `Circle` 表示。所有坐标使用经纬度数组（默认按 `EPSG:3857` 内部投影）。

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef, useTemplateRef } from 'vue'
import 'ol/ol.css'
import {
  Circle,
  LineString,
  Map as OMap,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
  Style,
  VectorLayer
} from 'openlayers-map-kit'

const mapElement = useTemplateRef<HTMLDivElement>('mapElement')
const map = shallowRef<OMap>()
const layer = shallowRef<VectorLayer>()

onMounted(() => {
  if (!mapElement.value) return

  layer.value = new VectorLayer({ id: 'geometry-demo' })

  const pointStyle = new Style({
    circle: { radius: 6, fill: { color: '#1677ff' }, stroke: { color: '#ffffff', width: 2 } }
  })
  const lineStyle = new Style({ stroke: { color: '#52c41a', width: 3 } })
  const areaStyle = new Style({
    fill: { color: 'rgba(22, 119, 255, 0.2)' },
    stroke: { color: '#1677ff', width: 2 }
  })

  // Point：单个 [lng, lat]
  const point = new Point([116.397, 39.909], { name: '单点' })
  point.setStyle(pointStyle)

  // LineString：一串坐标点
  const line = new LineString(
    [
      [116.35, 39.88],
      [116.42, 39.92],
      [116.5, 39.9]
    ],
    { name: '折线' }
  )
  line.setStyle(lineStyle)

  // Polygon：环的数组，每个环为坐标数组，首环为外环、其余为内环（洞）
  const polygon = new Polygon(
    [
      [
        [116.3, 39.85],
        [116.55, 39.85],
        [116.55, 39.98],
        [116.3, 39.98],
        [116.3, 39.85]
      ]
    ],
    { name: '多边形' }
  )
  polygon.setStyle(areaStyle)

  // Circle：中心点 + 半径，半径为投影单位（EPSG:3857 下近似米）
  const circle = new Circle([116.5, 39.95], 2000, { name: '圆' })
  circle.setStyle(areaStyle)

  // Multi*：对应单层结构的数组
  const multiPoint = new MultiPoint(
    [
      [116.32, 39.82],
      [116.34, 39.84]
    ],
    { name: '多点' }
  )
  multiPoint.setStyle(pointStyle)

  const multiLine = new MultiLineString(
    [
      [
        [116.2, 39.8],
        [116.28, 39.86]
      ],
      [
        [116.28, 39.86],
        [116.36, 39.8]
      ]
    ],
    { name: '多线' }
  )
  multiLine.setStyle(lineStyle)

  const multiPolygon = new MultiPolygon(
    [
      [
        [
          [116.1, 39.9],
          [116.18, 39.9],
          [116.18, 39.95],
          [116.1, 39.95],
          [116.1, 39.9]
        ]
      ]
    ],
    { name: '多多边形' }
  )
  multiPolygon.setStyle(areaStyle)

  layer.value.addFeatures([point, line, polygon, circle, multiPoint, multiLine, multiPolygon])

  map.value = new OMap(mapElement.value, {
    view: { center: [116.4, 39.9], zoom: 10 },
    layers: [layer.value]
  })

  // 资源统一释放；也可只清空要素保留图层。
  // layer.value.clear()
})

onUnmounted(() => {
  map.value?.dispose()
  map.value = undefined
  layer.value = undefined
})
</script>

<template>
  <div ref="mapElement" class="map" />
</template>

<style scoped>
.map {
  width: 100%;
  height: 480px;
}
</style>
```

要点：

- 坐标统一写经纬度数组，内部按视图投影换算；`Circle` 的半径是**投影单位**（`EPSG:3857` 下近似米，不是经纬度度数）。
- `Polygon` 是「环的数组」：第一个环为外环，后续为内环（洞）；`MultiPolygon` 再套一层。
- 要素通过 `setStyle()` 单独设置样式，或用 `layer.setStyle()` 统一设置。
- 同一个原生 OpenLayers Feature 经 resolver 始终解析为同一 OMap wrapper，因此可以对 `addFeature` 传入的要素继续调用 `setCoordinates()` 更新。
