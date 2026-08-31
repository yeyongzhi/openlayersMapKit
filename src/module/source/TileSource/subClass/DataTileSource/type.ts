import { OlSource } from '../../../../../source/index'
import type {
  CrossOriginAttribute,
  Loader,
  LoaderOptions,
  Options as OlDataTileSourceOptions
} from 'ol/source/DataTile'
import { handleGetSizeValue } from '../../../../basic/Size/handle'
import type { OMapSizeType } from '../../../../basic/Size/type'
import {
  DEFAULT_TILE_SOURCE_PARAMS,
  handleGetTileSourceParams,
  type OMapTileSourceTileGrid,
  type OMapTileSourceTileGridInstance
} from '../../type'
import type { OMapProjectionType } from '../../../../core/Projection/type'

export type OMapDataTileSourceType = InstanceType<typeof OlSource.DataTile>
export type OMapDataTileSourceLoader = Loader
export type OMapDataTileSourceLoaderOptions = LoaderOptions
export type OMapDataTileSourceCrossOriginAttribute = CrossOriginAttribute

export type OMapDataTileSourceParamsType = Omit<
  OlDataTileSourceOptions,
  'projection' | 'tileGrid' | 'tileSize'
> & {
  projection?: OMapProjectionType
  tileGrid?: OMapTileSourceTileGrid | OMapTileSourceTileGridInstance
  tileSize?: number | OMapSizeType
}

/** @internal */
export const DEFAULT_DATA_TILE_SOURCE_PARAMS: OMapDataTileSourceParamsType = {
  ...DEFAULT_TILE_SOURCE_PARAMS,
  maxZoom: 42,
  minZoom: 0,
  tileSize: [256, 256],
  gutter: 0,
  bandCount: 4,
  crossOrigin: 'anonymous'
}

/** @internal */
export function handleGetDataTileSourceParams(params: OMapDataTileSourceParamsType = {}) {
  return {
    ...handleGetTileSourceParams(params),
    tileSize:
      typeof params.tileSize === 'number'
        ? params.tileSize
        : params.tileSize
          ? handleGetSizeValue(params.tileSize)
          : undefined
  }
}
