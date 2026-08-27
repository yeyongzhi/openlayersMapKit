import { OlSource } from '../../../../../../source/index'
import type { Options as OlTileImageSourceOptions } from 'ol/source/TileImage'
import {
  DEFAULT_URL_TILE_SOURCE_PARAMS,
  type OMapUrlTileSourceParamsType
} from '../UrlTileSource/type'
import {
  handleGetTileSourceParams,
  type OMapTileSourceTileGrid,
  type OMapTileSourceTileGridInstance
} from '../../../type'
import type { OMapProjectionType } from '../../../../../core/Projection/type'

export type OMapTileImageSourceType = InstanceType<typeof OlSource.TileImage>

export type OMapTileImageSourceParamsType = Omit<
  OlTileImageSourceOptions,
  'projection' | 'tileGrid'
> & {
  projection?: OMapProjectionType
  tileGrid?: OMapTileSourceTileGrid | OMapTileSourceTileGridInstance
}

export const DEFAULT_TILE_IMAGE_SOURCE_PARAMS: Partial<OMapTileImageSourceParamsType> = {
  ...(DEFAULT_URL_TILE_SOURCE_PARAMS as Partial<OMapUrlTileSourceParamsType>),
  interpolate: true,
  reprojectionErrorThreshold: 0.5,
  tilePixelRatio: 1
}

export function handleGetTileImageSourceParams(params: OMapTileImageSourceParamsType) {
  return handleGetTileSourceParams(params)
}
