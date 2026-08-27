import { defaultValue, isDefined, isFunction } from '../../../../utils/index'
import { commonMessage, error_, getPackageMessage } from '../../../../utils/message'
import { OlEvent } from '../../../../source/index'
import Event from '../../../util/Event/index'
import type { EventIdType } from '../../../util/Event/type'
import type Interaction from '../../../interaction/Interaction/index'
import type { OMapInteractionCommonType } from '../../../interaction/Interaction/type'
import type Map from '../index'
import {
  OMapMapInteractionIgnoreEventTypes,
  type OlMapEventPayload,
  type OMapEventCallBack,
  type OMapEventTarget,
  type OMapEventType,
  type OMapMapType,
  type OMapViewType
} from '../type'
import {
  MapEventTypeIsMap,
  handleMapOnCallBack,
  isMapDrawing,
  isMapMeasuring,
  isOMapMapEventType
} from '../handle'

const createMessage = getPackageMessage('Map')

/** Bridges native Map/View events to the public OMap event bus. */
export default class EventAdapter {
  private readonly events: Event<Record<OMapEventType, [OMapEventTarget]>>

  constructor(
    private readonly owner: Map,
    private readonly getNativeMap: () => OMapMapType,
    private readonly getNativeView: () => OMapViewType,
    private readonly getInteractions: () => Interaction<OMapInteractionCommonType>[]
  ) {
    this.events = new Event<Record<OMapEventType, [OMapEventTarget]>>(owner)
  }

  on(type: OMapEventType, callback: OMapEventCallBack): EventIdType {
    this.validate(type, callback, 'on')
    return this.listen(type, callback, false)
  }

  once(type: OMapEventType, callback: OMapEventCallBack): EventIdType {
    this.validate(type, callback, 'once')
    return this.listen(type, callback, true)
  }

  un(id: EventIdType): void {
    if (!isDefined(id)) error_(createMessage('un', commonMessage.paramsNotDefined('id')))
    this.events.remove(id)
  }

  dispose(): void {
    this.events.dispose()
  }

  private listen(type: OMapEventType, callback: OMapEventCallBack, once: boolean): EventIdType {
    const isMapTarget = MapEventTypeIsMap(type)
    const target = isMapTarget ? this.getNativeMap() : this.getNativeView()
    const nativeType = isMapTarget ? type.replace('map:', '') : type.replace('view:', '')
    let id: EventIdType | undefined
    const unlisten = OlEvent.listen(
      target,
      nativeType,
      (event: OlMapEventPayload) => {
        const interactions = defaultValue(this.getInteractions(), [])
        const isInteracting = isMapMeasuring(interactions) || isMapDrawing(interactions)
        if (isInteracting && OMapMapInteractionIgnoreEventTypes.includes(type)) return false
        callback.call(this.owner, handleMapOnCallBack(this.owner, type, event))
        if (once && id) this.events.remove(id)
      },
      once ? target : undefined,
      once
    )
    id = once
      ? this.events.once(type, callback, unlisten)
      : this.events.on(type, callback, unlisten)
    return id
  }

  private validate(type: OMapEventType, callback: OMapEventCallBack, methodName: string): void {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage(methodName, commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapMapEventType(type)) {
      error_(createMessage(methodName, commonMessage.paramsInvaildEnum('type')))
    }
    if (!isFunction(callback)) {
      error_(createMessage(methodName, commonMessage.paramsInvaildFormat('callback', 'function')))
    }
  }
}
