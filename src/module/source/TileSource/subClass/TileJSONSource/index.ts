import { OlSource } from '../../../../../source/index'
import TileSource from '../../index'
import {
  DEFAULT_TILE_JSON_SOURCE_PARAMS,
  handleGetTileJSONSourceParams,
  type OMapTileJSONSourceParamsType,
  type OMapTileJSONSourceType
} from './type'

/**
 * TileJSON 瓦片数据源
 * @class TileJSONSource
 * @classdesc 基于 OpenLayers `ol/source/TileJSON` 的瓦片数据源，通过 TileJSON 元数据 URL 自动推导瓦片网格与范围。
 * @author Aurora
 * @version 1.0.0
 * @createDate 2026/8/31
 * @updateDate 2026/8/31
 */
export default class TileJSONSource extends TileSource<OMapTileJSONSourceType> {
  constructor(params: OMapTileJSONSourceParamsType = {}) {
    super(
      new OlSource.TileJSON(
        handleGetTileJSONSourceParams({
          ...DEFAULT_TILE_JSON_SOURCE_PARAMS,
          ...params
        })
      ) as OMapTileJSONSourceType
    )
  }
}
