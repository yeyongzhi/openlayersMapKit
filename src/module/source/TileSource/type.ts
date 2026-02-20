import { isDefined, isNumber } from '../../../utils/index';
import { OlSource } from "../../../source/index";
import type { ManualOmit } from "../../../utils/type";
import {
  type OMapSourceParamsType,
  DEFAULT_SOURCE_PARAMS,
  type OMapSourceParamsCommonKey,
  handleGetSourceParams
} from "../Source/type";
import {
  type OMapTileGridOptionsType,
  handleGetTileGridParams
} from '../tileGrid/TileGrid/type'

export type OMapTileSourceType = OlSource.Tile;
export type OlTileSourceParamsType = ConstructorParameters<
  typeof OlSource.Tile
>[0];
export type CustOlTileSourceParamsType = ManualOmit<
  OlTileSourceParamsType,
  OMapSourceParamsCommonKey
>;

export type OMapTileSourceParamsType = OMapSourceParamsType & {
  cacheSize?: number;
  tilePixelRatio?: number;
  tileGrid?: OMapTileGridOptionsType;
  transition?: number;
  key?: string;
  zDirection: number;
};

export function handleGetTileSourceParams(params: OMapTileSourceParamsType) {
    let _params = {
      ...params,
      ...handleGetSourceParams(params),
    };
    _params.tileGrid = isDefined(_params.tileGrid) ? handleGetTileGridParams(_params.tileGrid) : undefined;
    return _params
}

export const DEFAULT_TILE_SOURCE_PARAMS: OMapTileSourceParamsType =
  Object.assign({}, DEFAULT_SOURCE_PARAMS, {
    zDirection: 0,
  });
