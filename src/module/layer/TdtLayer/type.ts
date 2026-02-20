import { ManualOmit } from "../../../utils/index";
import { OMapTileLayerParamsType } from '../TileLayer/type'
import { OMapXYZSourceParamsType } from '../../source/TileSource/subClass/XYZ/type'

/**
 * 天地图图层类型
 * @link http://lbs.tianditu.gov.cn/server/MapService.html
 */
export const TdtLayerType = {
    Vec: 'vec', // 矢量底图
    Img: 'img', // 影像底图
    Ter: 'ter', // 地形底图
    Cva: 'cva', // 矢量注记
    Cia: 'cia', // 影像注记
    Cta: 'cta', // 地形注记
} as const
export type TdtLayerTypeEnum = (typeof TdtLayerType)[keyof typeof TdtLayerType]

/**
 * 是否是合法的高德地图图层类型
 */
export function isValidTdtLayerType(type: any): type is TdtLayerTypeEnum {
    return Object.values(TdtLayerType).includes(type)
}

/**
 * w: 球面墨卡托投影
 * c: 经纬度投影
 */
export type TdtLayerProjTypeEnum = 'w' | 'c'

export type OMapTdtLayerParamsType = ManualOmit<OMapTileLayerParamsType, 'source'> & {
    source: OMapXYZSourceParamsType;
}