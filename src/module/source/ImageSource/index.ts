import { isDefined, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/message'
import { 
    type OMapImageSourceType,
    type OMapImageSourceParamsType
} from './type'
import Source from '../Source/index'

const PACKAGE_NAME = 'ImageSource';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * ImageSource
 * @class ImageSource
 * @classdesc ImageSource
 * @description 参考：
 * @author Aurora
 * @version 1.0.0
 * @createDate 2026/6/7
 * @updateDate 2026/6/7
 */

export default class ImageSource extends Source<OMapImageSourceType>  {

    constructor(params: OMapImageSourceParamsType) {
        super(params)
    }

}