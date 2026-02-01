import {
  isDefined,
  isNumber,
  isBoolean,
  isString,
  defaultValue,
  isFunction,
  isArray,
  isObject,
} from "../../../utils/index";
import {
  warn_,
  error_,
  getPackageMessage,
  commonMessage,
} from "../../../utils/message";
import OlPackage, { OlUtil, OlSphere, OlEvent } from "../../../source/index";
import type { OlViewInstanceType, IdType } from "../../../utils/index";
import Lnglat from "../../basic/Lnglat/index";
import {
  type OlCoordinateType,
  type OMapCoordinateType,
} from "../../basic/Lnglat/type";
import { handleGetLnglatValue } from "../../basic/Lnglat/handle";
import Extent from "../../basic/Extent/index";
import { handleGetExtentValue } from "../../basic/Extent/handle";
import { type OMapExtentType } from "../../basic/Extent/type";
import Size from "../../basic/Size/index";
import { type OlSizeType, type OMapSizeType } from "../../basic/Size/type";
import { handleGetSizeValue } from "../../basic/Size/handle";
import Pixel from "../../basic/Pixel/index";
import { type OMapPixelType, type OlPixelType } from "../../basic/Pixel/type";
import { handleGetPixelValue } from "../../basic/Pixel/handle";
import Projection from "../Projection/index";
import { type OlProjInstanceType } from "../Projection/type";
import { VectorLayer } from "../../../index";
import BaseLayer from "../../layer/BaseLayer/index";
import {
  type OlAllLayerInstanceType,
  type BaseLayerIdType,
} from "../../layer/BaseLayer/type";
import BaseFeature from "../Feature/BasicFeature/index";
import type {
  OlFeatureInstanceType,
  OlGeomInstanceType,
  OlFeatureLike,
} from "../Feature/BasicFeature/type";
import Interaction from "../../interaction/Interaction/index";
import Control from "../../control/Control/index";
import {
  type OlInteractionInstanceType,
  OMapInteractionCommonParamsType,
} from "../../interaction/Interaction/type";
import Draw from "../../interaction/Draw/index";
import Measure from "../../interaction/Measure/index";
import Event from "../../../module/util/Event/index";
import type { EventIdType } from "../../../module/util/Event/type";
import Popup from "../../basic/Popup/index";
import LayerGroup from "../../layer/LayerGroup/index";
import { type LayerGroupIdType } from "../../layer/LayerGroup/type";
import type { OlPopupInstanceType } from "../../basic/Popup/type";
import {
  type OMapMapType,
  type OMapViewType,
  type OMapOptionsType,
  defaultMapOptions,
  type OlMapInstanceType,
  type OMapElementType,
  type OMapEventType,
  type OMapEventCallBack,
  type OlMapOnEventType,
  type OlViewOnEventType,
  OMapForEachFeatureAtPixelOptionsType,
  DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS,
  OMapViewAnimateOptionsType,
  OMAP_VIEW_ANIMATE_DEFAULT_OPTIONS,
  OMapEasing,
  type OMapViewFitOptionsType,
  OMAP_VIEW_FIT_DEFAULT_OPTIONS,
  OMapMapInteractionIgnoreEventTypes,
} from "./type";
import {
  MapEventTypeIsMap,
  handleMapOnCallBack,
  isOMapMapEventType,
  isMapDrawing,
  isMapMeasuring,
} from "./handle";

const PACKAGE_NAME = "Map";
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 地图类
 * @class
 * @classdesc 核心地图类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/5
 * @updateDate 2026/2/1
 */

export default class Map {
  private _map: OMapMapType;
  private _view: OMapViewType;
  private projection?: Projection;
  private layers: Array<BaseLayer> = [];
  private layerGroups: Array<LayerGroup> = [];
  private interactions: Array<Interaction> = [];
  private controls: Array<Control> = [];
  private events: Event = new Event();
  private popups: Array<Popup> = [];

