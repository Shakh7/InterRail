export default class CoreApi {
    constructor() {
        this.url = process.env.VUE_APP_ORDER_URL + '/core';
    }

    async getProducts() {
        let request = await fetch(`${this.url}/products/`);
        let data = await request.json();
        return data;
    }

    async createProduct(product) {
        let request = await fetch(`${this.url}/products/`, {
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
        let request = await fetch(`${this.url}/stations/`, {
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

