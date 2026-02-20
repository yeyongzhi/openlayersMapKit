import { isNumber } from '../../../../../../../utils/index'
import { type OMapSizeType, OlSizeType } from "../../../../../../basic/Size/type";
import { handleGetSizeValue } from "../../../../../../basic/Size/handle";
import { OlSource } from "../../../../../../../source/index";
import {
  type OMapTileSourceParamsType,
  DEFAULT_TILE_SOURCE_PARAMS,
  handleGetTileSourceParams
} from "../../../../type";

/**
 * 类型定义
 */
export type OMapImageTileType = OlSource.ImageTile;

export type SourceCrossOriginType = "anonymous" | "use-credentials";

/**
 * 参数定义
 */
export type OMapImageTileParamsType = OMapTileSourceParamsType & {
  url?: string | Array<string>;
  loader?: any;
  maxZoom: number;
  minZoom: number;
  tileSize: number | OMapSizeType;
  gutter: number;
  maxResolution?: number;
  crossOrigin: SourceCrossOriginType;
  referrerPolicy?: string;
};

/**
 * 默认值
 */
export const DEFAULT_IMAGE_TILE_PARAMS: OMapImageTileParamsType = Object.assign(
  {},
  DEFAULT_TILE_SOURCE_PARAMS,
  {
    maxZoom: 42,
    minZoom: 0,
    tileSize: [256, 256] as [number, number],
    gutter: 0,
    crossOrigin: "anonymous" as SourceCrossOriginType,
  },
);

export function handleGetImageTileSourceParams(params: OMapImageTileParamsType) {
  // let _params = {
  //   ...params,
  //   ...handleGetTileSourceParams(params),
  // };
  // _params.tileSize = isNumber(_params.tileSize) ? _params.tileSize : handleGetSizeValue(_params.tileSize);
  const _params = Object.assign(params, handleGetTileSourceParams(params), {
    tileSize: isNumber(params.tileSize) ? params.tileSize : handleGetSizeValue(params.tileSize),
  })
  return _params
}