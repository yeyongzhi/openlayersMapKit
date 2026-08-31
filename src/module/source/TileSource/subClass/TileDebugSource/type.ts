import { OlSource } from '../../../../../source/index'
import type { Options as OlTileDebugSourceOptions } from 'ol/source/TileDebug'
import type TileSource from '../../index'
import {
  handleGetTileSourceParams,
  type OMapTileSourceTileGrid,
  type OMapTileSourceTileGridInstance,
  type OMapTileSourceType
} from '../../type'
import type { OMapProjectionType } from '../../../../core/Projection/type'

export type OMapTileDebugSourceType = InstanceType<typeof OlSource.TileDebug>

export type OMapTileDebugSourceParamsType = Omit<
  OlTileDebugSourceOptions,
  'projection' | 'tileGrid' | 'source'
> & {
  projection?: OMapProjectionType
  tileGrid?: OMapTileSourceTileGrid | OMapTileSourceTileGridInstance
  source?: TileSource<OMapTileSourceType> | OMapTileSourceType
}

/** @internal */
export const DEFAULT_TILE_DEBUG_SOURCE_PARAMS: OMapTileDebugSourceParamsType = {
  wrapX: true,
  zDirection: 0,
  template: 'z:{z} x:{x} y:{y}',
  color: 'grey'
}

/** @internal */
export function handleGetTileDebugSourceParams(params: OMapTileDebugSourceParamsType = {}) {
  const source =
    params.source && 'getSource' in params.source ? params.source.getSource() : params.source
  return {
    ...handleGetTileSourceParams(params),
    source
  }
}
