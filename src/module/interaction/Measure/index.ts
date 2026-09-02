import { isDefined, isFunction } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import { OlFeature, OlGeometry, OlInteraction, OlObservable } from '../../../source/index'
import type { EventsKey } from 'ol/events'
import Interaction from '../Interaction/index'
import VectorLayer from '../../layer/VectorLayer/index'
import type Map from '../../core/Map/index'
import Popup from '../../basic/Popup/index'
import Pixel from '../../basic/Pixel/index'
import LineString from '../../core/Feature/LineString/index'
import Polygon from '../../core/Feature/Polygon/index'
import type { OlFeatureInstanceType } from '../../core/Feature/BasicFeature/type'
import type { EventIdType } from '../../util/Event/type'
import type { OMapVectorSourceType } from '../../layer/VectorLayer/type'
import type { OlCoordinateType } from '../../basic/LngLat/type'
import { DEFAULT_STYLE } from '../../basic/Style/handle'
import {
  DRAW_DEFAULT_PARAMS,
  MeasureEventType,
  type OMapInteractionMeasureEventType,
  type OMapMeasureMode,
  type OMapMeasureParamsType,
  type OMapMeasureResult,
  type OMapMeasureEvent,
  type OMapMeasureEventMap,
  type OMapMeasureType,
  isOMapInteractionMeasureEventType,
  isOMapMeasureMode
} from './type'
import type Event from '../../util/Event/index'
import {
  createCloseElement,
  createMarkerElement,
  createResultElement,
  createTooltipElement,
  formatArea,
  formatDistance,
  getGeometryPointCount,
  getMeasureUnit,
  getOlDrawType
} from './handle'

const PACKAGE_NAME = 'Measure'
const createMessage = getPackageMessage(PACKAGE_NAME)

export default class Measure extends Interaction<OMapMeasureType> {
  declare events: Event<OMapMeasureEventMap>
  mode: OMapMeasureMode

  result: OMapMeasureResult

  protected tooltipPopup: Popup
  protected resultPopup: Popup
  protected markerPopups: Popup[] = []
  protected drawFeature: OlFeatureInstanceType | null = null
  protected geometryListener: EventsKey | null = null
  protected pointerMoveListener: EventsKey | null = null
  protected eventInitialized = false
  protected completionTimer: ReturnType<typeof setTimeout> | null = null

  constructor(mode: OMapMeasureMode, params: OMapMeasureParamsType = {}) {
    if (!isDefined(mode)) {
      error_(createMessage('constructor', commonMessage.paramsNotDefined('mode')))
    }
    if (!isOMapMeasureMode(mode)) {
      error_(createMessage('constructor', commonMessage.paramsInvalidEnum(mode)))
    }
    const { id, active, style, ...drawParams } = params
    super('Measure', { id })

    this.mode = mode
    this.result = {
      value: 0,
      unit: getMeasureUnit(mode)
    }

    this.layer = new VectorLayer({
      style: style || DEFAULT_STYLE
    })

    this._interaction = new OlInteraction.Draw({
      ...DRAW_DEFAULT_PARAMS,
      ...drawParams,
      ...getOlDrawType(mode),
      source: this.layer.getSource() as OMapVectorSourceType,
      features: undefined,
      style: undefined
    })

    this.tooltipPopup = this.createPopup(
      'omap-measure-tooltip',
      createTooltipElement('单击地图开始测量')
    )
    this.resultPopup = this.createPopup('omap-measure-result', createTooltipElement(''))
    this.initInteractionEvent(active)
  }

  protected initMeasureEvent() {
    if (this.eventInitialized) {
      return
    }
    this.eventInitialized = true

    this.trackLifecycleEvent(
      this._interaction.on('change:active', () => {
        if (this._interaction.getActive()) {
          this.onMeasureActive()
        } else {
          this.onMeasureInactive()
        }
      })
    )

    this.trackLifecycleEvent(
      this._interaction.on('drawstart', (event) => {
        this.events.emit(MeasureEventType.measureStart, {
          target: this,
          type: MeasureEventType.measureStart
        })
        this.onMeasureStart(event.feature)
      })
    )

    this.trackLifecycleEvent(
      this._interaction.on('drawend', (event) => {
        this.onMeasureEnd(event.feature)
      })
    )
  }

  protected onMeasureActive() {
    this.result.value = 0
    this.showTooltip('单击地图开始测量')
    this.bindPointerMove()
  }

  protected onMeasureInactive() {
    this.unbindPointerMove()
  }

