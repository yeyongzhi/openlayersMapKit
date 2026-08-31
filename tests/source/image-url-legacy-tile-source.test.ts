import { describe, expect, it } from 'vitest'
import TileImageSource from '../../src/module/source/TileSource/subClass/legacy/TileImageSource/index'
import UrlTileSource from '../../src/module/source/TileSource/subClass/legacy/UrlTileSource/index'
import { OlSource } from '../../src/source/index'

describe('TileImageSource (legacy)', () => {
  it('constructs with a url and exposes urls', () => {
    const source = new TileImageSource({ url: 'https://example.com/{z}/{x}/{y}.png' })
    expect(source.getSource()).toBeInstanceOf(OlSource.TileImage)
    expect(source.getUrls()).toEqual(['https://example.com/{z}/{x}/{y}.png'])
  })

  it('updates the url via setUrl', () => {
    const source = new TileImageSource({ url: 'https://a.com/{z}/{x}/{y}.png' })
    source.setUrl('https://b.com/{z}/{x}/{y}.png')
    expect(source.getUrls()).toEqual(['https://b.com/{z}/{x}/{y}.png'])
  })

  it('rejects a non-string url in setUrl', () => {
    const source = new TileImageSource({ url: 'https://a.com/{z}/{x}/{y}.png' })
    expect(() => source.setUrl(123 as never)).toThrow()
  })
})

describe('UrlTileSource (legacy)', () => {
  it('constructs with a url and exposes urls', () => {
    const source = new UrlTileSource({ url: 'https://example.com/{z}/{x}/{y}.png' })
    expect(source.getSource()).toBeInstanceOf(OlSource.UrlTile)
    expect(source.getUrls()).toEqual(['https://example.com/{z}/{x}/{y}.png'])
  })

  it('updates urls via setUrls', () => {
    const source = new UrlTileSource({ url: 'https://a.com/{z}/{x}/{y}.png' })
    source.setUrls(['https://b.com/{z}/{x}/{y}.png'])
    expect(source.getUrls()).toEqual(['https://b.com/{z}/{x}/{y}.png'])
  })

  it('rejects a non-array urls in setUrls', () => {
    const source = new UrlTileSource({ url: 'https://a.com/{z}/{x}/{y}.png' })
    expect(() => source.setUrls('x' as never)).toThrow()
  })
})
