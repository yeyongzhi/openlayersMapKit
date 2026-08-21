import { describe, expect, it } from 'vitest'
import { OlFeature, OlGeometry } from '../../src/source/index'
import { createBaseFeatureByOlFeature } from '../../src/module/core/Feature/BasicFeature/handle'
import Point from '../../src/module/core/Feature/Point/index'
import VectorSource from '../../src/module/source/VectorSource/index'

describe('Feature resolver', () => {
  it('returns the same wrapper for repeated native Feature resolution', () => {
    const nativeFeature = new OlFeature(new OlGeometry.Point([120, 30]))

    expect(createBaseFeatureByOlFeature(nativeFeature)).toBe(
      createBaseFeatureByOlFeature(nativeFeature)
    )
  })

  it('reuses a wrapper that was constructed before factory resolution', () => {
    const nativeFeature = new OlFeature(new OlGeometry.Point([120, 30]))
    const wrapper = new Point(nativeFeature)

    expect(createBaseFeatureByOlFeature(nativeFeature)).toBe(wrapper)
  })

  it('shares wrapper identity across VectorSource instances', () => {
    const nativeFeature = new OlFeature(new OlGeometry.Point([120, 30]))
    const firstSource = new VectorSource()
    const secondSource = new VectorSource()

    firstSource.getSource().addFeature(nativeFeature)
    secondSource.getSource().addFeature(nativeFeature)

    expect(firstSource.getFeatureByOlFeature(nativeFeature)).toBe(
      secondSource.getFeatureByOlFeature(nativeFeature)
    )
    expect(firstSource.getFeatureByOlFeature(nativeFeature)).toBe(
      createBaseFeatureByOlFeature(nativeFeature)
    )
  })
})
