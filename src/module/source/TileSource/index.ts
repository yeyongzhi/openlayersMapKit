import { isDefined, isFunction, isNumber } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/message'
import type { EventsKey } from 'ol/events'
import Projection from '../../core/Projection/index'
import Source from '../Source/index'
import {
    TILE_SOURCE_EVENT_TYPES,
    type OMapTileSourceEventListener,
    type OMapTileSourceEventType,
    type OMapTileSourceTileCoord,
    type OMapTileSourceTileGridInstance,
    type OMapTileSourceType
} from './type'

const PACKAGE_NAME = 'TileSource';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * OMap TileSource 类
 * @class
 * @classdesc 瓦片数据源基类，提供瓦片网格、瓦片获取、缓存刷新与加载事件能力。
 * @description 参考：https://openlayers.org/en/latest/apidoc/module-ol_source_Tile-TileSource.html
 * @author Aurora
 * @version 1.0.0
 * @createDate 2026/7/8
 * @updateDate 2026/7/8
 */

export default abstract class TileSource<T extends OMapTileSourceType = OMapTileSourceType> extends Source<T> {

    protected _tileGrid?: OMapTileSourceTileGridInstance;

    protected constructor(source: T) {
        super(source)
        this._tileGrid = source.getTileGrid() || undefined;
    }

    clear() {
        this._source.clear();
    }

    getGutterForProjection(projection: Projection): number {
        if (!(projection instanceof Projection)) {
            error_(createMessage('getGutterForProjection', 'projection参数格式有误'));
        }
        return this._source.getGutterForProjection(projection.getProjection());
    }

    getKey(): string {
        return this._source.getKey();
    }

    getTile(
        z: number,
        x: number,
        y: number,
        pixelRatio: number,
        projection: Projection
    ) {
        if (
            !isNumber(z) ||
            !isNumber(x) ||
            !isNumber(y) ||
            !isNumber(pixelRatio) ||
            !(projection instanceof Projection)
        ) {
            error_(createMessage('getTile', 'z、x、y、pixelRatio或projection参数格式有误'));
        }
        return this._source.getTile(z, x, y, pixelRatio, projection.getProjection());
    }

    getTileGrid(): OMapTileSourceTileGridInstance | null {
        return this._source.getTileGrid();
    }

    getTileGridForProjection(projection: Projection): OMapTileSourceTileGridInstance {
        if (!(projection instanceof Projection)) {
            error_(createMessage('getTileGridForProjection', 'projection参数格式有误'));
        }
        return this._source.getTileGridForProjection(projection.getProjection());
    }

    getTilePixelRatio(pixelRatio: number): number {
        if (!isNumber(pixelRatio)) {
            error_(createMessage('getTilePixelRatio', 'pixelRatio必须是数字'));
        }
        return this._source.getTilePixelRatio(pixelRatio);
    }

    getTilePixelSize(z: number, pixelRatio: number, projection: Projection) {
        if (!isNumber(z) || !isNumber(pixelRatio) || !(projection instanceof Projection)) {
            error_(createMessage('getTilePixelSize', 'z、pixelRatio或projection参数格式有误'));
        }
        return this._source.getTilePixelSize(z, pixelRatio, projection.getProjection());
    }

    getTileCoordForTileUrlFunction(tileCoord: OMapTileSourceTileCoord, projection?: Projection) {
        if (!this.isTileCoord(tileCoord)) {
            error_(createMessage('getTileCoordForTileUrlFunction', 'tileCoord参数格式有误'));
        }
        if (isDefined(projection) && !(projection instanceof Projection)) {
            error_(createMessage('getTileCoordForTileUrlFunction', 'projection参数格式有误'));
        }
        return this._source.getTileCoordForTileUrlFunction(tileCoord, projection?.getProjection());
    }

    onTile(type: OMapTileSourceEventType, listener: OMapTileSourceEventListener): EventsKey {
        if (!Object.values(TILE_SOURCE_EVENT_TYPES).includes(type) || !isFunction(listener)) {
            error_(createMessage('onTile', 'type或listener参数格式有误'));
        }
        return this._source.on(type, listener);
    }

    onTileLoadStart(listener: OMapTileSourceEventListener): EventsKey {
        return this.onTile(TILE_SOURCE_EVENT_TYPES.tileLoadStart, listener);
    }

    onTileLoadEnd(listener: OMapTileSourceEventListener): EventsKey {
        return this.onTile(TILE_SOURCE_EVENT_TYPES.tileLoadEnd, listener);
    }

    onTileLoadError(listener: OMapTileSourceEventListener): EventsKey {
        return this.onTile(TILE_SOURCE_EVENT_TYPES.tileLoadError, listener);
    }

    protected isTileCoord(tileCoord: OMapTileSourceTileCoord) {
        return Array.isArray(tileCoord) &&
            tileCoord.length === 3 &&
            tileCoord.every(item => isNumber(item));
    }

}
