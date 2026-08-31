import { isDefined } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/index'
import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import VectorSource from '../../source/VectorSource/index'
import { type OMapHeatmapLayerParamsType } from './type'
import { type BaseLayerPropertiesType, type OMapBaseLayerCommonType } from '../BaseLayer/type'

let PACKAGE_NAME = 'HeatmapLayer'
let createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 热力图图层类
 * @class HeatmapLayer
 * @classdesc 基于 OpenLayers `ol/layer/Heatmap` 的矢量热力图图层，将矢量源按权重渲染为热力分布。
 * @author Aurora
 * @version 1.0.0
 * @createDate 2026/8/31
 * @updateDate 2026/8/31
 */
export default class HeatmapLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapBaseLayerCommonType, P> {
  /** 收窄基类的包装类型：热力图图层的数据源一定是矢量数据源。 */
  declare protected _sourceWrapper: VectorSource | null

  constructor(options?: OMapHeatmapLayerParamsType<P>) {
    const _options: OMapHeatmapLayerParamsType<P> = options ?? {}
    super('Heatmap', _options)
    if (!isDefined(_options.source)) {
      error_(createMessage('constructor', 'source参数是必须的'))
      return
    }
    const _layerParams = Object.assign({}, _options, {
      source: undefined,
      map: undefined
    })
    const sourceWrapper =
      _options.source instanceof VectorSource ? _options.source : new VectorSource(_options.source ?? {})
    this._sourceWrapper = sourceWrapper
    // OL Heatmap（WebGL 系）不支持 background；从构造参数中剔除后再传入。
    const { background: _ignoredBackground, ..._heatmapParams } = _layerParams
    void _ignoredBackground
    this._layer = new OlLayer.Heatmap({
      ..._heatmapParams,
      extent: isDefined(_layerParams.extent)
        ? handleGetExtentValue(_layerParams.extent)
        : undefined,
      source: sourceWrapper.getSource()
    })
    this._initLayerEvent()
  }

  /**
   * 获取图层关联的 OMap 矢量数据源包装。
   * @returns {VectorSource | null} OMap 矢量数据源包装
   */
  getVectorSource(): VectorSource | null {
    return this._sourceWrapper
  }
}
