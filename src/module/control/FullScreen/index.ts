import { isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import{ OlControl } from '../../../source/index'
import {
    type OMapControlZoomOptionsType,
    type OMapControlZoomInstanceType,
    DEFAULT_ZOOM_OPTIONS,
    type OMapControlZoomInitialized
} from './type'
import Event from '../../../module/util/Event/index'
import Map from '../../core/Map/index'
import Control from '../Control/index'

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

export default class Zoom extends Control {

    constructor(options?: OMapControlZoomOptionsType)
    constructor(id: number | string, options?: OMapControlZoomOptionsType)

    constructor(idOrOptions?: OMapControlZoomOptionsType | number | string, options?: OMapControlZoomOptionsType) {
        super("Zoom");
        if(isDefined(idOrOptions) && (isNumber(idOrOptions) || isString(idOrOptions))) {
            this.id = idOrOptions as number | string
            this._control = new OlControl.Zoom(Object.assign({}, DEFAULT_ZOOM_OPTIONS, options))
        } else {
            this._control = new OlControl.Zoom(Object.assign({}, DEFAULT_ZOOM_OPTIONS, idOrOptions))
        }
    }

    protected _isInitialized(method: string): this is OMapControlZoomInitialized & this {
        if (!isDefined(this._control)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

}