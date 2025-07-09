import { isDefined, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { BaseTileLayerOptions } from '../../../utils/index'
import OlPackage, { OlLayer, OlSource } from '../../../source/index'
import BaseLayer from '../BaseLayer'
import LayerGroup from '../LayerGroup';
import { TdtLayerTypeUrls } from './layerSource'
import { MapToken } from '../../util/index'

let PACKAGE_NAME = 'TdtLayer';
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 天地图服务类
 * @class
 * @classdesc 快捷使用天地图相关的开发地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/8
 * @updateDate 2025/7/8
 */

export type TdtLayerTypeEnum = 'vec' | 'img' | 'ter'
/**
 * w: 球面墨卡托投影
 * c: 经纬度投影
 */
export type TdtLayerProjTypeEnum = 'w' | 'c'

export default class GaodeLayer extends BaseLayer {
    /**
     * 图层类型
     */
    tdtType: TdtLayerTypeEnum | null = null;

    constructor(type: TdtLayerTypeEnum, options?: BaseTileLayerOptions) {
        super('Tdt', options);
        if (!isDefined(MapToken.tdt)) {
            error_(createMessage('constructor', '缺少天地图key，请提前申明'))
            return;
        }
        if (!isDefined(type)) {
            error_(createMessage('constructor', '缺少参数天地图图层类型'))
            return;
        }
        let _options = options || {};
        this.tdtType = type;
        this._layer = new LayerGroup([
            // TODO
        ])
        this._initLayerEvent()
    }
}