  constructor(element: OMapElementType, options?: OMapOptionsType) {
    if (!isDefined(element)) {
      error_(
        createMessage("constructor", commonMessage.paramsNotDefined("element")),
      );
    }
    let _options = defaultValue(options, {});
    const view_options = _options.view;
    if (!isDefined(view_options)) {
      error_(
        createMessage("constructor", commonMessage.paramsNotDefined("view")),
      );
    }
    let proj: Projection | string =
      view_options.projection || new Projection("EPSG:3857"); // 默认为3857
    if (isString(proj)) {
      proj = new Projection(proj as string);
    }
    this.projection = proj as Projection;
    const view_params = {
      ...view_options,
      center:
        view_options.center instanceof Lnglat
          ? view_options.center._lnglat
          : view_options.center, // 中心点坐标
      extent:
        view_options.extent instanceof Extent
          ? view_options.extent._extent
          : view_options.extent,
      projection: (proj as Projection)._projection as OlProjInstanceType,
    };
    const view = new OlPackage.View(view_params);
    let mapInteractions = defaultValue(
      _options.interactions,
      defaultMapOptions.interactions,
    );
    let mapControls = defaultValue(
      _options.controls,
      defaultMapOptions.controls,
    );
    let mapPopups = defaultValue(_options.popups, defaultMapOptions.popups);
    let mapParams = Object.assign({}, defaultMapOptions, {
      ..._options,
      interactions: [],
      overlays: [],
      view: view,
    });
    mapParams.target = element as HTMLElement;
    const map = new OlPackage.Map(mapParams);
    this._view = view;
    this._map = map;
    // 初始化加载Interaction
    if (isDefined(mapInteractions) && mapInteractions.length > 0) {
      mapInteractions.forEach((interaction: Interaction) => {
        this.addInteraction(interaction);
      });
    }
    // 初始化加载Control
    if (isDefined(mapControls) && mapControls.length > 0) {
      mapControls.forEach((control: Control) => {
        this.addControl(control);
      });
    }
    // 初始化加载Popup
    if (isDefined(mapPopups) && mapPopups.length > 0) {
      mapPopups.forEach((popup: Popup) => {
        this.addPopup(popup);
      });
    }
    this.events = new Event<Record<OMapEventType, unknown[]>>(this);
  }

  getSize(): Size | undefined {
    let size = this._map.getSize();
    return isDefined(size) ? new Size(size) : undefined;
  }

  setSize(size?: OMapSizeType) {
    if (!isDefined(size)) {
      error_(createMessage("setSize", commonMessage.paramsNotDefined("size")));
    }
    let _size = handleGetSizeValue(size as OMapSizeType);
    this._map.setSize(_size);
  }

  // 地图信息相关
  getCenter(): Lnglat | undefined {
    let center = this._view.getCenter();
    return isDefined(center) ? new Lnglat(center) : undefined;
  }

  setCenter(center?: OMapCoordinateType) {
    if (!isDefined(center)) {
      error_(
        createMessage("setCenter", commonMessage.paramsNotDefined("center")),
      );
    }
    let _center = handleGetLnglatValue(center as OMapCoordinateType);
    this._view.setCenter(_center);
  }

  getZoom(): number | undefined {
    return this._view.getZoom();
  }

  setZoom(zoom?: number) {
    if (!isDefined(zoom)) {
      error_(createMessage("setZoom", commonMessage.paramsNotDefined("zoom")));
    }
    if (!isNumber(zoom)) {
      error_(
        createMessage("setZoom", commonMessage.paramsInvaildFormat("zoom")),
      );
    }
    this._view.setZoom(zoom as number);
  }

  getResolution(): number | undefined {
    return this._view.getResolution();
  }

  setResolution(resolution?: number) {
    if (!isDefined(resolution)) {
      error_(
        createMessage(
          "setResolution",
          commonMessage.paramsNotDefined("resolution"),
        ),
      );
    }
    if (!isNumber(resolution)) {
      error_(
        createMessage(
          "setResolution",
          commonMessage.paramsInvaildFormat("resolution"),
        ),
      );
    }
    this._view.setResolution(resolution as number);
  }

  getRotation(): number {
    return this._view.getRotation();
  }

  setRotation(rotation: number) {
    if (!isDefined(rotation)) {
      error_(
        createMessage(
          "setRotation",
          commonMessage.paramsNotDefined("rotation"),
        ),
      );
    }
    if (!isNumber(rotation)) {
      error_(
        createMessage(
          "setRotation",
          commonMessage.paramsInvaildFormat("rotation"),
        ),
      );
    }
    this._view.setRotation(rotation);
  }

  getExtent(): Extent {
    let _extent = this._view.calculateExtent();
    return new Extent(_extent);
  }

  zoomIn(delta: number = 1) {
    if (isDefined(delta) && !isNumber(delta)) {
      warn_(
        createMessage(
          "zoomIn",
          commonMessage.paramsInvaildFormat("delta", "number"),
        ),
      );
    }
    this._view.adjustZoom(delta);
  }

  zoomOut(delta: number = -1) {
    if (isDefined(delta) && !isNumber(delta)) {
      warn_(
        createMessage(
          "zoomOut",
          commonMessage.paramsInvaildFormat("delta", "number"),
        ),
      );
    }
    this._view.adjustZoom(delta);
  }

