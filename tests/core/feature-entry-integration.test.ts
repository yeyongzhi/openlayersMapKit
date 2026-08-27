import Feature from 'ol/Feature'
import OlPoint from 'ol/geom/Point'
import { describe, expect, it, vi } from 'vitest'
import { Draw, DrawMode, Modify, Select, VectorLayer } from '../../src/index'
import type Point from '../../src/module/core/Feature/Point/index'

describe('Feature wrapper identity across public entries', () => {
  it('reuses one wrapper across Layer, Draw, Modify and Select', () => {
    const nativeFeature = new Feature(new OlPoint([120, 30]))
    const layer = new VectorLayer()
    layer.getVectorSource().getSource().addFeature(nativeFeature)
    const layerFeature = layer.getFeatureByOlFeature(nativeFeature)

    expect(layerFeature).toBeDefined()

    const draw = new Draw(DrawMode.Point)
    const drawListener = vi.fn()
    draw.on('drawend', drawListener)
    draw.getLayer()?.getVectorSource().getSource().addFeature(nativeFeature)
    draw.getInteraction().dispatchEvent({ type: 'drawend', feature: nativeFeature })

    expect(draw.getFeatures()).toContain(layerFeature)
    expect(drawListener).toHaveBeenCalled()
    expect(drawListener.mock.calls.at(-1)?.[0].feature).toBe(layerFeature)

    const modify = new Modify({ layer })
    const findFeature = (
      modify as unknown as {
        findFeatureByOlFeature(feature: Feature<OlPoint>): Point | undefined
      }
    ).findFeatureByOlFeature.bind(modify)

    expect(findFeature(nativeFeature)).toBe(layerFeature)

    const filter = vi.fn(() => true)
    const select = new Select({ layers: [layer], filter })
    const nativeSelect = select.getInteraction() as unknown as {
      filter_(feature: Feature<OlPoint>, layer: ReturnType<VectorLayer['getLayer']>): boolean
    }

    expect(nativeSelect.filter_(nativeFeature, layer.getLayer())).toBe(true)
    expect(filter).toHaveBeenCalledWith(layerFeature, layer)

    const selectListener = vi.fn()
    select.on('select', selectListener)
    select.getInteraction().dispatchEvent({
      type: 'select',
      selected: [nativeFeature],
      deselected: []
    })

    expect(selectListener.mock.calls[0][0].selected).toEqual([layerFeature])
  })
})
