import { type OlSource } from '../../../source/index'
import type { Options as OlClusterSourceOptions } from 'ol/source/Cluster'
import VectorSource from '../VectorSource/index'
import type { OMapVectorSourceType } from '../VectorSource/type'

export type OMapClusterSourceType = InstanceType<typeof OlSource.Cluster>

export type OMapClusterSourceParamsType = Omit<OlClusterSourceOptions, 'source'> & {
  source: VectorSource | OMapVectorSourceType
}

/** @internal */
export const DEFAULT_CLUSTER_SOURCE_PARAMS = {
  distance: 40,
  minDistance: 20
}

/** @internal */
export function handleGetClusterSourceParams(params: OMapClusterSourceParamsType) {
  const inner = params.source instanceof VectorSource ? params.source.getSource() : params.source
  return {
    ...params,
    source: inner
  }
}
