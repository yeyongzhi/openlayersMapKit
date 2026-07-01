import { isDefined, isNumber, defaultValue } from "../../../../utils/index";
import { OlSource, OlTileGrid } from "../../../../source/index";
import { warn_, error_, getPackageMessage } from "../../../../utils/index";
import {
  type OMapTileGridOptionsType,
  type OMapTileGridType,
  DEFAULT_TILE_GRID,
  handleGetTileGridParams
} from "./type";

const PACKAGE_NAME = "TileGrid";
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * OMap TileGrid 类
 * @class
 * @classdesc TileGrid
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/30
 * @updateDate 2025/9/30
 */

export default class TileGrid {
  /**
   * 地图 TileGrid 实例
   */
  _tileGrid: OMapTileGridType;

  constructor(options: OMapTileGridOptionsType) {
    let params = handleGetTileGridParams(options);
    this._tileGrid = new OlTileGrid.TileGrid(
      Object.assign({}, DEFAULT_TILE_GRID, params),
    );
  }

  getTileGrid() {
    return this._tileGrid;
  }

  getExtent() {
    return this._tileGrid.getExtent();
  }

  getMaxZoom() {
    return this._tileGrid.getMaxZoom();
  }

  getMinZoom() {
    return this._tileGrid.getMinZoom();
  }

  getOrigin(zoom: number) {
    return this._tileGrid.getOrigin(zoom);
  }

  getResolution(zoom: number) {
    return this._tileGrid.getResolution(zoom);
  }

  getResolutions() {
    return this._tileGrid.getResolutions();
  }
}
