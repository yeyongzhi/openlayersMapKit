import type { ReadOptions, WriteOptions } from 'ol/format/Feature'
import { isDefined } from '../../../utils/index'
import { handleGetProjectionValue } from '../../core/Projection/handle'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import {
  type OMapFormatTypeEnum,
  type OMapFormatGeoJSONOptions,
  type OMapFormatWKTOptions,
  type OMapFormatKMLOptions,
  type OMapFormatReadFeatureOptionsType,
  type OMapFormatWriteFeatureOptionsType,
  OMapFormatType
} from './type'

export function isVaildFormatType(type: unknown): type is OMapFormatTypeEnum {
  return Object.values(OMapFormatType).includes(type as OMapFormatTypeEnum)
}

function getGeoJSONDefaultOptions(): OMapFormatGeoJSONOptions {
  return {
    dataProjection: 'EPSG:4326',
    extractGeometryName: false
  }
}

function getWKTDefaultOptions(): OMapFormatWKTOptions {
  return {
    splitCollection: false
  }
}

function getKMLOptionsDefaultOptions(): OMapFormatKMLOptions {
  return {
    extractStyles: false,
    showPointNames: false,
    writeStyles: false,
    crossOrigin: null
  }
}

/**
 * OMap 读取选项 → OpenLayers `ReadOptions`。
 *
 * OMap 的 `dataProjection` / `featureProjection` / `extent` 承载的是 wrapper 实例，
 * 直接透传会导致 OpenLayers 调用不到 `getCode()` 等方法，因此必须逐字段转换。
 * 仅当用户显式提供时才写入目标字段，避免用 `undefined` 覆盖 OpenLayers 内部默认值。
 * @param {OMapFormatReadFeatureOptionsType} options OMap 读取选项
 * @returns {ReadOptions} OpenLayers 读取选项
 */
export function handleGetReadOptions(options?: OMapFormatReadFeatureOptionsType): ReadOptions {
  const result: ReadOptions = {}
  if (!isDefined(options)) {
    return result
  }
  if (isDefined(options.dataProjection)) {
    result.dataProjection = handleGetProjectionValue(options.dataProjection)
  }
  if (isDefined(options.featureProjection)) {
    result.featureProjection = handleGetProjectionValue(options.featureProjection)
  }
  if (isDefined(options.extent)) {
    result.extent = handleGetExtentValue(options.extent)
  }
  return result
}

/**
 * OMap 写入选项 → OpenLayers `WriteOptions`。转换规则同 {@link handleGetReadOptions}。
 * @param {OMapFormatWriteFeatureOptionsType} options OMap 写入选项
 * @returns {WriteOptions} OpenLayers 写入选项
 */
export function handleGetWriteOptions(options?: OMapFormatWriteFeatureOptionsType): WriteOptions {
  const result: WriteOptions = {}
  if (!isDefined(options)) {
    return result
  }
  if (isDefined(options.dataProjection)) {
    result.dataProjection = handleGetProjectionValue(options.dataProjection)
  }
  if (isDefined(options.featureProjection)) {
    result.featureProjection = handleGetProjectionValue(options.featureProjection)
  }
  if (isDefined(options.rightHanded)) {
    result.rightHanded = options.rightHanded
  }
  if (isDefined(options.decimals)) {
    result.decimals = options.decimals
  }
  return result
}

/**
 * 获取默认参数
 * @param type 格式类型
 * @returns 默认参数
 */
export function getDefaultOptionsByType(type: OMapFormatTypeEnum) {
  switch (type) {
    case OMapFormatType.GeoJSON:
      return getGeoJSONDefaultOptions()
    case OMapFormatType.WKT:
      return getWKTDefaultOptions()
    case OMapFormatType.KML:
      return getKMLOptionsDefaultOptions()
    default:
      return {}
  }
}
