import { isDefined, isNumber } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/message'
import { OlSource } from '../../../source/index'
import type { EventsKey } from 'ol/events'
import Projection from '../../core/Projection/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import type { OMapExtentType } from '../../basic/Extent/type'
import {
  DEFAULT_IMAGE_SOURCE_PARAMS,
  IMAGE_SOURCE_EVENT_TYPES,
  type OMapImageSourceEventListener,
  type OMapImageSourceEventType,
  type OMapImageSourceType,
  type OMapImageSourceParamsType
} from './type'
import Source from '../Source/index'
import { handleGetSourceParams } from '../Source/type'

const PACKAGE_NAME = 'ImageSource'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * ImageSource
 *
 * @description 参考：
 */

export default class ImageSource extends Source<OMapImageSourceType> {
  /**
   * @param params 构造参数；也可直接传入一个原生 `ol/source/Image` 实例，
   *   供 {@link ImageStaticSource} 等子类复用基类的能力。
   */
  constructor(params: OMapImageSourceParamsType | OMapImageSourceType = {}) {
    if (params instanceof OlSource.Image) {
      super(params)
      return
    }
    const sourceParams = handleGetSourceParams({
      ...DEFAULT_IMAGE_SOURCE_PARAMS,
      ...params
    })
    super(new OlSource.Image(sourceParams))
  }

  override getResolutions(): Array<number> | null {
    return this._source.getResolutions()
  }

  setResolutions(resolutions: Array<number> | null) {
    if (
      isDefined(resolutions) &&
      (!Array.isArray(resolutions) || !resolutions.every((item) => isNumber(item)))
    ) {
      error_(createMessage('setResolutions', 'resolutions必须是number数组或null'))
    }
    this._source.setResolutions(resolutions)
  }

  getImage(extent: OMapExtentType, resolution: number, pixelRatio: number, projection: Projection) {
    if (
      !isDefined(extent) ||
      !isNumber(resolution) ||
      !isNumber(pixelRatio) ||
      !(projection instanceof Projection)
    ) {
      error_(createMessage('getImage', 'extent、resolution、pixelRatio或projection参数格式有误'))
    }
    return this._source.getImage(
      handleGetExtentValue(extent),
      resolution,
      pixelRatio,
      projection.getProjection()
    )
  }

  onImageLoad(type: OMapImageSourceEventType, listener: OMapImageSourceEventListener): EventsKey {
    if (!Object.values(IMAGE_SOURCE_EVENT_TYPES).includes(type) || !isDefined(listener)) {
      error_(createMessage('onImageLoad', 'type或listener参数格式有误'))
    }
    return this._source.on(type, listener)
  }

  onImageLoadStart(listener: OMapImageSourceEventListener): EventsKey {
    return this.onImageLoad(IMAGE_SOURCE_EVENT_TYPES.imageLoadStart, listener)
  }

  onImageLoadEnd(listener: OMapImageSourceEventListener): EventsKey {
    return this.onImageLoad(IMAGE_SOURCE_EVENT_TYPES.imageLoadEnd, listener)
  }

  onImageLoadError(listener: OMapImageSourceEventListener): EventsKey {
    return this.onImageLoad(IMAGE_SOURCE_EVENT_TYPES.imageLoadError, listener)
  }
}
