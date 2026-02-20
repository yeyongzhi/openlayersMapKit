import { isDefined } from '../../../utils/index'
import { GaodeLayerTypeUrls } from './layerSource'
import type { GaodeLayerTypeEnum } from './type'

/**
 * 根据类型获取高德地图图层的URL
 * @param {GaodeLayerTypeEnum} type 高德地图图层类型
 * @returns 高德地图图层的URL数组
 */
export function getGaodeLayerUrlsByType(type: GaodeLayerTypeEnum): string[] {
    if(!isDefined(type)) return []
    return GaodeLayerTypeUrls[type]
}