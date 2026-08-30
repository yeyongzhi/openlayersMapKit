import { isDefined } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/index'
import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetColorValue } from '../../basic/Color/handle'
import WMTSSource from '../../source/TileSource/subClass/WMTSSource/index'
import {
  type OMapWMTSLayerParamsType,
  DEFAULT_WMTS_LAYER_PARAMS,
  DEFAULT_WMTS_LAYER_SOURCE_PARAMS
} from './type'
import type { OMapWMTSSourceParamsType } from '../../source/TileSource/subClass/WMTSSource/type'
import { type BaseLayerPropertiesType, type OMapBaseLayerCommonType } from '../BaseLayer/type'

let PACKAGE_NAME = 'WMTSLayer'
let createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * WMTS图层类
 * @class WMTSLayer
 * @classdesc 基础的WMTS地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/2
 * @updateDate 2025/10/2
 */

export default class WMTSLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapBaseLayerCommonType, P> {
  /** 收窄基类的包装类型：WMTS 图层的数据源一定是 WMTS 数据源。 */
  declare protected _sourceWrapper: WMTSSource | null

  constructor(options?: OMapWMTSLayerParamsType<P>) {
    const _options: OMapWMTSLayerParamsType<P> = Object.assign(
      {},
      DEFAULT_WMTS_LAYER_PARAMS,
      options
    )
    super('WMTS', _options)
    if (!isDefined(_options.source)) {
      error_(createMessage('constructor', 'source参数是必须的'))
      return
    }
    let _layerParams = Object.assign({}, _options, {
      source: undefined,
      map: undefined
    })
    let _sourceParams = Object.assign({}, DEFAULT_WMTS_LAYER_SOURCE_PARAMS, {
      ..._options.source
    })
    let wmtsSource = new WMTSSource(_sourceParams as OMapWMTSSourceParamsType)
    // 登记 OMap 数据源包装，供 getWMTSSource() / getSourceWrapper() 取回。
    this._sourceWrapper = wmtsSource
    let _source = wmtsSource.getSource()
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
   * 获取图层关联的 OMap WMTS 数据源包装。
   * @returns {WMTSSource | null} OMap WMTS 数据源包装
   */
  getWMTSSource(): WMTSSource | null {
    return this._sourceWrapper
  }
}
