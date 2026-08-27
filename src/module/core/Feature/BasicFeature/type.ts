import { OlFeature, OlGeometry, RenderFeature } from '../../../../source/index'
import type { OMapPointGeometryCoordinatesType, OlPointGeomInstanceType } from '../Point/type'
import type {
  OMapMultiPointGeometryCoordinatesType,
  OlMultiPointGeomInstanceType
} from '../MultiPoint/type'
import type {
  OMapLineStringGeometryCoordinatesType,
  OlLineStringGeomInstanceType
} from '../LineString/type'
import type {
  OMapMultiLineStringGeometryCoordinatesType,
  OlMultiLineStringGeomInstanceType
} from '../MultiLineString/type'
import type { OMapPolygonGeometryCoordinatesType, OlPolygonGeomInstanceType } from '../Polygon/type'
import type {
  OMapMultiPolygonGeometryCoordinatesType,
  OlMultiPolygonGeomInstanceType
} from '../MultiPolygon/type'
import type {
  OMapLinearRingGeometryCoordinatesType,
  OlLinearRingGeomInstanceType
} from '../LinearRing/type'
import type { OlCircleGeomInstanceType } from '../Circle/type'
import type { PropertiesType } from '../../../../utils/type'

export type OlRenderFeatureInstanceType = InstanceType<typeof RenderFeature>
export type OlFeatureInstanceType = InstanceType<typeof OlFeature>
export type OlFeatureLike = OlRenderFeatureInstanceType | OlFeatureInstanceType
export type OlFeatureOptionsType = {
  geometry: OlGeomInstanceType
  properties?: PropertiesType
}

export type OMapBasicFeatureType =
  | 'Point'
  | 'LineString'
  | 'Polygon'
  | 'MultiPoint'
  | 'MultiLineString'
  | 'MultiPolygon'
  | 'LinearRing'
  | 'Circle'
export const OlFeatureTypeObject = {
  Point: 'Point',
  LineString: 'LineString',
  Polygon: 'Polygon',
  MultiPoint: 'MultiPoint',
  MultiLineString: 'MultiLineString',
  MultiPolygon: 'MultiPolygon',
  LinearRing: 'LinearRing',
  Circle: 'Circle'
}

export type OlFeatureType =
  | OlFeature<OlGeometry.Point>
  | OlFeature<OlGeometry.MultiPoint>
  | OlFeature<OlGeometry.LineString>
  | OlFeature<OlGeometry.MultiLineString>
  | OlFeature<OlGeometry.Polygon>
  | OlFeature<OlGeometry.MultiPolygon>
  | OlFeature<OlGeometry.LinearRing>
  | OlFeature<OlGeometry.Circle>

export type OMapSimpleGeometryType =
  | OlGeometry.Point
  | OlGeometry.MultiPoint
  | OlGeometry.LineString
  | OlGeometry.MultiLineString
  | OlGeometry.Polygon
  | OlGeometry.MultiPolygon
  | OlGeometry.LinearRing
  | OlGeometry.Circle

export type OlGeometryType =
  | OlGeometry.Point
  | OlGeometry.MultiPoint
  | OlGeometry.LineString
  | OlGeometry.MultiLineString
  | OlGeometry.Polygon
  | OlGeometry.MultiPolygon
  | OlGeometry.LinearRing
  | OlGeometry.Circle
  | OlGeometry.Geometry
  | OlGeometry.SimpleGeometry

/**
 * ol原生的 Geometry实例 类型
 */
export type OlGeomInstanceType =
  | OlPointGeomInstanceType
  | OlMultiPointGeomInstanceType
  | OlLineStringGeomInstanceType
  | OlMultiLineStringGeomInstanceType
  | OlPolygonGeomInstanceType
  | OlMultiPolygonGeomInstanceType
  | OlLinearRingGeomInstanceType
  | OlCircleGeomInstanceType

/**
 * ol原生的 Geometry实例坐标 类型
 */
export type OMapBasicFeatureCoordinatesType =
  | OMapPointGeometryCoordinatesType
  | OMapMultiPointGeometryCoordinatesType
  | OMapLineStringGeometryCoordinatesType
  | OMapMultiLineStringGeometryCoordinatesType
  | OMapPolygonGeometryCoordinatesType
  | OMapMultiPolygonGeometryCoordinatesType
  | OMapLinearRingGeometryCoordinatesType
