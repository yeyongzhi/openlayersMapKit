import { describe, expect, it } from 'vitest'
import { OSMSource, BingMapsSource, TileArcGISRestSource } from '../../src/index'
import { OlSource } from '../../src/source/index'

describe('OSMSource', () => {
  it('constructs with default OSM params and exposes the native OSM source', () => {
    const source = new OSMSource()
    expect(source.getSource()).toBeInstanceOf(OlSource.OSM)
    const urls = source.getSource().getUrls()
    expect(Array.isArray(urls) && urls.length > 0).toBe(true)
    expect((urls as string[])[0]).toContain('openstreetmap.org')
  })

  it('merges custom params over defaults', () => {
    const source = new OSMSource({ maxZoom: 18, url: 'https://a.example.com/{z}/{x}/{y}.png' })
    expect(source.getSource().getUrls()?.[0]).toBe('https://a.example.com/{z}/{x}/{y}.png')
    expect(source.getSource().getTileGrid()?.getMaxZoom()).toBe(18)
  })
})

describe('BingMapsSource', () => {
  it('requires key + imagerySet and exposes the native BingMaps source', () => {
    const source = new BingMapsSource({ key: 'test-key', imagerySet: 'Aerial' })
    expect(source.getSource()).toBeInstanceOf(OlSource.BingMaps)
    expect(source.getSource().getApiKey()).toBe('test-key')
  })
})

describe('TileArcGISRestSource', () => {
  it('constructs with a url and exposes the native TileArcGISRest source', () => {
    const source = new TileArcGISRestSource({
      url: 'https://example.com/arcgis/rest/services/x/MapServer'
    })
    expect(source.getSource()).toBeInstanceOf(OlSource.TileArcGISRest)
  })
})
