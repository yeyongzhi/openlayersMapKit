console.log(window.ol)
console.log(window.OMap);

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

    const point = new OMap.Point([120.2, 30.3], { name: '测试点' })
    console.log(point)


    map.once('map:rendercomplete', (e) => {
        console.log('【地图渲染完成】')
    })

    const layer = new OMap.GaodeLayer("vec", { id: "gaode_vec" })
    map.addLayer(layer)

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

    setTimeout(() => {
        console.log(map.getAllLayers())
    }, 3000)
}

// 测试VectorLayer
function initVectorLayer() {
    const vlayer = new OMap.VectorLayer({
        style: (feature, resolution) => {
            console.log(feature)
            console.log(resolution)
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
    console.log(p2)
    const l = new OMap.LineString([
        OMap.ProjUtil.fromLonLat([120.2, 30.3]),
        OMap.ProjUtil.fromLonLat([120.1, 30.3])
    ])
    const polygon = new OMap.Polygon([
        polygonData[0].map(item => OMap.ProjUtil.fromLonLat(item))
    ])
    map.addLayer(vlayer)
    vlayer.addFeatures([p, p2, l, polygon])
    console.log(vlayer.getFeatures())
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
        console.log(l.getCoordinates())
        l.translate(10000, 10000)
        console.log(l.getCoordinates())
    }, 3000)
    let re = vlayer.getClosestFeatureToCoordinate(OMap.ProjUtil.fromLonLat([120.20004, 30.30004]))
    console.log(re)
    let extent2 = vlayer.getExtent()
    console.log(extent2)

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
    console.log(polygon.getCoordinates())
    console.log(polygon.getFirstCoordinate())
    console.log(polygon.getLastCoordinate())
}

function initDraw() {
    const draw = new OMap.Draw("LineString")
    console.log(draw)
    map.addInteraction(draw)
    console.log(map.getAllLayers())
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


function init() {
    initDom()
    initMap()
    // initVectorLayer()
    // initFeature()
    // initDragBox()
    // initDragPan()
    initExtent()
}

init()