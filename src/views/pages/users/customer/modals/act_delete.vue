<template>
  <DeleteConfirmation
      id="act_delete_modal"
      header="Delete Act"
      :confirmationPlaceholder="data.name"
      @onDelete="onDeleteAct"
  >
    <template #recordName>
      Act Name
    </template>
  </DeleteConfirmation>
</template>

<script>
import {deleteActById} from "@/api/customer/CustomerApi.js"
import DeleteConfirmation from "@/components/forms/DeleteConfirmation.vue";
import Swal from "sweetalert2";

export default {
  emits: ['update'],
  name: "document_edit",
  props: {
    act: {
      type: Object,
      default: () => null
    },
  },
  methods: {
    async onDeleteAct() {
      let response = await deleteActById(this.data.id)
      if (response !== null) {
        document.querySelector('#act_delete_modal .modal-header .btn-close').click()
        this.$emit('update')
        await Swal.fire({
          icon: 'success',
          title: 'Act deleted successfully',
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
      return this.act || {}
    }
  },
  components: {
    DeleteConfirmation
  }
}
</script>

<style scoped>

</style>