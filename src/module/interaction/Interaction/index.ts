import { isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { ProjectionUnitsType, OlProjOptionsType, OlProjInstanceType } from '../../../utils/index'
import{ OlInteraction } from '../../../source/index'
import type { OMapInteractionType, OlInteractionInstanceType } from './type'

const PACKAGE_NAME = 'Interaction';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 交互类
 * @class Interaction
 * @classdesc 交互类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/8/25
 * @updateDate 2025/8/25
 */

interface InteractionLike {
    type: OMapInteractionType | null;
    _interaction?: OlInteractionInstanceType;
}

interface InteractionInitialized {
    type: OMapInteractionType | null;
    _interaction: OMapInteractionType;
}

export default class Interaction implements InteractionLike {
    /**
     * 交互类型
     * @type {OMapInteractionType | null}
     */
    type: OMapInteractionType | null = null;

    /**
     * 交互实例
     * @type {OlInteractionInstanceType}
     */
    _interaction?: OlInteractionInstanceType;

    constructor(type: OMapInteractionType) {
        this.type = type;
    }

    protected _isInitialized(method: string): this is InteractionInitialized & this {
        if (!isDefined(this._interaction)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    /**
     * 返回当前交互是否处于激活状态
     * @returns 激活状态
     */
    getActive(): boolean | undefined {
        if (!this._isInitialized('getActive')) return;
        return this._interaction.getActive()
    }

    /**
     * 设置当前交互是否处于激活状态
     * @param active 激活状态
     */
    setActive(active: boolean): void {
        if (!this._isInitialized('setActive')) return;
        this._interaction.setActive(active)
    }

    /**
     * 获取交互实例
     * @returns 
     */
    getInteraction(): OlInteractionInstanceType | undefined {
        if (!this._isInitialized('getInteraction')) return;
        return this._interaction
    }

}