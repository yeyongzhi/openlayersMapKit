import { isDefined, isNumber, isString } from '../../../utils/index'
import { OlControl } from '../../../source/index'
import {
  type OMapControlFullScreenOptionsType,
  type OMapControlFullScreenType,
  DEFAULT_FULLSCREEN_OPTIONS
} from './type'
import Control from '../Control/index'
import { type OMapControlIdType } from '../Control/type'

/**
 * @class FullScreen
 * @classdesc 全屏控件类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/10
 * @updateDate 2025/10/10
 */

export default class FullScreen extends Control<OMapControlFullScreenType> {
  constructor(options?: OMapControlFullScreenOptionsType)
  constructor(id: OMapControlIdType, options?: OMapControlFullScreenOptionsType)

  constructor(
    idOrOptions?: OMapControlFullScreenOptionsType | OMapControlIdType,
    options?: OMapControlFullScreenOptionsType
  ) {
    super('FullScreen')
    if (isDefined(idOrOptions) && (isNumber(idOrOptions) || isString(idOrOptions))) {
      this.setId(idOrOptions as OMapControlIdType)
      this._control = new OlControl.FullScreen(
        Object.assign({}, DEFAULT_FULLSCREEN_OPTIONS, options)
      )
    } else {
      this._control = new OlControl.FullScreen(
        Object.assign({}, DEFAULT_FULLSCREEN_OPTIONS, idOrOptions)
      )
    }
  }
}
