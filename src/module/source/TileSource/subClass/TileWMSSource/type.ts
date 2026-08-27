import { OlSource } from '../../../../../source/index'
import type { Options as OlTileWMSSourceOptions } from 'ol/source/TileWMS'
import {
  DEFAULT_TILE_SOURCE_PARAMS,
  handleGetTileSourceParams,
  type OMapTileSourceTileGrid,
  type OMapTileSourceTileGridInstance
} from '../../type'
import type { OMapProjectionType } from '../../../../core/Projection/type'

export type OMapTileWMSSourceType = InstanceType<typeof OlSource.TileWMS>

export type OMapTileWMSSourceParamsType = Omit<
  OlTileWMSSourceOptions,
  'projection' | 'tileGrid'
> & {
  projection?: OMapProjectionType
  tileGrid?: OMapTileSourceTileGrid | OMapTileSourceTileGridInstance
}

export const DEFAULT_TILE_WMS_SOURCE_PARAMS: OMapTileWMSSourceParamsType = {
  ...DEFAULT_TILE_SOURCE_PARAMS,
  attributionsCollapsible: true,
  interpolate: true,
  params: {},
  gutter: 0,
  hidpi: true,
  reprojectionErrorThreshold: 0.5,
  wrapX: true,
  transition: 250,
  zDirection: 0
}

export function handleGetTileWMSSourceParams(
  params: OMapTileWMSSourceParamsType = DEFAULT_TILE_WMS_SOURCE_PARAMS
) {
  return handleGetTileSourceParams(params)
}
