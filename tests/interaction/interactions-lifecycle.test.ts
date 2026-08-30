// @vitest-environment happy-dom

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  DoubleClickZoom,
  DragBox,
  DragPan,
  DragZoom,
  InteractionExtent,
  KeyboardZoom,
  Link,
  Map,
  MouseWheelZoom,
  OMapError
} from '../../src/index'
import type Interaction from '../../src/module/interaction/Interaction/index'

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

/** 待覆盖的普通交互及其期望类型标识。 */
const interactionFactories: Array<[string, () => Interaction<never>]> = [
  ['DoubleClickZoom', () => new DoubleClickZoom() as unknown as Interaction<never>],
  ['DragBox', () => new DragBox() as unknown as Interaction<never>],
  ['DragPan', () => new DragPan() as unknown as Interaction<never>],
  ['DragZoom', () => new DragZoom() as unknown as Interaction<never>],
  ['InteractionExtent', () => new InteractionExtent() as unknown as Interaction<never>],
  ['KeyboardZoom', () => new KeyboardZoom() as unknown as Interaction<never>],
  ['Link', () => new Link() as unknown as Interaction<never>],
  ['MouseWheelZoom', () => new MouseWheelZoom() as unknown as Interaction<never>]
]

/** 需要 DOM 渲染节点的交互，逐个以 `active: false` 构造。 */
const domInteractionFactories: Array<[string, () => Interaction<never>]> = [
  ['DragBox', () => new DragBox({ active: false }) as unknown as Interaction<never>],
  ['DragZoom', () => new DragZoom({ active: false }) as unknown as Interaction<never>],
  [
    'InteractionExtent',
    () => new InteractionExtent({ active: false }) as unknown as Interaction<never>
  ]
]

afterEach(() => {
  document.body.replaceChildren()
})

describe('common interactions construction', () => {
  it.each(interactionFactories)(
    '%s reports its type and starts with a null id',
    (_name, create) => {
      const interaction = create()

      expect(interaction.type).toBeTruthy()
      expect(interaction.getId()).toBeNull()
      expect(interaction.getInteraction()).toBeDefined()
    }
  )

  it('applies the id supplied through params', () => {
    expect(new DragPan({ id: 'pan-1' }).getId()).toBe('pan-1')
    expect(new KeyboardZoom({ id: 7 }).getId()).toBe(7)
  })

  it('keeps the public active field in sync with the native state', () => {
    for (const [, create] of interactionFactories) {
      const interaction = create()
      expect(interaction.active).toBe(interaction.getActive())
    }
  })

  it.each(domInteractionFactories)('%s applies the active option on construction', (_n, create) => {
    const interaction = create()

    expect(interaction.getActive()).toBe(false)
    expect(interaction.active).toBe(false)
  })
})

describe('common interactions activation', () => {
  it('toggles the native active state', () => {
    const pan = new DragPan()

    pan.setActive(false)
    expect(pan.getActive()).toBe(false)
    expect(pan.active).toBe(false)

    pan.setActive(true)
    expect(pan.getActive()).toBe(true)
    expect(pan.active).toBe(true)
  })

  it('warns and keeps the state when setActive receives a non boolean', () => {
    const pan = new DragPan()
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    pan.setActive(false)
    pan.setActive('yes' as unknown as boolean)

    expect(pan.getActive()).toBe(false)
    expect(warn).toHaveBeenCalled()

    warn.mockRestore()
  })

  it('emits change:active with the interaction as target', () => {
    const pan = new DragPan()
    const seen: Array<{ type: string; key?: string }> = []

    pan.on('change:active', (payload: { type: string; key?: string }) => seen.push(payload))
    pan.setActive(false)

    expect(seen).toHaveLength(1)
    expect(seen[0]?.type).toBe('change:active')
    expect(seen[0]?.key).toBe('active')
  })

  it('does not emit when the active state does not change', () => {
    const pan = new DragPan()
    const handler = vi.fn()

    pan.on('change:active', handler)
    pan.setActive(pan.getActive())

    expect(handler).not.toHaveBeenCalled()
  })
})

