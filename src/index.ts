/**
 * 基础模块
 */
export * from './module/basic'
/**
 * 核心模块
 */
export * from './module/core'
/**
 * 图层模块
 */
export * from './module/layer'
/**
 * 数据源模块
 */
export * from './module/source'
/**
 * 交互模块
 */
export * from './module/interaction'
/**
 * 工具模块
 */
export * from './module/util'
/**
 * 控件模块
 */
export * from './module/control'

/** 公共属性字典类型。 */
export type { PropertiesType } from './utils/type'

/** 统一公开错误类型与错误码。 */
export { OMapError, OMapErrorCode, type OMapErrorCodeType } from './error'
