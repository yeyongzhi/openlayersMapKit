import { OlLayer } from '../../source/index'

type OlTileLayerInstanceType = InstanceType<typeof OlLayer.Tile>
type OlVectorLayerInstanceType = InstanceType<typeof OlLayer.Vector>
type OlImageLayerInstanceType = InstanceType<typeof OlLayer.Image>
type OlHeatmapLayerInstanceType = InstanceType<typeof OlLayer.Heatmap>



export type OlAllLayerInstanceType = OlTileLayerInstanceType | OlVectorLayerInstanceType | OlImageLayerInstanceType | OlHeatmapLayerInstanceType