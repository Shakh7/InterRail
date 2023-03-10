<template>
  <!-- consigneeDeleteModal  -->
  <DeleteConfirmation
      id="consigneeDeleteModal"
      header="Delete Consignee"
      :confirmationPlaceholder="data.name"
      @onDelete="deleteConsignee">
  </DeleteConfirmation>
</template>

<script>
import DeleteConfirmation from "@/components/forms/DeleteConfirmation.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  emits: ['deleted'],
  name: "ConsigneeDeleteModal",
  props: {
    consignee: {
      type: Object,
      required: true,
      default: () => {
      }
    }
  },
  data() {
    return {
      data: ''
    }
  },
  components: {
    DeleteConfirmation
  },
  methods: {
    async deleteConsignee() {
      try {
        await axios.delete('/core/consignees/' + this.data.id + '/')
        this.$emit('deleted')
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Consignee deleted successfully!',
        })
      } catch (e) {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          html: Object.values(e.response.data).map((item) => {
            return `<p>${item}</p>\n`
          }).join(''),
        })
      }
    }
  },
  watch: {
    consignee(value) {
      this.data = value
    }
  }
}
</script>

<style scoped>

</style>