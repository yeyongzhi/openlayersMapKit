import { isDefined, isNumber } from "../../../../utils/index";
import { OlTileGrid } from "../../../../source/index";
import Extent from "../../../basic/Extent/index";
import { type OMapExtentType } from "../../../basic/Extent/type";
import { handleGetExtentValue } from "../../../basic/Extent/handle";
import Lnglat from "../../../basic/Lnglat/index";
import { type OMapCoordinateType } from "../../../basic/Lnglat/type";
import { handleGetLnglatValue } from "../../../basic/Lnglat/handle";
import Size from "../../../basic/Size/index";
import { type OMapSizeType } from "../../../basic/Size/type";
import { handleGetSizeValue } from "../../../basic/Size/handle";

export type OMapTileGridType = OlTileGrid.TileGrid;

export type OMapTileGridOptionsType = {
  extent?: OMapExtentType;
  minZoom: number;
  origin?: OMapCoordinateType;
  origins?: Array<OMapCoordinateType>;
  resolutions: number[];
  sizes?: Array<OMapSizeType>;
  tileSize?: number | OMapSizeType;
  tileSizes?: Array<number | OMapSizeType>;
};

export function handleGetTileGridParams(params: OMapTileGridOptionsType) {
  let _params = {
    ...params,
    extent: isDefined(params.extent)
      ? handleGetExtentValue(params.extent)
      : undefined,
    origin: isDefined(params.origin)
      ? handleGetLnglatValue(params.origin)
      : undefined,
    origins: isDefined(params.origins)
      ? params.origins.map((item) => {
          return handleGetLnglatValue(item);
        })
      : undefined,
    sizes: isDefined(params.sizes)
      ? params.sizes.map((item) => {
          return handleGetSizeValue(item);
        })
      : undefined,
    tileSize: isDefined(params.tileSize)
      ? isNumber(params.tileSize)
        ? params.tileSize
        : handleGetSizeValue(params.tileSize)
      : undefined,
    tileSizes: isDefined(params.tileSizes)
      ? params.tileSizes.map((item) => {
          return isNumber(item) ? item : handleGetSizeValue(item);
        })
      : undefined,
  };
  return _params;
}

export const DEFAULT_TILE_GRID = {
  minZoom: 0,
  tileSize: [256, 256],
};
