import { isDefined, isBoolean, isObject, isNumber, isExtentType } from "../../../utils/index";
import { commonMessage } from "../../../utils/message";
import { warn_, error_, getPackageMessage, isVaildOpacity, defaultValue } from '../../../utils/index'
import { type OMapExtentType } from '../../basic/Extent/type'
import Extent from '../../basic/Extent/index'
import { isValidExtent } from '../../basic/Extent/type'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import Map from '../../core/Map/index'
import Draw from '../../interaction/Draw/index'
import Modify from '../../interaction/Modify/index'
import Measure from '../../interaction/Measure/index'
import {
    type BaseLayerType,
    type BaseLayerIdType,
    type BaseLayerOptionsType,
    type BaseLayerPropertiesType,
    type OMapBaseLayerCommonType,
} from './type'

import { layerState } from './layerState'
import { type LayerGroupIdType } from '../LayerGroup/type'
let PACKAGE_NAME = 'BaseLayer';
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * OMap 图层基类
 * @class
 * @classdesc 所有图层的基类，提供了一些通用的方法和属性。
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/5
 * @updateDate 2026/2/2
 */

const DEFAULT_LAYER_OPACITY: number = 1.0;
const DEFAULT_LAYER_VISIBLE: boolean = true;
const DEFAULT_LAYER_MIN_ZOOM: number = 0;
const DEFAULT_LAYER_MAX_ZOOM: number = 22;
const DEFAULT_LAYER_MIN_RESOLUTION: number = 0;
const DEFAULT_LAYER_MAX_RESOLUTION: number = Infinity;
const DEFAULT_LAYER_ZINDEX: number = 1;
const DEFAULT_LAYER_PROPERTIES: Record<string, any> = {};

const baseLayerBasicProperties = [
    "name",
    "className",
    "opacity",
    "visible",
    "extent",
    "minZoom",
    "maxZoom",
    "minResolution",
    "maxResolution",
    "zIndex",
    "properties",
]

export default class BaseLayer<T extends OMapBaseLayerCommonType> {

    /**
     * 图层类型
     */
    protected type: BaseLayerType | null = null;
    /**
     * 图层实例（ol）
     */
    protected _layer!: T; // 底层图层对象，由子类实现具体的图层类型
    /**
     * 图层id，每个图层的唯一主键，用于区分图层
     */
    protected id: BaseLayerIdType = null;
    /**
     * 图层名称，用于显示在图层控制栏中
     */
    name: string = "";
    className: string = ''; // 图层样式类名，用于自定义图层样式，默认无
    opacity: number = DEFAULT_LAYER_OPACITY; // 图层透明度，默认1
    visible: boolean = DEFAULT_LAYER_VISIBLE; // 图层是否可见，默认true
    extent: Extent | null = null; // 图层范围，默认全局
    minZoom: number = DEFAULT_LAYER_MIN_ZOOM; // 最小缩放级别，默认0
    maxZoom: number = DEFAULT_LAYER_MAX_ZOOM; // 最大缩放级别，默认22
    minResolution: number = DEFAULT_LAYER_MIN_RESOLUTION; // 最小分辨率，默认0r
    maxResolution: number = DEFAULT_LAYER_MAX_RESOLUTION; // 最大分辨率，默认Infinity
    zIndex: number = DEFAULT_LAYER_ZINDEX; // 图层层级，默认0
    properties: BaseLayerPropertiesType = DEFAULT_LAYER_PROPERTIES; // 图层属性，用于存储图层相关信息
    /**
     * 图层所属的地图对象
     */
    map: Map | null = null;

    /**
     * 图层所属的对象
     */
    target: Map | Draw | Modify | Measure | null = null;

