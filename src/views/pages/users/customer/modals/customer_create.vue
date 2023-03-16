<template>
  <div class="modal fade" id="CreateCustomerModal" tabindex="-1" aria-labelledby="CreateCustomerModalLabels"
       aria-hidden="true">
    <div class="modal-dialog modal-fullscreen-md-down">
      <div class="modal-content">
        <div class="modal-header bg-light p-3">
          <h5 class="modal-title" id="CreateCustomerModalLabel">Create a new customer</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form action="/" method="POST" @submit.prevent="createCustomer">
          <div class="modal-body">

            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" placeholder="Enter Name"
                     required v-model="name"/>
            </div>

            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input type="email" class="form-control"
                     placeholder="Enter Email" required v-model="email"/>
            </div>

            <div class="mb-3">
              <label class="form-label">Phone Number</label>
              <input type="text" class="form-control" placeholder="Phone Number"
                     required v-model="phone"/>
            </div>

            <div class="mb-3">
              <label class="form-label">Address</label>
              <input type="text" class="form-control" placeholder="Address"
                     required v-model="address"/>
            </div>

            <div class="mb-3">
              <label class="form-label">About</label>
              <textarea class="form-control" rows="4" placeholder="About" required v-model="about"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <div class="hstack gap-2 justify-content-end">
              <button type="button" class="btn btn-light" data-bs-dismiss="modal" id="edtclosemodal">
                Close
              </button>
              <button type="submit" class="btn btn-success">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {createCompany} from "@/api/customer/CustomerApi.js"
import Swal from "sweetalert2";

export default {
  name: "customer_create",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      address: "",
      about: ""
    }
  },
  methods: {
    async createCustomer() {
      let res = await createCompany({
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        about: this.about
      })
      if (res.ok) {
        this.$emit("customer-created")
        document.querySelector("#CreateCustomerModal .btn-close").click()
      } else {
        await Swal.fire({
          title: "Error",
          icon: "error",
          html: Object.values(res.data).map((item) => {
            return `<p>${item}</p>\n`
          }).join(''),
        })
      }
    }
  }
}
</script>

<style scoped>

</style>