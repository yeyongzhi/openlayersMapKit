import { isDefined, isFunction, isNumber, isString, isArray } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import Style from '../../basic/Style/index'
import Interaction from '../Interaction/index'
import {type OlVectorLayerInstanceType } from '../../layer/VectorLayer/type'
import type { OlStyleInstanceType, OMapStyleLike } from '../../basic/Style/type'
import type { OlFeatureInstanceType, OlFeatureLike } from '../../core/Feature/BasicFeature/type'
import { OlInteraction, OlUtil } from '../../../source/index'
import { type OMapSelectParamsType, type OlInteractionSelectInstanceType } from './type'
import { getTargetFeature, updateSelectLayers } from './handle'

const PACKAGE_NAME = 'Select';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 地图选择类
 * @class Select
 * @classdesc 允许用户通过选择地图上的元素
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/17
 * @updateDate 2025/9/19
 */

const defaultSelectOptions = {
    layers: undefined,
    style: undefined,
    multi: false,
    features: undefined,
    filter: undefined,
    hitTolerance: 0,
}

export default class Select extends Interaction {
    /**
     * 当前选择的要素
     */
    selected: BaseFeature[] = [];
    /**
     * 当前未选择的要素
     */
    deselected: BaseFeature[] = [];

    constructor(params?: OMapSelectParamsType) {
        super("Select")
        let layers: OlVectorLayerInstanceType[] = []
        if(isDefined(params?.layers)) {
            updateSelectLayers(params.layers)
            layers = params.layers.map(l => (l._layer as OlVectorLayerInstanceType))
        }
        this._interaction = new OlInteraction.Select(Object.assign({}, defaultSelectOptions, {
            ...params,
            layers,
            style: this.initStyle(params?.style)
        }))
        // 注册事件
        this.initInteractionEvent()
        this.initSelectEvent()
    }

    /**
     * 初始化样式
     * @param {OMapStyleLike | undefined} style 样式
     */
    protected initStyle(style: OMapStyleLike | undefined): OlStyleInstanceType | Array<OlStyleInstanceType> | ((feature: OlFeatureLike, resolution: number) => (OlStyleInstanceType | undefined)) | undefined {
        let _style: OlStyleInstanceType | Array<OlStyleInstanceType> | ((feature: OlFeatureLike, resolution: number) => (OlStyleInstanceType | undefined)) | undefined = undefined
        if (isDefined(style)) {
            if (style instanceof Style) {
                _style = style.getStyle()
            } else if (isArray(style) && (style as Style[]).every(s => s instanceof Style)) {
                _style = (style as Style[]).map(s => (s.getStyle() as OlStyleInstanceType))
            } else if (isFunction(style)) {
                _style = (feature: OlFeatureLike, resolution: number) => {
                    let uid = OlUtil.getUid(feature)
                    let targetFeature = getTargetFeature(uid)
                    console.log(targetFeature)
                    let styleFnResult = (style as Function)(targetFeature, resolution)
                    return styleFnResult ? styleFnResult.getStyle() : undefined
                }
            } else {
                warn_(createMessage('initStyle', 'style格式有误'));
            }
        }
        return _style
    }

    /**
     * 初始化Select事件
     */
    protected initSelectEvent() {
        if (!this._isInitialized('initSelectEvent')) return;
        (this._interaction as OlInteractionSelectInstanceType).on("select", (e) => {
            const { selected, deselected } = e
            this.selected = selected.map(s => {
                return getTargetFeature(OlUtil.getUid(s)) as BaseFeature | null
            }).filter(f => f !== null)
            this.deselected = deselected.map(d => {
                return getTargetFeature(OlUtil.getUid(d)) as BaseFeature | null
            }).filter(f => f !== null)
        })
    }

    getSelected(): BaseFeature[] {
        return this.selected
    }

    getDeselected(): BaseFeature[] {
        return this.deselected
    }

    on() {

    }

    un() {

    }

    once() {

    }

}