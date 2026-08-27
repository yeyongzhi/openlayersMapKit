import { isDefined } from '../../../utils/index'
import { type OMapProjectionType, type OlProjType, type OlProjInstanceType } from './type'
import Projection from './index'

export function handleGetProjectionValue(
  projection?: OMapProjectionType
): OlProjType | OlProjInstanceType | undefined {
  if (isDefined(projection)) {
    return projection instanceof Projection
      ? (projection.getProjection() as OlProjInstanceType)
      : (projection as OlProjType)
  }
  return undefined
}
