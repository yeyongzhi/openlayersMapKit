import { type OMapExtentType, type OlExtentType } from './type'
import Extent from './index'
import { isDefined } from '../../../utils/define'

export function handleGetExtentValue(extent?: OMapExtentType): OlExtentType | undefined {
    if(isDefined(extent)) {
        return extent instanceof Extent ? (extent.getExtent() as OlExtentType) : (extent as OlExtentType)
    }
    return undefined
}