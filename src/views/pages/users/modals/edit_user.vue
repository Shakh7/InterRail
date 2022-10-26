<script>
import Swal from 'sweetalert2'
import Multiselect from "@vueform/multiselect";
import UsersApi from '../../../../api/users/users_api.js'

export default {
  name: 'updateSuccess',
  emits: {
    updatedSuccess: null
  },
  props: {
    userData: Object
  },
  methods: {
    async submitEditUserForm(user_data) {
      let User = new UsersApi(localStorage.getItem("jwt"))
      let data = await User.updateUsers(user_data.id, {
        "email": user_data.email,
        "is_active": user_data.is_active,
        "full_name": user_data.full_name,
        "role": user_data.role
      })

      if (data.ok === true) {
        document.getElementById(`cEditUser${this.user.id}Modal`).click()
        this.$emit('updatedSuccess', true)
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User Updated Successfully',
          timer: 3000
        })
      } else {
        await Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something Went Wrong Here...'
        })
      }
    }
  },
  components: {
    Multiselect
  },
  computed: {
    user: {
      get() {
        return this.userData
      },
      set() {
        console.log('ss')
      }
    }
  },
}
</script>
<template>
  <div class="modal fade" :id="'editUser' + user.id + 'Modal'" tabindex="-1"
       :aria-labelledby="'editUser' + user.id + 'ModalLabels'" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen-md-down">
      <div class="modal-content">
        <div class="modal-header bg-light p-3">
          <h5 class="modal-title" :id="'editUser' + user.id + 'ModalLabel'">Editing a user</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form action="/" method="POST" @submit.prevent="submitEditUserForm(user)">
          <div class="modal-body text-start">

            <div class="mb-3">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-control" placeholder="Enter Full Name" required
                     v-model="user.full_name"/>
            </div>

            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input type="text" class="form-control" placeholder="Enter Email" required
                     v-model="user.email"/>
            </div>

            <div class="mb-3">
              <label class="form-label">Role</label>
              <Multiselect class="form-control" v-model="user.role" :close-on-select="true"
                           :searchable="true" :options="[
                                { value: 'admin', label: 'Admin' },
                                { value: 'staff', label: 'Staff' },
                                { value: 'client', label: 'Client' },
                                ]" required/>
            </div>

            <div class="form-check">
              <input class="form-check-input me-2" type="checkbox" v-model="user.is_active" :id="'formCheck' + user.id">
              <label class="form-check-label" for="formCheck2">
                Is Active
              </label>
            </div>

          </div>
          <div class="modal-footer">
            <div class="hstack gap-2 justify-content-end">
              <button type="button" class="btn btn-light" data-bs-dismiss="modal"
                      :id="'cEditUser'  +user.id + 'Modal'">
                Close
              </button>
              <button type="submit" class="btn btn-success">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>