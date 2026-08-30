import type { BaseLayerOptionsType, BaseLayerPropertiesType } from '../BaseLayer/type'
import { OlLayer, OlSource } from '../../../source/index'
import type TileSource from '../../source/TileSource/index'
import type { OMapTileSourceType } from '../../source/TileSource/type'

export type OMapTileLayerType = OlLayer.Tile

/**
 * 瓦片图层可接受的数据源形态。
 *
 * - OMap 数据源包装（如 `XYZSource`、`WMTSSource`）：会登记到图层上，
 *   可通过 {@link TileLayer.getTileSource} 取回；
 * - OpenLayers 原生数据源实例：直接使用，此时没有 OMap 包装。
 *
 * 注意：瓦片数据源必须自己知道如何取瓦片（`ol/source/Tile` 在 OpenLayers 中是抽象类），
 * 因此这里不接受纯参数对象——参数无法实例化出可用的瓦片数据源。
 */
export type OMapTileLayerSourceLike = TileSource<OMapTileSourceType> | OMapTileSourceType

export type OMapTileLayerParamsType<P extends BaseLayerPropertiesType = BaseLayerPropertiesType> =
  BaseLayerOptionsType<P> & {
    preload: number
    useInterimTilesOnError: boolean
    cacheSize: number
    source: OMapTileLayerSourceLike
  }
export const DEFAULT_TILE_LAYER_PARAMS = {
  preload: 0,
  useInterimTilesOnError: true,
  cacheSize: 512
}

/** 解析后的图层数据源：原生瓦片实例 + 可选的 OMap 包装。 */
export type OMapTileLayerResolvedSource = {
  source: OMapTileSourceType
  wrapper: TileSource<OMapTileSourceType> | null
}

export const TILE_LAYER_SOURCE_ERROR_MESSAGE =
  'source参数必须是 OMap 瓦片数据源实例或 OpenLayers 原生 Tile 数据源实例，纯参数对象无法构造出可用的瓦片数据源'
