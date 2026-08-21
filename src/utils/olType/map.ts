import Lnglat from '../../module/basic/Lnglat/index'
import Pixel from '../../module/basic/Pixel/index'
import OlPackage from '../../source/index'

export type OlMapOnEventType = Parameters<OlPackage.Map['on']>[0]
export type OlViewOnEventType = Parameters<OlPackage.View['on']>[0]
