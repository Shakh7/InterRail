class CoreStationsApi {
    constructor() {
        this.base_api = `http://178.62.91.121:5000/api/core/stations`
    }

    async getStations(limit, offset) {
        let response = await fetch(`${this.base_api}/?limit=${limit}&offset=${offset}`)
        return response
    }
}

export default CoreStationsApi;