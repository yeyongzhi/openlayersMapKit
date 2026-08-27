import { OlSource } from '../../../../../../source/index'
import { isFunction, isString } from '../../../../../../utils/index'
import { error_, getPackageMessage } from '../../../../../../utils/message'
import Projection from '../../../../../core/Projection/index'
import type { OMapTileSourceTileGridInstance } from '../../../type'
import TileSource from '../../../index'
import {
  DEFAULT_TILE_IMAGE_SOURCE_PARAMS,
  handleGetTileImageSourceParams,
  type OMapTileImageSourceParamsType,
  type OMapTileImageSourceType
} from './type'

const PACKAGE_NAME = 'TileImageSource'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * @deprecated OpenLayers recommends ImageTileSource for new image tile code.
 */
export default class TileImageSource extends TileSource<OMapTileImageSourceType> {
  constructor(params: OMapTileImageSourceParamsType) {
    super(
      new OlSource.TileImage(
        handleGetTileImageSourceParams({
          ...DEFAULT_TILE_IMAGE_SOURCE_PARAMS,
          ...params
        } as OMapTileImageSourceParamsType)
      )
    )
  }

  getTileLoadFunction() {
    return this._source.getTileLoadFunction()
  }

  getTileUrlFunction() {
    return this._source.getTileUrlFunction()
  }

  getUrls(): Array<string> | null {
    return this._source.getUrls()
  }

  setTileLoadFunction(
    tileLoadFunction: ReturnType<OMapTileImageSourceType['getTileLoadFunction']>
  ) {
    if (!isFunction(tileLoadFunction)) {
      error_(createMessage('setTileLoadFunction', 'tileLoadFunction必须是函数'))
    }
    this._source.setTileLoadFunction(tileLoadFunction)
  }

  setTileUrlFunction(
    tileUrlFunction: ReturnType<OMapTileImageSourceType['getTileUrlFunction']>,
    key?: string
  ) {
    if (!isFunction(tileUrlFunction)) {
      error_(createMessage('setTileUrlFunction', 'tileUrlFunction必须是函数'))
    }
    this._source.setTileUrlFunction(tileUrlFunction, key)
  }

  setUrl(url: string) {
    if (!isString(url)) {
      error_(createMessage('setUrl', 'url必须是字符串'))
    }
    this._source.setUrl(url)
  }

  setUrls(urls: Array<string>) {
    if (!Array.isArray(urls)) {
      error_(createMessage('setUrls', 'urls必须是字符串数组'))
    }
    this._source.setUrls(urls)
  }

  getGutter(): number {
    return this._source.getGutter()
  }

  setRenderReprojectionEdges(render: boolean) {
    this._source.setRenderReprojectionEdges(render)
  }

  setTileGridForProjection(projection: Projection, tileGrid: OMapTileSourceTileGridInstance) {
    this._source.setTileGridForProjection(projection.getProjection(), tileGrid)
  }
}
