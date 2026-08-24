import { describe, expect, it } from 'vitest'
import { Lnglat } from '../../src/index'
import { normalizeCoordinates } from '../../src/module/basic/Lnglat/handle'

/**
 * 批次 B / 阶段 4：normalizeCoordinates 抽取后的回归保护。
 * 覆盖各嵌套深度，以及 Lnglat 实例与 [x, y] 数组混合输入，
 * 确保归一化后叶子均为 OpenLayers 原生 number[]、且结构层级保持不变。
 */
describe('normalizeCoordinates (批次 B 坐标归一化抽取)', () => {
  it('depth 0：Lnglat 实例转 number[] 且不持有同一引用', () => {
    const lnglat = new Lnglat(120, 30)
    const normalized = normalizeCoordinates(lnglat)

    expect(normalized).toEqual([120, 30])
    expect(normalized).not.toBe(lnglat.toArray())
  })

  it('depth 0：原生 [x, y] 数组透传为 number[]', () => {
    const normalized = normalizeCoordinates([120, 30])

    expect(normalized).toEqual([120, 30])
    expect(Array.isArray(normalized)).toBe(true)
  })

  it('depth 1：LineString / LinearRing / MultiPoint 结构（含 Lnglat 与数组混合）', () => {
    const input = [new Lnglat(120, 30), [121, 31]] as const
    const normalized = normalizeCoordinates(input as any)

    expect(normalized).toEqual([
      [120, 30],
      [121, 31],
    ])
    expect(normalized).not.toBe(input)
    // 叶子节点不应是 Lnglat 实例
    expect(normalized[0]).not.toBeInstanceOf(Lnglat)
  })

  it('depth 2：Polygon / MultiLineString 结构（含 Lnglat 与数组混合）', () => {
    const input = [
      [new Lnglat(120, 30), [121, 30], [121, 31], new Lnglat(120, 30)],
    ]
    const normalized = normalizeCoordinates(input as any)

    expect(normalized).toEqual([
      [
        [120, 30],
        [121, 30],
        [121, 31],
        [120, 30],
      ],
    ])
    expect(normalized).not.toBe(input)
  })

  it('depth 3：MultiPolygon 结构（最深嵌套）', () => {
    const input = [
      [
        [
          new Lnglat(120, 30),
          [121, 30],
          [121, 31],
          new Lnglat(120, 30),
        ],
      ],
    ]
    const normalized = normalizeCoordinates(input as any)

    expect(normalized).toEqual([
      [
        [
          [120, 30],
          [121, 30],
          [121, 31],
          [120, 30],
        ],
      ],
    ])
    expect(normalized).not.toBe(input)
  })

  it('保留嵌套层级：不会拍平或加深结构', () => {
    const depth1 = normalizeCoordinates([[1, 2], [3, 4]] as any)
    const depth2 = normalizeCoordinates([[[1, 2], [3, 4]]] as any)
    const depth3 = normalizeCoordinates([[[[1, 2], [3, 4]]]] as any)

    expect(depth1).toEqual([
      [1, 2],
      [3, 4],
    ])
    expect(depth2).toEqual([[[1, 2], [3, 4]]])
    expect(depth3).toEqual([[[[1, 2], [3, 4]]]])
  })

  it('与各 Geometry _init 行为等价：Lnglat 叶子经 toArray 解包', () => {
    // 模拟 Point 从 Lnglat 构造
    const pointCoords = normalizeCoordinates(new Lnglat(119, 28))
    expect(pointCoords).toEqual([119, 28])

    // 模拟 MultiPoint 从混合输入构造
    const multiPointCoords = normalizeCoordinates([
      new Lnglat(119, 28),
      [120, 30],
    ] as any)
    expect(multiPointCoords).toEqual([
      [119, 28],
      [120, 30],
    ])
  })
})
