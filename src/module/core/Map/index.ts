import { isDefined, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import OlPackage from '../../../source/index'
import  type { MapContainerType, MapOptionsType } from '../../../utils/index';
import { Lnglat } from '../../basic/index';

const PACKAGE_NAME = 'Map';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 地图类
 * @class
 * @classdesc 核心地图类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/5
 * @updateDate 2025/7/5
 */

const defaultOptions: MapOptionsType = {
    center: [120.2, 30.3], // 中心点坐标
    zoom: 8, // 初始缩放级别
    layers: [], // 图层
    controls: [], // 控件
    interactions: [], // 交互
    overlays: [], // 覆盖物
}

export default class Map {
    _map: InstanceType<typeof OlPackage.Map> | null = null;
    _view: InstanceType<typeof OlPackage.View> | null = null;
    constructor(element: MapContainerType, options?: MapOptionsType) {
        let _options = options || defaultOptions;
        const view = new OlPackage.View({
            center: (_options.center instanceof Lnglat) ? _options.center._lnglat : _options.center, // 中心点坐标
            zoom: _options.zoom,
        })
        const map = new OlPackage.Map({
            target: element,
            view
        });
        this._view = view;
        this._map = map;
    }
}