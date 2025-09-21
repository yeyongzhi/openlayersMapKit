import { isBoolean, isDefined, defaultValue, isFunction, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import Interaction from '../Interaction/index'
import { OlInteraction } from '../../../source/index'
import type { OMapMouseWheelZoomParamsType } from './type'
const PACKAGE_NAME = 'MouseWheelZoom';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 鼠标滚轮缩放交互类
 * @class MouseWheelZoom
 * @classdesc 允许用户通过鼠标滚轮来缩放地图
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/20
 * @updateDate 2025/9/20
 */

const defaultMouseWheelZoomOptions = {
    onFocusOnly: false,
    maxDelta: 1,
    duration: 250,
    timeout: 80,
    useAnchor: true,
    constrainResolution:false
}

export default class MouseWheelZoom extends Interaction {

    constructor(params?: OMapMouseWheelZoomParamsType) {
        super("MouseWheelZoom")
        this._interaction = new OlInteraction.MouseWheelZoom(Object.assign({}, defaultMouseWheelZoomOptions, params || {}))
        // 注册事件
        this.initInteractionEvent()
    }

}