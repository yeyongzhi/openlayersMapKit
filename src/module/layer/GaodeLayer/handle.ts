import { GaodeLayerTypeUrls } from './layerSource'
import type { GaodeLayerTypeEnum } from './type'

export function getGaodeLayerUrlsByType(type: GaodeLayerTypeEnum) {
    return GaodeLayerTypeUrls[type]
}