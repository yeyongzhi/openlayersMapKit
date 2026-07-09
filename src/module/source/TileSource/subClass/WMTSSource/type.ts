import { OlSource } from '../../../../../source/index'
import type { Options as OlWMTSSourceOptions, RequestEncoding } from 'ol/source/WMTS'
import { handleGetProjectionValue } from '../../../../core/Projection/handle'
import type { OMapProjectionType } from '../../../../core/Projection/type'

export type OMapWMTSSourceType = InstanceType<typeof OlSource.WMTS>
export type OMapWMTSSourceRequestEncoding = RequestEncoding

export type OMapWMTSSourceParamsType = Omit<OlWMTSSourceOptions, 'projection'> & {
    projection?: OMapProjectionType;
}

export const DEFAULT_WMTS_SOURCE_PARAMS: Partial<OMapWMTSSourceParamsType> = {
    attributionsCollapsible: true,
    interpolate: true,
    reprojectionErrorThreshold: 0.5,
    requestEncoding: 'KVP',
    format: 'image/jpeg',
    version: '1.0.0',
    tilePixelRatio: 1,
    wrapX: false,
    zDirection: 0
}

export function handleGetWMTSSourceParams(params: OMapWMTSSourceParamsType) {
    return {
        ...params,
        projection: handleGetProjectionValue(params.projection)
    }
}
