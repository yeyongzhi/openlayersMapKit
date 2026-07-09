# LayerGroup

`LayerGroup` 是 OMap 的业务图层分组工具，用于批量保存、添加、移除多个 `BaseLayer` 实例。

它不是 `ol/layer/Group` 的原生封装，不会创建 OpenLayers 的 Group layer。当前语义是：

- `Map.addLayerGroup(group)` 会把组内每个 layer 添加到 map。
- `Map.removeLayerGroup(group)` 会把组内每个 layer 从 map 移除。
- `LayerGroup` 维护 `groupId`、`layers` 和所属 `map`，方便业务侧做分组管理。

如果后续需要 OpenLayers 原生图层组能力，应新增独立封装，而不是改变当前 `LayerGroup` 的业务语义。
