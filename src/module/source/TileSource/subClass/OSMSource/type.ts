import { OlSource } from '../../../../../source/index'
import type { Options as OlOSMSourceOptions } from 'ol/source/OSM'

export type OMapOSMSourceType = InstanceType<typeof OlSource.OSM>

export type OMapOSMSourceParamsType = OlOSMSourceOptions

/** @internal */
export const DEFAULT_OSM_SOURCE_PARAMS: OMapOSMSourceParamsType = {
  crossOrigin: 'anonymous',
  maxZoom: 19,
  wrapX: true,
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
}

/** @internal */
export function handleGetOSMSourceParams(params: OMapOSMSourceParamsType = {}) {
  return {
    ...DEFAULT_OSM_SOURCE_PARAMS,
    ...params
  }
}
