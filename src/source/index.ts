import * as OlPackage from 'ol'
import * as OlLayer from 'ol/layer.js'
import * as OlSource from 'ol/source.js'
import * as OlProj from 'ol/proj.js'
import * as OlInteraction from 'ol/interaction.js'
import * as OlUtil from 'ol/util.js'
import Feature from 'ol/Feature.js'
import Overlay from 'ol/Overlay.js'
import * as OlGeometry from 'ol/geom.js'
import * as OlStyle from 'ol/style.js'
export {
  default as RenderFeature,
  toFeature as OlRenderFeaturetoFeature,
  toGeometry as OlRenderFeaturetoGeometry
} from 'ol/render/Feature.js'
import * as OlCoordinate from 'ol/coordinate.js'
import * as OlSphere from 'ol/sphere.js'
import type { Coordinate } from 'ol/coordinate.js'
import type { Extent as OlExtentType } from 'ol/extent.js'
export {
  createBox as OlDrawCreateBox,
  createRegularPolygon as OlDrawCreateRegularPolygon
} from 'ol/interaction/Draw.js'
import * as OlTileGrid from 'ol/tilegrid.js'
import * as OlFormat from 'ol/format.js'
import * as OlControl from 'ol/control.js'
import * as OlEasing from 'ol/easing.js'
export { default as OlTarget } from 'ol/events/Target.js'
import { listen, unlistenByKey } from 'ol/events.js'

const OlEvent = {
  listen,
  unlistenByKey
}

/**
 * basic
 */
import * as OlExtent from 'ol/extent.js'

import * as OlObservable from 'ol/Observable.js'

export default OlPackage
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
  OlCoordinate,
  OlSphere,
  type Coordinate,
  type OlExtentType,
  OlObservable,
  OlTileGrid,
  OlExtent,
  OlFormat,
  OlControl,
  OlEasing,
  OlEvent
}
