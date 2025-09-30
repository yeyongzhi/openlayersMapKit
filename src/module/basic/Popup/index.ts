import { isDefined, isFunction, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { ProjectionUnitsType, OlProjOptionsType, OlProjInstanceType, OlCoordinateType } from '../../../utils/index'
import Lnglat from '../../basic/Lnglat/index'
import Pixel from '../../basic/Pixel/index'
import { type OMapPixelType, type OlPixelType } from '../../basic/Pixel/type'
import Extent from '../../basic/Extent/index'
import Event from '../../util/Event/index'
import { isValidEventId, type EventIdType } from '../../util/Event/handle'
import { OlOverlay } from '../../../source/index'
import {
    type OMapPopupParamsType,
    type OlPopupInstanceType,
    type PopupPositioningType,
    isVaildPopupPositioningType,
    DEFAULT_POPUP_PARAMS
} from './type'
import {
    PopupPositioning,
    type OMapPopupEventType,
    isOlOverlayEventType
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
 * @updateDate 2025/9/30
 */

interface PopupLike {
    _popup?: OlPopupInstanceType;
    id: number | string | null;
    content: string;
    events: Event;
    properties: Record<string, any>;
}

// 精确类型：保证一定已初始化
interface PopupLikeInitialized {
    _popup: OlPopupInstanceType;
    id: number | string | null;
    content: string;
    events: Event;
    properties: Record<string, any>;
}

export default class Popup implements PopupLike {

    _popup?: OlPopupInstanceType;

    /**
     * Popup 的唯一ID
     */
    id: number | string | null = null;
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
        this._popup = new OlOverlay({
            ..._params,
            offset: _params.offset?.toArray(),
            position: isDefined(_params.position) ? (_params.position instanceof Lnglat ? _params.position.toArray() : _params.position) : undefined
        })
        this.events = new Event(this)
    }

    protected _isInitialized(method: string): this is PopupLikeInitialized & this {
        if (!isDefined(this._popup)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    /**
     * 获取弹窗位置
     * @returns {Lnglat | undefined} 弹窗位置
     */
    getPosition(): Lnglat | undefined {
        if (!this._isInitialized("getPosition")) return;
        let coordinates = this._popup.getPosition()
        return isDefined(coordinates) ? new Lnglat(coordinates[0], coordinates[1]) : undefined
    }

    /**
     * 设置弹窗位置
     * @param {Lnglat | OlCoordinateType} coordinates 弹窗位置
     */
    setPosition(coordinates: Lnglat | OlCoordinateType | undefined): void {
        if (!this._isInitialized("setPosition")) return;
        let _coordinates = (coordinates instanceof Lnglat) ? coordinates.toArray() : coordinates
        this._popup.setPosition(_coordinates)
    }

    getPositioning(): PopupPositioningType | undefined {
        if (!this._isInitialized("getPositioning")) return;
        return this._popup.getPositioning()
    }

    setPositioning(positioning: PopupPositioningType): void {
        if (!this._isInitialized("setPositioning")) return;
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
        if (!this._isInitialized("getProperties")) return;
        return this.properties
    }

    /**
     * 设置弹窗属性
     * @param {Record<string, any>} properties 弹窗属性
     */
    setProperties(properties: Record<string, any>): void {
        if (!this._isInitialized("setProperties")) return;
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
        if (!this._isInitialized("getElement")) return;
        return this._popup.getElement()
    }

    setElement(element: HTMLElement | undefined): void {
        if (!this._isInitialized("getElement")) return;
        return this._popup.setElement(element)
    }

    getContent(): string {
        if (!this._isInitialized("getContent")) return "";
        return this.content
    }

    setContent(content: string): void {
        if (!this._isInitialized("setContent")) return;
        this.events.emit('change:content', handlePopupEvent(this, 'change:content', {
            oldValue: this.getContent(),
            key: "content",
            newValue: content
        }));
        this.content = content
        this.setElement(createDefaultContentElement(content))
    }

    getOffset(): Pixel | undefined {
        if (!this._isInitialized("getOffset")) return;
        let offset = this._popup.getOffset()
        return new Pixel(offset[0], offset[1])
    }

    setOffset(offset: OMapPixelType): void {
        if (!this._isInitialized("setOffset")) return;
        let _offset = (offset instanceof Pixel) ? (offset.toArray() as OlPixelType) : offset;
        this._popup.setOffset(_offset)
    }

    getId(): number | string | null | undefined {
        if (!this._isInitialized("getId")) return;
        return this.id
    }

    setId(id: number | string): void {
        this.id = id
    }

    getPopup(): OlPopupInstanceType | undefined {
        return this._popup
    }

    on(type: OMapPopupEventType, callback: () => void) {
        if (!this._isInitialized('on')) return;
        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('on', '参数不能为空'));
            return;
        }
        if (isOlOverlayEventType(type)) {
            let list = (this.events as Event).get(type)
            if (!isDefined(list) || list.length === 0) {
                (this._popup as OlPopupInstanceType).on(type, (e) => {
                    console.log(e);
                    (this.events as Event).emit(type, handlePopupEvent(this, type, e))
                })
            }
        }
        const id: EventIdType = (this.events as Event).on(type, callback)
        return id
    }

    un(id: EventIdType): void {
        if (!this._isInitialized('un')) return;
        if (!isDefined(id)) {
            warn_(createMessage('un', '参数不能为空'));
            return;
        }
        if (!isValidEventId(id)) {
            warn_(createMessage('un', '事件ID应为number类型'));
            return;
        }
        (this.events as Event).remove(id)
    }

    once() {

    }

}