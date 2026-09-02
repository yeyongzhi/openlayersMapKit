import { isDefined } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/index'
import { OlFormat } from '../../../source/index'
import {
  type OMapFormatTypeEnum,
  type OMapFormatGeoJSONOptions,
  type OMapFormatWKTOptions,
  type OMapFormatKMLOptions,
  type OMapFormatOptionsType,
  type OMapFormatInstanceType,
  OMapFormatType,
  type OMapFormatWriteFeatureOptionsType,
  type OMapFormatReadFeatureOptionsType
} from './type'
import { getDefaultOptionsByType, isValidFormatType } from './handle'
import { handleGetProjectionValue } from '../../core/Projection/handle'
import type BasicFeature from '../../core/Feature/BasicFeature/index'
import type { OlGeometryType } from '../../core/Feature/BasicFeature/type'
import { handleGetStyleArrayValue } from '../../basic/Style/handle'
import {
  handleReadFeature,
  handleReadFeatures,
  handleWriteFeature,
  handleWriteFeatureObject,
  handleWriteFeatures,
  handleWriteFeaturesObject,
  handleWriteFeaturesNode
} from './module/index'

const PACKAGE_NAME = 'Format'
export const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 */
export default class Format {
  type?: OMapFormatTypeEnum

  options?: OMapFormatOptionsType

  _format?: OMapFormatInstanceType

  constructor(type: typeof OMapFormatType.GeoJSON, options: OMapFormatGeoJSONOptions)
  constructor(type: typeof OMapFormatType.WKT, options?: OMapFormatWKTOptions)
  constructor(type: typeof OMapFormatType.KML, options?: OMapFormatKMLOptions)

  constructor(type: OMapFormatTypeEnum, options?: OMapFormatOptionsType) {
    if (!isDefined(type)) {
      error_(createMessage('constructor', '初始化参数有误'))
      return
    }
    if (!isValidFormatType(type)) {
      error_(createMessage('constructor', '初始化参数有误'))
      return
    }
    this.type = type
    this.options = Object.assign({}, getDefaultOptionsByType(type), options)
    this.initFormat()
  }

  /**
   * 初始化
   */
  protected initFormat() {
    switch (this.type) {
      case OMapFormatType.GeoJSON:
        this._format = new OlFormat.GeoJSON({
          ...(this.options as OMapFormatGeoJSONOptions),
          dataProjection: handleGetProjectionValue(
            (this.options as OMapFormatGeoJSONOptions).dataProjection
          ),
          featureProjection: handleGetProjectionValue(
            (this.options as OMapFormatGeoJSONOptions).featureProjection
          )
        })
        break
      case OMapFormatType.WKT:
        this._format = new OlFormat.WKT({
          ...(this.options as OMapFormatWKTOptions)
        })
        break
      case OMapFormatType.KML:
        this._format = new OlFormat.KML({
          ...(this.options as OMapFormatKMLOptions),
          defaultStyle: handleGetStyleArrayValue(
            (this.options as OMapFormatKMLOptions).defaultStyle
          )
        })
        break
    }
  }

  readFeature(source: unknown, options?: OMapFormatReadFeatureOptionsType) {
    return handleReadFeature(
      this._format as OMapFormatInstanceType,
      this.type as OMapFormatTypeEnum,
      source,
      options
    )
  }

  readFeatures(source: unknown, options?: OMapFormatReadFeatureOptionsType) {
    return handleReadFeatures(
      this._format as OMapFormatInstanceType,
      this.type as OMapFormatTypeEnum,
      source,
      options
    )
  }

  writeFeature(
    feature: BasicFeature<OlGeometryType>,
    options?: OMapFormatWriteFeatureOptionsType
  ): string {
    return handleWriteFeature(
      this._format as OMapFormatInstanceType,
      this.type as OMapFormatTypeEnum,
      feature,
      options
    )
  }

  writeFeatureObject(
    feature: BasicFeature<OlGeometryType>,
    options?: OMapFormatWriteFeatureOptionsType
  ) {
    return handleWriteFeatureObject(
      this._format as OMapFormatInstanceType,
      this.type as OMapFormatTypeEnum,
      feature,
      options
    )
  }

  writeFeatures(
    features: Array<BasicFeature<OlGeometryType>>,
    options?: OMapFormatWriteFeatureOptionsType
  ): string {
    return handleWriteFeatures(
      this._format as OMapFormatInstanceType,
      this.type as OMapFormatTypeEnum,
      features,
      options
    )
  }

  writeFeaturesObject(
    features: Array<BasicFeature<OlGeometryType>>,
    options?: OMapFormatWriteFeatureOptionsType
  ) {
    return handleWriteFeaturesObject(
      this._format as OMapFormatInstanceType,
      this.type as OMapFormatTypeEnum,
      features,
      options
    )
  }

  writeFeaturesNode(
    features: Array<BasicFeature<OlGeometryType>>,
    options?: OMapFormatWriteFeatureOptionsType
  ) {
    return handleWriteFeaturesNode(
      this._format as OMapFormatInstanceType,
      this.type as OMapFormatTypeEnum,
      features,
      options
    )
  }
}
