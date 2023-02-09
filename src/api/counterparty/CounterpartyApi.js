class CounterpartyApi {
    constructor() {
        this.BASE_API = process.env.VUE_APP_ORDER_URL + '/counterparty';
    }

    async getCounterparties(extra_url_queries) {
        let data = []

        let url = `${this.BASE_API}/counterparties/`;

        if (extra_url_queries) {
            url += extra_url_queries
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