import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { OMapInteractionCommonParamsType } from '../Interaction/type'

export type OlDragZoomParamsType = ConstructorParameters<typeof OlInteraction.DragZoom>[0]
type CustOlDragZoomParamsType = ManualOmit<OlDragZoomParamsType, ''>
export type OMapDragZoomParamsType = CustOlDragZoomParamsType & OMapInteractionCommonParamsType
export type OMapDragZoomType = OlInteraction.DragZoom
export type OlDragZoomInstanceType = InstanceType<typeof OlInteraction.DragZoom>

export const defaultDragZoomOptions: OMapDragZoomParamsType = {
    className: 'omap-dragzoom',
    condition: undefined,
    duration: 200,
    out: false,
    minArea: 64
}