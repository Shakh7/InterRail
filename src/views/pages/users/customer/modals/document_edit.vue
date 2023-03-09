<template>
  <div id="doc_edit_modal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header border-bottom p-3">
          <h5 class="modal-title">
            Document Act
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form action="" @submit.prevent="editDoc" class="p-4 text-dark" v-if="data">
          <div class="mb-3">
            <label for="docName" class="form-label">Document Name</label>
            <input v-model="data.name"
                   type="text" class="form-control" id="docName" placeholder="Document name">
          </div>
          <div class="mb-3">
            <label for="docComment" class="form-label">Comment</label>
            <textarea v-model="data.comment"
                      class="form-control" id="docComment" rows="3" placeholder="Enter your comment"></textarea>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input v-model="save_current_file" class="form-check-input" type="checkbox" name="formCheckboxRight"
                     id="formCheckboxRight1">
              <label class="form-check-label" for="formCheckboxRight1">
                Save current file
              </label>
            </div>
          </div>
          <div class="mb-3" v-if="!save_current_file">
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
            <button v-if="isFormValid" type="submit" class="btn btn-success">Save document</button>
            <button v-else disabled class="btn btn-success">Save document</button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import {updateDocument} from "@/api/customer/CustomerApi.js"
import Swal from "sweetalert2";

export default {
  emits: ['update'],
  name: "document_edit",
  props: {
    doc: {
      type: Object,
      default: () => null
    },
    contract_id: {
      type: Number,
      default: () => null
    }
  },
  data() {
    return {
      showModal: false,
      file: null,
      save_current_file: true,
    }
  },
  computed: {
    data() {
      return this.doc
    },
    isFormValid() {
      if (this.save_current_file) {
        return this.data.name !== ''
      } else {
        return this.data.name !== '' && this.file !== null
      }
    },
  },
  methods: {
    async editDoc() {
      let response = await updateDocument({
        id: this.data.id,
        name: this.data.name,
        comment: this.data.comment,
        contract: this.contract_id,
        file: this.save_current_file ? this.data.file : this.file
      })
      if (response) {
        document.querySelector('#doc_edit_modal .modal-header .btn-close').click()
        await Swal.fire({
          icon: 'success',
          title: 'Document updated successfully',
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
      document.querySelector('#doc_edit_modal #actFile').value = ''
    },
  },
}
</script>

<style scoped>

</style>