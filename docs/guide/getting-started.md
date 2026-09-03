# 快速开始

## 安装

```bash
pnpm add openlayers-map-kit ol
```

`ol` 是 OMap 的运行时依赖和底层地图引擎。

## 创建地图

```ts
import 'ol/ol.css'
import { GaodeLayer, GaodeLayerType, Map } from 'openlayers-map-kit'

const map = new Map('map', {
  view: {
    center: [116.397428, 39.90923],
    zoom: 10
  }
})

map.addLayer(new GaodeLayer(GaodeLayerType.VEC))
```

页面需要提供具有明确宽高的容器：

```html
<div id="map" style="width: 100%; height: 480px"></div>
```

## 当前版本提示

项目尚未完成首次公开发布。安装命令将在 npm 预发布版本上线后正式可用；现阶段可通过仓库源码进行联调。
