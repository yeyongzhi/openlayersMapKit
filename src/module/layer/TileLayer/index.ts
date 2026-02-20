import { defaultValue, isDefined, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage, commonMessage } from '../../../utils/message'
import OlPackage, { OlLayer, OlSource } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import {
    type OMapTileLayerParamsType,
    DEFAULT_TILE_LAYER_PARAMS,
    type OMapTileLayerType
} from './type'
import { handleGetBaseLayerParams } from '../BaseLayer/type'

let PACKAGE_NAME = 'TileLayer';
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 瓦片图层类
 * @class
 * @classdesc 基础的瓦片地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/9
 * @updateDate 2025/10/1
 */

export default class TileLayer extends BaseLayer<OMapTileLayerType> {

    constructor(options: OMapTileLayerParamsType) {
        super('Tile', options)
        let params = Object.assign({}, DEFAULT_TILE_LAYER_PARAMS, handleGetBaseLayerParams(options))
        console.log("TileLayer params:")
        console.log(params)
        this._layer = new OlLayer.Tile(params)
        this._initLayerEvent()
    }
}