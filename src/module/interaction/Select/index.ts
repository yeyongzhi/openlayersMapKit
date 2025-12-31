import { isDefined, isFunction, isNumber, isString, isArray } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import Style from '../../basic/Style/index'
import Interaction from '../Interaction/index'
import Event from '../../util/Event/index'
import VectorLayer from '../../layer/VectorLayer/index'
import {type OlVectorLayerInstanceType } from '../../layer/VectorLayer/type'
import type { OlStyleInstanceType, OMapStyleLike } from '../../basic/Style/type'
import type { OlFeatureInstanceType, OlFeatureLike } from '../../core/Feature/BasicFeature/type'
import { OlGeometry, OlInteraction, OlUtil } from '../../../source/index'
import { type OMapSelectParamsType, type OlInteractionSelectInstanceType, type OMapSelectEventType } from './type'
import { getTargetFeature, updateSelectLayers, updateSelectFeatures, handleSelectEvent } from './handle'

const PACKAGE_NAME = 'Select';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 地图选择类
 * @class Select
 * @classdesc 允许用户通过选择地图上的元素
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/17
 * @updateDate 2025/12/29
 */

const defaultSelectOptions = {
    layers: undefined,
    style: undefined,
    multi: false, // 当为true的时候，支持一次选择n个重叠的要素
    features: undefined,
    filter: undefined,
    hitTolerance: 0,
}

export default class Select extends Interaction {
    /**
     * 当前选择的要素
     */
    selected: BaseFeature<OlGeometry.Geometry>[] = [];
    /**
     * 当前未选择的要素
     */
    deselected: BaseFeature<OlGeometry.Geometry>[] = [];

    constructor(params?: OMapSelectParamsType) {
        super("Select")
        let layers: OlVectorLayerInstanceType[] = []
        // layers的优先级低于features
        if(isDefined(params?.layers)) {
            updateSelectLayers(params.layers)
            layers = params.layers.map(l => (l._layer as OlVectorLayerInstanceType))
        }
        if(isDefined(params?.features)) {
            updateSelectFeatures(params.features)
        }
        this._interaction = new OlInteraction.Select(Object.assign({}, defaultSelectOptions, {
            ...params,
            layers,
            style: this.initStyle(params?.style),
            filter: this.initFilter(params?.filter),
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
                    let styleFnResult = (style as Function)(targetFeature, resolution)
                    return styleFnResult ? styleFnResult.getStyle() : undefined
                }
            } else {
                warn_(createMessage('initStyle', 'style格式有误'));
            }
        }
        return _style
    }

    protected initFilter(filter: ((feature: BaseFeature<OlGeometry.Geometry>, layer: VectorLayer) => boolean) | undefined): ((feature: OlFeatureLike, layer: OlVectorLayerInstanceType) => boolean) | undefined {
        if(isDefined(filter)) {
            return (feature: OlFeatureLike, layer: OlVectorLayerInstanceType) => {
                let targetFeature = getTargetFeature(OlUtil.getUid(feature))
                let targetLayer = this.map?.getAllLayers().find(l => OlUtil.getUid(l._layer) === OlUtil.getUid(layer))
                return filter(targetFeature as BaseFeature<OlGeometry.Geometry>, targetLayer as VectorLayer)
            }
        } else {
            return undefined
        }
    }

    /**
     * 初始化Select事件
     */
    protected initSelectEvent() {
        if (!this._isInitialized('initSelectEvent')) return;
        (this._interaction as OlInteractionSelectInstanceType).on("select", (e) => {
            const { selected, deselected } = e
            this.selected = selected.map(s => {
                return getTargetFeature(OlUtil.getUid(s)) as BaseFeature<OlGeometry.Geometry> | null
            }).filter(f => f !== null)
            this.deselected = deselected.map(d => {
                return getTargetFeature(OlUtil.getUid(d)) as BaseFeature<OlGeometry.Geometry> | null
            }).filter(f => f !== null)
        })
    }

    getSelected(): BaseFeature<OlGeometry.Geometry>[] {
        return this.selected
    }

    getDeselected(): BaseFeature<OlGeometry.Geometry>[] {
        return this.deselected
    }

    on(type: OMapSelectEventType, callback: () => void): number | string | undefined {
        if (!this._isInitialized('on')) return;
        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('on', '参数不能为空'));
            return;
        }
        let list = (this.events as Event).get(type);
        if (!isDefined(list) || list.length === 0) {
            (this._interaction as OlInteractionSelectInstanceType).on(type, (e: any) => {
                (this.events as Event).emit(type, Object.assign({}, handleSelectEvent(this, type, e), {
                    selected: this.selected,
                    deselected: this.deselected,
                }))
            })
        }
        const id = (this.events as Event).on(type, callback)
        return id
    }

    un(id: number | string): void {
        if (!this._isInitialized('un')) return;
        if (!isDefined(id)) {
            warn_(createMessage('un', '参数不能为空'));
            return;
        }
        if (!isNumber(id) && !isString(id)) {
            warn_(createMessage('un', '事件ID应为number或string类型'));
            return;
        }
        (this.events as Event).remove(id)
    }

    once(type: OMapSelectEventType, callback: () => void): number | string | undefined {
        if (!this._isInitialized('on')) return;
        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('on', '参数不能为空'));
            return;
        }
        let list = (this.events as Event).get(type);
        if (!isDefined(list) || list.length === 0) {
            (this._interaction as OlInteractionSelectInstanceType).on(type, (e: any) => {
                (this.events as Event).emit(type, Object.assign({}, handleSelectEvent(this, type, e), {
                    selected: this.selected,
                    deselected: this.deselected,
                }))
            })
        }
        const id = (this.events as Event).once(type, callback)
        return id
    }

}