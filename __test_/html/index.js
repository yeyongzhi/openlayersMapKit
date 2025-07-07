// console.log(window.ol)

// console.log(window.OMap);

const map = new OMap.Map("map_container")

const layer = new OMap.GaodeLayer("vec", { id: "gaode_vec" })

console.log(map)
console.log(layer)

map.addLayer(layer)