  /** 图层管理相关 */

  /**
   * 添加图层
   * @param {BaseLayer} layer 图层对象
   */
  addLayer(layer: BaseLayer) {
    if (!(layer instanceof BaseLayer)) {
      error_(
        createMessage("addLayer", commonMessage.paramsInvaildFormat("layer")),
      );
    }
    let isExist: boolean = false;
    const layerId = layer.getId();
    isExist = isDefined(layerId)
      ? isDefined(this.getLayerById(layerId))
      : this.layers.some((item: BaseLayer) => {
          return (
            OlUtil.getUid(item.getLayer()) === OlUtil.getUid(layer.getLayer())
          );
        });
    if (isExist) {
      warn_(createMessage("addLayer", "图层已存在"));
    } else {
      this.layers.push(layer);
      if (!isDefined(layer.getTarget())) {
        layer.setTarget(this);
      }
      this._map.addLayer(layer.getLayer() as OlAllLayerInstanceType);
    }
  }

  /**
   * 添加多个图层
   * @param {Array<BaseLayer>} layers 图层数组
   */
  addLayers(layers: Array<BaseLayer>) {
    
  }

  /**
   * 根据id获取图层
   * @param {BaseLayerIdType} id 图层id
   * @returns {BaseLayer | undefined} 图层对象
   */
  getLayerById(id: BaseLayerIdType): BaseLayer | undefined {
    
  }

  /**
   * 移除图层
   * @param {BaseLayer} layer 图层对象
   */
  removeLayer(layer: BaseLayer) {
    
  }

  /**
   * 移除多个图层
   * @param {Array<BaseLayer>} layers 图层数组
   */
  removeLayers(layers: BaseLayer[]) {
    
  }

  /**
   * 根据id移除图层
   * @param {BaseLayerIdType} id 图层id
   */
  removeLayerById(id: number | string) {
    if (!isDefined(id)) {
      warn_(createMessage("removeLayerById", "图层id不能为空"));
      return undefined;
    }
    let layer = this.getLayerById(id);
    if (!isDefined(layer)) {
      warn_(
        createMessage(
          "removeLayerById",
          `找不到id为${id}(${isString(id) ? "string" : "number"})的图层`,
        ),
      );
      return false;
    }
    this.removeLayer(layer);
  }

  /**
   * 获取所有图层
   * @returns {Array<BaseLayer>} 图层数组
   */
  getAllLayers(): BaseLayer[] {
    return this.layers;
  }

  /** 图层组管理 */

  /**
   * 添加图层组
   * @param {LayerGroup} group 图层组实例
   */
  addLayerGroup(group: LayerGroup): void {
    if (!isDefined(group)) {
      warn_(createMessage("addLayerGroup", "参数layerGroup不能为空"));
      return;
    }
    if (!(group instanceof LayerGroup)) {
      warn_(
        createMessage("addLayerGroup", "参数layerGroup必须为LayerGroup实例"),
      );
      return;
    }
    let isExist: boolean = false;
    if (group.getId()) {
      isExist = this.layerGroups.some((item) => {
        return isDefined(item.getId()) && item.getId() === group.getId();
      });
    }
    if (!isExist) {
      group.setMap(this);
      this.layerGroups.push(group);
      this.addLayers(group.getAllLayers());
    }
  }

  /**
   * 移除图层组
   * @param {LayerGroup} group 图层组实例
   */
  removeLayerGroup(group: LayerGroup): void {
    if (!isDefined(group)) {
      warn_(createMessage("removeLayerGroup", "参数layerGroup不能为空"));
      return;
    }
    if (!(group instanceof LayerGroup)) {
      warn_(
        createMessage("removeLayerGroup", "参数layerGroup必须为LayerGroup实例"),
      );
      return;
    }
    let index: number = -1;
    if (group.getId()) {
      index = this.layerGroups.findIndex((item) => {
        return isDefined(item.getId()) && item.getId() === group.getId();
      });
    }
    if (index !== -1) {
      group.setMap(null);
      this.removeLayers(group.getAllLayers());
      this.layerGroups = this.layerGroups.splice(index, 1);
    }
  }

  /**
   * 移除图层组
   * @param {LayerGroupIdType} groupId 图层组id
   */
  removeLayerGroupById(groupId: LayerGroupIdType): void {
    if (!isDefined(groupId)) {
      warn_(createMessage("removeLayerGroupById", "参数groupId不能为空"));
      return;
    }
    if (!isNumber(groupId) && !isString(groupId)) {
      warn_(
        createMessage(
          "removeLayerGroupById",
          "参数groupId必须为number或string类型",
        ),
      );
      return;
    }
    let index: number = this.layerGroups.findIndex((item) => {
      return isDefined(item.getId()) && item.getId() === groupId;
    });
    if (index !== -1) {
      (this.layerGroups[index] as LayerGroup).setMap(null);
      this.removeLayers((this.layerGroups[index] as LayerGroup).getAllLayers());
      this.layerGroups = this.layerGroups.splice(index, 1);
    }
  }

