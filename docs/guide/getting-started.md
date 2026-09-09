# 快速开始

## 安装

```bash
pnpm add openlayers-map-kit ol
```

`ol` 是 OMap 的运行时依赖和底层地图引擎。

当前公开 npm 版本尚未上线。发布前可克隆仓库，通过 workspace 中的 `examples/vite` 和 `examples/html` 联调：

```bash
git clone https://github.com/yeyongzhi/openlayersMapKit.git
cd openlayersMapKit
pnpm install --frozen-lockfile
pnpm example:vite:dev
```

运行环境、模块格式和浏览器要求见[环境与兼容性](./compatibility.md)。

## 创建地图

```ts
import 'ol/ol.css'
import { GaodeLayer, GaodeLayerType, Map, ProjUtil } from 'openlayers-map-kit'

const center = ProjUtil.fromLonLat([116.397428, 39.90923])
if (!center) throw new Error('地图中心坐标转换失败')

const map = new Map('map', {
  view: {
    center,
    zoom: 10
  }
})

map.addLayer(new GaodeLayer(GaodeLayerType.Vec))
```

页面需要提供具有明确宽高的容器：

```html
<div id="map" style="width: 100%; height: 480px"></div>
```

同时确保页面已经加载 OpenLayers 样式；缺少 `ol/ol.css` 时，控件和弹窗样式会异常。

## 添加矢量要素

```ts
import { Point, Style, VectorLayer } from 'openlayers-map-kit'

const featureLayer = new VectorLayer({ id: 'business-features' })
const point = new Point(center, { name: '北京' })

point.setStyle(
  new Style({
    circle: {
      radius: 7,
      fill: { color: '#2563eb' },
      stroke: { color: '#ffffff', width: 2 }
    }
  })
)

featureLayer.addFeature(point)
map.addLayer(featureLayer)
```

更多图层、几何和交互用法见[示例](/examples/basic-map)。

## 释放地图

页面卸载、路由切换或容器被移除前，应永久释放地图：

```ts
map.dispose()
```

`dispose()` 可以重复调用。地图会释放仍由它托管的 Layer、Interaction、Control、Popup、DOM 和原生监听器；同一容器之后可以创建新的 Map。需要暂时解除单个对象挂载并保留复用能力时，使用对应的 `removeXxx()`，不要直接销毁。

Vue 项目应在 `onMounted` 中创建地图、使用 `shallowRef` 保存 OMap/OpenLayers 实例，并在 `onUnmounted` 中释放，参见 [Vue 3 地图工具示例](/examples/vue-map-toolkit)。

## 当前版本提示

项目尚未完成首次公开发布。安装命令将在 npm 预发布版本上线后正式可用；现阶段可通过仓库源码进行联调。
