import { isFunction, isString } from '../../../../../../utils/index'
import { error_, getPackageMessage } from '../../../../../../utils/message'
import { OlSource } from '../../../../../../source/index'
import TileSource from '../../../index'
import {
    DEFAULT_URL_TILE_SOURCE_PARAMS,
    handleGetUrlTileSourceParams,
    type OMapUrlTileSourceParamsType,
    type OMapUrlTileSourceType
} from './type'

const PACKAGE_NAME = 'UrlTileSource';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * @deprecated OpenLayers recommends ImageTileSource for new image tile code.
 */
export default class UrlTileSource<T extends OMapUrlTileSourceType = OMapUrlTileSourceType> extends TileSource<T> {

    constructor(params: OMapUrlTileSourceParamsType) {
        super(new OlSource.UrlTile(handleGetUrlTileSourceParams({
            ...DEFAULT_URL_TILE_SOURCE_PARAMS,
            ...params
        } as OMapUrlTileSourceParamsType)) as T)
    }

    getTileLoadFunction() {
        return this._source.getTileLoadFunction();
    }

    getTileUrlFunction() {
        return this._source.getTileUrlFunction();
    }

    getUrls(): Array<string> | null {
        return this._source.getUrls();
    }

    setTileLoadFunction(tileLoadFunction: ReturnType<T['getTileLoadFunction']>) {
        if (!isFunction(tileLoadFunction)) {
            error_(createMessage('setTileLoadFunction', 'tileLoadFunction必须是函数'));
        }
        this._source.setTileLoadFunction(tileLoadFunction);
    }

    setTileUrlFunction(tileUrlFunction: ReturnType<T['getTileUrlFunction']>, key?: string) {
        if (!isFunction(tileUrlFunction)) {
            error_(createMessage('setTileUrlFunction', 'tileUrlFunction必须是函数'));
        }
        this._source.setTileUrlFunction(tileUrlFunction, key);
    }

    setUrl(url: string) {
        if (!isString(url)) {
            error_(createMessage('setUrl', 'url必须是字符串'));
        }
        this._source.setUrl(url);
    }

    setUrls(urls: Array<string>) {
        if (!Array.isArray(urls)) {
            error_(createMessage('setUrls', 'urls必须是字符串数组'));
        }
        this._source.setUrls(urls);
    }

}
