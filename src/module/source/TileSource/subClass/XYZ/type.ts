import { isNumber } from "../../../../../utils/index";
import { type OMapSizeType, OlSizeType } from "../../../../basic/Size/type";
import { handleGetSizeValue } from "../../../../basic/Size/handle";
import { OlSource } from "../../../../../source/index";
import {
  type OMapTileSourceParamsType,
  DEFAULT_TILE_SOURCE_PARAMS,
  handleGetTileSourceParams,
} from "../../type";

/**
 * 类型定义
 */
export type OMapXYZSourceType = OlSource.XYZ;

export type SourceCrossOriginType = "anonymous" | "use-credentials";

/**
 * 参数定义
 */
export type OMapXYZSourceParamsType = OMapTileSourceParamsType & {
  cacheSize?: number;
  crossOrigin: SourceCrossOriginType;
  referrerPolicy?: string;
  reprojectionErrorThreshold: number;
  loader?: any;
  maxZoom: number;
  minZoom: number;
  maxResolution?: number;
  tileLoadFunction?: any;
  tileSize: number | OMapSizeType;
  gutter: number;
  tileUrlFunction?: any;
  url?: string;
  urls?: Array<string>;
};

/**
 * 默认值
 */
export const DEFAULT_XYZ_SOURCE_PARAMS: OMapXYZSourceParamsType = Object.assign(
  {},
  DEFAULT_TILE_SOURCE_PARAMS,
  {
    attributionsCollapsible: true,
    interpolate: true,
    reprojectionErrorThreshold: 0.5,
    maxZoom: 42,
    minZoom: 0,
    tilePixelRatio: 1,
    gutter: 0,
    tileSize: 256,
    crossOrigin: "anonymous" as SourceCrossOriginType,
    transition: 250,
    zDirection: 0,
  },
);

export function handleGetXYZSourceParams(params: OMapXYZSourceParamsType) {
  const _params = Object.assign(params, handleGetTileSourceParams(params), {
    tileSize: isNumber(params.tileSize) ? params.tileSize : handleGetSizeValue(params.tileSize),
  });
  return _params;
}
