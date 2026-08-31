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
 * @class TileArcGISRestSource
 * @classdesc 基于 OpenLayers `ol/source/TileArcGISRest` 的 Esri ArcGIS Server 瓦片数据源。
 * @author Aurora
 * @version 1.0.0
 * @createDate 2026/8/31
 * @updateDate 2026/8/31
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
