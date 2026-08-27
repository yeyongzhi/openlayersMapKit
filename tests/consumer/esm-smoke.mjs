import assert from 'node:assert/strict'
import { LngLat, Point, VectorSource } from 'omap'

const coordinate = new LngLat(120, 30)
const point = new Point(coordinate)
const source = new VectorSource({ features: [point] })

assert.deepEqual(coordinate.toArray(), [120, 30])
assert.equal(source.getFeatures()[0], point)
source.dispose()
assert.equal(source.isDisposed(), true)
