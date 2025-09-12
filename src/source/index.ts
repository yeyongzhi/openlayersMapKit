import * as OlPackage from 'ol'
import * as OlLayer from "ol/layer";
import * as OlSource from 'ol/source';
import * as OlProj from 'ol/proj';
import * as OlInteraction from 'ol/interaction';
import * as OlUtil from 'ol/util';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import * as OlGeometry from 'ol/geom';
import * as OlStyle from 'ol/style'
import RenderFeature from 'ol/render/Feature'
import * as OlCoordinate from 'ol/coordinate';
import * as OlSphere from 'ol/sphere';
import type { Coordinate } from 'ol/coordinate'
import type { Extent as OlExtentType } from 'ol/extent'
import { createBox, createRegularPolygon } from 'ol/interaction/Draw';

import * as OlObservable from 'ol/Observable';

export default OlPackage;
export {
    OlLayer,
    OlSource,
    OlProj,
    OlInteraction,
    OlUtil,
    Feature as OlFeature,
    Overlay as OlOverlay,
    OlGeometry,
    OlStyle,
    RenderFeature,
    OlCoordinate,
    OlSphere,
    type Coordinate,
    type OlExtentType,
    createBox as OlDrawCreateBox,
    createRegularPolygon as OlDrawCreateRegularPolygon,
    OlObservable
}