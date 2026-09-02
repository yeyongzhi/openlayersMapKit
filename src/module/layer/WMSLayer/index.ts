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

const PACKAGE_NAME = 'WMSLayer'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * WMS图层类
 *
 */

export default class WMSLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapBaseLayerCommonType, P> {
  /** 收窄基类的包装类型：WMS 图层的数据源一定是 TileWMS 数据源。 */
  declare protected nativeSourceWrapper: TileWMSSource | null

  constructor(options?: OMapWMSLayerParamsType<P>) {
    const resolvedOptions: OMapWMSLayerParamsType<P> = Object.assign(
      {},
      DEFAULT_WMS_LAYER_PARAMS,
      options
    )
    super('WMS', resolvedOptions)
    if (!isDefined(resolvedOptions.source)) {
      error_(createMessage('constructor', 'source参数是必须的'))
      return
    }
    const layerParams = Object.assign({}, resolvedOptions, {
      source: undefined,
      map: undefined
    })
    const sourceParams = Object.assign({}, DEFAULT_WMS_LAYER_SOURCE_PARAMS, {
      ...resolvedOptions.source
    })
    const wmsSource = new TileWMSSource(sourceParams as OMapTileWMSSourceParamsType)
    // 登记 OMap 数据源包装，供 getWMSSource() / getSourceWrapper() 取回。
    this._sourceWrapper = wmsSource
    this.ownsSourceWrapper = true
    const nativeSource = wmsSource.getSource()
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
   * 获取图层关联的 OMap TileWMS 数据源包装。
   *
   * @returns {TileWMSSource | null} OMap TileWMS 数据源包装
   */
  getWMSSource(): TileWMSSource | null {
    return this._sourceWrapper as TileWMSSource | null
  }
}
