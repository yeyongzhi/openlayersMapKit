import { beforeAll, describe, expect, it } from 'vitest'
import DataTileSource from '../../src/module/source/TileSource/subClass/DataTileSource/index'
import ImageTileSource from '../../src/module/source/TileSource/subClass/ImageTileSource/index'
import OGCVectorTileSource from '../../src/module/source/TileSource/subClass/OGCVectorTileSource/index'
import { OlSource, OlFormat } from '../../src/source/index'

/**
 * OGCVectorTile fetches its tile-set metadata asynchronously at construction
 * via `getJSON`, which uses `XMLHttpRequest` in node. A no-op stub keeps the
 * source in a loading state without triggering network calls or errors.
 */
class XHRStub {
  status = 0
  responseText = ''
  private listeners: Record<string, Array<(e: unknown) => void>> = {}
  addEventListener(type: string, fn: (e: unknown) => void) {
    ;(this.listeners[type] ??= []).push(fn)
  }
  open() {}
  send() {}
  setRequestHeader() {}
}

beforeAll(() => {
  ;(globalThis as unknown as { XMLHttpRequest: unknown }).XMLHttpRequest = XHRStub
})

describe('DataTileSource', () => {
  it('constructs with a loader and exposes the native DataTile source', () => {
    const source = new DataTileSource({ loader: () => {} })
    expect(source.getSource()).toBeInstanceOf(OlSource.DataTile)
    expect(source.getState()).toBe('ready')
  })
})

describe('ImageTileSource', () => {
  it('constructs with a url and exposes the native ImageTile source', () => {
    const source = new ImageTileSource({ url: 'https://example.com/{z}/{x}/{y}.png' })
    expect(source.getSource()).toBeInstanceOf(OlSource.ImageTile)
    expect(source.getState()).toBe('ready')
  })

  it('accepts a valid string in setUrl', () => {
    const source = new ImageTileSource({ url: 'https://a.com/{z}/{x}/{y}.png' })
    expect(() => source.setUrl('https://b.com/{z}/{x}/{y}.png')).not.toThrow()
  })

  it('rejects a non-string url in setUrl', () => {
    const source = new ImageTileSource({ url: 'https://a.com/{z}/{x}/{y}.png' })
    expect(() => source.setUrl(123 as never)).toThrow()
  })
})

describe('OGCVectorTileSource', () => {
  it('constructs with a url and format and exposes the native OGCVectorTile source', () => {
    const source = new OGCVectorTileSource({
      url: 'https://example.com/ogc',
      format: new OlFormat.GeoJSON()
    })
    expect(source.getSource()).toBeInstanceOf(OlSource.OGCVectorTile)
    expect(source.getOverlaps()).toBe(true)
  })

  it('toggles overlaps via setOverlaps', () => {
    const source = new OGCVectorTileSource({
      url: 'https://example.com/ogc',
      format: new OlFormat.GeoJSON()
    })
    source.setOverlaps(false)
    expect(source.getOverlaps()).toBe(false)
    source.setOverlaps(true)
    expect(source.getOverlaps()).toBe(true)
  })
})
