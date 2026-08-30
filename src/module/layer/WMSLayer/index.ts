import { isDefined } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/index'
import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetColorValue } from '../../basic/Color/handle'
import TileWMSSource from '../../source/TileSource/subClass/TileWMSSource/index'
import {
  type OMapWMSLayerParamsType,
  DEFAULT_WMS_LAYER_PARAMS,
  DEFAULT_WMS_LAYER_SOURCE_PARAMS
} from './type'
import type { OMapTileWMSSourceParamsType } from '../../source/TileSource/subClass/TileWMSSource/type'
import { type BaseLayerPropertiesType, type OMapBaseLayerCommonType } from '../BaseLayer/type'

let PACKAGE_NAME = 'WMSLayer'
let createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * WMS图层类
 * @class WMSLayer
 * @classdesc 基础的WMS地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/2
 * @updateDate 2025/10/2
 */

export default class WMSLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapBaseLayerCommonType, P> {
  /** 收窄基类的包装类型：WMS 图层的数据源一定是 TileWMS 数据源。 */
  declare protected _sourceWrapper: TileWMSSource | null

  constructor(options?: OMapWMSLayerParamsType<P>) {
    const _options: OMapWMSLayerParamsType<P> = Object.assign({}, DEFAULT_WMS_LAYER_PARAMS, options)
    super('WMS', _options)
    if (!isDefined(_options.source)) {
      error_(createMessage('constructor', 'source参数是必须的'))
      return
    }
    let _layerParams = Object.assign({}, _options, {
      source: undefined,
      map: undefined
    })
    let _sourceParams = Object.assign({}, DEFAULT_WMS_LAYER_SOURCE_PARAMS, {
      ..._options.source
    })
    let wmsSource = new TileWMSSource(_sourceParams as OMapTileWMSSourceParamsType)
    // 登记 OMap 数据源包装，供 getWMSSource() / getSourceWrapper() 取回。
    this._sourceWrapper = wmsSource
    let _source = wmsSource.getSource()
    this._layer = new OlLayer.Tile({
      ..._layerParams,
      extent: isDefined(_layerParams.extent)
        ? handleGetExtentValue(_layerParams.extent)
        : undefined,
      background: isDefined(_layerParams.background)
        ? handleGetColorValue(_layerParams.background)
        : undefined,
      source: _source
    })
    this._initLayerEvent()
  }

  /**
   * 获取图层关联的 OMap TileWMS 数据源包装。
   * @returns {TileWMSSource | null} OMap TileWMS 数据源包装
   */
  getWMSSource(): TileWMSSource | null {
    return this._sourceWrapper
  }
}
