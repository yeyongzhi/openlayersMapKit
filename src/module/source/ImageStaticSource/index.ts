import { OlSource } from '../../../source/index'
import Extent from '../../basic/Extent/index'
import ImageSource from '../ImageSource/index'
import {
  DEFAULT_IMAGE_STATIC_SOURCE_PARAMS,
  handleGetImageStaticSourceParams,
  type OMapImageStaticSourceParamsType,
  type OMapImageStaticSourceType
} from './type'

/**
 * 静态图片数据源
 *
 * @description 参考：https://openlayers.org/en/latest/apidoc/module-ol_source_ImageStatic.html
 */
export default class ImageStaticSource extends ImageSource {
  declare protected _source: OMapImageStaticSourceType

  constructor(params: OMapImageStaticSourceParamsType) {
    super(
      new OlSource.ImageStatic(
        handleGetImageStaticSourceParams({
          ...DEFAULT_IMAGE_STATIC_SOURCE_PARAMS,
          ...params
        })
      )
    )
  }

  /**
   * 获取原生 OpenLayers 静态图片数据源实例
   *
   * @returns {OMapImageStaticSourceType} 原生数据源
   */
  override getSource(): OMapImageStaticSourceType {
    return this._source
  }

  /**
   * 获取图片所覆盖的地理范围
   *
   * @returns {Extent} 范围
   */
  getImageExtent(): Extent {
    return new Extent(this._source.getImageExtent())
  }

  /**
   * 获取图片地址
   *
   * @returns {string} 图片 url
   */
  getUrl(): string {
    return this._source.getUrl()
  }
}
