import { describe, expect, it, vi } from 'vitest'
import { OMapError, OMapErrorCode } from '../../src/error'
import Source from '../../src/module/source/Source/index'
import { OlSource } from '../../src/source/index'

/** Minimal concrete subclass so the abstract Source base can be exercised directly. */
class RawSource extends Source<InstanceType<typeof OlSource.XYZ>> {
  constructor() {
    super(new OlSource.XYZ({ url: 'https://example.com/{z}/{x}/{y}.png' }))
  }

  replace(source: InstanceType<typeof OlSource.XYZ>) {
    this.setSource(source)
  }
}

describe('Source base class', () => {
  it('exposes the wrapped native source', () => {
    const source = new RawSource()
    expect(source.getSource()).toBeInstanceOf(OlSource.XYZ)
  })

  it('exposes state and properties', () => {
    const source = new RawSource()
    expect(source.getState()).toBe('ready')
    expect(source.getProperties()).toBeTypeOf('object')
    expect(Array.isArray(source.getKeys())).toBe(true)
  })

  it('supports get/set/unset of arbitrary properties', () => {
    const source = new RawSource()
    expect(source.get('foo')).toBeUndefined()
    source.set('foo', 1)
    expect(source.get('foo')).toBe(1)
    source.unset('foo')
    expect(source.get('foo')).toBeUndefined()
  })

  it('supports merge setProperties and guards non-string keys', () => {
    const source = new RawSource()
    source.setProperties({ a: 1, b: 2 })
    expect(source.getProperties()).toMatchObject({ a: 1, b: 2 })
    // non-string key is a no-op with a warning, not a throw
    source.set(123 as unknown as string, 'x')
    expect(source.get(123 as unknown as string)).toBeUndefined()
  })

  it('delegates native source state, attribution and event operations', () => {
    const source = new RawSource()
    const native = source.getSource()
    const changed = vi.spyOn(native, 'changed')
    const callback = vi.fn()
    native.on('custom', callback)

    source.changed()
    expect(changed).toHaveBeenCalledOnce()
    expect(source.dispatchEvent('custom')).toBeUndefined()
    expect(callback).toHaveBeenCalledOnce()

    source.setAttributions('OMap')
    expect(source.getAttributions()?.({} as never)).toEqual(['OMap'])
    expect(source.getAttributionsCollapsible()).toBe(true)
    expect(source.getRevision()).toBeGreaterThan(0)
    expect(source.getWrapX()).toBe(true)
    expect(source.getInterpolate()).toBe(true)
    expect(source.getResolutions()).toBeInstanceOf(Array)
    expect(source.getView()).toBeInstanceOf(Promise)

    source.setState('error')
    expect(source.getState()).toBe('error')
  })

  it('replaces the wrapped native source through the subclass hook', () => {
    const source = new RawSource()
    const replacement = new OlSource.XYZ({ url: 'https://replacement/{z}/{x}/{y}.png' })

    source.replace(replacement)

    expect(source.getSource()).toBe(replacement)
  })

  it('rejects missing native sources and warns for invalid unset keys', () => {
    expect(
      () =>
        new (class extends Source<InstanceType<typeof OlSource.XYZ>> {
          constructor() {
            super(null as never)
          }
        })()
    ).toThrow(OMapError)

    const source = new RawSource()
    expect(() => source.replace(null as never)).toThrow(OMapError)

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    source.unset(1 as unknown as string)
    expect(warn).toHaveBeenCalledOnce()
    warn.mockRestore()
  })

  it('returns an isolated properties snapshot', () => {
    const source = new RawSource()
    source.set('stable', 1)
    const snapshot = source.getProperties()
    snapshot.stable = 2

    expect(source.get('stable')).toBe(1)
  })

  it('dispose is idempotent and reflected by isDisposed', () => {
    const source = new RawSource()
    expect(source.isDisposed()).toBe(false)
    source.dispose()
    expect(source.isDisposed()).toBe(true)
    source.dispose()
    expect(source.isDisposed()).toBe(true)
  })

  it('rejects mutation and native access after dispose', () => {
    const source = new RawSource()
    source.dispose()

    for (const action of [
      () => source.refresh(),
      () => source.changed(),
      () => source.dispatchEvent('change'),
      () => source.set('x', 1),
      () => source.unset('x'),
      () => source.setAttributions('OMap'),
      () => source.setState('error'),
      () => source.setProperties({ x: 1 }),
      () => source.replace(new OlSource.XYZ()),
      () => source.getSource()
    ]) {
      try {
        action()
        expect.fail('disposed Source should reject active operations')
      } catch (error) {
        expect(error).toBeInstanceOf(OMapError)
        expect((error as OMapError).code).toBe(OMapErrorCode.Disposed)
      }
    }
  })
})
