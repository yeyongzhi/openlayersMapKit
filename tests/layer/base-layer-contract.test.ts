import { describe, expect, it, vi } from 'vitest'
import { Extent, OMapError, OMapErrorCode, TileLayer } from '../../src/index'
import { OlSource } from '../../src/source/index'

function createLayer() {
  return new TileLayer({
    id: 'base-layer',
    name: 'Base layer',
    className: 'base-class',
    opacity: 0.75,
    visible: true,
    extent: new Extent([0, 1, 2, 3]),
    minZoom: 1,
    maxZoom: 20,
    minResolution: 2,
    maxResolution: 200,
    zIndex: 3,
    properties: { custom: 'initial' },
    source: new OlSource.XYZ({ url: 'https://example.com/{z}/{x}/{y}.png' }),
    preload: 0,
    useInterimTilesOnError: true,
    cacheSize: 512
  })
}

function expectInvalidParameter(operation: () => void) {
  try {
    operation()
    throw new Error('Expected operation to throw')
  } catch (error) {
    expect(error).toBeInstanceOf(OMapError)
    expect((error as OMapError).code).toBe(OMapErrorCode.InvalidParameter)
  }
}

describe('BaseLayer state contract', () => {
  it('applies construction options to wrapper and native state', () => {
    const layer = createLayer()

    expect(layer.getId()).toBe('base-layer')
    expect(layer.getName()).toBe('Base layer')
    expect(layer.getClassName()).toBe('base-class')
    expect(layer.getOpacity()).toBe(0.75)
    expect(layer.getVisible()).toBe(true)
    expect(layer.getExtent()?.toArray()).toEqual([0, 1, 2, 3])
    expect(layer.getMinZoom()).toBe(1)
    expect(layer.getMaxZoom()).toBe(20)
    expect(layer.getMinResolution()).toBe(2)
    expect(layer.getMaxResolution()).toBe(200)
    expect(layer.getZIndex()).toBe(3)
    expect(layer.getProperties()).toMatchObject({ custom: 'initial' })
  })

  it('updates native state and cached propertychange state', () => {
    const layer = createLayer()

    layer.setId(42)
    layer.setName('Updated')
    layer.setClassName('updated-class')
    layer.setOpacity(0.5)
    layer.setVisible(false)
    layer.setExtent([4, 5, 6, 7])
    layer.setMinZoom(2)
    layer.setMaxZoom(18)
    layer.setMinResolution(4)
    layer.setMaxResolution(100)
    layer.setZIndex(9)

    expect(layer.getId()).toBe(42)
    expect(layer.getName()).toBe('Updated')
    expect(layer.getClassName()).toBe('updated-class')
    expect(layer.opacity).toBe(0.5)
    expect(layer.visible).toBe(false)
    expect(layer.extent?.toArray()).toEqual([4, 5, 6, 7])
    expect(layer.minZoom).toBe(2)
    expect(layer.maxZoom).toBe(18)
    expect(layer.minResolution).toBe(4)
    expect(layer.maxResolution).toBe(100)
    expect(layer.zIndex).toBe(9)
  })

  it('merges properties and returns an isolated snapshot', () => {
    const layer = createLayer()
    layer.setProperties({ another: 2 })

    const properties = layer.getProperties()
    expect(properties).toMatchObject({ custom: 'initial', another: 2 })
    if (properties) properties.custom = 'changed'

    expect(layer.getProperties()).toMatchObject({ custom: 'initial', another: 2 })
  })

  it('returns undefined when the native layer has no extent', () => {
    const layer = createLayer()
    layer.getLayer().setExtent(undefined)

    expect(layer.getExtent()).toBeUndefined()
  })

  it('rejects missing and invalid setter inputs', () => {
    const layer = createLayer()
    const invalidCalls = [
      () => layer.setName(undefined as unknown as string),
      () => layer.setName(1 as unknown as string),
      () => layer.setClassName(undefined as unknown as string),
      () => layer.setClassName(1 as unknown as string),
      () => layer.setOpacity(undefined as unknown as number),
      () => layer.setOpacity(2),
      () => layer.setVisible(undefined as unknown as boolean),
      () => layer.setVisible('yes' as unknown as boolean),
      () => layer.setExtent(undefined as unknown as Extent),
      () => layer.setExtent('invalid' as unknown as Extent),
      () => layer.setMinZoom(undefined as unknown as number),
      () => layer.setMinZoom('1' as unknown as number),
      () => layer.setMaxZoom(undefined as unknown as number),
      () => layer.setMaxZoom('20' as unknown as number),
      () => layer.setMinResolution(undefined as unknown as number),
      () => layer.setMinResolution('2' as unknown as number),
      () => layer.setMaxResolution(undefined as unknown as number),
      () => layer.setMaxResolution('200' as unknown as number),
      () => layer.setZIndex(undefined as unknown as number),
      () => layer.setZIndex('3' as unknown as number),
      () => layer.setProperties(undefined as never),
      () => layer.setProperties('invalid' as never)
    ]

    for (const invalidCall of invalidCalls) expectInvalidParameter(invalidCall)
  })
})

describe('BaseLayer lifecycle contract', () => {
  it('delegates removal to its current target', () => {
    const layer = createLayer()
    const removeLayer = vi.fn()
    layer.setTarget({ removeLayer } as never)

    layer.remove()

    expect(removeLayer).toHaveBeenCalledOnce()
    expect(removeLayer).toHaveBeenCalledWith(layer)
  })

  it('clears a target without a removal hook', () => {
    const layer = createLayer()
    layer.setTarget({ type: 'holder' })

    layer.remove()

    expect(layer.getTarget()).toBeNull()
  })

  it('disposes the native layer exactly once', () => {
    const layer = createLayer()
    const nativeDispose = vi.spyOn(layer.getLayer(), 'dispose')

    layer.dispose()
    layer.dispose()

    expect(layer.isDisposed()).toBe(true)
    expect(nativeDispose).toHaveBeenCalledOnce()
  })

  it('rejects mutation and native access after disposal', () => {
    const layer = createLayer()
    layer.dispose()

    const operations = [
      () => layer.getLayer(),
      () => layer.getSource(),
      () => layer.setId('new-id'),
      () => layer.setName('new-name'),
      () => layer.setClassName('new-class'),
      () => layer.setOpacity(0.5),
      () => layer.setVisible(false),
      () => layer.setExtent([0, 0, 1, 1]),
      () => layer.setMinZoom(1),
      () => layer.setMaxZoom(10),
      () => layer.setMinResolution(1),
      () => layer.setMaxResolution(10),
      () => layer.setZIndex(1),
      () => layer.setProperties({ custom: 'changed' }),
      () => layer.setTarget(null),
      () => layer.remove()
    ]

    for (const operation of operations) {
      try {
        operation()
        throw new Error('Expected operation to throw')
      } catch (error) {
        expect(error).toBeInstanceOf(OMapError)
        expect((error as OMapError).code).toBe(OMapErrorCode.Disposed)
      }
    }
  })
})
