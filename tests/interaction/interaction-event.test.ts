import { describe, expect, it } from 'vitest'
import { handleInteractionActiveChangeEvent } from '../../src/module/interaction/handle'

describe('shared interaction state events', () => {
  it('returns the current value for an initial active event', () => {
    const target = { getActive: () => true }

    expect(
      handleInteractionActiveChangeEvent(target, 'change:active', {
        key: 'active'
      })
    ).toEqual({
      target,
      type: 'change:active',
      key: 'active',
      value: true
    })
  })

  it('preserves false as an old value and reports the new active state', () => {
    const target = { getActive: () => true }

    expect(
      handleInteractionActiveChangeEvent(target, 'propertychange', {
        key: 'active',
        oldValue: false
      })
    ).toEqual({
      target,
      type: 'propertychange',
      key: 'active',
      oldValue: false,
      newValue: true
    })
  })
})
