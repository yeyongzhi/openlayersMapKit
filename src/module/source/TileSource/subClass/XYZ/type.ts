import { type OlSource } from '../../../../../source/index'
import type { Options as OlXYZSourceOptions } from 'ol/source/XYZ'
import { handleGetSizeValue } from '../../../../basic/Size/handle'
import type { OMapSizeType } from '../../../../basic/Size/type'
import {
  DEFAULT_TILE_SOURCE_PARAMS,
  handleGetTileSourceParams,
  type OMapTileSourceTileGrid,
  type OMapTileSourceTileGridInstance
} from '../../type'
import type { OMapProjectionType } from '../../../../core/Projection/type'

export type OMapXYZSourceType = InstanceType<typeof OlSource.XYZ>

export type OMapXYZSourceParamsType = Omit<
  OlXYZSourceOptions,
  'projection' | 'tileGrid' | 'tileSize'
> & {
  projection?: OMapProjectionType
  tileGrid?: OMapTileSourceTileGrid | OMapTileSourceTileGridInstance
  tileSize?: number | OMapSizeType
}

/** @internal */
export const DEFAULT_XYZ_SOURCE_PARAMS: OMapXYZSourceParamsType = {
  ...DEFAULT_TILE_SOURCE_PARAMS,
  attributionsCollapsible: true,
  interpolate: true,
  projection: 'EPSG:3857',
  reprojectionErrorThreshold: 0.5,
  maxZoom: 42,
  minZoom: 0,
  tilePixelRatio: 1,
  tileSize: [256, 256],
  gutter: 0,
  wrapX: true,
  transition: 250,
  zDirection: 0
}

/** @internal */
export function handleGetXYZSourceParams(params: OMapXYZSourceParamsType = {}) {
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
