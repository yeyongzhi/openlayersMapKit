# Format

> 稳定性：`stable-beta`

格式化工具，在要素与 GeoJSON / WKT / KML 等格式之间做读写转换。

## 引入

```ts
import { Format } from 'omap'
```

源码：`src/module/util/Format/index.ts`

## 构造

```ts
new Format(type: string, options: OMapFormatGeoJSONOptions)
new Format(type: string, options?: OMapFormatWKTOptions)
new Format(type: string, options?: OMapFormatKMLOptions)
```

## 属性

| 属性                             | 说明 |
| -------------------------------- | ---- |
| `options: OMapFormatOptionsType` | —    |
| `type: string`                   | —    |

## 方法

| 方法                                                                                                                                  | 说明 |
| ------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `readFeature(source: unknown, options?: OMapFormatReadFeatureOptionsType): unknown`                                                   | —    |
| `readFeatures(source: unknown, options?: OMapFormatReadFeatureOptionsType): unknown`                                                  | —    |
| `writeFeature(feature: BasicFeature<OlGeometryType, PropertiesType>, options?: OMapFormatWriteFeatureOptionsType): string`            | —    |
| `writeFeatureObject(feature: BasicFeature<OlGeometryType, PropertiesType>, options?: OMapFormatWriteFeatureOptionsType): unknown`     | —    |
| `writeFeatures(features: BasicFeature<OlGeometryType, PropertiesType>[], options?: OMapFormatWriteFeatureOptionsType): string`        | —    |
| `writeFeaturesNode(features: BasicFeature<OlGeometryType, PropertiesType>[], options?: OMapFormatWriteFeatureOptionsType): unknown`   | —    |
| `writeFeaturesObject(features: BasicFeature<OlGeometryType, PropertiesType>[], options?: OMapFormatWriteFeatureOptionsType): unknown` | —    |

## 说明与注意点

- 构造第一个参数为格式类型，见 [`FormatType`](./FormatType.md)；第二个参数为该格式的读写选项。
- `writeFeature()` 返回字符串，`writeFeatureObject()` 返回对象形态，便于二次处理。
- 读取方法接受字符串或对象输入，具体形态取决于目标格式。

## 示例

```ts
const geojson = new Format(FormatType.GeoJSON)

const text = geojson.writeFeature(point)
const restored = geojson.readFeature(text)
```

## 相关

- 要素：[Point](../core/Point.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
