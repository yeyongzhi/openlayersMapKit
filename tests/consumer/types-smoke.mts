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

// These assertions compile against the package declarations, not src aliases.
const station = new Point([120, 30], { name: 'station', count: 1 })
const stationName: string = station.getProperties().name
station.setProperties({ count: 2 })
// @ts-expect-error property updates preserve their declared value type
station.setProperties({ count: 'two' })
// @ts-expect-error unknown properties are rejected on typed updates
station.setProperties({ missing: true })
// @ts-expect-error inferred name is a string
const wrongName: number = station.getProperties().name
// @ts-expect-error coordinates must be numeric
new Point(['120', '30'])
void stationName
void wrongName
import { Draw, DrawMode, Measure, MeasureMode, Popup, Select } from 'openlayers-map-kit'

const draw = new Draw(DrawMode.LineString)
draw.on('drawend', (event) => {
  const target: Draw = event.target
  event.feature?.getCoordinates()
  // @ts-expect-error event payload has no untyped arbitrary fields
  void event.missing
  void target
})
// @ts-expect-error unknown event names must be rejected
draw.on('finished', () => {})
// @ts-expect-error callback parameter must match the event payload
draw.on('drawend', (_event: string) => {
  void _event
})
const select = new Select()
select.on('select', (event) => {
  event.selected.forEach((feature) => feature.getId())
  // @ts-expect-error selected is a collection, not one feature
  event.selected.getId()
})
const measure = new Measure(MeasureMode.Distance)
measure.on('measure:end', (event) => {
  const distance: number | undefined = event.result?.value
  // @ts-expect-error result snapshots are readonly
  if (event.result) event.result.value = 0
  void distance
})
const typedPopup = new Popup({ properties: { title: 'station' } })
typedPopup.setProperties({ title: 'updated' })
// @ts-expect-error popup property types survive declaration bundling
typedPopup.setProperties({ title: 1 })
