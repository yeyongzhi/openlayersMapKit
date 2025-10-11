import { defaultValue, isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { LayerGroupIdType } from './type'
import BaseLayer from '../BaseLayer'
import Map from '../../core/Map/index'
import { OlUtil } from '../../../source/index'
import { layerState } from '../BaseLayer/layerState'

let PACKAGE_NAME = 'LayerGroup';
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * @class LayerGroup
 * @classdesc 更便捷的管理多个图层
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/9
 * @updateDate 2025/10/11
 */

export default class LayerGroup {

    /**
     * 图层组id
     * @type {IdType}
     */
    id: LayerGroupIdType | null = null;
    layers: BaseLayer[] = []
    map: Map | null = null;

    constructor(layers: BaseLayer[]);
    /**
     * 图层组构造函数
     * @param {LayerGroupIdType} id 图层组id，最好是填一个
     * @param layers 图层数组
     */
    constructor(id: LayerGroupIdType | null, layers: BaseLayer[]);

    constructor(idOrLayers: LayerGroupIdType | null | BaseLayer[], layers?: BaseLayer[]) {
        if(!isDefined(idOrLayers)) {
            error_(createMessage('constructor', '参数不能为空'));
            return;
        }
        let _layers: BaseLayer[] = defaultValue(layers, []);
        if(isNumber(idOrLayers) || isString(idOrLayers)) {
            this.id = idOrLayers as LayerGroupIdType;
        } else {
            _layers = idOrLayers as BaseLayer[];
        }
        console.log(_layers)
        const vaildLayers = _layers.filter((item: BaseLayer) => {
            return isDefined(item) && isDefined(item.getLayer()) && (item instanceof BaseLayer)
        })
        if(vaildLayers.length !== _layers.length) {
            warn_(createMessage('constructor', '图层参数错误，必须为BaseLayer实例，已进行过滤'));
        }
        // 初始化图层状态
        vaildLayers.forEach((item: BaseLayer) => {
            layerState.set(item, {
                groupId: this.id
            })
        })
        this.layers = vaildLayers;
        vaildLayers.forEach((item: BaseLayer) => {
            layerState.set(item, {
                groupId: this.id
            })
        })
    }

    /**
     * 添加图层
     * @param {BaseLayer} layer 图层实例
     */
    add(layer: BaseLayer): void {
        if(!isDefined(layer)) {
            warn_(createMessage('add', '参数layer不能为空'));
            return;
        }
        if(!(layer instanceof BaseLayer)) {
            warn_(createMessage('add', '参数layer必须为BaseLayer实例'));
            return;
        }
        let isExits: boolean = this.layers.some((item: BaseLayer) => {
            return OlUtil.getUid(item.getLayer()) === OlUtil.getUid(layer.getLayer());
        })
        if(isExits) {
            warn_(createMessage('add', '图层已存在'));
            return;
        }
        this.layers.push(layer);
        layerState.set(layer, {
            groupId: this.id
        })
        if(isDefined(this.map)) {
            this.map.addLayer(layer);
        }
    }

    remove(layer: BaseLayer): void {
        if(!isDefined(layer)) {
            warn_(createMessage('add', '参数layer不能为空'));
            return;
        }
        if(!(layer instanceof BaseLayer)) {
            warn_(createMessage('add', '参数layer必须为BaseLayer实例'));
            return;
        }
        let index: number = this.layers.findIndex((item: BaseLayer) => {
            return OlUtil.getUid(item.getLayer()) === OlUtil.getUid(layer.getLayer());
        })
        if(index === -1) {
            warn_(createMessage('remove', '图层不存在'));
            return;
        }
        this.layers.splice(index, 1)
        layerState.set(layer, {
            groupId: null
        })
        if(isDefined(this.map)) {
            this.map.removeLayer(layer);
        }
    }

    removeById(id: LayerGroupIdType) {
        if(!isDefined(id)) {
            warn_(createMessage('removeById', '参数id不能为空'));
            return;
        }
        let index = this.layers.findIndex((item: BaseLayer) => {
            return isDefined(item.getId()) && (item.getId() === id);
        })
        if(index === -1) {
            warn_(createMessage('remove', '图层不存在'));
            return;
        }
        let layer = this.layers[index];
        layerState.set(layer, {
            groupId: null
        })
        if(isDefined(this.map)) {
            this.map.removeLayer(layer);
        }
        this.layers.splice(index, 1)
    }

    clear() {
        if(isDefined(this.map)) {
            this.map.removeLayers(this.layers);
        }
        setTimeout(() => {
            this.layers = [];
        }, 300)
    }

    getAllLayers(): BaseLayer[] {
        return this.layers;
    }

    getAll(): BaseLayer[] {
        return this.layers;
    }

    getId(): LayerGroupIdType | null {
        return this.id;
    }

    setMap(map: Map | null) {
        this.map = map;
    }

}