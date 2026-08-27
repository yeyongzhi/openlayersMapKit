import { defaultValue } from '../../../../utils/index'
import { RenderFeature, OlFeature } from '../../../../source/index'
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
import BasicFeature from '../../../core/Feature/BasicFeature/index'

function readFeature(
  format: OMapWKTFormatInstanceType,
  source: ArrayBuffer | Document | Element | Record<string, unknown> | string,
  options?: OMapFormatReadFeatureOptionsType
) {
  const feature = (format as OMapWKTFormatInstanceType).readFeature(
    source,
    defaultValue(options, {})
  )
  const _feature = createBaseFeatureByOlFeature(feature as OlFeatureInstanceType)
  return _feature
}

function readFeatures(
  format: OMapWKTFormatInstanceType,
  source: ArrayBuffer | Document | Element | Record<string, unknown> | string,
  options?: OMapFormatReadFeatureOptionsType
) {
  const features = (format as OMapWKTFormatInstanceType).readFeatures(
    source,
    defaultValue(options, {})
  )
  const _features = features.map((feature: OlFeature | RenderFeature) => {
    return createBaseFeatureByOlFeature(feature as OlFeature)
  })
  return _features
}

function writeFeature(
  format: OMapWKTFormatInstanceType,
  feature: BasicFeature<OlGeometryType>,
  options?: OMapFormatWriteFeatureOptionsType
): string {
  const source = (format as OMapWKTFormatInstanceType).writeFeature(
    feature.getFeature() as OlFeatureInstanceType,
    Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {}))
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
    Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {}))
  )
  return source
}

export default {
  readFeature,
  readFeatures,
  writeFeature,
  writeFeatures
}
