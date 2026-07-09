import { defaultValue, isDefined } from '../../../utils/index';
import { warn_, getPackageMessage } from '../../../utils/index'
import { OlLayer } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetColorValue } from '../../basic/Color/handle'
import WMTSSource from '../../source/TileSource/subClass/WMTSSource/index'
import {
    type OMapWMTSLayerParamsType,
    DEFAULT_WMTS_LAYER_PARAMS,
    DEFAULT_WMTS_LAYER_SOURCE_PARAMS
} from './type'
import type { OMapWMTSSourceParamsType } from '../../source/TileSource/subClass/WMTSSource/type'

let PACKAGE_NAME = 'WMTSLayer';
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * WMTS图层类
 * @class WMTSLayer
 * @classdesc 基础的WMTS地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/2
 * @updateDate 2025/10/2
 */

export default class WMTSLayer extends BaseLayer {

    constructor(options: OMapWMTSLayerParamsType) {
        super('WMTS', defaultValue(options, {}))
        if (!isDefined(options.source)) {
            warn_(createMessage('constructor', '缺少source参数'))
            return;
        }
        let _layerParams = Object.assign({}, DEFAULT_WMTS_LAYER_PARAMS, {
            ...options,
            source: undefined,
            map: undefined
        })
        let _sourceParams = Object.assign({}, DEFAULT_WMTS_LAYER_SOURCE_PARAMS, {
            ...defaultValue(options.source, {}),
        })
        let _source = new WMTSSource(_sourceParams as OMapWMTSSourceParamsType).getSource()
        this._layer = new OlLayer.Tile({
            ..._layerParams,
            extent: isDefined(_layerParams.extent) ? handleGetExtentValue(_layerParams.extent) : undefined,
            background: isDefined(_layerParams.background) ? handleGetColorValue(_layerParams.background) : undefined,
            source: _source
        })
        this._initLayerEvent()
    }
}
