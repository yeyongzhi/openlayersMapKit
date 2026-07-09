import { OlGeometry } from '../../../source/index'
import { type OMapMeasureMode, MeasureMode } from './type'
import { type OlDrawType, DrawMode } from '../Draw/type'

export function getOlDrawType(mode: OMapMeasureMode): { type: OlDrawType } {
    return {
        type: mode === MeasureMode.Area ? DrawMode.Polygon : DrawMode.LineString
    }
}

export function formatDistance(distance: number): string {
    return `${(distance / 1000).toFixed(2)} km`
}

export function formatArea(area: number): string {
    return `${(area / 1000000).toFixed(2)} km²`
}

export function getMeasureUnit(mode: OMapMeasureMode): string {
    return mode === MeasureMode.Area ? 'km²' : 'km'
}

export function getGeometryPointCount(geometry: OlGeometry.Geometry): number {
    if (geometry instanceof OlGeometry.LineString) {
        return geometry.getCoordinates().length;
    }
    if (geometry instanceof OlGeometry.Polygon) {
        return geometry.getCoordinates()[0]?.length || 0;
    }
    return 0;
}

function createBox(className: string) {
    const div = document.createElement('div')
    div.className = className
    div.style.padding = '2px 5px'
    div.style.borderRadius = '5px'
    div.style.backgroundColor = '#FFFFFF'
    div.style.color = '#000000'
    div.style.fontSize = '12px'
    div.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.25)'
    return div
}

export function createTooltipElement(text: string): HTMLElement {
    const div = createBox('omap-measure-tooltip')
    div.innerHTML = text
    return div
}

export function createResultElement(label: string, value: string, helperText?: string): HTMLElement {
    const div = createBox('omap-measure-result')
    div.innerHTML = `${label}：<span style="color: var(--omap-primary-color);margin: 0 5px;font-weight: bolder;">${value || '-'}</span>`
    if (helperText) {
        const helper = document.createElement('p')
        helper.className = 'omap-measure-helper'
        helper.style.margin = '2px 0 0'
        helper.innerHTML = helperText
        div.appendChild(helper)
    }
    return div
}

export function createMarkerElement(text: string, onClose?: () => void): HTMLElement {
    const div = document.createElement('div')
    div.className = 'omap-measure-marker'
    div.style.padding = '2px 5px'
    div.style.borderRadius = '5px'
    div.style.backgroundColor = '#FFFFFF'
    div.style.color = '#000000'
    div.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.35)'

    const value = document.createElement('span')
    value.style.color = 'var(--omap-primary-color)'
    value.style.margin = '0 5px'
    value.innerHTML = text
    div.appendChild(value)

    if (onClose) {
        const close = document.createElement('span')
        close.title = '删除'
        close.innerHTML = '×'
        close.style.color = '#000000'
        close.style.cursor = 'pointer'
        close.addEventListener('click', onClose)
        div.appendChild(close)
    }
    return div
}

export function createCloseElement(onClose: () => void): HTMLElement {
    const close = document.createElement('span')
    close.title = '删除'
    close.innerHTML = '×'
    close.style.color = '#000000'
    close.style.cursor = 'pointer'
    close.style.marginLeft = '5px'
    close.addEventListener('click', onClose)
    return close
}
