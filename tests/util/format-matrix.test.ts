// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import Format from '../../src/module/util/Format/index'
import { OMapFormatType } from '../../src/module/util/Format/type'
import { OMapError, OMapErrorCode } from '../../src/index'
import Point from '../../src/module/core/Feature/Point/index'
import LineString from '../../src/module/core/Feature/LineString/index'

describe('Format constructor validation', () => {
  it('throws OMapError for a missing type', () => {
    expect(() => new Format(undefined as unknown as typeof OMapFormatType.GeoJSON)).toThrow(
      OMapError
    )
  })

  it('throws OMapError for an unsupported type', () => {
    expect(() => new Format('EsriJSON' as unknown as typeof OMapFormatType.GeoJSON)).toThrow(
      OMapError
    )
  })

  it('throws OMapError carrying the invalid parameter code', () => {
    let thrown: unknown = null
    try {
      new Format(null as unknown as typeof OMapFormatType.GeoJSON)
    } catch (error) {
      thrown = error
    }

    expect((thrown as OMapError).code).toBe(OMapErrorCode.InvalidParameter)
  })

  it('exposes the resolved type and merged options', () => {
    expect(new Format(OMapFormatType.GeoJSON).type).toBe(OMapFormatType.GeoJSON)
    expect(new Format(OMapFormatType.WKT).type).toBe(OMapFormatType.WKT)
    expect(new Format(OMapFormatType.KML).type).toBe(OMapFormatType.KML)
    expect(new Format(OMapFormatType.WKT).options).toEqual({ splitCollection: false })
  })

  it('merges user options over the per-type defaults', () => {
    const format = new Format(OMapFormatType.KML, { showPointNames: true })

    expect(format.options).toMatchObject({
      extractStyles: false,
      showPointNames: true,
      writeStyles: false,
      crossOrigin: null
    })
  })
})

describe('Format option matrix', () => {
  it('applies the projection passed to the read call', () => {
    const format = new Format(OMapFormatType.GeoJSON, { dataProjection: 'EPSG:4326' })
    const source = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [120, 30] },
      properties: null
    }

    const projected = format.readFeature(source, { featureProjection: 'EPSG:3857' })
    const coordinates = projected?.getFeature()?.getGeometry()?.getCoordinates()

    expect(coordinates?.[0]).toBeCloseTo(13358338.89519283, 4)
    expect(coordinates?.[1]).toBeCloseTo(3503549.843504374, 4)
  })

  it('keeps source coordinates when no read projection is supplied', () => {
    const format = new Format(OMapFormatType.GeoJSON, { dataProjection: 'EPSG:4326' })
    const feature = format.readFeature({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [120, 30] },
      properties: null
    })

    expect(feature?.getFeature()?.getGeometry()?.getCoordinates()).toEqual([120, 30])
  })

  it('does not apply constructor-level featureProjection to subsequent reads', () => {
    // 构造函数中的 featureProjection 只进入原生 format 实例；readFeature 会传入
    // 该次调用的 options（缺省为 {}），因此不会按构造选项做投影转换。
    // 需要转换时必须在 readFeature/readFeatures 的第二个参数显式声明。
    const format = new Format(OMapFormatType.GeoJSON, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })
    const feature = format.readFeature({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [120, 30] },
      properties: null
    })

    expect(feature?.getFeature()?.getGeometry()?.getCoordinates()).toEqual([120, 30])
  })

  it('honours extractGeometryName when reading the geometry property key', () => {
    const source = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [120, 30] },
      geometry_name: 'the_geom',
      properties: null
    }

    const extracting = new Format(OMapFormatType.GeoJSON, {
      dataProjection: 'EPSG:4326',
      extractGeometryName: true
    })
    const defaultKey = new Format(OMapFormatType.GeoJSON, {
      dataProjection: 'EPSG:4326',
      extractGeometryName: false
    })

    expect(extracting.readFeature(source)?.getProperties()).toHaveProperty('the_geom')
    expect(defaultKey.readFeature(source)?.getProperties()).toHaveProperty('geometry')
  })

  it('keeps WKT splitCollection disabled by default', () => {
    const format = new Format(OMapFormatType.WKT)
    const features = format.readFeatures('GEOMETRYCOLLECTION(POINT(120 30),POINT(121 31))')

    expect(format.options).toEqual({ splitCollection: false })
    expect(features).toHaveLength(1)
  })

  it('enables WKT splitCollection on request', () => {
    const format = new Format(OMapFormatType.WKT, { splitCollection: true })
    const features = format.readFeatures('GEOMETRYCOLLECTION(POINT(120 30),POINT(121 31))')

    expect(features).toHaveLength(2)
    expect(features?.[0]?.getType()).toBe('Point')
    expect(features?.[1]?.getType()).toBe('Point')
  })

  it('applies KML boolean options without changing defaults elsewhere', () => {
    const format = new Format(OMapFormatType.KML, {
      extractStyles: true,
      showPointNames: true,
      writeStyles: true
    })

    expect(format.options).toMatchObject({
      extractStyles: true,
      showPointNames: true,
      writeStyles: true,
      crossOrigin: null
    })
  })
})

