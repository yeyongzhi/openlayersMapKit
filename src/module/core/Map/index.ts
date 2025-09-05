import { isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import OlPackage, { OlUtil } from '../../../source/index'
import type {
    MapContainerType,
    BaseLayerIdType,
    OlMapInstanceType,
    OlMapOptionsFinalType,
    OlProjInstanceType,
    OlViewInstanceType,
    IdType,
    OlCoordinateType,
    OlSizeType,
    OMapEventType,
    OMapEventCallBack,
    OlMapOnEventType,
    OlViewOnEventType
} from '../../../utils/index';
import { Lnglat, Extent, Size } from '../../basic/index';
import { Projection, LayerGroup, VectorLayer } from '../../../index'
import BaseLayer from '../../layer/BaseLayer/index'
import Interaction from '../../interaction/Interaction/index'
import Draw from '../../interaction/Draw/index'
import Measure from '../../interaction/Measure/index'
import Event from '../../../module/util/Event/index'
import Popup from '../../basic/Popup/index'

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
 * @updateDate 2025/7/14
 */

// const defaultOptions: MapOptionsType = {
//     center: [120.2, 30.3], // 中心点坐标
//     zoom: 8, // 初始缩放级别
//     layers: [], // 图层
//     controls: [], // 控件
//     interactions: [], // 交互
//     overlays: [], // 覆盖物
// }

interface MapLayersItemType {
    type: 'BaseLayer' | 'LayerGroup';
    layer: BaseLayer;
    groupId?: IdType;
}

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
    layers: Array<BaseLayer> = [];
    interactions: Array<Interaction> = [];
    events: Event | null = null;
    popups: Array<Popup> = [];

    constructor(element: MapContainerType, options: OlMapOptionsFinalType) {
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
        const view_params = {
            ...view_options,
            center: (view_options.center instanceof Lnglat) ? view_options.center._lnglat : view_options.center, // 中心点坐标
            extent: (view_options.extent instanceof Extent) ? view_options.extent._extent : view_options.extent,
            projection: (proj as Projection)._projection as OlProjInstanceType
        }
        const view = new OlPackage.View(view_params)
        const map = new OlPackage.Map({
            target: element,
            view
        });
        this._view = view;
        this._map = map;
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

    // 图层管理相关

    addLayer(layer: BaseLayer | LayerGroup) {
        if (!this._isInitialized('addLayer')) return;
        if (!isDefined(layer)) {
            warn_(createMessage('addLayer', '图层对象不能为空'));
            return;
        }
        if (layer instanceof LayerGroup) {
            let groudId = layer.getId()
            layer.getAll().forEach((item) => {
                if (item._layer) {
                    this.layers.push(item);
                    this._map.addLayer(item._layer);
                }
            })
            return false
        }
        const layerId = layer.getId();
        if (isDefined(layerId)) {
            let isExist = this.getLayerById(layerId)
            if (isExist) {
                warn_(createMessage('addLayer', '图层已存在'));
                return;
            }
        }
        if (isDefined(layer._layer)) {
            this.layers.push(layer);
            if(layer instanceof BaseLayer) {
                if(!isDefined(layer.getTarget())) {
                    layer.setTarget(this)
                }
            }
            this._map.addLayer(layer._layer); // 添加图层到地图中
        }
    }

    addLayers(layers: Array<BaseLayer>) {

    }

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

    getAllLayers(): BaseLayer[] {
        if (!this._isInitialized('getAllLayers')) return [];
        return this.layers
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

    // 属性管理
    getProperties(): Record<string, any> | undefined {
        if (!this._isInitialized('getProperties')) return;
        return this._map.getProperties() || {}
    }

    setProperties(properties: Record<string, any>): void {
        if (!this._isInitialized('setProperties')) return;
        if (!isDefined(properties)) {
            warn_(createMessage('setProperties', '参数不能为空'));
            return;
        }
        this._map.setProperties(properties)
    }

    /** 交互管理 */

    /**
     * 添加交互
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
            if(interaction.setMap) {
                interaction.setMap(this)
            }
            interaction.setActive(true) // 自动开启
        }
    }

    getInteraction() {

    }

    removeInteraction() {

    }

    // 弹窗管理

    /**
     * 添加弹窗
     * @param popup 
     * @returns 
     */
    addPopup(popup: Popup) {
        if (!this._isInitialized('addPopup')) return;
        let index = this.popups.findIndex(i => {
            return OlUtil.getUid(i._popup) === OlUtil.getUid(popup._popup)
        })
        if (index !== -1) {
            warn_(createMessage('addPopup', '该弹窗已添加到地图中'));
            return;
        }
        if (isDefined(popup._popup)) {
            this.popups.push(popup);
            (this._map as OlMapInstanceType).addOverlay(popup._popup)
        }
    }

    removePopup() {
        
    }

}