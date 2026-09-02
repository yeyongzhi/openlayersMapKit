import {
  isArray,
  isDefined,
  isEmptyArray,
  isFunction,
  isString,
  isNumber,
  isCoordinatesType,
  isExtentType,
  warn_,
  getPackageMessage
} from '../../../utils/index'
import {
  type OMapVectorLayerOptionsFinalType,
  type OMapVectorSourceOptionsFinalType,
  type OlVectorSourceInstanceType,
  type OMapVectorLayerType
} from './type'
import type { OlFeatureLike } from '../../core/Feature/BasicFeature/type'
import type { OlStyleInstanceType, OMapStyleLike } from '../../basic/Style/type'
import { OlLayer, OlFeature, type OlGeometry } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import type { BaseLayerPropertiesType } from '../BaseLayer/type'
import type BaseFeature from '../../core/Feature/BasicFeature/index'
import VectorSource from '../../source/VectorSource/index'
import Draw from '../../interaction/Draw/index'
import { DrawEventType } from '../../interaction/Draw/type'
import { handleInteractionDrawEvent } from '../../interaction/Draw/handle'
import Measure from '../../interaction/Measure/index'
import Extent from '../../basic/Extent/index'
import type { OMapExtentType } from '../../basic/Extent/type'
import LngLat from '../../basic/LngLat/index'
import type { OMapCoordinateType } from '../../basic/LngLat/type'
import Style from '../../basic/Style/index'
import type Projection from '../../core/Projection/index'

const PACKAGE_NAME = 'VectorLayer'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 矢量图层类
 *
 */

export default class VectorLayer<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> extends BaseLayer<OMapVectorLayerType, P> {
  protected vectorSource!: VectorSource

  style: OMapStyleLike | undefined

  constructor(options: OMapVectorLayerOptionsFinalType<P> = {}) {
    super('Vector', options)
    const sourceOptions: OMapVectorSourceOptionsFinalType = isDefined(options.source)
      ? options.source
      : {}
    this.vectorSource = new VectorSource(sourceOptions)
    this._sourceWrapper = this.vectorSource
    this.ownsSourceWrapper = true
    this._layer = new OlLayer.Vector({
      source: this.vectorSource.getSource()
    })
    this.initStyle(options.style)
    this.initLayerEvent()
    this.initVectorLyaerEvent()
  }

  getVectorSource(): VectorSource {
    return this.vectorSource
  }

  /**
   * 初始化矢量图层事件
   */
  protected initVectorLyaerEvent() {
    ;(this._layer.getSource() as OlVectorSourceInstanceType).on('addfeature', (e) => {
      const { feature } = e
      if (isDefined(feature)) {
        // 根据原生的feature生成内部的feature
        if (this.target instanceof Draw || this.target instanceof Measure) {
          const basicFeature = this.syncFeatureFromOlFeature(
            feature as OlFeature<OlGeometry.Geometry>
          )
          if (!basicFeature) {
            warn_(createMessage('syncFeatureFromOlFeature', '根据olFeature同步BasicFeature出错'))
          }
          // 绘制结束事件 需要在 addfeature 事件之后 触发，才能获取到完整的 feature
          if (this.target instanceof Draw && this.target.getActive()) {
            this.target.events.emit(
              DrawEventType.drawEnd,
              handleInteractionDrawEvent(this.target, DrawEventType.drawEnd, { feature })
            )
          }
        }
      }
    })
  }

