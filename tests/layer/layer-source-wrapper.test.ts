import { describe, expect, it } from 'vitest'
import {
  TileLayer,
  XYZLayer,
  WMSLayer,
  WMTSLayer,
  GaodeLayer,
  ImageLayer,
  VectorLayer,
  XYZSource,
  TileWMSSource,
  WMTSSource,
  ImageStaticSource,
  ImageSource,
  VectorSource
} from '../../src/index'
import { OlSource } from '../../src/source/index'

/** 组装一个满足 TileLayer 构造参数的对象（source 单独传入）。 */
function tileParams(source: unknown) {
  return {
    source: source as never,
    preload: 0,
    useInterimTilesOnError: true,
    cacheSize: 512
  }
}

describe('TileLayer keeps the OMap source wrapper', () => {
  it('preserves an OMap source wrapper passed in and exposes it', () => {
    const xyz = new XYZSource({ url: 'https://example.com/{z}/{x}/{y}.png' })
    const layer = new TileLayer(tileParams(xyz))
    expect(layer.getTileSource()).toBe(xyz)
    expect(layer.getSourceWrapper()).toBe(xyz)
    expect(layer.getSource()).toBe(xyz.getSource())
  })

  it('returns null wrapper for a raw OpenLayers source but still works', () => {
    const raw = new OlSource.XYZ({ url: 'https://example.com/{z}/{x}/{y}.png' })
    const layer = new TileLayer(tileParams(raw))
    expect(layer.getTileSource()).toBeNull()
    expect(layer.getSourceWrapper()).toBeNull()
    expect(layer.getSource()).toBe(raw)
  })

  it('throws rather than silently constructing from a plain params object', () => {
    expect(() => new TileLayer(tileParams({ url: 'x' }))).toThrow()
  })

  it('updates the registered wrapper after setSource', () => {
    const a = new XYZSource({ url: 'https://a.com/{z}/{x}/{y}.png' })
    const b = new XYZSource({ url: 'https://b.com/{z}/{x}/{y}.png' })
    const layer = new TileLayer(tileParams(a))
    layer.setSource(b)
    expect(layer.getTileSource()).toBe(b)
  })
})

describe('tile subclasses register their OMap source wrapper', () => {
  it('XYZLayer exposes the internal XYZSource wrapper', () => {
    const layer = new XYZLayer({ source: { url: 'https://example.com/{z}/{x}/{y}.png' } })
    expect(layer.getXYZSource()).toBeInstanceOf(XYZSource)
    expect(layer.getSourceWrapper()).toBe(layer.getXYZSource())
  })

  it('WMSLayer exposes the internal TileWMSSource wrapper', () => {
    const layer = new WMSLayer({
      source: { url: 'https://example.com/wms', params: { LAYERS: 'a' } }
    })
    expect(layer.getWMSSource()).toBeInstanceOf(TileWMSSource)
    expect(layer.getSourceWrapper()).toBe(layer.getWMSSource())
  })

  it('WMTSLayer exposes the internal WMTSSource wrapper', () => {
    const layer = new WMTSLayer({
      source: {
        url: 'https://example.com/wmts',
        layer: 'a',
        style: 'default',
        matrixSet: 'EPSG:3857',
        format: 'image/png',
        tileGrid: {
          resolutions: [2000, 1000, 500, 250, 100, 50, 20, 10, 5, 2.5],
          matrixIds: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
          origin: [-180, 90]
        }
      }
    })
    expect(layer.getWMTSSource()).toBeInstanceOf(WMTSSource)
    expect(layer.getSourceWrapper()).toBe(layer.getWMTSSource())
  })

  it('GaodeLayer exposes the internal XYZSource wrapper', () => {
    const layer = new GaodeLayer('road' as never, {})
    expect(layer.getTileSource()).toBeInstanceOf(XYZSource)
    expect(layer.getSourceWrapper()).toBe(layer.getTileSource())
  })
})

describe('ImageLayer keeps the OMap source wrapper', () => {
  it('static image branch exposes ImageStaticSource and not ImageSource', () => {
    const layer = new ImageLayer({
      source: { url: 'https://example.com/a.png', imageExtent: [0, 0, 1, 1] }
    })
    expect(layer.getImageStaticSource()).toBeInstanceOf(ImageStaticSource)
    expect(layer.getImageStaticSource()).not.toBeNull()
    expect(layer.getImageSource()).toBeNull()
    expect(layer.getSourceWrapper()).toBe(layer.getImageStaticSource())
  })

  it('custom loader branch exposes ImageSource and not ImageStaticSource', () => {
    const layer = new ImageLayer({
      source: { interpolate: true, loader: (() => {}) as never }
    })
    expect(layer.getImageSource()).toBeInstanceOf(ImageSource)
    expect(layer.getImageStaticSource()).toBeNull()
  })
})

describe('VectorLayer keeps the OMap source wrapper', () => {
  it('exposes the internal VectorSource wrapper', () => {
    const layer = new VectorLayer()
    expect(layer.getSourceWrapper()).toBeInstanceOf(VectorSource)
  })
})
