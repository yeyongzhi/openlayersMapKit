import { commonMessage, isDefined, isFunction, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import Lnglat from '../../basic/Lnglat/index'
import type { OlCoordinateType } from '../../basic/Lnglat/type'
import Pixel from '../../basic/Pixel/index'
import { type OMapPixelType, type OlPixelType } from '../../basic/Pixel/type'
import Map from '../../core/Map/index'
import Event from '../../util/Event/index'
import { type EventIdType } from '../../util/Event/type'
import { OlEvent, OlOverlay } from '../../../source/index'
import {
    type OMapPopupType,
    type OMapPopupParamsType,
    type OlPopupInstanceType,
    type PopupPositioningType,
    isVaildPopupPositioningType,
    DEFAULT_POPUP_PARAMS
} from './type'
import {
    PopupPositioning,
    type OMapPopupEventType,
    isOMapPopupEventType
} from './type'
import { createDefaultContentElement, handlePopupEvent } from './handle'

const PACKAGE_NAME = 'Popup';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 弹窗类
 * @class Popup
 * @classdesc 弹窗类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/5
 * @updateDate 2025/12/30
 */


export default class Popup {

    _popup: OMapPopupType;

    /**
     * Popup 的唯一ID
     */
    id: number | string | null = null;

    /**
     * 弹窗所属地图
     */
    map: Map | null = null;
    /**
     * 弹窗内容(不一定有)
     */
    content: string = '';
    /**
     * 弹窗属性
     */
    properties: Record<string, any> = {};
    /**
     * 事件对象
     */
    events: Event = new Event();

    constructor(params: OMapPopupParamsType) {
        if (isDefined(params.id)) {
            this.id = params.id
        }
        let _params = Object.assign({}, DEFAULT_POPUP_PARAMS, params)
        delete _params.id
        // content存在且element不存在的时候才会创建默认的空DOM来渲染content的内容（支持HTML字符串）
        if (isDefined(_params.content) && isString(_params.content) && !isDefined(_params.element)) {
            this.content = _params.content
            _params.element = createDefaultContentElement(_params.content)
        }
        if (isDefined(_params.element)) {
            _params.element.classList.add("omap-popup-selectable")
        }
        this._popup = new OlOverlay({
            ..._params,
            offset: _params.offset?.toArray(),
            position: isDefined(_params.position) ? (_params.position instanceof Lnglat ? _params.position.toArray() : _params.position) : undefined
        })
        this.events = new Event(this)
    }

    /**
     * 初始化弹窗元素事件
     * @todo 暂不需要
     */
    protected _initElementEvent() {

    }

    /**
     * 获取弹窗位置
     * @returns {Lnglat | undefined} 弹窗位置
     */
    getPosition(): Lnglat | undefined {

        let coordinates = this._popup.getPosition()
        return isDefined(coordinates) ? new Lnglat(coordinates[0], coordinates[1]) : undefined
    }

    /**
     * 设置弹窗位置
     * @param {Lnglat | OlCoordinateType} coordinates 弹窗位置
     */
    setPosition(coordinates: Lnglat | OlCoordinateType | undefined): void {

        let _coordinates = (coordinates instanceof Lnglat) ? coordinates.toArray() : coordinates
        this._popup.setPosition(_coordinates)
    }

    getPositioning(): PopupPositioningType | undefined {

        return this._popup.getPositioning()
    }

    setPositioning(positioning: PopupPositioningType): void {

        if (!isVaildPopupPositioningType(positioning)) {
            warn_(createMessage("setPositioning", "参数positioning值有误"));
            return;
        }
        this._popup.setPositioning(positioning)
    }

    /**
     * 获取弹窗属性
     * @returns {Record<string, any> | undefined} 弹窗属性
     */
    getProperties(): Record<string, any> | undefined {

        return this.properties
    }

    /**
     * 设置弹窗属性
     * @param {Record<string, any>} properties 弹窗属性
     */
    setProperties(properties: Record<string, any>): void {

        if (!isDefined(properties)) {
            warn_(createMessage("setProperties", "参数不能为空"));
            return;
        }
        this.events.emit('change:properties', handlePopupEvent(this, 'change:properties', {
            oldValue: this.getProperties(),
            key: "properties",
            newValue: Object.assign({}, this.properties, properties)
        }));
        this.properties = Object.assign({}, this.properties, properties)
    }

    getElement(): HTMLElement | undefined {

        return this._popup.getElement()
    }

    setElement(element: HTMLElement | undefined): void {

        if (!isDefined(element)) return;
        element.classList.add("omap-popup-selectable")
        return this._popup.setElement(element)
    }

    getContent(): string {
        return this.content
    }

    setContent(content: string): void {

        this.events.emit('change:content', handlePopupEvent(this, 'change:content', {
            oldValue: this.getContent(),
            key: "content",
            newValue: content
        }));
        this.content = content
        this.setElement(createDefaultContentElement(content))
    }

    getOffset(): Pixel | undefined {

        let offset = this._popup.getOffset()
        return new Pixel(offset[0], offset[1])
    }

    setOffset(offset: OMapPixelType): void {

        let _offset = (offset instanceof Pixel) ? (offset.toArray() as OlPixelType) : offset;
        this._popup.setOffset(_offset)
    }

    getId(): number | string | null | undefined {

        return this.id
    }

    setId(id: number | string): void {
        this.id = id
    }

    getPopup(): OlPopupInstanceType | undefined {
        return this._popup
    }

    on(type: OMapPopupEventType, callback: () => void): EventIdType | undefined {

        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('on', commonMessage.paramsListHaveNotDefined('type or callback')));
            return;
        }
        if (!isOMapPopupEventType(type)) {
            warn_(createMessage('on', commonMessage.paramsInvaildEnum('type')));
            return;
        };
        if (!isFunction(callback)) {
            warn_(createMessage('on', commonMessage.paramsInvaildFormat('callback', 'function')));
            return;
        }
        const unlisten = OlEvent.listen((this._popup as OlPopupInstanceType), type, (e: any) => {
            this.events.emit(type, handlePopupEvent(this, type, e))
        })
        const id = this.events.on(type, callback, unlisten)
        return id
    }

    once(type: OMapPopupEventType, callback: () => void): EventIdType | undefined {

        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('on', commonMessage.paramsListHaveNotDefined('type or callback')));
            return;
        }
        if (!isOMapPopupEventType(type)) {
            warn_(createMessage('on', commonMessage.paramsInvaildEnum('type')));
            return;
        };
        if (!isFunction(callback)) {
            warn_(createMessage('on', commonMessage.paramsInvaildFormat('callback', 'function')));
            return;
        }
        const unlisten = OlEvent.listen((this._popup as OlPopupInstanceType), type, (e: any) => {
            this.events.emit(type, handlePopupEvent(this, type, e))
        })
        const id = this.events.once(type, callback, unlisten)
        return id
    }

    un(id: EventIdType): void {

        if (!isDefined(id)) {
            warn_(createMessage('un', commonMessage.paramsNotDefined('id')));
            return;
        }
        this.events.remove(id)
    }

    setMap(map: Map | null) {
        this.map = map
        if (isDefined(map)) {
            this._initElementEvent()
        }
    }

}