import { isDefined, isCoordinatesType } from '../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../utils/index'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import { type OMapLineStringGeometryCoordinatesType, type OlLineStringGeomInstanceType, checkLineStringCoordinates } from './type'
import { Lnglat } from '../../../../index'

const PACKAGE_NAME = 'Point';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * Point类
 * @class
 * @classdesc Point
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/14
 * @updateDate 2025/8/14
 */

export default class LineString extends BasicFeature {


    constructor(coordinates: OMapLineStringGeometryCoordinatesType, properties?: Record<string, any>) {
        if(!isDefined(coordinates)) {
            error_(createMessage('constructor', '参数不能为空'));
            return
        }
        if(!checkLineStringCoordinates(coordinates)) {
            error_(createMessage('constructor', '坐标格式有误'));
            return
        }
        super("LineString", coordinates)
        if(properties) {
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
        if(!checkLineStringCoordinates(coordinates)) {
            error_(createMessage('setCoordinates', '坐标格式有误'));
            return
        }
        let _coordinates = coordinates.map(c => {
            return (c instanceof Lnglat) ? c.toArray() : c
        });
        (this._geometry as OlLineStringGeomInstanceType).setCoordinates(_coordinates as OlCoordinateType)


    }

}