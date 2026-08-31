import { describe, expect, it } from 'vitest'
import VectorTileSource from '../../src/module/source/TileSource/subClass/VectorTileSource/index'
import { OlSource, OlFormat } from '../../src/source/index'

describe('VectorTileSource', () => {
  it('constructs with a url and format and exposes the native VectorTile source', () => {
    const source = new VectorTileSource({
      url: 'https://example.com/{z}/{x}/{y}.mvt',
      format: new OlFormat.GeoJSON()
    })
    expect(source.getSource()).toBeInstanceOf(OlSource.VectorTile)
    expect(source.getOverlaps()).toBe(true)
  })

  it('toggles overlaps via setOverlaps', () => {
    const source = new VectorTileSource({
      url: 'https://example.com/{z}/{x}/{y}.mvt',
      format: new OlFormat.GeoJSON()
    })
    source.setOverlaps(false)
    expect(source.getOverlaps()).toBe(false)
    source.setOverlaps(true)
    expect(source.getOverlaps()).toBe(true)
  })
})
