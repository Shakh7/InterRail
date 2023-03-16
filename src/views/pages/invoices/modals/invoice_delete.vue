<template>
  <DeleteConfirmation
      id="invoice_delete_modal"
      header="Delete Invoice"
      :confirmationPlaceholder="invoiceId.toString()"
      @onDelete="onDeleteConfirmed"
  >
    <template #recordName>
      Invoice Id
    </template>
  </DeleteConfirmation>
</template>

<script>

import DeleteConfirmation from "@/components/forms/DeleteConfirmation.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "invoice_delete",
  emits: ['deleted'],
  props: {
    invoiceId: {
      type: Number,
      default: () => 0
    },
  },
  components: {
    DeleteConfirmation
  },
  methods: {
    async onDeleteConfirmed() {
      let res = await axios.delete('/invoice/delete/' + this.invoiceId + '/')
      if (res.status === 204) {
        document.querySelector('#invoice_delete_modal .btn-close').click()
        await Swal.fire({
          icon: 'success',
          title: 'Invoice deleted successfully',
          showConfirmButton: false,
          timer: 2000
        })
        this.$emit('deleted')
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    }
  }
}
</script>

<style scoped>

</style>