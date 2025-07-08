import { isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import OlPackage from '../../../source/index'
import type { MapContainerType, BaseLayerIdType, OlMapInstanceType, OlMapOptionsFinalType, OlProjInstanceType } from '../../../utils/index';
import { Lnglat, Extent } from '../../basic/index';
import { Projection } from '../index'
import BaseLayer from '../../layer/BaseLayer/index'

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


export default class Map {

    _map: OlMapInstanceType | null = null;
    _view: InstanceType<typeof OlPackage.View> | null = null;
    layers: Array<BaseLayer> = [];

    constructor(element: MapContainerType, options: OlMapOptionsFinalType) {
        let _options = options
        const view_options = _options.view
        if(!isDefined(view_options)) {
            error_(createMessage('constructor', 'view参数不能为空'));
            return;
        }
        let proj: Projection | string = view_options.projection || new Projection('EPSG:3857'); // 默认为3857
        if(isString(proj)) {
            proj = new Projection(proj as string)
        }
        const view_params = {
            ...view_options,
            center: (view_options.center instanceof Lnglat) ? view_options.center._lnglat : view_options.center, // 中心点坐标
            extent: (view_options.extent instanceof Extent)? view_options.extent._extent : view_options.extent,
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

    addLayer(layer: BaseLayer) {
        if (!this._isInitialized('addLayer')) return;
        if (!isDefined(layer)) {
            warn_(createMessage('addLayer', '图层对象不能为空'));
            return;
        }
        const layerId = layer.getId();
        if (!isDefined(layerId)) {
            warn_(createMessage('addLayer', '图层id不能为空'));
            return;
        }
        let isExist = this.getLayerById(layerId)
        if (isExist) {
            warn_(createMessage('addLayer', '图层已存在'));
            return;
        }
        this.layers.push(layer);
        (this._map as OlMapInstanceType).addLayer(layer._layer); // 添加图层到地图中
    }

    addLayers(layers: Array<BaseLayer>) {

    }

    getLayerById(id: BaseLayerIdType) {
        if (!isDefined(id)) {
            warn_(createMessage('getLayerById', '图层id不能为空'));
            return undefined;
        }
        const layer = this.layers.find(layer => {
            return isDefined(layer.getId()) && layer.getId() === id
        });
        return layer
    }

}