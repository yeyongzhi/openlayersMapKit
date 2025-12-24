import { OlFeature, OlGeometry, RenderFeature } from '../../../../source/index'
import type { OMapPointGeometryCoordinatesType, OlPointGeomInstanceType } from '../Point/type'
import type { OMapMultiPointGeometryCoordinatesType, OlMultiPointGeomInstanceType } from '../MultiPoint/type'
import type { OMapLineStringGeometryCoordinatesType, OlLineStringGeomInstanceType } from '../LineString/type'
import type { OMapMultiLineStringGeometryCoordinatesType, OlMultiLineStringGeomInstanceType } from '../MultiLineString/type'
import type { OMapPolygonGeometryCoordinatesType, OlPolygonGeomInstanceType } from '../Polygon/type'
import type { OMapMultiPolygonGeometryCoordinatesType, OlMultiPolygonGeomInstanceType } from '../MultiPolygon/type'
import type { OMapLinearRingGeometryCoordinatesType, OlLinearRingGeomInstanceType } from '../LinearRing/type'
import type { OMapCircleGeometryCoordinatesType, OlCircleGeomInstanceType } from '../Circle/type'



export interface BasicFeatureLike {
    type?: OMapBasicFeatureType;
    _feature?: OlFeatureInstanceType;
}

export interface BasicFeatureInitialized {
    type: OMapBasicFeatureType;
    _feature: OlFeatureInstanceType
}

export type OlRenderFeatureInstanceType = InstanceType<typeof RenderFeature>
export type OlFeatureInstanceType = InstanceType<typeof OlFeature>
export type OlFeatureLike = OlRenderFeatureInstanceType | OlFeatureInstanceType
export type OlFeatureOptionsType = {
    geometry: OlGeomInstanceType,
    properties?: Record<string, any>
}

export type OMapBasicFeatureType = "Point" | "LineString" | "Polygon" | "MultiPoint" | "MultiLineString" | "MultiPolygon" | 'LinearRing' | 'Circle' | 'GeometryCollection'
export const OlFeatureTypeObject = {
    Point: 'Point',
    LineString: 'LineString',
    Polygon: 'Polygon',
    MultiPoint: 'MultiPoint',
    MultiLineString: 'MultiLineString',
    MultiPolygon: 'MultiPolygon',
    LinearRing: 'LinearRing',
    Circle: 'Circle',
    GeometryCollection: 'GeometryCollection',
}

type OlGeometryCollectionGeomInstanceType = InstanceType<typeof OlGeometry.GeometryCollection>

/**
 * ol原生的 Geometry实例 类型
 */
export type OlGeomInstanceType = OlPointGeomInstanceType | 
OlMultiPointGeomInstanceType | 
OlLineStringGeomInstanceType | 
OlMultiLineStringGeomInstanceType |
OlPolygonGeomInstanceType | 
OlMultiPolygonGeomInstanceType |
OlLinearRingGeomInstanceType | 
OlCircleGeomInstanceType | 
OlGeometryCollectionGeomInstanceType

/**
 * ol原生的 Geometry实例坐标 类型
 */
export type OMapBasicFeatureCoordinatesType = OMapPointGeometryCoordinatesType | 
OMapMultiPointGeometryCoordinatesType |
OMapLineStringGeometryCoordinatesType | 
OMapMultiLineStringGeometryCoordinatesType |
OMapPolygonGeometryCoordinatesType | 
OMapMultiPolygonGeometryCoordinatesType | 
OMapLinearRingGeometryCoordinatesType | 
OMapCircleGeometryCoordinatesType