  /**
   * 获取所有图层组
   * @returns {LayerGroup[]} 所有图层组
   */
  getAllLayerGroups(): LayerGroup[] | undefined {
    return this.layerGroups;
  }

  /**
   * 获取所有图层组
   * @returns {LayerGroup[]} 所有图层组
   */
  getLayerGroups(): LayerGroup[] | undefined {
    return this.getAllLayerGroups();
  }

  getLayerGroupById(groupId: LayerGroupIdType): LayerGroup | undefined {
    if (!isDefined(groupId)) {
      warn_(createMessage("removeLayerGroupById", "参数groupId不能为空"));
      return;
    }
    if (!isNumber(groupId) && !isString(groupId)) {
      warn_(
        createMessage(
          "removeLayerGroupById",
          "参数groupId必须为number或string类型",
        ),
      );
      return;
    }
    let index: number = this.layerGroups.findIndex((item) => {
      return isDefined(item.getId()) && item.getId() === groupId;
    });
    if (index === -1) {
      warn_(createMessage("getLayerGroupById", "未找到图层组"));
      return;
    }
    return this.layerGroups[index] as LayerGroup;
  }

  /**
   * 事件管理
   * @param type
   * @param callback
   * @returns
   */
  on(type: OMapEventType, callback: () => void): EventIdType | undefined {
    if (!isDefined(type) || !isDefined(callback)) {
      warn_(
        createMessage("on", commonMessage.paramsNotDefined("type or callback")),
      );
      return;
    }
    if (!isOMapMapEventType(type)) {
      warn_(createMessage("on", commonMessage.paramsInvaildEnum("type")));
      return;
    }
    if (!isFunction(callback)) {
      warn_(
        createMessage(
          "on",
          commonMessage.paramsInvaildFormat("callback", "function"),
        ),
      );
      return;
    }
    let isMapTarget = MapEventTypeIsMap(type);
    const target = isMapTarget ? this._map : this._view;
    const unlisten = OlEvent.listen(
      target,
      isMapTarget ? type.replace("map:", "") : type.replace("view:", ""),
      (e: any) => {
        let isInteracting =
          isMapMeasuring(defaultValue(this.getInteractions(), [])) ||
          isMapDrawing(defaultValue(this.getInteractions(), []));
        if (
          isInteracting &&
          OMapMapInteractionIgnoreEventTypes.includes(type)
        ) {
          return false;
        }
        this.events.emit(type, handleMapOnCallBack(this, type, e));
      },
    );
    const id = this.events.on(type, callback, unlisten);
    return id;
  }

  once(type: OMapEventType, callback: () => void): EventIdType | undefined {
    if (!isDefined(type) || !isDefined(callback)) {
      warn_(
        createMessage(
          "once",
          commonMessage.paramsNotDefined("type or callback"),
        ),
      );
      return;
    }
    if (!isOMapMapEventType(type)) {
      warn_(createMessage("once", commonMessage.paramsInvaildEnum("type")));
      return;
    }
    if (!isFunction(callback)) {
      warn_(
        createMessage(
          "once",
          commonMessage.paramsInvaildFormat("callback", "function"),
        ),
      );
      return;
    }
    let isMapTarget = MapEventTypeIsMap(type);
    const target = isMapTarget ? this._map : this._view;
    const unlisten = OlEvent.listen(
      target,
      isMapTarget ? type.replace("map:", "") : type.replace("view:", ""),
      (e: any) => {
        let isInteracting =
          isMapMeasuring(defaultValue(this.getInteractions(), [])) ||
          isMapDrawing(defaultValue(this.getInteractions(), []));
        if (
          isInteracting &&
          OMapMapInteractionIgnoreEventTypes.includes(type)
        ) {
          return false;
        }
        this.events.emit(type, handleMapOnCallBack(this, type, e));
      },
      target,
      true,
    );
    const id = this.events.once(type, callback, unlisten);
    return id;
  }

  un(id: EventIdType): void {
    if (!isDefined(id)) {
      warn_(createMessage("un", commonMessage.paramsNotDefined("id")));
      return;
    }
    (this.events as Event).remove(id);
  }

  /** 属性管理 */

