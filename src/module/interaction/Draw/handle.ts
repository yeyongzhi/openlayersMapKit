import { OlDrawCreateBox } from '../../../source/index'
import type { OMapDrawMode, OlDrawType, OMapInteractionDrawEventType } from './type'
import { OlGeometry, OlUtil } from '../../../source/index'
import Draw from './index'
import { isDefined, defaultValue } from '../../../utils/define'
import BasicFeature from '../../core/Feature/BasicFeature/index'
import { createBaseFeatureByOlFeature } from '../../core/Feature/BasicFeature/handle'

export function getOlDrawType(mode: OMapDrawMode): { type: OlDrawType, geometryFunction: any } {
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
        // 此方法无法找到targetFeature
        // targetFeature = layerFeatures.find(f => {
        //     return OlUtil.getUid(f.getFeature()) === OlUtil.getUid(feature)
        // }) || null
        targetFeature = createBaseFeatureByOlFeature(feature)
    }
    return {
        type,
        target,
        features: layerFeatures,
        feature: targetFeature,
    }
}