import { OlGeometry, OlSource } from '../../../source/index'
import type Collection from 'ol/Collection'
import type FeatureFormat from 'ol/format/Feature'
import type { FeatureLoader, FeatureUrlFunction } from 'ol/featureloader'
import type { VectorSourceEvent } from 'ol/source/Vector'
import type { VectorSourceEventTypes } from 'ol/source/VectorEventType'
import type { LoadingStrategy, Options as OlVectorSourceOptions } from 'ol/source/Vector'
import type BasicFeature from '../../core/Feature/BasicFeature/index'
import type { OlFeatureInstanceType } from '../../core/Feature/BasicFeature/type'

export type OMapVectorSourceFeature = BasicFeature<OlGeometry.Geometry>
export type OMapVectorSourceOlFeature = OlFeatureInstanceType
export type OMapVectorSourceType = OlSource.Vector<OMapVectorSourceOlFeature>
export type OMapVectorSourceFeatureCollection = Collection<OMapVectorSourceOlFeature>
export type OMapVectorSourceFeatureFormat = FeatureFormat<OMapVectorSourceOlFeature>
export type OMapVectorSourceLoader = FeatureLoader<OMapVectorSourceOlFeature>
export type OMapVectorSourceUrl = string | FeatureUrlFunction
export type OMapVectorSourceLoadingStrategy = LoadingStrategy
export type OMapVectorSourceEventType = VectorSourceEventTypes
export type OMapVectorSourceEvent = VectorSourceEvent<OMapVectorSourceOlFeature>
export type OMapVectorSourceEventListener = (event: OMapVectorSourceEvent) => void

export type OMapVectorSourceParamsType = Omit<
    OlVectorSourceOptions<OMapVectorSourceOlFeature>,
    'features'
> & {
    features?: Array<OMapVectorSourceFeature>;
}

export type OlVectorSourceParamsType = Omit<
    OlVectorSourceOptions<OMapVectorSourceOlFeature>,
    'features'
> & {
    features?: Array<OMapVectorSourceOlFeature> | OMapVectorSourceFeatureCollection;
}

export const VECTOR_SOURCE_EVENT_TYPES = {
    addFeature: 'addfeature',
    changeFeature: 'changefeature',
    clear: 'clear',
    removeFeature: 'removefeature',
    featuresLoadStart: 'featuresloadstart',
    featuresLoadEnd: 'featuresloadend',
    featuresLoadError: 'featuresloaderror'
} as const

export const DEFAULT_VECTOR_SOURCE_PARAMS: OMapVectorSourceParamsType = {
    features: [],
    overlaps: true,
    useSpatialIndex: true,
    wrapX: true
}

export function handleGetVectorSourceParams(params: OMapVectorSourceParamsType = {}): OlVectorSourceParamsType {
    return {
        ...params,
        features: params.features?.map(feature => feature.getFeature())
    }
}