    constructor(type: BaseLayerType, options?: BaseLayerOptionsType) {
        let _options: BaseLayerOptionsType = defaultValue(options, {});
        this.type = type
        // 动态更新包名
        PACKAGE_NAME = `${type}Layer`;
        createMessage = getPackageMessage(PACKAGE_NAME);
        // 图层ID
        this.id = defaultValue(_options.id, null); 
        // 赋值其他属性
        this.name = defaultValue(_options.name, "");
        this.className = defaultValue(_options.className, '');
        this.opacity = defaultValue(_options.opacity, DEFAULT_LAYER_OPACITY);
        this.visible = defaultValue(_options.visible, DEFAULT_LAYER_VISIBLE);
        this.extent = defaultValue(_options.extent, null);
        this.minZoom = defaultValue(_options.minZoom, DEFAULT_LAYER_MIN_ZOOM);
        this.maxZoom = defaultValue(_options.maxZoom, DEFAULT_LAYER_MAX_ZOOM);
        this.minResolution = defaultValue(_options.minResolution, DEFAULT_LAYER_MIN_RESOLUTION);
        this.maxResolution = defaultValue(_options.maxResolution, DEFAULT_LAYER_MAX_RESOLUTION);
        this.zIndex = defaultValue(_options.zIndex, DEFAULT_LAYER_ZINDEX);
        this.properties = defaultValue(_options.properties, DEFAULT_LAYER_PROPERTIES);
        this.map = defaultValue(_options.map, null);
        // 初始化图层状态
        layerState.set(this, {
            groupId: null
        })
    }

    protected _initLayerEvent(): void {
        // 图层属性变化事件，用于监听图层属性变化
        this._layer.on([
            "propertychange"
        ], (e: any) => {
            // 8个基础属性
            if (e.key === 'opacity') {
                this.opacity = this.getOpacity() as number
            } else if (e.key === 'visible') {
                this.visible = this.getVisible() as boolean
            } else if (e.key === 'extent') {
                this.extent = this.getExtent() as Extent
            } else if (e.key === 'minZoom') {
                this.minZoom = this.getMinZoom() as number
            } else if (e.key === 'maxZoom') {
                this.maxZoom = this.getMaxZoom() as number
            } else if (e.key === 'minResolution') {
                this.minResolution = this.getMinResolution() as number
            } else if (e.key === 'maxResolution') {
                this.maxResolution = this.getMaxResolution() as number
            } else if (e.key === 'zIndex') {
                this.zIndex = this.getZIndex() as number
            }
        })
    }

    /**
     * 获取图层id
     * @returns {BaseLayerIdType | null} 图层id
     */
    getId(): BaseLayerIdType | null {
        return this.id;
    }

    /**
     * 设置图层id
     * @param {BaseLayerIdType | null} id 图层id
     */
    setId(id: BaseLayerIdType | null) {
        this.id = id
    }

    /**
     * 获取图层实例对象
     * @returns {T} 图层对象
     */
    getLayer(): T {
        return this._layer
    }

    /**
     * 获取图层数据源
     */
    getSource() {
        return this._layer.getSource();
    }

    /**
     * 设置图层透明度
     * @param {number} opacity 透明度，0~1
     */
    setOpacity(opacity: number) {
        if (!isDefined(opacity)) {
            error_(createMessage('setOpacity', commonMessage.paramsNotDefined('opacity')));
        }
        if (!isVaildOpacity(opacity)) {
            error_(createMessage('setOpacity', commonMessage.paramsInvaildFormat('opacity', '0~1的数字')));
        }
        this._layer.setOpacity(opacity);
    }

    /**
     * 获取图层透明度
     * @returns {number} 透明度，0~1
     */
    getOpacity(): number {
        return this._layer.getOpacity();
    }

    /**
     * 设置图层可见性
     * @param {boolean} visible 可见性，true/false
     */
    setVisible(visible: boolean) {
        if (!isDefined(visible)) {
            error_(createMessage('setVisible', commonMessage.paramsNotDefined('visible')));
        }
        if (!isBoolean(visible)) {
            error_(createMessage('setVisible', commonMessage.paramsInvaildFormat('visible', 'boolean类型')));
        }
        this._layer.setVisible(visible);
    }

    /**
     * 获取图层可见性
     * @returns {boolean} 可见性，true/false
     */
    getVisible(): boolean {
        return this._layer.getVisible();
    }

    /**
     * 获取图层的范围
     * @returns {Extent | undefined} 范围
     */
    getExtent(): Extent | undefined {
        let extent = this._layer.getExtent()
        return isDefined(extent) ? new Extent(extent) : undefined
    }

