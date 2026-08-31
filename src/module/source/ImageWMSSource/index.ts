import { OlSource } from '../../../source/index'
import ImageSource from '../ImageSource/index'
import {
  DEFAULT_IMAGE_WMS_SOURCE_PARAMS,
  handleGetImageWMSSourceParams,
  type OMapImageWMSSourceParamsType,
  type OMapImageWMSSourceType
} from './type'

/**
 * WMS 单图数据源
 * @class ImageWMSSource
 * @classdesc 基于 OpenLayers `ol/source/ImageWMS` 的 WMS 单张图片数据源，配合 `ImageLayer` 使用。
 * @author Aurora
 * @version 1.0.0
 * @createDate 2026/8/31
 * @updateDate 2026/8/31
 */
export default class ImageWMSSource extends ImageSource {
  constructor(params: OMapImageWMSSourceParamsType = {}) {
    super(
      new OlSource.ImageWMS(
        handleGetImageWMSSourceParams({
          ...DEFAULT_IMAGE_WMS_SOURCE_PARAMS,
          ...params
        })
      ) as OMapImageWMSSourceType
    )
  }

  /** 获取原生 OpenLayers WMS 单图数据源实例。 */
  getSource(): OMapImageWMSSourceType {
    return this._source as OMapImageWMSSourceType
  }
}
