import { type OMapMeasureMode, MeasureMode } from './type'
import { type OlDrawType, DrawMode } from '../Draw/type'
import type { OlMapInstanceType } from '../../core/Map/type'
import Map from '../../core/Map/index'
import type { OlFeatureInstanceType } from '../../core/Feature/BasicFeature/type';
import LineString from '../../core/Feature/LineString/index'
import type { OlLineStringGeomInstanceType } from '../../core/Feature/LineString/type';
import type { OlPolygonGeomInstanceType } from '../../core/Feature/Polygon/type';
import { OlGeometry } from '../../../source/index'
import { isDefined } from '../../../utils/index';
import Popup from '../../basic/Popup/index'
import type { OMapPopupParamsType } from '../../basic/Popup/type'

const MeasureMarkerIdSuffix = 'omap-measure-marker'
const MEASURE_MERKER_INDEX_NAME = 'omap-measure-marker-index'

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

/**
 * 
 */
let distanceElement: HTMLElement | null = null
let areaElement: HTMLElement | null = null
/**
 * 测量模式下的要素
 */
let distanceFeature: OlFeatureInstanceType | null = null
/**
 * 面积测量模式下的要素
 */
let areaFeature: OlFeatureInstanceType | null = null

let measureMap: Map | null = null

let measureMarkerElements: HTMLElement[] = []
let measureMarkerPopups: Popup[] = []

/**
 * 更新当前Measure的要素
 * @param {OMapMeasureMode} mode 
 * @param {OlFeatureInstanceType} feature 
 */
export function updateMeasureFeature(mode: OMapMeasureMode, feature: OlFeatureInstanceType, map: Map) {
    if (mode === MeasureMode.Distance) {
        distanceFeature = feature
    } else if (mode === MeasureMode.Area) {
        areaFeature = feature
    }
    measureMap = map
}

/**
 * 创建测量提示元素
 * @param {string} text 
 * @returns {HTMLElement} div
 */
export function createMeasureTooltipElement(text: string): HTMLElement {
    let div = document.createElement('div')
    div.style.padding = '2px 5px'
    div.style.borderRadius = '5px'
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    div.style.color = '#FFFFFF'
    div.style.fontSize = '12px'
    div.innerHTML = text
    return div
}

export function createMeasureDistanceElement(distance: string): HTMLElement {
    if (!distanceElement) {
        let div = document.createElement('div')
        div.style.padding = '2px 5px'
        div.style.borderRadius = '5px'
        div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        div.style.color = '#FFFFFF'
        div.style.fontSize = '12px'
        // 距离信息
        let p = document.createElement('p')
        p.innerHTML = `总长：<span style="color: var(--omap-primary-color);margin: 0 5px;">${distance || ''}</span>米`
        div.appendChild(p)
        // 提示信息
        let p2 = document.createElement('p')
        p2.innerHTML = '单击继续，双击结束测量'
        div.appendChild(p2)
        distanceElement = div
    } else {
        distanceElement.children[0].innerHTML = `总长: <span style="color: var(--omap-primary-color);margin: 0 5px;">${distance || ''}</span> 米`
    }
    return distanceElement
}

export function createMeasureAreaElement(value: string): HTMLElement {
    if (!areaElement) {
        let div = document.createElement('div')
        div.style.padding = '2px 5px'
        div.style.borderRadius = '5px'
        div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        div.style.color = '#FFFFFF'
        div.style.fontSize = '12px'
        // 距离信息
        let p = document.createElement('p')
        p.innerHTML = createMeasureValueSpan('总长', value)
        div.appendChild(p)
        // 提示信息
        let p2 = document.createElement('p')
        p2.innerHTML = '单击继续，双击结束测量'
        div.appendChild(p2)
        areaElement = div
    } else {
        areaElement.children[0].innerHTML = createMeasureValueSpan('面积', value)
    }
    return areaElement
}

export function createMeasureMarkerPopup(params: OMapPopupParamsType) {
    let popup = new Popup(params)
    measureMarkerPopups.push(popup)
    return popup
}

export function createMeasureMarkerElement(distance: string, index: number) {
    let div = document.createElement('div')
    div.className = `${MeasureMarkerIdSuffix}-${index}`
    div.style.padding = '2px 5px'
    div.style.borderRadius = '5px'
    div.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
    div.style.color = '#000000'
    div.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)'
    // 距离信息
    let distanceElement = document.createElement('span')
    distanceElement.style.color = 'var(--omap-primary-color)'
    distanceElement.style.margin = '0 5px'
    distanceElement.innerHTML = distance
    div.appendChild(distanceElement)
    // 关闭按钮
    if (index !== 0) {
        let closeElement = document.createElement('span')
        closeElement.title = '删除'
        closeElement.innerHTML = '×'
        closeElement.style.color = '#000000'
        closeElement.style.cursor = 'pointer'
        div.setAttribute(MEASURE_MERKER_INDEX_NAME, index.toString())
        closeElement.addEventListener('click', (e) => {
            console.log("点击删除")
            let index = div.getAttribute(MEASURE_MERKER_INDEX_NAME)
            console.log(index)
            if (isDefined(index)) {
                handleDeleteFn(Number(index))
            }
        })
        div.appendChild(closeElement)
    }
    measureMarkerElements.push(div)
    return div
}

