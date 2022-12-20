<script>

import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import "flatpickr/dist/flatpickr.css";
import store from "@/state/store.js";

import animationData from "@/components/widgets/msoeawqm.json";
import animationData1 from "@/components/widgets/gsqxdxog.json";
// import Lottie from "@/components/widgets/lottie.vue";
import PageHeader from "../../../components/page-header.vue";
import CreautUserModal from './modals/create_user.vue'
import deleteUserButton from './components/delete_user_button.vue'
import editUserButton from './components/edit_user_button.vue'
//
// import UserApi from '../../../api/users/users_api.js'
// import Swal from "sweetalert2";

export default {
  name: 'managers_list',
  emits: {
    updatedSuccess: null,
  },
  data() {
    return {
      title: "Users Management",
      items: [
        {
          text: "Home",
          href: "/",
        },
        {
          text: "Managers",
          active: true,
        },
      ],
      usersList: [],
      config: {
        mode: "range",
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
        dateFormat: "d M, Y",
      },

      user_status: 'all',

      value: null,

      defaultOptions: {
        animationData: animationData
      },
      defaultOptions1: {
        animationData: animationData1
      },

      search: '',
    };
  },
  components: {
    Multiselect,
    // lottie: Lottie,
    CreautUserModal,
    deleteUserButton,
    editUserButton,
    PageHeader
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
        let managers = this.usersList.filter(user => user.role === 'staff')
        if (this.search.length > 0) {
          managers = managers.filter((user) =>
              user.full_name.toLowerCase().includes(this.search.toLowerCase()) ||
              user.email.toLowerCase().includes(this.search.toLowerCase())
          )
        }
        if (this.user_status !== 'all') {
          managers = managers.filter((user) => {
            return user.is_active === (this.user_status === 'active')
          })
        }
        return managers
      }
    }
  },
  async mounted() {
    await this.getUsersList()
  },
};
</script>

<template>
  <PageHeader :title="title" :items="items" />
  <div class="row">
    <div class="col-lg-12">
      <div class="card" id="invoiceList">
        <div class="card-header border-0">
          <div class="d-flex align-items-center">
            <h5 class="card-title mb-0 flex-grow-1">Managers table</h5>
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
              <div class="col-9">
                <div class="search-box">
                  <input v-model="search" type="text" class="form-control search bg-light border-light"
                         placeholder="Search for customer, email, status or something...">
                  <i class="ri-search-line search-icon"></i>
                </div>
              </div>
              <!--end col-->
              <div class="col-xxl-3 col-sm-6">
                <div class="input-light">

                  <Multiselect class="form-control" v-model="user_status" :close-on-select="true" :searchable="true"
                               :create-option="true"
                               :options="[
                                   { value: 'all', label: 'All Statuses' },
                                   { value: 'active', label: 'Active' },
                                   { value: 'inactive', label: 'Inactive' },
                               ]"/>

                </div>
              </div>

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