// console.log(window.ol)
// console.log(window.OMap);

let map = null

let clickLnglat = null
let mapCenter = null
let mapResolution = null
let mapZoom = null
let mapExtent = null

const abortDrawingBtn = document.getElementById('abortDrawing')
const removeLastPointBtn = document.getElementById('removeLastPoint')
const finishDrawingBtn = document.getElementById('finishDrawing')
const getExtentBtn = document.getElementById('getExtent')

const ModifyrevokeBtn = document.getElementById('Modifyrevoke')

const MeasureDistanceBtn = document.getElementById('MeasureDistance')
const MeasureAreaBtn = document.getElementById('MeasureArea')
const endMeasureBtn = document.getElementById('endMeasure')

let distanceMeasure = null
let areaMeasure = null

const polygonData = [
    [
        [120.19715036, 30.27835874],
        [120.21004798, 30.27469897],
        [120.21336452, 30.26897037],
        [120.22392829, 30.27703275],
        [120.20820547, 30.28254874],
        [120.19715036, 30.27835874]
    ]
]

const polygonData2 = [
    [
        [120, 30.6],
        [120, 30],
        [120.6, 30],
        [120.6, 30.6],
        [120, 30.6],
    ]
]

function initDom() {
    clickLnglat = document.getElementById('click_lnglat')
    mapCenter = document.getElementById('map_center')
    mapResolution = document.getElementById('map_resolution')
    mapZoom = document.getElementById('map_zoom')
    mapExtent = document.getElementById('map_extent')
}

function initMap() {
    map = new OMap.Map("map_container", {
        view: {
            center: OMap.ProjUtil.fromLonLat([120.2, 30.3]),
            zoom: 12,
        }
    })

    console.log(map)
    console.log(map.getInteractions())

    map.once('map:rendercomplete', (e) => {
        console.log('【地图渲染完成】')
    })

    // 加载高德地图
    const layer = new OMap.GaodeLayer(OMap.GaodeLayerType.Vec, {
        id: "gaode_vec",
        // minZoom: 16
    })
    console.log(layer)
    map.addLayer(layer)

    // OMap.MapToken.tdt = ""
    // 加载天地图
    // const TdtLayer1 = new OMap.TdtLayer("vec")
    // const TdtLayer2 = new OMap.TdtLayer("cva")
    // map.addLayer(TdtLayer1)
    // map.addLayer(TdtLayer2)

    // 加载 OSM 图层
    const OSMlayer = new OMap.XYZLayer({
        source: {
            // url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            urls: [
                "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
                "https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
                "https://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
                "https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
            ]
            // url: 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }
    })
    // map.addLayer(OSMlayer)

    map.on('map:singleclick', (e) => {
        // clickLnglat.innerText = e.coordinate.toString(2)
        clickLnglat.innerText = OMap.ProjUtil.toLonLat(e.coordinate).toString(2)
    })

    map.on('view:change:resolution', (e) => {
        mapResolution.innerText = e.newValue
        mapZoom.innerText = map.getZoom()
    })

    map.on('map:moveend', (e) => {
        let [minX, minY, maxX, maxY] = map.getExtent()._extent
        let westSouth = OMap.ProjUtil.toLonLat([minX, minY]).toString(4)
        let eastNorth = OMap.ProjUtil.toLonLat([maxX, maxY]).toString(4)
        mapExtent.innerText = `${westSouth}, ${eastNorth}`
    })

    map.on('view:change:center', (e) => {
        mapCenter.innerText = OMap.ProjUtil.toLonLat(map.getCenter()).toString(4)
    })
}

// 测试Popup
function initPopup() {
    const popup = new OMap.Popup({
        position: OMap.ProjUtil.fromLonLat([120.2, 30.3]),
        content: '这是一个弹窗',
    })
    popup.setOffset([0, -20])
    console.log("------popup-----")
    console.log(popup)
    map.addPopup(popup)
    const vlayer = new OMap.VectorLayer({
        style: new OMap.Style({
            circle: {
                fill: {
                    color: 'red'
                },
                radius: 10
            }
        })
    })
    const p = new OMap.Point(OMap.ProjUtil.fromLonLat([120.2, 30.3]))
    vlayer.addFeature(p)
    map.addLayer(vlayer)
}

