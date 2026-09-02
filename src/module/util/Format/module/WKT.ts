import { type RenderFeature, type OlFeature } from '../../../../source/index'
import {
  type OMapFormatReadFeatureOptionsType,
  type OMapWKTFormatInstanceType,
  type OMapFormatWriteFeatureOptionsType,
  DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS
} from '../type'
import { createBaseFeatureByOlFeature } from '../../../core/Feature/BasicFeature/handle'
import {
  type OlFeatureInstanceType,
  type OlGeometryType
} from '../../../core/Feature/BasicFeature/type'
import type BasicFeature from '../../../core/Feature/BasicFeature/index'
import { handleGetReadOptions, handleGetWriteOptions } from '../handle'

function readFeature(
  format: OMapWKTFormatInstanceType,
  source: ArrayBuffer | Document | Element | Record<string, unknown> | string,
  options?: OMapFormatReadFeatureOptionsType
) {
  const feature = (format as OMapWKTFormatInstanceType).readFeature(
    source,
    handleGetReadOptions(options)
  )
  const featureValue = createBaseFeatureByOlFeature(feature as OlFeatureInstanceType)
  return featureValue
}

function readFeatures(
  format: OMapWKTFormatInstanceType,
  source: ArrayBuffer | Document | Element | Record<string, unknown> | string,
  options?: OMapFormatReadFeatureOptionsType
) {
  const features = (format as OMapWKTFormatInstanceType).readFeatures(
    source,
    handleGetReadOptions(options)
  )
  const featureValues = features.map((feature: OlFeature | RenderFeature) => {
    return createBaseFeatureByOlFeature(feature as OlFeature)
  })
  return featureValues
}

function writeFeature(
  format: OMapWKTFormatInstanceType,
  feature: BasicFeature<OlGeometryType>,
  options?: OMapFormatWriteFeatureOptionsType
): string {
  const source = (format as OMapWKTFormatInstanceType).writeFeature(
    feature.getFeature() as OlFeatureInstanceType,
    handleGetWriteOptions(Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, options))
  )
  return source
}

function writeFeatures(
  format: OMapWKTFormatInstanceType,
  features: Array<BasicFeature<OlGeometryType>>,
  options?: OMapFormatWriteFeatureOptionsType
): string {
  const source = (format as OMapWKTFormatInstanceType).writeFeatures(
    features.map(
      (feature: BasicFeature<OlGeometryType>) => feature.getFeature() as OlFeatureInstanceType
    ),
    handleGetWriteOptions(Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, options))
  )
  return source
}

export default {
  readFeature,
  readFeatures,
  writeFeature,
  writeFeatures
}
