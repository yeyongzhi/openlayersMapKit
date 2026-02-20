import { ManualOmit } from '../../../utils/type'
import { OMapTileLayerParamsType } from '../TileLayer/type'
import { OMapXYZSourceParamsType } from '../../source/TileSource/subClass/XYZ/type'

export const GaodeLayerType = {
    Vec: 'vec',
    Img: 'img',
    Road: 'road',
} as const
export type GaodeLayerTypeEnum = (typeof GaodeLayerType)[keyof typeof GaodeLayerType]

/**
 * 是否是合法的高德地图图层类型
 */
export function isValidGaodeLayerType(type: any): type is GaodeLayerTypeEnum {
    return Object.values(GaodeLayerType).includes(type)
}

export type OMapGaodeLayerParamsType = ManualOmit<OMapTileLayerParamsType, 'source'> & {
    source: OMapXYZSourceParamsType;
}