// 测试VectorLayer
function initVectorLayer() {
    const vlayer = new OMap.VectorLayer({
        style: (feature, resolution) => {
            // console.log(feature)
            // console.log(resolution)
            if (feature.getType() === 'Point') {
                return new OMap.Style({
                    circle: {
                        fill: {
                            color: resolution > 25 ? 'red' : 'green'
                        },
                        radius: 20
                    }
                })
            } else if (feature.getType() === 'LineString') {
                return new OMap.Style({
                    stroke: {
                        color: '#13c2c2',
                        width: 10
                    }
                })
            } else if (feature.getType() === 'Polygon') {
                return new OMap.Style({
                    stroke: {
                        color: '#000000',
                        width: 2
                    },
                    fill: {
                        color: new OMap.Color({
                            color: '#1890FF',
                            opacity: 0.5
                        })
                    },
                })
            }
            return undefined
        }
        // style: [
        //     new OMap.Style({
        //         circle: {
        //             fill: {
        //                 color: 'red'
        //             },
        //             radius: 20
        //         }
        //     }),
        //     new OMap.Style({
        //         stroke: {
        //             color: 'gray',
        //             width: 10
        //         }
        //     }),
        //     // 蓝色圆  会覆盖上面的红色圆
        //     new OMap.Style({
        //         circle: {
        //             fill: {
        //                 color: 'blue'
        //             },
        //             radius: 15
        //         }
        //     }),
        //     new OMap.Style({
        //         regularShape: {
        //             fill: {
        //                 color: 'green'
        //             },
        //             points: 5,
        //             radius: 10,
        //         }
        //     }),
        // ]
    })
    const p = new OMap.Point(OMap.ProjUtil.fromLonLat([120.2, 30.3]))
    p.setId("testPoint1")
    const p2 = new OMap.Point(OMap.ProjUtil.fromLonLat([120.1, 30.3]))
    p2.setId("testPoint2")
    // console.log(p2)
    const l = new OMap.LineString([
        OMap.ProjUtil.fromLonLat([120.2, 30.3]),
        OMap.ProjUtil.fromLonLat([120.1, 30.3])
    ])
    const polygon = new OMap.Polygon([
        polygonData[0].map(item => OMap.ProjUtil.fromLonLat(item))
    ])
    map.addLayer(vlayer)
    vlayer.addFeatures([p, p2, l, polygon])
    // console.log(vlayer.getFeatures())
    const extent = new OMap.Extent(...OMap.ProjUtil.fromLonLat([120.05, 30.2]).toArray(), ...OMap.ProjUtil.fromLonLat([120.15, 30.35]).toArray())
    setTimeout(() => {
        // vlayer.forEachFeatureInExtent(extent, (feature) => {
        //     console.log(feature)
        // })
        // console.log("getFeaturesInExtent结果")
        // console.log(vlayer.getFeaturesInExtent(extent))
        // console.log('-----p-----')
        // console.log(p.getFirstCoordinate())
        // console.log(p.getLastCoordinate())
        // console.log(p2.intersectsExtent(extent))
        // console.log(l.getCoordinates())
        l.translate(10000, 10000)
        // console.log(l.getCoordinates())
    }, 3000)
    let re = vlayer.getClosestFeatureToCoordinate(OMap.ProjUtil.fromLonLat([120.20004, 30.30004]))
    // console.log(re)
    let extent2 = vlayer.getExtent()
    // console.log(extent2)

}


// 测试feature
function initFeature() {
    const vlayer = new OMap.VectorLayer({
        style: [
            new OMap.Style({
                fill: {
                    color: 'red'
                },
            }),
            new OMap.Style({
                stroke: {
                    color: 'gray',
                    width: 2
                }
            }),
        ]
    })
    const polygon = new OMap.Polygon([
        polygonData2[0].map(item => OMap.ProjUtil.fromLonLat(item))
    ])
    vlayer.addFeatures([polygon])
    map.addLayer(vlayer)
    // 添加内环
    polygon.appendLinearRing([
        OMap.ProjUtil.fromLonLat([120.2, 30.3]),
        OMap.ProjUtil.fromLonLat([120.1, 30.3]),
        OMap.ProjUtil.fromLonLat([120.1, 30.4]),
        OMap.ProjUtil.fromLonLat([120.2, 30.4]),
        OMap.ProjUtil.fromLonLat([120.2, 30.3]),
    ])
    // console.log(polygon.getCoordinates())
    // console.log(polygon.getFirstCoordinate())
    // console.log(polygon.getLastCoordinate())
}

