import {
  isDefined,
  defaultValue,
  isFunction,
  isString,
} from "../../../utils/index";
import {
  warn_,
  error_,
  getPackageMessage,
  commonMessage,
} from "../../../utils/message";
import Interaction from "../Interaction/index";
import { OlInteraction, OlEvent } from "../../../source/index";
import {
  type OMapDragZoomParamsType,
  defaultDragZoomOptions,
  type OMapDragZoomType,
  type OMapInteractionDragZoomEventType,
  isOMapInteractionDragZoomEventType,
} from "./type";
import { handleInteractionDragZoomEvent } from "./handle";
import type { InteractionPropertyChangeEvent } from '../handle'
import { type EventIdType } from "../../util/Event/type";

const PACKAGE_NAME = "DragZoom";
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 拖动缩放类
 * @class DragZoom
 * @classdesc 拖动缩放类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/8/25
 * @updateDate 2026/1/3
 */

export default class DragZoom extends Interaction<OMapDragZoomType> {
  constructor(params?: OMapDragZoomParamsType) {
    super("DragZoom", { id: params?.id });
    this._interaction = new OlInteraction.DragZoom(
      Object.assign({}, defaultDragZoomOptions, defaultValue(params, {})),
    );
    this.initInteractionEvent();
  }

  on(
    type: OMapInteractionDragZoomEventType,
    callback: () => void,
  ): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(
        createMessage("on", commonMessage.paramsNotDefined("type or callback")),
      );
    }
    if (!isOMapInteractionDragZoomEventType(type)) {
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
    const unlisten = OlEvent.listen(this._interaction, type, (e: InteractionPropertyChangeEvent) => {
      this.events.emit(type, handleInteractionDragZoomEvent(this, type, e));
    });
    const id = this.events.on(type, callback, unlisten);
    return id;
  }

  once(
    type: OMapInteractionDragZoomEventType,
    callback: () => void,
  ): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(
        createMessage("once", commonMessage.paramsNotDefined("type or callback")),
      );
    }
    if (!isOMapInteractionDragZoomEventType(type)) {
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
    const unlisten = OlEvent.listen(this._interaction, type, (e: InteractionPropertyChangeEvent) => {
      this.events.emit(type, handleInteractionDragZoomEvent(this, type, e));
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
}
