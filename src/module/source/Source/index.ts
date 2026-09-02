import { isDefined, isString } from '../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../utils/message'
import type BaseEvent from 'ol/events/Event'
import Projection from '../../core/Projection/index'
import { type OMapSourceAttributionLike, type OMapSourceState, type OMapSourceType } from './type'
import type { PropertiesType } from '../../../utils/type'
import type { Disposable } from '../../util/Disposable/type'
import { assertNotDisposed } from '../../util/Disposable/lifecycle'

const PACKAGE_NAME = 'Source'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * OMap Source 基类
 *
 * @description 参考：https://openlayers.org/en/latest/apidoc/module-ol_source_Source-Source.html
 */

/**
 * 数据源基类（抽象类）。
 *
 * @template T - 原生 OpenLayers Source 类型。
 * @template P - 数据源属性字典。默认 {@link PropertiesType}；
 *   传入更具体的结构后，`getProperties()` 会按该结构推导。
 */
export default abstract class Source<
  T extends OMapSourceType,
  P extends PropertiesType = PropertiesType
> implements Disposable {
  protected _source: T
  private disposed = false

  constructor(source: T) {
    if (!isDefined(source)) {
      error_(createMessage('constructor', 'source不能为空'))
    }
    this._source = source
  }

  /**
   * 获取原生 OpenLayers Source 实例
   */
  getSource(): T {
    this.assertActive('getSource')
    return this._source
  }

  /**
   * 子类初始化具体 Source 时使用
   */
  protected setSource(source: T) {
    this.assertActive('setSource')
    if (!isDefined(source)) {
      error_(createMessage('setSource', 'source不能为空'))
    }
    this._source = source
  }

  changed() {
    this.assertActive('changed')
    this._source.changed()
  }

  dispatchEvent(event: BaseEvent | string): boolean | undefined {
    this.assertActive('dispatchEvent')
    return this._source.dispatchEvent(event)
  }

  get<Value = unknown>(key: string): Value | undefined {
    if (!isString(key)) {
      warn_(createMessage('get', 'key必须是字符串'))
      return undefined
    }
    return this._source.get(key) as Value
  }

  set(key: string, value: unknown, silent?: boolean) {
    this.assertActive('set')
    if (!isString(key)) {
      warn_(createMessage('set', 'key必须是字符串'))
      return
    }
    this._source.set(key, value, silent)
  }

  unset(key: string, silent?: boolean) {
    this.assertActive('unset')
    if (!isString(key)) {
      warn_(createMessage('unset', 'key必须是字符串'))
      return
    }
    this._source.unset(key, silent)
  }

  getAttributions() {
    return this._source.getAttributions()
  }

  getAttributionsCollapsible() {
    return this._source.getAttributionsCollapsible()
  }

  getKeys() {
    return this._source.getKeys()
  }

  getProjection(): Projection | undefined {
    const projection = this._source.getProjection()
    return projection ? new Projection(projection.getCode()) : undefined
  }

  getRevision() {
    return this._source.getRevision()
  }

  getState() {
    return this._source.getState()
  }

  getWrapX() {
    return this._source.getWrapX()
  }

  getInterpolate() {
    return this._source.getInterpolate()
  }

  getResolutions(projection?: Projection) {
    return this._source.getResolutions(projection?.getProjection())
  }

  getView() {
    return this._source.getView()
  }

  /**
   * 获取数据源属性字典。
   *
   * @returns {P} 属性字典，类型由泛型 `P` 决定
   */
  getProperties(): P {
    return { ...(this._source.getProperties() as P) }
  }

  refresh() {
    this.assertActive('refresh')
    this._source.refresh()
  }

  setAttributions(attributions: OMapSourceAttributionLike | undefined) {
    this.assertActive('setAttributions')
    this._source.setAttributions(attributions)
  }

  setState(state: OMapSourceState) {
    this.assertActive('setState')
    this._source.setState(state)
  }

  /**
   * 合并写入数据源属性。OpenLayers 的 `setProperties` 为合并语义，
   * 因此入参按 `Partial<P>` 处理，允许只更新部分字段。
   *
   * @param {Partial<P>} properties 待合并的属性
   * @param {boolean} silent 是否静默更新
   */
  setProperties(properties: Partial<P>, silent?: boolean) {
    this.assertActive('setProperties')
    this._source.setProperties(properties as PropertiesType, silent)
  }

  /** 永久释放 Source 监听与原生资源。重复调用是安全的。 */
  dispose(): void {
    if (this.disposed) return
    this.disposed = true
    this._source.dispose()
  }

  isDisposed(): boolean {
    return this.disposed
  }

  protected assertActive(operationName: string): void {
    assertNotDisposed(this.disposed, this.constructor.name || PACKAGE_NAME, operationName)
  }

  // on(type: string | string[], listener: ListenerFunction): EventsKey | EventsKey[] {
  //     if ((!isString(type) && !Array.isArray(type)) || !isDefined(listener)) {
  //         error_(createMessage('on', 'type或listener参数格式有误'));
  //     }
  //     return this._source.on(type, listener);
  // }

  // once(type: string | string[], listener: ListenerFunction): EventsKey | EventsKey[] {
  //     if ((!isString(type) && !Array.isArray(type)) || !isDefined(listener)) {
  //         error_(createMessage('once', 'type或listener参数格式有误'));
  //     }
  //     return this._source.once(type, listener);
  // }

  // un(type: string | string[], listener: ListenerFunction) {
  //     if ((!isString(type) && !Array.isArray(type)) || !isDefined(listener)) {
  //         error_(createMessage('un', 'type或listener参数格式有误'));
  //     }
  //     this._source.un(type, listener);
  // }

  // unByKey(key: EventsKey | EventsKey[]) {
  //     if (Array.isArray(key)) {
  //         key.forEach(item => OlEvent.unlistenByKey(item))
  //     } else {
  //         OlEvent.unlistenByKey(key)
  //     }
  // }
}
