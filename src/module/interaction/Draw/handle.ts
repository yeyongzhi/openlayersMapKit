import { OlDrawCreateBox, OlDrawCreateRegularPolygon } from '../../../source/index'
import type { OMapDrawMode, OlDrawType } from './type'

export function getOlDrawType(mode: OMapDrawMode): { type: OlDrawType, geometryFunction: any } {
    let type: OlDrawType = 'Point'
    let geometryFunction: any = null
    switch (mode) {
        case 'Point':
        case 'LineString':
        case 'Polygon':
            type = mode;
            break;
        case 'Circle':
            type = 'Circle';
            break;
        case 'Rectangle':
            type = 'Circle';
            geometryFunction = OlDrawCreateBox()
            break;
    }
    return { type, geometryFunction }
}