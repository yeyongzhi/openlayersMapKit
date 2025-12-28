import { isDefined, isBoolean, isObject, isNumber, isExtentType } from "../../../utils/index";
import { commonMessage } from "../../../utils/message";
import { warn_, error_, getPackageMessage, isVaildOpacity, defaultValue } from '../../../utils/index'
import { type OMapExtentType } from '../../basic/Extent/type'
import Extent from '../../basic/Extent/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import Map from '../../core/Map/index'
import Draw from '../../interaction/Draw/index'
import Modify from '../../interaction/Modify/index'
import Measure from '../../interaction/Measure/index'
import {
    type OlAllLayerInstanceType,
    type BaseLayerType,
    type BaseLayerIdType,
    type BaseLayerOptionsType,
    type BaseLayerPropertiesType
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
 * @updateDate 2025/10/10
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
    id: BaseLayerIdType | null = null;
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

    protected _isInitialized(method: string): this is BaseLayerInitialized & this {
        if (!isDefined(this._layer)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    protected _initLayerEvent(): void {
        if (!this._isInitialized('_initLayerEvent')) return;
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

    getId(): BaseLayerIdType | null {
        if (!this._isInitialized('getId')) return null;
        return this.id;
    }

    setId(id: BaseLayerIdType): void {
        if (!this._isInitialized('setId')) return;
        this.id = id
    }

    getLayer() {
        return this._layer
    }

    /**
     * 获取图层数据源
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
            warn_(createMessage('setOpacity', commonMessage.paramsNotDefined('opacity')));
            return;
        }
        if (!isVaildOpacity(opacity)) {
            warn_(createMessage('setOpacity', commonMessage.paramsInvaildFormat('opacity', '0~1的数字')));
            return;
        }
        this._layer.setOpacity(opacity);
    }

    /**
     * 获取图层透明度
     * @returns {number} 透明度，0~1
     */
    getOpacity(): number | undefined {
        if (!this._isInitialized('getOpacity')) return;
        return this._layer.getOpacity();
    }

    /**
     * 设置图层可见性
     * @param {boolean} visible 可见性，true/false
     */
    setVisible(visible: boolean): void {
        if (!this._isInitialized('setVisible')) return;
        if (!isDefined(visible)) {
            warn_(createMessage('setVisible', commonMessage.paramsNotDefined('visible')));
            return;
        }
        if (!isBoolean(visible)) {
            warn_(createMessage('setVisible', commonMessage.paramsInvaildFormat('visible', 'boolean类型')));
            return;
        }
        this._layer.setVisible(visible);
    }

    /**
     * 获取图层可见性
     * @returns {boolean} 可见性，true/false
     */
    getVisible(): boolean | undefined {
        if (!this._isInitialized('getVisible')) return;
        return this._layer.getVisible();
    }

    /**
     * 获取图层的范围
     * @returns {Extent | undefined} 范围
     */
    getExtent(): Extent | undefined {
        if (!this._isInitialized('getExtent')) return;
        let extent = this._layer.getExtent()
        return isDefined(extent) ? new Extent(...extent) : undefined
    }

    /**
     * 设置图层的范围
     * @param {OMapExtentType} extent 范围
     */
    setExtent(extent: OMapExtentType): void {
        if (!this._isInitialized('setExtent')) return;
        if (!isDefined(extent)) {
            warn_(createMessage('setExtent', commonMessage.paramsNotDefined('extent')));
            return;
        }
        if(!(extent instanceof Extent) && !isExtentType(extent)) {
            warn_(createMessage('setExtent', commonMessage.paramsInvaildFormat('extent', 'Extent类型')));
            return;
        }
        this._layer.setExtent(handleGetExtentValue(extent))
    }

    setMinZoom(minZoom: number): void {
        if (!this._isInitialized('setMinZoom')) return;
        if (!isDefined(minZoom)) {
            warn_(createMessage('setMinZoom', commonMessage.paramsNotDefined('minZoom')));
            return;
        }
        if (!isNumber(minZoom)) {
            warn_(createMessage('setMinZoom', commonMessage.paramsInvaildFormat('minZoom', 'number类型')));
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
            warn_(createMessage('setMaxZoom', commonMessage.paramsNotDefined('maxZoom')));
            return;
        }
        if (!isNumber(maxZoom)) {
            warn_(createMessage('setMaxZoom', commonMessage.paramsInvaildFormat('maxZoom', 'number类型')));
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
            warn_(createMessage('setMinResolution', commonMessage.paramsNotDefined('minResolution')));
            return;
        }
        if (!isNumber(minResolution)) {
            warn_(createMessage('setMinResolution', commonMessage.paramsInvaildFormat('minResolution', 'number类型')));
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
            warn_(createMessage('setMaxResolution', commonMessage.paramsNotDefined('maxResolution')));
            return;
        }
        if (!isNumber(maxResolution)) {
            warn_(createMessage('setMaxResolution', commonMessage.paramsInvaildFormat('maxResolution', 'number类型')));
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
            warn_(createMessage('setZIndex', commonMessage.paramsNotDefined('zIndex')));
            return;
        }
        if (!isNumber(zIndex)) {
            warn_(createMessage('setZIndex', commonMessage.paramsInvaildFormat('zIndex', 'number类型')));
            return;
        }
        this._layer.setZIndex(zIndex);
    }

    getZIndex(): number | undefined {
        if (!this._isInitialized('getZIndex')) return undefined;
        return this._layer.getZIndex();
    }

    setProperties(properties: BaseLayerPropertiesType): void {
        if (!this._isInitialized('setProperties')) return;
        if (!isDefined(properties)) {
            warn_(createMessage('setProperties', commonMessage.paramsNotDefined('properties')));
            return;
        }
        if (isObject(properties)) {
            warn_(createMessage('setProperties', commonMessage.paramsInvaildFormat('properties', 'object类型')));
            return;
        }
        let oldProperties = this.getProperties() || {}
        let newProperties = Object.assign({}, oldProperties, properties)
        this._layer.setProperties(newProperties);
        this.properties = newProperties;
    }

    getProperties(): BaseLayerPropertiesType | undefined {
        if (!this._isInitialized('getProperties')) return;
        return this._layer.getProperties();
    }

    /**
     * 设置图层当前的对象
     * @param {Map | Draw | Modify | Measure} target 图层所属的对象
     */
    setTarget(target: Map | Draw | Modify | Measure | null): void {
        this.target = target;
    }

    /**
     * 获取图层当前的对象
     * @returns {Map | Draw | Modify | Measure | null} 图层所属的对象
     */
    getTarget(): Map | Draw | Modify | Measure | null | undefined {
        if (!this._isInitialized('getProperties')) return;
        return this.target
    }

    get groupId(): LayerGroupIdType | null {
        return layerState.get(this)?.groupId || null;
    }

    getGroupId(): LayerGroupIdType | null {
        return this.groupId;
    }

}