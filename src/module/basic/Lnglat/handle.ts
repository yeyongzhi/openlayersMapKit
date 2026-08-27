import { type OMapCoordinateType, type OlCoordinateType } from './type'
import { isDefined } from '../../../utils/define'
import { isArray, isAllNumberArray } from '../../../utils/dataType'
import Lnglat from './index'

export function handleGetLnglatValue(lnglat: OMapCoordinateType): OlCoordinateType
export function handleGetLnglatValue(lnglat?: undefined): undefined

export function handleGetLnglatValue(
  coordinates?: OMapCoordinateType
): OlCoordinateType | undefined {
  if (isDefined(coordinates)) {
    return coordinates instanceof Lnglat
      ? (coordinates.toArray() as OlCoordinateType)
      : (coordinates as OlCoordinateType)
  }
  return undefined
}

/**
 * 判断是否为坐标叶子节点：Lnglat 实例或纯数字数组（[x, y] / [x, y, z]）。
 */
function isLeafCoordinate(value: unknown): value is OMapCoordinateType {
  if (value instanceof Lnglat) {
    return true
  }
  return isArray(value) && isAllNumberArray(value)
}

/**
 * 递归归一化坐标的内部实现（无重载，避免递归时的重载解析冲突）。
 * 将任意嵌套层级的 OMapCoordinateType（含 Lnglat 实例）转换为
 * OpenLayers 原生 OlCoordinateType 数组结构：叶子节点经 handleGetLnglatValue
 * 转换，中间数组递归 map。
 */
function normalizeCoordinatesDeep(
  coordinates:
    OMapCoordinateType | OMapCoordinateType[] | OMapCoordinateType[][] | OMapCoordinateType[][][]
): OlCoordinateType | OlCoordinateType[] | OlCoordinateType[][] | OlCoordinateType[][][] {
  if (isLeafCoordinate(coordinates)) {
    return handleGetLnglatValue(coordinates)
  }
  // 非叶子节点：递归归一化每一项。运行时保证同层元素层级一致，
  // 故结果必为 OlCoordinateType[] / [][] / [][][] 之一。
  return (
    coordinates as Array<OMapCoordinateType | OMapCoordinateType[] | OMapCoordinateType[][]>
  ).map((item) =>
    normalizeCoordinatesDeep(
      item as OMapCoordinateType | OMapCoordinateType[] | OMapCoordinateType[][]
    )
  ) as OlCoordinateType[] | OlCoordinateType[][] | OlCoordinateType[][][]
}

/**
 * 递归归一化坐标：将任意嵌套层级的 OMapCoordinateType（含 Lnglat 实例）
 * 转换为 OpenLayers 原生 OlCoordinateType 数组结构。
 * 叶子节点经 handleGetLnglatValue 转换；中间数组递归 map。
 * 消除各 Geometry 子类 `_init` / `setCoordinates` 中重复的 map 回调。
 */
export function normalizeCoordinates(coordinates: OMapCoordinateType): OlCoordinateType
export function normalizeCoordinates(coordinates: OMapCoordinateType[]): OlCoordinateType[]
export function normalizeCoordinates(coordinates: OMapCoordinateType[][]): OlCoordinateType[][]
export function normalizeCoordinates(coordinates: OMapCoordinateType[][][]): OlCoordinateType[][][]
export function normalizeCoordinates(
  coordinates:
    OMapCoordinateType | OMapCoordinateType[] | OMapCoordinateType[][] | OMapCoordinateType[][][]
): OlCoordinateType | OlCoordinateType[] | OlCoordinateType[][] | OlCoordinateType[][][] {
  return normalizeCoordinatesDeep(coordinates)
}
