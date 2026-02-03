import { isDefined, defaultValue, isFunction, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage, commonMessage } from '../../../utils/message'
import Interaction from '../Interaction/index'
import Lnglat from '../../basic/Lnglat/index'
import Extent from '../../basic/Extent/index'
import Event from '../../util/Event/index'
import { type EventIdType } from '../../util/Event/type'
import { OlInteraction } from '../../../source/index'
import {
    type OMapDragBoxParamsType,
    type OlDragBoxInstanceType,
    type OMapDragBoxEventType,
    type OMapDragBoxType
} from './type'
import { handleDragBoxEvent, DragBoxParamsBoxEndHandle } from './handle';

const PACKAGE_NAME = 'DragBox';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 拖动选框类
 * @class DragBox
 * @classdesc 拖动选框类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/2
 * @updateDate 2026/1/3
 */

export default class DragBox extends Interaction<OMapDragBoxType> {

    extent: Extent | null = null;

    constructor(params?: OMapDragBoxParamsType) {
        super("DragBox", { id: params?.id })
        if (isDefined(params) && isDefined(params.onBoxEnd) && isFunction(params.onBoxEnd)) {
            DragBoxParamsBoxEndHandle.initFunction(params.onBoxEnd)
        }
        let _params = Object.assign({}, defaultValue(params, {}))
        this._interaction = new OlInteraction.DragBox(_params)
        // 注册事件
        this.initInteractionEvent()
        this._initDragBoxEvent()
        this.events = new Event<Record<OMapDragBoxEventType, unknown[]>>(this);
    }

    private _initDragBoxEvent() {
        (this._interaction as OlDragBoxInstanceType).on('boxend', (e: any) => {
            const extent = this._interaction.getGeometry().getExtent();
            if (isDefined(extent)) {
                this.extent = new Extent(extent)
            }
            DragBoxParamsBoxEndHandle.emit({
                coordinate: new Lnglat(e.coordinate),
                target: this,
                extent: this.extent
            })
        })
    }

    on(type: OMapDragBoxEventType, callback: () => void): EventIdType {
        if (!isDefined(type) || !isDefined(callback)) {
            error_(createMessage('on', commonMessage.paramsListHaveNotDefined('type', 'callback')));
        }
        let list = this.events.get(type)
        if (!isDefined(list) || list.length === 0) {
            (this._interaction as OlDragBoxInstanceType).on(type, (e) => {
                (this.events as Event).emit(type, handleDragBoxEvent(this, type, e))
            })
        }
        const id = (this.events as Event).on(type, callback)
        return id
    }

    un(id: EventIdType) {
        if (!isDefined(id)) {
            error_(createMessage('un', '参数不能为空'));
        }
        this.events.remove(id)
    }

    once(type: OMapDragBoxEventType, callback: () => void): number | string | undefined {

        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('on', '参数不能为空'));
            return;
        }
        let list = (this.events as Event).get(type)
        if (!isDefined(list) || list.length === 0) {
            (this._interaction as OlDragBoxInstanceType).once(type, (e) => {
                (this.events as Event).emit(type, handleDragBoxEvent(this, type, e))
            })
        }
        const id = (this.events as Event).once(type, callback)
        return id
    }

    protected destroy() {
        DragBoxParamsBoxEndHandle.destroy()
        super.destroy()
    }

}