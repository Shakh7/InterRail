class OrderApi {
    constructor() {
        this.BASE_API = process.env.VUE_APP_ORDER_URL + '/order';
    }

    async getOrderByNumber(order_number) {
        let data = []

        let url = `${process.env.VUE_APP_ORDER_URL}/container_order/list/${order_number}/`;

        try {
            let response = await fetch(url)
            response.ok ? data = await response.json() : data = []
        } catch {
            console.log("error")
        }

        return data
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