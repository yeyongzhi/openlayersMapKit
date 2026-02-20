import BasicFeature from './index'
import Point from "../Point/index"
import LineString from "../LineString/index"
import Polygon from "../Polygon/index"
import MultiPoint from "../MultiPoint/index"
import MultiLineString from "../MultiLineString/index"
import MultiPolygon from "../MultiPolygon/index"
import LinearRing from "../LinearRing/index"
import Circle from "../Circle/index"
import type {
    OlFeatureInstanceType,
    OlGeometryType,
    OlRenderFeatureInstanceType,
} from './type'
import { OlFeature, OlGeometry } from '../../../../source/index'
import { OlFeatureTypeObject } from './type'
import { OlRenderFeaturetoFeature } from '../../../../source/index'


/**
 * 根据ol Feature创建BasicFeature
 */

export function createBaseFeatureByOlFeature(
    feature: OlFeature<OlGeometry.Point>
): BasicFeature<OlGeometry.Point>;
export function createBaseFeatureByOlFeature(
    feature: OlFeature<OlGeometry.LineString>
): BasicFeature<OlGeometry.LineString>;
export function createBaseFeatureByOlFeature(
    feature: OlFeature<OlGeometry.Polygon>
): BasicFeature<OlGeometry.Polygon>;
export function createBaseFeatureByOlFeature(
    feature: OlFeature<OlGeometry.MultiPoint>
): BasicFeature<OlGeometry.MultiPoint>;
export function createBaseFeatureByOlFeature(
    feature: OlFeature<OlGeometry.MultiLineString>
): BasicFeature<OlGeometry.MultiLineString>;
export function createBaseFeatureByOlFeature(
    feature: OlFeature<OlGeometry.MultiPolygon>
): BasicFeature<OlGeometry.MultiPolygon>;
export function createBaseFeatureByOlFeature(
    feature: OlFeature<OlGeometry.LinearRing>
): BasicFeature<OlGeometry.LinearRing>;
export function createBaseFeatureByOlFeature(
    feature: OlFeature<OlGeometry.Circle>
): BasicFeature<OlGeometry.Circle>;
export function createBaseFeatureByOlFeature(
    feature: OlFeature<OlGeometry.Geometry>
): BasicFeature<OlGeometry.Geometry>;

/**
 * 具体实现
 * @param feature 
 * @returns 
 */
export function createBaseFeatureByOlFeature(feature: OlFeatureInstanceType): BasicFeature<OlGeometryType> | null {
    let geometry = feature.getGeometry()
    if (!geometry) return null
    switch (geometry.getType()) {
        case OlFeatureTypeObject.Point:
            return new Point(feature) as BasicFeature<OlGeometry.Point>
        case OlFeatureTypeObject.LineString:
            return new LineString(feature) as BasicFeature<OlGeometry.LineString>
        case OlFeatureTypeObject.Polygon:
            return new Polygon(feature) as BasicFeature<OlGeometry.Polygon> 
        case OlFeatureTypeObject.MultiPoint:
            return new MultiPoint(feature) as BasicFeature<OlGeometry.MultiPoint>
        case OlFeatureTypeObject.MultiLineString:
            return new MultiLineString(feature) as BasicFeature<OlGeometry.MultiLineString>
        case OlFeatureTypeObject.MultiPolygon:
            return new MultiPolygon(feature) as BasicFeature<OlGeometry.MultiPolygon>
        case OlFeatureTypeObject.LinearRing:
            return new LinearRing(feature) as BasicFeature<OlGeometry.LinearRing>
        case OlFeatureTypeObject.Circle:
            return new Circle(feature) as BasicFeature<OlGeometry.Circle>
    }
    return null 
}

export function createBaseFeatureByOlRenderFeature(feature: OlRenderFeatureInstanceType): BasicFeature<OlGeometryType> | null {
    let olFeature = OlRenderFeaturetoFeature(feature)
    return createBaseFeatureByOlFeature(olFeature)
}