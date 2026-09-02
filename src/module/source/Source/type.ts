import { type OlSource } from '../../../source/index'
import type {
  AttributionLike,
  Options as OlSourceOptions,
  State as OlSourceState
} from 'ol/source/Source'
import type Projection from '../../core/Projection/index'

export type OMapSourceType = OlSource.Source

export type OlSourceParamsType = OlSourceOptions
export type OMapSourceAttributionLike = AttributionLike
export type OMapSourceState = OlSourceState
export type OMapSourceProjectionType = Projection
export type OMapSourceProjectionLike = OMapSourceProjectionType

/**
 * 以下是Source基类的最终属性（一共6个）（改造了attributions、projection）
 * attributions：数据源的版权信息
 * attributionsCollapsible：是否可折叠显示版权信息
 * projection：投影坐标系
 * state：数据源状态（ready、loading、error）
 * wrapX：是否_wrapX_
 * interpolate：是否插值
 */
export type OMapSourceParamsType = Omit<OlSourceParamsType, 'projection'> & {
  projection?: OMapSourceProjectionType
}

/**
 * OMap Source 类的公共属性键
 */
export type OMapSourceParamsCommonKey = keyof OMapSourceParamsType

export function handleGetSourceParams(params: OMapSourceParamsType = {}): OlSourceParamsType {
  const projection = params.projection?.getProjection()
  const resolvedParams = Object.assign({}, params, {
    projection
  })
  return resolvedParams
}

export const DEFAULT_SOURCE_PARAMS: OMapSourceParamsType = {}
