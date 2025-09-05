import { isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { ProjectionUnitsType, OlProjOptionsType, OlProjInstanceType } from '../../../utils/index'
import{ OlInteraction } from '../../../source/index'
import type { OMapInteractionType, OlInteractionInstanceType } from './type'
import Event from '../../../module/util/Event/index'
import Map from '../../core/Map/index'
import VectorLayer from '../../layer/VectorLayer/index'

const PACKAGE_NAME = 'Interaction';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 交互类
 * @class Interaction
 * @classdesc 交互类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/8/25
 * @updateDate 2025/9/2
 */

interface InteractionLike {
    type: OMapInteractionType | null;
    _interaction?: OlInteractionInstanceType;
    layer: VectorLayer | null;
    properties: Record<string, any>;
    active: boolean;
    events: Event;
    map?: Map;
}

interface InteractionInitialized {
    type: OMapInteractionType | null;
    _interaction: OlInteractionInstanceType;
    layer: VectorLayer | null;
    properties: Record<string, any>;
    active: boolean;
    events: Event;
    map?: Map;
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

    /**
     * 交互所需要的图层
     * @type {VectorLayer} layer
     */
    layer: VectorLayer | null = null;
    /**
     * 交互属性
     * @type {Record<string, any>} 
     */
    properties: Record<string, any> = {};

    /**
     * 交互是否激活
     * @param type 
     */
    active: boolean = false;
    /**
     * 交互事件
     * @type {Event}
     */
    events: Event = new Event();

    map?: Map;

    constructor(type: OMapInteractionType) {
        this.type = type;
    }

    protected initInteractionEvent() {
        if (!this._isInitialized('initInteractionEvent')) return;
        this._interaction.on("change:active", (e) => {
            if(e.type === 'change:active') {
                this.active = (this.getActive() as boolean)
            }
        })
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

    /**
     * 获取交互属性
     * @returns {Record<string, any>} 交互属性
     */
    getProperties(): Record<string, any> {
        return this.properties
    }

    /**
     * 设置交互属性
     * @param properties 交互属性
     */
    setProperties(properties: Record<string, any>): void {
        if (!this._isInitialized('getInteraction')) return;
        this._interaction.setProperties(properties)
        this.properties = properties
    }

    /**
     * 返回交互中涉及的当前指针数，例如，当使用两个手指时为 2。
     * @returns {number | undefined} 指针数
     */
    getPointerCount(): number | undefined {
        if (!this._isInitialized('getInteraction')) return;
        return this._interaction.getPointerCount()
    }

    getLayer(): undefined | VectorLayer | null {
        if (!this._isInitialized('getInteraction')) return;
        return this.layer
    }

    setMap(map: Map) {
        this.map = map
    }

}