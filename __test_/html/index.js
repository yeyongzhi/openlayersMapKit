console.log(window.ol)
console.log(window.OMap);

let map = null

let clickLnglat = null
let mapCenter = null
let mapResolution = null
let mapZoom = null
let mapExtent = null

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

function initVectorLayer() {
    const vlayer = new OMap.VectorLayer({
        style: (feature, resolution) => {
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
        vlayer.forEachFeatureInExtent(extent, (feature) => {
            console.log(feature)
        })
        console.log("getFeaturesInExtent结果")
        console.log(vlayer.getFeaturesInExtent(extent))
    }, 3000)
    let re = vlayer.getClosestFeatureToCoordinate(OMap.ProjUtil.fromLonLat([120.20004, 30.30004]))
    console.log(re)
    let extent2 = vlayer.getExtent()
    let extentPart1 = OMap.ProjUtil.toLonLat(extent2.getBottomLeft())
    let extentPart2 = OMap.ProjUtil.toLonLat(extent2.getTopRight())
    console.log(extentPart1.toArray())
    console.log(extentPart2.toArray())

}

function init() {
    initDom()
    initMap()
    initVectorLayer()
}

init()