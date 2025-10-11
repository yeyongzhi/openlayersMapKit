import { isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import{ OlControl } from '../../../source/index'
import {
    type OMapControlFullScreenOptionsType,
    type OMapControlFullScreenInstanceType,
    DEFAULT_FullScreen_OPTIONS,
    type OMapControlFullScreenInitialized
} from './type'
import Event from '../../../module/util/Event/index'
import Map from '../../core/Map/index'
import Control from '../Control/index'

const PACKAGE_NAME = 'FullScreen';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * @class FullScreen
 * @classdesc 全屏控件类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/10
 * @updateDate 2025/10/10
 */

export default class FullScreen extends Control {

    constructor(options?: OMapControlFullScreenOptionsType)
    constructor(id: number | string, options?: OMapControlFullScreenOptionsType)

    constructor(idOrOptions?: OMapControlFullScreenOptionsType | number | string, options?: OMapControlFullScreenOptionsType) {
        super("FullScreen");
        if(isDefined(idOrOptions) && (isNumber(idOrOptions) || isString(idOrOptions))) {
            this.id = idOrOptions as number | string
            this._control = new OlControl.FullScreen(Object.assign({}, DEFAULT_FullScreen_OPTIONS, options))
        } else {
            this._control = new OlControl.FullScreen(Object.assign({}, DEFAULT_FullScreen_OPTIONS, idOrOptions))
        }
    }

    protected _isInitialized(method: string): this is OMapControlFullScreenInitialized & this {
        if (!isDefined(this._control)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

}