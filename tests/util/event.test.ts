import { describe, expect, it, vi } from 'vitest'
import Event from '../../src/module/util/Event/index'

interface TestEvents extends Record<string, readonly unknown[]> {
  change: [value: number]
  reset: []
}

describe('Event', () => {
  it('registers, emits and removes listeners', () => {
    const events = new Event<TestEvents>()
    const listener = vi.fn()
    const id = events.on('change', listener)

    events.emit('change', 2)
    expect(listener).toHaveBeenCalledWith(2)
    expect(events.listenerCount('change')).toBe(1)

    events.remove(id)
    expect(events.listenerCount('change')).toBe(0)
  })

  it('runs once listeners once', () => {
    const events = new Event<TestEvents>()
    const listener = vi.fn()
    const unlisten = vi.fn()

    events.once('reset', listener, unlisten)
    events.emit('reset').emit('reset')

    expect(listener).toHaveBeenCalledTimes(1)
    expect(unlisten).toHaveBeenCalledOnce()
  })

  it('disposes external listeners when cleared', () => {
    const events = new Event<TestEvents>()
    const unlisten = vi.fn()

    events.on('reset', vi.fn(), unlisten)
    events.off()

    expect(unlisten).toHaveBeenCalledOnce()
  })
})
