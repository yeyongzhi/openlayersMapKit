# XYZ、WMS 与 WMTS 图层

三种标准 OGC/瓦片服务图层的配置方式。三者的 `source` 参数都是**必填**的：`XYZLayer` 缺失会抛错，`WMSLayer` / `WMTSLayer` 缺失会告警并生成不可用图层。

> 示例中的服务地址均为占位域名，请替换为自己的服务地址。文档与示例**不得包含真实地图服务密钥**；需要密钥时通过 `MapToken` 在运行期注入（见 [Util API](../api/util.md)）。

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef, useTemplateRef } from 'vue'
import 'ol/ol.css'
import { Map as OMap, WMSLayer, WMTSLayer, XYZLayer } from 'openlayers-map-kit'

const mapElement = useTemplateRef<HTMLDivElement>('mapElement')
const map = shallowRef<OMap>()

// EPSG:3857 标准 WMTS 金字塔：每级分辨率减半，矩阵数等于该级瓦片行列数。
const resolutions = Array.from({ length: 19 }, (_, z) => 156543.03392804097 / 2 ** z)
const matrixIds = resolutions.map((_, z) => `EPSG:3857:${z}`)
const sizes = resolutions.map((_, z) => [2 ** z, 2 ** z] as [number, number])

onMounted(() => {
  if (!mapElement.value) return

  // XYZ：url 模板支持 {z}/{x}/{y}
  const xyzLayer = new XYZLayer({
    id: 'xyz-base',
    source: {
      url: 'https://example.com/tiles/{z}/{x}/{y}.png',
      // 也支持 urls 数组（多子域）或 tileUrlFunction 自定义取图
      projection: 'EPSG:3857',
      tileSize: [256, 256],
      maxZoom: 18,
      minZoom: 0,
      crossOrigin: 'anonymous'
    },
    preload: 0,
    cacheSize: 512,
    opacity: 1
  })

  // WMS：params 为随请求发送的 WMS 参数
  const wmsLayer = new WMSLayer({
    id: 'wms-overlay',
    source: {
      url: 'https://example.com/geoserver/wms',
      params: {
        LAYERS: 'workspace:layer',
        TILED: true,
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      serverType: 'geoserver',
      projection: 'EPSG:3857'
    },
    opacity: 0.7,
    visible: false
  })

  // WMTS：需要 layer / matrixSet / tileGrid 等能力描述
  const wmtsLayer = new WMTSLayer({
    id: 'wmts-base',
    source: {
      url: 'https://example.com/wmts',
      layer: 'basemap',
      style: 'default',
      matrixSet: 'EPSG:3857',
      format: 'image/jpeg',
      version: '1.0.0',
      requestEncoding: 'KVP', // REST 服务改为 'REST'
      projection: 'EPSG:3857',
      tileGrid: { resolutions, matrixIds, sizes, tileSize: 256 }
    },
    visible: false
  })

  map.value = new OMap(mapElement.value, {
    view: { center: [116.397, 39.909], zoom: 10 },
    layers: [xyzLayer, wmsLayer, wmtsLayer]
  })
})

onUnmounted(() => {
  map.value?.dispose()
  map.value = undefined
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

- 三类图层都接受 `BaseLayer` 通用选项：`id`、`name`、`opacity`、`visible`、`zIndex`、`extent`、`minZoom` / `maxZoom` 等。
- `source` 缺省值由 `DEFAULT_*_SOURCE_PARAMS` 提供，例如 XYZ 默认 `projection: 'EPSG:3857'`、`tileSize: [256, 256]`、`transition: 250`；WMS 默认 `hidpi: true`；WMTS 默认 `requestEncoding: 'KVP'`。
- WMTS 的 `tileGrid` 是 OMap 的网格描述（`resolutions` / `matrixIds` / `sizes` 必填），不是 OpenLayers 的 `WMTSTileGrid` 实例。
- 需要按业务切换底图时，用 `setVisible()` 或 `map.removeLayer()` / `map.addLayer()`，不要重复创建同一服务的图层实例。
- 天地图等需要密钥的服务，请在创建图层前设置 `MapToken.tdt`，而不是把密钥写进 URL。
