import { isDefined, defaultValue,isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import Interaction from '../Interaction/index'
import { OlInteraction } from '../../../source/index'
import { type OMapDragZoomParamsType, defaultDragZoomOptions } from './type'

const PACKAGE_NAME = 'Modify';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 拖动缩放类
 * @class DragZoom
 * @classdesc 拖动缩放类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/8/25
 * @updateDate 2026/1/3
 */

export default class DragZoom extends Interaction {

    constructor(params?: OMapDragZoomParamsType) {
        super("DragZoom")
        this._interaction = new OlInteraction.DragZoom(Object.assign({}, defaultDragZoomOptions, defaultValue(params, {})))
        this.initInteractionEvent()
        if(isDefined(params) && isDefined(params.id)) {
            this._initInteractionId(params.id)
        }
    }

}