  protected onMeasureStart(feature: OlFeatureInstanceType) {
    this.clearMeasurement()
    this.drawFeature = feature
    this.bindGeometryChange(feature)
  }

  protected onMeasureEnd(feature: OlFeatureInstanceType) {
    this.drawFeature = feature
    this.unbindPointerMove()
    this.unbindGeometryChange()
    this.hideTooltip()
    this.renderFinalResult()
    this.completeAfterDrawEnd()
  }

  protected completeAfterDrawEnd() {
    if (this.completionTimer) {
      clearTimeout(this.completionTimer)
    }
    this.completionTimer = setTimeout(() => {
      this.completionTimer = null
      if (this.isDisposed()) {
        return
      }
      if (this.getActive()) {
        this.setActive(false)
      }
      this.events.emit(MeasureEventType.measureEnd, {
        target: this,
        type: MeasureEventType.measureEnd,
        result: { ...this.result }
      })
    }, 0)
  }

  protected bindPointerMove() {
    if (!this.map || this.pointerMoveListener) {
      return
    }
    this.pointerMoveListener = this.map.getMap().on('pointermove', (event) => {
      this.tooltipPopup.setPosition(event.coordinate as OlCoordinateType)
    })
  }

  protected unbindPointerMove() {
    if (this.pointerMoveListener) {
      OlObservable.unByKey(this.pointerMoveListener)
      this.pointerMoveListener = null
    }
  }

  protected bindGeometryChange(feature: OlFeatureInstanceType) {
    const geometry = feature.getGeometry()
    if (!geometry) {
      return
    }
    this.geometryListener = geometry.on('change', (event) => {
      this.updateByGeometry(event.target as OlGeometry.Geometry)
    })
  }

  protected unbindGeometryChange() {
    if (this.geometryListener) {
      OlObservable.unByKey(this.geometryListener)
      this.geometryListener = null
    }
  }

  protected updateByGeometry(geometry: OlGeometry.Geometry) {
    if (geometry instanceof OlGeometry.LineString) {
      this.updateDistance(geometry)
      return
    }
    if (geometry instanceof OlGeometry.Polygon) {
      this.updateArea(geometry)
    }
  }

  protected updateDistance(geometry: OlGeometry.LineString) {
    const value = this.map?.getLength(new LineString(new OlFeature({ geometry }))) || 0
    this.result.value = value

    const pointCount = getGeometryPointCount(geometry)
    const text = pointCount >= 2 ? formatDistance(value) : '单击地图开始测量'
    const helper = pointCount >= 2 ? '单击继续，双击结束测量' : undefined
    this.tooltipPopup.setElement(createResultElement('总长', text, helper))
    this.renderDistanceMarkers(geometry)
  }

  protected updateArea(geometry: OlGeometry.Polygon) {
    const value = this.map?.getArea(new Polygon(new OlFeature({ geometry }))) || 0
    this.result.value = value

    if (getGeometryPointCount(geometry) < 4) {
      this.showTooltip('单击继续绘制')
      this.setPopupPosition(this.resultPopup)
      return
    }

    this.setPopupPosition(this.tooltipPopup)
    this.setPopupElement(this.tooltipPopup)
    this.resultPopup.setElement(
      createResultElement('面积', formatArea(value), '单击继续，双击结束测量')
    )
    this.resultPopup.setPosition(geometry.getInteriorPoint().getCoordinates() as OlCoordinateType)
  }

  protected renderDistanceMarkers(geometry: OlGeometry.LineString) {
    this.clearMarkerPopups()
    const coordinates = geometry.getCoordinates() as OlCoordinateType[]
    coordinates.forEach((coordinate, index) => {
      const text =
        index === 0 ? '起点' : formatDistance(this.getDistanceToIndex(coordinates, index))
      const popup = this.createPopup(
        `omap-measure-marker-${index}`,
        createMarkerElement(text, index === 0 ? undefined : () => this.removeDistancePoint(index))
      )
      popup.setPosition(coordinate as OlCoordinateType)
      this.addPopup(popup)
      this.markerPopups.push(popup)
    })
  }

  protected renderFinalResult() {
    if (!this.drawFeature) {
      return
    }
    const geometry = this.drawFeature.getGeometry()
    if (geometry instanceof OlGeometry.Polygon) {
      const element = createResultElement('面积', formatArea(this.result.value))
      element.style.display = 'flex'
      element.style.alignItems = 'center'
      element.appendChild(createCloseElement(() => this.clearMeasurement()))
      this.resultPopup.setElement(element)
      this.resultPopup.setPosition(geometry.getInteriorPoint().getCoordinates() as OlCoordinateType)
      return
    }
    if (geometry instanceof OlGeometry.LineString) {
      this.renderDistanceMarkers(geometry)
    }
  }

