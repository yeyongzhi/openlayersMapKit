import { OlSource } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { type OMapSourceParamsType, DEFAULT_SOURCE_PARAMS } from '../Source/type'
import Extent from '../../basic/Extent/index'
import { type OlExtentType } from '../../basic/Extent/type'
import Lnglat from '../../basic/Lnglat/index'
import { type OlCoordinateType } from '../../basic/Lnglat/type'
import Size from '../../basic/Size/index'
import { type OlSizeType } from '../../basic/Size/type'

export type OMapTileSourceTileGrid = {
    extent?: Extent | OlExtentType;
    minZoom: number;
    origin?: Lnglat | OlCoordinateType;
    origins?: Array<Lnglat | OlCoordinateType>;
    resolutions: number[];
    sizes: Array<Size | OlSizeType>
    tileSize?: number | Size | OlSizeType;
    tileSizes?: Array<number | Size | OlSizeType>;
}

export type OMapTileSourceParamsType = OMapSourceParamsType & {
    cacheSize?: number;
    tilePixelRatio?: number;
    tileGrid?: OMapTileSourceTileGrid;
    transition?: number;
    key?: string;
    zDirection: number;
}
export const DEFAULT_TILE_SOURCE_PARAMS: OMapTileSourceParamsType = Object.assign({}, DEFAULT_SOURCE_PARAMS, {
    zDirection: 0
})