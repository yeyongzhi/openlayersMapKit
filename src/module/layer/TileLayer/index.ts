import { isDefined, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { BaseTileLayerOptions } from '../../../utils/index'
import OlPackage, { OlLayer, OlSource } from '../../../source/index'
import BaseLayer from '../BaseLayer'

/**
 * 瓦片图层类
 * @class
 * @classdesc 基础的瓦片地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/9
 * @updateDate 2025/7/9
 */

export default class TileLayer extends BaseLayer {

    constructor(tileOptions: any) {
        super('Tile', tileOptions)
        this._initLayerEvent()
    }
}