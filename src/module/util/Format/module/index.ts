import { isDefined, error_ } from '../../../../utils/index'
import {
  type OMapFormatInstanceType,
  type OMapFormatTypeEnum,
  OMapFormatType,
  OMapFormatWriteFeatureOptionsType
} from '../type'
import GeoJSON from './GeoJSON'
import WKT from './WKT'
import KML from './KML'
import BasicFeature from '../../../core/Feature/BasicFeature/index'
import type { OlGeometryType } from '../../../core/Feature/BasicFeature/type'
import { createMessage } from '../index'

type FormatModule = typeof GeoJSON | typeof WKT | typeof KML

function getModule(type: OMapFormatTypeEnum): FormatModule | null {
  let formatModule: FormatModule | null = null
  switch (type) {
    case OMapFormatType.GeoJSON:
      formatModule = GeoJSON
      break
    case OMapFormatType.WKT:
      formatModule = WKT
      break
    case OMapFormatType.KML:
      formatModule = KML
      break
  }
  return formatModule
}

function handle<Result = unknown>(
  format: OMapFormatInstanceType,
  type: OMapFormatTypeEnum,
  key: string,
  ...args: unknown[]
): Result | undefined {
  const formatModule = getModule(type)
  const method = isDefined(formatModule)
    ? (formatModule as unknown as Record<string, unknown>)[key]
    : undefined
  if (typeof method === 'function') {
    return (method as (format: OMapFormatInstanceType, ...args: unknown[]) => Result)(
      format,
      ...args
    )
  } else {
    error_(createMessage(key, `当前格式化工具不支持${key}方法`))
    return undefined
  }
}

export function handleReadFeature(
  format: OMapFormatInstanceType,
  type: OMapFormatTypeEnum,
  source: unknown,
  options?: unknown
) {
  return handle(format, type, 'readFeature', source, options)
}

export function handleReadFeatures(
  format: OMapFormatInstanceType,
  type: OMapFormatTypeEnum,
  source: unknown,
  options?: unknown
) {
  return handle(format, type, 'readFeatures', source, options)
}

export function handleWriteFeature(
  format: OMapFormatInstanceType,
  type: OMapFormatTypeEnum,
  feature: BasicFeature<OlGeometryType>,
  options?: OMapFormatWriteFeatureOptionsType
) {
  return handle<string>(format, type, 'writeFeature', feature, options) as string
}

export function handleWriteFeatureObject(
  format: OMapFormatInstanceType,
  type: OMapFormatTypeEnum,
  feature: BasicFeature<OlGeometryType>,
  options?: OMapFormatWriteFeatureOptionsType
) {
  return handle(format, type, 'writeFeatureObject', feature, options)
}

export function handleWriteFeatures(
  format: OMapFormatInstanceType,
  type: OMapFormatTypeEnum,
  features: Array<BasicFeature<OlGeometryType>>,
  options?: OMapFormatWriteFeatureOptionsType
) {
  return handle<string>(format, type, 'writeFeatures', features, options) as string
}

export function handleWriteFeaturesObject(
  format: OMapFormatInstanceType,
  type: OMapFormatTypeEnum,
  features: Array<BasicFeature<OlGeometryType>>,
  options?: OMapFormatWriteFeatureOptionsType
) {
  return handle(format, type, 'writeFeaturesObject', features, options)
}

export function handleWriteFeaturesNode(
  format: OMapFormatInstanceType,
  type: OMapFormatTypeEnum,
  features: Array<BasicFeature<OlGeometryType>>,
  options?: OMapFormatWriteFeatureOptionsType
) {
  return handle(format, type, 'writeFeaturesNode', features, options)
}
