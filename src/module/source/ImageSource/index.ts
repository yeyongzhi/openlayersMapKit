import { OlSource } from '../../../source/index'
import {
    type OMapImageSourceType,
    type OMapImageSourceParamsType
} from './type'
import Source from '../Source/index'
import { DEFAULT_SOURCE_PARAMS, handleGetSourceParams } from '../Source/type'

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

    constructor(params: OMapImageSourceParamsType = {}) {
        const sourceParams = handleGetSourceParams({
            ...DEFAULT_SOURCE_PARAMS,
            ...params,
            interpolate: params.interpolate ?? true
        })
        super(params, new OlSource.Image(sourceParams))
    }

}
