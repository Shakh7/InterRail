<template>
  <DeleteConfirmation
      id="contract_delete_modal"
      header="Delete Contract"
      :confirmationPlaceholder="data.name"
      @onDelete="onDelete"
  >
    <template #recordName>
      Contract Name
    </template>
  </DeleteConfirmation>
</template>

<script>
import {deleteContractById} from "@/api/customer/CustomerApi.js"
import DeleteConfirmation from "@/components/forms/DeleteConfirmation.vue";
import Swal from "sweetalert2";

export default {
  emits: ['delete'],
  name: "document_edit",
  props: {
    contract: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    async onDelete() {
      let response = await deleteContractById(this.data.id)
      if (response !== null) {
        document.querySelector('#contract_delete_modal .modal-header .btn-close').click()
        this.$emit('delete')
        await Swal.fire({
          icon: 'success',
          title: 'Contract deleted successfully',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    }
  },
  computed: {
    data() {
      return this.contract[0] || {}
    }
  },
  components: {
    DeleteConfirmation
  }
}
</script>

<style scoped>

</style>