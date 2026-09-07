import { describe, expect, it, vi } from 'vitest'
import { Draw, DrawMode, Point } from '../../src/index'

describe('Draw lifecycle', () => {
  it('honors the initial active option', () => {
    const draw = new Draw(DrawMode.Point, { active: false })

    expect(draw.getActive()).toBe(false)
  })

  it('emits drawend with a stable OMap feature wrapper', () => {
    const draw = new Draw(DrawMode.Point)
    const point = new Point([120, 30])
    const listener = vi.fn()
    draw.getLayer()?.addFeature(point)

    draw.on('drawend', listener)
    draw.getInteraction().dispatchEvent({
      type: 'drawend',
      feature: point.getFeature()
    })

    expect(listener).toHaveBeenCalledOnce()
    expect(listener.mock.calls[0][0].feature).toBe(point)
  })

  it('removes once listeners from the native interaction after the first event', () => {
    const draw = new Draw(DrawMode.Point)
    const listener = vi.fn()
    const nativeInteraction = draw.getInteraction()

    draw.once('drawabort', listener)
    nativeInteraction.dispatchEvent({ type: 'drawabort' })
    draw.getInteraction().dispatchEvent({ type: 'drawabort' })

    expect(listener).toHaveBeenCalledOnce()
  })

  it('disposes interaction listeners idempotently', () => {
    const draw = new Draw(DrawMode.Point)
    const listener = vi.fn()
    const nativeInteraction = draw.getInteraction()

    draw.on('drawabort', listener)
    draw.dispose()
    draw.dispose()
    nativeInteraction.dispatchEvent({ type: 'drawabort' })

    expect(draw.isDisposed()).toBe(true)
    expect(listener).not.toHaveBeenCalled()
  })

  it('keeps completed features on abort and clears them explicitly', () => {
    const draw = new Draw(DrawMode.Point)
    const point = new Point([120, 30])
    draw.getLayer()?.addFeature(point)

    draw.abort()
    expect(draw.getFeatures()).toEqual([point])

    draw.clearFeatures()
    expect(draw.getFeatures()).toEqual([])
  })
})

// OpenLayers emits drawend before it inserts the completed feature into the source.
describe('Draw completion contract', () => {
  it('emits once with a complete snapshot and does not synthesize events for source additions', () => {
    const draw = new Draw(DrawMode.LineString)
    const layer = draw.getLayer()!
    layer.setTarget(draw)
    const point = new Point([120, 30])
    const callback = vi.fn()
    draw.on('drawend', callback)
    draw.getInteraction().dispatchEvent({ type: 'drawend', feature: point.getFeature() })
    layer.getSource()!.addFeature(point.getFeature())

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback.mock.calls[0][0].feature).toBe(point)
    expect(callback.mock.calls[0][0].features).toEqual([point])
    layer.addFeature(new Point([121, 31]))
    expect(callback).toHaveBeenCalledTimes(1)
    draw.dispose()
  })
})
