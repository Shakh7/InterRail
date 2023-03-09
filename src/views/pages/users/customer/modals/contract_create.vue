<template>
  <div id="contract_create_modal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header border-bottom p-3">
          <h5 class="modal-title">
            Create Contract
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form action="" @submit.prevent="create" class="p-4 text-dark">
          <div class="mb-3">
            <label for="contractName" class="form-label">Contract Name</label>
            <input v-model="name"
                   type="text" class="form-control" id="contractName" placeholder="Contract name">
          </div>
          <div class="mb-3">
            <label for="contractStartDate" class="form-label">Start Date</label>
            <input v-model="start_date" type="date"
                   class="form-control" id="contractStartDate" rows="3" placeholder="Start Date">
          </div>
          <div class="mb-3">
            <label for="contractEndDate" class="form-label">Expire Date</label>
            <input v-model="end_date" type="date"
                   class="form-control" id="contractEndDate" rows="3" placeholder="Start Date">
          </div>
          <div class="text-end">
            <button v-if="!isFormValid" type="submit" class="btn btn-success" disabled>Create contract</button>
            <button v-if="isFormValid" type="submit" class="btn btn-success">Create contract</button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import {createContract} from "@/api/customer/CustomerApi.js"
import Swal from "sweetalert2";

export default {
  emits: ['create'],
  name: "contract_create",
  props: {
    company_id: {
      type: Number,
      default: () => null,
      required: true
    }
  },
  data() {
    return {
      name: '',
      start_date: '',
      end_date: '',
    }
  },
  computed: {
    isFormValid() {
      return this.name !== '' && this.start_date !== null && this.end_date !== null
    }
  },
  methods: {
    async create() {
      let response = await createContract({
        company: this.company_id,
        name: this.name,
        start_date: this.start_date,
        expire_date: this.end_date
      })
      if (response.ok) {
        document.querySelector('#contract_create_modal .modal-header .btn-close').click()
        this.$emit('create')
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