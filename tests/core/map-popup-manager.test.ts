// @vitest-environment happy-dom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { DragPan, LayerGroup, Map, Popup, VectorLayer, Zoom } from '../../src/index'

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

describe('Map Popup manager', () => {
  it('owns popup mounting, queries and removal behind the Map facade', () => {
    const map = createMap()
    const popup = new Popup({ id: 'station-popup', element: document.createElement('div') })
    popup.setProperties({ category: 'station' })

    map.addPopup(popup)

    expect(map.getPopups()).toEqual([popup])
    expect(map.getPopupById('station-popup')).toBe(popup)
    expect(map.getPopupByProperties(({ category }) => category === 'station')).toEqual([popup])
    expect(map.getMap().getOverlays().getArray()).toEqual([popup.getPopup()])
    expect(popup.map).toBe(map)

    map.removePopup(popup)

    expect(map.getPopups()).toEqual([])
    expect(map.getMap().getOverlays().getLength()).toBe(0)
    expect(popup.map).toBeNull()
    expect(popup.isDisposed()).toBe(false)

    map.addPopup(popup)
    expect(map.getPopups()).toEqual([popup])

    map.dispose()
    expect(popup.isDisposed()).toBe(true)
  })

  it('clears every managed popup when the Map is disposed', () => {
    const map = createMap()
    const first = new Popup({ element: document.createElement('div') })
    const second = new Popup({ element: document.createElement('div') })
    map.addPopup(first)
    map.addPopup(second)

    map.dispose()

    expect(map.getPopups()).toEqual([])
    expect(first.map).toBeNull()
    expect(second.map).toBeNull()
    expect(first.isDisposed()).toBe(true)
    expect(second.isDisposed()).toBe(true)
  })

  it('delivers one typed payload per Popup subscription without duplicate fan-out', () => {
    const map = createMap()
    const popup = new Popup({ element: document.createElement('div') })
    const first = vi.fn()
    const second = vi.fn()
    const once = vi.fn()
    map.addPopup(popup)
    popup.on('change:position', first)
    popup.on('change:position', second)
    popup.once('change:position', once)

    popup.setPosition([120, 30])
    popup.setPosition([121, 31])

    expect(first).toHaveBeenCalledTimes(2)
    expect(second).toHaveBeenCalledTimes(2)
    expect(once).toHaveBeenCalledOnce()
    expect(first.mock.calls[0][0]).toMatchObject({
      target: popup,
      type: 'change:position'
    })
    expect(first.mock.calls[0][0].newValue.toArray()).toEqual([120, 30])
    map.dispose()
  })
})

describe('Map Control manager', () => {
  it('owns control mounting, ID queries and removal behind the Map facade', () => {
    const map = createMap()
    const control = new Zoom('primary-zoom')

    map.addControl(control)

    expect(map.getControls()).toEqual([control])
    expect(map.getControlById('primary-zoom')).toBe(control)
    expect(map.getMap().getControls().getArray()).toEqual([control.getControl()])

    map.removeControl(control)

    expect(map.getControls()).toEqual([])
    expect(map.getMap().getControls().getLength()).toBe(0)
    expect(control.isDisposed()).toBe(false)

    map.addControl(control)
    expect(map.getControls()).toEqual([control])

    map.dispose()
    expect(control.isDisposed()).toBe(true)
  })

  it('clears every managed control when the Map is disposed', () => {
    const map = createMap()
    const first = new Zoom('first')
    const second = new Zoom('second')
    map.addControl(first)
    map.addControl(second)

    map.dispose()

    expect(map.getControls()).toEqual([])
    expect(first.isDisposed()).toBe(true)
    expect(second.isDisposed()).toBe(true)
  })
})

describe('Map Interaction manager', () => {
  it('owns interaction mounting, ID queries and removable remounting', () => {
    const map = createMap()
    const interaction = new DragPan({ id: 'primary-pan', active: false })

    map.addInteraction(interaction)

    expect(map.getInteractions()).toEqual([interaction])
    expect(map.getInteractionById('primary-pan')).toBe(interaction)
    expect(map.getMap().getInteractions().getArray()).toEqual([interaction.getInteraction()])
    expect(interaction.getActive()).toBe(true)
    expect(interaction.map).toBe(map)

    map.removeInteraction(interaction)

    expect(map.getInteractions()).toEqual([])
    expect(map.getMap().getInteractions().getLength()).toBe(0)
    expect(interaction.map).toBeNull()
    expect(interaction.isDisposed()).toBe(false)

    map.addInteraction(interaction)
    expect(map.getInteractions()).toEqual([interaction])

    map.dispose()

    expect(map.getInteractions()).toEqual([])
    expect(interaction.isDisposed()).toBe(true)
  })
})

