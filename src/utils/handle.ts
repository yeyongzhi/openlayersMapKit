import type { OMapEventType } from './olType/map'

export function MapEventTypeIsMap(type: OMapEventType): boolean {
    return type.startsWith('map:')
}