import { isBoolean, isDefined, defaultValue, isFunction, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import Interaction from '../Interaction/index'
import { OlInteraction } from '../../../source/index'
import {
    type OMapKeyboardZoomParamsType,
    type OMapKeyboardZoomType
} from './type'            
const PACKAGE_NAME = 'KeyboardZoom';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 双击缩放交互类
 * @class KeyboardZoom
 * @classdesc 允许用户通过双击地图来缩放地图
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/20
 * @updateDate 2025/9/20
 */

const defaultKeyboardZoomOptions = {
    duration: 100,
    delta: 1
}

export default class KeyboardZoom extends Interaction<OMapKeyboardZoomType> {

    constructor(params?: OMapKeyboardZoomParamsType) {
        super("KeyboardZoom", { id: params?.id })
        this._interaction = new OlInteraction.KeyboardZoom(Object.assign({}, defaultKeyboardZoomOptions, params || {}))
        this.initInteractionEvent()
    }

}