import { BaseLayerType, BaseLayerIdType, isDefined, isBoolean, isObject, isNumber } from "../../../utils/index";
import OlPackage, { OlLayer } from '../../../source/index'
import { warn_, error_, getPackageMessage, isVaildOpacity } from '../../../utils/index'
import type { BaseLayerOptionsType, PropertiesType, BaseLayerEventType, IdType, OlExtentType } from '../../../utils/index'
import { LayerGroup, Extent, VectorLayer } from '../../../index'
import type { OlAllLayerInstanceType } from './type'

let PACKAGE_NAME = 'BaseLayer';
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * OMap 图层基类
 * @class
 * @classdesc 所有图层的基类，提供了一些通用的方法和属性。
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/5
 * @updateDate 2025/7/6
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

interface BaseLayerLike {
    _layer?: OlAllLayerInstanceType;
}

interface BaseLayerInitialized {
    _layer: OlAllLayerInstanceType;
}


export default class BaseLayer implements BaseLayerLike {


    /**
     * 图层类型
     */
    type: BaseLayerType | null = null;
    /**
     * 图层实例（ol）
     */
    _layer?: OlAllLayerInstanceType; // 底层图层对象，由子类实现具体的图层类型
    /**
     * 图层id，每个图层的唯一主键，用于区分图层
     */
    id: BaseLayerIdType = null;
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
    properties: PropertiesType = DEFAULT_LAYER_PROPERTIES; // 图层属性，用于存储图层相关信息

    #groupId: IdType = null; // 图层所属组ID，默认null

    constructor(type: BaseLayerType, options?: BaseLayerOptionsType) {
        let _options: BaseLayerOptionsType = options || {};
        this.type = type
        PACKAGE_NAME = `${type}Layer`; // 动态更新包名
        createMessage = getPackageMessage(PACKAGE_NAME);
        // 校验ID
        if (_options.id) {
            this.id = _options.id; // 赋值ID，用于区分图层
        }
        // 赋值其他属性
        this.name = _options.name || "";
        this.className = _options.className || '';
        this.opacity = _options.opacity || DEFAULT_LAYER_OPACITY;
        this.visible = _options.visible || DEFAULT_LAYER_VISIBLE;
        this.extent = _options.extent || null;
        this.minZoom = _options.minZoom || DEFAULT_LAYER_MIN_ZOOM;
        this.maxZoom = _options.maxZoom || DEFAULT_LAYER_MAX_ZOOM;
        this.minResolution = _options.minResolution || DEFAULT_LAYER_MIN_RESOLUTION;
        this.maxResolution = _options.maxResolution || DEFAULT_LAYER_MAX_RESOLUTION;
        this.zIndex = _options.zIndex || DEFAULT_LAYER_ZINDEX;
        this.properties = _options.properties || DEFAULT_LAYER_PROPERTIES;
    }

