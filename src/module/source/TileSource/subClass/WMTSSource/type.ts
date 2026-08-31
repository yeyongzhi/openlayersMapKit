import { OlSource, OlTileGrid } from '../../../../../source/index'
import type { Options as OlWMTSSourceOptions, RequestEncoding } from 'ol/source/WMTS'
import { handleGetProjectionValue } from '../../../../core/Projection/handle'
import type { OMapProjectionType } from '../../../../core/Projection/type'
import type { OMapCoordinateType } from '../../../../basic/Lnglat/type'
import type { OMapExtentType } from '../../../../basic/Extent/type'
import type { OMapSizeType } from '../../../../basic/Size/type'
import { handleGetExtentValue } from '../../../../basic/Extent/handle'
import { handleGetLnglatValue } from '../../../../basic/Lnglat/handle'
import { handleGetSizeValue } from '../../../../basic/Size/handle'

export type OMapWMTSSourceType = InstanceType<typeof OlSource.WMTS>
export type OMapWMTSSourceRequestEncoding = RequestEncoding
export type OMapWMTSSourceTileGridInstance = InstanceType<typeof OlTileGrid.WMTS>

export type OMapWMTSSourceTileGrid = {
  extent?: OMapExtentType
  origin?: OMapCoordinateType
  origins?: Array<OMapCoordinateType>
  resolutions: number[]
  matrixIds: string[]
  sizes?: Array<OMapSizeType>
  tileSize?: number | OMapSizeType
  tileSizes?: Array<number | OMapSizeType>
}

export type OMapWMTSSourceParamsType = Omit<OlWMTSSourceOptions, 'projection' | 'tileGrid'> & {
  projection?: OMapProjectionType
  tileGrid: OMapWMTSSourceTileGrid | OMapWMTSSourceTileGridInstance
}

/** @internal */
export const DEFAULT_WMTS_SOURCE_PARAMS: Partial<OMapWMTSSourceParamsType> = {
  attributionsCollapsible: true,
  interpolate: true,
  reprojectionErrorThreshold: 0.5,
  requestEncoding: 'KVP',
  format: 'image/jpeg',
  version: '1.0.0',
  tilePixelRatio: 1,
  wrapX: false,
  zDirection: 0
}

/** @internal */
export function handleGetWMTSSourceParams(params: OMapWMTSSourceParamsType) {
  return {
    ...params,
    projection: handleGetProjectionValue(params.projection),
    tileGrid: handleGetWMTSTileGrid(params.tileGrid)
  }
}

/** @internal */
export function handleGetWMTSTileGrid(tileGrid: OMapWMTSSourceParamsType['tileGrid']) {
  if (tileGrid instanceof OlTileGrid.WMTS) {
    return tileGrid
  }
  return new OlTileGrid.WMTS({
    ...tileGrid,
    extent: tileGrid.extent ? handleGetExtentValue(tileGrid.extent) : undefined,
    origin: tileGrid.origin ? handleGetLnglatValue(tileGrid.origin) : undefined,
    origins: tileGrid.origins?.map((item) => handleGetLnglatValue(item)),
    sizes: tileGrid.sizes?.map((item) => handleGetSizeValue(item)),
    tileSize:
      typeof tileGrid.tileSize === 'number'
        ? tileGrid.tileSize
        : tileGrid.tileSize
          ? handleGetSizeValue(tileGrid.tileSize)
          : undefined,
    tileSizes: tileGrid.tileSizes?.map((item) =>
      typeof item === 'number' ? item : handleGetSizeValue(item)
    )
  })
}
