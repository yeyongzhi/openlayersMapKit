import { isDefined, isNumber } from '../../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../../utils/message'
import { OlSource } from "../../../../../source/index";
import TileSource from '../../index'
import {
    type OMapXYZSourceType,
    type OMapXYZSourceParamsType,
    handleGetXYZSourceParams,
    DEFAULT_XYZ_SOURCE_PARAMS
} from './type'

const PACKAGE_NAME = 'XYZSource';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * OMap XYZSource 类
 * @class
 * @classdesc XYZSource
 * @description 参考：https://openlayers.org/en/latest/apidoc/module-ol_source_XYZ-XYZ.html
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/2
 * @updateDate 2025/10/2
 */

export default class XYZSource extends TileSource<OMapXYZSourceType> {

    constructor(options: OMapXYZSourceParamsType) {
        super(options);
        const params = Object.assign({}, DEFAULT_XYZ_SOURCE_PARAMS, options);
        let _params = handleGetXYZSourceParams(params);
        const tileGrid = isDefined(this._tileGrid) ? this._tileGrid.getTileGrid() : undefined;
        this._source = new OlSource.XYZ({
            ..._params,
            tileGrid,
        });
    }

}