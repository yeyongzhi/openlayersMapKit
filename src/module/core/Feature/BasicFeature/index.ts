import { OlFeature } from '../../../../source/index'
import { isDefined, isNumber, isObject, isString } from '../../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../../utils/message'
import type BaseEvent from 'ol/events/Event'
import type {
  OlFeatureInstanceType,
  OMapBasicFeatureType,
  OlGeometryType,
  OMapBasicFeatureCoordinatesType
} from './type'
import Extent from '../../../basic/Extent/index'
import { type OMapStyleLike } from '../../../basic/Style/type'
import { handleGetStyleValue } from '../../../basic/Style/handle'
import type { PropertiesType } from '../../../../utils/type'
import { registerFeature } from './registry'

const PACKAGE_NAME = 'BasicFeature'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * @class BasicFeature
 * @classdesc 要素基类（抽象类）
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/14
 * @updateDate 2025/10/6
 */

/**
 * 要素基类（抽象类）。
 *
 * @typeParam T - 原生 OpenLayers Geometry 类型。
 * @typeParam P - 业务属性字典。默认 {@link PropertiesType}；
 *   使用者可传入更具体的结构以获得 `getProperties()` 的类型推导，
 *   例如 `Point<{ name: string; score: number }>`。
 */
export default abstract class BasicFeature<
  T extends OlGeometryType,
  P extends PropertiesType = PropertiesType
> {
  id: number | string | null = null
  type: OMapBasicFeatureType
  // 非空断言操作符 !（推荐用于抽象类）
  protected _feature!: OlFeatureInstanceType
  protected _geometry!: T
  protected style: OMapStyleLike | undefined

  /**
   * 构造要素 wrapper。
   *
   * ⚠️ **内部结构，勿直接调用**。`coordinatesOrFeature` 接收原生 OpenLayers Feature
   * 的分支仅用于 resolver（`createBaseFeatureByOlFeature` / `createBaseFeatureByOlRenderFeature`）
   * 内部复用，外部代码请统一通过 resolver 获取 wrapper，以保证「同一原生要素 ↔ 同一 wrapper」
   * 的身份一致性（见 `registry.ts`）。
   *
   * @internal
   */
  constructor(
    type: OMapBasicFeatureType,
    coordinatesOrFeature: OMapBasicFeatureCoordinatesType | OlFeatureInstanceType,
    radius?: number
  ) {
    this.type = type
    if (coordinatesOrFeature instanceof OlFeature) {
      this._initByFeature(coordinatesOrFeature as OlFeatureInstanceType)
    } else {
      this._init(coordinatesOrFeature as OMapBasicFeatureCoordinatesType, radius)
    }
    const featureId = this._feature.getId()
    if (isDefined(featureId)) {
      this.id = featureId
    }
    registerFeature(this._feature, this)
  }

  protected abstract _init(coordinates: OMapBasicFeatureCoordinatesType, radius?: number): void

  /**
   * 由原生 OpenLayers Feature 初始化 wrapper。
   * 默认实现对所有 Geometry 一致，统一在基类维护，子类无需重复。
   * 配合 registerFeature 的 WeakMap 注册，保证同一原生 Feature 复用同一 wrapper。
   */
  protected _initByFeature(feature: OlFeatureInstanceType): void {
    this._feature = feature
    this._geometry = feature.getGeometry() as T
  }

  /**
   * 统一创建原生 OpenLayers Feature，消除各 Geometry 子类重复的 `new OlFeature`。
   */
  protected _createFeature(geometry: T): OlFeatureInstanceType {
    return new OlFeature({ geometry })
  }

  /**
   * 获取原生的Openlayers Feature对象
   * @returns {OlFeatureInstanceType} 原生的Openlayers Feature对象
   */
  getFeature(): OlFeatureInstanceType {
    return this._feature
  }

  /**
   * 获取坐标
   * @returns {OMapBasicFeatureCoordinatesType} 坐标
   */
  abstract getCoordinates(): OMapBasicFeatureCoordinatesType | void

  /**
   * 设置坐标
   * @param {OMapBasicFeatureCoordinatesType} coordinates 坐标
   */
  abstract setCoordinates(coordinates: OMapBasicFeatureCoordinatesType): void

  setId(id: number | string) {
    if (!isDefined(id)) {
      error_(createMessage('setId', '参数id不能为空'))
    }
    if (!isNumber(id) && !isString(id)) {
      error_(createMessage('setId', '参数id格式有误'))
    }
    this.id = id
    this._feature.setId(id)
  }

  getId(): number | string | null {
    const featureId = this._feature.getId()
    return isDefined(featureId) ? featureId : this.id
  }

  getType() {
    return this.type
  }

  changed() {
    this._feature.changed()
  }

  dispatchEvent(event: BaseEvent | string): boolean | undefined {
    return this._feature.dispatchEvent(event)
  }

  clone(): this {
    const FeatureCtor = this.constructor as new (feature: OlFeatureInstanceType) => this
    const clonedFeature = this._feature.clone() as OlFeatureInstanceType
    const cloned = new FeatureCtor(clonedFeature)
    if (isDefined(this.id)) {
      cloned.setId(this.id)
    }
    if (isDefined(this.style)) {
      cloned.setStyle(this.style)
    }
    return cloned
  }

  get<Value = unknown>(key: string): Value {
    if (!isDefined(key)) {
      error_(createMessage('get', commonMessage.paramsNotDefined('key')))
    }
    if (!isString(key)) {
      error_(createMessage('get', commonMessage.paramsInvaildFormat('key', 'string')))
    }
    return this._feature.get(key) as Value
  }

  /**
   * 获取原生的Openlayers Geometry对象
   * @returns {T} 原生的Openlayers Geometry对象
   */
  getGeometry(): T {
    return this._geometry
  }

  getGeometryName(): string {
    return this._feature.getGeometryName()
  }

  getKeys(): string[] {
    return this._feature.getKeys()
  }

  getStyle(): OMapStyleLike | undefined {
    return this.style
  }

  setStyle(style?: OMapStyleLike) {
    let _style = handleGetStyleValue(style)
    this._feature.setStyle(_style)
    this.style = style
  }

  /**
   * 获取要素的范围
   * @returns {Extent | undefined} 要素的范围
   */
  getExtent(): Extent {
    let extent = this._geometry.getExtent()
    return new Extent(extent)
  }

  /**
   * 获取要素属性字典。
   * @returns {P} 属性字典，类型由泛型 `P` 决定
   */
  getProperties(): P {
    return this._feature.getProperties() as P
  }

  /**
   * 合并写入要素属性。OpenLayers 的 `setProperties` 为合并语义，
   * 因此入参按 `Partial<P>` 处理，允许只更新部分字段。
   * @param {Partial<P>} properties 待合并的属性
   * @returns {false | void} 未传入属性时返回 false
   */
  setProperties(properties?: Partial<P>): false | void {
    if (!isDefined(properties)) {
      return false
    }
    if (!isObject(properties)) {
      error_(
        createMessage('setProperties', commonMessage.paramsInvaildFormat('properties', 'object'))
      )
    }
    this._feature.setProperties(properties as PropertiesType)
  }
}
