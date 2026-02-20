import { isDefined, isNumber } from '../../../../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../../../../utils/message'
import { OlSource } from "../../../../../../../source/index";
import TileSource from '../../../../index'
import {
    type OMapImageTileType,
    type OMapImageTileParamsType,
    DEFAULT_IMAGE_TILE_PARAMS,
    handleGetImageTileSourceParams
} from './type'
import { handleGetSizeValue } from '@/module/basic/Size/handle';

const PACKAGE_NAME = 'ImageTile';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * OMap ImageTile 类
 * @class
 * @classdesc ImageTile
 * @description 参考：https://openlayers.org/en/latest/apidoc/module-ol_source_Tile-TileSource.html
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/2
 * @updateDate 2025/10/2
 */

export default class ImageTileSource extends TileSource<OMapImageTileType> {

    constructor(options: OMapImageTileParamsType) {
        super(options);
        const params = Object.assign({}, DEFAULT_IMAGE_TILE_PARAMS, options);
        let _params = handleGetImageTileSourceParams(params);
        const tileGrid = isDefined(this._tileGrid) ? this._tileGrid.getTileGrid() : undefined;
        this._source = new OlSource.ImageTile({
            ..._params,
            tileGrid,
        });
    }

}