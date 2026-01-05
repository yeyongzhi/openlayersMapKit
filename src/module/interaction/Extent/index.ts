import { isDefined, defaultValue, isFunction, isNumber, isString } from '../../../utils/index';
import { isExtentType } from '../../../utils/dataType';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import { commonMessage } from "../../../utils/message";
import Interaction from '../Interaction/index'
import Extent from '../../basic/Extent/index'
import { type OlExtentType, type OMapExtentType } from '../../basic/Extent/type'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetStyleValue } from '../../basic/Style/handle'
import { type OlStyleLike } from '../../basic/Style/type'
import { OlInteraction, OlEvent } from '../../../source/index'
import {
    type OMapExtentParamsType,
    type OlInteractionExtentInstanceType,
    type OMapInteractionExtentEventType,
    isOMapInteractionExtentEventType
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

export default class InteractionExtent extends Interaction {

    constructor(params?: OMapExtentParamsType) {
        super("InteractionExtent")
        let _params = {
            ...defaultValue(params, {})
        }
        if (isDefined(_params.boxStyle)) {
            _params.boxStyle = handleGetStyleValue(_params.boxStyle) as OlStyleLike
        }
        this._interaction = new OlInteraction.Extent(Object.assign({}, defaultExtentOptions, defaultValue(_params, {})))
        // 注册事件
        this.initInteractionEvent()
        if (isDefined(params) && isDefined(params.id)) {
            this._initInteractionId(params.id)
        }
    }

    /**
     * 获取当前选框范围
     * @returns {Extent | undefined} 当前选框范围
     */
    getExtent(): Extent | undefined {
        if (!this._isInitialized('getExtent')) return;
        let extent = (this._interaction as OlInteractionExtentInstanceType).getExtent()
        return isDefined(extent) ? new Extent(...extent) : undefined
    }

    /**
     * 设置当前选框范围
     * @param {OMapExtentType} extent 选框范围
     */
    setExtent(extent: OMapExtentType): void {
        if (!this._isInitialized('setExtent')) return;
        if (!isDefined(extent)) {
            warn_(createMessage("setExtent", commonMessage.paramsNotDefined('extent')));
            return;
        }
        if (!isExtentType(extent) || !(extent instanceof Extent)) {
            warn_(createMessage("setExtent", commonMessage.paramsInvaildFormat('extent', 'OMap.Extent 或者 Extent数组')));
            return;
        }
        let _extent = handleGetExtentValue(extent) as OlExtentType;
        (this._interaction as OlInteractionExtentInstanceType).setExtent(_extent)
    }

    on(type: OMapInteractionExtentEventType, callback: () => void): EventIdType | undefined {
        if (!this._isInitialized('on')) return;
        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('on', '参数不能为空'));
            return;
        }
        if (!isOMapInteractionExtentEventType(type)) {
            warn_(createMessage('on', '事件类型错误'));
            return;
        };
        if (!isFunction(callback)) {
            warn_(createMessage('on', '回调函数不能为空'));
            return;
        }
        const unlisten = OlEvent.listen((this._interaction as OlInteractionExtentInstanceType), type, (e: any) => {
            this.events.emit(type, handleInteractionExtentEvent(this, type, e))
        })
        const id = this.events.on(type, callback, unlisten)
        return id
    }

    un(id: number): void {

    }

}