  getProperties(): Record<string, any> | undefined {
    return defaultValue(this._map.getProperties(), {});
  }

  setProperties(properties: Record<string, any>): void {
    if (!isDefined(properties)) {
      warn_(
        createMessage(
          "setProperties",
          commonMessage.paramsNotDefined("properties"),
        ),
      );
      return;
    }
    if (!isObject(properties)) {
      warn_(
        createMessage(
          "setProperties",
          commonMessage.paramsInvaildFormat("properties", "object类型"),
        ),
      );
      return;
    }
    const newProperties = Object.assign(
      {},
      defaultValue(this.getProperties(), {}),
      properties,
    );
    this._map.setProperties(newProperties);
  }

  /** 交互管理 */

  /**
   * 添加交互
   * @param {Interaction} interaction 交互对象
   */
  addInteraction(interaction: Interaction): void {
    let index = this.interactions.findIndex((i) => {
      return (
        OlUtil.getUid(i.getInteraction()) ===
        OlUtil.getUid(interaction.getInteraction())
      );
    });
    if (index !== -1) {
      warn_(createMessage("addInteraction", "该交互已添加到地图中"));
      return;
    }
    // 是否需要额外的图层添加
    if (interaction instanceof Draw || interaction instanceof Measure) {
      const layer = interaction.getLayer();
      if (isDefined<VectorLayer>(layer)) {
        layer.setTarget(interaction);
        this.addLayer(layer);
      }
    }
    if (isDefined(interaction.getInteraction())) {
      let olInteractionInstance =
        interaction.getInteraction() as OlInteractionInstanceType;
      this.interactions.push(interaction);
      this._map.addInteraction(olInteractionInstance);
      if (interaction.setMap) {
        interaction.setMap(this);
      }
      interaction.setActive(true); // 自动开启
      olInteractionInstance.dispatchEvent("change:active");
    }
  }

  /**
   * 获取所有交互
   * @returns {Interaction[] | undefined} 交互数组
   */
  getInteractions(): Interaction[] | undefined {
    return this.interactions;
  }

  getInteractionById(
    id: OMapInteractionCommonParamsType["id"],
  ): Interaction | null | undefined {
    if (this.interactions.length === 0) return null;
    let index = this.interactions.findIndex((i) => {
      return i.id === id;
    });
    if (index === -1) {
      return null;
    }
    return this.interactions[index];
  }

  /**
   * 移除交互
   * @param {Interaction} interaction 交互对象
   */
  removeInteraction(interaction: Interaction): void {
    let index = this.interactions.findIndex((i) => {
      return (
        OlUtil.getUid(i.getInteraction()) ===
        OlUtil.getUid(interaction.getInteraction())
      );
    });
    if (index === -1) {
      warn_(createMessage("removeInteraction", "该交互未添加到地图中"));
      return;
    }
    if (isDefined<OlInteractionInstanceType>(interaction.getInteraction())) {
      this.interactions.splice(index, 1);
      this._map.removeInteraction(
        interaction.getInteraction() as OlInteractionInstanceType,
      );
      interaction.setMap(null);
    }
  }

  /**
   * 控件管理
   */

  /**
   * 添加控件
   * @param {Control} control 控件对象
   */
  addControl(control: Control): void {
    let index = this.controls.findIndex((i) => {
      return (
        OlUtil.getUid(i.getControl()) === OlUtil.getUid(control.getControl())
      );
    });
    if (index !== -1) {
      warn_(createMessage("addControl", "该控件已添加到地图中"));
      return;
    }
    if (isDefined(control.getControl())) {
      this.controls.push(control);
      this._map.addControl(control.getControl());
    }
  }

  /**
   * 获取所有控件
   * @returns {Control[] | undefined} 控件数组
   */
  getControls(): Control[] | undefined {
    return this.controls;
  }

  /**
   * 根据ID获取控件
   * @param {number | string} id 控件ID
   * @returns {Control | undefined} 控件对象
   */
  getControlById(id: number | string): Control | undefined {
    const target = this.controls.find((item: Control) => {
      return item.getId() === id;
    });
    return target;
  }

  /**
   * 移除控件
   * @param {Control} control 控件对象
   */
  removeControl(control: Control): void {
    let index = this.controls.findIndex((i) => {
      return (
        OlUtil.getUid(i.getControl()) === OlUtil.getUid(control.getControl())
      );
    });
    if (index === -1) {
      warn_(createMessage("removeControl", "该控件未添加到地图中"));
      return;
    }
    if (isDefined(control.getControl())) {
      this.controls.splice(index, 1);
      this._map.removeControl(control.getControl());
    }
  }

