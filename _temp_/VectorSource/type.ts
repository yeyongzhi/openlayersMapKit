import BasicFeature from "../../core/Feature/BasicFeature/index";
import { OlSource, OlGeometry } from "../../../source/index";
import type { ManualOmit } from "../../../utils/type";
import {
  type OMapSourceParamsType,
  DEFAULT_SOURCE_PARAMS,
  type OMapSourceParamsCommonKey,
} from "../Source/type";

export type OMapVectorSourceType = OlSource.Vector;

export type OMapVectorSourceParamsType = {
    attributions?: string | string[];
    attributionsCollapsible: boolean;
    features: Array<BasicFeature<OlGeometry.Geometry>>;
    format: any;
    loader: any;
    overlaps: boolean;
    strategy?: any;
    url?: string;
    useSpatialIndex: boolean;
    wrapX: boolean;
}

export const DEFAULT_VECTOR_SOURCE_PARAMS: OMapVectorSourceParamsType = Object.assign({}, DEFAULT_SOURCE_PARAMS, {
    features: [],
    format: null,
    loader: null,
    overlaps: true,
    useSpatialIndex: true,
    wrapX: true,
})
