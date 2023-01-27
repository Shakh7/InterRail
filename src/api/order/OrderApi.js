class OrderApi {
    constructor() {
        this.BASE_API = process.env.VUE_APP_ORDER_URL + '/order';
    }

    async getOrderNumbers(params) {
        let data = []

        let url = `${this.BASE_API}/order_numbers/${params}`;

        try {
            let response = await fetch(url)
            response.ok ? data = await response.json() : data = []
        } catch {
            console.log("error")
        }

        return data
    }
}
export default OrderApi