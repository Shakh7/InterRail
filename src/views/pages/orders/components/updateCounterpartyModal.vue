<script>
import OrdersApi from "@/api/orders/orders_api";
export default {
    data () {
        return {
            counterparty_list: [],
            category_list: [],
            counterparty: null
        }
    },
    props: {
        counterpartyInfo: {
            type: Object,
        }
    },
    methods: {
        async getCounterpartyList() {
            if (this.counterparty_list.length > 0) return
            let orders = new OrdersApi()
            this.counterparty_list = (await orders.getCounterpartyList()).results
        },
        async getCategoryList() {
            if (this.category_list.length > 0) return;
            let orders = new OrdersApi()
            this.category_list = (await orders.getCategoryList()).results
        },
    },
    async mounted () {
        await this.getCounterpartyList()
        this.counterparty = this.counterpartyInfo.counterparty.id
    },
}
</script>
<template>
    c
</template>