<template>
  <DeleteConfirmation
      id="doc_delete_modal"
      header="Delete Document"
      :confirmationPlaceholder="data.name"
      @onDelete="onDeleteDoc"
  >
    <template #recordName>
      Document Name
    </template>
  </DeleteConfirmation>
</template>

<script>
import {deleteDocumentById} from "@/api/customer/CustomerApi.js"
import DeleteConfirmation from "@/components/forms/DeleteConfirmation.vue";
import Swal from "sweetalert2";

export default {
  emits: ['update'],
  name: "document_delete",
  props: {
    doc: {
      type: Object,
      default: () => null
    },
  },
  methods: {
    async onDeleteDoc() {
      let response = await deleteDocumentById(this.data.id)
      if (response !== null) {
        document.querySelector('#doc_delete_modal .modal-header .btn-close').click()
        this.$emit('update')
        await Swal.fire({
          icon: 'success',
          title: 'Document deleted successfully',
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
      return this.doc || {}
    }
  },
  components: {
    DeleteConfirmation
  }
}
</script>

<style scoped>

</style>