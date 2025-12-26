import { isDefined, isFunction, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import Interaction from '../Interaction/index'
import Lnglat from '../../basic/Lnglat/index'
import Pixel from '../../basic/Pixel/index'
import Extent from '../../basic/Extent/index'
import Event from '../../util/Event/index'
import { OlInteraction } from '../../../source/index'
import type { OlDragBoxParamsType, OlDragBoxInstanceType, OMapDragBoxEventType } from './type'
import { handleDragBoxEvent } from './handle';

const PACKAGE_NAME = 'DragBox';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 拖动地图类
 * @class DragBox
 * @classdesc 拖动地图类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/2
 * @updateDate 2025/9/2
 */

export default class DragBox extends Interaction {

    constructor(params: OlDragBoxParamsType) {
        super("DragBox")
        this._interaction = new OlInteraction.DragBox({
            ...(params || {}),
            // boxEndCondition: (mapBrowserEvent, startPixel, endPixel) => {
            //     console.log(mapBrowserEvent)
            //     console.log(startPixel, endPixel)
            //     return false
            // },
            onBoxEnd: (e) => {
                if(params && params.onBoxEnd && isFunction(params.onBoxEnd)){
                    (params.onBoxEnd as Function)({
                        coordinate: new Lnglat(e.coordinate[0], e.coordinate[1]),
                        pixel: new Pixel(e.pixel[0], e.pixel[1])
                    })
                }
            }
        })
        // 注册事件
        this.initInteractionEvent()
        // this.initDragBoxEvent()
        this.events = new Event<Record<OMapDragBoxEventType, unknown[]>>(this);
    }

    on(type: OMapDragBoxEventType, callback: () => void): number | string | undefined {
        if (!this._isInitialized('on')) return;
        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('on', '参数不能为空'));
            return;
        }
        let list = (this.events as Event).get(type)
        if (!isDefined(list) || list.length === 0) {
            (this._interaction as OlDragBoxInstanceType).on(type, (e) => {
                (this.events as Event).emit(type, handleDragBoxEvent(this, type, e))
            })
        }
        const id = (this.events as Event).on(type, callback)
        return id
    }

    un(id: number): void {
        if (!this._isInitialized('un')) return;
        if (!isDefined(id)) {
            warn_(createMessage('un', '参数不能为空'));
            return;
        }
        if (!isNumber(id)) {
            warn_(createMessage('un', '事件ID应为number类型'));
            return;
        }
        (this.events as Event).remove(id)
    }

    once(type: OMapDragBoxEventType, callback: () => void): number | string | undefined {
        if (!this._isInitialized('on')) return;
        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('on', '参数不能为空'));
            return;
        }
        let list = (this.events as Event).get(type)
        if (!isDefined(list) || list.length === 0) {
            (this._interaction as OlDragBoxInstanceType).on(type, (e) => {
                (this.events as Event).emit(type, handleDragBoxEvent(this, type, e))
            })
        }
        const id = (this.events as Event).once(type, callback)
        return id
    }

}