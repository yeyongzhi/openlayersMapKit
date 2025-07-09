type MapTokenEnums = 'tdt'

const MapTokenName = 'OMapToken'

interface MapTokenState {
    /**
     * 天地图token
     */
    tdt: string | null;
}

const MapToken: MapTokenState = {
    tdt: null,
};

function saveToken(key: MapTokenEnums, value: string) {
    if(!(window as any)[MapTokenName]) {
        (window as any)[MapTokenName] = {}
    }
    (window as any)[MapTokenName][key] = value
}

const MapTokenProxy = new Proxy(MapToken, {
    set: function(target, prop, value, receiver) {
        saveToken((prop as MapTokenEnums), value)
        return Reflect.set(target, prop, value, receiver);
    }
})

export default MapTokenProxy