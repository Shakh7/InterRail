class CounterpartyApi {
    constructor() {
        this.BASE_API = process.env.VUE_APP_ORDER_URL + '/counterparty';
    }

    async getCounterparties(limit, offset) {
        let data = []

        let url = `${this.BASE_API}/counterparties/`;

        if (limit && offset) {
            url += `?limit=${limit}&offset=${offset}`;
        }

        if (limit) {
            url += `?limit=${limit}`;
        }

        try {
            let response = await fetch(url)
            data = await response.json()
        } catch (error) {
            console.log(error)
        }

        return data
    }
}
export default CounterpartyApi