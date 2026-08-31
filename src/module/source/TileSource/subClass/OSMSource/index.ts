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
 * @class OSMSource
 * @classdesc 基于 OpenLayers `ol/source/OSM` 的 OSM 标准底图数据源，等价于 XYZ 源 + OSM 固定 URL 与版权声明。
 * @author Aurora
 * @version 1.0.0
 * @createDate 2026/8/31
 * @updateDate 2026/8/31
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
