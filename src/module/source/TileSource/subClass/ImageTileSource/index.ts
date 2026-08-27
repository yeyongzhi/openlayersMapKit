import { OlSource } from '../../../../../source/index'
import TileSource from '../../index'
import {
  DEFAULT_IMAGE_TILE_SOURCE_PARAMS,
  handleGetImageTileSourceParams,
  type OMapImageTileSourceParamsType,
  type OMapImageTileSourceType,
  type OMapImageTileSourceUrlLike
} from './type'

export default class ImageTileSource extends TileSource<OMapImageTileSourceType> {
  constructor(params: OMapImageTileSourceParamsType = {}) {
    super(
      new OlSource.ImageTile(
        handleGetImageTileSourceParams({
          ...DEFAULT_IMAGE_TILE_SOURCE_PARAMS,
          ...params
        })
      )
    )
  }

  setUrl(url: OMapImageTileSourceUrlLike) {
    this._source.setUrl(url)
  }
}
