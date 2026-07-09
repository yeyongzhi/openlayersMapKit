import { OlDrawCreateBox } from '../../../source/index'
import type { OMapDrawModeType, OlDrawType, OMapInteractionDrawEventType } from './type'
import { OlGeometry } from '../../../source/index'
import Draw from './index'
import { isDefined, defaultValue } from '../../../utils/define'
import BasicFeature from '../../core/Feature/BasicFeature/index'

export function getOlDrawType(mode: OMapDrawModeType): { type: OlDrawType, geometryFunction: any } {
    let type: OlDrawType = 'Point'
    let geometryFunction: any = null
    switch (mode) {
        case 'Point':
        case 'LineString':
        case 'Polygon':
            type = mode;
            break;
        case 'Circle':
            type = 'Circle';
            break;
        case 'Rectangle':
            type = 'Circle';
            geometryFunction = OlDrawCreateBox()
            break;
    }
    return { type, geometryFunction }
}

export function handleInteractionDrawEvent(
    target: Draw,
    type: OMapInteractionDrawEventType,
    e: any
) {
    const layer = target.getLayer();
    let layerFeatures: BasicFeature<OlGeometry.Geometry>[] = []
    if (isDefined(layer)) {
        layerFeatures = defaultValue(layer.getFeatures(), [])
    }
    const { feature } = e
    let targetFeature: BasicFeature<OlGeometry.Geometry> | null = null
    if (isDefined(feature)) {
        targetFeature = layer?.getFeatureByOlFeature(feature) || null
    }
    return {
        type,
        target,
        features: layerFeatures,
        feature: targetFeature,
    }
}