function handleDeleteFn(index: number) {
    if (measureMarkerPopups.length === 2) {
        handleDeletePosition()
        measureMarkerElements = []
        measureMarkerPopups.forEach((_, i) => {
            removeMeasureMarker(i)
            if (i === measureMarkerPopups.length - 1) {
                measureMarkerPopups = []
            }
        })
        return false;
    }
    // 处理坐标信息
    handleDeletePosition(index)
    // 删除对应的Element
    measureMarkerElements.splice(index, 1)
    // Element重新赋值index
    measureMarkerElements.forEach((item, index) => {
        item.className = `${MeasureMarkerIdSuffix}-${index}`
        item.setAttribute(MEASURE_MERKER_INDEX_NAME, index.toString())
    })
    // 删除对应的Popup
    removeMeasureMarker(index)
    measureMarkerPopups.splice(index, 1)
    // Popup重新赋值index
    measureMarkerPopups.forEach((item, index) => {
        item.id = getOMapMeasureMarkerId(index)
    })
    // 重新计算距离
    updateDistance()
}

/**
 * 移除对应测量标记点的Popup
 * @param index 
 */
export function removeMeasureMarker(index: number) {
    if (isDefined(measureMap)) {
        let popup = (measureMap as Map).getPopupById(`omap-measure-marker-${index}`)
        if (isDefined(popup)) {
            (measureMap as Map).removePopup(popup)
        }
    }
}

function handleDeletePosition(index?: number) {
    let target = distanceFeature ? distanceFeature : areaFeature
    if (isDefined(target)) {
        let geometry = target.getGeometry()
        if (isDefined(geometry)) {
            if (isDefined(index)) {
                let coordinates: any = []
                if (geometry instanceof OlGeometry.LineString) {
                    coordinates = (geometry as OlLineStringGeomInstanceType).getCoordinates();
                } else if (geometry instanceof OlGeometry.Polygon) {
                    coordinates = (geometry as OlPolygonGeomInstanceType).getCoordinates();
                }
                coordinates.splice(index, 1)
                if (geometry instanceof OlGeometry.LineString) {
                    (geometry as OlLineStringGeomInstanceType).setCoordinates(coordinates)
                } else if (geometry instanceof OlGeometry.Polygon) {
                    (geometry as OlPolygonGeomInstanceType).setCoordinates(coordinates)
                }
            } else {
                if (geometry instanceof OlGeometry.LineString) {
                    (geometry as OlLineStringGeomInstanceType).setCoordinates([])
                } else if (geometry instanceof OlGeometry.Polygon) {
                    (geometry as OlPolygonGeomInstanceType).setCoordinates([])
                }
            }
        }
    }
}

function updateDistance() {
    if (distanceFeature) {
        let coordinates = (distanceFeature.getGeometry() as OlLineStringGeomInstanceType).getCoordinates();
        measureMarkerElements.forEach((item, index) => {
            if (index > 0) { // 起点不需要动
                let calculateFeature = new LineString(coordinates.slice(0, index + 1))
                let length = (measureMap as Map).getLength(calculateFeature)
                item.children[0].innerHTML = isDefined(length) ? transformDistance(length) : '-'
            }
        })
    }
}

export function transformDistance(distance: number): string {
    return (distance / 1000).toFixed(2) + ' km'
}

export function transformArea(area: number): string {
    return (area / 1000000).toFixed(2) + ' km²'
}

export function getOMapMeasureMarkerId(index: number) {
    return `${MeasureMarkerIdSuffix}-${index}`
}

function createMeasureValueSpan(name: string, value: string) {
    return `${name}：<span style="color: var(--omap-primary-color);margin: 0 5px;font-weight: bolder;">${value || '-'}</span>`
}

export function destroy() {
    measureMarkerElements.forEach(item => {
        item.remove()
    })
    measureMarkerPopups.forEach(item => {
        (measureMap as Map).removePopup(item)
    })
    distanceFeature = null
    areaFeature = null
    measureMap = null
    setTimeout(() => {
        measureMarkerElements = []
        measureMarkerPopups = []
    }, 200)
}