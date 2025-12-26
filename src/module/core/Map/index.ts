import { isDefined, isNumber, isBoolean, isString, defaultValue, isFunction, isArray, isObject } from '../../../utils/index';
import { warn_, error_, getPackageMessage, commonMessage } from '../../../utils/message'
import OlPackage, { OlUtil, OlSphere } from '../../../source/index'
import type {
    OlViewInstanceType,
    IdType,
} from '../../../utils/index';
import Lnglat from '../../basic/Lnglat/index'
import { type OlCoordinateType, type OMapCoordinateType } from '../../basic/Lnglat/type'
import { handleGetLnglatValue } from '../../basic/Lnglat/handle'
import Extent from '../../basic/Extent/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { type OMapExtentType } from '../../basic/Extent/type'
import Size from '../../basic/Size/index'
import { type OlSizeType, type OMapSizeType } from '../../basic/Size/type'
import { handleGetSizeValue } from '../../basic/Size/handle'
import Pixel from '../../basic/Pixel/index'
import { type OMapPixelType, type OlPixelType } from '../../basic/Pixel/type'
import { handleGetPixelValue } from '../../basic/Pixel/handle'
import Projection from '../Projection/index'
import { type OlProjInstanceType } from '../Projection/type'
import { VectorLayer } from '../../../index'
import BaseLayer from '../../layer/BaseLayer/index'
import { type OlAllLayerInstanceType, type BaseLayerIdType } from '../../layer/BaseLayer/type'
import BaseFeature from '../Feature/BasicFeature/index'
import type { OlFeatureInstanceType, OlGeomInstanceType, OlFeatureLike } from '../Feature/BasicFeature/type'
import Interaction from '../../interaction/Interaction/index'
import Control from '../../control/Control/index'
import { type OlInteractionInstanceType } from '../../interaction/Interaction/type'
import Draw from '../../interaction/Draw/index'
import Measure from '../../interaction/Measure/index'
import Event from '../../../module/util/Event/index'
import Popup from '../../basic/Popup/index'
import LayerGroup from '../../layer/LayerGroup/index'
import { type LayerGroupIdType } from '../../layer/LayerGroup/type'
import type { OlPopupInstanceType } from '../../basic/Popup/type'
import {
    type OMapOptionsType,
    defaultMapOptions,
    type OlMapInstanceType,
    type MapContainerType,
    type OMapEventType,
    type OMapEventCallBack,
    type OlMapOnEventType,
    type OlViewOnEventType,
    OMapForEachFeatureAtPixelOptionsType,
    DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS,
    OMapViewAnimateOptionsType,
    OMAP_VIEW_ANIMATE_DEFAULT_OPTIONS,
    OMapEasing,
    type OMapViewFitOptionsType,
    OMAP_VIEW_FIT_DEFAULT_OPTIONS,
} from './type'
import { MapEventTypeIsMap, handleMapOnCallBack } from './handle'

const PACKAGE_NAME = 'Map';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 地图类
 * @class
 * @classdesc 核心地图类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/5
 * @updateDate 2025/10/11
 */

interface MapLike {
    _map?: OlMapInstanceType;
    _view?: OlViewInstanceType;
    layers: Array<BaseLayer>;
    interactions: Array<Interaction>;
}

// 精确类型：保证一定已初始化
interface MapLikeInitialized {
    _map: OlMapInstanceType;
    _view: OlViewInstanceType;
}

export default class Map implements MapLike {

    _map?: OlMapInstanceType;
    _view?: OlViewInstanceType;
    projection?: Projection;
    layers: Array<BaseLayer> = [];
    layerGroups: Array<LayerGroup> = [];
    interactions: Array<Interaction> = [];
    controls: Array<Control> = [];
    events: Event | null = null;
    popups: Array<Popup> = [];

    constructor(element: MapContainerType, options: OMapOptionsType) {
        let _options = options
        const view_options = _options.view
        if (!isDefined(view_options)) {
            error_(createMessage('constructor', 'view参数不能为空'));
            return;
        }
        let proj: Projection | string = view_options.projection || new Projection('EPSG:3857'); // 默认为3857
        if (isString(proj)) {
            proj = new Projection(proj as string)
        }
        this.projection = proj as Projection
        const view_params = {
            ...view_options,
            center: (view_options.center instanceof Lnglat) ? view_options.center._lnglat : view_options.center, // 中心点坐标
            extent: (view_options.extent instanceof Extent) ? view_options.extent._extent : view_options.extent,
            projection: (proj as Projection)._projection as OlProjInstanceType
        }
        const view = new OlPackage.View(view_params)
        let mapInteractions = defaultValue(_options.interactions, defaultMapOptions.interactions)
        let mapControls = defaultValue(_options.controls, defaultMapOptions.controls)
        let mapPopups = defaultValue(_options.popups, defaultMapOptions.popups)
        let mapParams = Object.assign({}, defaultMapOptions, {
            ..._options,
            interactions: [],
            overlays: [],
            view: view
        })
        mapParams.target = element as HTMLElement
        const map = new OlPackage.Map(mapParams);
        this._view = view;
        this._map = map;
        // 初始化加载Interaction
        if (isDefined(mapInteractions) && mapInteractions.length > 0) {
            mapInteractions.forEach((interaction: Interaction) => {
                this.addInteraction(interaction);
            })
        }
        // 初始化加载Control
        if (isDefined(mapControls) && mapControls.length > 0) {
            mapControls.forEach((control: Control) => {
                this.addControl(control);
            })
        }
        // 初始化加载Popup
        if (isDefined(mapPopups) && mapPopups.length > 0) {
            mapPopups.forEach((popup: Popup) => {
                this.addPopup(popup);
            })
        }
        this.events = new Event<Record<OMapEventType, unknown[]>>(this);
    }

