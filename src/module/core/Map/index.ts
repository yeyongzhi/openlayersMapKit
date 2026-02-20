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
import OlPackage, {
  OlUtil,
  OlSphere,
  OlEvent,
  OlGeometry,
  OlLayer,
} from "../../../source/index";
import Lnglat from "../../basic/Lnglat/index";
import {
  type OlCoordinateType,
  type OMapCoordinateType,
  isValidCoordinate,
} from "../../basic/Lnglat/type";
import { handleGetLnglatValue } from "../../basic/Lnglat/handle";
import Extent from "../../basic/Extent/index";
import { handleGetExtentValue } from "../../basic/Extent/handle";
import { type OMapExtentType, isValidExtent } from "../../basic/Extent/type";
import Size from "../../basic/Size/index";
import { type OlSizeType, type OMapSizeType } from "../../basic/Size/type";
import { handleGetSizeValue } from "../../basic/Size/handle";
import Pixel from "../../basic/Pixel/index";
import {
  type OMapPixelType,
  type OlPixelType,
  isValidPixel,
} from "../../basic/Pixel/type";
import { handleGetPixelValue } from "../../basic/Pixel/handle";
import Projection from "../Projection/index";
import { type OlProjInstanceType } from "../Projection/type";
import { VectorLayer } from "../../../index";
import BaseLayer from "../../layer/BaseLayer/index";
import {
  type OlAllLayerInstanceType,
  type BaseLayerIdType,
  type OMapBaseLayerCommonType,
} from "../../layer/BaseLayer/type";
import BaseFeature from "../Feature/BasicFeature/index";
import {
  type OlFeatureInstanceType,
  type OMapSimpleGeometryType,
  type OlFeatureLike,
  type OlGeometryType,
} from "../Feature/BasicFeature/type";
import Interaction from "../../interaction/Interaction/index";
import {
  type OMapInteractionIdType,
  isVaildInteraction,
  type OMapInteractionCommonType,
} from "../../interaction/Interaction/type";
import Control from "../../control/Control/index";
import {
  isVaildControl,
  type OMapControlIdType,
} from "../../control/Control/type";
import Draw from "../../interaction/Draw/index";
import Measure from "../../interaction/Measure/index";
import Event from "../../../module/util/Event/index";
import type { EventIdType } from "../../../module/util/Event/type";
import Popup from "../../basic/Popup/index";
import {
  isVaildPopup,
  type OMapPopupIdType,
  isVaildPopupId,
} from "../../basic/Popup/type";
import LayerGroup from "../../layer/LayerGroup/index";
import {
  type LayerGroupIdType,
  isVaildGroupId,
  isVaildLayerGroup,
} from "../../layer/LayerGroup/type";
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
  private projection: Projection;
  private layers: Array<BaseLayer<OMapBaseLayerCommonType>> = [];
  private layerGroups: Array<LayerGroup> = [];
  private interactions: Array<Interaction<OMapInteractionCommonType>> = [];
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
      mapInteractions.forEach(
        (interaction: Interaction<OMapInteractionCommonType>) => {
          this.addInteraction(interaction);
        },
      );
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

  getMap(): OMapMapType {
    return this._map;
  }

  getView(): OMapViewType {
    return this._view;
  }

  getSize(): Size | undefined {
    let size = this._map.getSize();
    return isDefined(size) ? new Size(size as OlSizeType) : undefined;
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
      error_(
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
      error_(
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
  addLayer(layer: BaseLayer<OMapBaseLayerCommonType>) {
    if (!(layer instanceof BaseLayer)) {
      error_(
        createMessage("addLayer", commonMessage.paramsInvaildFormat("layer")),
      );
    }
    let isExist: boolean = false;
    const layerId = layer.getId();
    isExist = isDefined(layerId)
      ? isDefined(this.getLayerById(layerId))
      : this.layers.some((item) => {
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
      this._map.addLayer(layer.getLayer());
    }
  }

  /**
   * 添加多个图层
   * @param {Array<BaseLayer>} layers 图层数组
   */
  addLayers(layers: Array<BaseLayer<OMapBaseLayerCommonType>>) {
    if (!isDefined(layers)) {
      error_(
        createMessage("addLayers", commonMessage.paramsNotDefined("layers")),
      );
    }
    if (!isArray(layers)) {
      error_(
        createMessage(
          "addLayers",
          commonMessage.paramsInvaildFormat("layers", "数组类型"),
        ),
      );
    }
    layers.forEach((item) => {
      if (item instanceof BaseLayer) {
        this.addLayer(item);
      } else {
        warn_(
          createMessage(
            "addLayers",
            commonMessage.haveInvaildDataItem("layers"),
          ),
        );
      }
    });
  }

  /**
   * 根据id获取图层
   * @param {BaseLayerIdType} id 图层id
   * @returns {BaseLayer<OMapBaseLayerCommonType> | undefined} 图层对象
   */
  getLayerById(
    id: BaseLayerIdType,
  ): BaseLayer<OMapBaseLayerCommonType> | undefined {
    let layer = this.layers.find((item) => {
      return isDefined(item.getId()) && item.getId() === id;
    });
    return layer;
  }

  /**
   * 移除图层
   * @param {BaseLayer<OMapBaseLayerCommonType>} layer 图层对象
   */
  removeLayer(layer: BaseLayer<OMapBaseLayerCommonType>) {
    if (!isDefined(layer)) {
      error_(
        createMessage("removeLayer", commonMessage.paramsNotDefined("layer")),
      );
    }
    if (!(layer instanceof BaseLayer)) {
      error_(
        createMessage(
          "removeLayer",
          commonMessage.paramsInvaildFormat("layer", "BaseLayer实例"),
        ),
      );
    }
    let index = this.layers.indexOf(layer);
    if (index !== -1) {
      this.layers.splice(index, 1);
      layer.setTarget(null);
      this._map.removeLayer(layer.getLayer());
    } else {
      warn_(createMessage("removeLayer", "图层不存在"));
    }
  }

  /**
   * 移除多个图层
   * @param {Array<BaseLayer>} layers 图层数组
   */
  removeLayers(layers: Array<BaseLayer<OMapBaseLayerCommonType>>) {
    if (!isDefined(layers)) {
      error_(
        createMessage("removeLayers", commonMessage.paramsNotDefined("layers")),
      );
    }
    if (!isArray(layers)) {
      error_(
        createMessage(
          "removeLayers",
          commonMessage.paramsInvaildFormat("layers", "数组类型"),
        ),
      );
    }
    layers.forEach((item) => {
      if (item instanceof BaseLayer) {
        this.removeLayer(item);
      } else {
        warn_(
          createMessage(
            "removeLayers",
            commonMessage.haveInvaildDataItem("layers"),
          ),
        );
      }
    });
  }

  /**
   * 根据id移除图层
   * @param {BaseLayerIdType} id 图层id
   */
  removeLayerById(layerId: BaseLayerIdType) {
    if (!isDefined(layerId)) {
      error_(
        createMessage(
          "removeLayerById",
          commonMessage.paramsNotDefined("layerId"),
        ),
      );
    }
    let layer = this.getLayerById(layerId);
    if (!isDefined(layer)) {
      warn_(createMessage("removeLayerById", `找不到id为${layerId}的图层`));
    } else {
      this.removeLayer(layer);
    }
  }

  /**
   * 获取所有图层
   * @returns {Array<BaseLayer>} 图层数组
   */
  getAllLayers(): Array<BaseLayer<OMapBaseLayerCommonType>> {
    return this.layers;
  }

  /** 图层组管理 */

  /**
   * 添加图层组
   * @param {LayerGroup} group 图层组实例
   */
  addLayerGroup(group: LayerGroup) {
    if (!isDefined(group)) {
      error_(
        createMessage(
          "addLayerGroup",
          commonMessage.paramsNotDefined("layerGroup"),
        ),
      );
    }
    if (!isVaildLayerGroup(group)) {
      error_(
        createMessage(
          "addLayerGroup",
          commonMessage.paramsInvaildFormat("layerGroup", "LayerGroup实例"),
        ),
      );
    }
    let isExist: boolean = false;
    let groupId = group.getId();
    isExist = isDefined(groupId)
      ? this.layerGroups.some((item) => {
          return isDefined(item.getId()) && item.getId() === group.getId();
        })
      : this.layerGroups.some((item) => {
          return item === group;
        });
    if (!isExist) {
      group.setMap(this);
      this.layerGroups = [...this.layerGroups, group];
      this.addLayers(group.getAllLayers());
    }
  }

  /**
   * 移除图层组
   * @param {LayerGroup} group 图层组实例
   */
  removeLayerGroup(group: LayerGroup) {
    if (!isDefined(group)) {
      error_(
        createMessage(
          "removeLayerGroup",
          commonMessage.paramsNotDefined("layerGroup"),
        ),
      );
    }
    if (!isVaildLayerGroup(group)) {
      error_(
        createMessage(
          "removeLayerGroup",
          commonMessage.paramsInvaildFormat("layerGroup", "LayerGroup实例"),
        ),
      );
    }
    let index: number = -1;
    let groupId = group.getId();
    index = isDefined(groupId)
      ? this.layerGroups.findIndex((item) => {
          return isDefined(item.getId()) && item.getId() === group.getId();
        })
      : this.layerGroups.findIndex((item) => {
          return item === group;
        });
    if (index !== -1) {
      group.setMap(null);
      this.removeLayers(group.getAllLayers());
      this.layerGroups = this.layerGroups.splice(index, 1);
    } else {
      warn_(createMessage("removeLayerGroup", "图层组不存在"));
    }
  }

  /**
   * 移除图层组
   * @param {LayerGroupIdType} groupId 图层组id
   */
  removeLayerGroupById(groupId: LayerGroupIdType) {
    if (!isDefined(groupId)) {
      error_(
        createMessage(
          "removeLayerGroupById",
          commonMessage.paramsNotDefined("groupId"),
        ),
      );
    }
    if (!isVaildGroupId(groupId)) {
      error_(
        createMessage(
          "removeLayerGroupById",
          commonMessage.paramsInvaildFormat("groupId", "number或string类型"),
        ),
      );
    }
    let index: number = this.layerGroups.findIndex((item) => {
      return isDefined(item.getId()) && item.getId() === groupId;
    });
    if (index !== -1) {
      this.layerGroups[index].setMap(null);
      this.removeLayers(this.layerGroups[index].getAllLayers());
      this.layerGroups = this.layerGroups.splice(index, 1);
    } else {
      warn_(createMessage("removeLayerGroupById", "图层组不存在"));
    }
  }

  /**
   * 获取所有图层组
   * @returns {LayerGroup[]} 所有图层组
   */
  getAllLayerGroups(): LayerGroup[] {
    return this.layerGroups;
  }

  /**
   * 获取所有图层组
   * @returns {LayerGroup[]} 所有图层组
   */
  getLayerGroups(): LayerGroup[] {
    return this.getAllLayerGroups();
  }

  getLayerGroupById(groupId: LayerGroupIdType): LayerGroup | null {
    if (!isDefined(groupId)) {
      error_(
        createMessage(
          "removeLayerGroupById",
          commonMessage.paramsNotDefined("groupId"),
        ),
      );
    }
    if (!isVaildGroupId(groupId)) {
      error_(
        createMessage(
          "removeLayerGroupById",
          commonMessage.paramsInvaildFormat("groupId", "number或string类型"),
        ),
      );
    }
    let index: number = this.layerGroups.findIndex((item) => {
      return isDefined(item.getId()) && item.getId() === groupId;
    });
    if (index === -1) {
      warn_(createMessage("getLayerGroupById", "未找到图层组"));
      return null;
    }
    return this.layerGroups[index];
  }

  /**
   * 事件管理
   * @param type
   * @param callback
   * @returns
   */
  on(type: OMapEventType, callback: () => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(
        createMessage("on", commonMessage.paramsNotDefined("type or callback")),
      );
    }
    if (!isOMapMapEventType(type)) {
      error_(createMessage("on", commonMessage.paramsInvaildEnum("type")));
    }
    if (!isFunction(callback)) {
      error_(
        createMessage(
          "on",
          commonMessage.paramsInvaildFormat("callback", "function"),
        ),
      );
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

  once(type: OMapEventType, callback: () => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(
        createMessage(
          "once",
          commonMessage.paramsNotDefined("type or callback"),
        ),
      );
    }
    if (!isOMapMapEventType(type)) {
      error_(createMessage("once", commonMessage.paramsInvaildEnum("type")));
    }
    if (!isFunction(callback)) {
      error_(
        createMessage(
          "once",
          commonMessage.paramsInvaildFormat("callback", "function"),
        ),
      );
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

  un(id: EventIdType) {
    if (!isDefined(id)) {
      error_(createMessage("un", commonMessage.paramsNotDefined("id")));
    }
    this.events.remove(id);
  }

  /** 属性管理 */

  /**
   * 获取地图属性
   * @returns {Record<string, any>} 地图属性
   */
  getProperties(): Record<string, any> {
    return defaultValue(this._map.getProperties(), {});
  }

  /**
   * 设置地图属性
   * @param {Record<string, any>} properties 地图属性
   */
  setProperties(properties: Record<string, any>): void {
    if (!isDefined(properties)) {
      error_(
        createMessage(
          "setProperties",
          commonMessage.paramsNotDefined("properties"),
        ),
      );
    }
    if (!isObject(properties)) {
      error_(
        createMessage(
          "setProperties",
          commonMessage.paramsInvaildFormat("properties", "object类型"),
        ),
      );
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
  addInteraction(interaction: Interaction<OMapInteractionCommonType>) {
    if (!isDefined(interaction)) {
      error_(
        createMessage(
          "addInteraction",
          commonMessage.paramsNotDefined("interaction"),
        ),
      );
    }
    if (!isVaildInteraction(interaction)) {
      error_(
        createMessage(
          "addInteraction",
          commonMessage.paramsInvaildFormat("interaction", "Interaction类型"),
        ),
      );
    }
    let index = this.interactions.findIndex((i) => {
      if (isDefined(interaction.getId())) {
        return interaction.getId() === i.getId();
      }
      return (
        OlUtil.getUid(i.getInteraction()) ===
        OlUtil.getUid(interaction.getInteraction())
      );
    });
    if (index !== -1) {
      warn_(createMessage("addInteraction", "该交互已添加到地图中"));
    } else {
      // 是否需要额外的图层添加
      if (interaction instanceof Draw || interaction instanceof Measure) {
        const layer = interaction.getLayer();
        if (isDefined<VectorLayer>(layer)) {
          layer.setTarget(interaction);
          this.addLayer(layer);
        }
      }
      let olInteractionInstance = interaction.getInteraction();
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
   * @returns {Interaction<OMapInteractionCommonType>[]} 交互数组
   */
  getInteractions(): Interaction<OMapInteractionCommonType>[] {
    return this.interactions;
  }

  getInteractionById(
    id: OMapInteractionIdType,
  ): Interaction<OMapInteractionCommonType> | null {
    if (this.interactions.length === 0) return null;
    let index = this.interactions.findIndex((i) => {
      return i.getId() === id;
    });
    if (index === -1) {
      return null;
    }
    return this.interactions[index];
  }

  /**
   * 移除交互
   * @param {Interaction<OMapInteractionCommonType>} interaction 交互对象
   */
  removeInteraction(interaction: Interaction<OMapInteractionCommonType>): void {
    if (!isDefined(interaction)) {
      error_(
        createMessage(
          "addInteraction",
          commonMessage.paramsNotDefined("interaction"),
        ),
      );
    }
    if (!isVaildInteraction(interaction)) {
      error_(
        createMessage(
          "addInteraction",
          commonMessage.paramsInvaildFormat("interaction", "Interaction类型"),
        ),
      );
    }
    let index = this.interactions.findIndex((i) => {
      if (isDefined(interaction.getId())) {
        return interaction.getId() === i.getId();
      }
      return (
        OlUtil.getUid(i.getInteraction()) ===
        OlUtil.getUid(interaction.getInteraction())
      );
    });
    if (index === -1) {
      warn_(createMessage("removeInteraction", "该交互未添加到地图中"));
    } else {
      // 是否需要额外的图层添加
      if (interaction instanceof Draw || interaction instanceof Measure) {
        const layer = interaction.getLayer();
        if (isDefined<VectorLayer>(layer)) {
          layer.setTarget(null);
          this.removeLayer(layer);
        }
      }
      this.interactions.splice(index, 1);
      this._map.removeInteraction(interaction.getInteraction());
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
  addControl(control: Control) {
    if (!isDefined(control)) {
      error_(
        createMessage("addControl", commonMessage.paramsNotDefined("control")),
      );
    }
    if (!isVaildControl(control)) {
      error_(
        createMessage(
          "addControl",
          commonMessage.paramsInvaildFormat("control", "Control类型"),
        ),
      );
    }
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
   * @returns {Control[]} 控件数组
   */
  getControls(): Control[] {
    return this.controls;
  }

  /**
   * 根据ID获取控件
   * @param {OMapControlIdType} id 控件ID
   * @returns {Control | null} 控件对象
   */
  getControlById(id: OMapControlIdType): Control | null {
    if (!isDefined(id)) {
      error_(
        createMessage("getControlById", commonMessage.paramsNotDefined("id")),
      );
    }
    if (!isNumber(id) && !isString(id)) {
      error_(
        createMessage(
          "getControlById",
          commonMessage.paramsInvaildFormat("id", "OMapControlIdType类型"),
        ),
      );
    }
    const target = this.controls.find((item: Control) => {
      return item.getId() === id;
    });
    return isDefined(target) ? target : null;
  }

  /**
   * 移除控件
   * @param {Control} control 控件对象
   */
  removeControl(control: Control) {
    if (!isDefined(control)) {
      error_(
        createMessage("addControl", commonMessage.paramsNotDefined("control")),
      );
    }
    if (!isVaildControl(control)) {
      error_(
        createMessage(
          "addControl",
          commonMessage.paramsInvaildFormat("control", "Control类型"),
        ),
      );
    }
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

  /**
   * 弹窗管理
   */

  /**
   * 添加弹窗
   * @param popup
   */
  addPopup(popup: Popup) {
    if (!isDefined(popup)) {
      error_(
        createMessage("addPopup", commonMessage.paramsNotDefined("popup")),
      );
    }
    if (!isVaildPopup(popup)) {
      error_(
        createMessage(
          "addPopup",
          commonMessage.paramsInvaildFormat("popup", "Popup类型"),
        ),
      );
    }
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
      this._map.addOverlay(popup.getPopup());
    }
  }

  /**
   * 根据ID获取弹窗
   * @param {OMapPopupIdType} id 弹窗ID
   * @returns {Popup | null} 弹窗对象
   */
  getPopupById(id: OMapPopupIdType): Popup | null {
    if (!isDefined(id)) {
      error_(
        createMessage("getPopupById", commonMessage.paramsNotDefined("id")),
      );
    }
    if (!isVaildPopupId(id)) {
      error_(
        createMessage(
          "getPopupById",
          commonMessage.paramsInvaildFormat("id", "OMapPopupIdType类型"),
        ),
      );
    }
    let popup = this.popups.find((popup: Popup) => {
      return isDefined(popup.getId()) && popup.getId() === id;
    });
    return defaultValue(popup, null);
  }

  getPopupByProperties(
    filter: (properties: Record<string, any>) => boolean,
  ): Popup[] {
    if (!isDefined(filter)) {
      error_(
        createMessage("getPopupById", commonMessage.paramsNotDefined("filter")),
      );
    }
    if (!isFunction(filter)) {
      error_(
        createMessage(
          "getPopupById",
          commonMessage.paramsInvaildFormat("filter", "函数类型"),
        ),
      );
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
  getPopups(): Popup[] {
    return this.popups;
  }

  /**
   * 删除弹窗
   * @param {Popup} popup 弹窗对象
   */
  removePopup(popup: Popup) {
    if (!isDefined(popup)) {
      error_(
        createMessage("addPopup", commonMessage.paramsNotDefined("popup")),
      );
    }
    if (!isVaildPopup(popup)) {
      error_(
        createMessage(
          "addPopup",
          commonMessage.paramsInvaildFormat("popup", "Popup类型"),
        ),
      );
    }
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
      this._map.removeOverlay(popup.getPopup());
    }
  }

  /** 几何图形计算 */

  /**
   * 计算几何图形的长度
   * @returns {number} 长度
   */
  getLength(feature: BaseFeature<OlGeometry.Geometry>): number {
    let length = OlSphere.getLength(feature.getGeometry(), {
      projection: this._map.getView().getProjection(),
    });
    return length;
  }

  /**
   * 计算几何图形的面积
   * @returns {number} 面积
   */
  getArea(feature: BaseFeature<OlGeometry.Geometry>): number {
    let area = OlSphere.getArea(feature.getGeometry(), {
      projection: this._map.getView().getProjection(),
    });
    return area;
  }

  /**
   * 遍历地图上指定像素位置的所有特征
   * @param {OMapPixelType} pixel 像素位置
   * @param callback 回调函数
   */
  forEachFeatureAtPixel(
    pixel: OMapPixelType,
    callback: (
      feature: BaseFeature<OlGeometry.Geometry> | null,
      layer: BaseLayer<OMapBaseLayerCommonType> | null,
    ) => void,
    options?: OMapForEachFeatureAtPixelOptionsType,
  ) {
    if (!isDefined(pixel)) {
      error_(
        createMessage(
          "forEachFeatureAtPixel",
          commonMessage.paramsNotDefined("pixel"),
        ),
      );
    }
    let _pixel = handleGetPixelValue(pixel);
    const params = Object.assign(
      {},
      DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS,
      defaultValue(options, {}),
    );
    const result = this._map.forEachFeatureAtPixel(
      _pixel,
      (feature: OlFeatureLike, layer: OlLayer.Layer) => {
        let targetFeature: BaseFeature<OlGeometry.Geometry> | null = null;
        let targetLayer: BaseLayer<OMapBaseLayerCommonType> | null = null;
        this.layers.forEach((item) => {
          if (
            isDefined(layer) &&
            OlUtil.getUid(item.getLayer()) === OlUtil.getUid(layer)
          ) {
            targetLayer = item;
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
          const targetLayer = this.layers.find((l) => {
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

  /**
   * 获取地图上指定像素位置的坐标位置
   * @param {OMapPixelType} pixel 像素位置
   * @returns {Lnglat} 坐标位置
   */
  getCoordinateFromPixel(pixel: OMapPixelType): Lnglat | undefined {
    if (!isDefined(pixel)) {
      error_(
        createMessage(
          "getCoordinateFromPixel",
          commonMessage.paramsNotDefined("pixel"),
        ),
      );
    }
    if (!isValidPixel(pixel)) {
      error_(
        createMessage(
          "getCoordinateFromPixel",
          commonMessage.paramsInvaildFormat("pixel", "OMapPixelType类型"),
        ),
      );
    }
    const lnglat = this._map.getCoordinateFromPixel(handleGetPixelValue(pixel));
    return new Lnglat(lnglat);
  }

  /**
   * 获取地图上指定坐标位置的像素位置
   * @param {OMapCoordinateType} coordinate 坐标位置
   * @returns {Pixel} 像素位置
   */
  getPixelFromCoordinate(coordinate: OMapCoordinateType): Pixel {
    if (!isDefined(coordinate)) {
      error_(
        createMessage(
          "getPixelFromCoordinate",
          commonMessage.paramsNotDefined("coordinate"),
        ),
      );
    }
    if (!isValidCoordinate(coordinate)) {
      error_(
        createMessage(
          "getPixelFromCoordinate",
          commonMessage.paramsInvaildFormat(
            "coordinate",
            "OMapCoordinateType类型",
          ),
        ),
      );
    }
    const pixel = this._map.getPixelFromCoordinate(
      handleGetLnglatValue(coordinate),
    );
    return new Pixel(pixel as OlPixelType);
  }

  getEventCoordinate(event: any): Lnglat {
    return new Lnglat(this._map.getEventCoordinate(event));
  }

  getEventPixel(event: any): Pixel {
    return new Pixel(this._map.getEventPixel(event) as OlPixelType);
  }

  /**
   * 获取地图上指定像素位置的所有特征
   * @param {OMapPixelType} pixel 像素位置0
   * @param {OMapForEachFeatureAtPixelOptionsType} options? 遍历选项
   * @returns {Array<BaseFeature<OlGeometry.Geometry>>} 特征数组
   */
  getFeaturesAtPixel(
    pixel: OMapPixelType,
    options?: OMapForEachFeatureAtPixelOptionsType,
  ): BaseFeature<OlGeometry.Geometry>[] {
    if (!isDefined(pixel)) {
      error_(
        createMessage(
          "getFeaturesAtPixel",
          commonMessage.paramsNotDefined("pixel"),
        ),
      );
    }
    const params = Object.assign(
      {},
      DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS,
      defaultValue(options, {}),
    );
    let features = this._map.getFeaturesAtPixel(handleGetPixelValue(pixel), {
      ...params,
      layerFilter: (layer: any) => {
        if (!isDefined(params.layerFilter)) return true;
        const targetLayer = this.layers.find((l) => {
          return OlUtil.getUid(l) === OlUtil.getUid(layer);
        });
        return isDefined(targetLayer) ? params.layerFilter(targetLayer) : false;
      },
    });
    let featureIds = features.map((f) => {
      return OlUtil.getUid(f);
    });
    if (!isDefined(features) || features.length === 0) return [];
    const targetFeatures: BaseFeature<OlGeometry.Geometry>[] = [];
    this.layers.forEach((layer) => {
      if (layer instanceof VectorLayer) {
        let layerFeatures = defaultValue(layer.getFeatures(), []);
        layerFeatures.forEach((f: BaseFeature<OlGeometry.Geometry>) => {
          if (featureIds.includes(OlUtil.getUid(f.getFeature()))) {
            targetFeatures.push(f);
          }
        });
      }
    });
    return targetFeatures;
  }

  /**
   * 判断地图上指定像素位置是否有特征
   * @param {OMapPixelType} pixel 像素位置0
   * @param {OMapForEachFeatureAtPixelOptionsType} options? 遍历选项
   * @returns {boolean} 是否有特征
   */
  hasFeatureAtPixel(
    pixel: OMapPixelType,
    options?: OMapForEachFeatureAtPixelOptionsType,
  ): boolean {
    const features = this.getFeaturesAtPixel(
      handleGetPixelValue(pixel),
      options,
    );
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

  adjustCenter(deltaCoordinates: OMapCoordinateType) {
    if (!isDefined(deltaCoordinates)) {
      return;
    }
    this._view.adjustCenter(handleGetLnglatValue(deltaCoordinates));
  }

  adjustResolution(ratio: number, anchor?: OMapCoordinateType) {
    this._view.adjustResolution(
      ratio,
      anchor ? handleGetLnglatValue(anchor) : undefined,
    );
  }

  adjustRotation(delta: number, anchor?: OMapCoordinateType) {
    this._view.adjustRotation(
      delta,
      anchor ? handleGetLnglatValue(anchor) : undefined,
    );
  }

  adjustZoom(delta: number, anchor?: OMapCoordinateType) {
    this._view.adjustZoom(
      delta,
      anchor ? handleGetLnglatValue(anchor) : undefined,
    );
  }

  animate(options: OMapViewAnimateOptionsType) {
    let _options = defaultValue(options, {});
    let params = Object.assign({}, OMAP_VIEW_ANIMATE_DEFAULT_OPTIONS, {
      center: handleGetLnglatValue(_options.center),
      resolution: _options.resolution,
      rotation: _options.rotation,
      zoom: _options.zoom,
      anchor: handleGetLnglatValue(_options.anchor),
      duration: _options.duration,
      easing: isDefined(_options.easing)
        ? defaultValue(
            OMapEasing[_options.easing as keyof typeof OMapEasing],
            undefined,
          )
        : undefined,
    });
    this._view.animate(params);
  }

  beginInteraction() {
    this._view.beginInteraction();
  }

  calculateExtent(size?: OMapSizeType): Extent {
    let extent = this._view.calculateExtent(
      isDefined(size) ? handleGetSizeValue(size) : undefined,
    );
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
    }
    this._view.centerOn(
      handleGetLnglatValue(coordinate),
      handleGetSizeValue(size),
      handleGetPixelValue(position),
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
      isDefined(anchor) ? handleGetLnglatValue(anchor) : undefined,
    );
  }

  fit(
    featureOrExtent: BaseFeature<OlGeometry.Geometry> | OMapExtentType,
    options?: OMapViewFitOptionsType,
  ) {
    if (!isDefined(featureOrExtent)) {
      error_(
        createMessage("fit", commonMessage.paramsNotDefined("featureOrExtent")),
      );
    }
    if (
      !(featureOrExtent instanceof BaseFeature) &&
      !isValidExtent(featureOrExtent)
    ) {
      error_(
        createMessage(
          "fit",
          commonMessage.paramsInvaildFormat("featureOrExtent"),
        ),
      );
    }
    let target =
      featureOrExtent instanceof BaseFeature
        ? (featureOrExtent.getGeometry() as OMapSimpleGeometryType)
        : handleGetExtentValue(featureOrExtent as OMapExtentType);
    const _options = isDefined(options)
      ? Object.assign({}, OMAP_VIEW_FIT_DEFAULT_OPTIONS, {
          ...options,
          size: isDefined(options.size)
            ? handleGetSizeValue(options.size)
            : undefined,
          easing: isDefined(options.easing)
            ? OMapEasing[options.easing]
            : undefined,
        })
      : {
          ...OMAP_VIEW_FIT_DEFAULT_OPTIONS,
          size: undefined,
          easing: OMapEasing[OMAP_VIEW_FIT_DEFAULT_OPTIONS.easing],
        };
    this._view.fit(target, _options);
  }

  getAnimating(): boolean {
    return this._view.getAnimating();
  }

  getInteracting() {
    return this._view.getInteracting();
  }

  getMaxResolution(): number {
    return this._view.getMaxResolution();
  }

  getMinResolution(): number {
    return this._view.getMinResolution();
  }

  getMaxZoom(): number {
    return this._view.getMaxZoom();
  }

  getMinZoom(): number {
    return this._view.getMinZoom();
  }

  getProjection(): Projection {
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
