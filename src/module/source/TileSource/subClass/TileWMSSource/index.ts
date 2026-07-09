import { isNumber } from '../../../../../utils/index'
import { error_, getPackageMessage } from '../../../../../utils/message'
import { OlSource } from '../../../../../source/index'
import Projection from '../../../../core/Projection/index'
import type { OMapCoordinateType } from '../../../../basic/Lnglat/type'
import { handleGetLnglatValue } from '../../../../basic/Lnglat/handle'
import TileSource from '../../index'
import {
    DEFAULT_TILE_WMS_SOURCE_PARAMS,
    handleGetTileWMSSourceParams,
    type OMapTileWMSSourceParamsType,
    type OMapTileWMSSourceType
} from './type'

const PACKAGE_NAME = 'TileWMSSource';
const createMessage = getPackageMessage(PACKAGE_NAME);

export default class TileWMSSource extends TileSource<OMapTileWMSSourceType> {

    constructor(params: OMapTileWMSSourceParamsType = DEFAULT_TILE_WMS_SOURCE_PARAMS) {
        super(new OlSource.TileWMS(handleGetTileWMSSourceParams({
            ...DEFAULT_TILE_WMS_SOURCE_PARAMS,
            ...params
        })))
    }

    getFeatureInfoUrl(
        coordinate: OMapCoordinateType,
        resolution: number,
        projection: Projection,
        params: Record<string, any>
    ): string | undefined {
        const olCoordinate = handleGetLnglatValue(coordinate);
        if (!olCoordinate || !isNumber(resolution) || !(projection instanceof Projection)) {
            error_(createMessage('getFeatureInfoUrl', 'coordinate、resolution或projection参数格式有误'));
        }
        return this._source.getFeatureInfoUrl(olCoordinate, resolution, projection.getProjection(), params);
    }

    getLegendUrl(resolution?: number, params?: Record<string, any>): string | undefined {
        return this._source.getLegendUrl(resolution, params);
    }

    getParams() {
        return this._source.getParams();
    }

    setParams(params: Record<string, any>) {
        this._source.setParams(params);
    }

    updateParams(params: Record<string, any>) {
        this._source.updateParams(params);
    }

}
