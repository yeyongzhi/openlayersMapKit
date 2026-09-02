import { isDefined, isString, isObject } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import type { PropertiesType } from '../../../utils/type'
import OlPackage, { OlSphere, type OlGeometry } from '../../../source/index'
import LngLat from '../../basic/LngLat/index'
import { type OMapCoordinateType, isValidCoordinate } from '../../basic/LngLat/type'
import { handleGetLngLatValue } from '../../basic/LngLat/handle'
import Extent from '../../basic/Extent/index'
import { type OMapExtentType, isValidExtent } from '../../basic/Extent/type'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import Size from '../../basic/Size/index'
import { type OlSizeType, type OMapSizeType } from '../../basic/Size/type'
import { handleGetSizeValue } from '../../basic/Size/handle'
import Pixel from '../../basic/Pixel/index'
import { type OMapPixelType, type OlPixelType, isValidPixel } from '../../basic/Pixel/type'
import { handleGetPixelValue } from '../../basic/Pixel/handle'
import Projection from '../Projection/index'
import { type OlProjInstanceType } from '../Projection/type'
import type BaseLayer from '../../layer/BaseLayer/index'
import { type BaseLayerIdType, type OMapBaseLayerCommonType } from '../../layer/BaseLayer/type'
import type BaseFeature from '../Feature/BasicFeature/index'
import type Interaction from '../../interaction/Interaction/index'
import {
  type OMapInteractionIdType,
  type OMapInteractionCommonType
} from '../../interaction/Interaction/type'
import type Control from '../../control/Control/index'
import { type OMapControlIdType } from '../../control/Control/type'
import type { EventIdType } from '../../../module/util/Event/type'
import type Popup from '../../basic/Popup/index'
import { type OMapPopupIdType } from '../../basic/Popup/type'
import type LayerGroup from '../../layer/LayerGroup/index'
import { type LayerGroupIdType } from '../../layer/LayerGroup/type'
import {
  type OMapMapType,
  type OMapViewType,
  type OMapOptionsType,
  type OMapResolvedOptionsType,
  defaultMapOptions,
  type OMapElementType,
  type OMapEventType,
  type OMapEventCallBack,
  type OMapForEachFeatureAtPixelOptionsType,
  type OMapViewAnimateOptionsType,
  type OMapViewFitOptionsType,
  createDefaultMapInteractions
} from './type'
import PopupManager from './manager/PopupManager'
import ControlManager from './manager/ControlManager'
import InteractionManager from './manager/InteractionManager'
import LayerManager from './manager/LayerManager'
import ViewController from './controller/ViewController'
import FeatureQuery from './query/FeatureQuery'
import EventAdapter from './adapter/EventAdapter'
import type { Disposable } from '../../util/Disposable/type'
import { assertNotDisposed } from '../../util/Disposable/lifecycle'

const PACKAGE_NAME = 'Map'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 地图类
 *
 */

export default class Map implements Disposable {
  private _map: OMapMapType
  private _view: OMapViewType
  private projection: Projection
  private viewController!: ViewController
  private featureQuery = new FeatureQuery(
    () => this._map,
    () => this.layerManager.getAll()
  )
  private layerManager = new LayerManager(this, () => this._map)
  private interactionManager = new InteractionManager(this, () => this._map)
  private controlManager = new ControlManager(this, () => this._map)
  private eventAdapter = new EventAdapter(
    this,
    () => this._map,
    () => this._view,
    () => this.interactionManager.getAll()
  )
  private popupManager = new PopupManager(this, () => this._map)
  private disposed = false

