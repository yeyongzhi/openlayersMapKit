import { LngLat, Point, VectorSource, type Disposable, type PropertiesType } from 'omap'

const properties: PropertiesType = { category: 'station' }
const point = new Point(new LngLat(120, 30), properties)
const source = new VectorSource({ features: [point] })
const disposable: Disposable = source
const category = point.get<string>('category')

void category
void disposable
