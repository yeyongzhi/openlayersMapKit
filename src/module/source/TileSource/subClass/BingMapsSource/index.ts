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
 *
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
