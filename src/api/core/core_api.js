class CoreApi {
    constructor() {
        this.base_api = process.env.VUE_APP_ORDER_URL + '/core';
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
            let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/counterparty/categories/`)
            data = await response.json()
        } catch (error) {
            console.log(error)
        }
        return data
    }

    async getCounterparties(limit, offset) {
        let data = []
        try {
            let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/counterparty/counterparties/?limit=${limit}&offset=${offset}`)
            data = await response.json()
        } catch (error) {
            console.log(error)
        }
        return data
    }

    async getProducts(limit, offset) {
        let data = []
        try {
            let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/core/products/?limit=${limit}&offset=${offset}`)
            data = await response.json()
        } catch (error) {
            console.log(error)
        }
        return data
    }
}

export default CoreApi;