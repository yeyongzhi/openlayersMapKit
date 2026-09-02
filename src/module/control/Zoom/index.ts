import { isDefined, isNumber, isString } from '../../../utils/index'
import { OlControl } from '../../../source/index'
import { type OMapControlZoomOptionsType, DEFAULT_ZOOM_OPTIONS } from './type'
import Control from '../Control/index'
import { type OMapControlIdType } from '../Control/type'

/**
 */

export default class Zoom extends Control<OlControl.Zoom> {
  constructor(options?: OMapControlZoomOptionsType)
  constructor(id: OMapControlIdType, options?: OMapControlZoomOptionsType)

  constructor(
    idOrOptions?: OMapControlZoomOptionsType | OMapControlIdType,
    options?: OMapControlZoomOptionsType
  ) {
    super('Zoom')
    if (isDefined(idOrOptions) && (isNumber(idOrOptions) || isString(idOrOptions))) {
      this.setId(idOrOptions as OMapControlIdType)
      this._control = new OlControl.Zoom(Object.assign({}, DEFAULT_ZOOM_OPTIONS, options))
    } else {
      this._control = new OlControl.Zoom(Object.assign({}, DEFAULT_ZOOM_OPTIONS, idOrOptions))
    }
  }
}
