import { type OlSource } from '../../../../../source/index'
import type {
  Loader,
  Options as OlImageTileSourceOptions,
  UrlGetter,
  UrlLike
} from 'ol/source/ImageTile'
import { handleGetSizeValue } from '../../../../basic/Size/handle'
import type { OMapSizeType } from '../../../../basic/Size/type'
import {
  DEFAULT_TILE_SOURCE_PARAMS,
  handleGetTileSourceParams,
  type OMapTileSourceTileGrid,
  type OMapTileSourceTileGridInstance
} from '../../type'
import type { OMapProjectionType } from '../../../../core/Projection/type'

export type OMapImageTileSourceType = InstanceType<typeof OlSource.ImageTile>
export type OMapImageTileSourceLoader = Loader
export type OMapImageTileSourceUrlGetter = UrlGetter
export type OMapImageTileSourceUrlLike = UrlLike

export type OMapImageTileSourceParamsType = Omit<
  OlImageTileSourceOptions,
  'projection' | 'tileGrid' | 'tileSize'
> & {
  projection?: OMapProjectionType
  tileGrid?: OMapTileSourceTileGrid | OMapTileSourceTileGridInstance
  tileSize?: number | OMapSizeType
}

/** @internal */
export const DEFAULT_IMAGE_TILE_SOURCE_PARAMS: OMapImageTileSourceParamsType = {
  ...DEFAULT_TILE_SOURCE_PARAMS,
  attributionsCollapsible: true,
  maxZoom: 42,
  minZoom: 0,
  tileSize: [256, 256],
  gutter: 0,
  wrapX: false,
  interpolate: true,
  crossOrigin: 'anonymous',
  zDirection: 0
}

/** @internal */
export function handleGetImageTileSourceParams(params: OMapImageTileSourceParamsType = {}) {
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
