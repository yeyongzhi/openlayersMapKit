// console.log(window.ol)
console.log(window.OMap);

OMap.MapToken.tdt = '4774ca01d665a06c9e494ca5f29dba10'

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
    const map = new OMap.Map("map_container", {
        view: {
            center: OMap.ProjUtil.fromLonLat([120.2, 30.3]),
            zoom: 8,
        }
    })

    const layer = new OMap.GaodeLayer("vec", { id: "gaode_vec" })
    map.addLayer(layer)

    setTimeout(() => {
        map.setProperties({
            name: 'test'
        })
    }, 3000)

    map.on('map:propertychange', (e) => {
        console.log(e)
    })

    return false;

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

function init() {
    initDom()
    initMap()
}

init()