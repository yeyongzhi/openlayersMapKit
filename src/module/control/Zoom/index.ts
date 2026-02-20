import { isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/message'
import{ OlControl } from '../../../source/index'
import {
    type OMapControlZoomOptionsType,
    type OMapControlZoomType,
    DEFAULT_ZOOM_OPTIONS
} from './type'
import Control from '../Control/index'
import { type OMapControlIdType } from '../Control/type'

const PACKAGE_NAME = 'Zoom';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * @class Zoom
 * @classdesc 缩放控件类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/9
 * @updateDate 2025/10/10
 */

export default class Zoom extends Control<OlControl.Zoom> {

    constructor(options?: OMapControlZoomOptionsType)
    constructor(id: OMapControlIdType, options?: OMapControlZoomOptionsType)

    constructor(idOrOptions?: OMapControlZoomOptionsType | OMapControlIdType, options?: OMapControlZoomOptionsType) {
        super("Zoom");
        if(isDefined(idOrOptions) && (isNumber(idOrOptions) || isString(idOrOptions))) {
            this.id = idOrOptions as OMapControlIdType
            this._control = new OlControl.Zoom(Object.assign({}, DEFAULT_ZOOM_OPTIONS, options))
        } else {
            this._control = new OlControl.Zoom(Object.assign({}, DEFAULT_ZOOM_OPTIONS, idOrOptions))
        }
    }

}