class OrdersApi {
    constructor() {
        this.base_url = 'http://178.62.91.121:5000'
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

}

export default OrdersApi;