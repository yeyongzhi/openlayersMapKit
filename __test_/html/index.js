console.log(window.ol)
console.log(window.OMap);

const container = document.getElementById('message-container');
let map = null

let clickLnglat = null
let mapCenter = null
let mapResolution = null
let mapZoom = null
let mapExtent = null


const getExtentBtn = document.getElementById('getExtent')

const ModifyrevokeBtn = document.getElementById('Modifyrevoke')

const MeasureDistanceBtn = document.getElementById('MeasureDistance')
const MeasureAreaBtn = document.getElementById('MeasureArea')
const endMeasureBtn = document.getElementById('endMeasure')

const switchBaseLayer = document.getElementById('switchBaseLayer')

const DrawInput = document.getElementById('drawType')
const DrawInputChecked = document.getElementById('Draw')
const abortDrawingBtn = document.getElementById('abortDrawing')
const removeLastPointBtn = document.getElementById('removeLastPoint')
const finishDrawingBtn = document.getElementById('finishDrawing')
const destroyDrawBtn = document.getElementById('destroyDraw')
const clearDrawBtn = document.getElementById('clearDraw')

const SelectInputChecked = document.getElementById('Select')
const SelectLayerInputChecked = document.getElementById('SelectLayer')

let distanceMeasure = null
let areaMeasure = null

let testVectorLayer = null

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

/**
 * 显示消息
 * @param {string} text - 提示文本
 * @param {string} type - 类型: 'info' | 'success' | 'warning' | 'error'
 * @param {number} duration - 自动关闭时间（毫秒），默认 3000
 */
function showMessage(text, type = 'info', duration = 3000) {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;

    messageEl.innerHTML = `
      <span>${text}</span>
      <span class="close" onclick="this.parentElement.remove()">×</span>
    `;

    container.appendChild(messageEl);

    // 自动关闭
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.classList.add('fade-out');
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 300); // 匹配 fadeOut 动画时长
        }
    }, duration);
}

function initDom() {
    clickLnglat = document.getElementById('click_lnglat')
    mapCenter = document.getElementById('map_center')
    mapResolution = document.getElementById('map_resolution')
    mapZoom = document.getElementById('map_zoom')
    mapExtent = document.getElementById('map_extent')
}

function initPanelCollapse() {
    const panelToggle = document.getElementById('panelToggle')
    if (!panelToggle) return

    panelToggle.onclick = () => {
        const collapsed = document.body.classList.toggle('panel-collapsed')
        panelToggle.title = collapsed ? '展开操作栏' : '收缩操作栏'
        panelToggle.setAttribute('aria-label', panelToggle.title)
        panelToggle.setAttribute('aria-expanded', String(!collapsed))

        window.setTimeout(() => {
            map?.updateSize?.()
        }, 260)
    }
}

