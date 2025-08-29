import { isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { ProjectionUnitsType, OlProjOptionsType, OlProjInstanceType } from '../../../utils/index'
import Interaction from '../Interaction/index'
import { OlInteraction, OlLayer } from '../../../source/index'
import { VectorLayer } from '../../../index'
import {
    type OMapDrawMode,
    type OMapDrawParamsType,
    DRAW_DEFAULT_PARAMS
} from './type'
import { type OlVectorSourceInstanceType } from '../../layer/VectorLayer/type'
import { DEFAULT_STYLE } from '../../basic/Style/handle'
import { getOlDrawType } from './handle'

const PACKAGE_NAME = 'Draw';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 绘制类
 * @class Draw
 * @classdesc 绘制类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/8/25
 * @updateDate 2025/8/25
 */

interface DrawLike {
    _layer?: VectorLayer;
}

export default class Draw extends Interaction implements DrawLike {

    _layer?: VectorLayer;

    constructor(mode: OMapDrawMode, params?: OMapDrawParamsType) {
        super("Draw")
        let draw_source: OlVectorSourceInstanceType | null = null
        if (params?.layer) {
            if (params?.layer instanceof VectorLayer) {
                this._layer = params?.layer
                draw_source = (params?.layer.getSource() as OlVectorSourceInstanceType)
            } else {
                warn_(createMessage('init', 'layer参数不属于VectorLayer类型'));
            }
        }
        if (!isDefined(draw_source)) {
            this._layer = new VectorLayer({
                style: DEFAULT_STYLE
            })
            draw_source = (this._layer.getSource() as OlVectorSourceInstanceType)
        }
        let _params = Object.assign(DRAW_DEFAULT_PARAMS, {
            clickTolerance: params?.clickTolerance,
            source: draw_source,
            // features: undefined,
            // style: undefined
        })
        console.log(_params)
        this._interaction = new OlInteraction.Draw({
            ...getOlDrawType(mode),
            ..._params,
        })
    }

}