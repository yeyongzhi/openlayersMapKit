import { OlSource } from '../../../source/index'
import { error_, getPackageMessage } from '../../../utils/message'
import TileSource from '../../source/TileSource/index'
import type { OMapTileSourceType } from '../../source/TileSource/type'
import {
  type OMapTileLayerResolvedSource,
  type OMapTileLayerSourceLike,
  TILE_LAYER_SOURCE_ERROR_MESSAGE
} from './type'

const createMessage = getPackageMessage('TileLayer')

/**
 * 解析瓦片图层的数据源入参。
 *
 * 图层需要同时拿到「原生数据源」和「OMap 包装」两样东西：前者交给 OpenLayers，
 * 后者登记在图层上供外部取用（此前包装在构造完成后即被丢弃，外部再也取不到）。
 *
 * @param source 数据源入参（OMap 包装或 OpenLayers 原生实例）
 * @returns 解析结果；入参既不是包装也不是原生实例时抛出 `OMapError`
 */
export function handleGetTileLayerSource(
  source: OMapTileLayerSourceLike
): OMapTileLayerResolvedSource {
  // OMap 包装：取内部原生实例，同时保留包装本身
  if (source instanceof TileSource) {
    return { source: source.getSource(), wrapper: source }
  }
  // OpenLayers 原生瓦片数据源：直接使用，没有对应的 OMap 包装
  if (source instanceof OlSource.Tile) {
    return { source: source as OMapTileSourceType, wrapper: null }
  }
  error_(createMessage('constructor', TILE_LAYER_SOURCE_ERROR_MESSAGE))
}
