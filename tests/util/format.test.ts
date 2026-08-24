import { describe, expect, it } from 'vitest'
import Format from '../../src/module/util/Format/index'
import { OMapFormatType } from '../../src/module/util/Format/type'
import Point from '../../src/module/core/Feature/Point/index'
import { createBaseFeatureByOlFeature } from '../../src/module/core/Feature/BasicFeature/handle'

describe('Format', () => {
  it('reads and writes a GeoJSON feature while preserving its properties', () => {
    const format = new Format(OMapFormatType.GeoJSON, {
      dataProjection: 'EPSG:4326',
      extractGeometryName: false
    })
    const feature = format.readFeature({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [120, 30] },
      properties: { name: 'sample' }
    })

    expect(feature).toBeDefined()
    expect(feature?.getType()).toBe('Point')
    expect(feature?.get('name')).toBe('sample')

    const serialized = JSON.parse(format.writeFeature(feature!))
    expect(serialized.geometry).toEqual({ type: 'Point', coordinates: [120, 30] })
    expect(serialized.properties).toMatchObject({ name: 'sample' })
  })

  it('returns registered wrappers from GeoJSON reads', () => {
    const format = new Format(OMapFormatType.GeoJSON, {
      dataProjection: 'EPSG:4326',
      extractGeometryName: false
    })
    const feature = format.readFeature({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [120, 30] },
      properties: null
    })

    expect(createBaseFeatureByOlFeature(feature!.getFeature())).toBe(feature)
  })

  it('round-trips WKT features through the public constructor overload', () => {
    const format = new Format(OMapFormatType.WKT)
    const feature = format.readFeature('POINT(120 30)')

    expect(feature?.getType()).toBe('Point')
    expect(format.writeFeature(feature!)).toBe('POINT(120 30)')
  })

  it('writes feature collections for GeoJSON and WKT', () => {
    const features = [new Point([120, 30]), new Point([121, 31])]
    const geoJSON = new Format(OMapFormatType.GeoJSON, {
      dataProjection: 'EPSG:4326',
      extractGeometryName: false
    })
    const wkt = new Format(OMapFormatType.WKT)

    expect(JSON.parse(geoJSON.writeFeatures(features)).features).toHaveLength(2)
    expect(wkt.writeFeatures(features)).toBe('GEOMETRYCOLLECTION(POINT(120 30),POINT(121 31))')
  })

  it('constructs KML with its dedicated options overload', () => {
    const format = new Format(OMapFormatType.KML, {
      extractStyles: false,
      showPointNames: false,
      writeStyles: false,
      crossOrigin: null
    })

    expect(format.type).toBe(OMapFormatType.KML)
    expect(format._format).toBeDefined()
  })
})