  // 弹窗管理

  /**
   * 添加弹窗
   * @param popup
   */
  addPopup(popup: Popup): void {
    if (!isDefined(popup)) return;
    let index = this.popups.findIndex((i) => {
      return OlUtil.getUid(i.getPopup()) === OlUtil.getUid(popup.getPopup());
    });
    if (index !== -1) {
      warn_(createMessage("addPopup", "该弹窗已添加到地图中"));
      return;
    }
    if (isDefined(popup.getPopup())) {
      this.popups.push(popup);
      if (popup.setMap) {
        popup.setMap(this);
      }
      (this._map as OlMapInstanceType).addOverlay(
        popup.getPopup() as OlPopupInstanceType,
      );
    }
  }

  /**
   * 根据ID获取弹窗
   * @param {number | string} id 弹窗ID
   * @returns {Popup} 弹窗对象
   */
  getPopupById(id: number | string): Popup | undefined {
    if (!isDefined(id)) {
      warn_(createMessage("getPopupById", "参数不能为空"));
      return;
    }
    if (!isNumber(id) && !isString(id)) {
      warn_(createMessage("getPopupById", "参数必须为数字或字符串"));
      return;
    }
    let popup = this.popups.find((popup: Popup) => {
      return isDefined(popup.getId()) && popup.getId() === id;
    });
    return popup;
  }

  getPopupByProperties(
    filter: (properties: Record<string, any>) => boolean,
  ): Popup[] | undefined {
    if (!isDefined(filter)) {
      warn_(createMessage("getPopupById", "参数不能为空"));
      return;
    }
    if (!isFunction(filter)) {
      warn_(createMessage("getPopupById", "参数必须为数字或字符串"));
      return;
    }
    const popups = this.popups.filter((p: Popup) => {
      if (!isDefined(p.getProperties())) return false;
      return filter(p.getProperties() as Record<string, any>);
    });
    return popups;
  }

  /**
   * 获取所有弹窗
   * @returns {Popup[]} 弹窗数组
   */
  getPopups(): Popup[] | undefined {
    return this.popups;
  }

  /**
   * 删除弹窗
   * @param {Popup} popup 弹窗对象
   */
  removePopup(popup: Popup): void {
    if (!isDefined(popup)) return;
    let index = this.popups.findIndex((i) => {
      return OlUtil.getUid(i.getPopup()) === OlUtil.getUid(popup.getPopup());
    });
    if (index == -1) {
      warn_(createMessage("removePopup", "该弹窗未添加到地图中"));
      return;
    }
    if (isDefined(popup.getPopup())) {
      this.popups.splice(index, 1);
      if (popup.setMap) {
        popup.setMap(null);
      }
      (this._map as OlMapInstanceType).removeOverlay(
        popup.getPopup() as OlPopupInstanceType,
      );
    }
  }

  /** 几何图形计算 */
  getLength(feature: BaseFeature<any>): number | undefined {
    let length = OlSphere.getLength(
      feature.getGeometry() as OlGeomInstanceType,
      {
        projection: this._map.getView().getProjection(),
      },
    );
    return length;
  }

  getArea(feature: BaseFeature<any>): number | undefined {
    let area = OlSphere.getArea(feature.getGeometry() as OlGeomInstanceType, {
      projection: this._map.getView().getProjection(),
    });
    return area;
  }

  /**
   * @TODO
   * 遍历地图上指定像素位置的所有特征
   * @param pixel 像素位置
   * @param callback 回调函数
   */
  forEachFeatureAtPixel(
    pixel: Pixel,
    callback: (
      feature: BaseFeature<any> | null,
      layer: BaseLayer | null,
    ) => void,
    options?: OMapForEachFeatureAtPixelOptionsType,
  ): void {
    let _pixel = handleGetPixelValue(pixel);
    if (!isDefined(_pixel)) return;
    const params = Object.assign(
      {},
      DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS,
      options,
    );
    const result = this._map.forEachFeatureAtPixel(
      _pixel as OlPixelType,
      (feature: OlFeatureLike, layer: any) => {
        let targetFeature: BaseFeature<any> | null = null;
        let targetLayer: BaseLayer | null = null;
        this.layers.forEach((item: BaseLayer) => {
          if (
            isDefined(layer) &&
            OlUtil.getUid(item.getLayer()) === OlUtil.getUid(layer)
          ) {
            targetLayer = item as BaseLayer;
          }
          if (item instanceof VectorLayer) {
            let layerFeatures = defaultValue(item.getFeatures(), []);
            layerFeatures.forEach((f: BaseFeature<any>) => {
              if (OlUtil.getUid(feature) === OlUtil.getUid(f.getFeature())) {
                targetFeature = f as BaseFeature<any>;
              }
            });
          }
        });
        return callback(targetFeature, targetLayer);
      },
      {
        ...params,
        layerFilter: (layer: any) => {
          if (!isDefined(params.layerFilter)) return true;
          const targetLayer = this.layers.find((l: BaseLayer) => {
            return OlUtil.getUid(l) === OlUtil.getUid(layer);
          });
          return isDefined(targetLayer)
            ? params.layerFilter(targetLayer)
            : false;
        },
      },
    );
    return result;
  }

