import * as OlPackage from 'ol'
import * as OlLayer from "ol/layer";
import * as OlSource from 'ol/source';
import * as OlProj from 'ol/proj';
import * as OlUtil from 'ol/util';
import Feature from 'ol/Feature';
import * as OlGeometry from 'ol/geom';
import * as OlStyle from 'ol/style'
import RenderFeature from 'ol/render/Feature'
import * as OlCoordinate from 'ol/coordinate';
import type { Coordinate } from 'ol/coordinate'
import type { Extent as OlExtentType } from 'ol/extent'





export default OlPackage;
export {
    OlLayer,
    OlSource,
    OlProj,
    OlUtil,
    Feature as OlFeature,
    OlGeometry,
    OlStyle,
    RenderFeature,
    OlCoordinate,
    type Coordinate,
    type OlExtentType,
}