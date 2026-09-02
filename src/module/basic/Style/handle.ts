import {
  type OMapFillStyleOptionsType,
  type OMapStrokeStyleOptionsType,
  type OMapCircleStyleOptionsType,
  type OMapIconStyleOptionsType,
  type OMapRegularShapeStyleOptionsType,
  type OlStyleLike,
  type OMapStyleLike,
  type OMapTextStyleOptionsType,
  type OlStyleInstanceType,
  isValidStyle,
  isValidArrayStyle,
  isValidFunctionStyle,
  type OMapStyleOptionsGeometryType
} from './type'
import { OlStyle, OlFeature, type OlGeometry } from '../../../source/index'
import Color from '../Color/index'
import Style from './index'
import type BaseFeature from '../../core/Feature/BasicFeature/index'
import {
  type OlFeatureLike,
  type OlFeatureInstanceType
} from '../../core/Feature/BasicFeature/type'
import {
  createBaseFeatureByOlFeature,
  createBaseFeatureByOlRenderFeature
} from '../../core/Feature/BasicFeature/handle'
import { isDefined, isFunction, isString } from '../../../utils/index'
import { handleGetColorValue } from '../Color/handle'
import Size from '../../basic/Size/index'

export function getOlGeometryStyle(geometry: OMapStyleOptionsGeometryType) {
  if (isString(geometry)) {
    return geometry as string
  }
  if (isFunction(geometry)) {
    return (feature: OlFeatureLike) => {
      const OMapFeature =
        feature instanceof OlFeature
          ? createBaseFeatureByOlFeature(feature)
          : createBaseFeatureByOlRenderFeature(feature)
      return isDefined(OMapFeature) ? geometry(OMapFeature).getGeometry() : undefined
    }
  }
}

export function getOlFillSingleStyle(options: OMapFillStyleOptionsType | undefined) {
  if (!isDefined(options)) {
    return undefined
  }
  const { color } = options as OMapFillStyleOptionsType
  if (isDefined(color)) {
    return new OlStyle.Fill({
      ...options,
      color: color instanceof Color ? color.getColor() : (color as string)
    })
  }
  return undefined
}

export function getOlStrokeSingleStyle(options: OMapStrokeStyleOptionsType | undefined) {
  if (!isDefined(options)) {
    return undefined
  }
  const { color } = options as OMapStrokeStyleOptionsType
  if (isDefined(color)) {
    return new OlStyle.Stroke({
      ...options,
      color: color instanceof Color ? color.getColor() : (color as string)
    })
  }
  return undefined
}

export function getOlCircleSingleStyle(options: OMapCircleStyleOptionsType | undefined) {
  if (!isDefined(options)) {
    return undefined
  }
  const { fill, stroke } = options as OMapCircleStyleOptionsType
  const resolvedStyle = new OlStyle.Circle({
    ...options,
    fill: undefined,
    stroke: undefined
  })
  if (isDefined(fill)) {
    resolvedStyle.setFill(
      new OlStyle.Fill({
        color: fill.color instanceof Color ? fill.color.getColor() : (fill.color as string)
      })
    )
  }
  if (isDefined(stroke)) {
    resolvedStyle.setStroke(
      new OlStyle.Stroke({
        color: stroke.color instanceof Color ? stroke.color.getColor() : (stroke.color as string)
      })
    )
  }
  return resolvedStyle
}

export function getOlIconSingleStyle(options: OMapIconStyleOptionsType | undefined) {
  if (!isDefined(options)) {
    return undefined
  }
  const resolvedStyle = new OlStyle.Icon({
    ...options,
    color: options.color
      ? options.color instanceof Color
        ? options.color.getColor()
        : (options.color as string)
      : undefined,
    offset: isDefined(options.offset) ? options.offset.getPixel() : [0, 0],
    size: isDefined(options.size) ? options.size.getSize() : undefined
  })
  return resolvedStyle
}

export function getOlRegularShapeSingleStyle(
  options: OMapRegularShapeStyleOptionsType | undefined
) {
  if (!isDefined(options)) {
    return undefined
  }
  const resolvedStyle = new OlStyle.RegularShape({
    ...options,
    fill: undefined,
    stroke: undefined
  })
  const { fill, stroke } = options
  if (isDefined(fill)) {
    resolvedStyle.setFill(
      new OlStyle.Fill({
        color: fill.color instanceof Color ? fill.color.getColor() : (fill.color as string)
      })
    )
  }
  if (isDefined(stroke)) {
    resolvedStyle.setStroke(
      new OlStyle.Stroke({
        color: stroke.color instanceof Color ? stroke.color.getColor() : (stroke.color as string)
      })
    )
  }
  return resolvedStyle
}

