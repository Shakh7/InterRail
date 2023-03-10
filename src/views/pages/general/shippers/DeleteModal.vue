<template>
  <!-- consigneeDeleteModal  -->
  <DeleteConfirmation
      id="shipperDeleteModal"
      header="Delete Shipper"
      :confirmationPlaceholder="data.name"
      @onDelete="deleteShipper">
  </DeleteConfirmation>
</template>

<script>
import DeleteConfirmation from "@/components/forms/DeleteConfirmation.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  emits: ['deleted'],
  name: "ShipperDeleteModal",
  props: {
    shipper: {
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
    async deleteShipper() {
      try {
        await axios.delete('/core/shippers/' + this.data.id + '/')
        this.$emit('deleted')
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Shipper deleted successfully!',
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
    shipper(value) {
      this.data = value
    }
  }
}
</script>

<style scoped>

</style>