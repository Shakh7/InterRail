<template>
  <div class="modal fade" id="consigneeUpdateModal" tabindex="-1" role="dialog"
       aria-labelledby="consigneeUpdateModalLabel"
       aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="consigneeUpdateModalLabel">Edit Consignee</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateConsignee()">
            <div class="mb-3">
              <label for="consigneeName" class="form-label">Consignee Name</label>
              <input v-model="data.name" type="text" class="form-control" id="consigneeName"
                     placeholder="Enter consignee name">
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-success">Update</button>
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
  emits: ['updated'],
  name: "ConsigneeUpdateModal",
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
  methods: {
    async updateConsignee() {
      let formData = new FormData()
      formData.append('name', this.data.name)
      try {
        await axios.put('/core/consignees/' + this.data.id + '/', formData)
        this.$emit('updated')
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Consignee updated successfully!',
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