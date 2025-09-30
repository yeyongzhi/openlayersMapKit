import { isDefined, isNumber } from '../../../utils/index';
import { OlSource, OlTileGrid } from '../../../source/index'
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import Source from '../Source/index'
import Projection from '../../core/Projection/index'
import { type OlProjInstanceType } from '../../core/Projection/type'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetLnglatValue } from '../../basic/Lnglat/handle'
import { type OlCoordinateType } from '../../basic/Lnglat/type'
import { type OlSizeType } from '../../basic/Size/type'
import { handleGetSizeValue } from '../../basic/Size/handle'
import Size from '../../basic/Size/index'
import { type OMapTileSourceParamsType, DEFAULT_TILE_SOURCE_PARAMS } from './type'

const PACKAGE_NAME = 'TileSource';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * OMap TileSource 类
 * @class
 * @classdesc TileSource
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/30
 * @updateDate 2025/9/30
 */

export default class TileSource extends Source {

    constructor(params: OMapTileSourceParamsType) {
        super(params);
        let _params = Object.assign({}, DEFAULT_TILE_SOURCE_PARAMS, params)
        let _proj = undefined
        if(isDefined(_params.projection) && _params.projection instanceof Projection) {
            _proj = _params.projection.getProjection()
        }
        let tileGrid = undefined
        if(isDefined(_params.tileGrid)) {
            tileGrid = new OlTileGrid.TileGrid({
                ..._params.tileGrid,
                extent: handleGetExtentValue(_params.tileGrid.extent),
                origin: handleGetLnglatValue(_params.tileGrid.origin),
                origins: isDefined(_params.tileGrid.origins) ? _params.tileGrid.origins.map(item => {
                    return (handleGetLnglatValue(item) as OlCoordinateType)
                }) : undefined,
                sizes: isDefined(_params.tileGrid.sizes) ? _params.tileGrid.sizes.map(item => {
                    return (handleGetSizeValue(item) as OlSizeType)
                }) : undefined,
                tileSize: isDefined(_params.tileGrid.tileSize) ? (isNumber(_params.tileGrid.tileSize) ? _params.tileGrid.tileSize : handleGetSizeValue(_params.tileGrid.tileSize)) : undefined,
                tileSizes: isDefined(_params.tileGrid.tileSizes) ? _params.tileGrid.tileSizes.map(item => {
                    if(isNumber(item)) {
                        return item
                    }
                    return (handleGetSizeValue(item as Size | OlSizeType) as OlSizeType)
                }) : undefined,
            })
        }
        this._source = new OlSource.Tile({
            ..._params,
            projection: _proj as OlProjInstanceType,
            tileGrid
        })
    }

}