import { isDefined } from '../../../../utils/index'
import { commonMessage, error_, getPackageMessage } from '../../../../utils/message'
import { OlFeature, OlGeometry, OlLayer, OlUtil } from '../../../../source/index'
import { handleGetPixelValue } from '../../../basic/Pixel/handle'
import type { OMapPixelType } from '../../../basic/Pixel/type'
import BaseFeature from '../../Feature/BasicFeature/index'
import type { OlFeatureLike } from '../../Feature/BasicFeature/type'
import {
  createBaseFeatureByOlFeature,
  createBaseFeatureByOlRenderFeature
} from '../../Feature/BasicFeature/handle'
import BaseLayer from '../../../layer/BaseLayer/index'
import type { OMapBaseLayerCommonType } from '../../../layer/BaseLayer/type'
import VectorLayer from '../../../layer/VectorLayer/index'
import {
  DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS,
  type OMapForEachFeatureAtPixelOptionsType,
  type OMapMapType
} from '../type'

const createMessage = getPackageMessage('Map')
type ManagedLayer = BaseLayer<OMapBaseLayerCommonType>
type ManagedFeature = BaseFeature<OlGeometry.Geometry>

/** Resolves native pixel-hit results to stable OMap Layer and Feature wrappers. */
export default class FeatureQuery {
  constructor(
    private readonly getNativeMap: () => OMapMapType,
    private readonly getLayers: () => ManagedLayer[]
  ) {}

  forEachAtPixel(
    pixel: OMapPixelType,
    callback: (feature: ManagedFeature | null, layer: ManagedLayer | null) => void,
    options?: OMapForEachFeatureAtPixelOptionsType
  ): void {
    this.validatePixel(pixel, 'forEachFeatureAtPixel')
    const params = this.createOptions(options)
    return this.getNativeMap().forEachFeatureAtPixel(
      handleGetPixelValue(pixel),
      (feature: OlFeatureLike, layer: OlLayer.Layer) => {
        callback(this.resolveFeature(feature), this.resolveLayer(layer))
      },
      { ...params, layerFilter: this.createLayerFilter(params.layerFilter) }
    )
  }

  getAtPixel(
    pixel: OMapPixelType,
    options?: OMapForEachFeatureAtPixelOptionsType
  ): ManagedFeature[] {
    this.validatePixel(pixel, 'getFeaturesAtPixel')
    const params = this.createOptions(options)
    const nativeFeatures = this.getNativeMap().getFeaturesAtPixel(handleGetPixelValue(pixel), {
      ...params,
      layerFilter: this.createLayerFilter(params.layerFilter)
    })
    if (!nativeFeatures.length) return []

    const result: ManagedFeature[] = []
    const seen = new Set<ManagedFeature>()
    nativeFeatures.forEach((nativeFeature) => {
      const feature = this.resolveFeature(nativeFeature)
      if (feature && !seen.has(feature)) {
        seen.add(feature)
        result.push(feature)
      }
    })
    return result
  }

  hasAtPixel(pixel: OMapPixelType, options?: OMapForEachFeatureAtPixelOptionsType): boolean {
    return this.getAtPixel(pixel, options).length > 0
  }

  private resolveLayer(nativeLayer: OlLayer.Layer | null): ManagedLayer | null {
    if (!nativeLayer) return null
    return (
      this.getLayers().find(
        (layer) => OlUtil.getUid(layer.getLayer()) === OlUtil.getUid(nativeLayer)
      ) ?? null
    )
  }

  private resolveFeature(nativeFeature: OlFeatureLike): ManagedFeature | null {
    // 统一走 resolver，保证与 VectorSource 共用同一 wrapper 身份，避免逐层 getFeatures() 扫描。
    const feature =
      nativeFeature instanceof OlFeature
        ? createBaseFeatureByOlFeature(nativeFeature)
        : createBaseFeatureByOlRenderFeature(nativeFeature)
    return (feature as ManagedFeature) ?? null
  }

  private createLayerFilter(
    filter: OMapForEachFeatureAtPixelOptionsType['layerFilter']
  ): (layer: OlLayer.Layer) => boolean {
    return (nativeLayer) => {
      if (!filter) return true
      const layer = this.resolveLayer(nativeLayer)
      return layer instanceof VectorLayer ? filter(layer) : false
    }
  }

  private createOptions(options?: OMapForEachFeatureAtPixelOptionsType) {
    return Object.assign({}, DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS, options ?? {})
  }

  private validatePixel(pixel: OMapPixelType, methodName: string): void {
    if (!isDefined(pixel)) {
      error_(createMessage(methodName, commonMessage.paramsNotDefined('pixel')))
    }
  }
}
