import { OlSource, OlTileGrid } from '../../../source/index'
import type Tile from 'ol/Tile'
import type { TileCoord } from 'ol/tilecoord'
import type { TileSourceEvent, Options as OlTileSourceOptions } from 'ol/source/Tile'
import type { TileSourceEventTypes } from 'ol/source/TileEventType'
import type { Options as OlTileGridOptions } from 'ol/tilegrid/TileGrid'
import type { OMapCoordinateType, OlCoordinateType } from '../../basic/Lnglat/type'
import type { OMapExtentType, OlExtentType } from '../../basic/Extent/type'
import type { OMapSizeType, OlSizeType } from '../../basic/Size/type'
import { handleGetLnglatValue } from '../../basic/Lnglat/handle'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetSizeValue } from '../../basic/Size/handle'
import { handleGetProjectionValue } from '../../core/Projection/handle'
import type { OlProjInstanceType, OlProjType, OMapProjectionType } from '../../core/Projection/type'

export type OMapTileSourceTile = Tile
export type OMapTileSourceTileCoord = TileCoord
export type OMapTileSourceType = OlSource.Tile<OMapTileSourceTile>
export type OMapTileSourceEventType = TileSourceEventTypes
export type OMapTileSourceEvent = TileSourceEvent
export type OMapTileSourceEventListener = (event: OMapTileSourceEvent) => void
export type OMapTileSourceTileGridInstance = OlTileGrid.TileGrid

export type OMapTileSourceTileGrid = Omit<
  OlTileGridOptions,
  'extent' | 'origin' | 'origins' | 'sizes' | 'tileSize' | 'tileSizes'
> & {
  extent?: OMapExtentType
  origin?: OMapCoordinateType
  origins?: Array<OMapCoordinateType>
  sizes?: Array<OMapSizeType>
  tileSize?: number | OMapSizeType
  tileSizes?: Array<number | OMapSizeType>
}

export type OlTileSourceTileGridOptions = Omit<
  OlTileGridOptions,
  'extent' | 'origin' | 'origins' | 'sizes' | 'tileSize' | 'tileSizes'
> & {
  extent?: OlExtentType
  origin?: OlCoordinateType
  origins?: Array<OlCoordinateType>
  sizes?: Array<OlSizeType>
  tileSize?: number | OlSizeType
  tileSizes?: Array<number | OlSizeType>
}

export type OMapTileSourceParamsType = Omit<OlTileSourceOptions, 'projection' | 'tileGrid'> & {
  projection?: OMapProjectionType
  tileGrid?: OMapTileSourceTileGrid | OMapTileSourceTileGridInstance
}

export type OlTileSourceParamsType = Omit<OlTileSourceOptions, 'tileGrid'> & {
  tileGrid?: OMapTileSourceTileGridInstance
}

export const TILE_SOURCE_EVENT_TYPES = {
  tileLoadStart: 'tileloadstart',
  tileLoadEnd: 'tileloadend',
  tileLoadError: 'tileloaderror'
} as const

/** @internal */
export const DEFAULT_TILE_SOURCE_PARAMS: OMapTileSourceParamsType = {
  attributionsCollapsible: true,
  interpolate: false,
  wrapX: false,
  zDirection: 0
}

/** @internal */
export function handleGetTileGridParams(
  params: OMapTileSourceTileGrid
): OlTileSourceTileGridOptions {
  return {
    ...params,
    extent: params.extent ? handleGetExtentValue(params.extent) : undefined,
    origin: params.origin ? handleGetLnglatValue(params.origin) : undefined,
    origins: params.origins?.map((item) => handleGetLnglatValue(item)),
    sizes: params.sizes?.map((item) => handleGetSizeValue(item)),
    tileSize:
      typeof params.tileSize === 'number'
        ? params.tileSize
        : params.tileSize
          ? handleGetSizeValue(params.tileSize)
          : undefined,
    tileSizes: params.tileSizes?.map((item) =>
      typeof item === 'number' ? item : handleGetSizeValue(item)
    )
  }
}

/** @internal */
export function handleGetTileGrid(tileGrid?: OMapTileSourceParamsType['tileGrid']) {
  if (!tileGrid) {
    return undefined
  }
  if (tileGrid instanceof OlTileGrid.TileGrid) {
    return tileGrid
  }
  return new OlTileGrid.TileGrid(handleGetTileGridParams(tileGrid))
}

/** @internal */
export function handleGetTileSourceParams<
  T extends {
    projection?: OMapProjectionType
    tileGrid?: OMapTileSourceTileGrid | OMapTileSourceTileGridInstance
  }
>(
  params: T
): Omit<T, 'projection' | 'tileGrid'> & {
  projection?: OlProjType | OlProjInstanceType
  tileGrid?: OMapTileSourceTileGridInstance
}
export function handleGetTileSourceParams(params?: undefined): OlTileSourceParamsType

export function handleGetTileSourceParams(
  params: Record<string, unknown> & {
    projection?: OMapProjectionType
    tileGrid?: OMapTileSourceTileGrid | OMapTileSourceTileGridInstance
  } = {}
) {
  return {
    ...params,
    projection: handleGetProjectionValue(params.projection),
    tileGrid: handleGetTileGrid(params.tileGrid)
  }
}
