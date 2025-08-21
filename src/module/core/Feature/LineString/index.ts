import { isDefined, isCoordinatesType, OlCoordinateType, isNumber, isExtentType } from '../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../utils/index'
import { OlExtentType, OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import { type OMapLineStringGeometryCoordinatesType, type OlLineStringGeomInstanceType, checkLineStringCoordinates } from './type'
import { Extent, Lnglat } from '../../../../index'

const PACKAGE_NAME = 'Point';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * Point类
 * @class
 * @classdesc Point
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/14
 * @updateDate 2025/8/19
 */

export default class LineString extends BasicFeature {


    constructor(coordinates: OMapLineStringGeometryCoordinatesType, properties?: Record<string, any>) {
        if (!isDefined(coordinates)) {
            error_(createMessage('constructor', '参数不能为空'));
            return
        }
        if (!checkLineStringCoordinates(coordinates)) {
            error_(createMessage('constructor', '坐标格式有误'));
            return
        }
        super("LineString", coordinates)
        if (properties) {
            this.setProperties(properties)
        }
    }

    /**
     * 获取线的坐标
     * @returns {Lnglat[]} 线的坐标
     */
    getCoordinates(): Lnglat[] {
        let coordinates = (this._geometry as OlLineStringGeomInstanceType).getCoordinates()
        return coordinates.map(c => {
            return new Lnglat(c[0], c[1])
        })
    }

    /**
     * 设置线的坐标
     * @param {OMapLineStringGeometryCoordinatesType} coordinates 线的坐标
     * @returns {void}
     */
    setCoordinates(coordinates: OMapLineStringGeometryCoordinatesType): void {
        if (!isDefined(coordinates)) {
            error_(createMessage('setCoordinates', '参数不能为空'));
            return
        }
        if (!checkLineStringCoordinates(coordinates)) {
            error_(createMessage('setCoordinates', '坐标格式有误'));
            return
        }
        let _coordinates = coordinates.map(c => {
            return (c instanceof Lnglat) ? c.toArray() as OlCoordinateType : c
        });
        (this._geometry as OlLineStringGeomInstanceType).setCoordinates(_coordinates)
    }

    /**
     * 追加坐标
     * @param {Lnglat | OlCoordinateType} coordinates 坐标
     * @returns 
     */
    appendCoordinate(coordinates: Lnglat | OlCoordinateType) {
        if (!isDefined(coordinates)) {
            error_(createMessage('setCoordinates', '参数不能为空'));
            return
        }
        if ((!(coordinates instanceof Lnglat)) && (!isCoordinatesType(coordinates))) {
            error_(createMessage('setCoordinates', '坐标格式有误'));
            return
        }
        let _coordinates = (coordinates instanceof Lnglat) ? (coordinates.toArray() as OlCoordinateType) : coordinates;
        (this._geometry as OlLineStringGeomInstanceType).appendCoordinate(_coordinates)
    }

    /**
     * 获取线的第一个坐标
     * @returns {Lnglat} 线的第一个坐标
     */
    getFirstCoordinate(): Lnglat {
        let coordinates = (this._geometry as OlLineStringGeomInstanceType).getFirstCoordinate()
        return new Lnglat(coordinates[0], coordinates[1])
    }

    /**
     * 获取线的最后一个坐标
     * @returns {Lnglat} 线的最后一个坐标
     */
    getLastCoordinate(): Lnglat {
        let coordinates = (this._geometry as OlLineStringGeomInstanceType).getLastCoordinate()
        return new Lnglat(coordinates[0], coordinates[1])
    }

    /**
     * 获取线的范围
     * @returns {Extent} 线的范围
     */
    getExtent(): Extent {
        let extent = (this._geometry as OlLineStringGeomInstanceType).getExtent()
        return new Extent(extent[0], extent[1], extent[2], extent[3])
    }

    getLength(): number {
        return (this._geometry as OlLineStringGeomInstanceType).getLength()
    }

    /**
     * 获取线段指定位置的坐标点
     * @param {number} fraction 比例
     * @param dest 目标坐标点
     * @returns {Lnglat} 线的坐标点
     */
    getCoordinateAt(fraction: number, dest: OlCoordinateType | Lnglat): Lnglat | undefined {
        if (!isDefined(fraction)) {
            error_(createMessage('getCoordinateAt', '参数不能为空'));
            return
        }
        if (!(isNumber(fraction) && fraction >= 0 && fraction <= 1)) {
            error_(createMessage('getCoordinateAt', '参数格式有误'));
            return
        }
        let result: number[] = []
        let coordinates = (this._geometry as OlLineStringGeomInstanceType).getCoordinateAt(fraction, result)
        if (isDefined(dest)) {
            if (dest instanceof Lnglat) {
                dest.setLng(result[0])
                dest.setLat(result[1])
            } else {
                dest[0] = result[0]
                dest[1] = result[1]
            }
        }
        return new Lnglat(coordinates[0], coordinates[1])
    }

    getCoordinateAtM() {
        return null
    }

    translate(deltaX: number = 0, deltaY: number = 0): void {
        (this._geometry as OlLineStringGeomInstanceType).translate(deltaX, deltaY)
    }

    transform() {

    }

    simplify(tolerance: number = 0): void {
        (this._geometry as OlLineStringGeomInstanceType).simplify(tolerance)
    }

    intersectsCoordinate() {

    }

    /**
     * 线是否在extent范围内
     * @param {Extent | OlExtentType} extent 
     * @returns {boolean | undefined}
     */
    intersectsExtent(extent: Extent): boolean | undefined {
        if (!isDefined(extent)) {
            error_(createMessage('intersectsExtent', '参数extent不能为空'));
            return
        }
        if ((!(extent instanceof Extent)) && (!isExtentType(extent))) {
            error_(createMessage('intersectsExtent', '坐标格式有误'));
            return
        }
        let _extent = extent instanceof Extent ? extent.getExtent() : extent;
        return (this._geometry as OlLineStringGeomInstanceType).intersectsExtent(_extent as OlExtentType)
    }

}