import { BaseLayerType, BaseLayerIdType, BaseLayerOptions } from "../../../utils/index";

/**
 * OMap 图层基类
 * @class
 * @classdesc 所有图层的基类，提供了一些通用的方法和属性。
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/5
 * @updateDate 2025/7/5
 */

const DEFAULT_LAYER_OPACITY: number = 1.0;
const DEFAULT_LAYER_VISIBLE: boolean = true;
const DEFAULT_LAYER_MIN_ZOOM: number = 0;
const DEFAULT_LAYER_MAX_ZOOM: number = 22;
const DEFAULT_LAYER_MIN_RESOLUTION: number = 0;
const DEFAULT_LAYER_MAX_RESOLUTION: number = Infinity;
const DEFAULT_LAYER_ZINDEX: number = 1;
const DEFAULT_LAYER_PROPERTIES: Record<string, any> = {};

export default class BaseLayer {

    /**
     * 图层类型
     */
    type: BaseLayerIdType | null = null;
    /**
     * 图层实例（ol）
     */
    _layer: any; // 底层图层对象，由子类实现具体的图层类型
    /**
     * 图层id，每个图层的唯一主键，用于区分图层
     */
    id: BaseLayerIdType = null;
    /**
     * 图层名称，用于显示在图层控制栏中
     */
    name: string = "";
    className: string | null = null; // 图层样式类名，用于自定义图层样式，默认无
    opacity: number = DEFAULT_LAYER_OPACITY; // 图层透明度，默认1
    visible: boolean = DEFAULT_LAYER_VISIBLE; // 图层是否可见，默认true
    extent: [number, number, number, number] | null = null; // 图层范围，默认全局
    minZoom: number = DEFAULT_LAYER_MIN_ZOOM; // 最小缩放级别，默认0
    maxZoom: number = DEFAULT_LAYER_MAX_ZOOM; // 最大缩放级别，默认22
    minResolution: number = DEFAULT_LAYER_MIN_RESOLUTION; // 最小分辨率，默认0r
    maxResolution: number = DEFAULT_LAYER_MAX_RESOLUTION; // 最大分辨率，默认Infinity
    zIndex: number = DEFAULT_LAYER_ZINDEX; // 图层层级，默认0
    properties: Record<string, any> = DEFAULT_LAYER_PROPERTIES; // 图层属性，用于存储图层相关信息

    constructor(type: BaseLayerType, options?: BaseLayerOptions) {
        this.type = type
    }
}