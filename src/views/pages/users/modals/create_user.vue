<script>
import Multiselect from "@vueform/multiselect";
import Swal from "sweetalert2";
import UserApi from '../../../../api/users/users_api.js'

export default {
  name: 'create_user',
  emits: {
    onUserCreated: null
  },
  data() {
    return {
      user: {
        full_name: '',
        email: '',
        password: '',
        role: '',
      }
    }
  },
  components: {
    Multiselect,
  },
  methods: {
    closeModal(closeBtnId) {
      let btn = document.getElementById(closeBtnId)
      btn.click()
    },
    async submitCreateUserForm() {
      let User = new UserApi(localStorage.getItem("jwt"))
      let new_user = await User.createUser(this.user)

      if (new_user.ok === true) {
        this.$emit('onUserCreated', true)
        this.closeModal('edtclosemodal')
        await Swal.fire("Done!", "New users has been created.", "success");
      } else {
        7
        await Swal.fire(`Error - ${new_user.status}`, "An Error Has Occured !", "error");
      }
    }
  }
}
</script>

<template>
  <div class="modal fade" id="CreateUserModal" tabindex="-1" aria-labelledby="CreateUserModalLabels" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen-md-down">
      <div class="modal-content">
        <div class="modal-header bg-light p-3">
          <h5 class="modal-title" id="CreateUserModalLabel">Create a new user</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form action="/" method="POST" @submit.prevent="submitCreateUserForm">
          <div class="modal-body">

            <div class="mb-3">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-control" placeholder="Enter Full Name"
                     required v-model="user.full_name"/>
            </div>

            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input type="text" class="form-control"
                     placeholder="Enter Email" required v-model="user.email"/>
            </div>

            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" minlength="8"
                     placeholder="Enter Password" required v-model="user.password"/>
            </div>

            <div>
              <label class="form-label">Role</label>
              <Multiselect class="form-control" v-model="user.role" :close-on-select="true" :searchable="true"
                           :options="[
                                { value: 'admin', label: 'Admin' },
                                { value: 'staff', label: 'Staff' },
                                { value: 'client', label: 'Client' },
                                ]" required
              />
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