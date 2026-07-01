import { isDefined, isNumber } from '../../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../../utils/message'
import { OlSource } from "../../../../../source/index";
import TileSource from '../../index'
import {
    type OMapDataTileSourceType,
    type OMapDataTileSourceParamsType,
    handleGetDataTileSourceParams,
    DEFAULT_DATA_TILE_SOURCE_PARAMS
} from './type'
import { handleGetSizeValue } from '@/module/basic/Size/handle';

const PACKAGE_NAME = 'DataTileSource';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * OMap DataTileSource 类
 * @class
 * @classdesc DataTileSource
 * @description 参考：https://openlayers.org/en/latest/apidoc/module-ol_source_Tile-TileSource.html
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/2
 * @updateDate 2025/10/2
 */

export default class DataTileSource extends TileSource<OMapDataTileSourceType> {

    constructor(options: OMapDataTileSourceParamsType) {
        super(options);
        const params = Object.assign({}, DEFAULT_DATA_TILE_SOURCE_PARAMS, options);
        let _params = handleGetDataTileSourceParams(params);
        const tileGrid = isDefined(this._tileGrid) ? this._tileGrid.getTileGrid() : undefined;
        this._source = new OlSource.DataTile({
            ..._params,
            tileGrid,
        });
    }

}