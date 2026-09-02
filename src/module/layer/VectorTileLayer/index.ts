import { isDefined } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/index'
import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetColorValue } from '../../basic/Color/handle'
import VectorTileSource from '../../source/TileSource/subClass/VectorTileSource/index'
import { type OMapVectorTileLayerParamsType } from './type'
import { type BaseLayerPropertiesType, type OMapBaseLayerCommonType } from '../BaseLayer/type'

const PACKAGE_NAME = 'VectorTileLayer'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 矢量瓦片图层类
 *
 */
export default class VectorTileLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapBaseLayerCommonType, P> {
  /** 收窄基类的包装类型：矢量瓦片图层的数据源一定是矢量瓦片数据源。 */
  declare protected _sourceWrapper: VectorTileSource | null

  constructor(options?: OMapVectorTileLayerParamsType<P>) {
    const resolvedOptions: OMapVectorTileLayerParamsType<P> = options ?? {}
    super('VectorTile', resolvedOptions)
    if (!isDefined(resolvedOptions.source)) {
      error_(createMessage('constructor', 'source参数是必须的'))
      return
    }
    const layerParams = Object.assign({}, resolvedOptions, {
      source: undefined,
      map: undefined
    })
    const sourceWrapper =
      resolvedOptions.source instanceof VectorTileSource
        ? resolvedOptions.source
        : new VectorTileSource(resolvedOptions.source)
    this._sourceWrapper = sourceWrapper
    this.ownsSourceWrapper = !(resolvedOptions.source instanceof VectorTileSource)
    this._layer = new OlLayer.VectorTile({
      ...layerParams,
      extent: isDefined(layerParams.extent) ? handleGetExtentValue(layerParams.extent) : undefined,
      background: isDefined(layerParams.background)
        ? handleGetColorValue(layerParams.background)
        : undefined,
      source: sourceWrapper.getSource()
    })
    this.initLayerEvent()
  }

  /**
   * 获取图层关联的 OMap 矢量瓦片数据源包装。
   *
   * @returns {VectorTileSource | null} OMap 矢量瓦片数据源包装
   */
  getVectorTileSource(): VectorTileSource | null {
    return this._sourceWrapper
  }
}
