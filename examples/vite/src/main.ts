import 'ol/ol.css'
import {
  FullScreen,
  GaodeLayer,
  GaodeLayerType,
  LineString,
  Map as OMap,
  Point,
  Polygon,
  ProjUtil,
  Style,
  VectorLayer,
  Zoom
} from 'openlayers-map-kit'
import '../../shared/example.css'

const BEIJING_CENTER: [number, number] = [116.397428, 39.90923]
type GaodeType = (typeof GaodeLayerType)[keyof typeof GaodeLayerType]

function project(coordinate: [number, number]) {
  const projected = ProjUtil.fromLonLat(coordinate)
  if (!projected) throw new Error(`坐标转换失败：${coordinate.join(', ')}`)
  return projected
}

function required<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector)
  if (!element) throw new Error(`示例页面缺少必要元素：${selector}`)
  return element
}

const mapElement = required<HTMLDivElement>('#map')
const tabsElement = required<HTMLElement>('#case-tabs')
const titleElement = required<HTMLElement>('#case-title')
const kickerElement = required<HTMLElement>('#case-kicker')
const descriptionElement = required<HTMLElement>('#case-description')
const actionsElement = required<HTMLElement>('#case-actions')
const statusElement = required<HTMLOutputElement>('#status')
const codeElement = required<HTMLElement>('#case-code')
let map: OMap | undefined

function setStatus(message: string) {
  statusElement.textContent = message
}

function createGaodeLayer(type: GaodeType = GaodeLayerType.Vec) {
  return new GaodeLayer(type, {
    preload: 0,
    useInterimTilesOnError: true,
    cacheSize: 512,
    source: {}
  })
}

function createMap() {
  return new OMap(mapElement, {
    view: { center: project(BEIJING_CENTER), zoom: 11 }
  })
}

function disposeCurrentMap() {
  if (map && !map.isDisposed()) map.dispose()
  map = undefined
}

function addAction(label: string, handler: () => void, primary = false) {
  const button = document.createElement('button')
  button.type = 'button'
  button.textContent = label
  if (primary) button.className = 'primary'
  button.addEventListener('click', handler)
  actionsElement.append(button)
}

function resetView() {
  if (!map || map.isDisposed()) return setStatus('地图已销毁，请重新创建')
  map.setCenter(project(BEIJING_CENTER))
  map.setZoom(11)
  setStatus('视图已回到北京')
}

type DemoCase = {
  id: string
  icon: string
  title: string
  kicker: string
  description: string
  code: string
  mount: () => void
}

