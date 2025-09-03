import { OlSource, OlLayer, OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import Lnglat from '../../basic/Lnglat/index'
import Pixel from '../../basic/Pixel/index'
import Extent from '../../basic/Extent/index'

interface DragBoxEndEvent {
    /** 拖动框结束为止的坐标 */
    coordinate: Lnglat;
    /** 拖动框结束为止的像素坐标 */
    pixel: Pixel;
    /** 拖动框结束为止的范围 */
    extent?: Extent;
}

export type OlDragBoxParamsType = ConstructorParameters<typeof OlInteraction.DragBox>[0]
type CustOlDragBoxParamsType = ManualOmit<OlDragBoxParamsType,
    'onBoxEnd'
>
export type OMapDragBoxParamsType = CustOlDragBoxParamsType & {
    onBoxEnd?: (e: DragBoxEndEvent) => void;
}
export type OlDragBoxInstanceType = InstanceType<typeof OlInteraction.DragBox>

export type OMapDragBoxEventType = 'boxcancel' | 'boxdrag' | 'boxend' | 'boxstart'