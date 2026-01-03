import { isDefined, defaultValue, isFunction, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import { commonMessage } from "../../../utils/message";
import Interaction from '../Interaction/index'
import Lnglat from '../../basic/Lnglat/index'
import Pixel from '../../basic/Pixel/index'
import Extent from '../../basic/Extent/index'
import { type OlExtentType, type OMapExtentType } from '../../basic/Extent/type'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetStyleValue } from '../../basic/Style/handle'
import { type OlStyleLike } from '../../basic/Style/type'
import { OlInteraction } from '../../../source/index'
import type { OMapExtentParamsType, OlInteractionExtentInstanceType } from './type'

const PACKAGE_NAME = 'InteractionExtent';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 拖动地图类
 * @class InteractionExtent
 * @classdesc 允许用户通过拖动地图来平移地图
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/2
 * @updateDate 2026/1/3
 */

const defaultExtentOptions: OMapExtentParamsType = {
    condition: undefined,
    extent: undefined,
    boxStyle: undefined,
    pixelTolerance: 10,
    pointerStyle: undefined,
    wrapX: false
}

export default class InteractionExtent extends Interaction {

    constructor(params?: OMapExtentParamsType) {
        super("InteractionExtent")
        let _params = {
            ...defaultValue(params, {})
        }
        if(isDefined(_params.boxStyle)) {
            _params.boxStyle = handleGetStyleValue(_params.boxStyle) as OlStyleLike
        }
        this._interaction = new OlInteraction.Extent(Object.assign({}, defaultExtentOptions, defaultValue(_params, {})))
        // 注册事件
        this.initInteractionEvent()
        if(isDefined(params) && isDefined(params.id)) {
            this._initInteractionId(params.id)
        }
    }

    getExtent(): Extent | undefined {
        if (!this._isInitialized('getExtent')) return;
        let extent = (this._interaction as OlInteractionExtentInstanceType).getExtent()
        return extent ? new Extent(...extent) : undefined
    }

    setExtent(extent: OMapExtentType): void {
        if (!this._isInitialized('setExtent')) return;
        if(!isDefined(extent)) {
            warn_(createMessage("setExtent", commonMessage.paramsNotDefined('extent')));
            return;
        }
        let _extent = handleGetExtentValue(extent) as OlExtentType;
        (this._interaction as OlInteractionExtentInstanceType).setExtent(_extent)
    }

}