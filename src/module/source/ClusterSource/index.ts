import { OlSource } from '../../../source/index'
import Source from '../Source/index'
import {
  DEFAULT_CLUSTER_SOURCE_PARAMS,
  handleGetClusterSourceParams,
  type OMapClusterSourceParamsType,
  type OMapClusterSourceType
} from './type'

/**
 * 聚合数据源
 *
 *   内部源可为 omap `VectorSource` 或原生 `ol/source/Vector` 实例。
 */
export default class ClusterSource extends Source<OMapClusterSourceType> {
  constructor(params: OMapClusterSourceParamsType) {
    const resolvedParams = handleGetClusterSourceParams({
      ...DEFAULT_CLUSTER_SOURCE_PARAMS,
      ...params
    })
    super(new OlSource.Cluster(resolvedParams) as OMapClusterSourceType)
  }

  /** 获取被聚合的内部原生矢量源。 */
  getClusteredSource(): OMapClusterSourceType['source'] {
    return this._source.getSource()
  }
}
