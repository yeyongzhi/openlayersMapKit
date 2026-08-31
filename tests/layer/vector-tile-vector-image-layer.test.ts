import { describe, expect, it } from 'vitest'
import { VectorTileLayer, VectorImageLayer, VectorSource, VectorTileSource } from '../../src/index'
import { OlLayer, OlSource, OlFormat } from '../../src/source/index'

const vtsParams = {
  url: 'https://example.com/{z}/{x}/{y}.mvt',
  format: new OlFormat.GeoJSON()
}

describe('VectorTileLayer', () => {
  it('builds from params and exposes the VectorTileSource wrapper', () => {
    const layer = new VectorTileLayer({ source: vtsParams })
    expect(layer).toBeInstanceOf(VectorTileLayer)
    expect(layer.getVectorTileSource()).toBeInstanceOf(VectorTileSource)
    expect(layer.getSourceWrapper()).toBe(layer.getVectorTileSource())
    expect(layer.getSource()).toBeInstanceOf(OlSource.VectorTile)
  })

  it('accepts a VectorTileSource instance', () => {
    const vts = new VectorTileSource(vtsParams)
    const layer = new VectorTileLayer({ source: vts })
    expect(layer.getVectorTileSource()).toBe(vts)
  })

  it('produces an OL VectorTile layer', () => {
    const layer = new VectorTileLayer({ source: vtsParams })
    expect(layer.getLayer()).toBeInstanceOf(OlLayer.VectorTile)
  })
})

describe('VectorImageLayer', () => {
  it('builds from params and exposes the VectorSource wrapper', () => {
    const layer = new VectorImageLayer({ source: {} })
    expect(layer).toBeInstanceOf(VectorImageLayer)
    expect(layer.getVectorSource()).toBeInstanceOf(VectorSource)
    expect(layer.getSourceWrapper()).toBe(layer.getVectorSource())
    expect(layer.getSource()).toBeInstanceOf(OlSource.Vector)
  })

  it('accepts a VectorSource instance', () => {
    const vs = new VectorSource({})
    const layer = new VectorImageLayer({ source: vs })
    expect(layer.getVectorSource()).toBe(vs)
  })

  it('produces an OL VectorImage layer', () => {
    const layer = new VectorImageLayer({ source: {} })
    expect(layer.getLayer()).toBeInstanceOf(OlLayer.VectorImage)
  })
})
