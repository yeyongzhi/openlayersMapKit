import { defaultValue, isDefined } from '../../../utils/index'
import { warn_, getPackageMessage } from '../../../utils/index'
import { OlLayer, OlSource } from '../../../source/index'
import { handleGetProjectionValue } from '../../core/Projection/handle'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import {
  type OMapImageLayerParamsType,
  DEFAULT_IMAGE_LAYER_PARAMS,
  DEFAULT_IMAGE_STATIC_SOURCE_PARAMS
} from './type'

let PACKAGE_NAME = 'ImageLayer'
let createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 图片图层类
 * @class ImageLayer
 * @classdesc 基础的图片地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/31
 * @updateDate 2025/11/6
 */

export default class ImageLayer extends BaseLayer {
  constructor(options: OMapImageLayerParamsType) {
    super('Image', defaultValue(options, {}))
    if (!isDefined(options.source)) {
      warn_(createMessage('constructor', '缺少source参数'))
      return
    }
    let _layerParams = Object.assign({}, DEFAULT_IMAGE_LAYER_PARAMS, {
      ...options,
      source: undefined,
      map: undefined
    })
    let _sourceParams = Object.assign({}, DEFAULT_IMAGE_STATIC_SOURCE_PARAMS, {
      ...defaultValue(options.source, {})
    })
    let _source = undefined
    if (isDefined(options.source)) {
      _source = new OlSource.ImageStatic({
        ..._sourceParams,
        extent: isDefined(_sourceParams.imageExtent)
          ? handleGetExtentValue(_sourceParams.imageExtent)
          : undefined,
        projection: handleGetProjectionValue(_sourceParams.projection)
      })
    }
    this._layer = new OlLayer.Image({
      ..._layerParams,
      extent: isDefined(_layerParams.extent)
        ? handleGetExtentValue(_layerParams.extent)
        : undefined,
      source: _source
    })
    this._initLayerEvent()
  }
}
