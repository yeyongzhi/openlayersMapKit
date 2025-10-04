import { defaultValue, isDefined, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
// import type { OlProjInstanceType, OMapTileLayerOptionsFinalType, XYZSourceOptionsFinalType } from '@/utils/index'
// import { OlBaseTileLayerDefaultOptions } from '@/utils/index'
import OlPackage, { OlLayer, OlSource } from '../../../source/index'
import { Projection } from '../../../index'
import BaseLayer from '../BaseLayer/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetColorValue } from '../../basic/Color/handle'
import {
    type OMapTileLayerParamsType,
    DEFAULT_TILE_LAYER_PARAMS
} from './type'

let PACKAGE_NAME = 'TileLayer';
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 瓦片图层类
 * @class
 * @classdesc 基础的瓦片地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/9
 * @updateDate 2025/10/1
 */

export default class TileLayer extends BaseLayer {

    constructor(options: OMapTileLayerParamsType) {
        super('Tile', defaultValue(options, {}))
        if(!isDefined(options.source)) {
            error_(createMessage('constructor', 'source参数是必须的'))
            return;
        }
        let _layerParams = Object.assign({}, {
            ...DEFAULT_TILE_LAYER_PARAMS
        }, {
            ...options,
            source: undefined,
            map: undefined
        })
        let _sourceOptions = defaultValue(options.source, {})
        // let _sourceProj: Projection = new Projection("EPSG:3857") // 默认值
        // let projOptions = (_sourceOptions as XYZSourceOptionsFinalType).projection
        // if(isDefined(projOptions)) {
        //     if(projOptions instanceof Projection) {
        //         _sourceProj = projOptions
        //     } else if(isString(projOptions)) {
        //         _sourceProj = new Projection(projOptions as string)
        //     } else {
        //         warn_(createMessage('constructor', '未知的投影类型'))
        //     }
        // }
        // let _sourceParams = {
        //     ..._sourceOptions,
        //     projection: (_sourceProj as Projection)._projection as OlProjInstanceType,
        // }
        this._layer = new OlLayer.Tile({
            // 以下这些是基础属性赋值
            ..._layerParams,
            extent: isDefined(_layerParams.extent) ? handleGetExtentValue(_layerParams.extent) : undefined,
            background: isDefined(_layerParams.background) ? handleGetColorValue(_layerParams.background) : undefined,
        })
        this._initLayerEvent()
    }
}