import { isDefined, isString } from '../../../utils/index';
import { type OMapEventType, type OMapEventTarget, OMapMapEventTypes } from './type'
import Lnglat from '../../basic/Lnglat/index'
import { type OlCoordinateType } from '../../basic/Lnglat/type'
import Pixel from '../../basic/Pixel/index'
import Map from './index'
import Interaction from '../../interaction/Interaction/index'
import Draw from '../../interaction/Draw/index'
import Measure from '../../interaction/Measure/index'


export function MapEventTypeIsMap(type: OMapEventType): boolean {
    return type && type.startsWith('map:')
}

export function handleMapOnCallBack(target: Map, type: OMapEventType, e: any) {
    let result: OMapEventTarget | null = {
        target,
        type
    }
    if(!isDefined(e)) return result
    switch (type) {
        case 'map:click':
        case 'map:singleclick':
        case 'map:dbclick':
            if (isDefined(e.pixel)) {
                result.pixel = new Pixel(...(e.pixel as OlCoordinateType))
            }
            if (isDefined(e.coordinate)) {
                result.coordinate = new Lnglat(...(e.coordinate as OlCoordinateType))
            }
            break;
        case 'map:propertychange':
            if (e.oldValue) result.oldValue = (e.key === 'center') ? new Lnglat(...(e.oldValue as OlCoordinateType)) : e.oldValue
            if (e.key === 'size') {
                result.newValue = e.newValue || (target as Map).getSize()
            } else {
                result.newValue = e.newValue
            }
            result.key = e.key
            break;
        case 'map:moveend':
            if (e.oldCenter) result.oldValue = new Lnglat(...(e.oldCenter as OlCoordinateType))
            result.newValue = e.newCenter || (target as Map).getCenter()
            break;
        case 'view:change:resolution':
            if (e.oldValue) result.oldValue = e.oldValue
            result.newValue = e.newValue || (target as Map).getResolution()
            break;
        case 'view:change:center':
            if (e.oldValue) result.oldValue = new Lnglat(...(e.oldValue as OlCoordinateType))
            result.newValue = e.newValue || (target as Map).getCenter()
            break;
        case 'view:change:rotation':
            if (e.oldValue) result.oldValue = e.oldValue
            result.newValue = e.newValue || (target as Map).getRotation()
            break;
        case 'view:propertychange':
            if (e.oldValue) result.oldValue = (e.key === 'center') ? new Lnglat(...(e.oldValue as OlCoordinateType)) : e.oldValue
            if (e.key === 'center') {
                result.newValue = e.newValue || (target as Map).getCenter()
            } else if (e.key === 'rotation') {
                result.newValue = e.newValue || (target as Map).getRotation()
            } else if (e.key === 'resolution') {
                result.newValue = e.newValue || (target as Map).getResolution()
            } else {
                result.newValue = e.newValue
            }
            result.key = e.key
            break;
        default:
            break;
    }
    return result
}

export function isOMapMapEventType(type: unknown): type is OMapEventType {
    return isString(type) && OMapMapEventTypes.includes(type as any)
}

/**
 * 判断地图是否正在绘制
 * @param mapInteractions 地图交互事件
 * @returns {boolean} 是否正在绘制
 */
export function isMapDrawing(mapInteractions: Interaction[]): boolean {
    return mapInteractions.some((interaction) => {
        return isDefined(interaction) && interaction instanceof Draw && interaction.getActive()
    })
}

/**
 * 判断地图是否正在测量
 * @param mapInteractions 地图交互事件
 * @returns {boolean} 是否正在测量
 */
export function isMapMeasuring(mapInteractions: Interaction[]): boolean {
    return mapInteractions.some((interaction) => {
        return isDefined(interaction) && interaction instanceof Measure && interaction.getActive()
    })
}