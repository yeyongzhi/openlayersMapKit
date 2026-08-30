import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import TileLayer from '../TileLayer/index'
import XYZSource from '../../source/TileSource/subClass/XYZ/index'
import { DEFAULT_XYZ_SOURCE_PARAMS } from '../../source/TileSource/subClass/XYZ/type'
import {
  type GaodeLayerTypeEnum,
  type OMapGaodeLayerParamsType,
  isValidGaodeLayerType
} from './type'
import type { OMapTileLayerParamsType } from '../TileLayer/type'
import { getGaodeLayerUrlsByType } from './handle'

let PACKAGE_NAME = 'GaodeLayer'
let createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 高德地图类
 * @class
 * @classdesc 快捷使用高德地图相关的开发地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/3
 * @updateDate 2025/10/3
 */

export default class GaodeLayer extends TileLayer {
  /**
   * 图层类型
   */
  gaodeType!: GaodeLayerTypeEnum

  constructor(type: GaodeLayerTypeEnum, options: OMapGaodeLayerParamsType) {
    if (!isValidGaodeLayerType(type)) {
      error_(createMessage('constructor', commonMessage.paramsInvaildEnum('type')))
    }
    const urls = getGaodeLayerUrlsByType(type)
    // options.source 承载用户提供的 XYZ 参数，此前被 Object.assign 整体摊平到顶层而静默失效，
    // 这里显式合并，顺序为：默认参数 → 图层通用参数 → 用户 source 参数 → 由类型推导出的 urls。
    const xyzSourceParams = Object.assign({}, DEFAULT_XYZ_SOURCE_PARAMS, options, options.source, {
      urls
    })
    const xyzSource = new XYZSource(xyzSourceParams)
    const gaodeParams: OMapTileLayerParamsType = {
      ...options,
      source: xyzSource
    }
    super(gaodeParams)
    this.gaodeType = type
  }
}
