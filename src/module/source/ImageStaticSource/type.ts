import { type OlSource } from '../../../source/index'
import Extent from '../../basic/Extent/index'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetSourceParams, type OMapSourceProjectionType } from '../Source/type'
import type { OMapExtentType } from '../../basic/Extent/type'
import type { Options as OlImageStaticSourceOptions } from 'ol/source/ImageStatic'

/** 原生 OpenLayers 静态图片数据源实例类型。 @internal */
export type OMapImageStaticSourceType = OlSource.ImageStatic
export type OlImageStaticSourceInstanceType = InstanceType<typeof OlSource.ImageStatic>

/**
 * 静态图片数据源构造参数。
 *
 * 与原生 {@link OlImageStaticSourceOptions} 的差别在于：`imageExtent` 接受 OMap 的
 * {@link OMapExtentType}（`Extent` 实例或 `[minX, minY, maxX, maxY]` 数组），
 * `projection` 接受 OMap 的投影类型，转换在构造时完成。
 */
export type OMapImageStaticSourceParamsType = Omit<
  OlImageStaticSourceOptions,
  'projection' | 'imageExtent'
> & {
  /** 图片所覆盖的地理范围。 */
  imageExtent: OMapExtentType
  projection?: OMapSourceProjectionType
}

/** 转换后的原生构造参数（内部使用）。 */
export type OlImageStaticSourceParamsType = OlImageStaticSourceOptions

/** @internal */
export const DEFAULT_IMAGE_STATIC_SOURCE_PARAMS: OMapImageStaticSourceParamsType = {
  interpolate: true,
  imageExtent: new Extent(0, 0, 0, 0),
  url: ''
}

/**
 * 把 OMap 风格的静态图片参数转换为 OpenLayers 原生参数。
 *
 * @param params OMap 静态图片数据源参数
 * @returns 原生构造参数
 * @internal
 */
export function handleGetImageStaticSourceParams(
  params: OMapImageStaticSourceParamsType
): OlImageStaticSourceParamsType {
  return {
    ...handleGetSourceParams({
      attributions: params.attributions,
      interpolate: params.interpolate,
      projection: params.projection
    }),
    imageExtent: handleGetExtentValue(params.imageExtent),
    crossOrigin: params.crossOrigin,
    imageLoadFunction: params.imageLoadFunction,
    url: params.url
  }
}
