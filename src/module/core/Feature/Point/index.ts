import { isDefined, isCoordinatesType } from '../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../utils/index'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { OMapPointGeometryCoordinatesType } from './type'
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

export default class Point extends BasicFeature {


    constructor(coordinates: OMapPointGeometryCoordinatesType, properties?: Record<string, any>) {
        if(!isDefined(coordinates)) {
            error_(createMessage('constructor', '参数不能为空'));
            return
        }
        if((!(coordinates instanceof Lnglat)) && (!isCoordinatesType(coordinates))) {
            error_(createMessage('constructor', '坐标格式有误'));
            return
        }
        super("Point", coordinates)
        if(properties) {
            this.setProperties(properties)
        }
    }

}