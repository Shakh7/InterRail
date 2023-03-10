<template>
  <div id="contract_edit_modal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header border-bottom p-3">
          <h5 class="modal-title">
            Edit Contract
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form action="" @submit.prevent="editContract" class="p-4 text-dark" v-if="data">
          <div class="mb-3">
            <label for="contractName" class="form-label">Contract Name</label>
            <input v-model="data.name"
                   type="text" class="form-control" id="contractName" placeholder="Contract name">
          </div>
          <div class="mb-3">
            <label for="contractStartDate" class="form-label">Start date</label>
            <input v-model="data.start_date"
                   type="date" class="form-control" id="contractStartDate" placeholder="Start date">
          </div>
          <div class="mb-3">
            <label for="contractExpireDate" class="form-label">Expire date</label>
            <input v-model="data.expire_date"
                   type="date" class="form-control" id="contractExpireDate" placeholder="Expire date">
          </div>
          <div class="text-end">
            <button v-if="isFormValid" type="submit" class="btn btn-success">Save document</button>
            <button v-else disabled class="btn btn-success">Save contract</button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import {updateContract} from "@/api/customer/CustomerApi.js"
import Swal from "sweetalert2";

export default {
  emits: ['update'],
  name: "contract_edit",
  props: {
    contract: {
      type: Array,
      default: () => []
    },
    company_id: {
      type: Number,
      default: () => 0
    }
  },
  computed: {
    data() {
      return this.contract[0]
    },
    isFormValid() {
      return this.data.name !== ''
    }
  },
  methods: {
    async editContract() {
      let response = await updateContract({
        id: this.data.id,
        name: this.data.name,
        start_date: this.data.start_date,
        expire_date: this.data.expire_date,
        company: this.company_id
      })
      if (response) {
        document.querySelector('#contract_edit_modal .modal-header .btn-close').click()
        this.$emit('update')
        await Swal.fire({
          icon: 'success',
          title: 'Contract updated successfully',
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
    },
  },
}
</script>

<style scoped>

</style>