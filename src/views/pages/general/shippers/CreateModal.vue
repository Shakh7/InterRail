<template>
  <div class="modal fade" id="shipperCreateModal" tabindex="-1" role="dialog"
       aria-labelledby="shipperCreateModalLabel"
       aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="shipperCreateModalLabel">Create Shipper</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createShipper()">
            <div class="mb-3">
              <label for="shipperName" class="form-label">Shipper Name</label>
              <input v-model="name" type="text" class="form-control" id="shipperName"
                     placeholder="Enter shipper name">
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-success">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  emits: ['created'],
  name: "ConsigneeCreateModal",
  data() {
    return {
      name: ''
    }
  },
  methods: {
    async createShipper() {
      let formData = new FormData()
      formData.append('name', this.name)
      try {
        await axios.post('/core/shippers/', formData)
        this.$emit('created')
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Shipper created successfully!',
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
}
</script>

<style scoped>

</style>