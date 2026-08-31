import { describe, expect, it } from 'vitest'
import Source from '../../src/module/source/Source/index'
import { OlSource } from '../../src/source/index'

/** Minimal concrete subclass so the abstract Source base can be exercised directly. */
class RawSource extends Source<InstanceType<typeof OlSource.XYZ>> {
  constructor() {
    super(new OlSource.XYZ({ url: 'https://example.com/{z}/{x}/{y}.png' }))
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

  it('dispose is idempotent and reflected by isDisposed', () => {
    const source = new RawSource()
    expect(source.isDisposed()).toBe(false)
    source.dispose()
    expect(source.isDisposed()).toBe(true)
    source.dispose()
    expect(source.isDisposed()).toBe(true)
  })
})
