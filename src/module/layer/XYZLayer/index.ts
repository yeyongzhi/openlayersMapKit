import { defaultValue, isDefined } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/index'
import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetColorValue } from '../../basic/Color/handle'
import XYZSource from '../../source/TileSource/subClass/XYZ/index'
import {
  type OMapXYZLayerParamsType,
  DEFAULT_XYZ_LAYER_PARAMS,
  DEFAULT_XYZ_LAYER_SOURCE_PARAMS
} from './type'
import type { OMapXYZSourceParamsType } from '../../source/TileSource/subClass/XYZ/type'

let PACKAGE_NAME = 'XYZLayer'
let createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 瓦片图层类
 * @class XYZLayer
 * @classdesc 基础的XYZ瓦片地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/2
 * @updateDate 2025/10/2
 */

export default class XYZLayer extends BaseLayer {
  constructor(options: OMapXYZLayerParamsType) {
    super('XYZ', defaultValue(options, {}))
    if (!isDefined(options.source)) {
      error_(createMessage('constructor', 'source参数是必须的'))
      return
    }
    let _layerParams = Object.assign({}, DEFAULT_XYZ_LAYER_PARAMS, {
      ...options,
      source: undefined,
      map: undefined
    })
    let _sourceParams = Object.assign({}, DEFAULT_XYZ_LAYER_SOURCE_PARAMS, {
      ...defaultValue(options.source, {})
    })
    let _source = new XYZSource(_sourceParams as OMapXYZSourceParamsType).getSource()
    this._layer = new OlLayer.Tile({
      ..._layerParams,
      extent: isDefined(_layerParams.extent)
        ? handleGetExtentValue(_layerParams.extent)
        : undefined,
      background: isDefined(_layerParams.background)
        ? handleGetColorValue(_layerParams.background)
        : undefined,
      source: _source
    })
    this._initLayerEvent()
  }
}
