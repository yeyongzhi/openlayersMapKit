export type TdtLayerTypeEnum = 'vec' | 'img' | 'ter' | 'cva' | 'cia' | 'cta'
/**
 * w: 球面墨卡托投影
 * c: 经纬度投影
 */
export type TdtLayerProjTypeEnum = 'w' | 'c'

export interface TdtLayerProjType {
    proj: TdtLayerProjTypeEnum
}