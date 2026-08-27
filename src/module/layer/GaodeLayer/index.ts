import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import TileLayer from '../TileLayer/index'
import XYZSource from '../../source/TileSource/subClass/XYZ/index'
import { DEFAULT_XYZ_SOURCE_PARAMS } from '../../source/TileSource/subClass/XYZ/type'
import {
  type GaodeLayerTypeEnum,
  type OMapGaodeLayerParamsType,
  isValidGaodeLayerType
} from './type'
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
    const xyzSourceParams = Object.assign({}, DEFAULT_XYZ_SOURCE_PARAMS, options, {
      urls
    })
    const xyzSource = new XYZSource(xyzSourceParams)
    const gaodeParams = Object.assign({}, options, {
      source: xyzSource.getSource()
    })
    super(gaodeParams)
    this.gaodeType = type
    this._initLayerEvent()
  }
}
