import { OlSource } from '../../../../../source/index'
import type { Options as OlTileJSONSourceOptions } from 'ol/source/TileJSON'
import {
  handleGetTileSourceParams,
  type OMapTileSourceTileGrid,
  type OMapTileSourceTileGridInstance
} from '../../type'
import type { OMapProjectionType } from '../../../../core/Projection/type'

export type OMapTileJSONSourceType = InstanceType<typeof OlSource.TileJSON>

export type OMapTileJSONSourceParamsType = Omit<
  OlTileJSONSourceOptions,
  'projection' | 'tileGrid'
> & {
  projection?: OMapProjectionType
  tileGrid?: OMapTileSourceTileGrid | OMapTileSourceTileGridInstance
}

/** @internal */
export const DEFAULT_TILE_JSON_SOURCE_PARAMS: OMapTileJSONSourceParamsType = {
  crossOrigin: 'anonymous',
  wrapX: true,
  transition: 0,
  zDirection: 0
}

/** @internal */
export function handleGetTileJSONSourceParams(params: OMapTileJSONSourceParamsType = {}) {
  return handleGetTileSourceParams({
    ...DEFAULT_TILE_JSON_SOURCE_PARAMS,
    ...params
  })
}
