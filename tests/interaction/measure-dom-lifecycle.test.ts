// @vitest-environment happy-dom

import Feature from 'ol/Feature'
import LineString from 'ol/geom/LineString'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Map, Measure, MeasureMode } from '../../src/index'

function createMap() {
  const target = document.createElement('div')
  target.style.width = '800px'
  target.style.height = '600px'
  document.body.appendChild(target)

  return new Map(target, {
    view: { center: [0, 0], zoom: 2 },
    interactions: [],
    controls: [],
    popups: []
  })
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('Measure DOM lifecycle', () => {
  it('removes and remounts its layer, overlays and listeners without duplication', () => {
    const map = createMap()
    const measure = new Measure(MeasureMode.Distance)

    map.addInteraction(measure)

    expect(map.getInteractions()).toEqual([measure])
    expect(map.getAllLayers()).toEqual([measure.getLayer()])
    expect(map.getPopups()).toHaveLength(2)
    expect(map.getMap().getOverlays().getLength()).toBe(2)
    expect(map.getMap().hasListener('pointermove')).toBe(true)

    map.removeInteraction(measure)

    expect(map.getInteractions()).toEqual([])
    expect(map.getAllLayers()).toEqual([])
    expect(map.getPopups()).toEqual([])
    expect(map.getMap().getOverlays().getLength()).toBe(0)
    expect(map.getMap().hasListener('pointermove')).toBe(false)

    map.addInteraction(measure)

    expect(map.getInteractions()).toEqual([measure])
    expect(map.getAllLayers()).toEqual([measure.getLayer()])
    expect(map.getPopups()).toHaveLength(2)
    expect(map.getMap().getOverlays().getLength()).toBe(2)

    measure.dispose()
    measure.dispose()

    expect(measure.isDisposed()).toBe(true)
    expect(map.getInteractions()).toEqual([])
    expect(map.getAllLayers()).toEqual([])
    expect(map.getPopups()).toEqual([])
    expect(map.getMap().getOverlays().getLength()).toBe(0)
    expect(map.getMap().hasListener('pointermove')).toBe(false)

    map.dispose()
  })

  it('does not leave DOM or OpenLayers resources across repeated instances', () => {
    const map = createMap()

    for (let index = 0; index < 3; index += 1) {
      const measure = new Measure(MeasureMode.Area)
      map.addInteraction(measure)
      measure.dispose()

      expect(map.getInteractions()).toEqual([])
      expect(map.getAllLayers()).toEqual([])
      expect(map.getPopups()).toEqual([])
      expect(map.getMap().getOverlays().getLength()).toBe(0)
    }

    map.dispose()

    expect(document.querySelectorAll('.omap-measure-tooltip')).toHaveLength(0)
    expect(document.querySelectorAll('.omap-measure-result')).toHaveLength(0)
    expect(document.querySelectorAll('.omap-measure-marker')).toHaveLength(0)
  })

  it('provides typed start/end payloads and a stable result snapshot', () => {
    vi.useFakeTimers()
    const map = createMap()
    const measure = new Measure(MeasureMode.Distance)
    const starts: Array<{ type: string }> = []
    const results: Array<Readonly<{ value: number; unit: string }> | undefined> = []
    const feature = new Feature(
      new LineString([
        [0, 0],
        [1, 1]
      ])
    )

    measure.on('measure:start', (event) => starts.push(event))
    measure.once('measure:end', (event) => results.push(event.result))
    map.addInteraction(measure)

    measure.getInteraction().dispatchEvent({ type: 'drawstart', feature })
    measure.getInteraction().dispatchEvent({ type: 'drawend', feature })
    vi.runAllTimers()

    expect(starts).toMatchObject([{ type: 'measure:start' }])
    expect(results).toEqual([{ value: 0, unit: 'km' }])

    map.dispose()
    vi.useRealTimers()
  })
})
