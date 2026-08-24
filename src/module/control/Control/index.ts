import { isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/message'
import {
    type OMapControlTypeType,
    type OMapControlIdType,
    type OMapControlCommonType
} from './type'
import Event from '../../../module/util/Event/index'
import type { PropertiesType } from '../../../utils/type'

const PACKAGE_NAME = 'Control';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * @class Control
 * @classdesc 控制类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/9
 * @updateDate 2025/10/10
 */

export default class Control<T extends OMapControlCommonType = OMapControlCommonType> {
    id: OMapControlIdType = null;
    /**
     * 交互类型
     * @type {OMapControlTypeType}
     */
    type!: OMapControlTypeType;

    /**
     * 交互实例
     * @type {T}
     */
    _control!: T;

    /**
     * 交互事件
     * @type {Event}
     */
    events: Event = new Event();

    constructor(type: OMapControlTypeType) {
        this.type = type
    }

    /**
     * 获取控制实例
     */
    getControl(): OMapControlCommonType {
        return this._control
    }

    /**
     * 获取控制ID
     * @returns {OMapControlIdType} 控制ID
     */
    getId(): OMapControlIdType {
        return this.id
    }

    /**
     * 获取控制属性
     * @returns {Record<string, any>} 控制属性
     */
    getProperties(): PropertiesType {
        return this._control.getProperties()
    }

    /**
     * 设置控制属性
     * @param properties 控制属性
     */
    setProperties(properties: PropertiesType) {
        this._control.setProperties(properties)
    }

}
