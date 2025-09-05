import BasicFeature from './index'
import Point from "../Point"
import LineString from "../LineString"
import Polygon from "../Polygon"
import Circle from "../Circle"
import type {
    OlFeatureInstanceType,
} from './type'
import { OlFeatureTypeObject } from './type'

export function createBaseFeatureByOlFeature(feature: OlFeatureInstanceType): BasicFeature | null {
    let basicFeature: BasicFeature | null = null
    let geometry = feature.getGeometry()
    if(!geometry) return null
    switch (geometry.getType()) {
        case OlFeatureTypeObject.Point:
            basicFeature = new Point(feature)
            break;
        case OlFeatureTypeObject.LineString:
            basicFeature = new LineString(feature)
            break;
        case OlFeatureTypeObject.Polygon:
            basicFeature = new Polygon(feature)
            break;
        case OlFeatureTypeObject.Circle:
            basicFeature = new Circle(feature)
            break;
    }
    return basicFeature
}