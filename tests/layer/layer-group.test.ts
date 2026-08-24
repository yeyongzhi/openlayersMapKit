import { describe, expect, it } from 'vitest'
import LayerGroup from '../../src/module/layer/LayerGroup/index'
import VectorLayer from '../../src/module/layer/VectorLayer/index'

describe('LayerGroup', () => {
  it('adds and removes typed layers while maintaining group ids', () => {
    const first = new VectorLayer({ id: 'first' })
    const second = new VectorLayer({ id: 'second' })
    const group = new LayerGroup('group', [first])

    expect(group.getAll()).toEqual([first])
    expect(first.groupId).toBe('group')

    group.add(second)
    expect(group.getAll()).toEqual([first, second])
    expect(second.groupId).toBe('group')

    group.removeById('first')
    expect(group.getAll()).toEqual([second])
    expect(first.groupId).toBeNull()

    group.clear()
    expect(group.getAll()).toEqual([])
    expect(second.groupId).toBeNull()
  })

  it('does not add the same native layer twice', () => {
    const layer = new VectorLayer()
    const group = new LayerGroup([layer])

    group.add(layer)

    expect(group.getAll()).toHaveLength(1)
  })
})
