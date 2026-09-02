import { OlSource } from '../../../../../source/index'
import TileSource from '../../index'
import {
  DEFAULT_OSM_SOURCE_PARAMS,
  handleGetOSMSourceParams,
  type OMapOSMSourceParamsType,
  type OMapOSMSourceType
} from './type'

/**
 * OpenStreetMap 瓦片数据源
 *
 */
export default class OSMSource extends TileSource<OMapOSMSourceType> {
  constructor(params: OMapOSMSourceParamsType = {}) {
    super(
      new OlSource.OSM(
        handleGetOSMSourceParams({
          ...DEFAULT_OSM_SOURCE_PARAMS,
          ...params
        })
      ) as OMapOSMSourceType
    )
  }
}
