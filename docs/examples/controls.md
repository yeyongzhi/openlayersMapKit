# 控件

`Zoom` 与 `FullScreen` 是内置控件，统一经 `map.addControl()` / `map.removeControl()` 管理。所有控件遵循同一生命周期：`remove()` 解除挂载后仍可再次添加，`dispose()` 为永久释放。

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef, useTemplateRef } from 'vue'
import 'ol/ol.css'
import { FullScreen, GaodeLayer, GaodeLayerType, Map as OMap, Zoom } from 'omap'

const mapElement = useTemplateRef<HTMLDivElement>('mapElement')
const map = shallowRef<OMap>()
const zoom = shallowRef<Zoom>()
const fullScreen = shallowRef<FullScreen>()
const zoomVisible = ref(true)

onMounted(() => {
  if (!mapElement.value) return

  // 传入 controls: [] 可清空默认控件集，随后完全自行管理。
  map.value = new OMap(mapElement.value, {
    view: { center: [116.397, 39.909], zoom: 10 },
    controls: []
  })
  map.value.addLayer(new GaodeLayer(GaodeLayerType.VEC))

  // 仅传 options：使用默认按钮文案与动画
  zoom.value = new Zoom({ duration: 200, delta: 1 })
  // 先传 id 再传 options：便于后续按 id 查询
  fullScreen.value = new FullScreen('main-fullscreen', { tipLabel: '全屏显示' })

  map.value.addControl(zoom.value)
  map.value.addControl(fullScreen.value)
})

function toggleZoom() {
  if (!map.value || !zoom.value) return
  if (zoomVisible.value) {
    map.value.removeControl(zoom.value) // 解除挂载，实例保留
  } else {
    map.value.addControl(zoom.value) // 同一实例可重新挂载
  }
  zoomVisible.value = !zoomVisible.value
}

onUnmounted(() => {
  // Map.dispose() 会释放仍由其管理的控件，无需逐个 dispose。
  map.value?.dispose()
  map.value = undefined
  zoom.value = undefined
  fullScreen.value = undefined
})
</script>

<template>
  <section>
    <button type="button" @click="toggleZoom">{{ zoomVisible ? '隐藏' : '显示' }}缩放控件</button>
    <div ref="mapElement" class="map" />
  </section>
</template>

<style scoped>
.map {
  width: 100%;
  height: 480px;
}
</style>
```

要点：

- `Zoom` / `FullScreen` 都支持两种构造重载：`new Zoom(options?)` 与 `new Zoom(id, options?)`，第二种用于指定控件 ID 以便 `map.getControlById()` 查询。
- 默认选项由 `DEFAULT_ZOOM_OPTIONS` 与 `DEFAULT_FULLSCREEN_OPTIONS` 提供（如 `zoomInTipLabel: '放大'`、`tipLabel: '全屏'`），传入的 `options` 为**浅合并覆盖**。
- `removeControl()` 只解除挂载；若确定不再使用，可调用 `control.dispose()` 永久释放。重复调用 `dispose()` 是安全的。
- 控件 DOM 由 OpenLayers 渲染，样式来自 `ol/ol.css`，需确保已引入。
