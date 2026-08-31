import { isDefined } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/index'
import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetColorValue } from '../../basic/Color/handle'
import VectorTileSource from '../../source/TileSource/subClass/VectorTileSource/index'
import { type OMapVectorTileLayerParamsType } from './type'
import { type BaseLayerPropertiesType, type OMapBaseLayerCommonType } from '../BaseLayer/type'

let PACKAGE_NAME = 'VectorTileLayer'
let createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 矢量瓦片图层类
 * @class VectorTileLayer
 * @classdesc 渲染 `VectorTileSource` 的矢量瓦片图层，修复此前矢量瓦片数据源无对应渲染图层的问题。
 * @author Aurora
 * @version 1.0.0
 * @createDate 2026/8/31
 * @updateDate 2026/8/31
 */
export default class VectorTileLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapBaseLayerCommonType, P> {
  /** 收窄基类的包装类型：矢量瓦片图层的数据源一定是矢量瓦片数据源。 */
  declare protected _sourceWrapper: VectorTileSource | null

  constructor(options?: OMapVectorTileLayerParamsType<P>) {
    const _options: OMapVectorTileLayerParamsType<P> = options ?? {}
    super('VectorTile', _options)
    if (!isDefined(_options.source)) {
      error_(createMessage('constructor', 'source参数是必须的'))
      return
    }
    const _layerParams = Object.assign({}, _options, {
      source: undefined,
      map: undefined
    })
    const sourceWrapper =
      _options.source instanceof VectorTileSource
        ? _options.source
        : new VectorTileSource(_options.source)
    this._sourceWrapper = sourceWrapper
    this._layer = new OlLayer.VectorTile({
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
   * 获取图层关联的 OMap 矢量瓦片数据源包装。
   * @returns {VectorTileSource | null} OMap 矢量瓦片数据源包装
   */
  getVectorTileSource(): VectorTileSource | null {
    return this._sourceWrapper
  }
}
