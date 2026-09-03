const assert = require('node:assert/strict')
const { LngLat, Point, VectorSource } = require('openlayers-map-kit')

const coordinate = new LngLat(121, 31)
const point = new Point(coordinate)
const source = new VectorSource({ features: [point] })

assert.deepEqual(coordinate.toArray(), [121, 31])
assert.equal(source.getFeatures()[0], point)
source.dispose()
assert.equal(source.isDisposed(), true)
