class OrdersApi {
    constructor() {
        this.base_url = process.env.VUE_APP_ORDER_URL;
    }

    async getCounterpartyList() {
        let data = []
        try {
            let response = await fetch(`${this.base_url}/counterparty/counterparties/`)
            data = await response.json()
        } catch (error) {
            console.log(error)
        }
        return data
    }

    async getCategoryList() {
        let data = []
        try {
            let response = await fetch(`${this.base_url}/counterparty/categories/`)
            data = await response.json()
        } catch (error) {
            console.log(error)
        }
        return data
    }

    async getContainerOrders () {
        let data = []
        try {
            let response = await fetch(`${this.base_url}/container_order/list/`)
            data = await response.json()
        } catch (error) {
            console.log(error)
        }
        return data
    }

    async getWagonOrders () {
        let data = []
        try {
            let response = await fetch(`${this.base_url}/wagon_order/list/`)
            data = await response.json()
        } catch (error) {
            console.log(error)
        }
        return data
    }

    async getEmptyWagonOrders () {
        let data = []
        try {
            let response = await fetch(`${this.base_url}/wagon_empty_order/list/`)
            data = await response.json()
        } catch (error) {
            console.log(error)
        }
        return data
    }

    async createWagonOrder(data) {
        let response = await fetch(`${this.base_url}/wagon_order/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response
    }

    async createEmptyWagonOrder(data) {
        let response = await fetch(`${this.base_url}/wagon_empty_order/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response
    }

}

export default OrdersApi;