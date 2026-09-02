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

const PACKAGE_NAME = 'XYZLayer'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 瓦片图层类
 *
 */

export default class XYZLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapBaseLayerCommonType, P> {
  /** 收窄基类的包装类型：XYZ 图层的数据源一定是 XYZ 数据源。 */
  declare protected nativeSourceWrapper: XYZSource | null

  constructor(options?: OMapXYZLayerParamsType<P>) {
    const resolvedOptions: OMapXYZLayerParamsType<P> = Object.assign(
      {},
      DEFAULT_XYZ_LAYER_PARAMS,
      options
    )
    super('XYZ', resolvedOptions)
    if (!isDefined(resolvedOptions.source)) {
      error_(createMessage('constructor', 'source参数是必须的'))
      return
    }
    const layerParams = Object.assign({}, resolvedOptions, {
      source: undefined,
      map: undefined
    })
    const sourceParams = Object.assign({}, DEFAULT_XYZ_LAYER_SOURCE_PARAMS, {
      ...resolvedOptions.source
    })
    const xyzSource = new XYZSource(sourceParams as OMapXYZSourceParamsType)
    // 登记 OMap 数据源包装，供 getXYZSource() / getSourceWrapper() 取回；
    // 此前包装在取出原生实例后即被丢弃。
    this._sourceWrapper = xyzSource
    this.ownsSourceWrapper = true
    const nativeSource = xyzSource.getSource()
    this._layer = new OlLayer.Tile({
      ...layerParams,
      extent: isDefined(layerParams.extent) ? handleGetExtentValue(layerParams.extent) : undefined,
      background: isDefined(layerParams.background)
        ? handleGetColorValue(layerParams.background)
        : undefined,
      source: nativeSource
    })
    this.initLayerEvent()
  }

  /**
   * 获取图层关联的 OMap XYZ 数据源包装。
   *
   * @returns {XYZSource | null} OMap XYZ 数据源包装
   */
  getXYZSource(): XYZSource | null {
    return this._sourceWrapper as XYZSource | null
  }
}
