import{ OlInteraction } from '../../../source/index'
import type { OlDrawInstanceType } from '../Draw/type'
import type { OlDragBoxInstanceType } from '../DragBox/type'
import type { OlDragPanInstanceType } from '../DragPan/type'
import type { OlInteractionExtentInstanceType } from '../Extent/type'
import type { OlModifyInstanceType } from '../Modify/type'
import type { OlInteractionSelectInstanceType } from '../Select/type'
import type { OlInteractionLinkInstanceType } from '../Link/type'
import type { OlInteractionMouseWheelZoomInstanceType } from '../MouseWheelZoom/type'
import type { OlInteractionDoubleClickZoomInstanceType } from '../DoubleClickZoom/type'
import type { OlInteractionKeyboardZoomInstanceType } from '../KeyboardZoom/type'

/**
 * 交互类通用参数
 */
export type OMapInteractionCommonParamsType = {
    /**
     * 交互实例id
     */
    id?: string | number | null;
    /**
     * 交互是否激活
     */
    active?: boolean;
}

export const OMapInteractionCommonParams: OMapInteractionCommonParamsType = {
    active: false
}

export type OMapInteractionType = 'Draw' | 'DragBox' | 'DragPan' | 'InteractionExtent' |  'Extent' | "Modify" | "Measure" | "Select" | "Link" | "MouseWheelZoom" | "DoubleClickZoom" | "KeyboardZoom" | "DragZoom"
export type OlInteractionInstanceType = OlDrawInstanceType | OlDragBoxInstanceType | OlDragPanInstanceType |OlInteractionExtentInstanceType | OlModifyInstanceType | OlInteractionSelectInstanceType | OlInteractionLinkInstanceType | OlInteractionMouseWheelZoomInstanceType | OlInteractionDoubleClickZoomInstanceType | OlInteractionKeyboardZoomInstanceType

export const OMapInteractionEventTypes = [
    "change",
    "change:active",
    "error",
    "propertychange"
] as const;
export type OMapInteractionEventType = "change" | "change:active" | "error" | "propertychange"