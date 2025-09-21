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


export type OMapInteractionType = 'Draw' | 'DragBox' | 'DragPan' | 'Extent' | "Modify" | "Measure" | "Select" | "Link" | "MouseWheelZoom" | "DoubleClickZoom" | "KeyboardZoom"
export type OlInteractionInstanceType = OlDrawInstanceType | OlDragBoxInstanceType | OlDragPanInstanceType |OlInteractionExtentInstanceType | OlModifyInstanceType | OlInteractionSelectInstanceType | OlInteractionLinkInstanceType | OlInteractionMouseWheelZoomInstanceType | OlInteractionDoubleClickZoomInstanceType | OlInteractionKeyboardZoomInstanceType
