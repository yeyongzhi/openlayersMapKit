import { isDefined, isNumber, isCoordinatesType, isArray, isAllNumberArray } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { OlCoordinateType } from '../../../utils/index'

const PACKAGE_NAME = 'Lnglat';
const createMessage = getPackageMessage(PACKAGE_NAME);

/** 
 * @class Lnglat
 * @classdesc 经纬度
 * @author yyz
 * @CreateDate 2025/06/30
 * @LastUpdateDate 2025/08/13
 */
export default class Lnglat {
    /**
     * 经纬度数组
     * @type {OlCoordinateType}
     * @example [119.26, 28.73]
     * @private
     */
    _lnglat: OlCoordinateType = [];

    constructor(...args: number[]);
    constructor(args: number[]);

    constructor(...args: any[]) {
        let value: OlCoordinateType = []
        if (args.length === 1 && isArray(args[0])) {
            value = args[0];
        } else if (args.length === 2 && isAllNumberArray(args)) {
            value = args;
        } else {
            error_(createMessage('constructor', '初始化参数格式有误'));
            return;
        }
        this._lnglat = value;
    }

    private _isInitialized(method: string): boolean {
        if (!isDefined(this._lnglat) || (isDefined(this._lnglat) && this._lnglat.length !== 2)) {
            warn_(createMessage(method, "经纬度未正确初始化"));
            return false;
        }
        return true;
    }

    /**
     * 设置经度
     * @param {number} lng 经度
     */
    setLng(lng: number): void {

        if (!isNumber(lng)) {
            warn_(createMessage("setLng", "传入经度格式有误"));
            return;
        }
        this._lnglat[0] = lng;
    }

    /**
     * 设置纬度
     * @param {number} lat 纬度
     */
    setLat(lat: number): void {

        if (!isNumber(lat)) {
            warn_(createMessage("setLat", "传入纬度格式有误"));
            return;
        }
        this._lnglat[1] = lat;
    }

    /**
     * 获取经度
     * @returns {number | undefined} 经度
     */
    getLng(): number | undefined {
        if (!this._isInitialized("getLng")) return undefined;
        return this._lnglat[0];
    }

    /**
     * 获取纬度
     * @returns {number | undefined} 纬度
     */
    getLat(): number | undefined {
        if (!this._isInitialized("getLat")) return undefined;
        return this._lnglat[1];
    }

    /**
     * 判断两个经纬度是否相等
     * @param {Lnglat} lnglat 经纬度对象
     * @returns {boolean | undefined} 判断结果
     */
    equals(lnglat: Lnglat): boolean | undefined {
        if (!this._isInitialized("equals")) return undefined;
        if (!(lnglat instanceof Lnglat)) {
            warn_(createMessage("equals", "传入经纬度格式错误，必须为Lnglat类型"));
            return undefined;
        }
        const otherLnglat = lnglat.getLng() !== undefined && lnglat.getLat() !== undefined ? 
                           [lnglat.getLng()!, lnglat.getLat()!] : undefined;
        if (!otherLnglat) return undefined;
        return this._lnglat[0] === otherLnglat[0] && this._lnglat[1] === otherLnglat[1];
    }

    /**
     * 以数组形式输出经纬度
     * @returns {OlCoordinateType | undefined} 经纬度数组
     */
    toArray(): OlCoordinateType | undefined {
        if (!this._isInitialized("toArray")) return undefined;
        return this._lnglat;
    }

    /**
     * 以字符串的形式输出经纬度
     * @param {number} place 保留的小数位数
     * @returns {string} 经纬度字符串
     */
    toString(place?: number): string {
        if (!this._isInitialized("toString")) return "";
        if(!isCoordinatesType(this._lnglat)) {
            return ""
        }
        return `[${this._lnglat[0]?.toFixed(place)}, ${this._lnglat[1]?.toFixed(place)}]`;
    }
}