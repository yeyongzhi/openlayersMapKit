import { isDefined, defaultValue, isFunction, isNumber, isString } from '../../../utils/index';
import { isExtentType } from '../../../utils/dataType';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import { commonMessage } from "../../../utils/message";
import Interaction from '../Interaction/index'
import Extent from '../../basic/Extent/index'
import { isValidExtent, type OlExtentType, type OMapExtentType } from '../../basic/Extent/type'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetStyleValue } from '../../basic/Style/handle'
import { type OlStyleLike } from '../../basic/Style/type'
import { OlInteraction, OlEvent } from '../../../source/index'
import {
    type OMapExtentParamsType,
    type OlInteractionExtentInstanceType,
    type OMapInteractionExtentEventType,
    isOMapInteractionExtentEventType,
    type OMapInteractionExtentType
} from './type'
import type { EventIdType, OMapEventsKeyType } from '../../util/Event/type'
import { handleInteractionExtentEvent } from './handle'

const PACKAGE_NAME = 'InteractionExtent';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 拖动地图类
 * @class InteractionExtent
 * @classdesc 拖动绘制选框范围，可自定义修改范围
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/2
 * @updateDate 2026/1/5
 */

const defaultExtentOptions: OMapExtentParamsType = {
    condition: undefined,
    extent: undefined,
    boxStyle: undefined,
    pixelTolerance: 10,
    pointerStyle: undefined,
    wrapX: false
}

export default class InteractionExtent extends Interaction<OMapInteractionExtentType> {

    constructor(params?: OMapExtentParamsType) {
        super("InteractionExtent", { id: params?.id })
        let _params = {
            ...defaultValue(params, {})
        }
        if (isDefined(_params.boxStyle)) {
            _params.boxStyle = handleGetStyleValue(_params.boxStyle) as OlStyleLike
        }
        this._interaction = new OlInteraction.Extent(Object.assign({}, defaultExtentOptions, defaultValue(_params, {})))
        // 注册事件
        this.initInteractionEvent()
    }

    /**
     * 获取当前选框范围
     * @returns {Extent} 当前选框范围
     */
    getExtent(): Extent {
        let extent = this._interaction.getExtent()
        return new Extent(extent)
    }

    /**
     * 设置当前选框范围
     * @param {OMapExtentType} extent 选框范围
     */
    setExtent(extent: OMapExtentType) {
        if (!isDefined(extent)) {
            error_(createMessage("setExtent", commonMessage.paramsNotDefined('extent')));
        }
        if (!isValidExtent(extent)) {
            error_(createMessage("setExtent", commonMessage.paramsInvaildFormat('extent', 'OMap.Extent 或者 Extent数组')));
        }
        let _extent = handleGetExtentValue(extent)
        this._interaction.setExtent(_extent)
    }

    on(type: OMapInteractionExtentEventType, callback: () => void): EventIdType {
        if (!isDefined(type) || !isDefined(callback)) {
            error_(createMessage('on', commonMessage.paramsNotDefined('type or callback')));
        }
        if (!isOMapInteractionExtentEventType(type)) {
            error_(createMessage('on', commonMessage.paramsInvaildEnum(type)));
        };
        if (!isFunction(callback)) {
            error_(createMessage('on', commonMessage.paramsInvaildFormat('callback', 'function')));
        }
        const unlisten = OlEvent.listen(this._interaction, type, (e: any) => {
            this.events.emit(type, handleInteractionExtentEvent(this, type, e))
        })
        const id = this.events.on(type, callback, unlisten)
        return id
    }

    once(type: OMapInteractionExtentEventType, callback: () => void): EventIdType | undefined {
        if (!isDefined(type) || !isDefined(callback)) {
            error_(createMessage('once', commonMessage.paramsNotDefined('type or callback')));
        }
        if (!isOMapInteractionExtentEventType(type)) {
            error_(createMessage('once', commonMessage.paramsInvaildEnum(type)));
        };
        if (!isFunction(callback)) {
            error_(createMessage('once', commonMessage.paramsInvaildFormat('callback', 'function')));
        }
        const unlisten = OlEvent.listen(this._interaction, type, (e: any) => {
            this.events.emit(type, handleInteractionExtentEvent(this, type, e))
        })
        const id = this.events.once(type, callback, unlisten)
        return id
    }

    un(id: EventIdType) {
        if (!isDefined(id)) {
            error_(createMessage('un', commonMessage.paramsNotDefined(id)));
        }
        this.events.remove(id)
    }

}