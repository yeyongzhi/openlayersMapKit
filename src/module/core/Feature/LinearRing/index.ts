import { isDefined, isCoordinatesType, isArray } from '../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../utils/index'
import type { OlCoordinateType } from '../../../../utils/index'
import BasicFeature from '../BasicFeature'
import { 
    checkLinearRingCoordinates,
    type OMapLinearRingGeometryCoordinatesType,
    type OlLinearRingGeomInstanceType
} from './type'
import { Lnglat } from '../../../../index'

const PACKAGE_NAME = 'LinearRing';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * LinearRing类
 * @class
 * @classdesc LinearRing
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/8/25
 * @updateDate 2025/8/25
 */

export default class LinearRing extends BasicFeature {

    constructor(coordinates: OMapLinearRingGeometryCoordinatesType, properties?: Record<string, any>) {
        if(!isDefined(coordinates)) {
            error_(createMessage('constructor', '参数不能为空'));
            return
        }
        if(!checkLinearRingCoordinates(coordinates)) {
            error_(createMessage('constructor', '坐标格式有误'));
            return
        }
        super("LinearRing", coordinates)
        if(properties) {
            this.setProperties(properties)
        }
    }

    /**
     * 获取LinearRing的坐标
     * @returns {Array<Lnglat>} LinearRing的坐标
     */
    getCoordinates(): Array<Lnglat> {
        let coordinates = (this._geometry as OlLinearRingGeomInstanceType).getCoordinates()
        let _coordinates = coordinates.map(c => {
            return new Lnglat(c[0], c[1])
        })
        return _coordinates
    }

    /**
     * 设置LinearRing的坐标
     * @param {OMapLinearRingGeometryCoordinatesType} coordinates LinearRing的坐标
     */
    setCoordinates(coordinates: OMapLinearRingGeometryCoordinatesType): void {
        if (!isDefined(coordinates)) {
            error_(createMessage('setCoordinates', '参数不能为空'));
            return
        }
        if (!checkLinearRingCoordinates(coordinates)) {
            error_(createMessage('setCoordinates', '坐标格式有误'));
            return
        }
        let _coordinates = coordinates.map(c => {
            return (c instanceof Lnglat) ? c.toArray() as OlCoordinateType : c
        });
        (this._geometry as OlLinearRingGeomInstanceType).setCoordinates(_coordinates)
    }

}