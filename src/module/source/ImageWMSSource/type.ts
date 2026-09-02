import { type OlSource } from '../../../source/index'
import type { Options as OlImageWMSSourceOptions } from 'ol/source/ImageWMS'
import { handleGetSourceParams } from '../Source/type'
import type { OMapSourceProjectionType } from '../Source/type'

export type OMapImageWMSSourceType = InstanceType<typeof OlSource.ImageWMS>

export type OMapImageWMSSourceParamsType = Omit<OlImageWMSSourceOptions, 'projection'> & {
  projection?: OMapSourceProjectionType
}

/** @internal */
export const DEFAULT_IMAGE_WMS_SOURCE_PARAMS: OMapImageWMSSourceParamsType = {
  crossOrigin: 'anonymous',
  ratio: 1,
  interpolate: true
}

/** @internal */
export function handleGetImageWMSSourceParams(params: OMapImageWMSSourceParamsType = {}) {
  return handleGetSourceParams({
    ...DEFAULT_IMAGE_WMS_SOURCE_PARAMS,
    ...params
  })
}
