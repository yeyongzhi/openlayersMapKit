import { isDefined, isString } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/index'
import type { ProjectionUnitsType, OlProjOptionsType, OlProjInstanceType } from './type'
import { OlProj } from '../../../source/index'

const PACKAGE_NAME = 'Projection'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 坐标系类
 *
 */

export default class Projection {
  resolvedProjectionection: OlProj.Projection
  protected code: string = ''
  protected units: ProjectionUnitsType = 'degrees'

  constructor(proj: string | OlProjOptionsType) {
    let result: string = ''
    if (isString(proj)) {
      result = (proj as string).startsWith('EPSG') ? (proj as string) : 'EPSG:' + (proj as string)
    } else {
      const resolvedProjection = proj as OlProjOptionsType
      if (!isDefined(resolvedProjection.code)) {
        error_(createMessage('constructor', '初始化参数有误'))
      }
      result = resolvedProjection.code
      result = result.startsWith('EPSG') ? result : 'EPSG:' + result
    }
    // 到此为止，result一定是一个完整的坐标系代码，例如EPSG:4326
    this.code = result
    const projection = OlProj.get(result)
    if (!isDefined(projection)) {
      error_(createMessage('constructor', `坐标系${result}不存在`))
    }
    this.resolvedProjectionection = projection
    this.units = (projection as OlProjInstanceType).getUnits()
  }

  getCode() {
    return this.code
  }

  getUnits() {
    return this.units
  }

  getAxisOrientation() {
    return this.resolvedProjectionection.getAxisOrientation()
  }

  getExtent() {
    return this.resolvedProjectionection.getExtent()
  }

  getProjection(): OlProj.Projection {
    return this.resolvedProjectionection
  }
}