  constructor(element: OMapElementType, options?: OMapOptionsType) {
    if (!isDefined(element)) {
      error_(createMessage('constructor', commonMessage.paramsNotDefined('element')))
    }
    const resolvedOptions: OMapResolvedOptionsType = { ...defaultMapOptions, ...options }
    const viewOptions = resolvedOptions.view
    if (!isDefined(viewOptions)) {
      error_(createMessage('constructor', commonMessage.paramsNotDefined('view')))
    }
    let proj: Projection | string = viewOptions.projection || new Projection('EPSG:3857') // 默认为3857
    if (isString(proj)) {
      proj = new Projection(proj as string)
    }
    this.projection = proj as Projection
    const viewParams = {
      ...viewOptions,
      center:
        viewOptions.center instanceof LngLat ? viewOptions.center.toArray() : viewOptions.center, // 中心点坐标
      extent:
        viewOptions.extent instanceof Extent ? viewOptions.extent.toArray() : viewOptions.extent,
      projection: (proj as Projection).resolvedProjectionection as OlProjInstanceType
    }
    const view = new OlPackage.View(viewParams)
    // 检查用户的原始配置。合并后的 resolvedOptions.interactions 总是已定义（默认为空数组），
    // 会把“未传 interactions”错误地当成用户显式禁用了默认交互。
    const mapInteractions = isDefined(options?.interactions)
      ? options.interactions
      : createDefaultMapInteractions()
    const mapLayers = resolvedOptions.layers
    const mapControls = resolvedOptions.controls
    const mapPopups = resolvedOptions.popups
    // layers / controls / interactions / overlays 必须留空：
    // 这四个字段承载的是 OpenLayers 原生实例，而 options 中的同名集合是 OMap wrapper，
    // 需分别经 addLayer / addControl / addInteraction / addPopup 转换后再挂载。
    const mapParams = Object.assign({}, resolvedOptions, {
      layers: [],
      controls: [],
      interactions: [],
      overlays: [],
      view: view
    })
    mapParams.target = element as HTMLElement
    const map = new OlPackage.Map(mapParams)
    this._view = view
    this.viewController = new ViewController(view, this.projection)
    this._map = map
    // 初始化加载Layer
    if (isDefined(mapLayers) && mapLayers.length > 0) {
      this.addLayers(mapLayers)
    }
    // 初始化加载Interaction
    if (isDefined(mapInteractions) && mapInteractions.length > 0) {
      mapInteractions.forEach((interaction: Interaction<OMapInteractionCommonType>) => {
        this.addInteraction(interaction)
      })
    }
    // 初始化加载Control
    if (isDefined(mapControls) && mapControls.length > 0) {
      mapControls.forEach((control: Control) => {
        this.addControl(control)
      })
    }
    // 初始化加载Popup
    if (isDefined(mapPopups) && mapPopups.length > 0) {
      mapPopups.forEach((popup: Popup) => {
        this.addPopup(popup)
      })
    }
  }

  /**
   * 永久释放地图及其挂载资源。重复调用是安全的。
   */
  dispose(): void {
    if (this.disposed) return
    this.disposed = true

    this.eventAdapter?.dispose()
    // Interaction（尤其 Measure）在释放时仍需访问其伴生 Popup/Layer，必须先处理。
    this.interactionManager?.disposeAll()
    this.popupManager?.disposeAll()
    this.controlManager?.disposeAll()
    this.layerManager?.disposeAll()

    this._map.setTarget(undefined)
    this._map.dispose()
  }

  isDisposed(): boolean {
    return this.disposed
  }

  getMap(): OMapMapType {
    this.assertActive('getMap')
    return this._map
  }

  getView(): OMapViewType {
    return this.viewController.getView()
  }

  getSize(): Size | undefined {
    const size = this._map.getSize()
    return isDefined(size) ? new Size(size as OlSizeType) : undefined
  }

  setSize(size?: OMapSizeType) {
    this.assertActive('setSize')
    if (!isDefined(size)) {
      error_(createMessage('setSize', commonMessage.paramsNotDefined('size')))
    }
    const sizeValue = handleGetSizeValue(size as OMapSizeType)
    this._map.setSize(sizeValue)
  }

  // 地图信息相关
  getCenter(): LngLat | undefined {
    return this.viewController.getCenter()
  }

  setCenter(center?: OMapCoordinateType) {
    this.assertActive('setCenter')
    this.viewController.setCenter(center)
  }

