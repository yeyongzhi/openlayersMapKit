import { isDefined, isNumber } from '../../../utils/index';
import { OlSource, OlTileGrid } from '../../../source/index'
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import Source from '../Source/index'
import { handleGetProjectionValue } from '../../core/Projection/handle'
import {
    type OMapTileSourceParamsType,
    type OMapTileSourceType,
    DEFAULT_TILE_SOURCE_PARAMS
} from './type'
import TileGrid from '../tileGrid/TileGrid/index'

const PACKAGE_NAME = 'TileSource';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * OMap TileSource 类
 * @class
 * @classdesc TileSource 类
 * @description 参考：https://openlayers.org/en/latest/apidoc/module-ol_source_Tile-TileSource.html
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/30
 * @updateDate 2025/9/30
 */

export default class TileSource<T extends OMapTileSourceType> extends Source<OMapTileSourceType> {

    /**
     * 赋值  TileSource 的 tileGrid
     */
    _tileGrid?: TileGrid;

    constructor(params: OMapTileSourceParamsType) {
        super(params);
        let _params = Object.assign({}, DEFAULT_TILE_SOURCE_PARAMS, params)
        if(isDefined(_params.tileGrid)) {
            this._tileGrid = new TileGrid(_params.tileGrid)
        }
    }

}