class CoreApi {
    constructor() {
        this.base_api = process.env.VUE_APP_ORDER_URL + '/core';
        return !CoreApi.instance ? CoreApi.instance = this : CoreApi.instance;
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
    // TODO: get counter party can be merged
    async getCounterpartiesForCode(name, limit, offset) {
        let data = []
        try {
            let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/counterparty/counterparties/?is_used_for_code=true&search=${name}&limit=${limit}&offset=${offset}`)
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

    async createProduct(product) {
        let request = await fetch(`${this.base_api}/products/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: product.name,
                hc_code: product.hc_code,
                etcng_code: product.etcng_code,
                etcng_name: product.etcng_name,
            })
        });
        let data = await request.json();
        return {
            status: request.status,
            ok: request.ok,
            data: data
        }
    }

    async createStation(station) {
        let request = await fetch(`${this.base_api}/stations/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: station.name,
                code: station.code,
            })
        });
        let data = await request.json();
        return {
            status: request.status,
            ok: request.ok,
            data: data
        }
    }

}

export default CoreApi;