import { type OlSource } from '../../../source/index'
import type {
  ImageSourceEvent,
  ImageSourceEventTypes,
  Options as OlImageSourceOptions
} from 'ol/source/Image'
import type { Loader as OlImageLoader } from 'ol/Image'
import { type OMapSourceProjectionType } from '../Source/type'

export type OMapImageSourceType = OlSource.Image
export type OMapImageSourceParamsType = Omit<OlImageSourceOptions, 'projection'> & {
  projection?: OMapSourceProjectionType
}
export type OMapImageSourceLoader = OlImageLoader
export type OMapImageSourceEventType = ImageSourceEventTypes
export type OMapImageSourceEvent = ImageSourceEvent
export type OMapImageSourceEventListener = (event: OMapImageSourceEvent) => void

export const IMAGE_SOURCE_EVENT_TYPES = {
  imageLoadStart: 'imageloadstart',
  imageLoadEnd: 'imageloadend',
  imageLoadError: 'imageloaderror'
} as const

export const DEFAULT_IMAGE_SOURCE_PARAMS: OMapImageSourceParamsType = {
  interpolate: true
}
