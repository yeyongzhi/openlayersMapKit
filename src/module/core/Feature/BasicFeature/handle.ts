import BasicFeature from './index'
import Point from "../Point"
import LineString from "../LineString"
import Polygon from "../Polygon"
import type {
    OlFeatureInstanceType,
} from './type'

export function createBaseFeatureByOlFeature(feature: OlFeatureInstanceType): BasicFeature | null {
    let basicFeature: BasicFeature | null = null
    let geometry = feature.getGeometry()
    if(!geometry) return null
    switch (geometry.getType()) {
        case 'Point':
            basicFeature = new Point(feature)
            break;
    }
    return basicFeature
}