describe('common interactions event subscription', () => {
  it('supports on, once and un', () => {
    const pan = new DragPan()
    const persistent = vi.fn()

    const id = pan.on('change:active', persistent)
    pan.setActive(false)
    expect(persistent).toHaveBeenCalledTimes(1)

    pan.un(id)
    pan.setActive(true)
    expect(persistent).toHaveBeenCalledTimes(1)
  })

  it('fires a once listener at most a single time', () => {
    const pan = new DragPan()
    const handler = vi.fn()

    pan.once('change:active', handler)
    pan.setActive(false)
    pan.setActive(true)

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('rejects unknown event types', () => {
    const pan = new DragPan()

    expect(() => pan.on('bogus' as 'change:active', vi.fn())).toThrow(OMapError)
  })

  it('rejects missing or non callable listeners', () => {
    const pan = new DragPan()

    expect(() => pan.on('change:active', undefined as unknown as () => void)).toThrow(OMapError)
    expect(() => pan.on('change:active', 'not a function' as unknown as () => void)).toThrow(
      OMapError
    )
  })

  it('rejects an invalid un identifier', () => {
    const pan = new DragPan()

    expect(() => pan.un(undefined as unknown as string)).toThrow(OMapError)
    expect(() => pan.un(123 as unknown as string)).toThrow(OMapError)
  })

  it('warns instead of throwing when un receives an unknown id', () => {
    const pan = new DragPan()
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    expect(() => pan.un('missing-id')).not.toThrow()
    expect(warn).toHaveBeenCalled()

    warn.mockRestore()
  })
})

describe('common interactions lifecycle', () => {
  it('mounts, removes and re-mounts without disposing', () => {
    const map = createMap()
    const pan = new DragPan({ id: 'pan-lifecycle' })

    map.addInteraction(pan)
    expect(map.getInteractions()).toEqual([pan])
    expect(map.getInteractionById('pan-lifecycle')).toBe(pan)

    pan.remove()
    expect(map.getInteractions()).toEqual([])
    expect(pan.isDisposed()).toBe(false)

    map.addInteraction(pan)
    expect(map.getInteractions()).toEqual([pan])
  })

  it('disposes idempotently and unmounts from the map', () => {
    const map = createMap()
    const pan = new DragPan()
    map.addInteraction(pan)

    const nativeDispose = vi.spyOn(pan.getInteraction(), 'dispose')

    pan.dispose()
    pan.dispose()

    expect(pan.isDisposed()).toBe(true)
    expect(nativeDispose).toHaveBeenCalledTimes(1)
    expect(map.getInteractions()).toEqual([])
    expect(pan.getActive()).toBe(false)
  })

  it('releases the event manager and native listeners on dispose', () => {
    const map = createMap()
    const pan = new DragPan()
    const handler = vi.fn()
    map.addInteraction(pan)

    pan.on('change:active', handler)
    pan.dispose()

    expect(pan.events.isDisposed()).toBe(true)
    expect(pan.events.listenerCount('change:active')).toBe(0)
    expect(() => pan.on('change:active', handler)).toThrow(OMapError)
  })

  it('disposes every mounted interaction when the map is disposed', () => {
    const map = createMap()
    const pan = new DragPan()
    const zoom = new MouseWheelZoom()
    map.addInteraction(pan)
    map.addInteraction(zoom)

    map.dispose()

    expect(pan.isDisposed()).toBe(true)
    expect(zoom.isDisposed()).toBe(true)
    expect(map.getInteractions()).toEqual([])
  })

  it('keeps onBoxEnd callbacks isolated between DragBox instances', () => {
    const firstCallback = vi.fn()
    const secondCallback = vi.fn()
    const first = new DragBox({ onBoxEnd: firstCallback })
    const second = new DragBox({ onBoxEnd: secondCallback })
    // 触发路径与 boxend 一致：由实例私有的回调持有者派发
    const emitBoxEnd = (box: DragBox) => {
      ;(
        box as unknown as { boxEndHandle: { emit: (e: { target: DragBox }) => void } }
      ).boxEndHandle.emit({
        target: box
      })
    }

    emitBoxEnd(first)
    expect(firstCallback).toHaveBeenCalledTimes(1)
    expect(secondCallback).not.toHaveBeenCalled()

    emitBoxEnd(second)
    expect(secondCallback).toHaveBeenCalledTimes(1)

    // 销毁一个实例不应清空另一个实例的回调
    first.dispose()
    emitBoxEnd(second)
    expect(secondCallback).toHaveBeenCalledTimes(2)
  })

  it('rejects invalid interactions when adding to the map', () => {
    const map = createMap()

    expect(() => map.addInteraction(undefined as unknown as DragPan)).toThrow(OMapError)
    expect(() => map.addInteraction({} as unknown as DragPan)).toThrow(OMapError)

    map.dispose()
  })
})
