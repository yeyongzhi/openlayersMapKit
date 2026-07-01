import { warn_, error_, getPackageMessage } from "../../../utils/index";
import Source from "../Source/index";
import { OMapVectorSourceParamsType, type OMapVectorSourceType } from "./type";

const PACKAGE_NAME = "TileSource";
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * OMap VectorSource 类
 * @class
 * @classdesc VectorSource 类
 * @description 参考：https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/30
 * @updateDate 2025/9/30
 */

export default class VectorSource<
  T extends OMapVectorSourceType,
> extends Source<OMapVectorSourceType> {
  constructor(params: OMapVectorSourceParamsType) {
    super(params);
  }
}
