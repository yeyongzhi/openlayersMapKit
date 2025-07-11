import { isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import OlPackage from '../../../source/index'
import type { MapContainerType, BaseLayerIdType, OlMapInstanceType, OlMapOptionsFinalType, OlProjInstanceType, OlViewInstanceType, IdType, OlCoordinateType } from '../../../utils/index';
import { Lnglat, Extent } from '../../basic/index';
import { Projection, LayerGroup } from '../../../index'
import BaseLayer from '../../layer/BaseLayer/index'
import { Event } from '../../../index'

const PACKAGE_NAME = 'Map';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 地图类
 * @class
 * @classdesc 核心地图类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/5
 * @updateDate 2025/7/7
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


export default class Map {

    _map: OlMapInstanceType | null = null;
    _view: OlViewInstanceType | null = null;
    layers: Array<BaseLayer> = [];

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
    }

    private _isInitialized(method: string): boolean {
        if (!isDefined(this._map) || !isDefined(this._view)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    // 地图信息相关
    getCenter(): Lnglat | undefined {
        if (!this._isInitialized('getCenter')) return;
        let center = (this._view as OlViewInstanceType).getCenter()
        return new Lnglat(...center as OlCoordinateType);
    }

    setCenter(center: Lnglat | OlCoordinateType): void {
        if (!this._isInitialized('setCenter')) return;
        if (!isDefined(center)) {
            warn_(createMessage('setCenter', '参数center不能为空'));
            return;
        }
        let _center = center instanceof Lnglat ? center._lnglat : center;
        (this._view as OlViewInstanceType).setCenter(_center)
    }

    getZoom(): number | undefined {
        if (!this._isInitialized('getZoom')) return;
        return (this._view as OlViewInstanceType).getZoom();
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
        (this._view as OlViewInstanceType).setZoom(zoom)
    }

    zoomIn(delta: number = 1): void {
        if (!this._isInitialized('zoomIn')) return;
        if (isDefined(delta) && !isNumber(delta)) {
            warn_(createMessage('zoomIn', '参数delta必须为number类型'));
            return;
        }
        (this._view as OlViewInstanceType).adjustZoom(delta)
    }

    zoomOut(delta: number = -1) {
        if (!this._isInitialized('zoomIn')) return;
        if (isDefined(delta) && !isNumber(delta)) {
            warn_(createMessage('zoomIn', '参数delta必须为number类型'));
            return;
        }
        (this._view as OlViewInstanceType).adjustZoom(delta)
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
                this.layers.push(item);
                (this._map as OlMapInstanceType).addLayer(item._layer);
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
        this.layers.push(layer);
        (this._map as OlMapInstanceType).addLayer(layer._layer); // 添加图层到地图中
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
            if (item instanceof LayerGroup) {
                (item as LayerGroup).getAll().forEach((layerItem) => {
                    if (isDefined(layerItem.getId()) && layerItem.getId() === id) {
                        layer = layerItem
                    }
                })
            }
            if (item instanceof BaseLayer) {
                if (isDefined((item as BaseLayer).getId()) && (item as BaseLayer).getId() === id) {
                    layer = item
                }
            }
        });
        return layer
    }

    removeLayer() { }

    removeLayers() { }

    removeLayerById() { }

    getAllLayers() { }

    // 事件管理
    on() {

    }

    un() {

    }

    once() {

    }

}