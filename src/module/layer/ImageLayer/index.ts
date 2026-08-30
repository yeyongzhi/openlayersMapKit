import { isDefined } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/index'
import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import ImageStaticSource from '../../source/ImageStaticSource/index'
import ImageSource from '../../source/ImageSource/index'
import {
  type OMapImageLayerParamsType,
  DEFAULT_IMAGE_LAYER_PARAMS,
  type OMapImageSourceParamsType,
  DEFAULT_IMAGE_STATIC_SOURCE_PARAMS,
  isVaildImageStaticSourceParams
} from './type'
import { type BaseLayerPropertiesType, type OMapBaseLayerCommonType } from '../BaseLayer/type'

let PACKAGE_NAME = 'ImageLayer'
let createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 图片图层类
 * @class ImageLayer
 * @classdesc 基础的图片地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/31
 * @updateDate 2026/8/30
 */

export default class ImageLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapBaseLayerCommonType, P> {
  /** 收窄基类的包装类型：图片图层的数据源是静态图片或自定义 loader。 */
  declare protected _sourceWrapper: ImageStaticSource | ImageSource | null

  constructor(options?: OMapImageLayerParamsType<P>) {
    const _options: OMapImageLayerParamsType<P> = options ?? {}
    super('Image', _options)
    if (!isDefined(_options.source)) {
      error_(createMessage('constructor', '缺少source参数'))
      return
    }
    let _layerParams = Object.assign({}, DEFAULT_IMAGE_LAYER_PARAMS, {
      ..._options,
      source: undefined,
      map: undefined
    })
    // source 两种形态：静态图片（有 url）走 ImageStaticSource，自定义 loader 走 ImageSource。
    // 此前直接 new OlSource.ImageStatic，绕过了 OMap 包装层；现在把包装登记到基类，
    // 之后可通过 getImageStaticSource() / getImageSource() / getSourceWrapper() 取回。
    let sourceWrapper: ImageStaticSource | ImageSource
    if (isVaildImageStaticSourceParams(_options.source)) {
      const _sourceParams = Object.assign({}, DEFAULT_IMAGE_STATIC_SOURCE_PARAMS, {
        ..._options.source
      })
      sourceWrapper = new ImageStaticSource(_sourceParams)
    } else {
      const loaderSource = _options.source as OMapImageSourceParamsType
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
    this._layer = new OlLayer.Image({
      ..._layerParams,
      extent: isDefined(_layerParams.extent)
        ? handleGetExtentValue(_layerParams.extent)
        : undefined,
      source: sourceWrapper.getSource()
    })
    this._initLayerEvent()
  }

  /**
   * 获取图层关联的 OMap 静态图片数据源包装（仅当数据源为静态图片时返回，否则为 null）。
   * @returns {ImageStaticSource | null} OMap 静态图片数据源包装
   */
  getImageStaticSource(): ImageStaticSource | null {
    return this._sourceWrapper instanceof ImageStaticSource ? this._sourceWrapper : null
  }

  /**
   * 获取图层关联的 OMap 自定义 loader 数据源包装（仅当数据源为 loader 分支时返回，否则为 null）。
   *
   * 注意 `ImageStaticSource` 继承自 `ImageSource`，因此要先排除静态图片分支再判定。
   * @returns {ImageSource | null} OMap 图片数据源包装
   */
  getImageSource(): ImageSource | null {
    return this._sourceWrapper instanceof ImageStaticSource ? null : this._sourceWrapper
  }
}
