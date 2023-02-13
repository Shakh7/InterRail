<script>
import InvoiceCreate from "../../../components/forms/InvoiceCreate.vue";

export default {
  name: "create",
  data() {
    return {
      orderId: this.$route.params.order_id,
    }
  },
  components: {
    InvoiceCreate
  },
}
</script>

<template>
  <InvoiceCreate v-if="orderId === undefined"/>
  <InvoiceCreate
      v-else
      :shipper="{name: 'Shipper prop'}"
  />
</template>