function initMap() {
    map = new OMap.Map("map_container", {
        view: {
            center: OMap.ProjUtil.fromLonLat([120.2, 30.3]),
            zoom: 12,
        }
    })

    console.log(map)


    let interactions = map.getInteractions()

    let typeList = Object.values(OMap.InteractionType)
    typeList.forEach(type => {
        let interaction = interactions.find(i => {
            return i.type === type
        })
        if (interaction && document.getElementById(type)) {
            document.getElementById(type).checked = interaction.active
        }
    })



    map.once('map:rendercomplete', (e) => {
        console.log('【地图渲染完成】')
    })

    // 加载高德地图
    const layer = new OMap.GaodeLayer(OMap.GaodeLayerType.Vec, {
        id: "gaode_vec",
    })
    map.addLayer(layer)

    // OMap.MapToken.tdt = ""
    // 加载天地图
    // const TDT_VEC_LAYER_GROUP = new OMap.LayerGroup("tdt_vec", [
    //     new OMap.TdtLayer(OMap.TdtLayerType.Vec, 'w'),
    //     new OMap.TdtLayer(OMap.TdtLayerType.Cva, 'w')
    // ]
    // )
    // map.addLayerGroup(TDT_VEC_LAYER_GROUP)
    // const TDT_IMG_LAYER_GROUP = new OMap.LayerGroup("tdt_img",
    //     [
    //         new OMap.TdtLayer(OMap.TdtLayerType.Img, { visible: false }),
    //         new OMap.TdtLayer(OMap.TdtLayerType.Cia, { visible: false })
    //     ]
    // )
    // map.addLayerGroup(TDT_IMG_LAYER_GROUP)
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

    // 注册点击事件
    map.on('map:singleclick', (e) => {
        // clickLnglat.innerText = e.coordinate.toString(2)
        console.log(e)
        const clickFeatures = map.getFeaturesAtPixel(e.pixel)
        console.log(clickFeatures)
        const clickFeatures2 = map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
            return feature
        })
        console.log(clickFeatures2)
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

let drawTool = null
function initDrawInteraction() {
    const createDrawTool = () => {
        const layer = drawTool?.getLayer?.()
        const nextDrawTool = new OMap.Draw(DrawInput.value, layer ? { layer } : undefined)
        map.addInteraction(nextDrawTool)
        nextDrawTool.on('drawstart', (e) => {
            console.log(e)
        })
        nextDrawTool.on('drawend', (e) => {
            console.log("绘制结束")
            console.log(e)
            console.log(nextDrawTool.getFeatures())
            console.log(nextDrawTool.getFeatures().length)
        })
        nextDrawTool.on('drawabort', (e) => {
            console.log("取消绘制")
        })
        return nextDrawTool
    }

    DrawInput.onchange = () => {
        if (!drawTool || !DrawInputChecked.checked) return
        drawTool.destroy(false)
        drawTool = createDrawTool()
    }

    DrawInputChecked.onchange = (e) => {
        const value = e.target.checked
        console.log("DrawInput.value", value)
        if (value) {
            if (!drawTool) {
                drawTool = createDrawTool()
            } else {
                drawTool.setActive(true)
            }
            showMessage('绘制工具已激活', 'success')
        } else {
            if (!drawTool) return
            drawTool.setActive(false)
            showMessage('绘制工具已禁用', 'error')
        }
    }
    abortDrawingBtn.onclick = () => {
        if (!drawTool) return showMessage('请先开启绘制工具', 'warning')
        drawTool.cancel()
    }
    removeLastPointBtn.onclick = () => {
        if (!drawTool) return showMessage('请先开启绘制工具', 'warning')
        drawTool.revoke()
    }
    finishDrawingBtn.onclick = () => {
        if (!drawTool) return showMessage('请先开启绘制工具', 'warning')
        drawTool.finish()
    }
    destroyDrawBtn.onclick = () => {
        if (!drawTool) return showMessage('请先开启绘制工具', 'warning')
        drawTool.destroy(false)
        drawTool = null
        DrawInputChecked.checked = false
    }
    clearDrawBtn.onclick = () => {
        if (!drawTool) return showMessage('请先开启绘制工具', 'warning')
        drawTool.clear()
    }
}

let selectTool = null
function initSelectInteraction() {
    SelectInputChecked.onchange = (e) => {
        const value = e.target.checked
        if (value) {
            if (!selectTool) {
                selectTool = new OMap.Select({
                    layers: [testVectorLayer],
                    style: (feature) => {
                        return new OMap.Style({
                            circle: {
                                fill: {
                                    color: '#a0d911'
                                },
                                radius: 20
                            },
                            stroke: {
                                color: '#a0d911',
                                width: 10
                            },
                            fill: {
                                color: new OMap.Color({
                                    color: '#a0d911',
                                    opacity: 0.5
                                })
                            },
                        })
                    }
                })
                selectTool.on('select', (e) => {
                    console.log(e)
                })
                map.addInteraction(selectTool)
            } else {
                selectTool.setActive(true)
            }
            showMessage('选择工具已激活', 'success')
        } else {
            selectTool.setActive(false)
            showMessage('选择工具已禁用', 'error')
        }
    }
    document.getElementById('destroySelect').onclick = () => {
        selectTool.destroy()
        SelectInputChecked.checked = false
    }
}

let modifyTool = null
function initModifyInteraction() {
    document.getElementById('Modify').onchange = (e) => {
        const value = e.target.checked
        if (value) {
            if (!modifyTool) {
                modifyTool = new OMap.Modify({
                    layer: testVectorLayer
                })
                modifyTool.on('modifystart', (e) => {
                    console.log(e)
                })
                modifyTool.on('modifyend', (e) => {
                    console.log(e)
                })
                map.addInteraction(modifyTool)
            } else {
                modifyTool.setActive(true)
            }
            showMessage('修改工具已激活', 'success')
        } else {
            modifyTool.setActive(false)
            showMessage('修改工具已禁用', 'error')
        }
    }
    document.getElementById('destroyModify').onclick = () => {
        modifyTool.destroy()
        document.getElementById('Modify').checked = false
    }
    document.getElementById('revokeModify').onclick = () => {
        modifyTool.revoke()
    }
    document.getElementById('cancelModify').onclick = () => {
        modifyTool.cancel()
    }
}

let measureMode = OMap.MeasureMode.Distance
let measureTool = null
function initMeasureInteraction() {
    document.getElementById('measureType').onchange = (e) => {
        const value = e.target.value
        if (value === 'Distance') {
            measureMode = OMap.MeasureMode.Distance
        } else if (value === 'Area') {
            measureMode = OMap.MeasureMode.Area
        }
    }
    document.getElementById('Measure').onchange = (e) => {
        const value = e.target.checked
        if (value) {
            if (!measureTool) {
                measureTool = new OMap.Measure(measureMode)
                map.addInteraction(measureTool)
            } else {
                measureTool.setActive(true)
            }
            showMessage('测量工具已激活', 'success')

        } else {
            measureTool.setActive(false)
            showMessage('测量工具已禁用', 'danger')
        }
    }
    document.getElementById('destroyMeasure').onclick = () => {
        if (measureTool) {
            measureTool.destroy()
            measureTool = null
            document.getElementById('Measure').checked = false
        }
    }
}

// 测试Popup
function initPopup() {
    const popup = new OMap.Popup({
        position: OMap.ProjUtil.fromLonLat([120.2, 30.3]),
        content: '这是一个弹窗',
        stopEvent: true
    })
    popup.setOffset([0, -20])
    // console.log("------popup-----")
    // console.log(popup)
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
        id: 'test-vector',
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
        // l.translate(10000, 10000)
        // console.log(l.getCoordinates())
    }, 3000)
    // let re = vlayer.getClosestFeatureToCoordinate(OMap.ProjUtil.fromLonLat([120.20004, 30.30004]))
    // console.log(re)
    // let extent2 = vlayer.getExtent()
    // console.log(extent2)
    return vlayer
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

