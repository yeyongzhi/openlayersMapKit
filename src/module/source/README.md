Source
├── ImageSource
│   ├── ImageStatic
│   ├── ImageWMS
│   ├── ImageArcGISRest
│   └── ...
├── VectorSource
├── RasterSource
└── TileSource
    ├── DataTileSource                 # 数据瓦片
    │   └── ImageTileSource            # 新图片瓦片方案
    │       └── TileDebugSource
    ├── UTFGridSource                  # TileJSON 交互数据
    ├── VectorTileSource               # 常用矢量瓦片
    │   └── OGCVectorTileSource
    ├── XYZSource                      # 常用业务封装，当前底层仍使用 ol/source/XYZ
    ├── TileWMSSource                  # 常用业务封装，当前底层仍使用 ol/source/TileWMS
    ├── WMTSSource                     # 常用业务封装，当前底层仍使用 ol/source/WMTS
    └── legacy
        ├── UrlTileSource              # Deprecated，仅兼容
        └── TileImageSource            # Deprecated，仅兼容

设计约定：

- OMap `TileSource` 是公共父类，只封装瓦片 source 的通用能力，不直接作为业务瓦片源使用。
- `XYZSource`、`TileWMSSource`、`WMTSSource`、`VectorTileSource` 是常用业务 Source，保持一等封装。
- OpenLayers 中 `UrlTile`、`TileImage` 已标记 deprecated，因此 OMap 只在 `legacy` 下提供兼容封装。
- `TileImage` deprecated 不代表 `XYZ`、`TileWMS`、`WMTS` 这些服务类型要废弃；OMap 对外保留稳定业务 API，后续如需迁移底层实现，只改内部封装。
