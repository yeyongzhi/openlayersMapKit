import { describe, expect, it, vi } from 'vitest'
import OMap from '../../src/module/core/Map/index'
import { createDefaultMapInteractions } from '../../src/module/core/Map/type'

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