function initFormat() {
    const format = new OMap.Format(OMap.FormatType.GeoJSON)
    console.log(format)
    const feature = format.readFeatures('{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[120.2,30.3]},"properties":{}}]}')
    console.log(feature)
    // const point = new OMap.Point(OMap.ProjUtil.fromLonLat([120.2, 30.3]), { id: 123, name: '测试 format' })
    // const line = new OMap.LineString([
    //     OMap.ProjUtil.fromLonLat([120.2, 30.3]),
    //     OMap.ProjUtil.fromLonLat([120.1, 30.3])
    // ], { id: 456, name: '测试 format' })
    // const source = format.writeFeaturesObject([point, line])
    // console.log(source)
}

function initControl() {
    const control = new OMap.Zoom()
    const control2 = new OMap.FullScreen()
    map.addControl(control)
    map.addControl(control2)
}

function initSwitchLayer() {
    switchBaseLayer.onclick = (e) => {
        console.log("switchBaseLayer")
        const vecGroup = map.getLayerGroupById('tdt_vec')
        vecGroup.getAllLayers().forEach(item => {
            item.setVisible(false)
        })
        const imgGroup = map.getLayerGroupById('tdt_img')
        imgGroup.getAllLayers().forEach(item => {
            item.setVisible(true)
        })
    }
}

function initImageLayer() {
    const centerLonLat = [-74.006, 40.7128];
    const center = OMap.ProjUtil.fromLonLat(centerLonLat); // [x, y] in EPSG:3857

    // 2. 根据图片尺寸设定覆盖范围（单位：米）
    const widthInMeters = 1000;   // 图片覆盖 1 公里宽
    const heightInMeters = (968 / 1024) * widthInMeters; // 保持原图比例

    const halfW = widthInMeters / 2;
    const halfH = heightInMeters / 2;

    const imageExtent = [
        center[0] - halfW,
        center[1] - halfH,
        center[0] + halfW,
        center[1] + halfH
    ]; // [minX, minY, maxX, maxY]
    const imagelayer = new OMap.ImageLayer({
        source: {
            url: 'https://imgs.xkcd.com/comics/online_communities.png',
            // projection: 'EPSG:3857', // 关键：使用地图的投影
            imageExtent: imageExtent
        }
    })
    console.log(imagelayer)
    map.addLayer(imagelayer)
}

