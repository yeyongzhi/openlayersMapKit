import { isDefined, isFunction, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import Interaction from '../Interaction/index'
import { OlInteraction } from '../../../source/index'
import { type OMapDragPanParamsType } from './type'

const PACKAGE_NAME = 'DragPan';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 拖动地图类
 * @class DragPan
 * @classdesc 允许用户通过拖动地图来平移地图
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/2
 * @updateDate 2025/9/2
 */

const defaultDragPanOptions = {
    onFocusOnly: false,
    kinetic: undefined
}

export default class DragPan extends Interaction {

    constructor(params?: OMapDragPanParamsType) {
        super("DragPan")
        this._interaction = new OlInteraction.DragPan(Object.assign({}, defaultDragPanOptions, params || {}))
        this.initInteractionEvent()
        if(isDefined(params) && isDefined(params.id)) {
            this._initInteractionId(params.id)
        }
    }

}