import { OlSource } from '../../../../../source/index'
import type { Options as OlBingMapsSourceOptions } from 'ol/source/BingMaps'

export type OMapBingMapsSourceType = InstanceType<typeof OlSource.BingMaps>

export type OMapBingMapsSourceParamsType = Omit<
  OlBingMapsSourceOptions,
  'projection' | 'tileGrid'
> & {
  projection?: never
  tileGrid?: never
}

/** @internal */
export const DEFAULT_BING_MAPS_SOURCE_PARAMS: Omit<
  OMapBingMapsSourceParamsType,
  'key' | 'imagerySet'
> = {
  culture: 'zh-CN',
  maxZoom: 19,
  wrapX: true,
  interpolate: true
}

/** @internal */
export function handleGetBingMapsSourceParams(params: OMapBingMapsSourceParamsType) {
  return {
    ...DEFAULT_BING_MAPS_SOURCE_PARAMS,
    ...params
  } as OMapBingMapsSourceParamsType
}
