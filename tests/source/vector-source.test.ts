import Feature from 'ol/Feature'
import OlPoint from 'ol/geom/Point'
import { describe, expect, it } from 'vitest'
import { Point, VectorSource } from '../../src/index'

describe('VectorSource', () => {
  it('keeps the original OMap wrapper when features are added through OMap', () => {
    const source = new VectorSource()
    const point = new Point([120, 30])

    source.addFeature(point)

    expect(source.getFeatures()).toEqual([point])
    expect(source.getFeatureByOlFeature(point.getFeature())).toBe(point)
    expect(source.hasFeature(point)).toBe(true)
  })

  it('creates one stable wrapper for a native OpenLayers feature', () => {
    const source = new VectorSource()
    const nativeFeature = new Feature(new OlPoint([121, 31]))

    source.getSource().addFeature(nativeFeature)

    const first = source.getFeatureByOlFeature(nativeFeature)
    const second = source.getFeatures()[0]

    expect(first).toBeDefined()
    expect(second).toBe(first)
    expect(source.getFeatureByOlFeature(nativeFeature)).toBe(first)
  })

  it('synchronizes ids with the native feature and supports id lookup', () => {
    const source = new VectorSource()
    const point = new Point([120, 30])

    point.setId('station-1')
    source.addFeature(point)

    expect(point.getFeature().getId()).toBe('station-1')
    expect(source.getFeatureById('station-1')).toBe(point)

    const nativeFeature = new Feature(new OlPoint([122, 32]))
    nativeFeature.setId(2)
    source.getSource().addFeature(nativeFeature)

    expect(source.getFeatureByOlFeature(nativeFeature)?.getId()).toBe(2)
  })

  it('keeps removals and clear operations synchronized from both entry points', () => {
    const source = new VectorSource()
    const first = new Point([120, 30])
    const second = new Point([121, 31])

    source.addFeatures([first, second])
    source.removeFeature(first)

    expect(source.getFeatures()).toEqual([second])
    expect(source.hasFeature(first)).toBe(false)

    source.getSource().removeFeature(second.getFeature())
    expect(source.isEmpty()).toBe(true)

    source.addFeatures([first, second])
    source.getSource().clear()
    expect(source.getFeatures()).toEqual([])
  })

  it('preserves constructor wrappers and validates collection inputs', () => {
    const point = new Point([120, 30])
    const source = new VectorSource({ features: [point] })

    expect(source.getFeatures()[0]).toBe(point)
    expect(() => source.addFeatures(null as never)).toThrow(/features必须是Feature数组/)
    expect(() => source.removeFeatures(undefined as never)).toThrow(/features必须是Feature数组/)
  })
})
