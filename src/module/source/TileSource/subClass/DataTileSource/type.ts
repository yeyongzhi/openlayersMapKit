import { isNumber } from '../../../../../utils/index'
import { type OMapSizeType, OlSizeType } from "../../../../basic/Size/type";
import { handleGetSizeValue } from "../../../../basic/Size/handle";
import { OlSource } from "../../../../../source/index";
import {
  type OMapTileSourceParamsType,
  DEFAULT_TILE_SOURCE_PARAMS,
  handleGetTileSourceParams
} from "../../type";

/**
 * 类型定义
 */
export type OMapDataTileSourceType = OlSource.DataTile;

export type SourceCrossOriginType = "anonymous" | "use-credentials";

/**
 * 参数定义
 */
export type OMapDataTileSourceParamsType = OMapTileSourceParamsType & {
    loader?: any;
    maxZoom: number;
    minZoom: number;
    tileSize: number | OMapSizeType;
    gutter: number;
    maxResolution?: number;
    bandCount: number;
    crossOrigin: SourceCrossOriginType;
    referrerPolicy?: string;
};

/**
 * 默认值
 */
export const DEFAULT_DATA_TILE_SOURCE_PARAMS: OMapDataTileSourceParamsType = Object.assign(
  {},
  DEFAULT_TILE_SOURCE_PARAMS,
  {
    maxZoom: 42,
    minZoom: 0,
    tileSize: 256,
    gutter: 0,
    bandCount: 4,
    crossOrigin: "anonymous" as SourceCrossOriginType,
  },
);

export function handleGetDataTileSourceParams(params: OMapDataTileSourceParamsType) {
  const _params = Object.assign(params, handleGetTileSourceParams(params), {
    tileSize: isNumber(params.tileSize) ? params.tileSize : handleGetSizeValue(params.tileSize),
  })
  return _params
}