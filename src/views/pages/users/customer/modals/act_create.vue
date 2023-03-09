<template>
  <div id="act_create_modal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header border-bottom p-3">
          <h5 class="modal-title">
            Create Act
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form action="" @submit.prevent="createAct" class="p-4 text-dark">
          <div class="mb-3">
            <label for="actName" class="form-label">Act Name</label>
            <input v-model="name"
                   type="text" class="form-control" id="actName" placeholder="Act name">
          </div>
          <div class="mb-3">
            <label for="actComment" class="form-label">Comment</label>
            <textarea v-model="comment"
                      class="form-control" id="actComment" rows="3" placeholder="Enter your comment"></textarea>
          </div>
          <div class="mb-3">
            <label for="actFile" class="form-label">File</label>
            <input id="actFile" type="file" class="form-control" @change="selectedFile">
          </div>
          <div class="mb-3" v-if="file">
            <div class="d-flex p-2">
              <div class="flex-grow-1">
                <div class="pt-1">
                  <h5 class="fs-14 mb-1" data-dz-name="">
                    {{ file.name }}
                  </h5>
                  <p class="fs-13 text-muted mb-0" data-dz-size="">
                    <strong>{{ file.size / 1024 }}</strong> KB
                  </p>
                  <strong
                      class="error text-danger"
                      data-dz-errormessage=""
                  ></strong>
                </div>
              </div>
              <div class="flex-shrink-0 ms-3">
                <button
                    data-dz-remove=""
                    class="btn btn-sm btn-danger"
                    @click="deleteRecord"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div class="text-end">
            <button v-if="!isFormValid" type="submit" class="btn btn-success" disabled>Save act</button>
            <button v-if="isFormValid" type="submit" class="btn btn-success">Save act</button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import {createAct} from "@/api/customer/CustomerApi.js"
import Swal from "sweetalert2";

export default {
  emits: ['update'],
  name: "act_create",
  props: {
    contract_id: {
      type: Number,
      default: () => null,
      required: true
    }
  },
  data() {
    return {
      name: '',
      comment: '',
      file: null
    }
  },
  computed: {
    isFormValid() {
      return this.name !== '' && this.file !== null
    }
  },
  methods: {
    async createAct() {
      let response = await createAct({
        name: this.name,
        comment: this.comment,
        contract: this.contract_id,
        file: this.file
      })
      if (response !== null) {
        document.querySelector('#act_create_modal .modal-header .btn-close').click()
        await Swal.fire({
          icon: 'success',
          title: 'Act created successfully',
          showConfirmButton: false,
          timer: 2000
        })
        this.$emit('update')
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    },
    selectedFile(event) {
      this.file = event.target.files[0];
    },
    deleteRecord() {
      this.file = null
      document.querySelector('#act_create_modal #actFile').value = ''
    },
  },
}
</script>

<style scoped>

</style>