# 地图销毁与路由切换

`Map` 是唯一需要显式释放的门面：`map.dispose()` 会释放其托管的所有 Layer、Interaction、Control、Popup 以及原生监听器与 Overlay，并把容器解绑。**销毁后同一个 DOM 容器可以安全地重新创建地图。**

```vue
<script setup lang="ts">
import { onActivated, onMounted, onUnmounted, shallowRef, useTemplateRef, watch } from 'vue'
import 'ol/ol.css'
import { GaodeLayer, GaodeLayerType, Map as OMap } from 'omap'

const props = defineProps<{ sceneId: string }>()

const mapElement = useTemplateRef<HTMLDivElement>('mapElement')
const map = shallowRef<OMap>()

function createMap() {
  if (!mapElement.value) return
  map.value = new OMap(mapElement.value, {
    view: { center: [116.397, 39.909], zoom: 10 }
  })
  map.value.addLayer(new GaodeLayer(GaodeLayerType.VEC))
}

function destroyMap() {
  // dispose() 幂等：已释放时重复调用不会报错。
  if (map.value && !map.value.isDisposed()) {
    map.value.dispose()
  }
  map.value = undefined
}

onMounted(createMap)

// 业务场景切换：同一容器先销毁再重建。
watch(
  () => props.sceneId,
  () => {
    destroyMap()
    createMap()
  }
)

// keep-alive 缓存的组件重新激活时，容器尺寸可能已变化，需要重算视口。
onActivated(() => {
  map.value?.updateSize()
})

onUnmounted(destroyMap)
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

- **只在挂载阶段创建、卸载阶段销毁**。不要把地图实例放进 `ref()`，OL/OMap class 实例必须用 `shallowRef()` 保存，避免 Vue 深度代理破坏内部状态。
- `dispose()` 可重复调用；`isDisposed()` 用于判断实例是否已释放。已释放的实例不可再挂载任何对象。
- `dispose()` 之后**同一容器可再次 `new OMap(...)`**——这是路由切换、Tab 切换等场景的基础保障。
- 组件被 `<KeepAlive>` 缓存时，**不要**在 `onDeactivated` 中 `dispose()`，否则重新激活后地图已释放；应在 `onActivated` 调用 `updateSize()`，并只在 `onUnmounted` 释放。
- 容器尺寸由 CSS 或布局变化导致改变时调用 `updateSize()`，否则会出现瓦片错位或空白。
- 若使用路由，推荐把地图封装为独立组件，让路由切换自然触发 `onUnmounted`，避免手工在 `watch` 中销毁重建带来的抖动；只有在同一组件内切换场景时才用上面的 `watch` 写法。
