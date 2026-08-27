import { OlSource } from '../../../../../source/index'
import TileSource from '../../index'
import {
  DEFAULT_XYZ_SOURCE_PARAMS,
  handleGetXYZSourceParams,
  type OMapXYZSourceParamsType,
  type OMapXYZSourceType
} from './type'

export default class XYZSource extends TileSource<OMapXYZSourceType> {
  constructor(params: OMapXYZSourceParamsType = {}) {
    super(
      new OlSource.XYZ(
        handleGetXYZSourceParams({
          ...DEFAULT_XYZ_SOURCE_PARAMS,
          ...params
        })
      )
    )
  }
}
