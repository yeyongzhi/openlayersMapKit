import VectorLayer from '../../layer/VectorLayer/index'
import { OlGeometry, OlInteraction, OlUtil } from '../../../source/index'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import { OMapInteractionSelectEventType } from './type'
import Select from './index'

let selectLayers: VectorLayer[] = []
let selectFeatures: BaseFeature<OlGeometry.Geometry>[] = []

export function updateSelectLayers(layers: VectorLayer[]) {
    selectLayers = layers
}

export function updateSelectFeatures(features: BaseFeature<OlGeometry.Geometry>[]) {
    selectFeatures = features
    selectLayers = []
}

export function getTargetFeature(id: string): BaseFeature<OlGeometry.Geometry> | null | undefined {
    let result = null
    if (selectLayers.length) {
        for (const layer of selectLayers) {
            let target = (layer.getFeatures() as BaseFeature<OlGeometry.Geometry>[]).find(f => OlUtil.getUid(f.getFeature()) === id)
            if (target) {
                result = target
            }
        }
    } else {
        result = selectFeatures.find(f => OlUtil.getUid(f.getFeature()) === id)
    }
    return result
}

export function clearHandle() {
    selectLayers = []
    selectFeatures = []
}

export function handleInteractionSelectEvent(target: Select, type: OMapInteractionSelectEventType, e: any) {
    let result = {
        target,
        type,
        selected: target.getSelected(),
        deselected: target.getDeselected(),
    }
    return result
}