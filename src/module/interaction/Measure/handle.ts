import { type OMapMeasureMode, MeasureMode } from './type'
import { type OlDrawType, DrawMode } from '../Draw/type'

export function getOlDrawType(mode: OMapMeasureMode): { type: OlDrawType, geometryFunction: any } {
    let type: OlDrawType = 'Point'
    let geometryFunction: any = null
    switch (mode) {
        case MeasureMode.Distance:
            type = DrawMode.LineString;
            break;
        case MeasureMode.Area:
            type = DrawMode.Polygon;
            break;
    }
    return { type, geometryFunction }
}

export function createMeasureElement(text: string) {
    let div = document.createElement('div')
    div.style.padding = '2px 5px'
    div.style.borderRadius = '5px'
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    div.style.color = '#FFFFFF'
    div.style.fontSize = '12px'
    div.innerHTML = text
    return div
}