import { isDefined, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { OlProjInstanceType, OMapTileLayerOptionsFinalType, XYZSourceOptionsFinalType } from '@/utils/index'
import { OlBaseTileLayerDefaultOptions } from '@/utils/index'
import OlPackage, { OlLayer, OlSource } from '../../../source/index'
import { Projection } from '../../../index'
import BaseLayer from '../BaseLayer/index'

let PACKAGE_NAME = 'TileLayer';
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 瓦片图层类
 * @class
 * @classdesc 基础的瓦片地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/9
 * @updateDate 2025/7/10
 */

export default class TileLayer extends BaseLayer {

    constructor(options: OMapTileLayerOptionsFinalType) {
        super('Tile', options)
        let _sourceOptions = isDefined(options.source) ? options.source : {}
        let _sourceProj: Projection = new Projection("EPSG:3857") // 默认值
        let projOptions = (_sourceOptions as XYZSourceOptionsFinalType).projection
        if(isDefined(projOptions)) {
            if(projOptions instanceof Projection) {
                _sourceProj = projOptions
            } else if(isString(projOptions)) {
                _sourceProj = new Projection(projOptions as string)
            } else {
                warn_(createMessage('constructor', '未知的投影类型'))
            }
        }
        let _sourceParams = {
            ..._sourceOptions,
            projection: (_sourceProj as Projection)._projection as OlProjInstanceType,
        }
        this._layer = new OlLayer.Tile({
            // TODO 这里不一定是XYZ
            source: new OlSource.XYZ({
                ..._sourceParams
            })
        })
        this._initLayerEvent()
    }
}