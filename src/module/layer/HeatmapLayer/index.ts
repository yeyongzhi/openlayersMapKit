import { isDefined } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/index'
import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import VectorSource from '../../source/VectorSource/index'
import { type OMapHeatmapLayerParamsType } from './type'
import { type BaseLayerPropertiesType, type OMapBaseLayerCommonType } from '../BaseLayer/type'

const PACKAGE_NAME = 'HeatmapLayer'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 热力图图层类
 *
 */
export default class HeatmapLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapBaseLayerCommonType, P> {
  /** 收窄基类的包装类型：热力图图层的数据源一定是矢量数据源。 */
  declare protected _sourceWrapper: VectorSource | null

  constructor(options?: OMapHeatmapLayerParamsType<P>) {
    const resolvedOptions: OMapHeatmapLayerParamsType<P> = options ?? {}
    super('Heatmap', resolvedOptions)
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
    // OL Heatmap（WebGL 系）不支持 background；从构造参数中剔除后再传入。
    const { background: ignoredBackground, ...heatmapParams } = layerParams
    void ignoredBackground
    this._layer = new OlLayer.Heatmap({
      ...heatmapParams,
      extent: isDefined(layerParams.extent) ? handleGetExtentValue(layerParams.extent) : undefined,
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
