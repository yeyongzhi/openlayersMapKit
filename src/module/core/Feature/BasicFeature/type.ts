import { OlFeature, OlGeometry, RenderFeature } from '../../../../source/index'
import type { OMapPointGeometryCoordinatesType, OlPointGeomInstanceType } from '../Point/type'
import type { OMapLineStringGeometryCoordinatesType, OlLineStringGeomInstanceType } from '../LineString/type'
import type { OMapPolygonGeometryCoordinatesType } from '../Polygon/type'

export interface BasicFeatureLike {
    _feature?: OlFeatureInstanceType
    _geometry?: OlGeomInstanceType
}

export interface BasicFeatureInitialized {
    _feature: OlFeatureInstanceType
    _geometry: OlGeomInstanceType
}

export type OlRenderFeatureInstanceType = InstanceType<typeof RenderFeature>
export type OlFeatureInstanceType = InstanceType<typeof OlFeature>
export type OlFeatureLike = OlRenderFeatureInstanceType | OlFeatureInstanceType
export type OlFeatureOptionsType = {
    geometry: OlGeomType,
    properties?: Record<string, any>
}

export type OlFeatureType = "Point" | "LineString" | "Polygon" | "MultiPoint" | "MultiLineString" | "MultiPolygon" | 'LineraRing' | 'Circle' | 'GeometryCollection'


type OlPolygonGeomInstanceType = InstanceType<typeof OlGeometry.Polygon>
type OlMultiPointGeomInstanceType = InstanceType<typeof OlGeometry.MultiPoint>
type OlMultiLineStringGeomInstanceType = InstanceType<typeof OlGeometry.MultiLineString>
type OlMultiPolygonGeomInstanceType = InstanceType<typeof OlGeometry.MultiPolygon>
type OlLinearRingGeomInstanceType = InstanceType<typeof OlGeometry.LinearRing>
type OlCircleGeomInstanceType = InstanceType<typeof OlGeometry.Circle>
type OlGeometryCollectionGeomInstanceType = InstanceType<typeof OlGeometry.GeometryCollection>

export type OlGeomType = OlGeometry.Point | OlGeometry.LineString | OlGeometry.Polygon | OlMultiPointGeomInstanceType | OlMultiLineStringGeomInstanceType | OlMultiPolygonGeomInstanceType | OlLinearRingGeomInstanceType | OlCircleGeomInstanceType | OlGeometryCollectionGeomInstanceType


export type OlGeomInstanceType = OlPointGeomInstanceType | OlLineStringGeomInstanceType | OlPolygonGeomInstanceType

export type OMapBasicFeatureCoordinatesType = OMapPointGeometryCoordinatesType | OMapLineStringGeometryCoordinatesType | OMapPolygonGeometryCoordinatesType