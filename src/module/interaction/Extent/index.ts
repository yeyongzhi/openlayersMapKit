import { isDefined, isFunction, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { OlExtentType } from '../../../utils/index'
import Interaction from '../Interaction/index'
import Lnglat from '../../basic/Lnglat/index'
import Pixel from '../../basic/Pixel/index'
import Extent from '../../basic/Extent/index'
import { OlInteraction } from '../../../source/index'
import { type OlInteractionExtentParamsType, type OlInteractionExtentInstanceType } from './type'

const PACKAGE_NAME = 'InteractionExtent';
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

const defaultExtentOptions = {
    condition: undefined,
    extent: undefined,
    boxStyle: undefined,
    pixelTolerance: 10,
    pointerStyle: undefined,
    wrapX: false
}

export default class InteractionExtent extends Interaction {

    constructor(params?: OlInteractionExtentParamsType) {
        super("Extent")
        this._interaction = new OlInteraction.Extent(Object.assign({}, defaultExtentOptions, params || {}))
        // 注册事件
        this.initInteractionEvent()
    }

    getExtent(): Extent | undefined {
        if (!this._isInitialized('getExtent')) return;
        let extent = (this._interaction as OlInteractionExtentInstanceType).getExtent()
        return extent ? new Extent(extent[0], extent[1], extent[2], extent[3]) : undefined
    }

    setExtent(extent: Extent | OlExtentType): void {
        if (!this._isInitialized('setExtent')) return;
        let _extent = extent instanceof Extent ? (extent.toArray() as OlExtentType) : extent;
        (this._interaction as OlInteractionExtentInstanceType).setExtent(_extent)
    }

}