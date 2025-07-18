import Style from './index'
import { Color } from '../../../index'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import { OlStyle } from '../../../source/index'
import type { ManualOmit } from '../../../utils/index'

export type OMapStyleFunction = (feature: BaseFeature, resolution: number) => Style | Array<Style> | undefined

export type OMapStyleLike = Style | Array<Style> | OMapStyleFunction

export type OlStyleInstanceType = InstanceType<typeof OlStyle.Style>

export type OMapStyleOptionsType = {
    geometry?: any;
    fill: OMapFillStyleOptionsType,
    image: {},
    text: {},
    stroke: OMapStrokeStyleOptionsType;
    zIndex?: number;
    hitDetectionRenderer?: any;
    renderer?: any;
}

export type OMapStyleType = 'fill' | 'image' | 'text' | 'stroke'


/** Fill */
export type OMapFillStyleOptionsType = {
    color: Color | string;
}
export type OlFillStyleInstanceType = InstanceType<typeof OlStyle.Fill>

/** Stroke */
type OlStrokeStyleOptionsType = ConstructorParameters<typeof OlStyle.Stroke>[0]
type CustOlStrokeStyleOptionsType = ManualOmit<OlStrokeStyleOptionsType, 'color'>;
export type OMapStrokeStyleOptionsType = CustOlStrokeStyleOptionsType & {
    color?: Color | string;
}
export const OMapStrokeStyleDefaultOptions: OMapStrokeStyleOptionsType = {
    lineCap: 'round',
    lineJoin: 'round',
    lineDashOffset: 0,
    miterLimit: 10
}
export type OlStrokeStyleInstanceType = InstanceType<typeof OlStyle.Stroke>