import { defaultValue, isDefined, isString, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import OlPackage, { OlLayer, OlSource, OlTileGrid } from '../../../source/index'
import { handleGetProjectionValue } from '../../core/Projection/handle'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetLnglatValue } from '../../basic/Lnglat/handle';
import { handleGetColorValue } from '../../basic/Color/handle'
import {
    type OMapImageLayerParamsType,
    DEFAULT_IMAGE_LAYER_PARAMS,
    type OMapImageLayerSourceParamsType,
    DEFAULT_IMAGE_LAYER_SOURCE_PARAMS
} from './type'

let PACKAGE_NAME = 'ImageLayer';
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 图片图层类
 * @class ImageLayer
 * @classdesc 基础的图片地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/31
 * @updateDate 2025/10/31
 */

export default class ImageLayer extends BaseLayer {

    constructor(options: OMapImageLayerParamsType) {
        super('Image', defaultValue(options, {}))
        if (!isDefined(options.source)) {
            warn_(createMessage('constructor', '缺少source参数'))
            return;
        }
        let _layerParams = Object.assign({}, DEFAULT_IMAGE_LAYER_PARAMS, {
            ...options,
            source: undefined,
            map: undefined
        })
        let _sourceParams = Object.assign({}, DEFAULT_IMAGE_LAYER_SOURCE_PARAMS, {
            ...defaultValue(options.source, {}),
        })
        let _source = undefined
        if (isDefined(options.source)) {
            _source = new OlSource.WMTS({
                ..._sourceParams,
                projection: handleGetProjectionValue(_sourceParams.projection)
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