  getCoordinateFromPixel(pixel: OMapPixelType): Lnglat | undefined {
    if (!handleGetPixelValue(pixel)) return;
    const lnglat = this._map.getCoordinateFromPixel(
      handleGetPixelValue(pixel) as OlPixelType,
    );
    return new Lnglat(...lnglat);
  }

  getPixelFromCoordinate(coordinate: OMapCoordinateType): Pixel | undefined {
    if (!handleGetLnglatValue(coordinate)) return;
    const pixel = this._map.getPixelFromCoordinate(
      handleGetLnglatValue(coordinate) as OlCoordinateType,
    );
    return new Pixel(...pixel);
  }

  getEventCoordinate(event: any): Lnglat | undefined {
    return new Lnglat(...this._map.getEventCoordinate(event));
  }

  getEventPixel(event: any): Pixel | undefined {
    return new Pixel(...this._map.getEventPixel(event));
  }

  getFeaturesAtPixel(
    pixel: Pixel,
    options?: OMapForEachFeatureAtPixelOptionsType,
  ): BaseFeature<any>[] | undefined {
    if (!handleGetPixelValue(pixel)) return;
    const params = Object.assign(
      {},
      DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS,
      options,
    );
    let features = this._map.getFeaturesAtPixel(
      handleGetPixelValue(pixel) as OlPixelType,
      {
        ...params,
        layerFilter: (layer: any) => {
          if (!isDefined(params.layerFilter)) return true;
          const targetLayer = this.layers.find((l: BaseLayer) => {
            return OlUtil.getUid(l) === OlUtil.getUid(layer);
          });
          return isDefined(targetLayer)
            ? params.layerFilter(targetLayer)
            : false;
        },
      },
    );
    let featureIds = features.map((f: OlFeatureLike) => {
      return OlUtil.getUid(f);
    });
    if (!isDefined(features)) return [];
    const targetFeatures: BaseFeature<any>[] = [];
    this.layers.forEach((layer: BaseLayer) => {
      if (layer instanceof VectorLayer) {
        let layerFeatures = defaultValue(layer.getFeatures(), []);
        layerFeatures.forEach((f: BaseFeature<any>) => {
          if (featureIds.includes(OlUtil.getUid(f.getFeature()))) {
            targetFeatures.push(f);
          }
        });
      }
    });
    return targetFeatures;
  }

  hasFeatureAtPixel(
    pixel: Pixel,
    options?: OMapForEachFeatureAtPixelOptionsType,
  ): boolean {
    const features = this.getFeaturesAtPixel(pixel, options);
    return isDefined(features) && features.length > 0;
  }

  render() {
    this._map.render();
  }

  renderSync() {
    this._map.renderSync();
  }

  updateSize() {
    this._map.updateSize();
  }

  /**
   * view 视图相关方法
   */
  adjustCenter(deltaCoordinates: OMapCoordinateType): void {
    if (!isDefined(deltaCoordinates)) {
      return;
    }
    this._view.adjustCenter(
      handleGetLnglatValue(deltaCoordinates) as OlCoordinateType,
    );
  }

  adjustResolution(ratio: number, anchor?: OMapCoordinateType): void {
    this._view.adjustResolution(
      ratio,
      anchor ? (handleGetLnglatValue(anchor) as OlCoordinateType) : undefined,
    );
  }

  adjustRotation(delta: number, anchor?: OMapCoordinateType): void {
    this._view.adjustRotation(
      delta,
      anchor ? (handleGetLnglatValue(anchor) as OlCoordinateType) : undefined,
    );
  }

  adjustZoom(delta: number, anchor?: OMapCoordinateType): void {
    this._view.adjustZoom(
      delta,
      anchor ? (handleGetLnglatValue(anchor) as OlCoordinateType) : undefined,
    );
  }

