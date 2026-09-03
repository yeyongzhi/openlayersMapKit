import {
  LngLat,
  Map as OMap,
  Point,
  VectorSource,
  type Disposable,
  type PropertiesType
} from 'openlayers-map-kit'

const properties: PropertiesType = { category: 'station' }
const point = new Point(new LngLat(120, 30), properties)
const source = new VectorSource({ features: [point] })
const disposable: Disposable = source
const category = point.get<string>('category')

void category
void disposable

declare const mapElement: HTMLDivElement
const map = new OMap(mapElement, { view: { center: [120, 30], zoom: 10 } })
void map
