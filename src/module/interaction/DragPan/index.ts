import { isDefined, isFunction, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { ProjectionUnitsType, OlProjOptionsType, OlProjInstanceType } from '../../../utils/index'
import Interaction from '../Interaction/index'
import Lnglat from '../../basic/Lnglat/index'
import Pixel from '../../basic/Pixel/index'
import Extent from '../../basic/Extent/index'
import { OlInteraction } from '../../../source/index'
import { type OlDragPanParamsType } from './type'

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

    constructor(params?: OlDragPanParamsType) {
        super("DragPan")
        this._interaction = new OlInteraction.DragPan(Object.assign({}, defaultDragPanOptions, params || {}))
        // 注册事件
        this.initInteractionEvent()
    }

}