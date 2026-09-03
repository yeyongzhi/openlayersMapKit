// @vitest-environment happy-dom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { FullScreen, Map, OMapError, OMapErrorCode, Zoom } from '../../src/index'

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

/** 取得控件原生 DOM 元素，用于验证 className 一类构造选项。 */
const elementOf = (control: { getControl: () => { element?: HTMLElement } }) =>
  control.getControl().element as HTMLElement

describe('Zoom construction', () => {
  it('applies default options when none are supplied', () => {
    const zoom = new Zoom()

    expect(zoom.type).toBe('Zoom')
    expect(zoom.getId()).toBeNull()
    expect(zoom.getControl()).toBeDefined()
    expect(elementOf(zoom).className).toContain('ol-zoom')
  })

  it('accepts an options object and merges it over the defaults', () => {
    const zoom = new Zoom({ className: 'my-zoom', duration: 500 })

    expect(elementOf(zoom).className).toContain('my-zoom')
    // 构造选项进入原生实例而非 properties 字典
    expect(zoom.getProperties()).toEqual({})
  })

  it('accepts string and numeric ids in the first overload', () => {
    expect(new Zoom('zoom-1').getId()).toBe('zoom-1')
    expect(new Zoom(42).getId()).toBe(42)
  })

  it('accepts an id together with options', () => {
    const zoom = new Zoom('zoom-2', { className: 'zoned' })

    expect(zoom.getId()).toBe('zoom-2')
    expect(elementOf(zoom).className).toContain('zoned')
  })

  it('supports property read and write', () => {
    const zoom = new Zoom()

    expect(zoom.getProperties()).toEqual({})

    zoom.setProperties({ custom: 'value' })

    expect(zoom.getProperties()).toEqual({ custom: 'value' })
  })
})

describe('FullScreen construction', () => {
  it('applies default options', () => {
    const fullScreen = new FullScreen()

    expect(fullScreen.type).toBe('FullScreen')
    expect(fullScreen.getId()).toBeNull()
    expect(fullScreen.getControl()).toBeDefined()
    expect(elementOf(fullScreen).className).toContain('ol-full-screen')
  })

  it('accepts an options object and an id overload', () => {
    expect(elementOf(new FullScreen({ className: 'custom-fullscreen' })).className).toContain(
      'custom-fullscreen'
    )
    expect(new FullScreen('fs-1').getId()).toBe('fs-1')
    expect(new FullScreen('fs-2', { className: 'x' }).getId()).toBe('fs-2')
    expect(elementOf(new FullScreen('fs-2', { className: 'x' })).className).toContain('x')
  })
})

describe('Control mounting lifecycle', () => {
  it('mounts a control and exposes it through the Map queries', () => {
    const map = createMap()
    const zoom = new Zoom('zoom-main')

    map.addControl(zoom)

    expect(map.getControls()).toEqual([zoom])
    expect(map.getControlById('zoom-main')).toBe(zoom)
    expect(map.getMap().getControls().getArray()).toContain(zoom.getControl())
  })

  it('supports remove and re-mount without disposing', () => {
    const map = createMap()
    const zoom = new Zoom('zoom-remount')

    map.addControl(zoom)
    zoom.remove()
    expect(map.getControls()).toEqual([])
    expect(zoom.isDisposed()).toBe(false)

    map.addControl(zoom)
    expect(map.getControls()).toEqual([zoom])
    expect(map.getControlById('zoom-remount')).toBe(zoom)
  })

  it('unmounts from the Map through removeControl', () => {
    const map = createMap()
    const zoom = new Zoom()

    map.addControl(zoom)
    map.removeControl(zoom)

    expect(map.getControls()).toEqual([])
    expect(map.getMap().getControls().getArray()).not.toContain(zoom.getControl())
    expect(zoom.isDisposed()).toBe(false)
  })

  it('ignores duplicate adds and warns', () => {
    const map = createMap()
    const zoom = new Zoom()
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    map.addControl(zoom)
    map.addControl(zoom)

    expect(map.getControls()).toHaveLength(1)
    expect(warn).toHaveBeenCalled()

    warn.mockRestore()
  })

  it('disposes a control idempotently and unmounts it', () => {
    const map = createMap()
    const zoom = new Zoom()
    map.addControl(zoom)

    const nativeDispose = vi.spyOn(zoom.getControl(), 'dispose')

    zoom.dispose()
    zoom.dispose()

    expect(zoom.isDisposed()).toBe(true)
    expect(nativeDispose).toHaveBeenCalledTimes(1)
    expect(map.getControls()).toEqual([])
  })

  it('disposes every mounted control when the Map is disposed', () => {
    const map = createMap()
    const zoom = new Zoom()
    const fullScreen = new FullScreen()
    map.addControl(zoom)
    map.addControl(fullScreen)

    map.dispose()

    expect(zoom.isDisposed()).toBe(true)
    expect(fullScreen.isDisposed()).toBe(true)
    expect(map.getControls()).toEqual([])
  })

  it('stops delivering events after dispose', () => {
    const map = createMap()
    const zoom = new Zoom()
    const handler = vi.fn()
    map.addControl(zoom)

    zoom.events.on('custom', handler)
    zoom.events.emit('custom', { value: 1 })
    expect(handler).toHaveBeenCalledTimes(1)

    zoom.dispose()
    zoom.events.emit('custom', { value: 2 })
    expect(handler).toHaveBeenCalledTimes(1)
    expect(zoom.events.isDisposed()).toBe(true)
  })

  it('rejects registering listeners after dispose', () => {
    const map = createMap()
    const zoom = new Zoom()
    map.addControl(zoom)
    zoom.dispose()

    expect(() => zoom.events.on('custom', vi.fn())).toThrow(OMapError)
  })

  it('rejects state changes and native access after dispose', () => {
    const zoom = new Zoom('disposed-control')
    zoom.dispose()

    const operations = [
      () => zoom.getControl(),
      () => zoom.setId('new-id'),
      () => zoom.setProperties({ custom: true }),
      () => zoom.setMap(null),
      () => zoom.remove()
    ]

    for (const operation of operations) {
      try {
        operation()
        throw new Error('Expected operation to throw')
      } catch (error) {
        expect(error).toBeInstanceOf(OMapError)
        expect((error as OMapError).code).toBe(OMapErrorCode.Disposed)
      }
    }

    expect(zoom.getId()).toBe('disposed-control')
    expect(zoom.isDisposed()).toBe(true)
  })
})

