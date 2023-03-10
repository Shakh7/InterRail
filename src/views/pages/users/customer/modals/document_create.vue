<template>
  <div id="doc_create_modal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header border-bottom p-3">
          <h5 class="modal-title">
            Create Document
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form action="" @submit.prevent="createDoc" class="p-4 text-dark">
          <div class="mb-3">
            <label for="docName" class="form-label">Document Name</label>
            <input v-model="name"
                   type="text" class="form-control" id="docName" placeholder="Document name">
          </div>
          <div class="mb-3">
            <label for="docComment" class="form-label">Comment</label>
            <textarea v-model="comment"
                      class="form-control" id="docComment" rows="3" placeholder="Enter your comment"></textarea>
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
            <button v-if="!isFormValid" type="submit" class="btn btn-success" disabled>Save document</button>
            <button v-if="isFormValid" :type="is_creating ? 'button' : 'submit'" class="btn btn-success">
              {{ is_creating ? 'Creating' : 'Save document' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import {createDocument} from "@/api/customer/CustomerApi.js"
import Swal from "sweetalert2";

export default {
  emits: ['update'],
  name: "document_create",
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
      file: null,
      is_creating: false
    }
  },
  computed: {
    isFormValid() {
      return this.name !== '' && this.file !== null
    }
  },
  methods: {
    async createDoc() {
      this.is_creating = true
      let response = await createDocument({
        name: this.name,
        comment: this.comment,
        contract: this.contract_id,
        file: this.file
      })
      this.is_creating = false
      if (response.ok) {
        document.querySelector('#doc_create_modal .modal-header .btn-close').click()
        this.$emit('update')
        await Swal.fire({
          icon: 'success',
          title: 'Document created successfully',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          html: Object.values(response.data).map((item) => {
            return `<p>${item}</p>\n`
          }).join(''),
        })
      }
    },
    selectedFile(event) {
      this.file = event.target.files[0];
    },
    deleteRecord() {
      this.file = null
      document.querySelector('#doc_create_modal #actFile').value = ''
    },
  },
}
</script>

<style scoped>

</style>