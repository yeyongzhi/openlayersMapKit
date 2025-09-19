import{ OlInteraction } from '../../../source/index'
import type { OlDrawInstanceType } from '../Draw/type'
import type { OlDragBoxInstanceType } from '../DragBox/type'
import type { OlDragPanInstanceType } from '../DragPan/type'
import type { OlInteractionExtentInstanceType } from '../Extent/type'
import type { OlModifyInstanceType } from '../Modify/type'
import { OlInteractionSelectInstanceType } from '../Select/type'


export type OMapInteractionType = 'Draw' | 'DragBox' | 'DragPan' | 'Extent' | "Modify" | "Measure" | "Select"
export type OlInteractionInstanceType = OlDrawInstanceType | OlDragBoxInstanceType | OlDragPanInstanceType |OlInteractionExtentInstanceType | OlModifyInstanceType | OlInteractionSelectInstanceType    