describe('Control state and event contract', () => {
  it('warns and preserves the id when setId receives no value', () => {
    const zoom = new Zoom('stable-id')
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    zoom.setId(undefined as unknown as string)

    expect(zoom.getId()).toBe('stable-id')
    expect(warn).toHaveBeenCalledOnce()
    warn.mockRestore()
  })

  it('returns an isolated property snapshot', () => {
    const zoom = new Zoom()
    zoom.setProperties({ custom: 'original' })

    const properties = zoom.getProperties()
    properties.custom = 'changed'

    expect(zoom.getProperties()).toEqual({ custom: 'original' })
  })

  it('subscribes to and unsubscribes from native control events', () => {
    const zoom = new Zoom()
    const callback = vi.fn()
    const id = zoom.on('change', callback)

    zoom.getControl().dispatchEvent('change')
    expect(callback).toHaveBeenCalledOnce()

    zoom.un(id)
    zoom.getControl().dispatchEvent('change')
    expect(callback).toHaveBeenCalledOnce()
  })

  it('removes a once subscription after its first native event', () => {
    const zoom = new Zoom()
    const callback = vi.fn()
    zoom.once('change', callback)

    zoom.getControl().dispatchEvent('change')
    zoom.getControl().dispatchEvent('change')

    expect(callback).toHaveBeenCalledOnce()
    expect(zoom.events.listenerCount('change')).toBe(0)
  })

  it('rejects invalid event subscription arguments', () => {
    const zoom = new Zoom()
    const invalidCalls = [
      () => zoom.on(undefined as unknown as 'change', vi.fn()),
      () => zoom.on('unknown' as 'change', vi.fn()),
      () => zoom.on('change', undefined as unknown as () => void),
      () => zoom.on('change', 'callback' as unknown as () => void),
      () => zoom.once(undefined as unknown as 'change', vi.fn()),
      () => zoom.once('unknown' as 'change', vi.fn()),
      () => zoom.once('change', undefined as unknown as () => void),
      () => zoom.once('change', 'callback' as unknown as () => void)
    ]

    for (const invalidCall of invalidCalls) {
      expect(invalidCall).toThrow(OMapError)
    }
  })

  it('validates subscription ids and warns for an unknown id', () => {
    const zoom = new Zoom()

    expect(() => zoom.un(undefined as unknown as string)).toThrow(OMapError)
    expect(() => zoom.un(1 as unknown as string)).toThrow(OMapError)

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(() => zoom.un('missing-id')).not.toThrow()
    expect(warn).toHaveBeenCalledOnce()
    warn.mockRestore()
  })
})

describe('Control manager input validation', () => {
  it('returns an isolated controls collection snapshot', () => {
    const map = createMap()
    const zoom = new Zoom()
    map.addControl(zoom)

    const snapshot = map.getControls()
    snapshot.length = 0

    expect(map.getControls()).toEqual([zoom])
    map.dispose()
  })

  it('rejects missing and invalid controls', () => {
    const map = createMap()

    expect(() => map.addControl(undefined as unknown as Zoom)).toThrow(OMapError)
    expect(() => map.addControl({} as unknown as Zoom)).toThrow(OMapError)
  })

  it('rejects invalid ids when querying controls', () => {
    const map = createMap()

    expect(() => map.getControlById(undefined as unknown as string)).toThrow(OMapError)
    expect(() => map.getControlById({} as unknown as string)).toThrow(OMapError)
  })

  it('returns null for an unknown id', () => {
    const map = createMap()

    expect(map.getControlById('missing')).toBeNull()
  })

  it('warns instead of throwing when removing an unmounted control', () => {
    const map = createMap()
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const zoom = new Zoom()

    expect(() => map.removeControl(zoom)).not.toThrow()
    expect(warn).toHaveBeenCalled()

    warn.mockRestore()
    map.dispose()
  })
})