function initDraw() {
    const draw = new OMap.Draw("LineString")
    console.log(draw)
    map.addInteraction(draw)
    abortDrawingBtn.onclick = () => {
        draw.cancel()
    }
    removeLastPointBtn.onclick = () => {
        draw.revoke()
    }
    finishDrawingBtn.onclick = () => {
        draw.finish()
    }
}

function initDragBox() {
    const dragBox = new OMap.DragBox({
        className: 'ol-test-dragbox',
        onBoxEnd: (e) => {
            // console.log(e)
        }
    })
    map.addInteraction(dragBox)
}

function initDragPan() {
    const dragPan = new OMap.DragPan({
        className: 'ol-test-dragpan',
    })
    map.addInteraction(dragPan)
}

function initExtent() {
    const extent = new OMap.InteractionExtent()
    map.addInteraction(extent)
    getExtentBtn.onclick = () => {
        console.log(extent.getExtent())
    }
}

function initModify() {
    const vlayer = new OMap.VectorLayer({
        style: (feature, resolution) => {
            if (feature.getType() === 'Point') {
                return new OMap.Style({
                    circle: {
                        fill: {
                            color: resolution > 25 ? 'red' : 'green'
                        },
                        radius: 20
                    }
                })
            } else if (feature.getType() === 'LineString') {
                return new OMap.Style({
                    stroke: {
                        color: '#13c2c2',
                        width: 10
                    }
                })
            } else if (feature.getType() === 'Polygon') {
                return new OMap.Style({
                    stroke: {
                        color: '#000000',
                        width: 2
                    },
                    fill: {
                        color: new OMap.Color({
                            color: '#1890FF',
                            opacity: 0.5
                        })
                    },
                })
            }
            return undefined
        }
    })
    const p = new OMap.Point(OMap.ProjUtil.fromLonLat([120.2, 30.3]))
    p.setId('p1')
    const p2 = new OMap.Point(OMap.ProjUtil.fromLonLat([120.1, 30.3]))
    const l = new OMap.LineString([
        OMap.ProjUtil.fromLonLat([120.2, 30.3]),
        OMap.ProjUtil.fromLonLat([120.1, 30.3])
    ])
    const polygon = new OMap.Polygon([
        polygonData[0].map(item => OMap.ProjUtil.fromLonLat(item))
    ])
    map.addLayer(vlayer)
    vlayer.addFeatures([p, p2, l, polygon])
    // 初始化新的修改交互
    const modify = new OMap.Modify({
        layer: vlayer,
    })
    map.addInteraction(modify)
    ModifyrevokeBtn.onclick = () => {
        modify.revoke()
    }
}

function initMeasure() {
    // 测距
    MeasureDistanceBtn.onclick = () => {
        if (!distanceMeasure) {
            distanceMeasure = new OMap.Measure(OMap.MeasureMode.Distance)
            map.addInteraction(distanceMeasure)
            distanceMeasure.on("measure:start", (e) => {
                console.log("测量开始")
                console.log(e)
            })
            distanceMeasure.on("measure:end", (e) => {
                console.log("测量结束")
                console.log(e)
            })
        }
        distanceMeasure.setActive(true)
    }
    // 测面
    MeasureAreaBtn.onclick = () => {
        if (!areaMeasure) {
            console.log("【测面】初始化")
            areaMeasure = new OMap.Measure(OMap.MeasureMode.Area)
            map.addInteraction(areaMeasure)
            areaMeasure.on("measure:start", (e) => {
                console.log("测量开始")
                console.log(e)
            })
            areaMeasure.on("measure:end", (e) => {
                console.log("测量结束")
                console.log(e)
            })
        }
        areaMeasure.setActive(true)
    }
    // 结束测量
    endMeasureBtn.onclick = () => {
        distanceMeasure.setActive(false)
        areaMeasure.setActive(false)
    }
}


