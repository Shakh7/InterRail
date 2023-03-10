<template>
  <div class="modal fade" id="consigneeCreateModal" tabindex="-1" role="dialog"
       aria-labelledby="consigneeCreateModalLabel"
       aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="consigneeCreateModalLabel">Create Consignee</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createConsignee()">
            <div class="mb-3">
              <label for="consigneeName" class="form-label">Consignee Name</label>
              <input v-model="name" type="text" class="form-control" id="consigneeName"
                     placeholder="Enter consignee name">
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
    async createConsignee() {
      let formData = new FormData()
      formData.append('name', this.name)
      try {
        await axios.post('/core/consignees/', formData)
        this.$emit('created')
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Consignee created successfully!',
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