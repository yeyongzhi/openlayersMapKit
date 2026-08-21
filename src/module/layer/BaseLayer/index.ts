import { isDefined, isBoolean, isObject, isNumber, isString } from "../../../utils/index";
import { commonMessage } from "../../../utils/message";
import { error_, getPackageMessage, isVaildOpacity, defaultValue } from '../../../utils/index'
import { type OMapExtentType } from '../../basic/Extent/type'
import Extent from '../../basic/Extent/index'
import { isValidExtent } from '../../basic/Extent/type'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import Map from '../../core/Map/index'
import {
    type BaseLayerType,
    type BaseLayerIdType,
    type BaseLayerOptionsType,
    type BaseLayerPropertiesType,
    type OMapBaseLayerCommonType,
    type OMapLayerTarget,
} from './type'

import { type LayerGroupIdType } from '../LayerGroup/type'

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

export default class BaseLayer<T extends OMapBaseLayerCommonType = OMapBaseLayerCommonType> {

    /**
     * 图层类型
     */
    protected type: BaseLayerType | null = null;
    /**
     * 包名（用于日志输出）
     */
    protected _packageName: string = 'BaseLayer';
    /**
     * 日志消息生成函数
     */
    protected _createMessage!: (methodName: string, message: string) => string;
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
    extent: Extent | undefined = undefined; // 图层范围，默认全局
    minZoom: number = DEFAULT_LAYER_MIN_ZOOM; // 最小缩放级别，默认0
    maxZoom: number = DEFAULT_LAYER_MAX_ZOOM; // 最大缩放级别，默认22
    minResolution: number = DEFAULT_LAYER_MIN_RESOLUTION; // 最小分辨率，默认0
    maxResolution: number = DEFAULT_LAYER_MAX_RESOLUTION; // 最大分辨率，默认Infinity
    zIndex: number | undefined = undefined; // 图层层级
    properties: BaseLayerPropertiesType = {}; // 图层属性，用于存储图层相关信息
    /**
     * 图层所属的图层组id，由 LayerGroup 管理
     */
    groupId: LayerGroupIdType | null = null;
    /**
     * 图层所属的地图对象
     */
    map: Map | null = null;

    /**
     * 图层所属的对象
     */
    target: Map | OMapLayerTarget | null = null;

    constructor(type: BaseLayerType, options?: BaseLayerOptionsType) {
        let _options: BaseLayerOptionsType = defaultValue(options, {});
        this.type = type
        // 动态更新包名
        this._packageName = `${type}Layer`;
        this._createMessage = getPackageMessage(this._packageName);
        // 图层ID
        this.id = defaultValue(_options.id, null); 
        // 赋值其他属性
        this.name = defaultValue(_options.name, "");
        this.className = defaultValue(_options.className, '');
        this.opacity = defaultValue(_options.opacity, DEFAULT_LAYER_OPACITY);
        this.visible = defaultValue(_options.visible, DEFAULT_LAYER_VISIBLE);
        this.extent = defaultValue(_options.extent, undefined);
        this.minZoom = defaultValue(_options.minZoom, DEFAULT_LAYER_MIN_ZOOM);
        this.maxZoom = defaultValue(_options.maxZoom, DEFAULT_LAYER_MAX_ZOOM);
        this.minResolution = defaultValue(_options.minResolution, DEFAULT_LAYER_MIN_RESOLUTION);
        this.maxResolution = defaultValue(_options.maxResolution, DEFAULT_LAYER_MAX_RESOLUTION);
        this.zIndex = defaultValue(_options.zIndex, undefined);
        this.properties = defaultValue(_options.properties, {});
        this.map = defaultValue(_options.map, null);
        // 初始化图层组id
        this.groupId = null
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
     * @returns {BaseLayerIdType} 图层id
     */
    getId(): BaseLayerIdType {
        return this.id;
    }

    /**
     * 设置图层id
     * @param {BaseLayerIdType} id 图层id
     */
    setId(id: BaseLayerIdType) {
        this.id = id
    }

    /**
     * 获取图层名称
     * @returns {string} 图层名称
     */
    getName(): string {
        return this.name;
    }

    /**
     * 设置图层名称
     * @param {string} name 图层名称
     */
    setName(name: string) {
        if (!isDefined(name)) {
            error_(this._createMessage('setName', commonMessage.paramsNotDefined('name')));
        }
        if (!isString(name)) {
            error_(this._createMessage('setName', commonMessage.paramsInvaildFormat('name', 'string类型')));
        }
        this.name = name;
    }

    /**
     * 获取图层样式类名
     * @returns {string} 样式类名
     */
    getClassName(): string {
        return this.className;
    }

    /**
     * 设置图层样式类名
     * @param {string} className 样式类名
     */
    setClassName(className: string) {
        if (!isDefined(className)) {
            error_(this._createMessage('setClassName', commonMessage.paramsNotDefined('className')));
        }
        if (!isString(className)) {
            error_(this._createMessage('setClassName', commonMessage.paramsInvaildFormat('className', 'string类型')));
        }
        this.className = className;
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
     * @returns 图层数据源实例
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
            error_(this._createMessage('setOpacity', commonMessage.paramsNotDefined('opacity')));
        }
        if (!isVaildOpacity(opacity)) {
            error_(this._createMessage('setOpacity', commonMessage.paramsInvaildFormat('opacity', '0~1的数字')));
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
            error_(this._createMessage('setVisible', commonMessage.paramsNotDefined('visible')));
        }
        if (!isBoolean(visible)) {
            error_(this._createMessage('setVisible', commonMessage.paramsInvaildFormat('visible', 'boolean类型')));
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
            error_(this._createMessage('setExtent', commonMessage.paramsNotDefined('extent')));
        }
        if(!isValidExtent(extent)) {
            error_(this._createMessage('setExtent', commonMessage.paramsInvaildFormat('extent', 'Extent类型')));
        }
        this._layer.setExtent(handleGetExtentValue(extent))
    }

