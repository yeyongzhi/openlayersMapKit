
import { isDefined, isNumber } from '../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { OMapStyleLike, OMapStyleOptionsType, OlStyleInstanceType } from './type'
import { OMapStrokeStyleDefaultOptions } from './type'
import { OlStyle } from '../../../source/index'
import {
    getOlFillSingleStyle,
    getOlStrokeSingleStyle,
    getOlCircleSingleStyle,
    getOlIconSingleStyle,
    getOlRegularShapeSingleStyle,
    getOlTextSingleStyle
} from './handle'

const PACKAGE_NAME = 'Style';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 样式类
 * @class
 * @classdesc 用于矢量元素设置样式
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/15
 * @updateDate 2025/7/22
 */

export default class Style {

    _style?: OlStyleInstanceType;

    constructor(options: OMapStyleOptionsType) {
        const { fill, stroke, text, circle, icon, regularShape } = options
        let _image
        if (circle) {
            _image = getOlCircleSingleStyle(circle)
        } else if (icon) {
            _image = getOlIconSingleStyle(icon)
        } else if (regularShape) {
            _image = getOlRegularShapeSingleStyle(regularShape)
        }
        let _params = Object.assign({}, options, {
            fill: getOlFillSingleStyle(fill),
            stroke: getOlStrokeSingleStyle(stroke),
            image: _image,
            text: getOlTextSingleStyle(text)
        })
        this._style = new OlStyle.Style(_params)
    }

    getStyle(): OlStyleInstanceType | undefined {
        return this._style
    }

}