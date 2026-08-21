import { OlFeature, OlGeometry, OlRenderFeaturetoFeature } from '../../../../source/index'
import Circle from '../Circle/index'
import LineString from '../LineString/index'
import LinearRing from '../LinearRing/index'
import MultiLineString from '../MultiLineString/index'
import MultiPoint from '../MultiPoint/index'
import MultiPolygon from '../MultiPolygon/index'
import Point from '../Point/index'
import Polygon from '../Polygon/index'
import BasicFeature from './index'
import {
  getRegisteredFeature,
  getRegisteredRenderFeature,
  registerFeature,
  registerRenderFeature
} from './registry'
import {
  OlFeatureTypeObject,
  type OlFeatureInstanceType,
  type OlGeometryType,
  type OlRenderFeatureInstanceType
} from './type'

export function createBaseFeatureByOlFeature(
  feature: OlFeature<OlGeometry.Point>
): BasicFeature<OlGeometry.Point>
export function createBaseFeatureByOlFeature(
  feature: OlFeature<OlGeometry.LineString>
): BasicFeature<OlGeometry.LineString>
export function createBaseFeatureByOlFeature(
  feature: OlFeature<OlGeometry.Polygon>
): BasicFeature<OlGeometry.Polygon>
export function createBaseFeatureByOlFeature(
  feature: OlFeature<OlGeometry.MultiPoint>
): BasicFeature<OlGeometry.MultiPoint>
export function createBaseFeatureByOlFeature(
  feature: OlFeature<OlGeometry.MultiLineString>
): BasicFeature<OlGeometry.MultiLineString>
export function createBaseFeatureByOlFeature(
  feature: OlFeature<OlGeometry.MultiPolygon>
): BasicFeature<OlGeometry.MultiPolygon>
export function createBaseFeatureByOlFeature(
  feature: OlFeature<OlGeometry.LinearRing>
): BasicFeature<OlGeometry.LinearRing>
export function createBaseFeatureByOlFeature(
  feature: OlFeature<OlGeometry.Circle>
): BasicFeature<OlGeometry.Circle>
export function createBaseFeatureByOlFeature(
  feature: OlFeature<OlGeometry.Geometry>
): BasicFeature<OlGeometry.Geometry>

/** Resolves a native OpenLayers Feature to its stable OMap wrapper. */
export function createBaseFeatureByOlFeature(
  feature: OlFeatureInstanceType
): BasicFeature<OlGeometryType> | null {
  const registered = getRegisteredFeature(feature)
  if (registered) return registered

  const geometry = feature.getGeometry()
  if (!geometry) return null

  let wrapper: BasicFeature<OlGeometryType> | null = null
  switch (geometry.getType()) {
    case OlFeatureTypeObject.Point:
      wrapper = new Point(feature)
      break
    case OlFeatureTypeObject.LineString:
      wrapper = new LineString(feature)
      break
    case OlFeatureTypeObject.Polygon:
      wrapper = new Polygon(feature)
      break
    case OlFeatureTypeObject.MultiPoint:
      wrapper = new MultiPoint(feature)
      break
    case OlFeatureTypeObject.MultiLineString:
      wrapper = new MultiLineString(feature)
      break
    case OlFeatureTypeObject.MultiPolygon:
      wrapper = new MultiPolygon(feature)
      break
    case OlFeatureTypeObject.LinearRing:
      wrapper = new LinearRing(feature)
      break
    case OlFeatureTypeObject.Circle:
      wrapper = new Circle(feature)
      break
  }

  return wrapper ? registerFeature(feature, wrapper) : null
}

/** Resolves a render Feature and preserves wrapper identity for repeated callbacks. */
export function createBaseFeatureByOlRenderFeature(
  feature: OlRenderFeatureInstanceType
): BasicFeature<OlGeometryType> | null {
  const registered = getRegisteredRenderFeature(feature)
  if (registered) return registered

  const wrapper = createBaseFeatureByOlFeature(OlRenderFeaturetoFeature(feature))
  return wrapper ? registerRenderFeature(feature, wrapper) : null
}
