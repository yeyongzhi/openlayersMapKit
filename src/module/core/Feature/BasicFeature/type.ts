import { OlFeature, OlGeometry, RenderFeature } from '../../../../source/index'
import type { OMapPointGeometryCoordinatesType, OlPointGeomInstanceType } from '../Point/type'
import type { OlMultiPointGeomInstanceType } from '../MultiPoint/type'
import type { OMapLineStringGeometryCoordinatesType, OlLineStringGeomInstanceType } from '../LineString/type'
import type { OMapPolygonGeometryCoordinatesType } from '../Polygon/type'

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
    geometry: OlGeomType,
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

type OlPolygonGeomInstanceType = InstanceType<typeof OlGeometry.Polygon>
type OlMultiLineStringGeomInstanceType = InstanceType<typeof OlGeometry.MultiLineString>
type OlMultiPolygonGeomInstanceType = InstanceType<typeof OlGeometry.MultiPolygon>
type OlLinearRingGeomInstanceType = InstanceType<typeof OlGeometry.LinearRing>
type OlCircleGeomInstanceType = InstanceType<typeof OlGeometry.Circle>
type OlGeometryCollectionGeomInstanceType = InstanceType<typeof OlGeometry.GeometryCollection>

export type OlGeomType = OlGeometry.Point | OlGeometry.LineString | OlGeometry.Polygon | OlMultiPointGeomInstanceType | OlMultiLineStringGeomInstanceType | OlMultiPolygonGeomInstanceType | OlLinearRingGeomInstanceType | OlCircleGeomInstanceType | OlGeometryCollectionGeomInstanceType


export type OlGeomInstanceType = OlPointGeomInstanceType | OlMultiPointGeomInstanceType | OlLineStringGeomInstanceType | OlPolygonGeomInstanceType | OlLinearRingGeomInstanceType | OlCircleGeomInstanceType

export type OMapBasicFeatureCoordinatesType = OMapPointGeometryCoordinatesType | OMapLineStringGeometryCoordinatesType | OMapPolygonGeometryCoordinatesType