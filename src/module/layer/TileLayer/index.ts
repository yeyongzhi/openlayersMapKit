import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import {
  type OMapTileLayerParamsType,
  DEFAULT_TILE_LAYER_PARAMS,
  type OMapTileLayerType
} from './type'
import { handleGetBaseLayerParams } from '../BaseLayer/type'

/**
 * 瓦片图层类
 * @class
 * @classdesc 基础的瓦片地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/9
 * @updateDate 2026/5/7
 */

export default class TileLayer extends BaseLayer<OMapTileLayerType> {
  constructor(options: OMapTileLayerParamsType) {
    super('Tile', options)
    let params = Object.assign({}, DEFAULT_TILE_LAYER_PARAMS, handleGetBaseLayerParams(options))
    this._layer = new OlLayer.Tile(params)
    this._initLayerEvent()
  }
}
