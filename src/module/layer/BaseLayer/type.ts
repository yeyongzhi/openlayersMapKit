import { isDefined } from '../../../utils/index'
import { OlLayer, OlSource } from '../../../source/index'
import Extent from '../../basic/Extent/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import Color from '../../basic/Color/index'
import { handleGetColorValue } from '../../basic/Color/handle'
import Map from '../../core/Map/index'

/** BaseLayer */
type CustBaseLayerType = 'XYZ' | 'WMS' | 'WMTS'
export type BaseLayerType = 'Tile' | 'Image' | 'Vector' | 'Gaode' | 'Tdt' | CustBaseLayerType
export type BaseLayerIdType = number | string | null
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

export function handleGetBaseLayerParams(params: BaseLayerOptionsType) {
    let _params = {
        ...params,
        extent: isDefined(params.extent) ? handleGetExtentValue(params.extent) : undefined,
        background: isDefined(params.background) ? handleGetColorValue(params.background) : undefined,
        map: isDefined(params.map) ? params.map.getMap() : undefined,
    }
    return _params
}

export type OMapBaseLayerCommonType = OlLayer.Layer

export type OMapTileLayerType = OlLayer.Tile
export type OlTileLayerInstanceType = InstanceType<typeof OlLayer.Tile>
export type OMapVectorLayerType = OlLayer.Vector
export type OlVectorLayerInstanceType = InstanceType<typeof OlLayer.Vector>
export type OMapImageLayerType = OlLayer.Image<OlSource.Image>
export type OlImageLayerInstanceType = InstanceType<typeof OlLayer.Image>
export type OMapHeatmapLayerType = OlLayer.Heatmap
export type OlHeatmapLayerInstanceType = InstanceType<typeof OlLayer.Heatmap>

export type OMapBaseLayerType = OMapTileLayerType | OMapVectorLayerType | OMapImageLayerType | OMapHeatmapLayerType
/** ol原生全部类型图层实例 */
export type OlAllLayerInstanceType = OlTileLayerInstanceType | OlVectorLayerInstanceType | OlImageLayerInstanceType | OlHeatmapLayerInstanceType

/**
 * 事件类型
 */
export type BaseLayerEventType = 'change:opacity' | 'change:visible' | 'change:extent' | 'change:zIndex' | 'change:minResolution' | 'change:maxResolution' | 'change:minZoom' | 'change:maxZoom'