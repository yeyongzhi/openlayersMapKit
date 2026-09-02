import { isDefined, isString } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/index'
import { OlProj } from '../../../source/index'
import LngLat from '../../basic/LngLat/index'
import Projection from '../../core/Projection/index'
import type { OMapProjType } from '../../../utils/index'
import type { OlProjInstanceType } from '../../core/Projection/type'
import { isValidCoordinate } from '../../basic/LngLat/type'

const PACKAGE_NAME = 'ProjUtil'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 */
export default class ProjUtil {
  static fromLonLat(coordinate: LngLat | number[], projection?: OMapProjType): LngLat {
    if (!isDefined(coordinate)) {
      error_(createMessage('fromLonLat', commonMessage.paramsNotDefined('coordinate')))
    }
    if (!isValidCoordinate(coordinate)) {
      error_(createMessage('fromLonLat', commonMessage.paramsInvalidFormat('coordinate')))
    }
    let coordinateValues = coordinate as number[]
    if (coordinate instanceof LngLat) {
      coordinateValues = coordinate.toArray()
    }
    const resolvedProjection: Projection = isDefined(projection)
      ? isString(projection)
        ? new Projection(projection as string)
        : (projection as Projection)
      : new Projection('EPSG:3857')
    const result: number[] = OlProj.fromLonLat(
      coordinateValues,
      (resolvedProjection as Projection).resolvedProjectionection as OlProjInstanceType
    )
    return new LngLat(result[0], result[1])
  }

  static toLonLat(coordinate: LngLat | number[], projection?: OMapProjType): LngLat {
    if (!isDefined(coordinate)) {
      error_(createMessage('toLonLat', commonMessage.paramsNotDefined('coordinate')))
    }
    if (!isValidCoordinate(coordinate)) {
      error_(createMessage('toLonLat', commonMessage.paramsInvalidFormat('coordinate')))
    }
    let coordinateValues = coordinate as number[]
    if (coordinate instanceof LngLat) {
      coordinateValues = coordinate.toArray()
    }
    const resolvedProjection: Projection = isDefined(projection)
      ? isString(projection)
        ? new Projection(projection as string)
        : (projection as Projection)
      : new Projection('EPSG:3857')
    const result: number[] = OlProj.toLonLat(
      coordinateValues,
      (resolvedProjection as Projection).resolvedProjectionection as OlProjInstanceType
    )
    return new LngLat(result[0], result[1])
  }
}