  getZoom(): number | undefined {
    return this.viewController.getZoom()
  }

  setZoom(zoom?: number) {
    this.assertActive('setZoom')
    this.viewController.setZoom(zoom)
  }

  getResolution(): number | undefined {
    return this.viewController.getResolution()
  }

  setResolution(resolution?: number) {
    this.assertActive('setResolution')
    this.viewController.setResolution(resolution)
  }

  getRotation(): number {
    return this.viewController.getRotation()
  }

  setRotation(rotation: number) {
    this.assertActive('setRotation')
    this.viewController.setRotation(rotation)
  }

  getExtent(): Extent {
    return this.viewController.getExtent()
  }

  zoomIn(delta: number = 1) {
    this.assertActive('zoomIn')
    this.viewController.zoomIn(delta)
  }

  zoomOut(delta: number = -1) {
    this.assertActive('zoomOut')
    this.viewController.zoomOut(delta)
  }

  /** 图层管理相关 */

  /**
   * 添加图层
   *
   * @param {BaseLayer} layer 图层对象
   */
  addLayer(layer: BaseLayer<OMapBaseLayerCommonType>) {
    this.assertActive('addLayer')
    this.layerManager.add(layer)
  }

  /**
   * 添加多个图层
   *
   * @param {Array<BaseLayer>} layers 图层数组
   */
  addLayers(layers: Array<BaseLayer<OMapBaseLayerCommonType>>) {
    this.layerManager.addMany(layers)
  }

  /**
   * 根据id获取图层
   *
   * @param {BaseLayerIdType} id 图层id
   * @returns {BaseLayer<OMapBaseLayerCommonType> | undefined} 图层对象
   */
  getLayerById(id: BaseLayerIdType): BaseLayer<OMapBaseLayerCommonType> | undefined {
    return this.layerManager.getById(id)
  }

  /**
   * 移除图层
   *
   * @param {BaseLayer<OMapBaseLayerCommonType>} layer 图层对象
   */
  removeLayer(layer: BaseLayer<OMapBaseLayerCommonType>) {
    this.layerManager.remove(layer)
  }

  /**
   * 移除多个图层
   *
   * @param {Array<BaseLayer>} layers 图层数组
   */
  removeLayers(layers: Array<BaseLayer<OMapBaseLayerCommonType>>) {
    this.layerManager.removeMany(layers)
  }

  /**
   * 根据id移除图层
   *
   * @param {BaseLayerIdType} layerId 图层id
   */
  removeLayerById(layerId: BaseLayerIdType) {
    this.layerManager.removeById(layerId)
  }

  /**
   * 获取所有图层
   *
   * @returns {Array<BaseLayer>} 图层数组
   */
  getAllLayers(): Array<BaseLayer<OMapBaseLayerCommonType>> {
    return this.layerManager.getAll()
  }

  /** 图层组管理 */

  /**
   * 添加图层组
   *
   * @param {LayerGroup} group 图层组实例
   */
  addLayerGroup(group: LayerGroup) {
    this.layerManager.addGroup(group)
  }

  /**
   * 移除图层组
   *
   * @param {LayerGroup} group 图层组实例
   */
  removeLayerGroup(group: LayerGroup) {
    this.layerManager.removeGroup(group)
  }

  /**
   * 移除图层组
   *
   * @param {LayerGroupIdType} groupId 图层组id
   */
  removeLayerGroupById(groupId: LayerGroupIdType) {
    this.layerManager.removeGroupById(groupId)
  }

  /**
   * 获取所有图层组
   *
   * @returns {LayerGroup[]} 所有图层组
   */
  getAllLayerGroups(): LayerGroup[] {
    return this.layerManager.getGroups()
  }

  getLayerGroupById(groupId: LayerGroupIdType): LayerGroup | null {
    return this.layerManager.getGroupById(groupId)
  }

