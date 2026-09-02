import { error_, commonMessage } from '../../../utils/message'
import { getPackageMessage, isDefined } from '../../../utils/index'
import type { OMapStyleOptionsType, OlStyleInstanceType } from './type'
import { OlStyle } from '../../../source/index'
import {
  getOlGeometryStyle,
  getOlFillSingleStyle,
  getOlStrokeSingleStyle,
  getOlCircleSingleStyle,
  getOlIconSingleStyle,
  getOlRegularShapeSingleStyle,
  getOlTextSingleStyle
} from './handle'

const PACKAGE_NAME = 'Style'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 样式类
 *
 */

export default class Style {
  _style: OlStyleInstanceType

  constructor(options: OMapStyleOptionsType) {
    if (!isDefined(options)) {
      error_(createMessage('constructor', commonMessage.paramsNotDefined('options')))
    }
    const { geometry, fill, stroke, text, circle, icon, regularShape } = options
    let imageStyle
    if (circle) {
      imageStyle = getOlCircleSingleStyle(circle)
    } else if (icon) {
      imageStyle = getOlIconSingleStyle(icon)
    } else if (regularShape) {
      imageStyle = getOlRegularShapeSingleStyle(regularShape)
    }
    const resolvedParams = Object.assign({}, options, {
      geometry: isDefined(geometry) ? getOlGeometryStyle(geometry) : undefined,
      fill: getOlFillSingleStyle(fill),
      stroke: getOlStrokeSingleStyle(stroke),
      image: imageStyle,
      text: getOlTextSingleStyle(text)
    })
    this._style = new OlStyle.Style(resolvedParams)
  }

  getStyle(): OlStyleInstanceType {
    return this._style
  }
}
