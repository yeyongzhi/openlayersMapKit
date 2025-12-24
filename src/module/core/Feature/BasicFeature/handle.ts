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
    OlRenderFeatureInstanceType,
} from './type'
import { OlFeatureTypeObject } from './type'
import { OlRenderFeaturetoFeature } from '../../../../source/index'

/**
 * 根据ol Feature创建BasicFeature
 */
export function createBaseFeatureByOlFeature<T>(feature: OlFeatureInstanceType): BasicFeature<T> | null {
    let basicFeature: BasicFeature<T> | null = null
    let geometry = feature.getGeometry()
    if(!geometry) return null
    switch (geometry.getType()) {
        case OlFeatureTypeObject.Point:
            basicFeature = new Point(feature) as BasicFeature<T>
            break;  
        case OlFeatureTypeObject.LineString:
            basicFeature = new LineString(feature) as BasicFeature<T>
            break;
        case OlFeatureTypeObject.Polygon:
            basicFeature = new Polygon(feature) as BasicFeature<T>
            break;
        case OlFeatureTypeObject.Circle:
            basicFeature = new Circle(feature) as BasicFeature<T>
            break;
    }
    return basicFeature
}

export function createBaseFeatureByOlRenderFeature<T>(feature: OlRenderFeatureInstanceType): BasicFeature<T> | null {
    let basicFeature: BasicFeature<T> | null = null
    // let geometry = feature.getGeometry()
    // if(!geometry) return null;
    console.log(feature)
    console.log(OlRenderFeaturetoFeature(feature))
    // switch (geometry.getType()) {
    //     case OlFeatureTypeObject.Point:
    //         basicFeature = new Point(OlRenderFeaturetoFeature(feature)) as BasicFeature<T>
    //         break;  
    //     case OlFeatureTypeObject.LineString:
    //         basicFeature = new LineString(OlRenderFeaturetoFeature(feature)) as BasicFeature<T>
    //         break;
    //     case OlFeatureTypeObject.Polygon:
    //         basicFeature = new Polygon(OlRenderFeaturetoFeature(feature)) as BasicFeature<T>
    //         break;
    //     case OlFeatureTypeObject.Circle:
    //         basicFeature = new Circle(OlRenderFeaturetoFeature(feature)) as BasicFeature<T>
    //         break;
    // }
    return basicFeature
}