import { beforeAll, describe, expect, it, vi } from 'vitest'
import { TileJSONSource } from '../../src/index'
import { OlSource } from '../../src/source/index'

// OL TileJSON uses XMLHttpRequest at construction time; node has none, so stub a no-op.
beforeAll(() => {
  class MockXHR {
    open(): void {}
    send(): void {}
    addEventListener(): void {}
    removeEventListener(): void {}
  }
  vi.stubGlobal('XMLHttpRequest', MockXHR as unknown as typeof XMLHttpRequest)
})

describe('TileJSONSource', () => {
  it('constructs with a url and exposes the native TileJSON source', () => {
    const source = new TileJSONSource({ url: 'https://example.com/tilejson.json' })
    expect(source.getSource()).toBeInstanceOf(OlSource.TileJSON)
  })
})
