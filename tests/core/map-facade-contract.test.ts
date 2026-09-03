// @vitest-environment happy-dom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { Extent, LayerGroup, Map, OMapError, VectorLayer } from '../../src/index'

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

describe('Map facade contract', () => {
  it('manages size and isolated map properties', () => {
    const map = createMap()
    expect(map.getSize()).toBeUndefined()

    map.setSize([800, 600])
    expect(map.getSize()?.toArray()).toEqual([800, 600])

    map.setProperties({ stable: 1 })
    const properties = map.getProperties()
    properties.stable = 2
    expect(map.getProperties()).toMatchObject({ stable: 1 })

    expect(() => map.setSize(undefined)).toThrow(OMapError)
    expect(() => map.setProperties(undefined as never)).toThrow(OMapError)
    expect(() => map.setProperties('invalid' as never)).toThrow(OMapError)
    map.dispose()
  })

  it('delegates batched layer and layer-group operations', () => {
    const map = createMap()
    const first = new VectorLayer({ id: 'first' })
    const second = new VectorLayer({ id: 'second' })

    map.addLayers([first, second])
    expect(map.getAllLayers()).toEqual([first, second])
    map.removeLayers([first, second])
    expect(map.getAllLayers()).toEqual([])

    const group = new LayerGroup('group', [first])
    map.addLayerGroup(group)
    map.removeLayerGroup(group)
    expect(map.getAllLayerGroups()).toEqual([])
    map.addLayerGroup(group)
    map.removeLayerGroupById('group')
    expect(map.getAllLayerGroups()).toEqual([])
    map.dispose()
  })

  it('converts coordinate, pixel and browser event values', () => {
    const map = createMap()
    const native = map.getMap()
    vi.spyOn(native, 'getCoordinateFromPixel').mockReturnValue([10, 20])
    vi.spyOn(native, 'getPixelFromCoordinate').mockReturnValue([30, 40])
    vi.spyOn(native, 'getEventCoordinate').mockReturnValue([50, 60])
    vi.spyOn(native, 'getEventPixel').mockReturnValue([70, 80])

    expect(map.getCoordinateFromPixel([1, 2])?.toArray()).toEqual([10, 20])
    expect(map.getPixelFromCoordinate([3, 4]).toArray()).toEqual([30, 40])
    expect(map.getEventCoordinate(new MouseEvent('click')).toArray()).toEqual([50, 60])
    expect(map.getEventPixel(new UIEvent('click')).toArray()).toEqual([70, 80])

    expect(() => map.getCoordinateFromPixel(undefined as never)).toThrow(OMapError)
    expect(() => map.getCoordinateFromPixel('invalid' as never)).toThrow(OMapError)
    expect(() => map.getPixelFromCoordinate(undefined as never)).toThrow(OMapError)
    expect(() => map.getPixelFromCoordinate('invalid' as never)).toThrow(OMapError)
    map.dispose()
  })

  it('delegates feature queries through the facade', () => {
    const map = createMap()
    const callback = vi.fn()
    const featureQuery = (
      map as unknown as {
        featureQuery: {
          forEachAtPixel: ReturnType<typeof vi.fn>
          getAtPixel: ReturnType<typeof vi.fn>
          hasAtPixel: ReturnType<typeof vi.fn>
        }
      }
    ).featureQuery
    vi.spyOn(featureQuery, 'forEachAtPixel').mockReturnValue('result')
    vi.spyOn(featureQuery, 'getAtPixel').mockReturnValue([])
    vi.spyOn(featureQuery, 'hasAtPixel').mockReturnValue(true)

    expect(
      map.forEachFeatureAtPixel([1, 2], callback, { hitTolerance: 0, checkWrapped: true })
    ).toBe('result')
    expect(map.getFeaturesAtPixel([1, 2])).toEqual([])
    expect(map.hasFeatureAtPixel([1, 2])).toBe(true)
    map.dispose()
  })

  it('delegates rendering and view operations', () => {
    const map = createMap()
    const native = map.getMap()
    const render = vi.spyOn(native, 'render').mockImplementation(() => {})
    const renderSync = vi.spyOn(native, 'renderSync').mockImplementation(() => {})
    const updateSize = vi.spyOn(native, 'updateSize').mockImplementation(() => {})

    map.render()
    map.renderSync()
    map.updateSize()
    expect(render).toHaveBeenCalledOnce()
    expect(renderSync).toHaveBeenCalledOnce()
    expect(updateSize).toHaveBeenCalledOnce()

    map.zoomIn()
    map.zoomOut()
    map.adjustCenter([1, 2])
    map.adjustResolution(1)
    map.adjustRotation(0.1)
    map.adjustZoom(1)
    map.animate({ duration: 0, easing: 'linear', zoom: 4 })
    map.beginInteraction()
    map.cancelAnimations()
    map.centerOn([0, 0], [100, 100], [50, 50])
    map.changed()
    map.endInteraction(0, 0, [0, 0])
    map.fit(new Extent([0, 0, 10, 10]))

    expect(map.getExtent()).toBeInstanceOf(Extent)
    expect(map.getAnimating()).toBeTypeOf('boolean')
    expect(map.getInteracting()).toBeTypeOf('boolean')
    expect(map.getMaxResolution()).toBeTypeOf('number')
    expect(map.getMinResolution()).toBeTypeOf('number')
    expect(map.getResolutionForExtent([0, 0, 10, 10])).toBeTypeOf('number')
    expect(map.getResolutionForExtent(new Extent([0, 0, 10, 10]), [100, 100])).toBeTypeOf('number')
    expect(map.getResolutionForZoom(3)).toBeTypeOf('number')
    expect(map.getZoomForResolution(100)).toBeTypeOf('number')
    expect(map.getResolutions()).toBeUndefined()
    expect(() => map.getResolutionForExtent(undefined as never)).toThrow(OMapError)
    expect(() => map.getResolutionForExtent('invalid' as never)).toThrow(OMapError)
    map.dispose()
  })
})
