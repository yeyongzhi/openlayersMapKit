import { OlSource, OlLayer, OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { isString } from '../../../utils/dataType'
import Lnglat from '../../basic/Lnglat/index'
import Pixel from '../../basic/Pixel/index'
import Extent from '../../basic/Extent/index'
import DragBox from './index'
import { OMapInteractionCommonEventTypes, OMapInteractionCommonParamsType } from '../Interaction/type'

export interface DragBoxEndEvent {
    /** 拖动框结束为止的坐标 */
    coordinate?: Lnglat;
    /** 拖动框结束为止的像素坐标 */
    pixel?: Pixel;
    /** 拖动框结束为止的范围 */
    extent?: Extent | null;
    target: DragBox;
}

export type OlDragBoxParamsType = ConstructorParameters<typeof OlInteraction.DragBox>[0]
type CustOlDragBoxParamsType = ManualOmit<OlDragBoxParamsType,
    'onBoxEnd'
>

export type DragBoxEndEventFunctionType = (e: DragBoxEndEvent) => void | null
export type OMapDragBoxParamsType = CustOlDragBoxParamsType & {
    onBoxEnd?: DragBoxEndEventFunctionType;
} & OMapInteractionCommonParamsType

export type OMapDragBoxType = OlInteraction.DragBox
export type OlDragBoxInstanceType = InstanceType<typeof OlInteraction.DragBox>

export const OMapInteractionDragBoxEventTypes = [
  ...OMapInteractionCommonEventTypes,
  'boxcancel',
  'boxdrag',
  'boxend',
  'boxstart',
]

export type OMapInteractionDragBoxEventType =
  (typeof OMapInteractionDragBoxEventTypes)[number];


export function isOMapInteractionDragBoxEventType(
  value: unknown,
): value is OMapInteractionDragBoxEventType {
  return (
    isString(value) && OMapInteractionDragBoxEventTypes.includes(value as OMapInteractionDragBoxEventType)
  );
}