import { isDefined, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { OlMapInstanceType, OMapTileLayerOptionsFinalType } from '../../../utils/index'
import { OlLayer, OlSource } from '../../../source/index'
import BaseLayer from '../BaseLayer'
import { getTdtServiceUrl } from './layerSource'
import { MapToken } from '../../util/index'
import { type TdtLayerTypeEnum, type TdtLayerProjType, type TdtLayerProjTypeEnum } from './type'

let PACKAGE_NAME = 'TdtLayer';
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 天地图服务类
 * @class
 * @classdesc 快捷使用天地图相关的开发地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/8
 * @updateDate 2025/7/11
 */



export default class TdtLayer extends BaseLayer {
    /**
     * 图层类型
     */
    tdtType: TdtLayerTypeEnum | null = null;

    constructor(type: TdtLayerTypeEnum, options?: OMapTileLayerOptionsFinalType & TdtLayerProjType) {
        super('Tdt', options);
        if (!isDefined(MapToken.tdt)) {
            warn_(createMessage('constructor', '缺少天地图key，请提前申明'))
            return;
        }
        if (!isDefined(type)) {
            error_(createMessage('constructor', '缺少参数天地图图层类型'))
            return;
        }
        let _layeroptions = (options as OMapTileLayerOptionsFinalType) || {};
        delete _layeroptions.source
        // let _map = _layeroptions.map as OlMapInstanceType | undefined;
        this.tdtType = type;
        this._layer = new OlLayer.Tile({
            ..._layeroptions,
            extent: isDefined(_layeroptions.extent) ? _layeroptions.extent?._extent : undefined,
            map: isDefined(_layeroptions.map) ? _layeroptions.map?._map as OlMapInstanceType : undefined,
            background: isDefined(_layeroptions.background) ? _layeroptions.background?._color : undefined,
            source: new OlSource.XYZ({
                url: getTdtServiceUrl(type, (options?.proj as TdtLayerProjTypeEnum) || 'w')
            })
        })
        this._initLayerEvent()
    }
}