import { type ManualOmit } from '../../../utils/type'
import { type OMapTileLayerParamsType } from '../TileLayer/type'
import { type OMapXYZSourceParamsType } from '../../source/TileSource/subClass/XYZ/type'

export const GaodeLayerType = {
  Vec: 'vec',
  Img: 'img',
  Road: 'road'
} as const
export type GaodeLayerTypeEnum = (typeof GaodeLayerType)[keyof typeof GaodeLayerType]

/**
 * 是否是合法的高德地图图层类型
 */
export function isValidGaodeLayerType(type: unknown): type is GaodeLayerTypeEnum {
  return Object.values(GaodeLayerType).includes(type as GaodeLayerTypeEnum)
}

export type OMapGaodeLayerParamsType = ManualOmit<OMapTileLayerParamsType, 'source'> & {
  source: OMapXYZSourceParamsType
}
