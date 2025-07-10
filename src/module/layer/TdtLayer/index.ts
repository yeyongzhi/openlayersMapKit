import { isDefined, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { BaseLayerOptionsType } from '../../../utils/index'
import OlPackage, { OlLayer, OlSource } from '../../../source/index'
import BaseLayer from '../BaseLayer'
import TileLayer from '../TileLayer/index'
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

export type TdtLayerTypeEnum = 'vec' | 'img' | 'ter' | 'cva' | 'cia' | 'cta'
/**
 * w: 球面墨卡托投影
 * c: 经纬度投影
 */
export type TdtLayerProjTypeEnum = 'w' | 'c'

export default class TdtLayer extends BaseLayer {
    /**
     * 图层类型
     */
    tdtType: TdtLayerTypeEnum | null = null;

    constructor(type: TdtLayerTypeEnum, options?: BaseLayerOptionsType) {
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
        this._layer = new OlLayer.Tile({
            // TODO 这里不一定是XYZ
            source: new OlSource.XYZ({
                url: TdtLayerTypeUrls[type]
            })
        })
        this._initLayerEvent()
    }
}