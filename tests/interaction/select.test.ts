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

  it('restricts selection to the features whitelist', () => {
    const layer = new VectorLayer()
    const allowed = new Point([120, 30])
    const blocked = new Point([121, 31])
    layer.addFeatures([allowed, blocked])
    const select = new Select({ layers: [layer], features: [allowed] })
    const nativeInteraction = select.getInteraction() as unknown as {
      filter_: (
        feature: ReturnType<Point['getFeature']>,
        layer: ReturnType<VectorLayer['getLayer']>
      ) => boolean
    }

    expect(nativeInteraction.filter_(allowed.getFeature(), layer.getLayer())).toBe(true)
    expect(nativeInteraction.filter_(blocked.getFeature(), layer.getLayer())).toBe(false)
  })

  it('keeps layers usable for filter callbacks when features are set', () => {
    const layer = new VectorLayer()
    const point = new Point([120, 30])
    layer.addFeature(point)
    const filter = vi.fn(() => true)
    // 未挂载到地图：此前 features 会清空 layers，导致 filter 拿不到图层而恒为 false
    const select = new Select({ layers: [layer], features: [point], filter })
    const nativeInteraction = select.getInteraction() as unknown as {
      filter_: (
        feature: ReturnType<Point['getFeature']>,
        layer: ReturnType<VectorLayer['getLayer']>
      ) => boolean
    }

    expect(nativeInteraction.filter_(point.getFeature(), layer.getLayer())).toBe(true)
    expect(filter).toHaveBeenCalledWith(point, layer)
  })

  it('syncs the selected and deselected deltas when selecting programmatically', () => {
    const layer = new VectorLayer()
    const first = new Point([120, 30])
    const second = new Point([121, 31])
    layer.addFeatures([first, second])
    const select = new Select({ layers: [layer] })

    select.select(first)
    expect(select.getSelected()).toEqual([first])

    select.select([second])
    expect(select.getSelected()).toEqual([first, second])

    select.deselect(first)
    expect(select.getSelected()).toEqual([second])
    expect(select.getDeselected()).toEqual([first])
  })

  it('does not duplicate the delta when selecting the same feature twice', () => {
    const layer = new VectorLayer()
    const point = new Point([120, 30])
    layer.addFeature(point)
    const select = new Select({ layers: [layer] })

    select.select(point)
    select.select(point)

    expect(select.getSelected()).toEqual([point])
    expect(select.getSelection()).toEqual([point])
  })

  it('moves the current selection into the deselected delta on clear', () => {
    const layer = new VectorLayer()
    const point = new Point([120, 30])
    layer.addFeature(point)
    const select = new Select({ layers: [layer] })

    select.select(point)
    select.clearSelection()

    expect(select.getSelection()).toEqual([])
    expect(select.getSelected()).toEqual([])
    expect(select.getDeselected()).toEqual([point])
  })

  it('reads and replaces the features whitelist', () => {
    const first = new Point([120, 30])
    const second = new Point([121, 31])
    const select = new Select({ features: [first] })

    expect(select.getFeatures()).toEqual([first])

    select.setFeatures(second)
    expect(select.getFeatures()).toEqual([second])

    expect(() => select.setFeatures(null as never)).toThrow(/Feature或Feature数组/)
    expect(() => new Select({ features: 'invalid' as never })).toThrow(/Feature或Feature数组/)
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
