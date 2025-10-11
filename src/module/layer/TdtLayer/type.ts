import { type OMapTileLayerParamsType } from '../TileLayer/type'
import { ManualOmit } from "../../../utils/index";

export type OMapTdtLayerParamsType = ManualOmit<OMapTileLayerParamsType, 'source'> & TdtLayerProjType

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
}
export type TdtLayerTypeEnum = typeof TdtLayerType[keyof typeof TdtLayerType]
/**
 * w: 球面墨卡托投影
 * c: 经纬度投影
 */
export type TdtLayerProjTypeEnum = 'w' | 'c'

export interface TdtLayerProjType {
    proj: TdtLayerProjTypeEnum
}