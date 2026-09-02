import { type OlSource } from '../../../../../source/index'
import type { Options as OlTileArcGISRestSourceOptions } from 'ol/source/TileArcGISRest'
import {
  handleGetTileSourceParams,
  type OMapTileSourceTileGrid,
  type OMapTileSourceTileGridInstance
} from '../../type'
import type { OMapProjectionType } from '../../../../core/Projection/type'

export type OMapTileArcGISRestSourceType = InstanceType<typeof OlSource.TileArcGISRest>

export type OMapTileArcGISRestSourceParamsType = Omit<
  OlTileArcGISRestSourceOptions,
  'projection' | 'tileGrid'
> & {
  projection?: OMapProjectionType
  tileGrid?: OMapTileSourceTileGrid | OMapTileSourceTileGridInstance
}

/** @internal */
export const DEFAULT_TILE_ARCGIS_REST_SOURCE_PARAMS: OMapTileArcGISRestSourceParamsType = {
  crossOrigin: 'anonymous',
  wrapX: true,
  transition: 0,
  zDirection: 0
}

/** @internal */
export function handleGetTileArcGISRestSourceParams(
  params: OMapTileArcGISRestSourceParamsType = {}
) {
  return handleGetTileSourceParams({
    ...DEFAULT_TILE_ARCGIS_REST_SOURCE_PARAMS,
    ...params
  })
}
