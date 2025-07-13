import { Pixel, Lnglat, Map } from '../../../index'
import type { OMapEventType, OMapEventTarget, OlCoordinateType } from '../../../utils/index'

export function MapEventTypeIsMap(type: OMapEventType): boolean {
    return type.startsWith('map:')
}

export function handleMapOnCallBack(target: unknown, type: OMapEventType, e: any) {
    let result: OMapEventTarget | null = {
        target,
        type
    }
    switch (type) {
        case 'map:click':
        case 'map:singleclick':
        case 'map:dbclick':
            if (e.pixel) result.pixel = new Pixel(...(e.pixel as OlCoordinateType))
            if (e.coordinate) result.coordinate = new Lnglat(...(e.coordinate as OlCoordinateType))
                break;
        case 'view:change:resolution':
            if(e.oldValue) result.oldValue = e.oldValue
            result.newValue = e.newValue || (target as Map).getResolution()
                break;
        case 'view:change:center':
            if(e.oldValue) result.oldValue = new Lnglat(...(e.oldValue as OlCoordinateType))
            result.newValue = e.newValue || (target as Map).getCenter()
            break;
        case 'view:change:rotation':
            if(e.oldValue) result.oldValue = e.oldValue
            result.newValue = e.newValue || (target as Map).getRotation()
            break;
        case 'view:propertychange':
            if(e.oldValue) result.oldValue = (e.key === 'center') ? new Lnglat(...(e.oldValue as OlCoordinateType)) : e.oldValue
            if(e.key === 'center') {
                result.newValue = e.newValue || (target as Map).getCenter()
            } else if(e.key === 'rotation') {
                result.newValue = e.newValue || (target as Map).getRotation()
            } else if(e.key === 'resolution') {
                result.newValue = e.newValue || (target as Map).getResolution()
            }
            break;
        default:
            break;
    }
    return result
}