    /**
     * 设置图层的范围
     * @param {OMapExtentType} extent 范围
     */
    setExtent(extent: OMapExtentType) {
        if (!isDefined(extent)) {
            error_(createMessage('setExtent', commonMessage.paramsNotDefined('extent')));
        }
        if(!isValidExtent(extent)) {
            error_(createMessage('setExtent', commonMessage.paramsInvaildFormat('extent', 'Extent类型')));
        }
        this._layer.setExtent(handleGetExtentValue(extent))
    }

    setMinZoom(minZoom: number) {
        if (!isDefined(minZoom)) {
            error_(createMessage('setMinZoom', commonMessage.paramsNotDefined('minZoom')));
        }
        if (!isNumber(minZoom)) {
            error_(createMessage('setMinZoom', commonMessage.paramsInvaildFormat('minZoom', 'number类型')));
        }
        this._layer.setMinZoom(minZoom);
    }

    getMinZoom(): number {
        return this._layer.getMinZoom();
    }

    setMaxZoom(maxZoom: number) {
        if (!isDefined(maxZoom)) {
            error_(createMessage('setMaxZoom', commonMessage.paramsNotDefined('maxZoom')));
        }
        if (!isNumber(maxZoom)) {
            error_(createMessage('setMaxZoom', commonMessage.paramsInvaildFormat('maxZoom', 'number类型')));
        }
        this._layer.setMaxZoom(maxZoom);
    }

    getMaxZoom(): number {
        return this._layer.getMaxZoom();
    }

    setMinResolution(minResolution: number) {
        if (!isDefined(minResolution)) {
            error_(createMessage('setMinResolution', commonMessage.paramsNotDefined('minResolution')));
        }
        if (!isNumber(minResolution)) {
            error_(createMessage('setMinResolution', commonMessage.paramsInvaildFormat('minResolution', 'number类型')));
        }
        this._layer.setMinResolution(minResolution);
    }

    getMinResolution(): number {
        return this._layer.getMinResolution();
    }

    setMaxResolution(maxResolution: number) {
        if (!isDefined(maxResolution)) {
            error_(createMessage('setMaxResolution', commonMessage.paramsNotDefined('maxResolution')));
        }
        if (!isNumber(maxResolution)) {
            error_(createMessage('setMaxResolution', commonMessage.paramsInvaildFormat('maxResolution', 'number类型')));
        }
        this._layer.setMaxResolution(maxResolution);
    }

    getMaxResolution(): number {
        return this._layer.getMaxResolution();
    }

    setZIndex(zIndex: number) {
        if (!isDefined(zIndex)) {
            error_(createMessage('setZIndex', commonMessage.paramsNotDefined('zIndex')));
        }
        if (!isNumber(zIndex)) {
            error_(createMessage('setZIndex', commonMessage.paramsInvaildFormat('zIndex', 'number类型')));
        }
        this._layer.setZIndex(zIndex);
    }

    getZIndex(): number | undefined {
        return this._layer.getZIndex();
    }

    setProperties(properties: BaseLayerPropertiesType, silent?: boolean) {
        if (!isDefined(properties)) {
            error_(createMessage('setProperties', commonMessage.paramsNotDefined('properties')));
        }
        if (isObject(properties)) {
            error_(createMessage('setProperties', commonMessage.paramsInvaildFormat('properties', 'object类型')));
        }
        let oldProperties = defaultValue(this.properties, {});
        let newProperties = Object.assign({}, oldProperties, properties)
        this._layer.setProperties(newProperties, silent);
        this.properties = newProperties;
    }

    getProperties(): BaseLayerPropertiesType | undefined {
        return this._layer.getProperties();
    }

    /**
     * 设置图层当前的对象
     * @param {Map | Draw | Modify | Measure} target 图层所属的对象
     */
    setTarget(target: Map | Draw | Modify | Measure | null) {
        this.target = target;
    }

    /**
     * 获取图层当前的对象
     * @returns {Map | Draw | Modify | Measure | null} 图层所属的对象
     */
    getTarget(): Map | Draw | Modify | Measure | null {
        return this.target
    }

    get groupId(): LayerGroupIdType | null {
        return layerState.get(this)?.groupId || null;
    }

    getGroupId(): LayerGroupIdType | null {
        return this.groupId;
    }

}