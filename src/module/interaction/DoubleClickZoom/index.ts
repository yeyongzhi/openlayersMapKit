import { isBoolean, isDefined, defaultValue, isFunction, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import Interaction from '../Interaction/index'
import { OlInteraction } from '../../../source/index'
import type { OMapDoubleClickZoomParamsType } from './type'
const PACKAGE_NAME = 'DoubleClickZoom';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 双击缩放交互类
 * @class DoubleClickZoom
 * @classdesc 允许用户通过双击地图来缩放地图
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/20
 * @updateDate 2025/9/20
 */

const defaultDoubleClickZoomOptions = {
    duration: 250,
    delta: 1
}

export default class DoubleClickZoom extends Interaction {

    constructor(params?: OMapDoubleClickZoomParamsType) {
        super("DoubleClickZoom")
        this._interaction = new OlInteraction.DoubleClickZoom(Object.assign({
            active: false
        }, defaultDoubleClickZoomOptions, params || {}))
        // 注册事件
        this.initInteractionEvent()
    }

}