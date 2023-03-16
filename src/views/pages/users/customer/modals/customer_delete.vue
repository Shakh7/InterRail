<template>
  <DeleteConfirmation
      id="company_delete_modal"
      header="Delete Company"
      :confirmationPlaceholder="data.name"
      @onDelete="onDeleteConfirmed"
  >
    <template #recordName>
      Company Name
    </template>
  </DeleteConfirmation>
</template>

<script>
import {deleteCompanyBySlug} from "@/api/customer/CustomerApi.js"
import DeleteConfirmation from "@/components/forms/DeleteConfirmation.vue";
import Swal from "sweetalert2";

export default {
  emits: ['deleted'],
  name: "document_delete",
  props: {
    company: {
      type: Object,
      default: () => null
    },
  },
  methods: {
    async onDeleteConfirmed() {
      let response = await deleteCompanyBySlug(this.data.slug)
      if (response !== null) {
        document.querySelector('#company_delete_modal .btn-close').click()
        this.$emit('deleted')
        await Swal.fire({
          icon: 'success',
          title: 'Customer deleted successfully',
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
      return this.company || {}
    }
  },
  components: {
    DeleteConfirmation
  }
}
</script>

<style scoped>

</style>