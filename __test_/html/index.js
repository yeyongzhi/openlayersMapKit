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

const tlayer1 = new OMap.TdtLayer('vec')
const tlayer2 = new OMap.TdtLayer('cva')
console.log(tlayer2)
console.log(tlayer2.getGroupId())
const layerGroup = new OMap.LayerGroup('tdt-vec', [
    tlayer1,
    tlayer2
])
map.addLayer(layerGroup)