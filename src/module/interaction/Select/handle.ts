import VectorLayer from '../../layer/VectorLayer/index'
import { OlInteraction, OlUtil } from '../../../source/index'
import BaseFeature from '../../core/Feature/BasicFeature/index'

let selectLayers: VectorLayer[] = []

export function updateSelectLayers(layers: VectorLayer[]) {
    selectLayers = layers
}

export function getTargetFeature(id: string): BaseFeature | null {
    let result = null
    for (const layer of selectLayers) {
        let target = (layer.getFeatures() as BaseFeature[]).find(f => OlUtil.getUid(f._feature) === id)
        if (target) {
            result = target
        }
    }
    return result
}