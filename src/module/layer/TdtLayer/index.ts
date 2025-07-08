import { isDefined, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { BaseTileLayerOptions } from '../../../utils/index'
import OlPackage, { OlLayer, OlSource } from '../../../source/index'
import BaseLayer from '../BaseLayer'
import { TdtLayerTypeUrls } from './layerSource'

/**
 * 天地图服务类
 * @class
 * @classdesc 快捷使用天地图相关的开发地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/8
 * @updateDate 2025/7/8
 */

export type TdtLayerTypeEnum = 'vec' | 'img' | 'ter'

export default class GaodeLayer extends BaseLayer {
    /**
     * 图层类型
     */
    tdtType: TdtLayerTypeEnum | null = null;

    constructor(type: TdtLayerTypeEnum, options?: BaseTileLayerOptions ) {
        super('Tdt', options);
        let _options = options || {};
        this.tdtType = type;
        this._layer = new OlLayer.Tile({
            source: new OlSource.XYZ({
                urls: TdtLayerTypeUrls[this.tdtType]
            })
        })
        this._initLayerEvent()
    }
}