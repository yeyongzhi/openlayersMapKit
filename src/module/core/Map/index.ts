import { isDefined, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import OlPackage from '../../../source/index'
import  type { MapContainerType, MapOptionsType, BaseLayerIdType, OlMapInstanceType } from '../../../utils/index';
import { Lnglat } from '../../basic/index';

import BaseLayer from '../../layer/BaseLayer/index'

console.log(OlPackage)

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

const defaultOptions: MapOptionsType = {
    center: [120.2, 30.3], // 中心点坐标
    zoom: 8, // 初始缩放级别
    layers: [], // 图层
    controls: [], // 控件
    interactions: [], // 交互
    overlays: [], // 覆盖物
}

export default class Map {

    _map: OlMapInstanceType | null = null;
    _view: InstanceType<typeof OlPackage.View> | null = null;
    layers: Array<BaseLayer> = [];

    constructor(element: MapContainerType, options?: MapOptionsType) {
        let _options = options || defaultOptions;
        const view = new OlPackage.View({
            center: (_options.center instanceof Lnglat) ? _options.center._lnglat : _options.center, // 中心点坐标
            zoom: _options.zoom,
        })
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
        if(!isDefined(layer)) {
            warn_(createMessage('addLayer', '图层对象不能为空'));
            return;
        }
        const layerId = layer.getId();
        if(!isDefined(layerId)) {
            warn_(createMessage('addLayer', '图层id不能为空'));
            return;
        }
        let isExist = this.getLayerById(layerId)
        if(isExist) {
            warn_(createMessage('addLayer', '图层已存在'));
            return;
        }
        this.layers.push(layer);
        (this._map as OlMapInstanceType).addLayer(layer._layer); // 添加图层到地图中
    }

    addLayers(layers: Array<BaseLayer>) {
        
    }

    getLayerById(id: BaseLayerIdType) {
        if(!isDefined(id)) {
            warn_(createMessage('getLayerById', '图层id不能为空'));
            return undefined;
        }
        const layer = this.layers.find(layer => {
            return isDefined(layer.getId()) && layer.getId() === id
        });
        return layer
    }

}