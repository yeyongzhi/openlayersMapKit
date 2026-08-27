import { defaultValue, isBoolean, isDefined, isNumber } from '../../../../utils/index'
import { commonMessage, error_, getPackageMessage, warn_ } from '../../../../utils/message'
import Lnglat from '../../../basic/Lnglat/index'
import { handleGetLnglatValue } from '../../../basic/Lnglat/handle'
import type { OMapCoordinateType } from '../../../basic/Lnglat/type'
import Extent from '../../../basic/Extent/index'
import { handleGetExtentValue } from '../../../basic/Extent/handle'
import { isValidExtent, type OMapExtentType } from '../../../basic/Extent/type'
import { handleGetSizeValue } from '../../../basic/Size/handle'
import type { OMapSizeType } from '../../../basic/Size/type'
import { handleGetPixelValue } from '../../../basic/Pixel/handle'
import type { OMapPixelType } from '../../../basic/Pixel/type'
import BaseFeature from '../../Feature/BasicFeature/index'
import type { OMapSimpleGeometryType } from '../../Feature/BasicFeature/type'
import Projection from '../../Projection/index'
import { OlGeometry } from '../../../../source/index'
import {
  OMAP_VIEW_ANIMATE_DEFAULT_OPTIONS,
  OMAP_VIEW_FIT_DEFAULT_OPTIONS,
  OMapEasing,
  type OMapViewAnimateOptionsType,
  type OMapViewFitOptionsType,
  type OMapViewType
} from '../type'

const createMessage = getPackageMessage('Map')

/** Adapts OMap value objects and validation to one native OpenLayers View. */
export default class ViewController {
  constructor(
    private readonly view: OMapViewType,
    private readonly projection: Projection
  ) {}

  getView(): OMapViewType {
    return this.view
  }

  getCenter(): Lnglat | undefined {
    const center = this.view.getCenter()
    return isDefined(center) ? new Lnglat(center) : undefined
  }

  setCenter(center?: OMapCoordinateType): void {
    if (!isDefined(center))
      error_(createMessage('setCenter', commonMessage.paramsNotDefined('center')))
    this.view.setCenter(handleGetLnglatValue(center as OMapCoordinateType))
  }

  getZoom(): number | undefined {
    return this.view.getZoom()
  }
  setZoom(zoom?: number): void {
    this.validateOptionalNumber(zoom, 'setZoom', 'zoom')
    this.view.setZoom(zoom as number)
  }

  getResolution(): number | undefined {
    return this.view.getResolution()
  }
  setResolution(resolution?: number): void {
    this.validateOptionalNumber(resolution, 'setResolution', 'resolution')
    this.view.setResolution(resolution as number)
  }

  getRotation(): number {
    return this.view.getRotation()
  }
  setRotation(rotation: number): void {
    this.validateOptionalNumber(rotation, 'setRotation', 'rotation')
    this.view.setRotation(rotation)
  }

  getExtent(): Extent {
    return new Extent(this.view.calculateExtent())
  }
  zoomIn(delta = 1): void {
    this.validateDelta(delta, 'zoomIn')
    this.view.adjustZoom(delta)
  }
  zoomOut(delta = -1): void {
    this.validateDelta(delta, 'zoomOut')
    this.view.adjustZoom(delta)
  }

  adjustCenter(delta: OMapCoordinateType): void {
    if (isDefined(delta)) this.view.adjustCenter(handleGetLnglatValue(delta))
  }
  adjustResolution(ratio: number, anchor?: OMapCoordinateType): void {
    this.view.adjustResolution(ratio, anchor ? handleGetLnglatValue(anchor) : undefined)
  }
  adjustRotation(delta: number, anchor?: OMapCoordinateType): void {
    this.view.adjustRotation(delta, anchor ? handleGetLnglatValue(anchor) : undefined)
  }
  adjustZoom(delta: number, anchor?: OMapCoordinateType): void {
    this.view.adjustZoom(delta, anchor ? handleGetLnglatValue(anchor) : undefined)
  }

