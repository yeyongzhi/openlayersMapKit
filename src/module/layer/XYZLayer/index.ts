import { isDefined } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/index'
import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetColorValue } from '../../basic/Color/handle'
import XYZSource from '../../source/TileSource/subClass/XYZ/index'
import {
  type OMapXYZLayerParamsType,
  DEFAULT_XYZ_LAYER_PARAMS,
  DEFAULT_XYZ_LAYER_SOURCE_PARAMS
} from './type'
import { type BaseLayerPropertiesType, type OMapBaseLayerCommonType } from '../BaseLayer/type'
import type { OMapXYZSourceParamsType } from '../../source/TileSource/subClass/XYZ/type'

let PACKAGE_NAME = 'XYZLayer'
let createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 瓦片图层类
 * @class XYZLayer
 * @classdesc 基础的XYZ瓦片地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/2
 * @updateDate 2025/10/2
 */

export default class XYZLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapBaseLayerCommonType, P> {
  /** 收窄基类的包装类型：XYZ 图层的数据源一定是 XYZ 数据源。 */
  declare protected _sourceWrapper: XYZSource | null

  constructor(options?: OMapXYZLayerParamsType<P>) {
    const _options: OMapXYZLayerParamsType<P> = Object.assign({}, DEFAULT_XYZ_LAYER_PARAMS, options)
    super('XYZ', _options)
    if (!isDefined(_options.source)) {
      error_(createMessage('constructor', 'source参数是必须的'))
      return
    }
    let _layerParams = Object.assign({}, _options, {
      source: undefined,
      map: undefined
    })
    let _sourceParams = Object.assign({}, DEFAULT_XYZ_LAYER_SOURCE_PARAMS, {
      ..._options.source
    })
    let xyzSource = new XYZSource(_sourceParams as OMapXYZSourceParamsType)
    // 登记 OMap 数据源包装，供 getXYZSource() / getSourceWrapper() 取回；
    // 此前包装在取出原生实例后即被丢弃。
    this._sourceWrapper = xyzSource
    let _source = xyzSource.getSource()
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
   * 获取图层关联的 OMap XYZ 数据源包装。
   * @returns {XYZSource | null} OMap XYZ 数据源包装
   */
  getXYZSource(): XYZSource | null {
    return this._sourceWrapper
  }
}
