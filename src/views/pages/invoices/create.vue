<script>
import InvoiceCreate from "../../../components/forms/InvoiceCreate.vue";
import OrderInvoiceCreate from "../../../components/forms/OrderInvoiceCreate.vue";

export default {
  name: "create",
  data() {
    return {
      order_number: this.$route.params.order_number,
    }
  },
  components: {
    InvoiceCreate,
    OrderInvoiceCreate
  },
}
</script>

<template>
  <InvoiceCreate v-if="order_number === undefined"/>
  <OrderInvoiceCreate
      v-else
      :orderNumber="parseInt(order_number)"
  />
</template>