import { OlLayer } from '../../../source/index'
import Extent from '../../basic/Extent/index'
import Color from '../../basic/Color/index'
import Map from '../../core/Map/index'

/** BaseLayer */
export type BaseLayerType = 'Tile' | 'Image' | 'Vector' | 'Gaode' | 'Tdt'
export type BaseLayerIdType = number | string | null | undefined
export type BaseLayerPropertiesType = Record<string, any>

export type OlBaseLayerOptionsTypeEnum = "className" | "opacity" | "visible" | "extent" | "zIndex" | "minResolution" | "maxResolution" | "minZoom" | "maxZoom" | "background" | "properties"
// 此处的BaseLayerOptionsType 继承 ol.layer.Base全部属性，并增加 id 和 name
export type BaseLayerCommonParamsType = {
    className?: string;
    opacity?: number;
    visible?: boolean;
    extent?: Extent;
    zIndex?: number;
    minResolution?: number;
    maxResolution?: number;
    minZoom?: number;
    maxZoom?: number;
    background?: Color | undefined;
    properties?: Record<string, any>;
}
export type BaseLayerOptionsType = BaseLayerCommonParamsType & {
    id?: BaseLayerIdType; // 图层id
    name?: string; // 图层名称，用于显示在图层控制栏中，默认使用图层id
    map?: Map;
}


export type OlTileLayerInstanceType = InstanceType<typeof OlLayer.Tile>
export type OlVectorLayerInstanceType = InstanceType<typeof OlLayer.Vector>
export type OlImageLayerInstanceType = InstanceType<typeof OlLayer.Image>
export type OlHeatmapLayerInstanceType = InstanceType<typeof OlLayer.Heatmap>

/** ol原生全部类型图层实例 */
export type OlAllLayerInstanceType = OlTileLayerInstanceType | OlVectorLayerInstanceType | OlImageLayerInstanceType | OlHeatmapLayerInstanceType

/**
 * 事件类型
 */
export type BaseLayerEventType = 'change:opacity' | 'change:visible' | 'change:extent' | 'change:zIndex' | 'change:minResolution' | 'change:maxResolution' | 'change:minZoom' | 'change:maxZoom'