describe('Map Layer manager', () => {
  it('owns layer mounting, ID queries and native collection synchronization', () => {
    const map = createMap()
    const layer = new VectorLayer({ id: 'stations' })

    map.addLayer(layer)

    expect(map.getAllLayers()).toEqual([layer])
    expect(map.getLayerById('stations')).toBe(layer)
    expect(map.getMap().getLayers().getArray()).toEqual([layer.getLayer()])
    expect(layer.getTarget()).toBe(map)

    map.removeLayerById('stations')

    expect(map.getAllLayers()).toEqual([])
    expect(map.getMap().getLayers().getLength()).toBe(0)
    expect(layer.getTarget()).toBeNull()
    expect(layer.isDisposed()).toBe(false)

    map.addLayer(layer)
    expect(map.getAllLayers()).toEqual([layer])

    map.dispose()
    expect(layer.isDisposed()).toBe(true)
  })

  it('keeps LayerGroup mutations synchronized and clears groups on dispose', () => {
    const map = createMap()
    const first = new VectorLayer({ id: 'first' })
    const second = new VectorLayer({ id: 'second' })
    const group = new LayerGroup('business-layers', [first])

    map.addLayerGroup(group)
    group.add(second)

    expect(map.getLayerGroupById('business-layers')).toBe(group)
    expect(map.getAllLayers()).toEqual([first, second])
    expect(map.getMap().getLayers().getArray()).toEqual([first.getLayer(), second.getLayer()])
    expect(group.map).toBe(map)

    group.remove(first)
    expect(map.getAllLayers()).toEqual([second])

    map.dispose()

    expect(map.getAllLayerGroups()).toEqual([])
    expect(map.getAllLayers()).toEqual([])
    expect(group.map).toBeNull()
    expect(second.getTarget()).toBeNull()
  })
})

describe('Map View controller', () => {
  it('keeps center, zoom, resolution and rotation facade behavior', () => {
    const map = createMap()

    map.setCenter([10, 20])
    expect(map.getCenter()?.toArray()).toEqual([10, 20])

    map.setZoom(5)
    expect(map.getZoom()).toBe(5)

    map.setResolution(8)
    expect(map.getResolution()).toBe(8)

    map.setRotation(0.5)
    expect(map.getRotation()).toBe(0.5)
    expect(map.getProjection().getCode()).toBe('EPSG:3857')

    map.dispose()
  })

  it('delegates view constraints and extent value-object conversion', () => {
    const map = createMap()

    map.setMaxZoom(18)
    map.setMinZoom(1)
    map.setConstrainResolution(true)

    expect(map.getMaxZoom()).toBe(18)
    expect(map.getMinZoom()).toBe(1)
    expect(map.calculateExtent().toArray()).toHaveLength(4)

    map.dispose()
  })
})

describe('Map Event adapter', () => {
  it('bridges view events and unregisters subscriptions', () => {
    const map = createMap()
    const listener = vi.fn()
    const id = map.on('view:change:rotation', listener)

    map.getView().dispatchEvent({
      type: 'change:rotation',
      oldValue: 0,
      newValue: 0.5
    })

    expect(listener).toHaveBeenCalledOnce()
    expect(listener.mock.calls[0][0]).toMatchObject({
      type: 'view:change:rotation',
      oldValue: 0,
      newValue: 0.5,
      target: map
    })

    map.un(id)
    map.getView().dispatchEvent('change:rotation')
    expect(listener).toHaveBeenCalledOnce()
    map.dispose()
  })

  it('supports one-shot subscriptions and clears native listeners on dispose', () => {
    const map = createMap()
    const onceListener = vi.fn()
    const regularListener = vi.fn()
    map.once('view:change:rotation', onceListener)
    map.on('view:change:rotation', regularListener)

    map.getView().dispatchEvent('change:rotation')
    map.getView().dispatchEvent('change:rotation')

    expect(onceListener).toHaveBeenCalledOnce()
    expect(regularListener).toHaveBeenCalledTimes(2)

    map.dispose()
    map.getView().dispatchEvent('change:rotation')
    expect(regularListener).toHaveBeenCalledTimes(2)
  })
})