function initSelect() {
    const vlayer = new OMap.VectorLayer({
        id: 'test-select-vector-layer',
        style: (feature, resolution) => {
            if (feature.getType() === 'Point') {
                return new OMap.Style({
                    circle: {
                        fill: {
                            color: 'green'
                        },
                        radius: 20
                    }
                })
            } else if (feature.getType() === 'LineString') {
                return new OMap.Style({
                    stroke: {
                        color: '#13c2c2',
                        width: 10
                    }
                })
            } else if (feature.getType() === 'Polygon') {
                return new OMap.Style({
                    stroke: {
                        color: '#000000',
                        width: 2
                    },
                    fill: {
                        color: new OMap.Color({
                            color: '#1890FF',
                            opacity: 0.5
                        })
                    },
                })
            }
            return undefined
        }
    })
    const p = new OMap.Point(OMap.ProjUtil.fromLonLat([120.2, 30.3]))
    p.setId('p1')
    const p2 = new OMap.Point(OMap.ProjUtil.fromLonLat([120.1, 30.3]))
    const l = new OMap.LineString([
        OMap.ProjUtil.fromLonLat([120.2, 30.3]),
        OMap.ProjUtil.fromLonLat([120.1, 30.3])
    ])
    const polygon = new OMap.Polygon([
        polygonData[0].map(item => OMap.ProjUtil.fromLonLat(item))
    ])
    map.addLayer(vlayer)
    vlayer.addFeatures([p, p2, l, polygon])
    // 初始化新的修改交互
    const select = new OMap.Select({
        layers: [vlayer],
        multi: false,
        style: (feature, resolution) => {
            if (feature.getType() === 'Point') {
                return new OMap.Style({
                    circle: {
                        fill: {
                            color: '#eb2f96'
                        },
                        radius: 20
                    }
                })
            } else if (feature.getType() === 'LineString') {
                return new OMap.Style({
                    stroke: {
                        color: '#eb2f96',
                        width: 10
                    }
                })
            } else if (feature.getType() === 'Polygon') {
                return new OMap.Style({
                    stroke: {
                        color: '#000000',
                        width: 2
                    },
                    fill: {
                        color: new OMap.Color({
                            color: '#eb2f96',
                            opacity: 0.5
                        })
                    },
                })
            }
            return undefined
        }
    })
    select.on('select', (e) => {
        console.log(e)
    })
    map.addInteraction(select)
}

function initLink() {
    const link = new OMap.Link()
    map.addInteraction(link)
}

function initWMSLayer() {
    // 美国区域
    const wmslayer = new OMap.WMSLayer({
        source: {
            url: 'https://ahocevar.com/geoserver/wms',
            params: { 'LAYERS': 'topp:states', 'TILED': true },
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0,
        }
    })
    map.addLayer(wmslayer)
}

function initWMTSLayer() {
    const projection = new OMap.Projection('EPSG:3857');
    let projectionExtent = projection.getExtent();
    console.log(projectionExtent)
    projectionExtent = new OMap.Extent(...projectionExtent)
    console.log(projectionExtent.getWidth())
    const size = projectionExtent.getWidth() / 256
    const resolutions = new Array(19);
    const matrixIds = new Array(19);
    for (let z = 0; z < 19; ++z) {
        // generate resolutions and matrixIds arrays for this WMTS
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }
    // 美国区域
    const wmtslayer = new OMap.WMTSLayer({
        opacity: 0.7,
        source: {
            attributions: 'Tiles © <a href="https://mrdata.usgs.gov/geology/state/"' + ' target="_blank">USGS</a>',
            url: 'https://mrdata.usgs.gov/mapcache/wmts',
            layer: 'sgmc2',
            matrixSet: 'GoogleMapsCompatible',
            format: 'image/png',
            projection: projection,
            tileGrid: {
                origin: projectionExtent.getTopLeft(),
                resolutions: resolutions,
                matrixIds: matrixIds,
            },
            style: 'default',
            wrapX: true,
        }
    })
    map.addLayer(wmtslayer)
}

function init() {
    initDom()
    initMap()

    initPopup()

    // initDraw()
    // initVectorLayer()
    // initFeature()
    // initDragBox()
    // initDragPan()
    // initExtent()
    // initModify()
    // initMeasure()
    // initSelect()

    // initLink()


    // initWMSLayer()
    initWMTSLayer()
}

init()