  animate(options: OMapViewAnimateOptionsType): void {
    const input = defaultValue(options, {})
    this.view.animate({
      ...OMAP_VIEW_ANIMATE_DEFAULT_OPTIONS,
      center: handleGetLnglatValue(input.center),
      resolution: input.resolution,
      rotation: input.rotation,
      zoom: input.zoom,
      anchor: handleGetLnglatValue(input.anchor),
      duration: input.duration,
      easing: isDefined(input.easing)
        ? OMapEasing[input.easing as keyof typeof OMapEasing]
        : undefined
    })
  }

  beginInteraction(): void {
    this.view.beginInteraction()
  }
  calculateExtent(size?: OMapSizeType): Extent {
    return new Extent(
      this.view.calculateExtent(isDefined(size) ? handleGetSizeValue(size) : undefined)
    )
  }
  cancelAnimations(): void {
    this.view.cancelAnimations()
  }

  centerOn(coordinate: OMapCoordinateType, size: OMapSizeType, position: OMapPixelType): void {
    if (!isDefined(coordinate) || !isDefined(size) || !isDefined(position)) {
      warn_(
        createMessage(
          'centerOn',
          commonMessage.paramsListHaveNotDefined('coordinate', 'size', 'position')
        )
      )
    }
    this.view.centerOn(
      handleGetLnglatValue(coordinate),
      handleGetSizeValue(size),
      handleGetPixelValue(position)
    )
  }

  changed(): void {
    this.view.changed()
  }
  endInteraction(duration?: number, direction?: number, anchor?: OMapCoordinateType): void {
    this.view.endInteraction(
      duration,
      direction,
      isDefined(anchor) ? handleGetLnglatValue(anchor) : undefined
    )
  }

  fit(
    featureOrExtent: BaseFeature<OlGeometry.Geometry> | OMapExtentType,
    options?: OMapViewFitOptionsType
  ): void {
    if (!isDefined(featureOrExtent))
      error_(createMessage('fit', commonMessage.paramsNotDefined('featureOrExtent')))
    if (!(featureOrExtent instanceof BaseFeature) && !isValidExtent(featureOrExtent)) {
      error_(createMessage('fit', commonMessage.paramsInvaildFormat('featureOrExtent')))
    }
    const target =
      featureOrExtent instanceof BaseFeature
        ? (featureOrExtent.getGeometry() as OMapSimpleGeometryType)
        : handleGetExtentValue(featureOrExtent as OMapExtentType)
    const finalOptions = isDefined(options)
      ? {
          ...OMAP_VIEW_FIT_DEFAULT_OPTIONS,
          ...options,
          size: isDefined(options.size) ? handleGetSizeValue(options.size) : undefined,
          easing: isDefined(options.easing) ? OMapEasing[options.easing] : undefined
        }
      : {
          ...OMAP_VIEW_FIT_DEFAULT_OPTIONS,
          size: undefined,
          easing: OMapEasing[OMAP_VIEW_FIT_DEFAULT_OPTIONS.easing]
        }
    this.view.fit(target, finalOptions)
  }

  getAnimating(): boolean {
    return this.view.getAnimating()
  }
  getInteracting(): boolean {
    return this.view.getInteracting()
  }
  getMaxResolution(): number {
    return this.view.getMaxResolution()
  }
  getMinResolution(): number {
    return this.view.getMinResolution()
  }
  getMaxZoom(): number {
    return this.view.getMaxZoom()
  }
  getMinZoom(): number {
    return this.view.getMinZoom()
  }
  getProjection(): Projection {
    return this.projection
  }

  setConstrainResolution(enabled: boolean): void {
    if (!isBoolean(enabled)) {
      warn_(
        createMessage('setProperties', commonMessage.paramsInvaildFormat('enabled', 'boolean类型'))
      )
      return
    }
    this.view.setConstrainResolution(enabled)
  }
  setMaxZoom(value: number): void {
    this.view.setMaxZoom(value)
  }
  setMinZoom(value: number): void {
    this.view.setMinZoom(value)
  }

  private validateOptionalNumber(value: number | undefined, method: string, name: string): void {
    if (!isDefined(value)) error_(createMessage(method, commonMessage.paramsNotDefined(name)))
    if (!isNumber(value)) error_(createMessage(method, commonMessage.paramsInvaildFormat(name)))
  }
  private validateDelta(delta: number, method: string): void {
    if (isDefined(delta) && !isNumber(delta)) {
      error_(createMessage(method, commonMessage.paramsInvaildFormat('delta', 'number')))
    }
  }
}
