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
 * @class ClusterSource
 * @classdesc 基于 OpenLayers `ol/source/Cluster` 的矢量聚合数据源，将内部矢量源中邻近要素聚合为超级点。
 *   内部源可为 omap `VectorSource` 或原生 `ol/source/Vector` 实例。
 * @author Aurora
 * @version 1.0.0
 * @createDate 2026/8/31
 * @updateDate 2026/8/31
 */
export default class ClusterSource extends Source<OMapClusterSourceType> {
  constructor(params: OMapClusterSourceParamsType) {
    const _params = handleGetClusterSourceParams({
      ...DEFAULT_CLUSTER_SOURCE_PARAMS,
      ...params
    })
    super(new OlSource.Cluster(_params) as OMapClusterSourceType)
  }

  /** 获取被聚合的内部原生矢量源。 */
  getClusteredSource(): OMapClusterSourceType['source'] {
    return this._source.getSource()
  }
}