describe('Format per-type method support', () => {
  const features = [new Point([120, 30]), new Point([121, 31])]

  it('GeoJSON supports every write method except writeFeaturesNode', () => {
    const format = new Format(OMapFormatType.GeoJSON)

    expect(() => format.writeFeature(features[0]!)).not.toThrow()
    expect(() => format.writeFeatureObject(features[0]!)).not.toThrow()
    expect(() => format.writeFeatures(features)).not.toThrow()
    expect(() => format.writeFeaturesObject(features)).not.toThrow()
    expect(() => format.writeFeaturesNode(features)).toThrow(OMapError)
  })

  it('WKT only supports the string write methods', () => {
    const format = new Format(OMapFormatType.WKT)

    expect(() => format.writeFeature(features[0]!)).not.toThrow()
    expect(() => format.writeFeatures(features)).not.toThrow()
    expect(() => format.writeFeatureObject(features[0]!)).toThrow(OMapError)
    expect(() => format.writeFeaturesObject(features)).toThrow(OMapError)
    expect(() => format.writeFeaturesNode(features)).toThrow(OMapError)
  })

  it('KML only supports the collection write methods', () => {
    const format = new Format(OMapFormatType.KML)

    expect(() => format.writeFeatures(features)).not.toThrow()
    expect(() => format.writeFeaturesNode(features)).not.toThrow()
    expect(() => format.writeFeature(features[0]!)).toThrow(OMapError)
    expect(() => format.writeFeatureObject(features[0]!)).toThrow(OMapError)
    expect(() => format.writeFeaturesObject(features)).toThrow(OMapError)
  })

  it('reports the unsupported method name in the error message', () => {
    let thrown: unknown = null
    try {
      new Format(OMapFormatType.WKT).writeFeatureObject(features[0]!)
    } catch (error) {
      thrown = error
    }

    expect((thrown as Error).message).toContain('writeFeatureObject')
  })
})

describe('Format collection reads and object writes', () => {
  it('reads a GeoJSON FeatureCollection into wrapper features', () => {
    const format = new Format(OMapFormatType.GeoJSON, { dataProjection: 'EPSG:4326' })
    const features = format.readFeatures({
      type: 'FeatureCollection',
      features: [
        { type: 'Feature', geometry: { type: 'Point', coordinates: [120, 30] }, properties: null },
        { type: 'Feature', geometry: { type: 'Point', coordinates: [121, 31] }, properties: null }
      ]
    })

    expect(features).toHaveLength(2)
    expect(features?.[0]?.getType()).toBe('Point')
  })

  it('reads KML placemarks', () => {
    const format = new Format(OMapFormatType.KML)
    const source =
      '<kml xmlns="http://www.opengis.net/kml/2.2"><Placemark><Point>' +
      '<coordinates>120,30</coordinates></Point></Placemark></kml>'

    expect(format.readFeature(source)?.getType()).toBe('Point')
    expect(format.readFeatures(source)).toHaveLength(1)
  })

  it('returns plain objects from the Object write methods', () => {
    const format = new Format(OMapFormatType.GeoJSON, { dataProjection: 'EPSG:4326' })
    const feature = new Point([120, 30])

    const single = format.writeFeatureObject(feature) as { type?: string }
    expect(single.type).toBe('Feature')

    const collection = format.writeFeaturesObject([feature]) as {
      type?: string
      features?: unknown[]
    }
    expect(collection.type).toBe('FeatureCollection')
    expect(collection.features).toHaveLength(1)
  })

  it('returns a DOM node from KML writeFeaturesNode', () => {
    const format = new Format(OMapFormatType.KML)
    const node = format.writeFeaturesNode([new Point([120, 30])]) as unknown

    expect(node).toBeDefined()
    expect(Object.prototype.toString.call(node)).toBe('[object Element]')
  })

  it('writes multiple geometry types through GeoJSON', () => {
    const format = new Format(OMapFormatType.GeoJSON, { dataProjection: 'EPSG:4326' })
    const written = JSON.parse(
      format.writeFeatures([new Point([120, 30]), new LineString([[120, 30], [121, 31]])])
    )

    expect(written.features).toHaveLength(2)
    expect(written.features[1].geometry.type).toBe('LineString')
  })
})

describe('Format invalid input and empty boundaries', () => {
  it('rejects invalid GeoJSON source', () => {
    const format = new Format(OMapFormatType.GeoJSON, { dataProjection: 'EPSG:4326' })
    expect(() => format.readFeature(null)).toThrow()
  })

  it('rejects malformed and empty WKT', () => {
    const format = new Format(OMapFormatType.WKT)

    expect(() => format.readFeature('NOT WKT AT ALL')).toThrow()
    expect(() => format.readFeature('')).toThrow()
  })

  it('returns an empty array for an empty FeatureCollection', () => {
    const format = new Format(OMapFormatType.GeoJSON, { dataProjection: 'EPSG:4326' })
    const features = format.readFeatures({ type: 'FeatureCollection', features: [] })

    expect(features).toEqual([])
  })

  it('writes an empty collection for an empty feature array', () => {
    const format = new Format(OMapFormatType.GeoJSON, { dataProjection: 'EPSG:4326' })
    const written = JSON.parse(format.writeFeatures([]))

    expect(written).toMatchObject({ type: 'FeatureCollection', features: [] })
  })
})
