import Lnglat from '../Lnglat/index'
import { isCoordinatesType, isDefined, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'

const PACKAGE_NAME = 'Extent';
const createMessage = getPackageMessage(PACKAGE_NAME);

/** Extent 边界范围
 * Author：yyz
 * CreateDate：2022/08/07
 * UpdateDate：2022/09/28
 */

export default class Extent {
    _extent: number[] = [];

    constructor(minX: number, minY: number, maxX: number, maxY: number) {
        if(!isNumber(minX) || !isNumber(minY) || !isNumber(maxX) || !isNumber(maxY)) {
            error_(createMessage('constructor', '初始化参数有误，必须为经纬度数值'));
            return;
        }
        if(maxX < minX || maxY < minY) {
            error_(createMessage('constructor', '初始化参数有误'));
            return;
        }
        this._extent = [minX, minY, maxX, maxY];
    }

    private _isInitialized(method: string): boolean {
        if (!isDefined(this._extent) || this._extent.length !== 4) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    /**
     * 获取边界范围Extent的左上方位置
     * @return {Lnglat} 左上方位置
     */
    getTopLeft(): Lnglat | undefined {
        if (!this._isInitialized('getTopLeft')) return undefined;
        return new Lnglat(this._extent[0], this._extent[3]);
    }

    /**
     * 获取边界范围Extent的右上方位置
     * @return {Lnglat} 右上方位置
     */
    getTopRight(): Lnglat | undefined {
        if (!this._isInitialized('getTopRight')) return undefined;
        return new Lnglat(this._extent[2], this._extent[3]);
    }

    /**
     * 获取边界范围Extent的左下角位置
     * @return {Lnglat} 左下角位置
     */
    getBottomLeft(): Lnglat | undefined {
        if (!this._isInitialized('getBottomLeft')) return undefined;
        return new Lnglat(this._extent[0], this._extent[1]);
    }

    /**
     * 获取边界范围Extent的右下角位置
     * @return {Lnglat} 右下角位置
     */
    getBottomRight(): Lnglat | undefined {
        if (!this._isInitialized('getBottomRight')) return undefined;
        return new Lnglat(this._extent[2], this._extent[1]);
    }

    /**
     * 获取边界范围Extent的中心点位置
     * @return {Lnglat} 中心点位置
     */
    getCenter(): Lnglat | undefined {
        if (!this._isInitialized('getCenter')) return undefined;
        return new Lnglat(
            (this._extent[0] + this._extent[2]) / 2,
            (this._extent[1] + this._extent[3]) / 2
        );
    }

    // getWidth(): number | undefined {
    //     if (!this._isInitialized('getWidth')) return undefined;
    //     return getWidth(this._extent);
    // }

    /**
     * 以字符串的形式输出边界范围
     * @return {string} 边界范围（字符串）
     */
    toString(): string | undefined {
        if (!this._isInitialized('toString')) return undefined;
        return `[${this._extent[0]}, ${this._extent[1]}, ${this._extent[2]}, ${this._extent[3]}]`;
    }

    /**
     * 判断边界范围Extent是否包含某个点
     * @param extent 范围
     * @param position 位置
     * @return 判断结果
     */
    static containsCoordinate(extent: Extent, position: Lnglat): boolean | undefined {
        if (!(extent instanceof Extent) || !(position instanceof Lnglat)) {
            warn_(createMessage('containsCoordinate', '参数格式错误，必须为Extent类型和Lnglat类型'));
            return;
        }
        if (!extent._isInitialized('containsCoordinate')) return;
        if (!isDefined(position.toArray())) return;
        const [x, y] = position.toArray()!;
        return x >= extent._extent[0] && x <= extent._extent[2] && extent._extent[1] <= y && y <= extent._extent[3];
    }

    /**
     * 判断是否某个范围包含另一个范围
     * @param extent1 范围1
     * @param extent2 范围2
     * @return 判断结果
     */
    static containsExtent(extent1: Extent, extent2: Extent): boolean | undefined {
        if (!(extent1 instanceof Extent) || !(extent2 instanceof Extent)) {
            warn_(createMessage('containsExtent', '参数格式错误，必须为Extent'));
            return undefined;
        }
        if (!extent1._isInitialized('containsExtent') || !extent2._isInitialized('containsExtent')) return undefined;
        return (
            extent1._extent[0] <= extent2._extent[0] &&
            extent2._extent[2] <= extent1._extent[2] &&
            extent1._extent[1] <= extent2._extent[1] &&
            extent2._extent[3] <= extent1._extent[3]
        );
    }
}