  protected removeDistancePoint(index: number) {
    const geometry = this.drawFeature?.getGeometry()
    if (!(geometry instanceof OlGeometry.LineString)) {
      return
    }
    const coordinates = geometry.getCoordinates() as OlCoordinateType[]
    coordinates.splice(index, 1)
    if (coordinates.length < 2) {
      this.unbindGeometryChange()
      this.clearMeasurement()
      geometry.setCoordinates(coordinates)
    } else {
      geometry.setCoordinates(coordinates)
      this.updateDistance(geometry)
    }
  }

  protected getDistanceToIndex(coordinates: OlCoordinateType[], index: number): number {
    if (!this.map) {
      return 0
    }
    return this.map.getLength(new LineString(coordinates.slice(0, index + 1)))
  }

  protected showTooltip(text: string) {
    this.tooltipPopup.setElement(createTooltipElement(text))
  }

  protected hideTooltip() {
    this.setPopupPosition(this.tooltipPopup)
    this.setPopupElement(this.tooltipPopup)
  }

  protected createPopup(id: string, element: HTMLElement) {
    return new Popup({
      id,
      element,
      offset: new Pixel(0, -10)
    })
  }

  protected addPopup(popup: Popup) {
    if (this.map) {
      this.map.addPopup(popup)
    }
  }

  protected removePopup(popup: Popup) {
    if (this.map) {
      this.map.removePopup(popup)
    }
  }

  protected clearMarkerPopups() {
    this.markerPopups.forEach((popup) => this.removePopup(popup))
    this.markerPopups = []
  }

  protected clearMeasurement(clearLayer = true) {
    this.clearMarkerPopups()
    this.setPopupPosition(this.resultPopup)
    this.setPopupElement(this.resultPopup)
    if (clearLayer) {
      this.layer?.clear()
      this.drawFeature = null
      this.result.value = 0
    }
  }

  protected setPopupPosition(popup: Popup, coordinate?: number[]) {
    popup.getPopup().setPosition(coordinate)
  }

  protected setPopupElement(popup: Popup, element?: HTMLElement) {
    popup.getPopup().setElement(element)
  }

  cancel() {
    this._interaction.abortDrawing()
  }

  revoke() {
    this._interaction.removeLastPoint()
  }

  finish() {
    this._interaction.finishDrawing()
  }

  override setMap(map: Map | null) {
    if (!map) {
      this.unbindPointerMove()
      this.unbindGeometryChange()
      this.clearMeasurement(false)
      this.removePopup(this.tooltipPopup)
      this.removePopup(this.resultPopup)
      super.setMap(null)
      return
    }
    super.setMap(map)
    this.initMeasureEvent()
    this.addPopup(this.tooltipPopup)
    this.addPopup(this.resultPopup)
  }

  on(
    type: OMapInteractionMeasureEventType,
    callback: (event: OMapMeasureEvent) => void
  ): EventIdType {
    this.validateEvent(type, callback, 'on')
    return this.events.on(type, callback)
  }

  once(
    type: OMapInteractionMeasureEventType,
    callback: (event: OMapMeasureEvent) => void
  ): EventIdType | undefined {
    this.validateEvent(type, callback, 'once')
    return this.events.once(type, callback)
  }

  un(id: EventIdType) {
    if (!isDefined(id)) {
      error_(createMessage('un', commonMessage.paramsNotDefined('id')))
    }
    this.events.remove(id)
  }

  protected validateEvent(
    type: OMapInteractionMeasureEventType,
    callback: (event: OMapMeasureEvent) => void,
    methodName: string
  ) {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage(methodName, commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionMeasureEventType(type)) {
      error_(createMessage(methodName, commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage(methodName, commonMessage.paramsInvalidFormat('callback', 'function')))
    }
  }

  protected override destroy() {
    if (this.map) {
      super.destroy()
      return
    }
    this.unbindPointerMove()
    this.unbindGeometryChange()
    this.clearMeasurement(false)
  }

  override dispose(): void {
    if (this.isDisposed()) {
      return
    }
    if (this.completionTimer) {
      clearTimeout(this.completionTimer)
      this.completionTimer = null
    }
    this.unbindPointerMove()
    this.unbindGeometryChange()
    this.clearMeasurement()
    super.dispose()
  }
}
