# 创建地图

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef, useTemplateRef } from 'vue'
import 'ol/ol.css'
import { GaodeLayer, GaodeLayerType, Map as OMap } from 'openlayers-map-kit'

const mapElement = useTemplateRef<HTMLDivElement>('mapElement')
const map = shallowRef<OMap>()

onMounted(() => {
  if (!mapElement.value) return

  map.value = new OMap(mapElement.value, {
    view: { center: [116.397428, 39.90923], zoom: 10 }
  })
  map.value.addLayer(new GaodeLayer(GaodeLayerType.VEC))
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

示例只在浏览器挂载阶段创建地图，在卸载阶段释放地图。OpenLayers/OMap 实例保存在 `shallowRef`，不会被 Vue 深度代理。
