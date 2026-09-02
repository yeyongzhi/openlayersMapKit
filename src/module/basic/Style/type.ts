import Style from './index'
import type Color from '../Color/index'
import type Pixel from '../Pixel/index'
import type Size from '../Size/index'
import type BaseFeature from '../../core/Feature/BasicFeature/index'
import type { OlFeatureLike } from '../../core/Feature/BasicFeature/type'
import { type OlGeometry, type OlStyle } from '../../../source/index'
import { isFunction, type ManualOmit } from '../../../utils/index'
import type { RenderFunction } from 'ol/style/Style'

export type OMapStyleOptionsGeometryType =
  string | ((feature: BaseFeature<OlGeometry.Geometry>) => BaseFeature<OlGeometry.Geometry>)

/**
 * 判断是否为有效单个Style样式
 *
 * @returns {boolean} 是否为有效样式
 */

export function isValidStyle(value: unknown): value is Style {
  return value instanceof Style
}

/**
 * 判断是否为有效Style数组样式
 *
 * @returns {boolean} 是否为有效样式
 */
export function isValidArrayStyle(value: unknown): value is Array<Style> {
  return Array.isArray(value) && value.every((item) => isValidStyle(item))
}

/**
 * 判断是否为有效Style数组样式
 *
 * @returns {boolean} 是否为有效样式
 */
export function isValidFunctionStyle(value: unknown): value is OMapStyleFunction {
  return isFunction(value)
}

export type OlStyleLike =
  | OlStyleInstanceType
  | Array<OlStyleInstanceType>
  | ((
      feature: OlFeatureLike,
      resolution: number
    ) => OlStyleInstanceType | Array<OlStyleInstanceType> | undefined)

export type OMapStyleFunction = (
  feature: BaseFeature<OlGeometry.Geometry>,
  resolution: number
) => Style | Array<Style> | undefined
export type OMapStyleLike = Style | Array<Style> | OMapStyleFunction | undefined

export type OlStyleInstanceType = InstanceType<typeof OlStyle.Style>

export type OMapStyleOptionsType = {
  geometry?: OMapStyleOptionsGeometryType
  fill?: OMapFillStyleOptionsType
  // image: OMapImageStyleOptionsType, // image实际不太使用
  circle?: OMapCircleStyleOptionsType
  icon?: OMapIconStyleOptionsType
  regularShape?: OMapRegularShapeStyleOptionsType
  text?: OMapTextStyleOptionsType
  stroke?: OMapStrokeStyleOptionsType
  zIndex?: number
  hitDetectionRenderer?: RenderFunction
  renderer?: RenderFunction
}

export type OMapStyleType = 'fill' | 'image' | 'text' | 'stroke'

/** Fill */
export type OMapFillStyleOptionsType = {
  color?: Color | string
}
export type OlFillStyleInstanceType = InstanceType<typeof OlStyle.Fill>

/** Stroke */
type OlStrokeStyleOptionsType = ConstructorParameters<typeof OlStyle.Stroke>[0]
type CustOlStrokeStyleOptionsType = ManualOmit<OlStrokeStyleOptionsType, 'color'>
export type OMapStrokeStyleOptionsType = CustOlStrokeStyleOptionsType & {
  color?: Color | string
}
export const OMapStrokeStyleDefaultOptions: OMapStrokeStyleOptionsType = {
  lineCap: 'round',
  lineJoin: 'round',
  lineDashOffset: 0,
  miterLimit: 10
}
export type OlStrokeStyleInstanceType = InstanceType<typeof OlStyle.Stroke>

/** Image类型
 * 实际上Image类型不太使用，需要用子类Circle、Icon或者RegularShape
 */
type OlImageStyleOptionsType = ConstructorParameters<typeof OlStyle.Image>[0]
type CustOlImageStyleOptionsType = ManualOmit<OlImageStyleOptionsType, 'scale'>
export type OMapImageStyleOptionsType = CustOlImageStyleOptionsType & {
  scale: number | Size
}

/** Circle类型 */
type OlCircleStyleOptionsType = ConstructorParameters<typeof OlStyle.Circle>[0]
type CustOlCircleStyleOptionsType = ManualOmit<
  OlCircleStyleOptionsType,
  keyof OlImageStyleOptionsType | 'fill' | 'stroke'
>
export type OMapCircleStyleOptionsType = CustOlCircleStyleOptionsType & {
  fill?: OMapFillStyleOptionsType
  stroke?: OMapStrokeStyleOptionsType
}

/** Icon类型 */
type OlIconStyleOptionsType = ConstructorParameters<typeof OlStyle.Icon>[0]
type CustOlIconStyleOptionsType = ManualOmit<
  OlIconStyleOptionsType,
  keyof OlImageStyleOptionsType | 'color' | 'offset' | 'size'
>
export type OMapIconStyleOptionsType = CustOlIconStyleOptionsType & {
  color?: Color | string
  offset?: Pixel
  size?: Size
}

/** RegularShape类型 */
type OlRegularShapeStyleOptionsType = ConstructorParameters<typeof OlStyle.RegularShape>[0]
type CustOlRegularShapeStyleOptionsType = ManualOmit<
  OlRegularShapeStyleOptionsType,
  keyof OlImageStyleOptionsType | 'fill' | 'stroke'
>
export type OMapRegularShapeStyleOptionsType = CustOlRegularShapeStyleOptionsType & {
  fill?: OMapFillStyleOptionsType
  stroke?: OMapStrokeStyleOptionsType
}

/** Text类型 */
type OlTextStyleOptionsType = ConstructorParameters<typeof OlStyle.Text>[0]
type CustOlTextStyleOptionsType = ManualOmit<
  OlTextStyleOptionsType,
  'scale' | 'fill' | 'stroke' | 'backgroundFill' | 'backgroundStroke'
>
export type OMapTextStyleOptionsType = CustOlTextStyleOptionsType & {
  scale?: number | Size
  fill?: OMapFillStyleOptionsType
  stroke?: OMapStrokeStyleOptionsType
  backgroundFill?: OMapFillStyleOptionsType
  backgroundStroke?: OMapStrokeStyleOptionsType
}
