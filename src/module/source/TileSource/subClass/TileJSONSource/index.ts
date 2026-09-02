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
 *
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
