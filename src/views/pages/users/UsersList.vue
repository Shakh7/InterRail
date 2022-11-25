<script>

import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import store from "@/state/store.js";

import animationData from "@/components/widgets/msoeawqm.json";
import animationData1 from "@/components/widgets/gsqxdxog.json";
// import Lottie from "@/components/widgets/lottie.vue";

import CreautUserModal from './modals/create_user.vue'
import deleteUserButton from './components/delete_user_button.vue'
import editUserButton from './components/edit_user_button.vue'
//
// import UserApi from '../../../api/users/users_api.js'
// import Swal from "sweetalert2";

export default {
  name: 'users_list',
  emits: {
    updatedSuccess: null,
  },
  data() {
    return {
      title: "Invoice List",
      usersList: [],
      config: {
        mode: "range",
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
        dateFormat: "d M, Y",
      },

      date: null,

      value: null,

      defaultOptions: {
        animationData: animationData
      },
      defaultOptions1: {
        animationData: animationData1
      },

      search: {
        query: '',
      },
    };
  },
  components: {
    Multiselect,
    // lottie: Lottie,
    flatPickr,
    CreautUserModal,
    deleteUserButton,
    editUserButton,
  },
  methods: {
    async getUsersList() {
      await store.dispatch('getUsers')
      this.usersList = store.state.users_list
    }
  },
  computed: {
    allUsers: {
      get() {
        return this.usersList
      },
      set() {
        console.log('ss')
      }
    }
  },
  async mounted() {
    await this.getUsersList()
  },

  watch: {
    search: {
      handler(newValue) {
        if (newValue.query.length > 0) {
          this.usersList.searched = this.usersList.original.filter((user) => {
            return user.full_name.toLowerCase().includes(newValue.query.toLowerCase()) ||
                user.email.toLowerCase().includes(newValue.query.toLowerCase()) ||
                user.role.toLowerCase().includes(newValue.query.toLowerCase())
          })
        } else {
          this.usersList.searched = this.usersList.original
        }
      },
      deep: true
    }
  }
};
</script>

<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card" id="invoiceList">
        <div class="card-header border-0">
          <div class="d-flex align-items-center">
            <h5 class="card-title mb-0 flex-grow-1">Users table</h5>
            <div class="flex-shrink-0">
              <a class="btn btn-success" href="#CreateUserModal" data-bs-toggle="modal"><i
                  class="ri-add-line align-bottom me-1"></i>
                Create User</a>
            </div>
          </div>
        </div>
        <div class="card-body bg-soft-light border border-dashed border-start-0 border-end-0">
          <form>
            <div class="row g-3">
              <div class="col-xxl-5 col-sm-12">
                <div class="search-box">
                  <input v-model="search.query" type="text" class="form-control search bg-light border-light"
                         placeholder="Search for customer, email, country, status or something...">
                  <i class="ri-search-line search-icon"></i>
                </div>
              </div>
              <!--end col-->
              <div class="col-xxl-3 col-sm-4">
                <flat-pickr v-model="date" :config="config" class="form-control bg-light border-light"
                            placeholder="Select date">
                </flat-pickr>
              </div>
              <!--end col-->
              <div class="col-xxl-3 col-sm-4">
                <div class="input-light">

                  <Multiselect class="form-control" v-model="value" :close-on-select="true" :searchable="true"
                               :create-option="true" :options="[
                      { value: 'all', label: 'all' },
                      { value: 'Unpaid', label: 'Unpaid' },
                      { value: 'Paid', label: 'Paid' },
                      { value: 'Cancel', label: 'Cancel' },
                      { value: 'Refund', label: 'Refund' },
                    ]"/>

                </div>
              </div>
              <!--end col-->

              <div class="col-xxl-1 col-sm-4">
                <button type="button" class="btn btn-primary w-100" onclick="SearchData();">
                  <i class="ri-equalizer-fill me-1 align-bottom"></i> Filters
                </button>
              </div>
              <!--end col-->
            </div>
            <!--end row-->
          </form>
        </div>
        <div class="card-body">
          <div>
            <div class="table-responsive table-card">
              <table class="table align-middle table-nowrap" id="invoiceTable">
                <thead class="text-muted">
                <tr>
                  <th scope="col" style="width: 50px;">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="checkAll">
                    </div>
                  </th>
                  <th class="sort text-uppercase" data-sort="full_name">Full Name</th>
                  <th class="sort text-uppercase" data-sort="email">Email</th>
                  <th class="sort text-uppercase" data-sort="status">Status</th>
                  <th class="sort text-uppercase" data-sort="role">Role</th>
                  <th class="sort text-uppercase text-center" data-sort="action">Action</th>
                </tr>
                </thead>
                <tbody class="list form-check-all">
                <tr v-for="tr in allUsers" :key="tr">
                  <td>
                    <input class="form-check-input" type="checkbox">
                  </td>
                  <td class="country">
                    <span>{{ tr.full_name }}</span>
                  </td>
                  <td>
                    <span>{{ tr.email }}</span>
                  </td>
                  <td>
                      <span class="badge text-uppercase" :class="{
                      'bg-success': tr.is_active == true,
                      'bg-danger': tr.is_active == false,
                      }">{{ tr.is_active === true ? 'Active' : 'Inactive' }}</span>
                  </td>
                  <td>
                      <span class="badge text-uppercase" :class="{
                      'bg-primary': tr.role == 'admin',
                      'bg-secondary': tr.role == 'staff',
                      'bg-warning': tr.role == 'client',
                      }">{{ tr.role }}</span>
                  </td>
                  <td class="text-center">
                    <editUserButton :userInfo="tr" @updatedSuccess="this.getUsersList"/>
                    <deleteUserButton :userId="tr['id']" @deleteSuccess="this.getUsersList"/>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <CreautUserModal @onUserCreated="this.getUsersList"/>
  <!--end row-->
</template>