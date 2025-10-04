import Lnglat from '../Lnglat/index'
import { isArray, isDefined, isNumber, isCoordinatesType, isAllNumberArray } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import { type OMapCoordinateType, type OlCoordinateType } from '../Lnglat/type'
import { type OlExtentType, type OMapExtentType } from './type'
import { OlExtent } from '../../../source/index'
import { handleGetExtentValue } from './handle';
import { handleGetLnglatValue } from '../Lnglat/handle'
import Size from '../Size/index'

const PACKAGE_NAME = 'Extent';
const createMessage = getPackageMessage(PACKAGE_NAME);

/** Extent 边界范围
 * Author：yyz
 * CreateDate：2025/10/4
 * UpdateDate：2025/10/4
 */

interface ExtentLike {
    _extent?: OlExtentType;
}

// 精确类型：保证一定已初始化
interface ExtentLikeInitialized {
    _extent: OlExtentType;
}

export default class Extent implements ExtentLike {
    /**
     * extent数组
     * @type {OlExtentType}
     * @example [119.26, 28.73, 119.26, 28.73]
     * @private
     */
    _extent?: OlExtentType;

    constructor(...args: number[]);
    constructor(args: number[]);

    constructor(...args: any[]) {
        let value: OlExtentType = []
        if (args.length === 1 && isArray(args[0])) {
            value = args[0];
        } else if (args.length === 4 && isAllNumberArray(args)) {
            value = args;
        } else {
            error_(createMessage('constructor', '初始化参数格式有误'));
            return;
        }
        this._extent = value;
    }

