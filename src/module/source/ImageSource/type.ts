import { OlSource } from '../../../source/index'
import type { Options as OlImageSourceOptions } from 'ol/source/Image'
import { type OMapSourceProjectionLike } from '../Source/type'

export type OMapImageSourceType = OlSource.Image
export type OMapImageSourceParamsType = Omit<OlImageSourceOptions, 'projection'> & {
    projection?: OMapSourceProjectionLike;
}
