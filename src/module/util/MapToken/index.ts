type MapTokenEnums = 'tdt'

const MapTokenName = 'OMapToken'

type OMapTokenWindow = Window & {
  OMapToken?: Partial<Record<MapTokenEnums, string>>
}

interface MapTokenState {
  /**
   * 天地图token
   */
  tdt: string | null
}

const MapToken: MapTokenState = {
  tdt: null
}

function saveToken(key: MapTokenEnums, value: string) {
  const tokenWindow = window as OMapTokenWindow
  if (!tokenWindow[MapTokenName]) {
    tokenWindow[MapTokenName] = {}
  }
  tokenWindow[MapTokenName][key] = value
}

const MapTokenProxy = new Proxy(MapToken, {
  set: function (target, prop, value, receiver) {
    saveToken(prop as MapTokenEnums, value)
    return Reflect.set(target, prop, value, receiver)
  }
})

export default MapTokenProxy