    setMinZoom(minZoom: number) {
        if (!isDefined(minZoom)) {
            error_(this._createMessage('setMinZoom', commonMessage.paramsNotDefined('minZoom')));
        }
        if (!isNumber(minZoom)) {
            error_(this._createMessage('setMinZoom', commonMessage.paramsInvaildFormat('minZoom', 'number类型')));
        }
        this._layer.setMinZoom(minZoom);
    }

    getMinZoom(): number {
        return this._layer.getMinZoom();
    }

    setMaxZoom(maxZoom: number) {
        if (!isDefined(maxZoom)) {
            error_(this._createMessage('setMaxZoom', commonMessage.paramsNotDefined('maxZoom')));
        }
        if (!isNumber(maxZoom)) {
            error_(this._createMessage('setMaxZoom', commonMessage.paramsInvaildFormat('maxZoom', 'number类型')));
        }
        this._layer.setMaxZoom(maxZoom);
    }

    getMaxZoom(): number {
        return this._layer.getMaxZoom();
    }

    setMinResolution(minResolution: number) {
        if (!isDefined(minResolution)) {
            error_(this._createMessage('setMinResolution', commonMessage.paramsNotDefined('minResolution')));
        }
        if (!isNumber(minResolution)) {
            error_(this._createMessage('setMinResolution', commonMessage.paramsInvaildFormat('minResolution', 'number类型')));
        }
        this._layer.setMinResolution(minResolution);
    }

    getMinResolution(): number {
        return this._layer.getMinResolution();
    }

    setMaxResolution(maxResolution: number) {
        if (!isDefined(maxResolution)) {
            error_(this._createMessage('setMaxResolution', commonMessage.paramsNotDefined('maxResolution')));
        }
        if (!isNumber(maxResolution)) {
            error_(this._createMessage('setMaxResolution', commonMessage.paramsInvaildFormat('maxResolution', 'number类型')));
        }
        this._layer.setMaxResolution(maxResolution);
    }

    getMaxResolution(): number {
        return this._layer.getMaxResolution();
    }

    setZIndex(zIndex: number) {
        if (!isDefined(zIndex)) {
            error_(this._createMessage('setZIndex', commonMessage.paramsNotDefined('zIndex')));
        }
        if (!isNumber(zIndex)) {
            error_(this._createMessage('setZIndex', commonMessage.paramsInvaildFormat('zIndex', 'number类型')));
        }
        this._layer.setZIndex(zIndex);
    }

    getZIndex(): number | undefined {
        return this._layer.getZIndex();
    }

    setProperties(properties: BaseLayerPropertiesType, silent?: boolean) {
        if (!isDefined(properties)) {
            error_(this._createMessage('setProperties', commonMessage.paramsNotDefined('properties')));
        }
        if (!isObject(properties)) {
            error_(this._createMessage('setProperties', commonMessage.paramsInvaildFormat('properties', 'object类型')));
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
     * @param {Map | OMapLayerTarget} target 图层所属的对象
     */
    setTarget(target: Map | OMapLayerTarget | null) {
        this.target = target;
    }

    /**
     * 获取图层当前的对象
     * @returns {Map | OMapLayerTarget | null} 图层所属的对象
     */
    getTarget(): Map | OMapLayerTarget | null {
        return this.target
    }

}
