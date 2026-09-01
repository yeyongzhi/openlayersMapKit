import { describe, expect, it, vi } from 'vitest'
import {
  DoubleClickZoom,
  DragBox,
  DragPan,
  Draw,
  DrawMode,
  KeyboardZoom,
  Link,
  Modify,
  MouseWheelZoom,
  Select,
  VectorLayer
} from '../../src/index'
import type Interaction from '../../src/module/interaction/Interaction/index'
import { OMAP_INTERACTION_DEFAULT_PARAMS } from '../../src/module/interaction/Interaction/type'
import { createDragBoxParamsBoxEndHandle } from '../../src/module/interaction/DragBox/handle'

describe('interaction event bridge', () => {
  it('shares a single native listener across subscribers of the same type', () => {
    const pan = new DragPan()
    const first = vi.fn()
    const second = vi.fn()
    const third = vi.fn()

    pan.on('change:active', first)
    pan.on('change:active', second)
    pan.on('change:active', third)

    pan.setActive(false)

    // 每个订阅各建一份原生监听时，一次事件会让每个回调被调用 N 次（N²）
    expect(first).toHaveBeenCalledTimes(1)
    expect(second).toHaveBeenCalledTimes(1)
    expect(third).toHaveBeenCalledTimes(1)
  })

  it('keeps the bridge alive while another subscriber remains', () => {
    const pan = new DragPan()
    const first = vi.fn()
    const second = vi.fn()

    const firstId = pan.on('change:active', first)
    pan.on('change:active', second)
    pan.un(firstId)

    pan.setActive(false)

    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)
  })

  it('re-creates the bridge after the last subscriber unsubscribes', () => {
    const pan = new DragPan()
    const first = vi.fn()
    const second = vi.fn()

    const firstId = pan.on('change:active', first)
    pan.un(firstId)
    pan.on('change:active', second)

    pan.setActive(false)

    expect(first).not.toHaveBeenCalled()
    // 桥接泄漏时会残留旧监听，导致一次事件触发两次
    expect(second).toHaveBeenCalledTimes(1)
  })

  it('does not duplicate events when once and on share a type', () => {
    const pan = new DragPan()
    const onceHandler = vi.fn()
    const persistent = vi.fn()

    pan.once('change:active', onceHandler)
    pan.on('change:active', persistent)

    pan.setActive(false)
    pan.setActive(true)

    expect(onceHandler).toHaveBeenCalledTimes(1)
    expect(persistent).toHaveBeenCalledTimes(2)
  })

  it('releases the bridge when the interaction is disposed', () => {
    const pan = new DragPan()
    const handler = vi.fn()

    pan.on('change:active', handler)
    pan.dispose()
    handler.mockClear()

    pan.getInteraction().dispatchEvent({ type: 'change:active' })

    expect(handler).not.toHaveBeenCalled()
  })
})

describe('interaction initial active option', () => {
  // Measure 依赖 DOM 环境创建 tooltip 浮层，DragBox / DragZoom / InteractionExtent 构造时会
  // 创建渲染用的 DOM 节点，它们的 active 行为由 measure-dom-lifecycle.test.ts 与
  // interactions-lifecycle.test.ts 覆盖。
  const factories: Array<[string, () => Interaction<never>]> = [
    ['DoubleClickZoom', () => new DoubleClickZoom({ active: false }) as never],
    ['DragPan', () => new DragPan({ active: false }) as never],
    ['KeyboardZoom', () => new KeyboardZoom({ active: false }) as never],
    ['Link', () => new Link({ active: false }) as never],
    ['MouseWheelZoom', () => new MouseWheelZoom({ active: false }) as never],
    ['Draw', () => new Draw(DrawMode.Point, { active: false }) as never],
    ['Modify', () => new Modify({ layer: new VectorLayer(), active: false }) as never],
    ['Select', () => new Select({ active: false }) as never]
  ]

  it.each(factories)('%s applies the active option on construction', (_name, create) => {
    const interaction = create()

    expect(interaction.getActive()).toBe(false)
    expect(interaction.active).toBe(false)
  })

  it.each(factories)('%s does not leak the id option to OpenLayers', (_name, create) => {
    const interaction = create()

    // active 是 OpenLayers 原生交互自身的属性，只有 OMap 私有的 id 不应透传
    expect(interaction.getInteraction().getProperties()).not.toHaveProperty('id')
  })
})

describe('DragBox onBoxEnd callback', () => {
  it('gives every handle its own callback storage', () => {
    const first = createDragBoxParamsBoxEndHandle()
    const second = createDragBoxParamsBoxEndHandle()
    const firstCallback = vi.fn()
    const secondCallback = vi.fn()

    first.initFunction(firstCallback)
    second.initFunction(secondCallback)

    first.emit({ target: {} as DragBox })

    expect(firstCallback).toHaveBeenCalledTimes(1)
    expect(secondCallback).not.toHaveBeenCalled()

    // 销毁其中一个不应影响另一个
    first.destroy()
    first.emit({ target: {} as DragBox })
    second.emit({ target: {} as DragBox })

    expect(firstCallback).toHaveBeenCalledTimes(1)
    expect(secondCallback).toHaveBeenCalledTimes(1)
  })
})

describe('interaction default params', () => {
  it('never mutates the shared default params constant', () => {
    new DoubleClickZoom({ id: 'dc-1', duration: 999 })
    new MouseWheelZoom({ id: 'mw-1', duration: 111 })

    expect(OMAP_INTERACTION_DEFAULT_PARAMS).toEqual({ active: false })
  })
})
