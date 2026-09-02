import { isDefined } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/index'
import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import ImageStaticSource from '../../source/ImageStaticSource/index'
import ImageSource from '../../source/ImageSource/index'
import ImageWMSSource from '../../source/ImageWMSSource/index'
import {
  type OMapImageLayerParamsType,
  DEFAULT_IMAGE_LAYER_PARAMS,
  type OMapImageSourceParamsType,
  DEFAULT_IMAGE_STATIC_SOURCE_PARAMS,
  isValidImageStaticSourceParams,
  isValidImageWMSSourceParams
} from './type'
import { type BaseLayerPropertiesType, type OMapBaseLayerCommonType } from '../BaseLayer/type'

const PACKAGE_NAME = 'ImageLayer'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 图片图层类
 *
 */

export default class ImageLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapBaseLayerCommonType, P> {
  /** 收窄基类的包装类型：图片图层的数据源是静态图片、WMS 单图或自定义 loader。 */
  declare protected _sourceWrapper: ImageStaticSource | ImageSource | ImageWMSSource | null

  constructor(options?: OMapImageLayerParamsType<P>) {
    const resolvedOptions: OMapImageLayerParamsType<P> = options ?? {}
    super('Image', resolvedOptions)
    if (!isDefined(resolvedOptions.source)) {
      error_(createMessage('constructor', '缺少source参数'))
      return
    }
    const layerParams = Object.assign({}, DEFAULT_IMAGE_LAYER_PARAMS, {
      ...resolvedOptions,
      source: undefined,
      map: undefined
    })
    // source 三种形态：WMS 单图（url + params）走 ImageWMSSource，静态图片（有 url）走
    // ImageStaticSource，自定义 loader 走 ImageSource。WMS 分支需先于静态图片分支判别，
    // 因为两者都带 url；之后把包装登记到基类，可通过 getImageSource() / getSourceWrapper() 取回。
    let sourceWrapper: ImageStaticSource | ImageSource | ImageWMSSource
    if (isValidImageWMSSourceParams(resolvedOptions.source)) {
      sourceWrapper = new ImageWMSSource(resolvedOptions.source)
    } else if (isValidImageStaticSourceParams(resolvedOptions.source)) {
      const sourceParams = Object.assign({}, DEFAULT_IMAGE_STATIC_SOURCE_PARAMS, {
        ...resolvedOptions.source
      })
      sourceWrapper = new ImageStaticSource(sourceParams)
    } else {
      const loaderSource = resolvedOptions.source as OMapImageSourceParamsType
      sourceWrapper = new ImageSource({
        attributions: loaderSource.attributions,
        interpolate: loaderSource.interpolate ?? true,
        loader: loaderSource.loader,
        projection: loaderSource.projection,
        resolutions: loaderSource.resolutions,
        state: loaderSource.state
      })
    }
    this._sourceWrapper = sourceWrapper
    this.ownsSourceWrapper = true
    this._layer = new OlLayer.Image({
      ...layerParams,
      extent: isDefined(layerParams.extent) ? handleGetExtentValue(layerParams.extent) : undefined,
      source: sourceWrapper.getSource()
    })
    this.initLayerEvent()
  }

  /**
   * 获取图层关联的 OMap 静态图片数据源包装（仅当数据源为静态图片时返回，否则为 null）。
   *
   * @returns {ImageStaticSource | null} OMap 静态图片数据源包装
   */
  getImageStaticSource(): ImageStaticSource | null {
    return this._sourceWrapper instanceof ImageStaticSource ? this._sourceWrapper : null
  }

  /**
   * 获取图层关联的 OMap 自定义 loader 数据源包装（仅当数据源为 loader 分支时返回，否则为 null）。
   *
   * 注意 `ImageStaticSource` 继承自 `ImageSource`，因此要先排除静态图片分支再判定。
   *
   * @returns {ImageSource | null} OMap 图片数据源包装
   */
  getImageSource(): ImageSource | null {
    return this._sourceWrapper instanceof ImageStaticSource ? null : this._sourceWrapper
  }

  /**
   * 获取图层关联的 OMap WMS 单图数据源包装（仅当数据源为 WMS 分支时返回，否则为 null）。
   *
   * @returns {ImageWMSSource | null} OMap WMS 单图数据源包装
   */
  getImageWMSSource(): ImageWMSSource | null {
    return this._sourceWrapper instanceof ImageWMSSource ? this._sourceWrapper : null
  }
}
