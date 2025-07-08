// console.log(window.ol)

console.log(window.OMap);

const map = new OMap.Map("map_container", {
    view: {
        center: OMap.ProjUtil.fromLonLat([120.2, 30.3]),
        zoom: 8,
    }
})

const layer = new OMap.GaodeLayer("vec", { id: "gaode_vec" })

console.log(map)
console.log(layer)

map.addLayer(layer)