const initInteractionChanged = () => {
    ['DoubleClickZoom', 'MouseWheelZoom', 'DragPan'].forEach(type => {
        if (document.getElementById(type)) {
            document.getElementById(type).onchange = (e) => {
                map.getInteractionById(`omap_default_${type.toLowerCase()}`).setActive(e.target.checked)
                showMessage(`${type}已${e.target.checked ? '开启' : '关闭'}`, 'success')
            }
        }
    })
    document.getElementById('DragBox').onchange = (e) => {
        let value = e.target.checked
        let interaction = map.getInteractionById('omap_default_dragbox')
        if (!interaction) {
            interaction = new OMap.DragBox({
                id: 'omap_default_dragbox',
                onBoxEnd: (e) => {
                    console.log(e)
                },
                className: 'omap-dragbox'
            })
            map.addInteraction(interaction)
        } else {
            interaction.setActive(value)
        }
    }
    document.getElementById('InteractionExtent').onchange = (e) => {
        let value = e.target.checked
        let interaction = map.getInteractionById('omap_default_interactionextent')
        if (!interaction) {
            interaction = new OMap.InteractionExtent({
                id: 'omap_default_interactionextent',
                boxStyle: new OMap.Style({
                    fill: {
                        color: new OMap.Color({
                            color: '#1890FF',
                            opacity: 0.5
                        })
                    },
                    stroke: {
                        color: new OMap.Color('#E20000'),
                        width: 2
                    }
                })
            })
            const id = interaction.on('extentchanged', (e) => {
                console.log(e)
            })
            setTimeout(() => {
                interaction.un(id)
            }, 5000)
            map.addInteraction(interaction)
        } else {
            interaction.setActive(value)
        }
    }
    document.getElementById('InteractionExtentGetExtent').onclick = (e) => {
        let interactionextent = map.getInteractionById('omap_default_interactionextent')
        if (interactionextent) {
            console.log(interactionextent.getExtent().toArray().join(', '))
            showMessage(`范围获取成功`, 'success')
        }
    }
    document.getElementById('InteractionLink').onchange = (e) => {
        let value = e.target.checked
        let interaction = map.getInteractionById('omap_default_interactionlink')
        if (!interaction) {
            interaction = new OMap.Link({
                id: 'omap_default_interactionlink',
            })
            map.addInteraction(interaction)
        } else {
            interaction.setActive(value)
        }
    }
    document.getElementById('testVectorLayer').onchange = (e) => {
        let value = e.target.checked
        if(value) {
            if(!testVectorLayer) {
                testVectorLayer = initVectorLayer()
            } else {
                testVectorLayer.setVisible(true)
            }
        } else {
            testVectorLayer.setVisible(false)
        }
    }
    document.getElementById('changeFeatureStyle1').onclick = (e) => {
        if (testVectorLayer) {
            let feature = testVectorLayer.getFeatures()[0]
            if (feature) {
                console.log(feature)
                feature.setStyle(new OMap.Style({
                    circle: {
                        fill: {
                            color: '#ae3ec9'
                        },
                        radius: 10
                    }
                }))
            }
        }
    }
    document.getElementById('changeFeatureStyle2').onclick = (e) => {
        if (testVectorLayer) {
            let feature = testVectorLayer.getFeatures()[0]
            if (feature) {
                feature.setStyle(undefined)
            }
        }
    }
}

function init() {
    initDom()
    initMap()
    initPanelCollapse()

    initInteractionChanged()

    initDrawInteraction()

    initSelectInteraction()

    initModifyInteraction()

    initMeasureInteraction()

    // initPopup()

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
    // initWMTSLayer()

    // initFormat()

    initControl()

    // initSwitchLayer()

    console.log(OMap.ProjUtil.toLonLat([3320672.1131, 582130.269]))

    initImageLayer()

    setTimeout(() => {
        // console.log(map.getAllLayers())
        // const vlayer = map.getLayerById('test-vector')
        // console.log(vlayer)
        // console.log(vlayer.getFeatures()[0])
        // map.fit(vlayer.getFeatures()[0], {
        //     maxZoom: 18
        // })
        // map.animate({
        //     center: vlayer.getFeatures()[0].getCoordinates(),
        //     zoom: 18
        // })
        // map.adjustZoom(1)
    }, 3000)

}

init()