  /**
   * 事件管理
   *
   * @param type
   * @param callback
   * @returns
   */
  on(type: OMapEventType, callback: OMapEventCallBack): EventIdType {
    this.assertActive('on')
    return this.eventAdapter.on(type, callback)
  }

  once(type: OMapEventType, callback: OMapEventCallBack): EventIdType {
    this.assertActive('once')
    return this.eventAdapter.once(type, callback)
  }

  un(id: EventIdType) {
    this.eventAdapter.un(id)
  }

  /** 属性管理 */

  /**
   * 获取地图属性
   *
   * @returns {PropertiesType} 地图属性
   */
  getProperties(): PropertiesType {
    return { ...this._map.getProperties() }
  }

  /**
   * 设置地图属性
   *
   * @param {PropertiesType} properties 地图属性
   */
  setProperties(properties: PropertiesType): void {
    this.assertActive('setProperties')
    if (!isDefined(properties)) {
      error_(createMessage('setProperties', commonMessage.paramsNotDefined('properties')))
    }
    if (!isObject(properties)) {
      error_(
        createMessage(
          'setProperties',
          commonMessage.paramsInvalidFormat('properties', 'object类型')
        )
      )
    }
    const newProperties = Object.assign({}, this.getProperties(), properties)
    this._map.setProperties(newProperties)
  }

  /** 交互管理 */

  /**
   * 添加交互
   *
   * @param {Interaction} interaction 交互对象
   */
  addInteraction(interaction: Interaction<OMapInteractionCommonType>) {
    this.assertActive('addInteraction')
    this.interactionManager.add(interaction)
  }

  /**
   * 获取所有交互
   *
   * @returns {Interaction<OMapInteractionCommonType>[]} 交互数组
   */
  getInteractions(): Interaction<OMapInteractionCommonType>[] {
    return this.interactionManager.getAll()
  }

  getInteractionById(id: OMapInteractionIdType): Interaction<OMapInteractionCommonType> | null {
    return this.interactionManager.getById(id)
  }

  /**
   * 移除交互
   *
   * @param {Interaction<OMapInteractionCommonType>} interaction 交互对象
   */
  removeInteraction(interaction: Interaction<OMapInteractionCommonType>): void {
    this.interactionManager.remove(interaction)
  }

  /**
   * 控件管理
   */

  /**
   * 添加控件
   *
   * @param {Control} control 控件对象
   */
  addControl(control: Control) {
    this.assertActive('addControl')
    this.controlManager.add(control)
  }

  /**
   * 获取所有控件
   *
   * @returns {Control[]} 控件数组
   */
  getControls(): Control[] {
    return this.controlManager.getAll()
  }

  /**
   * 根据ID获取控件
   *
   * @param {OMapControlIdType} id 控件ID
   * @returns {Control | null} 控件对象
   */
  getControlById(id: OMapControlIdType): Control | null {
    return this.controlManager.getById(id)
  }

  /**
   * 移除控件
   *
   * @param {Control} control 控件对象
   */
  removeControl(control: Control) {
    this.controlManager.remove(control)
  }

  /**
   * 弹窗管理
   */

  /**
   * 添加弹窗
   *
   * @param popup
   */
  addPopup(popup: Popup) {
    this.assertActive('addPopup')
    this.popupManager.add(popup)
  }

  /**
   * 根据ID获取弹窗
   *
   * @param {OMapPopupIdType} id 弹窗ID
   * @returns {Popup | null} 弹窗对象
   */
  getPopupById(id: OMapPopupIdType): Popup | null {
    return this.popupManager.getById(id)
  }

  getPopupByProperties(filter: (properties: PropertiesType) => boolean): Popup[] {
    return this.popupManager.getByProperties(filter)
  }

  /**
   * 获取所有弹窗
   *
   * @returns {Popup[]} 弹窗数组
   */
  getPopups(): Popup[] {
    return this.popupManager.getAll()
  }

  /**
   * 删除弹窗
   *
   * @param {Popup} popup 弹窗对象
   */
  removePopup(popup: Popup) {
    this.popupManager.remove(popup)
  }