const cases: DemoCase[] = [
  {
    id: 'basic',
    icon: '地',
    title: '基础地图',
    kicker: '01 · Map + GaodeLayer',
    description: '创建最小地图实例并加载高德矢量底图，验证 ESM 入口和基础视图。',
    code: `const center = ProjUtil.fromLonLat([116.397428, 39.90923])
const map = new OMap('#map', {
  view: { center, zoom: 11 }
})
map.addLayer(createGaodeLayer(GaodeLayerType.Vec))`,
    mount() {
      map = createMap()
      console.log(map)
      map.addLayer(createGaodeLayer())
      console.log(map)
      addAction('回到北京', resetView, true)
      setStatus('基础地图运行中 · 高德矢量底图')
    }
  },
  {
    id: 'vector',
    icon: '矢',
    title: '矢量要素',
    kicker: '02 · VectorLayer + Geometry',
    description: '在高德底图上添加点、线、面，并分别应用圆点、描边与半透明填充样式。',
    code: `const layer = new VectorLayer({ id: 'geometry-demo' })
layer.addFeatures([
  new Point([116.397, 39.909]),
  new LineString([[116.32, 39.86], [116.49, 39.95]]),
  new Polygon([[[116.32, 39.85], ...]])
])
map.addLayer(layer)`,
    mount() {
      map = createMap()
      const vectorLayer = new VectorLayer({ id: 'geometry-demo' })
      const point = new Point(project(BEIJING_CENTER), { name: '天安门' })
      const line = new LineString(
        [project([116.32, 39.86]), project([116.397, 39.909]), project([116.49, 39.95])],
        { name: '示例路线' }
      )
      const polygon = new Polygon(
        [
          [
            project([116.32, 39.85]),
            project([116.49, 39.85]),
            project([116.49, 39.97]),
            project([116.32, 39.97]),
            project([116.32, 39.85])
          ]
        ],
        { name: '示例区域' }
      )
      point.setStyle(
        new Style({
          circle: {
            radius: 8,
            fill: { color: '#2563eb' },
            stroke: { color: '#ffffff', width: 3 }
          }
        })
      )
      line.setStyle(new Style({ stroke: { color: '#f97316', width: 4 } }))
      polygon.setStyle(
        new Style({
          fill: { color: 'rgba(37, 99, 235, 0.16)' },
          stroke: { color: '#2563eb', width: 2 }
        })
      )
      vectorLayer.addFeatures([polygon, line, point])
      map.addLayers([createGaodeLayer(), vectorLayer])
      addAction('回到北京', resetView, true)
      setStatus(`矢量图层运行中 · ${vectorLayer.getFeatures().length} 个要素`)
    }
  },
  {
    id: 'layers',
    icon: '层',
    title: '底图切换',
    kicker: '03 · Layer lifecycle',
    description: '在矢量、影像和道路图层之间切换，验证图层移除、销毁和重新挂载。',
    code: `map.removeLayer(activeLayer)
activeLayer.dispose()
activeLayer = createGaodeLayer(GaodeLayerType.Img)
map.addLayer(activeLayer)`,
    mount() {
      map = createMap()
      let activeLayer = createGaodeLayer()
      map.addLayer(activeLayer)
      const switchLayer = (type: GaodeType, label: string) => {
        if (!map || map.isDisposed()) return
        map.removeLayer(activeLayer)
        activeLayer.dispose()
        activeLayer = createGaodeLayer(type)
        map.addLayer(activeLayer)
        setStatus(`当前底图：${label}`)
      }
      addAction('矢量', () => switchLayer(GaodeLayerType.Vec, '高德矢量'), true)
      addAction('影像', () => switchLayer(GaodeLayerType.Img, '高德影像'))
      addAction('道路', () => switchLayer(GaodeLayerType.Road, '高德道路'))
      setStatus('当前底图：高德矢量')
    }
  },
  {
    id: 'controls',
    icon: '控',
    title: '地图控件',
    kicker: '04 · Zoom + FullScreen',
    description: '添加 OMap Zoom 与 FullScreen 控件，并通过程序化按钮验证视图控制。',
    code: `map.addControl(new Zoom('demo-zoom'))
map.addControl(new FullScreen('demo-fullscreen'))
map.zoomIn()
map.zoomOut()`,
    mount() {
      map = createMap()
      map.addLayer(createGaodeLayer())
      map.addControl(new Zoom('demo-zoom'))
      map.addControl(new FullScreen('demo-fullscreen'))
      addAction('放大', () => map?.zoomIn(), true)
      addAction('缩小', () => map?.zoomOut())
      addAction('重置', resetView)
      setStatus('控件已挂载 · 可使用地图左上角控件或顶部按钮')
    }
  },
  {
    id: 'lifecycle',
    icon: '生',
    title: '生命周期',
    kicker: '05 · dispose + recreate',
    description: '重复销毁与重建地图，检查容器、图层、控件及底层监听器能否正确释放。',
    code: `map.dispose()
console.log(map.isDisposed()) // true

map = new OMap(element, options)
map.addLayer(createGaodeLayer())`,
    mount() {
      const recreate = () => {
        disposeCurrentMap()
        map = createMap()
        map.addLayer(createGaodeLayer())
        setStatus('地图已创建 · isDisposed() = false')
      }
      recreate()
      addAction(
        '销毁地图',
        () => {
          if (!map || map.isDisposed()) return setStatus('地图已经销毁 · dispose 可重复调用')
          map.dispose()
          setStatus('地图已销毁 · isDisposed() = true')
        },
        true
      )
      addAction('重新创建', recreate)
    }
  }
]

function selectCase(selected: DemoCase) {
  disposeCurrentMap()
  actionsElement.replaceChildren()
  mapElement.replaceChildren()
  titleElement.textContent = selected.title
  kickerElement.textContent = selected.kicker
  descriptionElement.textContent = selected.description
  codeElement.textContent = selected.code
  document.querySelectorAll<HTMLButtonElement>('.case-tab').forEach((button) => {
    button.classList.toggle('active', button.dataset.caseId === selected.id)
  })
  selected.mount()
}

for (const item of cases) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'case-tab'
  button.dataset.caseId = item.id
  button.innerHTML = `<span class="tab-icon">${item.icon}</span><span><strong>${item.title}</strong><small>${item.kicker.split(' · ')[1]}</small></span>`
  button.addEventListener('click', () => selectCase(item))
  tabsElement.append(button)
}

window.addEventListener('beforeunload', disposeCurrentMap, { once: true })
selectCase(cases[0])
