import { DEFAULT_TILE_SOURCE_PARAMS, type OMapTileSourceParamsType } from '../type'
import { type OMapSizeType } from '../../../basic/Size/type'
import { OlSource } from '../../../../source/index'
import Projection from '../../../core/Projection/index'

// export type OlImageTileSourceParamsType = ConstructorParameters<typeof OlSource.ImageTile>[0]

type CrossOriginAttribute = "anonymous" | "use-credentials"

export type OMapImageTileSourceParamsType = OMapTileSourceParamsType & {
    url?: string | string[] | ((x: number, y: number, z: number, options: any) => string);
    loader?: (z: number, x: number, y: number) => Promise<HTMLImageElement>;
    maxZoom: number;
    minZoom: number;
    tileSize: OMapSizeType;
    gutter: number;
    maxResolution?: number;
    crossOrigin: CrossOriginAttribute
}

export const DEFAULT_IMAGE_TILE_SOURCE_PARAMS: OMapImageTileSourceParamsType = Object.assign({}, DEFAULT_TILE_SOURCE_PARAMS, {
    maxZoom: 42,
    minZoom: 0,
    tileSize: [256, 256],
    gutter: 0,
    projection: new Projection("EPSG:3857"),
    wrapX: true,
    interpolate: true,
    crossOrigin: "anonymous" as CrossOriginAttribute,
    zDirection: 0
})

/**
 * 子类：
BingMaps
Google
IIIF
OGCMapTile
TileArcGISRest
TileJSON
TileWMS
WMTS
XYZ
Zoomify
 */
export type OlImageTileSourceInstanceType = InstanceType<typeof OlSource.ImageTile>
