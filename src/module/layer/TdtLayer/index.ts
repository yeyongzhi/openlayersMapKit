import { isDefined } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/index'
import { getTdtServiceUrl } from './layerSource'
import { MapToken } from '../../util/index'
import TileLayer from '../TileLayer/index'
import XYZSource from '../../source/TileSource/subClass/XYZ/index'
import { DEFAULT_XYZ_SOURCE_PARAMS } from '../../source/TileSource/subClass/XYZ/type'
import {
  type TdtLayerTypeEnum,
  type TdtLayerProjTypeEnum,
  type OMapTdtLayerParamsType,
  isValidTdtLayerType
} from './type'
import type { OMapTileLayerParamsType } from '../TileLayer/type'

const PACKAGE_NAME = 'TdtLayer'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 天地图服务类
 *
 */

export default class TdtLayer extends TileLayer {
  /**
   * 图层类型
   */
  tdtType!: TdtLayerTypeEnum

  constructor(type: TdtLayerTypeEnum, proj: TdtLayerProjTypeEnum, options: OMapTdtLayerParamsType) {
    if (!isDefined(MapToken.tdt)) {
      error_(createMessage('constructor', '缺少天地图key，请提前申明'))
    }
    if (!isValidTdtLayerType(type)) {
      error_(createMessage('constructor', commonMessage.paramsInvalidEnum('type')))
    }
    const url = getTdtServiceUrl(type, proj) // 天地图只需要 单个url 即可
    // options.source 承载用户提供的 XYZ 参数，此前被 Object.assign 整体摊平到顶层而静默失效，
    // 这里显式合并，顺序为：默认参数 → 图层通用参数 → 用户 source 参数 → 由类型推导出的 url。
    const xyzSourceParams = Object.assign({}, DEFAULT_XYZ_SOURCE_PARAMS, options, options.source, {
      url
    })
    const xyzSource = new XYZSource(xyzSourceParams)
    const tdtParams: OMapTileLayerParamsType = {
      ...options,
      source: xyzSource
    }
    super(tdtParams)
    this.ownsSourceWrapper = true
    this.tdtType = type
  }
}
