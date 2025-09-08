import { isDefined, isFunction, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { ProjectionUnitsType, OlProjOptionsType, OlProjInstanceType, OlCoordinateType } from '../../../utils/index'
import Lnglat from '../../basic/Lnglat/index'
import Pixel from '../../basic/Pixel/index'
import Extent from '../../basic/Extent/index'
import Event from '../../util/Event/index'
import { OlOverlay } from '../../../source/index'
import type { OMapPopupParamsType, OlPopupInstanceType, PopupPositioningType } from './type'
import { PopupPositioning } from './type'

const PACKAGE_NAME = 'Popup';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 弹窗类
 * @class Popup
 * @classdesc 弹窗类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/5
 * @updateDate 2025/9/5
 */

interface PopupLike {
    _popup?: OlPopupInstanceType;
}

// 精确类型：保证一定已初始化
interface PopupLikeInitialized {
    _popup: OlPopupInstanceType;
}

const POPUP_DEFAULT_PARAMS: OMapPopupParamsType = {
    offset: new Pixel(0, 0),
    position: undefined,
    positioning: PopupPositioning.bottomCenter,
    stopEvent: true,
    autoPan: false,
    className: 'ol-overlay-container ol-selectable'
}

export default class Popup implements PopupLike {

    _popup?: OlPopupInstanceType;

    constructor(params: OMapPopupParamsType) {
        let _params = Object.assign({}, POPUP_DEFAULT_PARAMS, params)
        this._popup = new OlOverlay({
            ..._params,
            offset: _params.offset?.toArray(),
            position: isDefined(_params.position) ? (_params.position instanceof Lnglat ? _params.position.toArray() : _params.position) : undefined
        })
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
    setPosition(coordinates: Lnglat | OlCoordinateType): void {
        if (!this._isInitialized("setPosition")) return;
        let _coordinates = (coordinates instanceof Lnglat) ? coordinates.toArray() : coordinates
        this._popup.setPosition(_coordinates)
    }
    
    /**
     * 设置弹窗属性
     * @param {Record<string, any>} properties 弹窗属性
     */
    setProperties(properties: Record<string, any>): void {
        if (!this._isInitialized("setProperties")) return;
        if(!isDefined(properties)) {
            warn_(createMessage("setProperties", "参数不能为空"));
            return;
        }
        return this._popup.setProperties(properties)
    }

    /**
     * 获取弹窗属性
     * @returns {Record<string, any> | undefined} 弹窗属性
     */
    getProperties(): Record<string, any> | undefined {
        if (!this._isInitialized("getProperties")) return;
        return this._popup.getProperties()
    }

    getElement(): HTMLElement | undefined {
        if (!this._isInitialized("getElement")) return;
        return this._popup.getElement()
    }

}