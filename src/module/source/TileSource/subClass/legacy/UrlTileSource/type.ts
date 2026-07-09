import { OlSource } from '../../../../../../source/index'
import type { Options as OlUrlTileSourceOptions } from 'ol/source/UrlTile'
import { DEFAULT_TILE_SOURCE_PARAMS, handleGetTileSourceParams, type OMapTileSourceTileGrid, type OMapTileSourceTileGridInstance } from '../../../type'
import type { OMapProjectionType } from '../../../../../core/Projection/type'

export type OMapUrlTileSourceType = InstanceType<typeof OlSource.UrlTile>

export type OMapUrlTileSourceParamsType = Omit<
    OlUrlTileSourceOptions,
    'projection' | 'tileGrid'
> & {
    projection?: OMapProjectionType;
    tileGrid?: OMapTileSourceTileGrid | OMapTileSourceTileGridInstance;
}

export const DEFAULT_URL_TILE_SOURCE_PARAMS: Partial<OMapUrlTileSourceParamsType> = {
    ...DEFAULT_TILE_SOURCE_PARAMS,
    attributionsCollapsible: true,
    wrapX: true,
    zDirection: 0
}

export function handleGetUrlTileSourceParams(params: OMapUrlTileSourceParamsType) {
    return handleGetTileSourceParams(params);
}
