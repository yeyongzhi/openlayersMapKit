import { describe, expect, it, vi } from 'vitest'
import { Point, Select, Style, VectorLayer } from '../../src/index'

describe('Select', () => {
  it('honors the initial active option', () => {
    const select = new Select({ active: false })

    expect(select.getActive()).toBe(false)
  })

  it('actively selects, deselects and clears stable wrappers', () => {
    const layer = new VectorLayer()
    const first = new Point([120, 30])
    const second = new Point([121, 31])
    layer.addFeatures([first, second])
    const select = new Select({ layers: [layer] })

    select.select(first)
    select.select([first, second])

    expect(select.getSelection()).toEqual([first, second])
    expect(select.getFeaturesCollection().getLength()).toBe(2)

    select.deselect(first)
    expect(select.getSelection()).toEqual([second])

    select.clearSelection()
    expect(select.getSelection()).toEqual([])
  })

  it('rejects invalid active-selection inputs', () => {
    const select = new Select()

    expect(() => select.select(null as never)).toThrow(/Feature或Feature数组/)
    expect(() => select.deselect({} as never)).toThrow(/Feature或Feature数组/)
  })

  it('adapts filter and style callbacks to stable wrappers', () => {
    const layer = new VectorLayer()
    const point = new Point([120, 30])
    layer.addFeature(point)
    const filter = vi.fn(() => true)
    const styleResult = new Style({})
    const style = vi.fn(() => styleResult)
    const select = new Select({ layers: [layer], filter, style })
    const nativeInteraction = select.getInteraction() as unknown as {
      filter_: (
        feature: ReturnType<Point['getFeature']>,
        layer: ReturnType<VectorLayer['getLayer']>
      ) => boolean
      style_: (feature: ReturnType<Point['getFeature']>, resolution: number) => unknown
    }

    expect(nativeInteraction.filter_(point.getFeature(), layer.getLayer())).toBe(true)
    expect(filter).toHaveBeenCalledWith(point, layer)
    expect(nativeInteraction.style_(point.getFeature(), 1)).toBe(styleResult.getStyle())
    expect(style).toHaveBeenCalledWith(point, 1)
  })

  it('emits select payloads with stable wrappers', () => {
    const layer = new VectorLayer()
    const selected = new Point([120, 30])
    const deselected = new Point([121, 31])
    layer.addFeatures([selected, deselected])
    const select = new Select({ layers: [layer] })
    const listener = vi.fn()
    select.on('select', listener)

    select.getInteraction().dispatchEvent({
      type: 'select',
      selected: [selected.getFeature()],
      deselected: [deselected.getFeature()]
    })

    expect(listener).toHaveBeenCalledOnce()
    expect(listener.mock.calls[0][0].selected).toEqual([selected])
    expect(listener.mock.calls[0][0].deselected).toEqual([deselected])
  })
})
