import { isDefined } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/index'
import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetColorValue } from '../../basic/Color/handle'
import VectorSource from '../../source/VectorSource/index'
import { type OMapVectorImageLayerParamsType } from './type'
import { type BaseLayerPropertiesType, type OMapBaseLayerCommonType } from '../BaseLayer/type'

let PACKAGE_NAME = 'VectorImageLayer'
let createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 矢量图片图层类
 * @class VectorImageLayer
 * @classdesc 基于 OpenLayers `ol/layer/VectorImage` 的矢量图片图层，将矢量源在服务/离屏端渲染为单张图片。
 * @author Aurora
 * @version 1.0.0
 * @createDate 2026/8/31
 * @updateDate 2026/8/31
 */
export default class VectorImageLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapBaseLayerCommonType, P> {
  /** 收窄基类的包装类型：矢量图片图层的数据源一定是矢量数据源。 */
  declare protected _sourceWrapper: VectorSource | null

  constructor(options?: OMapVectorImageLayerParamsType<P>) {
    const _options: OMapVectorImageLayerParamsType<P> = options ?? {}
    super('VectorImage', _options)
    if (!isDefined(_options.source)) {
      error_(createMessage('constructor', 'source参数是必须的'))
      return
    }
    const _layerParams = Object.assign({}, _options, {
      source: undefined,
      map: undefined
    })
    const sourceWrapper =
      _options.source instanceof VectorSource
        ? _options.source
        : new VectorSource(_options.source ?? {})
    this._sourceWrapper = sourceWrapper
    this._layer = new OlLayer.VectorImage({
      ..._layerParams,
      extent: isDefined(_layerParams.extent)
        ? handleGetExtentValue(_layerParams.extent)
        : undefined,
      background: isDefined(_layerParams.background)
        ? handleGetColorValue(_layerParams.background)
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
