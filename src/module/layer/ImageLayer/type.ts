import { OlSource } from '../../../source/index'
import Extent from '../../basic/Extent/index'
import { type OlExtentType, type OMapExtentType } from '../../basic/Extent/type'
import { type OMapProjectionType } from '../../core/Projection/type'
import type { BaseLayerOptionsType } from '../BaseLayer/type'

export type OMapImageLayerParamsType = BaseLayerOptionsType & {
  source?: OMapImageSourceParamsType | OMapImageStaticSourceParamsType // source参数是必须的
}
export const DEFAULT_IMAGE_LAYER_PARAMS: OMapImageLayerParamsType = {}

export type OMapImageLayerSourceStateType = 'undefined' | 'loading' | 'ready' | 'error'
/**
 * source类型
 */
export type OMapImageSourceParamsType = {
  attributions?: string | string[]
  interpolate: boolean
  loader?: (extent: OlExtentType, resolution: number, pixelRatio: number) => void
  projection?: OMapProjectionType
  resolutions?: number[]
  state?: OMapImageLayerSourceStateType
}
export const DEFAULT_IMAGE_SOURCE_PARAMS: OMapImageSourceParamsType = {
  interpolate: true
}
export type OlImageSourceInstanceType = InstanceType<typeof OlSource.Image>

/**
 * ImageStatic
 */
export type OMapImageStaticSourceParamsType = {
  attributions?: string | string[]
  crossOrigin?: string | null
  imageExtent: OMapExtentType
  imageLoadFunction?: (extent: OlExtentType, resolution: number, pixelRatio: number) => void
  interpolate: boolean
  projection?: OMapProjectionType
  url: string
}
export const DEFAULT_IMAGE_STATIC_SOURCE_PARAMS: OMapImageStaticSourceParamsType = {
  interpolate: true,
  imageExtent: new Extent(0, 0, 0, 0),
  url: ''
}
export type OlImageStaticSourceInstanceType = InstanceType<typeof OlSource.ImageStatic>
