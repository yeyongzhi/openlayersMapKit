import { isDefined, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import { type OMapSourceParamsType, type OMapSourceInstanceType } from './type'

const PACKAGE_NAME = 'Source';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * OMap Source 基类
 * @class
 * @classdesc 所有Source的基类，提供了一些通用的方法和属性。
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/30
 * @updateDate 2025/9/30
 */

export default class Source {
    
    _source: OMapSourceInstanceType | null = null

    constructor(params: OMapSourceParamsType) {
        
    }

}