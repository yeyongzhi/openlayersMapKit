// console.log(window.ol)

console.log(window.OMap);

OMap.MapToken.tdt = '4774ca01d665a06c9e494ca5f29dba10'

const map = new OMap.Map("map_container", {
    view: {
        center: OMap.ProjUtil.fromLonLat([120.2, 30.3]),
        zoom: 8,
    }
})

const layer = new OMap.GaodeLayer("vec", { id: "gaode_vec" })

console.log(map)
console.log(layer)

// map.addLayer(layer)

const layerGroup = new OMap.LayerGroup('tdt-vec', [
    new OMap.TdtLayer('vec', { opacity: 1, proj: 'w' }),
    new OMap.TdtLayer('cva', { opacity: 1, proj: 'w' })
])

setTimeout(() => {
    map.zoomIn()
}, 3000)

console.log(layerGroup)
map.addLayer(layerGroup)