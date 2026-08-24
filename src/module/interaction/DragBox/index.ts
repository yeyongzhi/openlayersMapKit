import {
  isDefined,
  defaultValue,
  isFunction,
  isNumber,
  isString,
} from "../../../utils/index";
import {
  warn_,
  error_,
  getPackageMessage,
  commonMessage,
} from "../../../utils/message";
import Interaction from "../Interaction/index";
import Lnglat from "../../basic/Lnglat/index";
import Extent from "../../basic/Extent/index";
import Event from "../../util/Event/index";
import { type EventIdType } from "../../util/Event/type";
import { OlInteraction, OlEvent } from "../../../source/index";
import {
  type OMapDragBoxParamsType,
  type OlDragBoxInstanceType,
  type OMapInteractionDragBoxEventType,
  type OMapDragBoxType,
  type OMapDragBoxEvent,
  type OMapDragBoxEventMap,
  type OlDragBoxEventPayloadType,
  isOMapInteractionDragBoxEventType,
} from "./type";
import {
  handleInteractionDragBoxEvent,
  DragBoxParamsBoxEndHandle,
} from "./handle";

const PACKAGE_NAME = "DragBox";
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 拖动选框类
 * @class DragBox
 * @classdesc 拖动选框类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/2
 * @updateDate 2026/1/3
 */

export default class DragBox extends Interaction<OMapDragBoxType> {
  /** 收窄交互事件总线类型（构造器中以具体事件映射实例化） */
  declare events: Event<OMapDragBoxEventMap>
  extent: Extent | null = null;

  constructor(params?: OMapDragBoxParamsType) {
    super("DragBox", { id: params?.id });
    if (
      isDefined(params) &&
      isDefined(params.onBoxEnd) &&
      isFunction(params.onBoxEnd)
    ) {
      DragBoxParamsBoxEndHandle.initFunction(params.onBoxEnd);
    }
    let _params = Object.assign({}, defaultValue(params, {}));
    this._interaction = new OlInteraction.DragBox(_params);
    // 注册事件
    this.initInteractionEvent();
    this._initDragBoxEvent();
    this.events = new Event<OMapDragBoxEventMap>(
      this,
    );
  }

  private _initDragBoxEvent() {
    this._interaction.on("boxend", (e) => {
      const extent = this._interaction.getGeometry().getExtent();
      this.extent = isDefined(extent) ? new Extent(extent) : null;
      DragBoxParamsBoxEndHandle.emit({
        coordinate: new Lnglat(e.coordinate),
        target: this,
        extent: this.extent,
      });
    });
  }

  on(type: OMapInteractionDragBoxEventType, callback: (e: OMapDragBoxEvent) => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(
        createMessage("on", commonMessage.paramsNotDefined("type or callback")),
      );
    }
    if (!isOMapInteractionDragBoxEventType(type)) {
      error_(createMessage("on", commonMessage.paramsInvaildEnum(type)));
    }
    if (!isFunction(callback)) {
      error_(
        createMessage(
          "on",
          commonMessage.paramsInvaildFormat("callback", "function"),
        ),
      );
    }
    const unlisten = OlEvent.listen(this._interaction, type, (e) => {
      this.events.emit(type, handleInteractionDragBoxEvent(this, type, e as OlDragBoxEventPayloadType));
    });
    const id = this.events.on(type, callback, unlisten);
    return id;
  }

  once(
    type: OMapInteractionDragBoxEventType,
    callback: (e: OMapDragBoxEvent) => void,
  ): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(
        createMessage("once", commonMessage.paramsNotDefined("type or callback")),
      );
    }
    if (!isOMapInteractionDragBoxEventType(type)) {
      error_(createMessage("once", commonMessage.paramsInvaildEnum(type)));
    }
    if (!isFunction(callback)) {
      error_(
        createMessage(
          "once",
          commonMessage.paramsInvaildFormat("callback", "function"),
        ),
      );
    }
    const unlisten = OlEvent.listen(this._interaction, type, (e) => {
      this.events.emit(type, handleInteractionDragBoxEvent(this, type, e as OlDragBoxEventPayloadType));
    });
    const id = this.events.once(type, callback, unlisten);
    return id;
  }

  un(id: EventIdType) {
    if (!isDefined(id)) {
      error_(createMessage("un", commonMessage.paramsNotDefined(id)));
    }
    if (!isString(id)) {
      error_(
        createMessage(
          "un",
          commonMessage.paramsInvaildFormat(id, "EventIdType"),
        ),
      );
    }
    this.events.remove(id);
  }

  protected destroy() {
    DragBoxParamsBoxEndHandle.destroy();
    super.destroy();
  }
}
