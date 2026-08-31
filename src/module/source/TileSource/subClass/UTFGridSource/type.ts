import { OlSource } from '../../../../../source/index'
import type { Options as OlUTFGridSourceOptions, UTFGridJSON } from 'ol/source/UTFGrid'
import type { Config as TileJSONConfig } from 'ol/source/TileJSON'

export type OMapUTFGridSourceType = InstanceType<typeof OlSource.UTFGrid>
export type OMapUTFGridJSON = UTFGridJSON
export type OMapUTFGridTileJSONConfig = TileJSONConfig
export type OMapUTFGridSourceParamsType = OlUTFGridSourceOptions
export type OMapUTFGridDataCallback = (data: unknown) => void

/** @internal */
export const DEFAULT_UTF_GRID_SOURCE_PARAMS: Partial<OMapUTFGridSourceParamsType> = {
  preemptive: true,
  jsonp: false,
  wrapX: true,
  zDirection: 0
}

/** @internal */
export function handleGetUTFGridSourceParams(params: OMapUTFGridSourceParamsType) {
  return params
}