  /**
   * 初始化样式
   *
   * @param {OMapStyleLike | undefined} style 样式
   */
  protected initStyle(style: OMapStyleLike | undefined): void {
    let resolvedStyle:
      | OlStyleInstanceType
      | Array<OlStyleInstanceType>
      | ((
          feature: OlFeatureLike,
          resolution: number
        ) => OlStyleInstanceType | Array<OlStyleInstanceType> | undefined)
      | undefined = undefined
    if (isDefined(style)) {
      if (style instanceof Style) {
        resolvedStyle = style.getStyle()
      } else if (isArray(style) && (style as Style[]).every((s) => s instanceof Style)) {
        resolvedStyle = (style as Style[]).map((s) => s.getStyle() as OlStyleInstanceType)
      } else if (isFunction(style)) {
        resolvedStyle = (feature: OlFeatureLike, resolution: number) => {
          const omapFeature =
            feature instanceof OlFeature
              ? this.syncFeatureFromOlFeature(feature as OlFeature<OlGeometry.Geometry>)
              : undefined
          const styleFn = style as (
            feature: BaseFeature<OlGeometry.Geometry> | null,
            resolution: number
          ) => Style | Array<Style> | undefined
          const styleFnResult = styleFn(omapFeature || null, resolution)
          if (!styleFnResult) return undefined
          return Array.isArray(styleFnResult)
            ? styleFnResult.map((s) => s.getStyle() as OlStyleInstanceType)
            : styleFnResult.getStyle()
        }
      } else {
        warn_(createMessage('initStyle', 'style格式有误'))
      }
    }
    if (resolvedStyle) {
      this._layer.setStyle(resolvedStyle)
      this.style = style // 到这里才更新style属性
    }
  }

  getFeatures(): BaseFeature<OlGeometry.Geometry>[] {
    return this.vectorSource.getFeatures() as BaseFeature<OlGeometry.Geometry>[]
  }

  getFeatureById(id: number | string): BaseFeature<OlGeometry.Geometry> | undefined {
    if (!isDefined(id)) {
      warn_(createMessage('getFeatureById', '参数id不能为空'))
      return
    }
    if (!isNumber(id) && !isString(id)) {
      warn_(createMessage('getFeatureById', '参数id格式有误'))
      return
    }
    return this.vectorSource.getFeatureById(id) as BaseFeature<OlGeometry.Geometry> | undefined
  }

  getFeatureByOlFeature(
    feature: OlFeature<OlGeometry.Geometry>
  ): BaseFeature<OlGeometry.Geometry> | undefined {
    if (!isDefined(feature)) {
      warn_(createMessage('getFeatureByOlFeature', 'feature参数不能为空'))
      return
    }
    return this.syncFeatureFromOlFeature(feature)
  }

  getFeaturesInExtent(
    extent: OMapExtentType,
    projection: Projection
  ): BaseFeature<OlGeometry.Geometry>[] {
    if (!isDefined(extent)) {
      warn_(createMessage('getFeaturesInExtent', 'extent参数不能为空'))
      return []
    }
    if (!(extent instanceof Extent) && !isExtentType(extent)) {
      warn_(createMessage('getFeaturesInExtent', 'extent参数格式有误'))
      return []
    }
    return this.vectorSource.getFeaturesInExtent(
      extent,
      projection
    ) as BaseFeature<OlGeometry.Geometry>[]
  }

  getFeaturesAtCoordinate(coordinates: OMapCoordinateType): BaseFeature<OlGeometry.Geometry>[] {
    if (!isDefined(coordinates)) {
      warn_(createMessage('getFeaturesAtCoordinate', 'coordinates参数不能为空'))
      return []
    }
    if (!(coordinates instanceof LngLat) && !isCoordinatesType(coordinates)) {
      warn_(createMessage('getFeaturesAtCoordinate', 'coordinates参数格式有误'))
      return []
    }
    return this.vectorSource.getFeaturesAtCoordinate(
      coordinates
    ) as BaseFeature<OlGeometry.Geometry>[]
  }

  addFeature(feature: BaseFeature<OlGeometry.Geometry>): void {
    if (!isDefined(feature)) {
      warn_(createMessage('addFeature', '参数不能为空'))
      return
    }
    if (this._layer.getSource()) {
      if (!this.vectorSource.hasFeature(feature)) {
        this.vectorSource.addFeature(feature)
      }
    }
  }

  addFeatures(features: BaseFeature<OlGeometry.Geometry>[]): void {
    if (!isDefined(features) || !isArray(features)) {
      warn_(createMessage('addFeatures', '参数格式有误不能为空'))
      return
    }
    if (!isEmptyArray(features)) {
      features.forEach((f) => {
        this.addFeature(f)
      })
    }
  }

  removeFeature(feature: BaseFeature<OlGeometry.Geometry>): void {
    if (!isDefined(feature)) {
      warn_(createMessage('removeFeature', '参数不能为空'))
      return
    }
    if (this._layer.getSource()) {
      this.vectorSource.removeFeature(feature)
    }
  }

