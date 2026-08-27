import { isFunction, isNumber } from '../../../../../utils/index'
import { error_, getPackageMessage } from '../../../../../utils/message'
import { OlSource } from '../../../../../source/index'
import type { OMapCoordinateType } from '../../../../basic/Lnglat/type'
import { handleGetLnglatValue } from '../../../../basic/Lnglat/handle'
import TileSource from '../../index'
import {
  DEFAULT_UTF_GRID_SOURCE_PARAMS,
  handleGetUTFGridSourceParams,
  type OMapUTFGridDataCallback,
  type OMapUTFGridSourceParamsType,
  type OMapUTFGridSourceType
} from './type'

const PACKAGE_NAME = 'UTFGridSource'
const createMessage = getPackageMessage(PACKAGE_NAME)

export default class UTFGridSource extends TileSource<OMapUTFGridSourceType> {
  constructor(params: OMapUTFGridSourceParamsType) {
    super(
      new OlSource.UTFGrid(
        handleGetUTFGridSourceParams({
          ...DEFAULT_UTF_GRID_SOURCE_PARAMS,
          ...params
        } as OMapUTFGridSourceParamsType)
      )
    )
  }

  getTemplate(): string | undefined {
    return this._source.getTemplate()
  }

  forDataAtCoordinateAndResolution(
    coordinate: OMapCoordinateType,
    resolution: number,
    callback: OMapUTFGridDataCallback,
    request?: boolean
  ) {
    const olCoordinate = handleGetLnglatValue(coordinate)
    if (!olCoordinate || !isNumber(resolution) || !isFunction(callback)) {
      error_(
        createMessage(
          'forDataAtCoordinateAndResolution',
          'coordinate、resolution或callback参数格式有误'
        )
      )
    }
    this._source.forDataAtCoordinateAndResolution(olCoordinate, resolution, callback, request)
  }
}
