import { describe, expect, it } from 'vitest'
import { Color, LineString, Pixel, Point, Polygon, Size, Style } from '../../src/index'
import {
  DEFAULT_STYLE,
  getOlCircleSingleStyle,
  getOlFillSingleStyle,
  getOlGeometryStyle,
  getOlIconSingleStyle,
  getOlRegularShapeSingleStyle,
  getOlStrokeSingleStyle,
  getOlTextSingleStyle,
  handleGetStyleValue
} from '../../src/module/basic/Style/handle'

describe('Style helpers', () => {
  it('normalizes individual style option families', () => {
    const color = new Color('#ff0000')
    expect(getOlFillSingleStyle({ color })?.getColor()).toBe('rgb(255, 0, 0)')
    expect(getOlStrokeSingleStyle({ color, width: 2 })?.getWidth()).toBe(2)
    expect(
      getOlCircleSingleStyle({ radius: 6, fill: { color }, stroke: { color: '#000000' } })
        ?.getFill()
        ?.getColor()
    ).toBe('rgb(255, 0, 0)')
    expect(
      getOlRegularShapeSingleStyle({
        points: 4,
        radius: 8,
        fill: { color },
        stroke: { color: '#000000' }
      })?.getPoints()
    ).toBe(4)
    expect(
      getOlIconSingleStyle({
        src: 'data:image/png;base64,AA==',
        color,
        offset: new Pixel(1, 2),
        size: new Size(3, 4)
      })?.getSize()
    ).toEqual([3, 4])
    expect(
      getOlTextSingleStyle({
        text: 'station',
        fill: { color },
        stroke: { color: '#000000', width: 1 },
        backgroundFill: { color: '#ffffff' },
        backgroundStroke: { color: '#333333' },
        scale: new Size(2, 3)
      })?.getScaleArray()
    ).toEqual([2, 3])

    expect(getOlFillSingleStyle(undefined)).toBeUndefined()
    expect(getOlStrokeSingleStyle({})).toBeUndefined()
    expect(getOlCircleSingleStyle(undefined)).toBeUndefined()
    expect(getOlIconSingleStyle(undefined)).toBeUndefined()
    expect(getOlRegularShapeSingleStyle(undefined)).toBeUndefined()
    expect(getOlTextSingleStyle(undefined)).toBeUndefined()
  })

  it('normalizes Style wrappers, arrays, callbacks and geometry resolvers', () => {
    const point = new Point([120, 30])
    const first = new Style({ fill: { color: 'red' } })
    const second = new Style({ stroke: { color: 'blue', width: 2 } })

    expect(handleGetStyleValue(first)).toBe(first.getStyle())
    expect(handleGetStyleValue([first, second])).toEqual([first.getStyle(), second.getStyle()])
    expect(handleGetStyleValue(undefined)).toBeUndefined()

    const callback = handleGetStyleValue(() => first)
    expect(typeof callback).toBe('function')
    expect(callback?.(point.getFeature(), 1)).toBe(first.getStyle())

    const arrayCallback = handleGetStyleValue(() => [first, second])
    expect(arrayCallback?.(point.getFeature(), 1)).toEqual([first.getStyle(), second.getStyle()])

    expect(getOlGeometryStyle('geometry')).toBe('geometry')
    const geometry = getOlGeometryStyle((feature) => feature)
    expect(geometry?.(point.getFeature())).toBe(point.getGeometry())
  })

  it('provides defaults for common geometry types', () => {
    expect(
      DEFAULT_STYLE(new Point([0, 0]), 1)
        ?.getStyle()
        .getImage()
    ).toBeDefined()
    expect(
      DEFAULT_STYLE(
        new LineString([
          [0, 0],
          [1, 1]
        ]),
        1
      )
        ?.getStyle()
        .getStroke()
    ).toBeDefined()
    expect(
      DEFAULT_STYLE(
        new Polygon([
          [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 0]
          ]
        ]),
        1
      )
        ?.getStyle()
        .getFill()
    ).toBeDefined()
  })
})
