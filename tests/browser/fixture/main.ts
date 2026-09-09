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
  Style,
  VectorLayer
} from 'openlayers-map-kit'

const element = document.querySelector<HTMLDivElement>('#map')!
let map: OMap
let layer: VectorLayer
let point: Point
let tool: Draw | Select | Modify | Measure | undefined
let popup: Popup | undefined
const events = {
  drawEnd: 0,
  drawAbort: 0,
  selected: 0,
  deselected: 0,
  sameFeature: false,
  modified: 0,
  measured: 0
}

function create() {
  map = new OMap(element, { view: { center: [0, 0], zoom: 15 }, interactions: [], controls: [] })
  layer = new VectorLayer()
  point = new Point([0, 0], { name: 'station' })
  point.setStyle(new Style({ circle: { radius: 12, fill: { color: '#ff0000' } } }))
  layer.addFeatures([point])
  map.addLayer(layer)
  map.getMap().renderSync()
}

function activate(mode: 'draw' | 'select' | 'modify' | 'measure') {
  if (tool) {
    map.removeInteraction(tool)
    tool.dispose()
  }
  if (mode === 'draw') {
    const draw = new Draw(DrawMode.LineString)
    draw.on('drawend', () => events.drawEnd++)
    draw.on('drawabort', () => events.drawAbort++)
    tool = draw
  } else if (mode === 'select') {
    const select = new Select({ layers: [layer] })
    select.on('select', (event) => {
      events.selected = event.selected.length
      events.deselected = event.deselected.length
      events.sameFeature = event.selected[0] === point || event.deselected[0] === point
    })
    tool = select
  } else if (mode === 'modify') {
    const modify = new Modify({ layer })
    modify.on('modifyend', () => events.modified++)
    tool = modify
  } else {
    const measure = new Measure(MeasureMode.Distance)
    measure.on('measure:end', (event) => {
      events.measured = event.result?.value ?? 0
    })
    tool = measure
  }
  map.addInteraction(tool)
  tool.setActive(true)
}

function showPopup() {
  popup = new Popup({ position: [0, 0], content: '<span data-testid="popup">station</span>' })
  map.addPopup(popup)
}

create()
const fixture = {
  get map() {
    return map
  },
  get layer() {
    return layer
  },
  get point() {
    return point
  },
  get tool() {
    return tool
  },
  get popup() {
    return popup
  },
  events,
  activate,
  showPopup,
  dispose() {
    map.dispose()
    map.dispose()
  },
  recreate() {
    map.dispose()
    tool = undefined
    popup = undefined
    create()
  }
}
declare global {
  interface Window {
    fixture: typeof fixture
  }
}
window.fixture = fixture
