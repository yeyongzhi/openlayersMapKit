import { OlSource } from '../../../source/index'
import type { BaseLayerOptionsType, BaseLayerPropertiesType } from '../BaseLayer/type'
import { isDefined } from '../../../utils/index'
import {
  DEFAULT_IMAGE_STATIC_SOURCE_PARAMS,
  type OMapImageStaticSourceParamsType
} from '../../source/ImageStaticSource/type'
import type { OMapImageSourceParamsType } from '../../source/ImageSource/type'

export {
  DEFAULT_IMAGE_STATIC_SOURCE_PARAMS,
  type OMapImageStaticSourceParamsType
} from '../../source/ImageStaticSource/type'
export type { OMapImageSourceParamsType } from '../../source/ImageSource/type'

export type OMapImageLayerParamsType<P extends BaseLayerPropertiesType = BaseLayerPropertiesType> =
  BaseLayerOptionsType<P> & {
    source?: OMapImageSourceParamsType | OMapImageStaticSourceParamsType // source参数是必须的
  }
export const DEFAULT_IMAGE_LAYER_PARAMS: OMapImageLayerParamsType = {}

export type OMapImageLayerSourceStateType = 'undefined' | 'loading' | 'ready' | 'error'
export type OlImageSourceInstanceType = InstanceType<typeof OlSource.Image>
export type OlImageStaticSourceInstanceType = InstanceType<typeof OlSource.ImageStatic>

/**
 * 判断参数是否为静态图片数据源参数。
 *
 * `OMapImageLayerParamsType.source` 在类型上允许两种形态：静态图片（有 url 分支）与
 * 自定义 `loader` 分支。按 `url` 是否存在判别，避免把 loader 型参数静默降级成
 * url 为空的无效数据源。
 * @param source 数据源参数
 * @returns 是否为静态图片数据源参数
 */
export function isVaildImageStaticSourceParams(
  source: OMapImageSourceParamsType | OMapImageStaticSourceParamsType
): source is OMapImageStaticSourceParamsType {
  return isDefined((source as OMapImageStaticSourceParamsType).url)
}
