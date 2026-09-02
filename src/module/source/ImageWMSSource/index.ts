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
 *
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
  override getSource(): OMapImageWMSSourceType {
    return this._source as OMapImageWMSSourceType
  }
}
