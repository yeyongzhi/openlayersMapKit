import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import {
  type OMapTileLayerParamsType,
  DEFAULT_TILE_LAYER_PARAMS,
  type OMapTileLayerSourceLike,
  type OMapTileLayerType
} from './type'
import { handleGetBaseLayerParams } from '../BaseLayer/type'
import type { BaseLayerPropertiesType } from '../BaseLayer/type'
import { handleGetTileLayerSource } from './handle'
import type TileSource from '../../source/TileSource/index'
import type { OMapTileSourceType } from '../../source/TileSource/type'

/**
 * 瓦片图层类
 *
 */

export default class TileLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapTileLayerType, P> {
  /** 收窄基类的包装类型：瓦片图层的数据源一定是瓦片数据源。 */
  declare protected _sourceWrapper: TileSource<OMapTileSourceType> | null

  constructor(options: OMapTileLayerParamsType<P>) {
    super('Tile', options)
    // source 既可能是 OMap 包装也可能是原生实例，先解析再交给 OpenLayers；
    // 解析出的 OMap 包装登记到基类，之后可通过 getTileSource() 取回。
    const { source, wrapper } = handleGetTileLayerSource(options.source)
    this._sourceWrapper = wrapper
    const params = Object.assign({}, DEFAULT_TILE_LAYER_PARAMS, handleGetBaseLayerParams(options), {
      source
    })
    this._layer = new OlLayer.Tile(params)
    this.initLayerEvent()
  }

  /**
   * 获取图层关联的 OMap 瓦片数据源包装。
   *
   * 与基类 {@link BaseLayer.getSourceWrapper} 相比，这里把返回值收窄到瓦片数据源，
   * 可直接调用 `getTileGrid()`、`onTileLoadStart()` 等瓦片专属方法。
   *
   * @returns {TileSource | null} OMap 瓦片数据源包装；图层以原生数据源构造时为 null
   */
  getTileSource(): TileSource<OMapTileSourceType> | null {
    return this._sourceWrapper
  }

  /**
   * 获取原生 OpenLayers 瓦片数据源实例。
   *
   * @returns {OMapTileSourceType | null} 原生数据源
   */
  override getSource(): OMapTileSourceType | null {
    return this._layer.getSource() as OMapTileSourceType | null
  }

  /**
   * 替换图层数据源。
   *
   * @param source 新的数据源（OMap 包装或 OpenLayers 原生实例）
   */
  setSource(source: OMapTileLayerSourceLike) {
    this.assertActive('setSource')
    const previousWrapper = this._sourceWrapper
    const ownedPreviousWrapper = this.ownsSourceWrapper
    const { source: nativeSource, wrapper } = handleGetTileLayerSource(source)
    this._sourceWrapper = wrapper
    this.ownsSourceWrapper = false
    this._layer.setSource(nativeSource)
    if (ownedPreviousWrapper && previousWrapper !== wrapper) previousWrapper?.dispose()
  }
}
