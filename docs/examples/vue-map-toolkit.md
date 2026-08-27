# Vue 3 地图工具示例

下面的单文件组件覆盖基础地图、Vector、Draw、Modify、Measure、Select 与 Popup。它是一个小型可复制示例，地图编排和少量按钮属于同一场景，因此不额外拆分组件。

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef, useTemplateRef } from 'vue'
import 'ol/ol.css'
import {
  Draw,
  DrawMode,
  Map as OMap,
  Measure,
  MeasureMode,
  Modify,
  Point,
  Popup,
  Select,
  VectorLayer
} from 'omap'

const mapElement = useTemplateRef<HTMLDivElement>('mapElement')
const popupElement = useTemplateRef<HTMLDivElement>('popupElement')

// 第三方 class 实例保持为不透明对象，避免 Vue 深层代理。
const map = shallowRef<OMap>()
const draw = shallowRef<Draw>()
const modify = shallowRef<Modify>()
const measure = shallowRef<Measure>()
const select = shallowRef<Select>()
const popup = shallowRef<Popup>()

onMounted(() => {
  if (!mapElement.value || !popupElement.value) return

  const vectorLayer = new VectorLayer({ id: 'business-features' })
  vectorLayer.addFeature(new Point([116.397428, 39.90923]))

  map.value = new OMap(mapElement.value, {
    view: { center: [116.397428, 39.90923], zoom: 10 },
    layers: [vectorLayer],
    interactions: [],
    controls: [],
    popups: []
  })

  draw.value = new Draw(DrawMode.Point, { layer: vectorLayer })
  modify.value = new Modify({ layer: vectorLayer })
  measure.value = new Measure(MeasureMode.Distance)
  select.value = new Select({ layers: [vectorLayer] })
  popup.value = new Popup({ id: 'feature-popup', element: popupElement.value })

  map.value.addInteraction(draw.value)
  map.value.addInteraction(modify.value)
  map.value.addInteraction(measure.value)
  map.value.addInteraction(select.value)
  map.value.addPopup(popup.value)
})

onUnmounted(() => {
  // Map 统一释放其已挂载的 Layer、Interaction、Popup 和原生监听器。
  map.value?.dispose()
  map.value = undefined
  draw.value = undefined
  modify.value = undefined
  measure.value = undefined
  select.value = undefined
  popup.value = undefined
})
</script>

<template>
  <section class="map-demo">
    <div ref="mapElement" class="map-demo__canvas" />
    <div ref="popupElement" class="map-demo__popup">已选择要素</div>
  </section>
</template>

<style scoped>
.map-demo {
  position: relative;
}

.map-demo__canvas {
  width: 100%;
  height: 480px;
}

.map-demo__popup {
  padding: 8px 12px;
  border-radius: 6px;
  background: white;
  box-shadow: 0 4px 16px rgb(0 0 0 / 18%);
}
</style>
```

生产项目通常按业务状态切换交互的 `active` 状态，避免 Draw、Modify、Measure 与 Select 同时响应同一次指针操作。若把各工具拆成子组件，请保持实例由父级统一拥有，并通过 typed props/events 控制状态，不要让子组件直接修改父级状态。
