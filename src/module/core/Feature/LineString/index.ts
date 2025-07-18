import { isDefined, isCoordinatesType } from '../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../utils/index'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import { type OMapLineStringGeometryCoordinatesType, checkLineStringCoordinates } from './type'
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

}