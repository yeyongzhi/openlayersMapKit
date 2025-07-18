import { OlLayer } from '../../../source/index'

export type OlTileLayerInstanceType = InstanceType<typeof OlLayer.Tile>
export type OlVectorLayerInstanceType = InstanceType<typeof OlLayer.Vector>
export type OlImageLayerInstanceType = InstanceType<typeof OlLayer.Image>
export type OlHeatmapLayerInstanceType = InstanceType<typeof OlLayer.Heatmap>

/** ol原生全部类型图层实例 */
export type OlAllLayerInstanceType = OlTileLayerInstanceType | OlVectorLayerInstanceType | OlImageLayerInstanceType | OlHeatmapLayerInstanceType