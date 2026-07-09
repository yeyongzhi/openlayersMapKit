import { defaultValue, isDefined } from '../../../utils/index';
import { warn_, getPackageMessage } from '../../../utils/index'
import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetColorValue } from '../../basic/Color/handle'
import TileWMSSource from '../../source/TileSource/subClass/TileWMSSource/index'
import {
    type OMapWMSLayerParamsType,
    DEFAULT_WMS_LAYER_PARAMS,
    DEFAULT_WMS_LAYER_SOURCE_PARAMS
} from './type'
import type { OMapTileWMSSourceParamsType } from '../../source/TileSource/subClass/TileWMSSource/type'

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
        let _source = new TileWMSSource(_sourceParams as OMapTileWMSSourceParamsType).getSource()
        this._layer = new OlLayer.Tile({
            ..._layerParams,
            extent: isDefined(_layerParams.extent) ? handleGetExtentValue(_layerParams.extent) : undefined,
            background: isDefined(_layerParams.background) ? handleGetColorValue(_layerParams.background) : undefined,
            source: _source
        })
        this._initLayerEvent()
    }
}
