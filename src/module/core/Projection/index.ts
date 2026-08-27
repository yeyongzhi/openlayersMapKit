import { isDefined, isString } from '../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { ProjectionUnitsType, OlProjOptionsType, OlProjInstanceType } from './type'
import { OlProj } from '../../../source/index'

const PACKAGE_NAME = 'Map'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 坐标系类
 * @class
 * @classdesc 坐标系类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/8
 * @updateDate 2025/7/8
 */

export default class Projection {
  _projection: OlProj.Projection
  protected code: string = ''
  protected units: ProjectionUnitsType = 'degrees'

  constructor(proj: string | OlProjOptionsType) {
    let result: string = ''
    if (isString(proj)) {
      result = (proj as string).startsWith('EPSG') ? (proj as string) : 'EPSG:' + (proj as string)
    } else {
      let _proj = proj as OlProjOptionsType
      if (!isDefined(_proj.code)) {
        error_(createMessage('constructor', '初始化参数有误'))
      }
      result = _proj.code
      result = result.startsWith('EPSG') ? result : 'EPSG:' + result
    }
    // 到此为止，result一定是一个完整的坐标系代码，例如EPSG:4326
    this.code = result
    this._projection = OlProj.get(result) as OlProj.Projection
    if (!isDefined(this._projection)) {
      warn_(createMessage('constructor', '坐标系不存在'))
    }
    this.units = (this._projection as OlProjInstanceType).getUnits()
  }

  getCode() {
    return this.code
  }

  getUnits() {
    return this.units
  }

  getAxisOrientation() {
    return this._projection.getAxisOrientation()
  }

  getExtent() {
    return this._projection.getExtent()
  }

  getProjection(): OlProj.Projection {
    return this._projection
  }
}