  removeFeatures(features: BaseFeature<OlGeometry.Geometry>[]): void {
    if (!isDefined(features) || !isArray(features)) {
      warn_(createMessage('removeFeatures', '参数格式有误不能为空'))
      return
    }
    if (!isEmptyArray(features)) {
      features.forEach((f) => {
        this.removeFeature(f)
      })
    }
  }

  clear() {
    if (!this._layer.getSource()) {
      return
    }
    this.vectorSource.clear()
  }

  forEachFeature(
    callback: (feature: BaseFeature<OlGeometry.Geometry>, index: number) => void
  ): void {
    if (!isDefined(callback) || !isFunction(callback)) {
      warn_(createMessage('forEachFeature', '参数格式有误'))
      return
    }
    this.getFeatures().forEach((f, i) => {
      callback(f, i)
    })
  }

  /**
   * 遍历指定范围的特征
   *
   * @param {Extent} extent 范围
   * @param {Function} callback 回调函数
   * @returns {void}
   */
  forEachFeatureInExtent(
    extent: Extent,
    callback: (feature: BaseFeature<OlGeometry.Geometry>, index: number) => void
  ): void {
    if (!isDefined(callback)) {
      warn_(createMessage('forEachFeatureInExtent', 'callback参数不能为空'))
      return
    }
    let index = 0
    this.vectorSource.forEachFeatureInExtent(extent, (feature) => {
      callback(feature as BaseFeature<OlGeometry.Geometry>, index++)
    })
  }

  /**
   * 遍历与指定范围相交的特征
   *
   * @param {Extent} extent 范围
   * @param {Function} callback 回调函数
   * @returns {void}
   */
  forEachFeatureIntersectingExtent(
    extent: Extent,
    callback: (feature: BaseFeature<OlGeometry.Geometry>, index: number) => void
  ) {
    if (!isDefined(callback)) {
      warn_(createMessage('forEachFeatureIntersectingExtent', 'callback参数不能为空'))
      return
    }
    let index = 0
    this.vectorSource.forEachFeatureIntersectingExtent(extent, (feature) => {
      callback(feature as BaseFeature<OlGeometry.Geometry>, index++)
    })
  }

  getClosestFeatureToCoordinate(
    coordinates: OMapCoordinateType,
    filter?: (feature: BaseFeature<OlGeometry.Geometry>) => boolean
  ): BaseFeature<OlGeometry.Geometry> | undefined {
    if (!isDefined(coordinates)) {
      warn_(createMessage('getClosestFeatureToCoordinate', 'coordinates参数不能为空'))
      return
    }
    if (!(coordinates instanceof LngLat) && !isCoordinatesType(coordinates)) {
      warn_(createMessage('getClosestFeatureToCoordinate', 'coordinates参数格式有误'))
      return
    }
    return this.vectorSource.getClosestFeatureToCoordinate(coordinates, filter) as
      BaseFeature<OlGeometry.Geometry> | undefined
  }

  getSourceExtent(): Extent {
    return this.vectorSource.getExtent()
  }

  // 样式管理
  /**
   * 获取样式
   *
   * @returns {OMapStyleLike | undefined} style 样式
   */
  getStyle(): OMapStyleLike | undefined {
    return this.style
  }

  /**
   * 设置图层样式
   *
   * @param {OMapStyleLike} style 新样式
   */
  setStyle(style: OMapStyleLike): void {
    if (!isDefined(style)) {
      warn_(createMessage('setStyle', 'style参数不能为空'))
      return
    }
    this.initStyle(style)
  }

  /**
   * 设置去重叠功能
   *
   * @param declutter
   * @returns
   */
  setDeclutter(declutter: boolean | string | number): void {
    this._layer.setDeclutter(declutter)
  }

  protected syncFeatureFromOlFeature(
    feature: OlFeature<OlGeometry.Geometry>
  ): BaseFeature<OlGeometry.Geometry> | undefined {
    return this.vectorSource.getFeatureByOlFeature(feature) as
      BaseFeature<OlGeometry.Geometry> | undefined
  }
}
