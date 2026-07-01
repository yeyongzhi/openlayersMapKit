import { OlSource } from '../../../source/index'
import { type OMapSourceParamsType } from '../Source/type'

export type OMapImageSourceType = OlSource.Image
export type OMapImageSourceParamsType = {
    attributions?: OMapSourceParamsType['attributions']
    interpolate: OMapSourceParamsType['interpolate']
    projection?: OMapSourceParamsType['projection']
    resolutions?: Array<number>
    state?: OMapSourceParamsType['state']
    loader?: any
}