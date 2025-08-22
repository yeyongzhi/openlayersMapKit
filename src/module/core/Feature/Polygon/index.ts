import { isDefined, isCoordinatesType, isArray } from '../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../utils/index'
import type { OlCoordinateType } from '../../../../utils/index'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import { 
    type OMapPolygonGeometryCoordinatesType,
    type OlPolygonGeomInstanceType,
    checkPolygonCoordinates 
} from './type'
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
 * @updateDate 2025/7/14
 */

export default class Polygon extends BasicFeature {

    constructor(coordinates: OMapPolygonGeometryCoordinatesType, properties?: Record<string, any>) {
        if(!isDefined(coordinates)) {
            error_(createMessage('constructor', '参数不能为空'));
            return
        }
        if(!checkPolygonCoordinates(coordinates)) {
            error_(createMessage('constructor', '坐标格式有误'));
            return
        }
        super("Polygon", coordinates)
        if(properties) {
            this.setProperties(properties)
        }
    }

    /**
     * 获取多边形的坐标
     * @returns {Array<Array<Lnglat>>} 多边形的坐标
     */
    getCoordinates(): Array<Array<Lnglat>> {
        let coordinates = (this._geometry as OlPolygonGeomInstanceType).getCoordinates()
        let _coordinates = coordinates.map(c => {
            return c.map(c2 => {
                return new Lnglat(c2[0], c2[1])
            })
        })
        return _coordinates
    }

    /**
     * 设置多边形的坐标
     * @param {OMapPolygonGeometryCoordinatesType} coordinates 多边形的坐标
     */
    setCoordinates(coordinates: OMapPolygonGeometryCoordinatesType): void {
        if (!isDefined(coordinates)) {
            error_(createMessage('setCoordinates', '参数不能为空'));
            return
        }
        if (!checkPolygonCoordinates(coordinates)) {
            error_(createMessage('setCoordinates', '坐标格式有误'));
            return
        }
        let _coordinates = coordinates.map(c => {
            return c.map(c2 => {
                return (c2 instanceof Lnglat) ? c2.toArray() as OlCoordinateType : c2
            })
        });
        (this._geometry as OlPolygonGeomInstanceType).setCoordinates(_coordinates)
    }

    appendLinearRing() {
        
    }

}