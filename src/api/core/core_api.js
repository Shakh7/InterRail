class CoreApi {
    constructor() {
        this.base_api = `http://178.62.91.121:5000/core`
    }

    async getCoreList(core_type, query, limit) {
        let data = []
        try {
            let response = await fetch(`${this.base_api}/${core_type}/?limit=${limit}&search=${query}`)
            data = await response.json()
        } catch (error) {
            console.log(error)
        }
        return data
    }

    async getStations(limit, offset) {
        let data = []
        try {
            let response = await fetch(`${this.base_api}/stations/?limit=${limit}&offset=${offset}`)
            data = await response.json()
        } catch (error) {
            console.log(error)
        }
        return data
    }

    async getCategories() {
        let data = []
        try {
            let response = await fetch(`http://178.62.91.121:5000/counterparty/categories/`)
            data = await response.json()
        } catch (error) {
            console.log(error)
        }
        return data
    }

    async getCounterparties(limit, offset) {
        let data = []
        try {
            let response = await fetch(`http://178.62.91.121:5000/counterparty/counterparties/?limit=${limit}&offset=${offset}`)
            data = await response.json()
        } catch (error) {
            console.log(error)
        }
        return data
    }

    async getProducts(limit, offset) {
        let data = []
        try {
            let response = await fetch(`http://178.62.91.121:5000/core/products/?limit=${limit}&offset=${offset}`)
            data = await response.json()
        } catch (error) {
            console.log(error)
        }
        return data
    }
}

export default CoreApi;