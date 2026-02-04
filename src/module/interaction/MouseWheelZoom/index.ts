import {
  isBoolean,
  isDefined,
  defaultValue,
  isFunction,
  isNumber,
  isString,
} from "../../../utils/index";
import { warn_, error_, getPackageMessage, commonMessage } from "../../../utils/message";
import Interaction from "../Interaction/index";
import {
  OMAP_INTERACTION_DEFAULT_PARAMS,
  OMapInteractionCommonType,
} from "../Interaction/type";
import { OlInteraction, OlEvent } from "../../../source/index";
import {
  type OMapMouseWheelZoomParamsType,
  type OMapMouseWheelZoomType,
  type OMapInteractionMouseWheelZoomEventType,
  isOMapInteractionMouseWheelZoomEventType,
} from "./type";
import {
    handleInteractionMouseWheelZoomEvent
} from './handle'
import { type EventIdType } from "../../util/Event/type";

const PACKAGE_NAME = "MouseWheelZoom";
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 鼠标滚轮缩放交互类
 * @class MouseWheelZoom
 * @classdesc 允许用户通过鼠标滚轮来缩放地图
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/20
 * @updateDate 2025/12/27
 */

const defaultMouseWheelZoomOptions: OMapMouseWheelZoomParamsType = {
  condition: undefined,
  onFocusOnly: false,
  maxDelta: 1,
  duration: 250,
  timeout: 80,
  useAnchor: true,
  constrainResolution: false,
};

export default class MouseWheelZoom extends Interaction<OMapMouseWheelZoomType> {
  constructor(params?: OMapMouseWheelZoomParamsType) {
    super("MouseWheelZoom", { id: params?.id });
    this._interaction = new OlInteraction.MouseWheelZoom(
      Object.assign(
        OMAP_INTERACTION_DEFAULT_PARAMS,
        defaultMouseWheelZoomOptions,
        defaultValue(params, {}),
      ),
    );
    this.initInteractionEvent();
  }

  on(
    type: OMapInteractionMouseWheelZoomEventType,
    callback: () => void,
  ): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(
        createMessage("on", commonMessage.paramsNotDefined("type or callback")),
      );
    }
    if (!isOMapInteractionMouseWheelZoomEventType(type)) {
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
    const unlisten = OlEvent.listen(this._interaction, type, (e: any) => {
      this.events.emit(
        type,
        handleInteractionMouseWheelZoomEvent(this, type, e),
      );
    });
    const id = this.events.on(type, callback, unlisten);
    return id;
  }

  once(
    type: OMapInteractionMouseWheelZoomEventType,
    callback: () => void,
  ): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(
        createMessage("once", commonMessage.paramsNotDefined("type or callback")),
      );
    }
    if (!isOMapInteractionMouseWheelZoomEventType(type)) {
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
    const unlisten = OlEvent.listen(this._interaction, type, (e: any) => {
      this.events.emit(
        type,
        handleInteractionMouseWheelZoomEvent(this, type, e),
      );
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
