import { defaultValue, isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { LayerGroupIdType } from './type'
import BaseLayer from '../BaseLayer'
import Map from '../../core/Map/index'
import { OlUtil } from '../../../source/index'
import type { OMapBaseLayerCommonType } from '../BaseLayer/type'

type LayerGroupLayer = BaseLayer<OMapBaseLayerCommonType>

let PACKAGE_NAME = 'LayerGroup';
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * @class LayerGroup
 * @classdesc OMap 业务图层组，用于批量管理多个 BaseLayer；不是 ol/layer/Group 的原生封装。
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
    layers: LayerGroupLayer[] = []
    map: Map | null = null;

    constructor(layers: LayerGroupLayer[]);
    /**
     * 图层组构造函数
     * @param {LayerGroupIdType} id 图层组id，最好是填一个
     * @param layers 图层数组
     */
    constructor(id: LayerGroupIdType | null, layers: LayerGroupLayer[]);

    constructor(idOrLayers: LayerGroupIdType | null | LayerGroupLayer[], layers?: LayerGroupLayer[]) {
        if(!isDefined(idOrLayers)) {
            error_(createMessage('constructor', '参数不能为空'));
            return;
        }
        let _layers: LayerGroupLayer[] = defaultValue(layers, []);
        if(isNumber(idOrLayers) || isString(idOrLayers)) {
            this.id = idOrLayers as LayerGroupIdType;
        } else {
            _layers = idOrLayers as LayerGroupLayer[];
        }
        const vaildLayers = _layers.filter((item: LayerGroupLayer) => {
            return isDefined(item) && isDefined(item.getLayer()) && (item instanceof BaseLayer)
        })
        if(vaildLayers.length !== _layers.length) {
            warn_(createMessage('constructor', '图层参数错误，必须为BaseLayer实例，已进行过滤'));
        }
        this.layers = vaildLayers;
        vaildLayers.forEach((item: LayerGroupLayer) => {
            item.groupId = this.id
        })
    }

    /**
     * 添加图层
     * @param {BaseLayer} layer 图层实例
     */
    add(layer: LayerGroupLayer): void {
        if(!isDefined(layer)) {
            warn_(createMessage('add', '参数layer不能为空'));
            return;
        }
        if(!(layer instanceof BaseLayer)) {
            warn_(createMessage('add', '参数layer必须为BaseLayer实例'));
            return;
        }
        let isExits: boolean = this.layers.some((item: LayerGroupLayer) => {
            return OlUtil.getUid(item.getLayer()) === OlUtil.getUid(layer.getLayer());
        })
        if(isExits) {
            warn_(createMessage('add', '图层已存在'));
            return;
        }
        this.layers.push(layer);
        layer.groupId = this.id
        if(isDefined(this.map)) {
            this.map.addLayer(layer);
        }
    }

    remove(layer: LayerGroupLayer): void {
        if(!isDefined(layer)) {
            warn_(createMessage('remove', '参数layer不能为空'));
            return;
        }
        if(!(layer instanceof BaseLayer)) {
            warn_(createMessage('remove', '参数layer必须为BaseLayer实例'));
            return;
        }
        let index: number = this.layers.findIndex((item: LayerGroupLayer) => {
            return OlUtil.getUid(item.getLayer()) === OlUtil.getUid(layer.getLayer());
        })
        if(index === -1) {
            warn_(createMessage('remove', '图层不存在'));
            return;
        }
        this.layers.splice(index, 1)
        layer.groupId = null
        if(isDefined(this.map)) {
            this.map.removeLayer(layer);
        }
    }

    removeById(id: LayerGroupIdType) {
        if(!isDefined(id)) {
            warn_(createMessage('removeById', '参数id不能为空'));
            return;
        }
        let index = this.layers.findIndex((item: LayerGroupLayer) => {
            return isDefined(item.getId()) && (item.getId() === id);
        })
        if(index === -1) {
            warn_(createMessage('remove', '图层不存在'));
            return;
        }
        let layer = this.layers[index];
        layer.groupId = null
        if(isDefined(this.map)) {
            this.map.removeLayer(layer);
        }
        this.layers.splice(index, 1)
    }

    clear() {
        if(isDefined(this.map)) {
            this.map.removeLayers(this.layers);
        }
        this.layers.forEach((layer) => {
            layer.groupId = null
        })
        this.layers = [];
    }

    getAllLayers(): LayerGroupLayer[] {
        return this.layers;
    }

    getAll(): LayerGroupLayer[] {
        return this.layers;
    }

    getId(): LayerGroupIdType | null {
        return this.id;
    }

    setMap(map: Map | null) {
        this.map = map;
    }

}
