import { isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import{ OlInteraction } from '../../../source/index'
import { type OMapControlType, type OMapControlIdType } from './type'
import Event from '../../../module/util/Event/index'

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

export default class Control {
    id: OMapControlIdType | null = null;
    /**
     * 交互类型
     * @type {OMapControlType | null}
     */
    type: OMapControlType | null = null;

    /**
     * 交互实例
     * @type {OlInteractionInstanceType}
     */
    _control?: any;

    /**
     * 交互事件
     * @type {Event}
     */
    events: Event = new Event();

    // map: Map | null = null;

    constructor(type: OMapControlType) {
        this.type = type
    }

    protected _isInitialized(method: string) {
        if (!isDefined(this._control)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    /**
     * 获取控制实例
     */
    getControl(): any | undefined {
        return this._control
    }

    /**
     * 获取控制ID
     * @returns {number | string | null} 控制ID
     */
    getId(): number | string | null {
        return this.id
    }

    /**
     * 获取控制属性
     * @returns {Record<string, any>} 控制属性
     */
    getProperties(): Record<string, any> {
        return this._control.getProperties()
    }

    /**
     * 设置控制属性
     * @param properties 控制属性
     */
    setProperties(properties: Record<string, any>): void {
        this._control.setProperties(properties)
    }

}