/**
 * 矢量图层的默认样式
 */
export const DEFAULT_STYLE = (
  feature: BaseFeature<OlGeometry.Geometry>,
  _resolution: number
): undefined | Style => {
  if (!isDefined(feature)) return undefined
  if (feature.getType() === 'Point') {
    return new Style({
      circle: {
        fill: {
          color: 'red'
        },
        radius: 10
      }
    })
  } else if (feature.getType() === 'LineString') {
    return new Style({
      stroke: {
        color: 'red',
        width: 5
      }
    })
  } else if (feature.getType() === 'Polygon' || feature.getType() === 'Circle') {
    return new Style({
      stroke: {
        color: 'red',
        width: 2
      },
      fill: {
        color: new Color({
          color: '#FFFFFF',
          opacity: 0.5
        })
      }
    })
  }
  return undefined
}

export function handleGetStyleValue(
  style?: OMapStyleLike,
  featureResolver?: (feature: OlFeatureLike) => BaseFeature<OlGeometry.Geometry> | undefined
): OlStyleLike | undefined {
  if (!isDefined(style)) {
    return undefined
  }
  if (isValidStyle(style)) {
    return style.getStyle()
  } else if (isValidArrayStyle(style)) {
    return style.map((item) => item.getStyle())
  } else if (isValidFunctionStyle(style)) {
    return (feature: OlFeatureLike, resolution: number) => {
      const featureValue = featureResolver
        ? featureResolver(feature)
        : createBaseFeatureByOlFeature(feature as OlFeatureInstanceType)
      if (!isDefined(featureValue)) return undefined
      const resolvedStyle = style(featureValue, resolution)
      if (isValidArrayStyle(resolvedStyle)) {
        return resolvedStyle.map((item) => item.getStyle())
      } else if (isValidStyle(resolvedStyle)) {
        return resolvedStyle.getStyle()
      }
      return undefined
    }
  }
}

/**
 * 将 OMap Style 数组转换为 OpenLayers Style 数组。
 * 用于只接受 `Style[]` 的 OpenLayers 选项（例如 KML 格式的 `defaultStyle`），
 * 避免复用 {@link handleGetStyleValue} 时返回值被放宽为 `OlStyleLike`。
 *
 * @param {Array<Style>} style OMap 样式数组
 * @returns {Array<OlStyleInstanceType> | undefined} OpenLayers 样式数组
 */
export function handleGetStyleArrayValue(
  style?: Array<Style>
): Array<OlStyleInstanceType> | undefined {
  if (!isDefined(style)) {
    return undefined
  }
  return style.map((item) => item.getStyle())
}

export function getOlTextSingleStyle(options: OMapTextStyleOptionsType | undefined) {
  if (!isDefined(options)) {
    return undefined
  }
  const resolvedStyle = new OlStyle.Text({
    ...options,
    fill: undefined,
    stroke: undefined,
    backgroundFill: undefined,
    backgroundStroke: undefined,
    scale: undefined
  })
  const { fill, scale, stroke, backgroundFill, backgroundStroke } =
    options as OMapTextStyleOptionsType
  if (isDefined(fill)) {
    resolvedStyle.setFill(
      new OlStyle.Fill({
        color: handleGetColorValue(fill.color)
      })
    )
  }
  if (isDefined(stroke)) {
    resolvedStyle.setStroke(
      new OlStyle.Stroke({
        ...stroke,
        color: handleGetColorValue(stroke.color)
      })
    )
  }
  if (isDefined(backgroundFill)) {
    resolvedStyle.setBackgroundFill(
      new OlStyle.Fill({
        color: handleGetColorValue(backgroundFill.color)
      })
    )
  }
  if (isDefined(backgroundStroke)) {
    resolvedStyle.setBackgroundStroke(
      new OlStyle.Stroke({
        ...backgroundStroke,
        color: handleGetColorValue(backgroundStroke.color)
      })
    )
  }
  if (isDefined(scale)) {
    resolvedStyle.setScale(scale instanceof Size ? scale.getSize() : scale)
  }
  return resolvedStyle
}
