import { OlSource } from '../../../../../source/index'
import TileSource from '../../index'
import {
  DEFAULT_TILE_ARCGIS_REST_SOURCE_PARAMS,
  handleGetTileArcGISRestSourceParams,
  type OMapTileArcGISRestSourceParamsType,
  type OMapTileArcGISRestSourceType
} from './type'

/**
 * ArcGIS REST 瓦片数据源
 *
 */
export default class TileArcGISRestSource extends TileSource<OMapTileArcGISRestSourceType> {
  constructor(params: OMapTileArcGISRestSourceParamsType = {}) {
    super(
      new OlSource.TileArcGISRest(
        handleGetTileArcGISRestSourceParams({
          ...DEFAULT_TILE_ARCGIS_REST_SOURCE_PARAMS,
          ...params
        })
      ) as OMapTileArcGISRestSourceType
    )
  }
}