    /** 私有守卫：运行期检查 + 类型收窄 */
    private _isInitialized(
        method: string
    ): this is MapLikeInitialized & this {
        if (this._map == null || this._view == null) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    getSize(): Size | undefined {
        if (!this._isInitialized('getSize')) return;
        let size = (this._map as OlMapInstanceType).getSize()
        return new Size(...(size as OlSizeType));
    }

    setSize(size: Size | OlSizeType): void {
        if (!this._isInitialized('getSize')) return;
        let _size: OlSizeType = (size instanceof Size) ? size._size as OlSizeType : (size as OlSizeType);
        (this._map as OlMapInstanceType).setSize(_size)
    }

    // 地图信息相关
    getCenter(): Lnglat | undefined {
        if (!this._isInitialized('getCenter')) return;
        let center = this._view.getCenter()
        if (!center) return;
        return new Lnglat(center[0], center[1]);
    }

    setCenter(center: Lnglat | OlCoordinateType): void {
        if (!this._isInitialized('setCenter')) return;
        if (!isDefined(center)) {
            warn_(createMessage('setCenter', '参数center不能为空'));
            return;
        }
        let _center = center instanceof Lnglat ? center._lnglat : center;
        this._view.setCenter(_center)
    }

    getZoom(): number | undefined {
        if (!this._isInitialized('getZoom')) return;
        return this._view.getZoom();
    }

    setZoom(zoom: number): void {
        if (!this._isInitialized('setZoom')) return;
        if (!isDefined(zoom)) {
            warn_(createMessage('setZoom', '参数zoom不能为空'));
            return;
        }
        if (!isNumber(zoom)) {
            warn_(createMessage('setZoom', '参数zoom必须为number类型'));
            return;
        }
        this._view.setZoom(zoom)
    }

    getResolution(): number | undefined {
        if (!this._isInitialized('getResolution')) return;
        return this._view.getResolution();
    }

    setResolution(resolution: number): void {
        if (!this._isInitialized('setResolution')) return;
        if (!isDefined(resolution)) {
            warn_(createMessage('setResolution', '参数resolution不能为空'));
            return;
        }
        if (!isNumber(resolution)) {
            warn_(createMessage('setResolution', '参数resolution必须为number类型'));
            return;
        }
        this._view.setResolution(resolution)
    }

    getRotation(): number | undefined {
        if (!this._isInitialized('getRotation')) return;
        return this._view.getRotation();
    }

    setRotation(rotation: number): void {
        if (!this._isInitialized('setRotation')) return;
        if (!isDefined(rotation)) {
            warn_(createMessage('setRotation', '参数rotation不能为空'));
            return;
        }
        if (!isNumber(rotation)) {
            warn_(createMessage('setRotation', '参数rotation必须为number类型'));
            return;
        }
        this._view.setRotation(rotation)
    }

    getExtent(): Extent | undefined {
        if (!this._isInitialized('getExtent')) return;
        let _extent = this._view.calculateExtent()
        let [minX, minY, maxX, maxY] = _extent
        return new Extent(minX, minY, maxX, maxY)
    }

    zoomIn(delta: number = 1): void {
        if (!this._isInitialized('zoomIn')) return;
        if (isDefined(delta) && !isNumber(delta)) {
            warn_(createMessage('zoomIn', '参数delta必须为number类型'));
            return;
        }
        this._view.adjustZoom(delta)
    }

    zoomOut(delta: number = -1) {
        if (!this._isInitialized('zoomIn')) return;
        if (isDefined(delta) && !isNumber(delta)) {
            warn_(createMessage('zoomIn', '参数delta必须为number类型'));
            return;
        }
        this._view.adjustZoom(delta)
    }

    /** 图层管理相关 */

    /**
     * 添加图层
     * @param {BaseLayer} layer 图层对象
     */
    addLayer(layer: BaseLayer): void {
        if (!this._isInitialized('addLayer')) return;
        if (!isDefined(layer)) {
            warn_(createMessage('addLayer', '图层对象不能为空'));
            return;
        }
        if (!(layer instanceof BaseLayer)) {
            warn_(createMessage('addLayer', '图层对象必须为BaseLayer类型'));
            return;
        }
        const layerId = layer.getId();
        let isExist: boolean = false
        if (isDefined(layerId)) {
            isExist = (this.getLayerById(layerId) !== undefined)
        } else {
            isExist = this.layers.some((item: BaseLayer) => {
                return OlUtil.getUid(item.getLayer()) === OlUtil.getUid(layer.getLayer())
            })
        }
        if (isExist) {
            warn_(createMessage('addLayer', '图层已存在'));
            return;
        }
        if (isDefined(layer.getLayer())) {
            this.layers.push(layer);
            layer.setTarget(this)
            this._map.addLayer(layer.getLayer() as OlAllLayerInstanceType); // 添加图层到地图中
        }
    }

    /**
     * 添加多个图层
     * @param {Array<BaseLayer>} layers 图层数组
     */
    addLayers(layers: Array<BaseLayer>): void {
        if (!this._isInitialized('addLayer')) return;
        if (!isDefined(layers)) {
            warn_(createMessage('addLayer', '参数layers不能为空'));
            return;
        }
        if (!isArray(layers)) {
            warn_(createMessage('addLayers', '参数layers必须为数组类型'));
            return;
        }
        layers.forEach((item: BaseLayer) => {
            this.addLayer(item)
        })
    }

    /**
     * 根据id获取图层
     * @param {BaseLayerIdType} id 图层id
     * @returns {BaseLayer | undefined} 图层对象
     */
    getLayerById(id: BaseLayerIdType): BaseLayer | undefined {
        if (!isDefined(id)) {
            warn_(createMessage('getLayerById', '图层id不能为空'));
            return undefined;
        }
        let layer: BaseLayer | undefined = undefined;
        this.layers.forEach((item) => {
            // if (item instanceof LayerGroup) {
            //     (item as LayerGroup).getAll().forEach((layerItem) => {
            //         if (isDefined(layerItem.getId()) && layerItem.getId() === id) {
            //             layer = layerItem
            //         }
            //     })
            // }
            if (item instanceof BaseLayer) {
                if (isDefined((item as BaseLayer).getId()) && (item as BaseLayer).getId() === id) {
                    layer = item
                }
            }
        });
        return layer
    }

    /**
     * 移除图层
     * @param {BaseLayer} layer 图层对象
     */
    removeLayer(layer: BaseLayer) {
        if (!this._isInitialized('removeLayer')) return;
        let index = this.layers.indexOf(layer);
        if (index !== -1) {
            if (layer._layer) {
                this.layers.splice(index, 1);
                this._map.removeLayer(layer._layer);
            }
        }
    }

    /**
     * 移除多个图层
     * @param {Array<BaseLayer>} layers 图层数组
     */
    removeLayers(layers: BaseLayer[]) {
        if (!this._isInitialized('removeLayers')) return;
        this.layers.forEach((l, index) => {
            if (layers.includes(l)) {
                if (l._layer) {
                    this.layers.splice(index, 1);
                    this._map.removeLayer(l._layer);
                }
            }
        })
    }

    /**
     * 根据id移除图层
     * @param {BaseLayerIdType} id 图层id
     */
    removeLayerById(id: number | string) {
        if (!this._isInitialized('removeLayerById')) return;
        if (!isDefined(id)) {
            warn_(createMessage('removeLayerById', '图层id不能为空'));
            return undefined;
        }
        let layer = this.getLayerById(id)
        if (!isDefined(layer)) {
            warn_(createMessage('removeLayerById', `找不到id为${id}(${isString(id) ? 'string' : 'number'})的图层`));
            return false;
        }
        this.removeLayer(layer)
    }

    /**
     * 获取所有图层
     * @returns {Array<BaseLayer>} 图层数组
     */
    getAllLayers(): BaseLayer[] {
        if (!this._isInitialized('getAllLayers')) return [];
        return this.layers
    }

    /** 图层组管理 */

    /**
     * 添加图层组
     * @param {LayerGroup} group 图层组实例
     */
    addLayerGroup(group: LayerGroup): void {
        if (!this._isInitialized('addLayerGroup')) return;
        if (!isDefined(group)) {
            warn_(createMessage('addLayerGroup', '参数layerGroup不能为空'));
            return;
        }
        if (!(group instanceof LayerGroup)) {
            warn_(createMessage('addLayerGroup', '参数layerGroup必须为LayerGroup实例'));
            return;
        }
        let isExist: boolean = false
        if (group.getId()) {
            isExist = (this.layerGroups.some(item => {
                return isDefined(item.getId()) && (item.getId() === group.getId())
            }))
        }
        if (!isExist) {
            group.setMap(this);
            this.layerGroups.push(group);
            this.addLayers(group.getAllLayers());
        }
    }

    /**
     * 移除图层组
     * @param {LayerGroup} group 图层组实例
     */
    removeLayerGroup(group: LayerGroup): void {
        if (!this._isInitialized('removeLayerGroup')) return;
        if (!isDefined(group)) {
            warn_(createMessage('removeLayerGroup', '参数layerGroup不能为空'));
            return;
        }
        if (!(group instanceof LayerGroup)) {
            warn_(createMessage('removeLayerGroup', '参数layerGroup必须为LayerGroup实例'));
            return;
        }
        let index: number = -1
        if (group.getId()) {
            index = (this.layerGroups.findIndex(item => {
                return isDefined(item.getId()) && (item.getId() === group.getId())
            }))
        }
        if (index !== -1) {
            group.setMap(null);
            this.removeLayers(group.getAllLayers());
            this.layerGroups = this.layerGroups.splice(index, 1);
        }
    }

    /**
     * 移除图层组
     * @param {LayerGroupIdType} groupId 图层组id
     */
    removeLayerGroupById(groupId: LayerGroupIdType): void {
        if (!this._isInitialized('removeLayerGroupById')) return;
        if (!isDefined(groupId)) {
            warn_(createMessage('removeLayerGroupById', '参数groupId不能为空'));
            return;
        }
        if (!isNumber(groupId) && !isString(groupId)) {
            warn_(createMessage('removeLayerGroupById', '参数groupId必须为number或string类型'));
            return;
        }
        let index: number = (this.layerGroups.findIndex(item => {
            return isDefined(item.getId()) && (item.getId() === groupId)
        }))
        if (index !== -1) {
            (this.layerGroups[index] as LayerGroup).setMap(null);
            this.removeLayers((this.layerGroups[index] as LayerGroup).getAllLayers());
            this.layerGroups = this.layerGroups.splice(index, 1);
        }
    }

    /**
     * 获取所有图层组
     * @returns {LayerGroup[]} 所有图层组
     */
    getAllLayerGroups(): LayerGroup[] | undefined {
        if (!this._isInitialized('getAllLayerGroups')) return;
        return this.layerGroups
    }

    /**
     * 获取所有图层组
     * @returns {LayerGroup[]} 所有图层组
     */
    getLayerGroups(): LayerGroup[] | undefined {
        return this.getAllLayerGroups()
    }

    getLayerGroupById(groupId: LayerGroupIdType): LayerGroup | undefined {
        if (!this._isInitialized('getLayerGroupById')) return;
        if (!isDefined(groupId)) {
            warn_(createMessage('removeLayerGroupById', '参数groupId不能为空'));
            return;
        }
        if (!isNumber(groupId) && !isString(groupId)) {
            warn_(createMessage('removeLayerGroupById', '参数groupId必须为number或string类型'));
            return;
        }
        let index: number = (this.layerGroups.findIndex(item => {
            return isDefined(item.getId()) && (item.getId() === groupId)
        }))
        if (index === -1) {
            warn_(createMessage('getLayerGroupById', '未找到图层组'));
            return;
        }
        return this.layerGroups[index] as LayerGroup;
    }

    // 事件管理
    on(type: OMapEventType, callback: () => void): number | string | undefined {
        if (!this._isInitialized('on')) return;
        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('on', '参数不能为空'));
            return;
        }
        let isMapTarget = MapEventTypeIsMap(type)
        const target = (isMapTarget) ? this._map : this._view;
        let list = (this.events as Event).get(type)
        // 初次注册ol原生事件
        if (!isDefined(list) || (isDefined(list) && list.length === 0)) {
            if (isMapTarget) {
                (target as OlMapInstanceType).on(type.replace('map:', '') as unknown as OlMapOnEventType, (e) => {
                    (this.events as Event).emit(type, handleMapOnCallBack(this, type, e))
                });
            } else {
                (target as OlViewInstanceType).on(type.replace('view:', '') as unknown as OlViewOnEventType, (e) => {
                    (this.events as Event).emit(type, handleMapOnCallBack(this, type, e))
                });
            }
        }
        const id = (this.events as Event).on(type, callback)
        return id
    }

    un(id: number): void {
        if (!this._isInitialized('un')) return;
        if (!isDefined(id)) {
            warn_(createMessage('un', '参数不能为空'));
            return;
        }
        if (!isNumber(id)) {
            warn_(createMessage('un', '事件ID应为number类型'));
            return;
        }
        (this.events as Event).remove(id)
    }

    once(type: OMapEventType, callback: () => void): number | string | undefined {
        if (!this._isInitialized('on')) return;
        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('on', '参数不能为空'));
            return;
        }
        let isMapTarget = MapEventTypeIsMap(type)
        const target = (isMapTarget) ? this._map : this._view;
        let list = (this.events as Event).get(type)
        // 初次注册ol原生事件
        if (!isDefined(list) || list.length === 0) {
            if (isMapTarget) {
                (target as OlMapInstanceType).on(type.replace('map:', '') as unknown as OlMapOnEventType, (e) => {
                    (this.events as Event).emit(type, handleMapOnCallBack(this, type, e))
                });
            } else {
                (target as OlViewInstanceType).on(type.replace('view:', '') as unknown as OlViewOnEventType, (e) => {
                    (this.events as Event).emit(type, handleMapOnCallBack(this, type, e))
                });
            }
        }
        const id = (this.events as Event).once(type, callback)
        return id
    }

    /** 属性管理 */

    getProperties(): Record<string, any> | undefined {
        if (!this._isInitialized('getProperties')) return;
        return defaultValue(this._map.getProperties(), {})
    }

    setProperties(properties: Record<string, any>): void {
        if (!this._isInitialized('setProperties')) return;
        if (!isDefined(properties)) {
            warn_(createMessage('setProperties', commonMessage.paramsNotDefined('properties')));
            return;
        }
        if (!isObject(properties)) {
            warn_(createMessage('setProperties', commonMessage.paramsInvaildFormat('properties', 'object类型')));
            return;
        }
        const newProperties = Object.assign({}, defaultValue(this.getProperties(), {}), properties)
        this._map.setProperties(newProperties)
    }

    /** 交互管理 */

    /**
     * 添加交互
     * @param {Interaction} interaction 交互对象
     */
    addInteraction(interaction: Interaction): void {
        let index = this.interactions.findIndex(i => {
            return OlUtil.getUid(i._interaction) === OlUtil.getUid(interaction._interaction)
        })
        if (index !== -1) {
            warn_(createMessage('addInteraction', '该交互已添加到地图中'));
            return;
        }
        // 是否需要额外的图层添加
        if (interaction instanceof Draw || interaction instanceof Measure) {
            const layer = interaction.getLayer();
            if (isDefined<VectorLayer>(layer)) {
                layer.setTarget(interaction);
                this.addLayer(layer);
            }
        }
        if (isDefined(interaction._interaction)) {
            this.interactions.push(interaction)
            this._map?.addInteraction(interaction._interaction)
            if (interaction.setMap) {
                interaction.setMap(this)
            }
            interaction.setActive(true) // 自动开启
        }
    }

    /**
     * 获取所有交互
     * @returns {Interaction[] | undefined} 交互数组
     */
    getInteractions(): Interaction[] | undefined {
        if (!this._isInitialized('getInteractions')) return;
        return this.interactions
    }

    /**
     * 移除交互
     * @param {Interaction} interaction 交互对象
     */
    removeInteraction(interaction: Interaction): void {
        let index = this.interactions.findIndex(i => {
            return OlUtil.getUid(i._interaction) === OlUtil.getUid(interaction._interaction)
        })
        if (index === -1) {
            warn_(createMessage('removeInteraction', '该交互未添加到地图中'));
            return;
        }
        if (isDefined(interaction._interaction)) {
            this.interactions.splice(index, 1)
            this._map?.removeInteraction(interaction._interaction)
            // 是否有额外的图层
            if (interaction instanceof Draw || interaction instanceof Measure) {
                const layer = interaction.getLayer();
                if (isDefined<VectorLayer>(layer)) {
                    this.removeLayer(layer);
                }
            }
            if (interaction.setMap) {
                interaction.setMap(null)
            }
        }
    }

    /**
     * 控件管理
     */

    /**
     * 添加控件
     * @param {Control} control 控件对象
     */
    addControl(control: Control): void {
        if (!this._isInitialized('addControl')) return;
        let index = this.controls.findIndex(i => {
            return OlUtil.getUid(i.getControl()) === OlUtil.getUid(control.getControl())
        })
        if (index !== -1) {
            warn_(createMessage('addControl', '该控件已添加到地图中'));
            return;
        }
        if (isDefined(control.getControl())) {
            this.controls.push(control)
            this._map.addControl(control.getControl())
        }
    }

    /**
     * 获取所有控件
     * @returns {Control[] | undefined} 控件数组
     */
    getControls(): Control[] | undefined {
        if (!this._isInitialized('getControls')) return;
        return this.controls
    }

    /**
     * 根据ID获取控件
     * @param {number | string} id 控件ID
     * @returns {Control | undefined} 控件对象
     */
    getControlById(id: number | string): Control | undefined {
        if (!this._isInitialized('getControlById')) return;
        const target = this.controls.find((item: Control) => {
            return item.getId() === id
        })
        return target
    }

    /**
     * 移除控件
     * @param {Control} control 控件对象
     */
    removeControl(control: Control): void {
        if (!this._isInitialized('removeControl')) return;
        let index = this.controls.findIndex(i => {
            return OlUtil.getUid(i.getControl()) === OlUtil.getUid(control.getControl())
        })
        if (index === -1) {
            warn_(createMessage('removeControl', '该控件未添加到地图中'));
            return;
        }
        if (isDefined(control.getControl())) {
            this.controls.splice(index, 1)
            this._map.removeControl(control.getControl())
        }
    }

    // 弹窗管理

    /**
     * 添加弹窗
     * @param popup 
     */
    addPopup(popup: Popup): void {
        if (!this._isInitialized('addPopup')) return;
        if (!isDefined(popup)) return;
        let index = this.popups.findIndex(i => {
            return OlUtil.getUid(i.getPopup()) === OlUtil.getUid(popup.getPopup())
        })
        if (index !== -1) {
            warn_(createMessage('addPopup', '该弹窗已添加到地图中'));
            return;
        }
        if (isDefined(popup.getPopup())) {
            this.popups.push(popup);
            if (popup.setMap) {
                popup.setMap(this)
            }
            (this._map as OlMapInstanceType).addOverlay(popup.getPopup() as OlPopupInstanceType);
        }
    }

    /**
     * 根据ID获取弹窗
     * @param {number | string} id 弹窗ID
     * @returns {Popup} 弹窗对象
     */
    getPopupById(id: number | string): Popup | undefined {
        if (!this._isInitialized('getPopupById')) return;
        if (!isDefined(id)) {
            warn_(createMessage('getPopupById', '参数不能为空'));
            return;
        }
        if (!isNumber(id) && !isString(id)) {
            warn_(createMessage('getPopupById', '参数必须为数字或字符串'));
            return;
        }
        let popup = this.popups.find((popup: Popup) => {
            return isDefined(popup.getId()) && popup.getId() === id
        })
        return popup
    }

    getPopupByProperties(filter: (properties: Record<string, any>) => boolean): Popup[] | undefined {
        if (!this._isInitialized('getPopupByProperties')) return;
        if (!isDefined(filter)) {
            warn_(createMessage('getPopupById', '参数不能为空'));
            return;
        }
        if (!isFunction(filter)) {
            warn_(createMessage('getPopupById', '参数必须为数字或字符串'));
            return;
        }
        const popups = this.popups.filter((p: Popup) => {
            if (!isDefined(p.getProperties())) return false;
            return filter(p.getProperties() as Record<string, any>)
        })
        return popups
    }

    /**
     * 获取所有弹窗
     * @returns {Popup[]} 弹窗数组
     */
    getPopups(): Popup[] | undefined {
        if (!this._isInitialized('getPopups')) return;
        return this.popups
    }

    /**
     * 删除弹窗
     * @param {Popup} popup 弹窗对象
     */
    removePopup(popup: Popup): void {
        if (!this._isInitialized('removePopup')) return;
        if (!isDefined(popup)) return;
        let index = this.popups.findIndex(i => {
            return OlUtil.getUid(i.getPopup()) === OlUtil.getUid(popup.getPopup())
        })
        if (index == -1) {
            warn_(createMessage('removePopup', '该弹窗未添加到地图中'));
            return;
        }
        if (isDefined(popup.getPopup())) {
            this.popups.splice(index, 1);
            if (popup.setMap) {
                popup.setMap(null)
            }
            (this._map as OlMapInstanceType).removeOverlay(popup.getPopup() as OlPopupInstanceType)
        }
    }

    /** 几何图形计算 */
    getLength(feature: BaseFeature<any>): number | undefined {
        if (!this._isInitialized('getLength')) return;
        let length = OlSphere.getLength((feature.getGeometry() as OlGeomInstanceType), {
            projection: this._map.getView().getProjection()
        })
        return length
    }

    getArea(feature: BaseFeature<any>): number | undefined {
        if (!this._isInitialized('getArea')) return;
        let area = OlSphere.getArea((feature.getGeometry() as OlGeomInstanceType), {
            projection: this._map.getView().getProjection()
        })
        return area
    }

    /**
     * @TODO
     * 遍历地图上指定像素位置的所有特征
     * @param pixel 像素位置
     * @param callback 回调函数
     */
    forEachFeatureAtPixel(pixel: Pixel, callback: (feature: BaseFeature<any> | null, layer: BaseLayer | null) => void, options?: OMapForEachFeatureAtPixelOptionsType): void {
        if (!this._isInitialized('forEachFeatureAtPixel')) return;
        if (!handleGetPixelValue(pixel)) return;
        const params = Object.assign({}, DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS, options)
        const result = this._map.forEachFeatureAtPixel(handleGetPixelValue(pixel) as OlPixelType, (feature: OlFeatureLike, layer: any) => {
            let targetFeature: BaseFeature<any> | null = null
            let targetLayer: BaseLayer | null = null
            this.layers.forEach((item: BaseLayer) => {
                if (OlUtil.getUid(item.getLayer()) === OlUtil.getUid(layer)) {
                    targetLayer = (item as BaseLayer)
                };
                if (item instanceof VectorLayer) {
                    let layerFeatures = defaultValue(item.getFeatures(), [])
                    layerFeatures.forEach((f: BaseFeature<any>) => {
                        if (OlUtil.getUid(feature) === OlUtil.getUid(f.getFeature())) {
                            targetFeature = (f as BaseFeature<any>)
                        }
                    })
                }
            })
            return callback(targetFeature, targetLayer)
        }, {
            ...params,
            layerFilter: (layer: any) => {
                if (!isDefined(params.layerFilter)) return true;
                const targetLayer = this.layers.find((l: BaseLayer) => {
                    return OlUtil.getUid(l) === OlUtil.getUid(layer)
                })
                return isDefined(targetLayer) ? params.layerFilter(targetLayer) : false
            }
        })
        return result
    }

    getCoordinateFromPixel(pixel: OMapPixelType): Lnglat | undefined {
        if (!this._isInitialized('getCoordinateFromPixel')) return;
        if (!handleGetPixelValue(pixel)) return;
        const lnglat = this._map.getCoordinateFromPixel(handleGetPixelValue(pixel) as OlPixelType)
        return new Lnglat(...lnglat)
    }

    getPixelFromCoordinate(coordinate: OMapCoordinateType): Pixel | undefined {
        if (!this._isInitialized('getPixelFromCoordinate')) return;
        if (!handleGetLnglatValue(coordinate)) return;
        const pixel = this._map.getPixelFromCoordinate(handleGetLnglatValue(coordinate) as OlCoordinateType)
        return new Pixel(...pixel)
    }

    getEventCoordinate(event: any): Lnglat | undefined {
        if (!this._isInitialized('getEventCoordinate')) return;
        return new Lnglat(...this._map.getEventCoordinate(event))
    }

    getEventPixel(event: any): Pixel | undefined {
        if (!this._isInitialized('getEventPixel')) return;
        return new Pixel(...this._map.getEventPixel(event))
    }

    getFeaturesAtPixel(pixel: Pixel, options?: OMapForEachFeatureAtPixelOptionsType): BaseFeature<any>[] | undefined {
        if (!this._isInitialized('getFeaturesAtPixel')) return;
        if (!handleGetPixelValue(pixel)) return;
        const params = Object.assign({}, DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS, options)
        let features = this._map.getFeaturesAtPixel(handleGetPixelValue(pixel) as OlPixelType, {
            ...params,
            layerFilter: (layer: any) => {
                if (!isDefined(params.layerFilter)) return true;
                const targetLayer = this.layers.find((l: BaseLayer) => {
                    return OlUtil.getUid(l) === OlUtil.getUid(layer)
                })
                return isDefined(targetLayer) ? params.layerFilter(targetLayer) : false
            }
        })
        let featureIds = features.map((f: OlFeatureLike) => {
            return OlUtil.getUid(f)
        })
        if (!isDefined(features)) return [];
        const targetFeatures: BaseFeature<any>[] = []
        this.layers.forEach((layer: BaseLayer) => {
            if (layer instanceof VectorLayer) {
                let layerFeatures = defaultValue(layer.getFeatures(), [])
                layerFeatures.forEach((f: BaseFeature<any>) => {
                    if (featureIds.includes(OlUtil.getUid(f.getFeature()))) {
                        targetFeatures.push(f)
                    }
                })
            }
        })
        return targetFeatures
    }

    hasFeatureAtPixel(pixel: Pixel, options?: OMapForEachFeatureAtPixelOptionsType): boolean {
        const features = this.getFeaturesAtPixel(pixel, options)
        return (isDefined(features) && features.length > 0)
    }

    render() {
        if (!this._isInitialized('render')) return;
        this._map.render()
    }

    renderSync() {
        if (!this._isInitialized('renderSync')) return;
        this._map.renderSync()
    }

    updateSize() {
        if (!this._isInitialized('updateSize')) return;
        this._map.updateSize()
    }

    /**
     * view 视图相关方法
     */
    adjustCenter(deltaCoordinates: OMapCoordinateType): void {
        if (!this._isInitialized('adjustCenter')) return;
        if (!isDefined(deltaCoordinates)) {
            return;
        }
        this._view.adjustCenter(handleGetLnglatValue(deltaCoordinates) as OlCoordinateType)
    }

    adjustResolution(ratio: number, anchor?: OMapCoordinateType): void {
        if (!this._isInitialized('adjustResolution')) return;
        this._view.adjustResolution(ratio, anchor ? handleGetLnglatValue(anchor) as OlCoordinateType : undefined);
    }

    adjustRotation(delta: number, anchor?: OMapCoordinateType): void {
        if (!this._isInitialized('adjustRotation')) return;
        this._view.adjustRotation(delta, anchor ? handleGetLnglatValue(anchor) as OlCoordinateType : undefined);
    }

    adjustZoom(delta: number, anchor?: OMapCoordinateType): void {
        if (!this._isInitialized('adjustZoom')) return;
        this._view.adjustZoom(delta, anchor ? handleGetLnglatValue(anchor) as OlCoordinateType : undefined);
    }

    animate(options: OMapViewAnimateOptionsType) {
        if (!this._isInitialized('animate')) return;
        let params = Object.assign({}, OMAP_VIEW_ANIMATE_DEFAULT_OPTIONS, {
            center: options.center ? handleGetLnglatValue(options.center) as OlCoordinateType : undefined,
            resolution: options.resolution,
            rotation: options.rotation,
            zoom: options.zoom,
            anchor: options.anchor ? handleGetLnglatValue(options.anchor) as OlCoordinateType : undefined,
            duration: options.duration,
            easing: isDefined(options.easing) ? OMapEasing[options.easing] : undefined,
        })
        this._view.animate(params)
    }

    beginInteraction() {
        if (!this._isInitialized('updateSize')) return;
        this._view.beginInteraction()
    }

    calculateExtent(size: OMapSizeType): Extent | undefined {
        if (!this._isInitialized('calculateExtent')) return;
        this._view.calculateExtent(isDefined(size) ? handleGetSizeValue(size) : undefined)
    }

    cancelAnimations() {
        if (!this._isInitialized('cancelAnimations')) return;
        this._view.cancelAnimations()
    }

    centerOn(coordinate: OMapCoordinateType, size: OMapSizeType, position: OMapPixelType) {
        if (!this._isInitialized('centerOn')) return;
        if(!isDefined(coordinate) || !isDefined(size) || !isDefined(position)) {
            warn_(createMessage('centerOn', commonMessage.paramsListHaveNotDefined('coordinate', 'size', 'position')));
            return;
        }
        this._view.centerOn(
            handleGetLnglatValue(coordinate) as OlCoordinateType,
            handleGetSizeValue(size) as OlSizeType,
            handleGetPixelValue(position) as OlPixelType)
    }

    changed() {
        if (!this._isInitialized('changed')) return;
        this._view.changed()
    }

    endInteraction(duration?: number, resolutionDirection?: number, anchor?: OMapCoordinateType) {
        if (!this._isInitialized('endInteraction')) return;
        this._view.endInteraction(duration, resolutionDirection, handleGetLnglatValue(anchor) as OlCoordinateType)
    }

    fit(featureOrExtent: BaseFeature<any> | Extent, options?: OMapViewFitOptionsType) {
        if (!this._isInitialized('fit')) return;
        if(!(featureOrExtent instanceof BaseFeature || featureOrExtent instanceof Extent)) {
            warn_(createMessage('setProperties', commonMessage.paramsInvaildFormat('featureOrExtent', 'BaseFeature或Extent类型')));
            return;
        }
        let target = featureOrExtent instanceof BaseFeature ? featureOrExtent.getGeometry() : handleGetExtentValue(featureOrExtent as Extent);
        const _options = isDefined(options) ? Object.assign({}, OMAP_VIEW_FIT_DEFAULT_OPTIONS, {
            ...options,
            size: handleGetSizeValue(options.size) as OlSizeType,
            easing: isDefined(options.easing) ? OMapEasing[options.easing] : undefined,
            padding: isDefined(options.padding) ? (isNumber(options.padding) ? [options.padding, options.padding, options.padding, options.padding] : options.padding) : [0, 0, 0, 0]
        }) : {
            ...OMAP_VIEW_FIT_DEFAULT_OPTIONS,
            easing: OMapEasing[OMAP_VIEW_FIT_DEFAULT_OPTIONS.easing],
            padding: [0, 0, 0, 0],
            size: undefined
        };
        this._view.fit(target, _options)
    }

    getAnimating(): boolean | undefined {
        if (!this._isInitialized('updateSize')) return;
        return this._view.getAnimating()
    }

    getInteracting() {
        if (!this._isInitialized('getInteracting')) return;
        return this._view.getInteracting()
    }

    getMaxResolution(): number | undefined {
        if (!this._isInitialized('getMaxResolution')) return;
        return this._view.getMaxResolution()
    }

    getMinResolution(): number | undefined {
        if (!this._isInitialized('getMinResolution')) return;
        return this._view.getMinResolution()
    }

    getMaxZoom(): number | undefined {
        if (!this._isInitialized('getMaxZoom')) return;
        return this._view.getMaxZoom()
    }

    getMinZoom(): number | undefined {
        if (!this._isInitialized('getMinZoom')) return;
        return this._view.getMinZoom()
    }

    getProjection(): Projection | undefined {
        if (!this._isInitialized('getProjection')) return;
        return this.projection
    }
    
    getResolutionForExtent() {

    }

    getResolutionForZoom(zoom: number) {

    }

    getZoomForResolution() {

    }

    getResolutions() {

    }

    setConstrainResolution(enabled: boolean): void {
        if (!this._isInitialized('setConstrainResolution')) return;
        if(!isBoolean(enabled)) {
            warn_(createMessage('setProperties', commonMessage.paramsInvaildFormat('enabled', 'boolean类型')));
            return;
        }
        return this._view.setConstrainResolution(enabled)
    }

    setMaxZoom(maxZoom: number): void {
        if (!this._isInitialized('setMaxZoom')) return;
        this._view.setMaxZoom(maxZoom)
    }

    setMinZoom(minZoom: number): void {
        if (!this._isInitialized('setMinZoom')) return;
        this._view.setMinZoom(minZoom)
    }

}