# 创建地图

```ts
import 'ol/ol.css'
import { GaodeLayer, GaodeLayerType, Map } from 'omap'

const map = new Map('map', {
  view: {
    center: [116.397428, 39.90923],
    zoom: 10
  }
})

map.addLayer(new GaodeLayer(GaodeLayerType.VEC))
```

在 Vue/VitePress 组件中，应在 `onMounted` 后创建地图，在 `onUnmounted` 中释放地图。OpenLayers/OMap 实例应保存在 `shallowRef`，避免被 Vue 深度代理。