  /** 几何图形计算 */

  /**
   * 计算几何图形的长度
   *
   * @returns {number} 长度
   */
  getLength(feature: BaseFeature<OlGeometry.Geometry>): number {
    const length = OlSphere.getLength(feature.getGeometry(), {
      projection: this._map.getView().getProjection()
    })
    return length
  }

  /**
   * 计算几何图形的面积
   *
   * @returns {number} 面积
   */
  getArea(feature: BaseFeature<OlGeometry.Geometry>): number {
    const area = OlSphere.getArea(feature.getGeometry(), {
      projection: this._map.getView().getProjection()
    })
    return area
  }

  /**
   * 遍历地图上指定像素位置的所有特征
   *
   * @param {OMapPixelType} pixel 像素位置
   * @param callback 回调函数
   */
  forEachFeatureAtPixel(
    pixel: OMapPixelType,
    callback: (
      feature: BaseFeature<OlGeometry.Geometry> | null,
      layer: BaseLayer<OMapBaseLayerCommonType> | null
    ) => void,
    options?: OMapForEachFeatureAtPixelOptionsType
  ) {
    return this.featureQuery.forEachAtPixel(pixel, callback, options)
  }

  /**
   * 获取地图上指定像素位置的坐标位置
   *
   * @param {OMapPixelType} pixel 像素位置
   * @returns {LngLat} 坐标位置
   */
  getCoordinateFromPixel(pixel: OMapPixelType): LngLat | undefined {
    if (!isDefined(pixel)) {
      error_(createMessage('getCoordinateFromPixel', commonMessage.paramsNotDefined('pixel')))
    }
    if (!isValidPixel(pixel)) {
      error_(
        createMessage(
          'getCoordinateFromPixel',
          commonMessage.paramsInvalidFormat('pixel', 'OMapPixelType类型')
        )
      )
    }
    const lnglat = this._map.getCoordinateFromPixel(handleGetPixelValue(pixel))
    return new LngLat(lnglat)
  }

  /**
   * 获取地图上指定坐标位置的像素位置
   *
   * @param {OMapCoordinateType} coordinate 坐标位置
   * @returns {Pixel} 像素位置
   */
  getPixelFromCoordinate(coordinate: OMapCoordinateType): Pixel {
    if (!isDefined(coordinate)) {
      error_(createMessage('getPixelFromCoordinate', commonMessage.paramsNotDefined('coordinate')))
    }
    if (!isValidCoordinate(coordinate)) {
      error_(
        createMessage(
          'getPixelFromCoordinate',
          commonMessage.paramsInvalidFormat('coordinate', 'OMapCoordinateType类型')
        )
      )
    }
    const pixel = this._map.getPixelFromCoordinate(handleGetLngLatValue(coordinate))
    return new Pixel(pixel as OlPixelType)
  }

  getEventCoordinate(event: MouseEvent): LngLat {
    return new LngLat(this._map.getEventCoordinate(event))
  }

  getEventPixel(event: UIEvent): Pixel {
    return new Pixel(this._map.getEventPixel(event) as OlPixelType)
  }

  /**
   * 获取地图上指定像素位置的所有特征
   *
   * @param {OMapPixelType} pixel 像素位置
   * @param {OMapForEachFeatureAtPixelOptionsType} options 遍历选项
   * @returns {Array<BaseFeature<OlGeometry.Geometry>>} 特征数组
   */
  getFeaturesAtPixel(
    pixel: OMapPixelType,
    options?: OMapForEachFeatureAtPixelOptionsType
  ): BaseFeature<OlGeometry.Geometry>[] {
    return this.featureQuery.getAtPixel(pixel, options)
  }

  /**
   * 判断地图上指定像素位置是否有特征
   *
   * @param {OMapPixelType} pixel 像素位置
   * @param {OMapForEachFeatureAtPixelOptionsType} options 遍历选项
   * @returns {boolean} 是否有特征
   */
  hasFeatureAtPixel(pixel: OMapPixelType, options?: OMapForEachFeatureAtPixelOptionsType): boolean {
    return this.featureQuery.hasAtPixel(pixel, options)
  }

