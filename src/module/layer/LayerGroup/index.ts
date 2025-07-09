import { isDefined, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { OlAllLayerInstanceType } from '../../../utils/index'
import BaseLayer from '../BaseLayer'

let PACKAGE_NAME = 'LayerGroup';
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 图层组合类
 * @class
 * @classdesc 更便捷的管理多个图层
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/9
 * @updateDate 2025/7/9
 */

export default class LayerGroup {

    layers: BaseLayer[] = []

    constructor(layers: BaseLayer[]) {
        if(!isDefined(layers)) {
            error_(createMessage('constructor', '参数不能为空'));
            return;
        }
        this.layers = layers;
    }

    add(layer: BaseLayer): void {
        if(!isDefined(layer)) {
            error_(createMessage('add', '图层不能为空'));
            return;
        }
        let layerId = layer.getId()
        if(isDefined(layerId)) {
            let isHave = this.layers.find(item => {
                return item.getId() && (item.getId() === layerId)
            })
            if(isHave) {
                warn_(createMessage('add', '图层已存在'));
                return;
            }
        }
        this.layers.push(layer)
    }

    remove(layer: BaseLayer | number): void {
        if(isNumber(layer)) {
            this.layers.splice(layer, 1);
            return;
        }
        let layerId = layer.getId()
        if(isDefined(layerId)) {
            let isHave = this.layers.find(item => {
                return item.getId() && (item.getId() === layerId)
            })
            if(isHave) {
                this.layers.splice(this.layers.indexOf(isHave), 1);
            }
        } else {
            this.layers.splice(this.layers.indexOf(layer), 1);
        }
    }

    clear() {
        this.layers = [];
    }

}