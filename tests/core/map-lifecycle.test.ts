import { describe, expect, it, vi } from 'vitest'
import OMap from '../../src/module/core/Map/index'
import { createDefaultMapInteractions } from '../../src/module/core/Map/type'
import { handleMapOnCallBack } from '../../src/module/core/Map/handle'

interface MapInternals {
  _map: {
    setTarget: ReturnType<typeof vi.fn>
    dispose: ReturnType<typeof vi.fn>
  }
  events: { off: ReturnType<typeof vi.fn> }
  layers: unknown[]
  layerGroups: unknown[]
  interactions: unknown[]
  controls: unknown[]
  popups: unknown[]
  disposed: boolean
}

describe('Map lifecycle', () => {
  it('creates independent default interaction instances for every map', () => {
    const first = createDefaultMapInteractions()
    const second = createDefaultMapInteractions()

    expect(first).toHaveLength(3)
    expect(second).toHaveLength(3)
    expect(second[0]).not.toBe(first[0])
    expect(second[1]).not.toBe(first[1])
    expect(second[2]).not.toBe(first[2])
  })

  it('disposes the native map and listeners exactly once', () => {
    const map = Object.create(OMap.prototype) as OMap
    const internals = map as unknown as MapInternals
    internals._map = {
      setTarget: vi.fn(),
      dispose: vi.fn()
    }
    internals.events = { off: vi.fn() }
    internals.layers = []
    internals.layerGroups = []
    internals.interactions = []
    internals.controls = []
    internals.popups = []
    internals.disposed = false

    map.dispose()
    map.dispose()

    expect(map.isDisposed()).toBe(true)
    expect(internals.events.off).toHaveBeenCalledOnce()
    expect(internals._map.setTarget).toHaveBeenCalledOnce()
    expect(internals._map.setTarget).toHaveBeenCalledWith(undefined)
    expect(internals._map.dispose).toHaveBeenCalledOnce()
  })
})

describe('Map event payloads', () => {
  it('preserves zero values in view change events', () => {
    const map = Object.assign(Object.create(OMap.prototype) as OMap, {
      getRotation: vi.fn(() => 90)
    })

    const event = handleMapOnCallBack(map, 'view:change:rotation', {
      oldValue: 0,
      newValue: 0
    })

    expect(event?.oldValue).toBe(0)
    expect(event?.newValue).toBe(0)
    expect(map.getRotation).not.toHaveBeenCalled()
  })

  it('converts map browser coordinates and pixels to value objects', () => {
    const map = Object.create(OMap.prototype) as OMap
    const event = handleMapOnCallBack(map, 'map:click', {
      coordinate: [120, 30],
      pixel: [10, 20]
    })

    expect(event?.coordinate?.toArray()).toEqual([120, 30])
    expect(event?.pixel?.toArray()).toEqual([10, 20])
  })
})
