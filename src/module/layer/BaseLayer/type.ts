import { OlLayer } from '../../../source/index'
import Extent from '../../basic/Extent/index'
import Color from '../../basic/Color/index'
import Map from '../../core/Map/index'

/** BaseLayer */
type CustBaseLayerType = 'XYZ' | 'WMS' | 'WMTS'
export type BaseLayerType = 'Tile' | 'Image' | 'Vector' | 'Gaode' | 'Tdt' | CustBaseLayerType
export type BaseLayerIdType = number | string
export type BaseLayerPropertiesType = Record<string, any>

export type OlBaseLayerOptionsTypeEnum = "className" | "opacity" | "visible" | "extent" | "zIndex" | "minResolution" | "maxResolution" | "minZoom" | "maxZoom" | "background" | "properties"
// 此处的BaseLayerOptionsType 继承 ol.layer.Base全部属性
// 十一个基础属性
export type BaseLayerCommonParamsType = {
    /**
     * 下面十个是ol.layer.Base的基础属性
     */
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
    /**
     * properties是ol不具备的初始化属性，但是有对应的方法
     */
    properties?: Record<string, any>;
}
// 增加三个属性
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