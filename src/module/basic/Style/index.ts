
import { isDefined, isNumber } from '../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { OMapStyleLike, OMapStyleOptionsType, OlStyleInstanceType } from './type'
import { OMapStrokeStyleDefaultOptions } from './type'
import { OlStyle } from '../../../source/index'
import { getOlFillSingleStyle, getOlStrokeSingleStyle } from './handle'

const PACKAGE_NAME = 'Style';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 样式类
 * @class
 * @classdesc 用于矢量元素设置样式
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/15
 * @updateDate 2025/7/16
 */

export default class Style {

    _style?: OlStyleInstanceType;

    constructor(options: OMapStyleOptionsType) {
        const { fill, stroke, image, text } = options
        this._style = new OlStyle.Style({
            fill: getOlFillSingleStyle(fill),
            stroke: getOlStrokeSingleStyle(stroke)
        })
    }

    private _isInitialized(method: string) {
        
    }

}