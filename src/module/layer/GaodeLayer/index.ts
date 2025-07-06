import { isDefined, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import OlPackage from '../../../source/index'

/**
 * 高德地图类
 * @class
 * @classdesc 快捷使用高德地图相关的开发地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/5
 * @updateDate 2025/7/5
 */

type GaodeLayerTypeEnum = 'vec' | 'img' | 'road'

interface GaodeLayerOptions {
    
}

export default class GaodeLayer {
    /**
     * 图层类型
     */
    type: GaodeLayerTypeEnum | null = null;

    constructor(type: GaodeLayerTypeEnum, options?: GaodeLayerOptions) {
        this.type = type;
    }
}