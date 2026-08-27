import { type OlSizeType, type OMapSizeType } from './type'
import Size from './index'
import { isDefined } from '../../../utils/define'

export function handleGetSizeValue(size: OMapSizeType): OlSizeType
export function handleGetSizeValue(size?: undefined): undefined

export function handleGetSizeValue(size?: OMapSizeType): OlSizeType | undefined {
  if (isDefined(size)) {
    return size instanceof Size ? (size.toArray() as OlSizeType) : (size as OlSizeType)
  }
  return undefined
}
