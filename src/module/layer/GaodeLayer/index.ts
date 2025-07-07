import { isDefined, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { BaseTileLayerOptions } from '../../../utils/index'
import OlPackage, { OlLayer, OlSource } from '../../../source/index'
import BaseLayer from '../BaseLayer'

import { GaodeLayerTypeUrls } from './layerSource'

/**
 * 高德地图类
 * @class
 * @classdesc 快捷使用高德地图相关的开发地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/5
 * @updateDate 2025/7/6
 */

export type GaodeLayerTypeEnum = 'vec' | 'img' | 'road'

interface GaodeLayerOptions {
    
}

export default class GaodeLayer extends BaseLayer {
    /**
     * 图层类型
     */
    gaodeType: GaodeLayerTypeEnum | null = null;

    constructor(type: GaodeLayerTypeEnum, options?: BaseTileLayerOptions ) {
        super('Gaode', options);
        let _options = options || {};
        this.gaodeType = type;
        this._layer = new OlLayer.Tile({
            source: new OlSource.XYZ({
                urls: GaodeLayerTypeUrls[this.gaodeType]
            })
        })
        this._initLayerEvent()
    }
}