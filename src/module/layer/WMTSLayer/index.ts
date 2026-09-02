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

const PACKAGE_NAME = 'WMTSLayer'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * WMTS图层类
 *
 */

export default class WMTSLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapBaseLayerCommonType, P> {
  /** 收窄基类的包装类型：WMTS 图层的数据源一定是 WMTS 数据源。 */
  declare protected nativeSourceWrapper: WMTSSource | null

  constructor(options?: OMapWMTSLayerParamsType<P>) {
    const resolvedOptions: OMapWMTSLayerParamsType<P> = Object.assign(
      {},
      DEFAULT_WMTS_LAYER_PARAMS,
      options
    )
    super('WMTS', resolvedOptions)
    if (!isDefined(resolvedOptions.source)) {
      error_(createMessage('constructor', 'source参数是必须的'))
      return
    }
    const layerParams = Object.assign({}, resolvedOptions, {
      source: undefined,
      map: undefined
    })
    const sourceParams = Object.assign({}, DEFAULT_WMTS_LAYER_SOURCE_PARAMS, {
      ...resolvedOptions.source
    })
    const wmtsSource = new WMTSSource(sourceParams as OMapWMTSSourceParamsType)
    // 登记 OMap 数据源包装，供 getWMTSSource() / getSourceWrapper() 取回。
    this._sourceWrapper = wmtsSource
    this.ownsSourceWrapper = true
    const nativeSource = wmtsSource.getSource()
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
   * 获取图层关联的 OMap WMTS 数据源包装。
   *
   * @returns {WMTSSource | null} OMap WMTS 数据源包装
   */
  getWMTSSource(): WMTSSource | null {
    return this._sourceWrapper as WMTSSource | null
  }
}
