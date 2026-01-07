import { isBoolean, isDefined, defaultValue, isFunction, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { OlAnimationOptions } from '../../../utils/olType/view'
import Interaction from '../Interaction/index'
import { OlInteraction } from '../../../source/index'
import type { OMapLinkParamsType } from './type'
import Lnglat from '../../basic/Lnglat/index';

const PACKAGE_NAME = 'Link';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 链接交互类
 * @class Link
 * @classdesc 一种将地图状态与 URL 同步的交互方式
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/20
 * @updateDate 2026/1/6
 */

const defaultLinkOptions: OMapLinkParamsType = {
    animate: true,
    params: ['x', 'y', 'z', 'r', 'l'],
    replace: false,
    prefix: ''
}

export default class Link extends Interaction {

    constructor(params?: OMapLinkParamsType) {
        super("Link")
        let _params = {
            ...defaultValue(params, {}),
            animate: (isDefined(params?.animate) && !isBoolean(params?.animate)) ? {
                ...(params.animate as OlAnimationOptions),
                center: ((params.animate as OlAnimationOptions).center instanceof Lnglat) ? ((params.animate as OlAnimationOptions).center as Lnglat).toArray() : (params.animate as OlAnimationOptions).center,
            } : defaultValue(params?.animate, true),
        };
        this._interaction = new OlInteraction.Link(Object.assign({}, defaultLinkOptions, _params))
        this.initInteractionEvent()
        if(isDefined(params) && isDefined(params.id)) {
            this._initInteractionId(params.id)
        }
    }

}