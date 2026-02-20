import { isDefined, isNumber } from "../../../utils/index";
import {
  warn_,
  error_,
  getPackageMessage,
  commonMessage,
} from "../../../utils/index";
import { getTdtServiceUrl } from "./layerSource";
import { MapToken } from "../../util/index";
import TileLayer from "../TileLayer/index";
import XYZSource from "../../source/TileSource/subClass/XYZ/index";
import { DEFAULT_XYZ_SOURCE_PARAMS } from "../../source/TileSource/subClass/XYZ/type";
import {
  type TdtLayerTypeEnum,
  type TdtLayerProjTypeEnum,
  type OMapTdtLayerParamsType,
  isValidTdtLayerType,
} from "./type";

let PACKAGE_NAME = "TdtLayer";
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 天地图服务类
 * @class
 * @classdesc 快捷使用天地图相关的开发地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/8
 * @updateDate 2026/2/20
 */

export default class TdtLayer extends TileLayer {
  /**
   * 图层类型
   */
  tdtType!: TdtLayerTypeEnum;

  constructor(
    type: TdtLayerTypeEnum,
    proj: TdtLayerProjTypeEnum,
    options: OMapTdtLayerParamsType,
  ) {
    if (!isDefined(MapToken.tdt)) {
      error_(createMessage("constructor", "缺少天地图key，请提前申明"));
    }
    if (!isValidTdtLayerType(type)) {
      error_(
        createMessage("constructor", commonMessage.paramsInvaildEnum("type")),
      );
    }
    const url = getTdtServiceUrl(type, proj); // 天地图只需要 单个url 即可
    const xyzSourceParams = Object.assign(
      {},
      DEFAULT_XYZ_SOURCE_PARAMS,
      options,
      {
        url,
      },
    );
    const xyzSource = new XYZSource(xyzSourceParams);
    const tdtParams = Object.assign({}, options, {
      source: xyzSource.getSource(),
    });
    super(tdtParams);
    this.tdtType = type;
    this._initLayerEvent();
  }
}
