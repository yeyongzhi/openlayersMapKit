import { defaultValue, isDefined, isString, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import OlPackage, { OlLayer, OlSource, OlTileGrid } from '../../../source/index'
import { Projection } from '../../../index'
import { handleGetProjectionValue } from '../../core/Projection/handle'
import Lnglat from '../../basic/Lnglat/index'
import { type OMapCoordinateType, type OlCoordinateType } from '../../basic/Lnglat/type'
import Size from '../../basic/Size/index'
import { type OMapSizeType, type OlSizeType } from '../../basic/Size/type'
import { handleGetSizeValue } from '../../basic/Size/handle'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetLnglatValue } from '../../basic/Lnglat/handle';
import { handleGetColorValue } from '../../basic/Color/handle'
import {
    type OMapWMSLayerParamsType,
    DEFAULT_WMS_LAYER_PARAMS,
    type OMapWMSLayerSourceParamsType,
    DEFAULT_WMS_LAYER_SOURCE_PARAMS
} from './type'

let PACKAGE_NAME = 'WMSLayer';
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * WMS图层类
 * @class WMSLayer
 * @classdesc 基础的WMS地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/2
 * @updateDate 2025/10/2
 */

export default class WMSLayer extends BaseLayer {

    constructor(options: OMapWMSLayerParamsType) {
        super('WMS', defaultValue(options, {}))
        if (!isDefined(options.source)) {
            warn_(createMessage('constructor', '缺少source参数'))
            return;
        }
        let _layerParams = Object.assign({}, DEFAULT_WMS_LAYER_PARAMS, {
            ...options,
            source: undefined,
            map: undefined
        })
        let _sourceParams = Object.assign({}, DEFAULT_WMS_LAYER_SOURCE_PARAMS, {
            ...defaultValue(options.source, {}),
        })
        let _source = undefined
        if (isDefined(options.source)) {
            let _tileGrid = undefined
            if (isDefined(_sourceParams.tileGrid)) {
                _tileGrid = new OlTileGrid.TileGrid({
                    ..._sourceParams.tileGrid,
                    extent: handleGetExtentValue(_sourceParams.tileGrid.extent),
                    origin: handleGetLnglatValue(_sourceParams.tileGrid.origin),
                    origins: isDefined(_sourceParams.tileGrid.origins) ? _sourceParams.tileGrid.origins.map((item: OMapCoordinateType) => {
                        if (item instanceof Lnglat) {
                            return (handleGetLnglatValue(item) as OlCoordinateType)
                        }
                        return item as OlCoordinateType
                    }) : undefined,
                    sizes: isDefined(_sourceParams.tileGrid.sizes) ? _sourceParams.tileGrid.sizes.map((item: OMapSizeType) => {
                        if (item instanceof Size) {
                            return (handleGetSizeValue(item) as OlSizeType)
                        }
                        return item as OlSizeType
                    }) : undefined,
                    tileSize: isDefined(_sourceParams.tileGrid.tileSize) ? (isNumber(_sourceParams.tileGrid.tileSize) ? _sourceParams.tileGrid.tileSize : handleGetSizeValue(_sourceParams.tileGrid.tileSize)) : undefined,
                    tileSizes: isDefined(_sourceParams.tileGrid.tileSizes) ? _sourceParams.tileGrid.tileSizes.map((item: OMapSizeType) => {
                        if (item instanceof Size) {
                            return (handleGetSizeValue(item) as OlSizeType)
                        }
                        return item as OlSizeType
                    }) : undefined,
                })
            }
            _source = new OlSource.TileWMS({
                ..._sourceParams,
                projection: handleGetProjectionValue(_sourceParams.projection),
                tileGrid: _tileGrid
            })
        }
        this._layer = new OlLayer.Tile({
            ..._layerParams,
            extent: isDefined(_layerParams.extent) ? handleGetExtentValue(_layerParams.extent) : undefined,
            background: isDefined(_layerParams.background) ? handleGetColorValue(_layerParams.background) : undefined,
            source: _source
        })
        this._initLayerEvent()
    }
}