  render() {
    this.assertActive('render')
    this._map.render()
  }

  renderSync() {
    this.assertActive('renderSync')
    this._map.renderSync()
  }

  updateSize() {
    this.assertActive('updateSize')
    this._map.updateSize()
  }

  /**
   * view 视图相关方法
   */

  adjustCenter(deltaCoordinates: OMapCoordinateType) {
    this.viewController.adjustCenter(deltaCoordinates)
  }

  adjustResolution(ratio: number, anchor?: OMapCoordinateType) {
    this.viewController.adjustResolution(ratio, anchor)
  }

  adjustRotation(delta: number, anchor?: OMapCoordinateType) {
    this.viewController.adjustRotation(delta, anchor)
  }

  adjustZoom(delta: number, anchor?: OMapCoordinateType) {
    this.viewController.adjustZoom(delta, anchor)
  }

  animate(options: OMapViewAnimateOptionsType) {
    this.viewController.animate(options)
  }

  beginInteraction() {
    this.viewController.beginInteraction()
  }

  calculateExtent(size?: OMapSizeType): Extent {
    return this.viewController.calculateExtent(size)
  }

  cancelAnimations() {
    this.viewController.cancelAnimations()
  }

  centerOn(coordinate: OMapCoordinateType, size: OMapSizeType, position: OMapPixelType) {
    this.viewController.centerOn(coordinate, size, position)
  }

  changed() {
    this.viewController.changed()
  }

  endInteraction(duration?: number, resolutionDirection?: number, anchor?: OMapCoordinateType) {
    this.viewController.endInteraction(duration, resolutionDirection, anchor)
  }

  fit(
    featureOrExtent: BaseFeature<OlGeometry.Geometry> | OMapExtentType,
    options?: OMapViewFitOptionsType
  ) {
    this.viewController.fit(featureOrExtent, options)
  }

  getAnimating(): boolean {
    return this.viewController.getAnimating()
  }

  getInteracting() {
    return this.viewController.getInteracting()
  }

  getMaxResolution(): number {
    return this.viewController.getMaxResolution()
  }

  getMinResolution(): number {
    return this.viewController.getMinResolution()
  }

  getMaxZoom(): number {
    return this.viewController.getMaxZoom()
  }

  getMinZoom(): number {
    return this.viewController.getMinZoom()
  }

  getProjection(): Projection {
    return this.viewController.getProjection()
  }

  getResolutionForExtent(extent: OMapExtentType, size?: OMapSizeType): number {
    if (!isDefined(extent)) {
      error_(createMessage('getResolutionForExtent', commonMessage.paramsNotDefined('extent')))
    }
    if (!isValidExtent(extent)) {
      error_(createMessage('getResolutionForExtent', commonMessage.paramsInvalidFormat('extent')))
    }
    return this.viewController
      .getView()
      .getResolutionForExtent(
        handleGetExtentValue(extent),
        isDefined(size) ? handleGetSizeValue(size) : undefined
      )
  }

  getResolutionForZoom(zoom: number): number {
    return this.viewController.getView().getResolutionForZoom(zoom)
  }

  getZoomForResolution(resolution: number): number | undefined {
    return this.viewController.getView().getZoomForResolution(resolution)
  }

  getResolutions(): number[] | undefined {
    return this.viewController.getView().getResolutions()
  }

  setConstrainResolution(enabled: boolean): void {
    this.viewController.setConstrainResolution(enabled)
  }

  setMaxZoom(maxZoom: number): void {
    this.viewController.setMaxZoom(maxZoom)
  }

  setMinZoom(minZoom: number): void {
    this.assertActive('setMinZoom')
    this.viewController.setMinZoom(minZoom)
  }

  private assertActive(operationName: string): void {
    assertNotDisposed(this.disposed, PACKAGE_NAME, operationName)
  }
}
