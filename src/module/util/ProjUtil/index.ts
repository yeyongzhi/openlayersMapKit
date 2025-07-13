import { isDefined, isNumber, isCoordinatesType, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import { OlProj } from '../../../source/index'
import { Lnglat, Projection } from '../../../index'
import type { OMapProjType, OlProjInstanceType } from '../../../utils/index'

const PACKAGE_NAME = 'ProjUtil';
const createMessage = getPackageMessage(PACKAGE_NAME);

/** 
 * @class ProjUtil
 * @classdesc 投影处理工具
 * @author yyz
 * @CreateDate 2025/7/8
 * @LastUpdateDate 2025/7/8
 */
export default class ProjUtil {

    static fromLonLat(coordinate: Lnglat | number[], projection?: OMapProjType): Lnglat | undefined {
        if(!isDefined(coordinate)) {
            warn_(createMessage('fromLonLat', 'coordinate参数不能为空'));
            return undefined;
        }
        let _coords = coordinate as number[];
        if(coordinate instanceof Lnglat) {
            _coords = coordinate._lnglat;
        }
        let _proj: Projection = isDefined(projection) ? (isString(projection) ? new Projection(projection as string) : (projection as Projection)) : new Projection('EPSG:3857');
        let result: number[] = OlProj.fromLonLat(_coords, ((_proj as Projection)._projection as OlProjInstanceType))
        return new Lnglat(result[0], result[1])
    }

    static toLonLat(coordinate: Lnglat | number[], projection?: OMapProjType): Lnglat | undefined {
        if(!isDefined(coordinate)) {
            warn_(createMessage('toLonLat', 'coordinate参数不能为空'));
            return undefined;
        }
        let _coords = coordinate as number[];
        if(coordinate instanceof Lnglat) {
            _coords = coordinate._lnglat;
        }
        let _proj: Projection = isDefined(projection) ? (isString(projection) ? new Projection(projection as string) : (projection as Projection)) : new Projection('EPSG:3857');
        let result: number[] = OlProj.toLonLat(_coords, ((_proj as Projection)._projection as OlProjInstanceType))
        return new Lnglat(result[0], result[1])
    }

}