    private _isInitialized(method: string): this is ExtentLikeInitialized & this {
        if (!isDefined(this._extent) || this._extent.length !== 4) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    getExtent(): OlExtentType | undefined {
        if (!this._isInitialized('getExtent')) return;
        return this._extent
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
        if (!this._isInitialized('getCenter')) return;
        return new Lnglat(...OlExtent.getCenter(this._extent));
    }

    /**
     * 获取宽度信息
     * @returns {number} 宽度
     */
    getWidth(): number | undefined {
        if (!this._isInitialized('getWidth')) return;
        return OlExtent.getWidth(this._extent);
    }

    /**
     * 获取高度信息
     * @returns {number} 高度
     */
    getHeight(): number | undefined {
        if (!this._isInitialized('getHeight')) return;
        return OlExtent.getHeight(this._extent);
    }

    getSize(): Size | undefined {
        if (!this._isInitialized('getHeight')) return;
        return new Size(...OlExtent.getSize(this._extent));
    }

    /**
     * 以字符串的形式输出边界范围
     * @return {string} 边界范围（字符串）
     */
    toString(place?: number): string | undefined {
        if (!this._isInitialized('toString')) return undefined;
        return `[${this._extent[0].toFixed(place)}, ${this._extent[1].toFixed(place)}, ${this._extent[2].toFixed(place)}, ${this._extent[3].toFixed(place)}]`;
    }

    toArray(): OlExtentType | undefined {
        if (!this._isInitialized('toString')) return undefined;
        return this._extent
    }

    /**
     * 构建包含所有给定坐标的范围
     * @param {OMapCoordinateType} coordinates 坐标数组
     * @return {Extent} 边界范围
     */
    static boundingExtent(coordinates: Array<OMapCoordinateType>): Extent | undefined {
        if (!isDefined(coordinates)) {
            error_(createMessage('boundingExtent', '参数coordinates不能为空'));
            return;
        }
        if (!isArray(coordinates)) {
            error_(createMessage('boundingExtent', '参数coordinates格式错误，必须为数组'));
            return;
        }
        let vaildList = coordinates.filter((c: OMapCoordinateType) => {
            return c instanceof Lnglat || (isCoordinatesType(c))
        })
        if (vaildList.length < coordinates.length) {
            warn_(createMessage('boundingExtent', '参数coordinates存在不合法格式，元素必须为Lnglat类型或者坐标数组类型'));
        }
        let positions = vaildList.map((c: OMapCoordinateType) => {
            return (c instanceof Lnglat) ? (c.toArray() as OlCoordinateType) : (c as OlCoordinateType);
        })
        let _extent = OlExtent.boundingExtent(positions);
        return new Extent(..._extent);
    }

    /**
     * 判断边界范围Extent是否包含某个点
     * @param {OMapExtentType} extent 范围
     * @param {OMapCoordinateType} coordinate 位置
     * @return {boolean} 判断结果
     */
    static containsCoordinate(extent: OMapExtentType, coordinate: OMapCoordinateType): boolean | undefined {
        if (!isDefined(extent) || !isDefined(coordinate)) return undefined;
        let _extent = handleGetExtentValue(extent)
        let _coordinate = handleGetLnglatValue(coordinate);
        if (!isDefined(_extent) || !isDefined(_coordinate)) return undefined;
        return OlExtent.containsCoordinate(_extent, _coordinate);
    }

    /**
     * 判断是否某个范围包含另一个范围
     * @param {OMapExtentType} extent1 范围1
     * @param {OMapExtentType} extent2 范围2
     * @return 判断结果
     */
    static containsExtent(extent1: OMapExtentType, extent2: OMapExtentType): boolean | undefined {
        if (!isDefined(extent1) || !isDefined(extent2)) return;
        let _extent1 = handleGetExtentValue(extent1);
        let _extent2 = handleGetExtentValue(extent2);
        if (!isDefined(_extent1) || !isDefined(_extent2)) return;
        return OlExtent.containsExtent(_extent1, _extent2);
    }

    static containsXY(extent: OMapExtentType, x: number, y: number): boolean | undefined {
        if (!isDefined(extent) || !isDefined(x) || !isDefined(y)) return;
        let _extent = handleGetExtentValue(extent);
        if (!isDefined(_extent)) return;
        return OlExtent.containsXY(_extent, x, y);
    }

    static createEmpty(): Extent {
        return new Extent(...OlExtent.createEmpty());
    }

    static equals(extent1: OMapExtentType, extent2: OMapExtentType): boolean | undefined {
        if (!isDefined(extent1) || !isDefined(extent2)) return;
        let _extent1 = handleGetExtentValue(extent1);
        let _extent2 = handleGetExtentValue(extent2);
        if (!isDefined(_extent1) || !isDefined(_extent2)) return;
        return OlExtent.equals(_extent1, _extent2);
    }

    static extend(extent1: OMapExtentType, extent2: OMapExtentType): Extent | undefined {
        if (!isDefined(extent1) || !isDefined(extent2)) return;
        let _extent1 = handleGetExtentValue(extent1);
        let _extent2 = handleGetExtentValue(extent2);
        if (!isDefined(_extent1) || !isDefined(_extent2)) return;
        return new Extent(...OlExtent.extend(_extent1, _extent2));
    }

    static getArea(extent: OMapExtentType): number | undefined {
        if (!isDefined(extent)) return;
        let _extent = handleGetExtentValue(extent);
        if (!isDefined(_extent)) return;
        return OlExtent.getArea(_extent);
    }

    /**
     * 确定一个范围是否与另一个范围相交
     * @param {OMapExtentType} extent1 
     * @param {OMapExtentType}extent2 
     * @returns {boolean} 判断结果
     */
    static intersects(extent1: OMapExtentType, extent2: OMapExtentType): boolean | undefined {
        if (!isDefined(extent1) || !isDefined(extent2)) return;
        let _extent1 = handleGetExtentValue(extent1);
        let _extent2 = handleGetExtentValue(extent2);
        if (!isDefined(_extent1) || !isDefined(_extent2)) return;
        return OlExtent.intersects(_extent1, _extent2);
    }

    static isEmpty(extent: OMapExtentType): boolean | undefined {
        if (!isDefined(extent)) return;
        let _extent = handleGetExtentValue(extent);
        if (!isDefined(_extent)) return;
        return OlExtent.isEmpty(_extent);
    }

}