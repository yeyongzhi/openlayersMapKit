import {
  isBoolean,
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
import type { OlAnimationOptions } from "../../../utils/olType/view";
import Interaction from "../Interaction/index";
import { OlInteraction, OlEvent } from "../../../source/index";
import {
  type OMapLinkParamsType,
  type OMapLinkType,
  type OMapInteractionLinkEventType,
  isOMapInteractionLinkEventType,
} from "./type";
import Lnglat from "../../basic/Lnglat/index";
import { type EventIdType } from "../../util/Event/type";
import { handleInteractionLinkEvent } from "./handle";

const PACKAGE_NAME = "Link";
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 链接交互类
 * @class Link
 * @classdesc 一种将地图状态与 URL 同步的交互方式
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/20
 * @updateDate 2026/2/4
 */

const defaultLinkOptions: OMapLinkParamsType = {
  animate: true,
  params: ["x", "y", "z", "r", "l"],
  replace: false,
  prefix: "",
};

export default class Link extends Interaction<OMapLinkType> {
  constructor(params?: OMapLinkParamsType) {
    super("Link", { id: params?.id });
    let _params = {
      ...defaultValue(params, {}),
      animate:
        isDefined(params?.animate) && !isBoolean(params?.animate)
          ? {
              ...(params.animate as OlAnimationOptions),
              center:
                (params.animate as OlAnimationOptions).center instanceof Lnglat
                  ? (
                      (params.animate as OlAnimationOptions).center as Lnglat
                    ).toArray()
                  : (params.animate as OlAnimationOptions).center,
            }
          : defaultValue(params?.animate, true),
    };
    this._interaction = new OlInteraction.Link(
      Object.assign({}, defaultLinkOptions, _params),
    );
    this.initInteractionEvent();
  }

  on(type: OMapInteractionLinkEventType, callback: () => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(
        createMessage("on", commonMessage.paramsNotDefined("type or callback")),
      );
    }
    if (!isOMapInteractionLinkEventType(type)) {
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
      this.events.emit(type, handleInteractionLinkEvent(this, type, e));
    });
    const id = this.events.on(type, callback, unlisten);
    return id;
  }

  once(type: OMapInteractionLinkEventType, callback: () => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(
        createMessage("once", commonMessage.paramsNotDefined("type or callback")),
      );
    }
    if (!isOMapInteractionLinkEventType(type)) {
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
      this.events.emit(type, handleInteractionLinkEvent(this, type, e));
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
