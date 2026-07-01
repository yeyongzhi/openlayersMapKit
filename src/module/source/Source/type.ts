import { isDefined } from '../../../utils/index'
import { OlSource } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import Projection from '../../core/Projection/index'

export type OMapSourceType = OlSource.Source

export type OlSourceParamsType = ConstructorParameters<typeof OlSource.Source>[0]
export type CustomerOlSourceParamsType = ManualOmit<OlSourceParamsType, 'attributions' | 'projection'>
/**
 * 以下是Source基类的最终属性（一共6个）（改造了attributions、projection）
 * attributions：数据源的版权信息
 * attributionsCollapsible：是否可折叠显示版权信息
 * projection：投影坐标系
 * state：数据源状态（ready、loading、error）
 * wrapX：是否_wrapX_
 * interpolate：是否插值
 */
export type OMapSourceParamsType = CustomerOlSourceParamsType & {
    attributions?: string | string[];
    projection?: Projection;
}
/**
 * OMap Source 类的公共属性键
 */
export type OMapSourceParamsCommonKey = keyof OMapSourceParamsType

export function handleGetSourceParams(params: OMapSourceParamsType): OlSourceParamsType {
    const _params = Object.assign({}, params, {
        projection: isDefined(params.projection) ? params.projection.getProjection() : undefined
    })
    return _params
}



export const DEFAULT_SOURCE_PARAMS: OMapSourceParamsType = {
    attributions: "",
    attributionsCollapsible: true,
    state: "ready",
    wrapX: false,
    interpolate: false
}