  animate(options: OMapViewAnimateOptionsType) {
    let params = Object.assign({}, OMAP_VIEW_ANIMATE_DEFAULT_OPTIONS, {
      center: options.center
        ? (handleGetLnglatValue(options.center) as OlCoordinateType)
        : undefined,
      resolution: options.resolution,
      rotation: options.rotation,
      zoom: options.zoom,
      anchor: options.anchor
        ? (handleGetLnglatValue(options.anchor) as OlCoordinateType)
        : undefined,
      duration: options.duration,
      easing: isDefined(options.easing)
        ? OMapEasing[options.easing]
        : undefined,
    });
    this._view.animate(params);
  }

  beginInteraction() {
    this._view.beginInteraction();
  }

  calculateExtent(size?: OMapSizeType): Extent {
    let extent = this._view.calculateExtent(handleGetSizeValue(size));
    return new Extent(extent);
  }

  cancelAnimations() {
    this._view.cancelAnimations();
  }

  centerOn(
    coordinate: OMapCoordinateType,
    size: OMapSizeType,
    position: OMapPixelType,
  ) {
    if (!isDefined(coordinate) || !isDefined(size) || !isDefined(position)) {
      warn_(
        createMessage(
          "centerOn",
          commonMessage.paramsListHaveNotDefined(
            "coordinate",
            "size",
            "position",
          ),
        ),
      );
      return;
    }
    this._view.centerOn(
      handleGetLnglatValue(coordinate) as OlCoordinateType,
      handleGetSizeValue(size) as OlSizeType,
      handleGetPixelValue(position) as OlPixelType,
    );
  }

  changed() {
    this._view.changed();
  }

  endInteraction(
    duration?: number,
    resolutionDirection?: number,
    anchor?: OMapCoordinateType,
  ) {
    this._view.endInteraction(
      duration,
      resolutionDirection,
      handleGetLnglatValue(anchor) as OlCoordinateType,
    );
  }

  fit(
    featureOrExtent: BaseFeature<any> | Extent,
    options?: OMapViewFitOptionsType,
  ) {
    if (!isDefined(featureOrExtent)) {
      error_(
        createMessage("fit", commonMessage.paramsNotDefined("featureOrExtent")),
      );
    }
    if (
      !(
        featureOrExtent instanceof BaseFeature ||
        featureOrExtent instanceof Extent
      )
    ) {
      error_(
        createMessage(
          "fit",
          commonMessage.paramsInvaildFormat(
            "featureOrExtent",
            "BaseFeature、Extent",
          ),
        ),
      );
    }
    let target =
      featureOrExtent instanceof BaseFeature
        ? featureOrExtent.getGeometry()
        : handleGetExtentValue(featureOrExtent as Extent);
    const _options = isDefined(options)
      ? Object.assign({}, OMAP_VIEW_FIT_DEFAULT_OPTIONS, {
          ...options,
          size: handleGetSizeValue(options.size) as OlSizeType,
          easing: isDefined(options.easing)
            ? OMapEasing[options.easing]
            : undefined,
          padding: isDefined(options.padding)
            ? isNumber(options.padding)
              ? [
                  options.padding,
                  options.padding,
                  options.padding,
                  options.padding,
                ]
              : options.padding
            : [0, 0, 0, 0],
        })
      : {
          ...OMAP_VIEW_FIT_DEFAULT_OPTIONS,
          easing: OMapEasing[OMAP_VIEW_FIT_DEFAULT_OPTIONS.easing],
          padding: [0, 0, 0, 0],
          size: undefined,
        };
    this._view.fit(target, _options);
  }

  getAnimating(): boolean | undefined {
    return this._view.getAnimating();
  }

  getInteracting() {
    return this._view.getInteracting();
  }

  getMaxResolution(): number | undefined {
    return this._view.getMaxResolution();
  }

  getMinResolution(): number | undefined {
    return this._view.getMinResolution();
  }

  getMaxZoom(): number | undefined {
    return this._view.getMaxZoom();
  }

  getMinZoom(): number | undefined {
    return this._view.getMinZoom();
  }

  getProjection(): Projection | undefined {
    return this.projection;
  }

  getResolutionForExtent() {}

  getResolutionForZoom(zoom: number) {}

  getZoomForResolution() {}

  getResolutions() {}

  setConstrainResolution(enabled: boolean): void {
    if (!isBoolean(enabled)) {
      warn_(
        createMessage(
          "setProperties",
          commonMessage.paramsInvaildFormat("enabled", "boolean类型"),
        ),
      );
      return;
    }
    return this._view.setConstrainResolution(enabled);
  }

  setMaxZoom(maxZoom: number): void {
    this._view.setMaxZoom(maxZoom);
  }

  setMinZoom(minZoom: number): void {
    this._view.setMinZoom(minZoom);
  }
}
