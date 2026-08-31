import { describe, expect, it } from 'vitest'
import { ClusterSource, ImageWMSSource, VectorSource } from '../../src/index'
import { OlSource } from '../../src/source/index'

describe('ClusterSource', () => {
  it('wraps an OMap VectorSource and exposes the native Cluster source', () => {
    const inner = new VectorSource({})
    const source = new ClusterSource({ source: inner, distance: 50 })
    expect(source.getSource()).toBeInstanceOf(OlSource.Cluster)
    // getClusteredSource returns the inner native vector source instance
    expect(source.getClusteredSource()).toBe(inner.getSource())
  })

  it('accepts a raw OpenLayers Vector source instance', () => {
    const raw = new OlSource.Vector({})
    const source = new ClusterSource({ source: raw, distance: 30 })
    expect(source.getSource()).toBeInstanceOf(OlSource.Cluster)
    expect(source.getClusteredSource()).toBe(raw)
  })
})

describe('ImageWMSSource', () => {
  it('constructs with url + params and exposes the native ImageWMS source', () => {
    const source = new ImageWMSSource({
      url: 'https://example.com/wms',
      params: { LAYERS: 'a' },
      ratio: 1
    })
    expect(source.getSource()).toBeInstanceOf(OlSource.ImageWMS)
    expect(source.getSource().getUrl()).toBe('https://example.com/wms')
    expect(source.getSource().getParams().LAYERS).toBe('a')
  })

  it('returns the typed native source via getSource', () => {
    const source = new ImageWMSSource({ url: 'https://example.com/wms', params: { LAYERS: 'b' } })
    const ol = source.getSource()
    expect(ol).toBeInstanceOf(OlSource.ImageWMS)
  })
})
