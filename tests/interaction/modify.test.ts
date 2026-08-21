import { describe, expect, it } from 'vitest'
import { Modify, Point, VectorLayer } from '../../src/index'

describe('Modify history', () => {
  it('honors the initial active option', () => {
    const modify = new Modify({ layer: new VectorLayer(), active: false })

    expect(modify.getActive()).toBe(false)
  })

  it('restores snapshots for features whose id is zero', () => {
    const layer = new VectorLayer()
    const point = new Point([120, 30])
    point.setId(0)
    layer.addFeature(point)
    const modify = new Modify({ layer })

    point.setCoordinates([121, 31])
    ;(modify as unknown as { pushRecord(features: Point[]): void }).pushRecord([point])
    point.setCoordinates([122, 32])

    expect(modify.revoke()).toBe(true)
    expect(point.getCoordinates().toArray()).toEqual([120, 30])
  })

  it('validates revoke steps and safely clamps oversized steps', () => {
    const layer = new VectorLayer()
    const point = new Point([120, 30])
    layer.addFeature(point)
    const modify = new Modify({ layer })

    point.setCoordinates([121, 31])
    ;(modify as unknown as { pushRecord(features: Point[]): void }).pushRecord([point])

    expect(modify.revoke(99)).toBe(true)
    expect(point.getCoordinates().toArray()).toEqual([120, 30])
    expect(() => modify.revoke(0)).toThrow(/step必须是大于0的整数/)
  })
})
