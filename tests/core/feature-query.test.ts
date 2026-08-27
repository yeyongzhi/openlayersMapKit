import { describe, expect, it, vi } from 'vitest'
import { Point, VectorLayer } from '../../src/index'
import FeatureQuery from '../../src/module/core/Map/query/FeatureQuery'
import type { OMapMapType } from '../../src/module/core/Map/type'

describe('Map FeatureQuery', () => {
  it('adapts native hit callbacks and layerFilter to stable OMap wrappers', () => {
    const layer = new VectorLayer()
    const feature = new Point([120, 30])
    layer.addFeature(feature)
    const filter = vi.fn(() => true)
    const callback = vi.fn()
    const nativeMap = {
      forEachFeatureAtPixel: vi.fn((_pixel, nativeCallback, options) => {
        expect(options.layerFilter(layer.getLayer())).toBe(true)
        nativeCallback(feature.getFeature(), layer.getLayer())
      })
    } as unknown as OMapMapType
    const query = new FeatureQuery(
      () => nativeMap,
      () => [layer]
    )

    query.forEachAtPixel([10, 20], callback, {
      hitTolerance: 2,
      checkWrapped: true,
      layerFilter: filter
    })

    expect(filter).toHaveBeenCalledWith(layer)
    expect(callback).toHaveBeenCalledWith(feature, layer)
  })

  it('returns stable wrappers once and reports hit presence', () => {
    const layer = new VectorLayer()
    const feature = new Point([120, 30])
    layer.addFeature(feature)
    const nativeMap = {
      getFeaturesAtPixel: vi.fn(() => [feature.getFeature(), feature.getFeature()])
    } as unknown as OMapMapType
    const query = new FeatureQuery(
      () => nativeMap,
      () => [layer]
    )

    expect(query.getAtPixel([10, 20])).toEqual([feature])
    expect(query.hasAtPixel([10, 20])).toBe(true)
  })
})
