import { isDefined } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/index'
import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetColorValue } from '../../basic/Color/handle'
import VectorSource from '../../source/VectorSource/index'
import { type OMapVectorImageLayerParamsType } from './type'
import { type BaseLayerPropertiesType, type OMapBaseLayerCommonType } from '../BaseLayer/type'

const PACKAGE_NAME = 'VectorImageLayer'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 矢量图片图层类
 *
 */
export default class VectorImageLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapBaseLayerCommonType, P> {
  /** 收窄基类的包装类型：矢量图片图层的数据源一定是矢量数据源。 */
  declare protected _sourceWrapper: VectorSource | null

  constructor(options?: OMapVectorImageLayerParamsType<P>) {
    const resolvedOptions: OMapVectorImageLayerParamsType<P> = options ?? {}
    super('VectorImage', resolvedOptions)
    if (!isDefined(resolvedOptions.source)) {
      error_(createMessage('constructor', 'source参数是必须的'))
      return
    }
    const layerParams = Object.assign({}, resolvedOptions, {
      source: undefined,
      map: undefined
    })
    const sourceWrapper =
      resolvedOptions.source instanceof VectorSource
        ? resolvedOptions.source
        : new VectorSource(resolvedOptions.source ?? {})
    this._sourceWrapper = sourceWrapper
    this.ownsSourceWrapper = !(resolvedOptions.source instanceof VectorSource)
    this._layer = new OlLayer.VectorImage({
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
   * 获取图层关联的 OMap 矢量数据源包装。
   *
   * @returns {VectorSource | null} OMap 矢量数据源包装
   */
  getVectorSource(): VectorSource | null {
    return this._sourceWrapper
  }
}