    protected _isInitialized(method: string): this is BaseLayerInitialized & this {
        if (!isDefined(this._layer)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    _initLayerEvent(): void {
        if (!this._isInitialized('_initLayerEvent')) return;
        // 图层属性变化事件，用于监听图层属性变化
        this._layer.on([
            "propertychange"
        ], (e: any) => {
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

    getId() {
        if (!this._isInitialized('getId')) return undefined;
        return this.id;
    }

    /**
     * 获取图层数据源
     * @returns 
     */
    getSource() {
        if (!this._isInitialized('getSource')) return undefined;
        return this._layer.getSource();
    }

    /**
     * 设置图层透明度
     * @param {number} opacity 透明度，0~1
     */
    setOpacity(opacity: number): void {
        if (!this._isInitialized('setOpacity')) return;
        if (!isDefined(opacity)) {
            warn_(createMessage('setOpacity', '透明度不能为空'));
            return;
        }
        if (!isVaildOpacity(opacity)) {
            warn_(createMessage('setOpacity', '透明度必须为0~1的数字'));
            return;
        }
        this._layer.setOpacity(opacity);
    }

    /**
     * 获取图层透明度
     * @returns {number} 透明度，0~1
     */
    getOpacity(): number | undefined {
        if (!this._isInitialized('getOpacity')) return undefined;
        return this._layer.getOpacity();
    }

    /**
     * 设置图层可见性
     * @param {boolean} visible 可见性，true/false
     */
    setVisible(visible: boolean): void {
        if (!this._isInitialized('setVisible')) return;
        if (!isDefined(visible)) {
            warn_(createMessage('setVisible', '可见性不能为空'));
            return;
        }
        if (isBoolean(visible)) {
            warn_(createMessage('setVisible', '可见性必须为boolean类型'));
            return;
        }
        this._layer.setVisible(visible);
    }

    /**
     * 获取图层可见性
     * @returns {boolean} 可见性，true/false
     */
    getVisible(): boolean | undefined {
        if (!this._isInitialized('getVisible')) return undefined;
        return this._layer.getVisible();
    }

    /**
     * 设置图层的范围
     */
    setExtent(extent: Extent | OlExtentType): void {
        if (!this._isInitialized('setExtent')) return;
        let _extent = (extent instanceof Extent) ? extent.getExtent() : extent
        this._layer.setExtent(_extent)
    }

    /**
     * 获取图层的范围
     */
    getExtent(): Extent | undefined {
        if (!this._isInitialized('getExtent')) return undefined;
        let extent = this._layer.getExtent()
        if(!extent) return;
        return new Extent(extent[0], extent[1], extent[2], extent[3])
    }

    setMinZoom(minZoom: number): void {
        if (!this._isInitialized('setMinZoom')) return;
        if (!isDefined(minZoom)) {
            warn_(createMessage('setMinZoom', 'minZoom不能为空'));
            return;
        }
        if (!isNumber(minZoom)) {
            warn_(createMessage('setMinZoom', 'minZoom必须为number类型'));
            return;
        }
        this._layer.setMinZoom(minZoom);
    }

    getMinZoom(): number | undefined {
        if (!this._isInitialized('getMinZoom')) return;
        return this._layer.getMinZoom();
    }

    setMaxZoom(maxZoom: number): void {
        if (!this._isInitialized('setMaxZoom')) return;
        if (!isDefined(maxZoom)) {
            warn_(createMessage('setMaxZoom', 'maxZoom不能为空'));
            return;
        }
        if (!isNumber(maxZoom)) {
            warn_(createMessage('setMaxZoom', 'maxZoom必须为number类型'));
            return;
        }
        this._layer.setMaxZoom(maxZoom);
    }

    getMaxZoom(): number | undefined {
        if (!this._isInitialized('getMaxZoom')) return;
        return this._layer.getMaxZoom();
    }

    setMinResolution(minResolution: number): void {
        if (!this._isInitialized('setMinResolution')) return;
        if (!isDefined(minResolution)) {
            warn_(createMessage('setMinResolution', 'minResolution不能为空'));
            return;
        }
        if (!isNumber(minResolution)) {
            warn_(createMessage('setMinResolution', 'minResolution必须为number类型'));
            return;
        }
        this._layer.setMinResolution(minResolution);
    }

    getMinResolution(): number | undefined {
        if (!this._isInitialized('getMinResolution')) return;
        return this._layer.getMinResolution();
    }

    setMaxResolution(maxResolution: number): void {
        if (!this._isInitialized('setMaxResolution')) return;
        if (!isDefined(maxResolution)) {
            warn_(createMessage('setMaxResolution', 'maxResolution不能为空'));
            return;
        }
        if (!isNumber(maxResolution)) {
            warn_(createMessage('setMaxResolution', 'maxResolution必须为number类型'));
            return;
        }
        this._layer.setMaxResolution(maxResolution);
    }

    getMaxResolution(): number | undefined {
        if (!this._isInitialized('getMaxResolution')) return;
        return this._layer.getMaxResolution();
    }

    setZIndex(zIndex: number): void {
        if (!this._isInitialized('setZIndex')) return;
        if (!isDefined(zIndex)) {
            warn_(createMessage('setZIndex', 'zIndex不能为空'));
            return;
        }
        if (!isNumber(zIndex)) {
            warn_(createMessage('setZIndex', 'zIndex必须为number类型'));
            return;
        }
        this._layer.setZIndex(zIndex);
    }

    getZIndex(): number | undefined {
        if (!this._isInitialized('getZIndex')) return undefined;
        return this._layer.getZIndex();
    }

    setProperties(properties: PropertiesType): void {
        if (!this._isInitialized('setProperties')) return;
        if (!isDefined(properties)) {
            warn_(createMessage('setProperties', '属性不能为空'));
            return;
        }
        if (isObject(properties)) {
            warn_(createMessage('setProperties', '属性必须为object类型'));
            return;
        }
        this._layer.setProperties(properties);
    }

    getProperties(): PropertiesType | undefined {
        if (!this._isInitialized('getProperties')) return;
        return this._layer.getProperties();
    }

    getGroupId() {
        if (!this._isInitialized('getGroupId')) return;
        return this.#groupId;
    }

    // TODO
    setGroupId(newId: number | string) {
        this.#groupId = newId;
    }

}