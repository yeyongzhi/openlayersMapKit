import { isDefined } from '../../../../utils/index'
import { commonMessage, error_, getPackageMessage, warn_ } from '../../../../utils/message'
import { OlUtil } from '../../../../source/index'
import Interaction from '../../../interaction/Interaction/index'
import {
  isVaildInteraction,
  type OMapInteractionCommonType,
  type OMapInteractionIdType
} from '../../../interaction/Interaction/type'
import Draw from '../../../interaction/Draw/index'
import Measure from '../../../interaction/Measure/index'
import VectorLayer from '../../../layer/VectorLayer/index'
import type Map from '../index'
import type { OMapMapType } from '../type'

const createMessage = getPackageMessage('Map')
type ManagedInteraction = Interaction<OMapInteractionCommonType>

/** Owns Interaction state, native mounting and Draw/Measure companion layers. */
export default class InteractionManager {
  private readonly interactions: ManagedInteraction[] = []

  constructor(
    private readonly owner: Map,
    private readonly getNativeMap: () => OMapMapType
  ) {}

  add(interaction: ManagedInteraction): void {
    this.validate(interaction)
    if (this.findIndex(interaction) !== -1) {
      warn_(createMessage('addInteraction', '该交互已添加到地图中'))
      return
    }

    this.mountCompanionLayer(interaction)
    const nativeInteraction = interaction.getInteraction()
    this.interactions.push(interaction)
    this.getNativeMap().addInteraction(nativeInteraction)
    interaction.setMap(this.owner)
    interaction.setActive(true)
    nativeInteraction.dispatchEvent('change:active')
  }

  getAll(): ManagedInteraction[] {
    return this.interactions
  }

  getById(id: OMapInteractionIdType): ManagedInteraction | null {
    return this.interactions.find((interaction) => interaction.getId() === id) ?? null
  }

  remove(interaction: ManagedInteraction): void {
    this.validate(interaction)
    const index = this.findIndex(interaction)
    if (index === -1) {
      warn_(createMessage('removeInteraction', '该交互未添加到地图中'))
      return
    }

    this.unmountCompanionLayer(interaction)
    this.interactions.splice(index, 1)
    this.getNativeMap().removeInteraction(interaction.getInteraction())
    interaction.setMap(null)
  }

  disposeAll(): void {
    ;[...this.interactions].forEach((interaction) => interaction.dispose())
  }

  private validate(interaction: ManagedInteraction): void {
    if (!isDefined(interaction)) {
      error_(createMessage('addInteraction', commonMessage.paramsNotDefined('interaction')))
    }
    if (!isVaildInteraction(interaction)) {
      error_(
        createMessage(
          'addInteraction',
          commonMessage.paramsInvaildFormat('interaction', 'Interaction类型')
        )
      )
    }
  }

  private findIndex(interaction: ManagedInteraction): number {
    return this.interactions.findIndex((candidate) => {
      if (isDefined(interaction.getId())) {
        return interaction.getId() === candidate.getId()
      }
      return (
        OlUtil.getUid(candidate.getInteraction()) === OlUtil.getUid(interaction.getInteraction())
      )
    })
  }

  private mountCompanionLayer(interaction: ManagedInteraction): void {
    if (!(interaction instanceof Draw) && !(interaction instanceof Measure)) return
    const layer = interaction.getLayer()
    if (isDefined<VectorLayer>(layer)) {
      layer.setTarget(interaction)
      this.owner.addLayer(layer)
    }
  }

  private unmountCompanionLayer(interaction: ManagedInteraction): void {
    if (!(interaction instanceof Draw) && !(interaction instanceof Measure)) return
    const layer = interaction.getLayer()
    if (isDefined<VectorLayer>(layer)) {
      layer.setTarget(null)
      this.owner.removeLayer(layer)
    }
  }
}
