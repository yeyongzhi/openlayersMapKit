import VectorLayer from '../../layer/VectorLayer/index'
import { OlGeometry, OlInteraction, OlUtil } from '../../../source/index'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import { OMapSelectEventType } from './type'
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
            let target = (layer.getFeatures() as BaseFeature<OlGeometry.Geometry>[]).find(f => OlUtil.getUid(f._feature) === id)
            if (target) {
                result = target
            }
        }
    } else {
        result = selectFeatures.find(f => OlUtil.getUid(f._feature) === id)
    }
    return result
}

export function clearHandle() {
    selectLayers = []
    selectFeatures = []
}

interface OMapSelectEventTarget {
    target: Select;
    type: OMapSelectEventType;
    mapBrowserEvent: any;
}

export function handleSelectEvent(target: Select, type: OMapSelectEventType, e: any) {
    let result: OMapSelectEventTarget = {
        target,
        type,
        mapBrowserEvent: e.mapBrowserEvent
    }
    return result
}