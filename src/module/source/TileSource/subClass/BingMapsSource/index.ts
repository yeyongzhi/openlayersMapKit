import { OlSource } from '../../../../../source/index'
import TileSource from '../../index'
import {
  DEFAULT_BING_MAPS_SOURCE_PARAMS,
  handleGetBingMapsSourceParams,
  type OMapBingMapsSourceParamsType,
  type OMapBingMapsSourceType
} from './type'

/**
 * Bing Maps 瓦片数据源
 * @class BingMapsSource
 * @classdesc 基于 OpenLayers `ol/source/BingMaps` 的必应地图数据源，需提供 `key` 与 `imagerySet`。
 * @author Aurora
 * @version 1.0.0
 * @createDate 2026/8/31
 * @updateDate 2026/8/31
 */
export default class BingMapsSource extends TileSource<OMapBingMapsSourceType> {
  constructor(params: OMapBingMapsSourceParamsType) {
    super(
      new OlSource.BingMaps(
        handleGetBingMapsSourceParams({
          ...DEFAULT_BING_MAPS_SOURCE_PARAMS,
          ...params
        })
      ) as OMapBingMapsSourceType
    )
  }
}
