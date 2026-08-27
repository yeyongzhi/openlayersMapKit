import { OlSource } from '../../../../../source/index'
import TileSource from '../../index'
import {
  DEFAULT_DATA_TILE_SOURCE_PARAMS,
  handleGetDataTileSourceParams,
  type OMapDataTileSourceParamsType,
  type OMapDataTileSourceType
} from './type'

export default class DataTileSource extends TileSource<OMapDataTileSourceType> {
  constructor(params: OMapDataTileSourceParamsType = {}) {
    super(
      new OlSource.DataTile(
        handleGetDataTileSourceParams({
          ...DEFAULT_DATA_TILE_SOURCE_PARAMS,
          ...params
        })
      )
    )
  }
}
