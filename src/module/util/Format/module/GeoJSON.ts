import { type RenderFeature, type OlFeature } from '../../../../source/index'
import {
  type OMapFormatReadFeatureOptionsType,
  type OMapGeoJSONFormatInstanceType,
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
  format: OMapGeoJSONFormatInstanceType,
  source: ArrayBuffer | Document | Element | Record<string, unknown> | string,
  options?: OMapFormatReadFeatureOptionsType
) {
  const feature = (format as OMapGeoJSONFormatInstanceType).readFeature(
    source,
    handleGetReadOptions(options)
  )
  const featureValue = createBaseFeatureByOlFeature(feature as OlFeatureInstanceType)
  return featureValue
}

function readFeatures(
  format: OMapGeoJSONFormatInstanceType,
  source: ArrayBuffer | Document | Element | Record<string, unknown> | string,
  options?: OMapFormatReadFeatureOptionsType
) {
  const features = (format as OMapGeoJSONFormatInstanceType).readFeatures(
    source,
    handleGetReadOptions(options)
  )
  const featureValues = features.map((feature: OlFeature | RenderFeature) => {
    return createBaseFeatureByOlFeature(feature as OlFeature)
  })
  return featureValues
}

function writeFeature(
  format: OMapGeoJSONFormatInstanceType,
  feature: BasicFeature<OlGeometryType>,
  options?: OMapFormatWriteFeatureOptionsType
): string {
  const source = (format as OMapGeoJSONFormatInstanceType).writeFeature(
    feature.getFeature() as OlFeatureInstanceType,
    handleGetWriteOptions(Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, options))
  )
  return source
}

function writeFeatureObject(
  format: OMapGeoJSONFormatInstanceType,
  feature: BasicFeature<OlGeometryType>,
  options?: OMapFormatWriteFeatureOptionsType
) {
  const source = (format as OMapGeoJSONFormatInstanceType).writeFeatureObject(
    feature.getFeature() as OlFeatureInstanceType,
    handleGetWriteOptions(Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, options))
  )
  return source
}

function writeFeatures(
  format: OMapGeoJSONFormatInstanceType,
  features: Array<BasicFeature<OlGeometryType>>,
  options?: OMapFormatWriteFeatureOptionsType
): string {
  const source = (format as OMapGeoJSONFormatInstanceType).writeFeatures(
    features.map(
      (feature: BasicFeature<OlGeometryType>) => feature.getFeature() as OlFeatureInstanceType
    ),
    handleGetWriteOptions(Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, options))
  )
  return source
}

function writeFeaturesObject(
  format: OMapGeoJSONFormatInstanceType,
  features: Array<BasicFeature<OlGeometryType>>,
  options?: OMapFormatWriteFeatureOptionsType
) {
  const source = (format as OMapGeoJSONFormatInstanceType).writeFeaturesObject(
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
  writeFeatureObject,
  writeFeatures,
  writeFeaturesObject
}
