console.log(window.ol)
console.log(window.OMap);

let map = null

let clickLnglat = null
let mapCenter = null
let mapResolution = null
let mapZoom = null
let mapExtent = null

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
            zoom: 8,
        }
    })

    const point = new OMap.Point([120.2, 30.3], { name: '测试点' })
    console.log(point)


    map.once('map:rendercomplete', (e) => {
        alert('地图渲染完成')
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
    const vlayer = new OMap.VectorLayer()
    const p = new OMap.Point(OMap.ProjUtil.fromLonLat([120.2, 30.3]))
    map.addLayer(vlayer)
    vlayer.addFeature(p)
}

function init() {
    initDom()
    initMap()
    initVectorLayer()
}

init()