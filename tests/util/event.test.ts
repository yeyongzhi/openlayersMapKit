import { describe, expect, it, vi } from 'vitest'
import Event from '../../src/module/util/Event/index'
import { OMapError, OMapErrorCode } from '../../src/error'

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

  it('returns an isolated listener list snapshot', () => {
    const events = new Event<TestEvents>()
    events.on('reset', vi.fn())
    const snapshot = events.get('reset') as Array<unknown>
    snapshot.length = 0

    expect(events.listenerCount('reset')).toBe(1)
  })

  it('implements an idempotent permanent disposal contract', () => {
    const events = new Event<TestEvents>()
    const unlisten = vi.fn()
    events.on('reset', vi.fn(), unlisten)

    events.dispose()
    events.dispose()

    expect(events.isDisposed()).toBe(true)
    expect(unlisten).toHaveBeenCalledOnce()
    try {
      events.on('reset', vi.fn())
      expect.fail('disposed Event should reject subscriptions')
    } catch (error) {
      expect(error).toBeInstanceOf(OMapError)
      expect((error as OMapError).code).toBe(OMapErrorCode.Disposed)
      expect((error as Error).message).toContain('Event【on】')
    }
  })

  it('does not emit or invoke callbacks after disposal', () => {
    const events = new Event<TestEvents>()
    const listener = vi.fn()
    events.on('change', listener)
    events.dispose()

    expect(events.emit('change', 1)).toBe(events)
    expect(listener).not.toHaveBeenCalled()
  })
})
