<script>

import PageHeader from "../../../components/page-header.vue";
import CustomTable from '../../../components/custom/table2.vue'
import PreviewModal from "./components/PreviewModal.vue";
import AddCodeModal from "./components/AddCodeModal.vue";
import skeleton from "../../../components/custom/skeleton.vue";
import user from '../../../components/custom/user.vue'

import Swal from "sweetalert2";

import SwiperCore, {Navigation, Pagination, Thumbs} from "swiper";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/swiper-bundle.css";

SwiperCore.use([Thumbs, Pagination, Navigation]);

export default {
  page: {
    title: "Invoice List",
  },
  data() {
    return {
      title: "Applications",
      items: [
        {
          text: "Home",
          href: "/",
        },
        {
          text: "Applications List",
          active: true,
        },
      ],

      isLoading: false,

      currentApplication: {
        data: {}
      },

      getUpdate: false,
      applicationWidgets: [],

      table: {
        url: process.env.VUE_APP_ORDER_URL + '/code/application/list/',
        headers: [
          {
            label: 'NUMBER',
            field: 'number',
            align: 'center',
            searchable: true,
            visible: true
          },
          {
            label: 'Forwarder',
            field: 'forwarder',
            align: 'center',
            searchable: true,
            visible: true
          },
          {
            label: 'Departure',
            field: 'departure',
            align: 'center',
            searchable: true,
            visible: true
          },
          {
            label: 'Destination',
            field: 'destination',
            align: 'center',
            searchable: true,
            visible: true
          },
          {
            label: 'File',
            field: 'file',
            align: 'center',
            searchable: true,
            visible: true
          },
          {
            label: 'Date',
            field: 'date',
            align: 'center',
            searchable: true,
            visible: true
          },
          {
            label: 'Quantity',
            field: 'quantity',
            align: 'center',
            searchable: true,
            visible: true
          },
          {
            label: 'Client',
            field: 'customer',
            align: 'center',
            searchable: true,
            visible: true
          },
          {
            label: 'Manager',
            field: 'manager',
            align: 'center',
            searchable: true,
            visible: true
          },
          {
            label: 'actions',
            field: 'actions',
            visible: true
          },
        ],
        pagination: {
          perPage: 10,
        },
      }
    };
  },
  components: {
    PageHeader,
    // FileTextIcon,
    // CheckSquareIcon,
    // ClockIcon,
    // XOctagonIcon,
    PreviewModal,
    AddCodeModal,
    Swiper,
    SwiperSlide,
    CustomTable,
    skeleton,
    user
  },
  methods: {

    async getApplicationWidgetsData() {
      let request = await fetch(`${process.env.VUE_APP_ORDER_URL}/code/application/statistic/`)
      this.applicationWidgets = (await request.json())['applications']
    },

    async downloadFile(url) {
      fetch(url)
          .then(resp => resp.blob())
          .then(blobobject => {
            const blob = window.URL.createObjectURL(blobobject);
            const anchor = document.createElement('a');
            anchor.style.display = 'none';
            anchor.href = blob;
            anchor.download = url.toString().split('/')[url.toString().split('/').length - 1];
            document.body.appendChild(anchor);
            anchor.click();
            window.URL.revokeObjectURL(blob);
          })
          .catch(() => alert('An error in downloading the file sorry'));
    },

    async confirmApplicationDelete(id, appNumber) {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: `You are about to delete application ${appNumber}`,
        text: 'Deleting your application will remove all of its information from our database.',
        showDenyButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Yes, Delete It',
        denyButtonText: 'Cancel',
        cancelButtonColor: 'transparent',
        focusConfirm: false,
        inputLabel: `Please type Application${appNumber} to confirm`,
        input: 'email',
        inputPlaceholder: `Application${appNumber}`,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === 'Application' + appNumber) {
              resolve(this.deleteApplication(id))
            } else {
              resolve('Application number did not match :)')
            }
          })
        }
      });
    },

    async deleteApplication(id) {
      fetch(`${process.env.VUE_APP_ORDER_URL}/code/application/delete/${id}`, {
        method: 'DELETE',
      }).then(response => {
        this.getApplications()
        Swal.fire({
          position: "center",
          icon: response.ok ? "success" : "error",
          title: response.ok ? "Application Deleted" : "Application Delete Failed",
          text: response.ok ? "Application has been deleted successfully" : "Application could not be deleted",
          showConfirmButton: true,
          confirmButtonText: 'Ok',
          cancelButtonColor: 'transparent',
          focusConfirm: false,
        });
      })

    },

    showAddCodeModal(application) {
      this.currentApplication.data = application
      let a = document.getElementById('addCodem')
      a.click()
    }
  },
  async mounted() {
    this.isLoading = true;
    await this.getApplicationWidgetsData();
    this.isLoading = false;
  }
};
</script>

<template>
  <PageHeader :title="title" :items="items"/>

  <div class="row p-0" v-if="isLoading">
    <div class="col-12 col-sm-6 col-md-3">
      <div class="card">
        <div class="card-body pb-0">
          <div class="d-flex justify-content-between align-items-center">

            <div style="min-width: 65%">
              <h2 class="mb-3" style="max-width: 55%">
                <skeleton/>
              </h2>
              <p class="text-muted">
                <skeleton/>
              </p>
            </div>

            <div class="text-end" style="min-width: 10px">
              <h5 class="mb-3">
                <skeleton/>
              </h5>
              <p class="text-muted">
                <skeleton/>
              </p>
            </div>

          </div>

        </div>
        <div class="progress pt-0 animated-progess rounded-bottom rounded-0" style="height: 4px">
          <div
              class="progress-bar rounded-0 bg-success" role="progressbar" style="width: 100%" aria-valuenow="100"
              aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-3">
      <div class="card">
        <div class="card-body pb-0">
          <div class="d-flex justify-content-between align-items-center">

            <div style="min-width: 65%">
              <h2 class="mb-3" style="max-width: 55%">
                <skeleton/>
              </h2>
              <p class="text-muted">
                <skeleton/>
              </p>
            </div>

            <div class="text-end" style="min-width: 10px">
              <h5 class="mb-3">
                <skeleton/>
              </h5>
              <p class="text-muted">
                <skeleton/>
              </p>
            </div>

          </div>

        </div>
        <div class="progress pt-0 animated-progess rounded-bottom rounded-0" style="height: 4px">
          <div
              class="progress-bar rounded-0 bg-success" role="progressbar" style="width: 100%" aria-valuenow="100"
              aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-3">
      <div class="card">
        <div class="card-body pb-0">
          <div class="d-flex justify-content-between align-items-center">

            <div style="min-width: 65%">
              <h2 class="mb-3" style="max-width: 55%">
                <skeleton/>
              </h2>
              <p class="text-muted">
                <skeleton/>
              </p>
            </div>

            <div class="text-end" style="min-width: 10px">
              <h5 class="mb-3">
                <skeleton/>
              </h5>
              <p class="text-muted">
                <skeleton/>
              </p>
            </div>

          </div>

        </div>
        <div class="progress pt-0 animated-progess rounded-bottom rounded-0" style="height: 4px">
          <div
              class="progress-bar rounded-0 bg-success" role="progressbar" style="width: 100%" aria-valuenow="100"
              aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-3">
      <div class="card">
        <div class="card-body pb-0">
          <div class="d-flex justify-content-between align-items-center">

            <div style="min-width: 65%">
              <h2 class="mb-3" style="max-width: 55%">
                <skeleton/>
              </h2>
              <p class="text-muted">
                <skeleton/>
              </p>
            </div>

            <div class="text-end" style="min-width: 10px">
              <h5 class="mb-3">
                <skeleton/>
              </h5>
              <p class="text-muted">
                <skeleton/>
              </p>
            </div>

          </div>

        </div>
        <div class="progress pt-0 animated-progess rounded-bottom rounded-0" style="height: 4px">
          <div
              class="progress-bar rounded-0 bg-success" role="progressbar" style="width: 100%" aria-valuenow="100"
              aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>
      </div>
    </div>
  </div>

  <swiper
      class="default-swiper rounded"
      :loop="false"
      :grabCursor="true"
      :slidesPerView="4"
      :spaceBetween="15"
      v-if="!isLoading"
  >
    <swiper-slide v-for="widget in applicationWidgets" :key="widget.id">
      <div class="card">
        <div class="card-body pb-0">
          <div class="d-flex justify-content-between align-items-center">

            <div>
              <h5 class="fs-15 fw-semibold text-capitalize">{{ widget['forwarder__name'] }}</h5>
              <p class="text-muted">Empty applications</p>
            </div>

            <div class="text-end">
              <h5 class="fs-15 fw-semibold text-capitalize"
                  :class="{
                      'text-success': widget.filled >= widget.not_filled,
                      'text-danger': widget.not_filled > widget.filled}"
              >
                {{ widget.filled + widget.not_filled }}
              </h5>
              <p class="text-muted">{{
                  widget.not_filled
                }}</p>
            </div>

          </div>

        </div>
        <div class="progress pt-0 animated-progess rounded-bottom rounded-0" style="height: 4px">
          <div :class="{
                      'bg-success': widget.filled >= widget.not_filled,
                      'bg-danger': widget.not_filled > widget.filled}"
               class="progress-bar rounded-0" role="progressbar" style="width: 100%" aria-valuenow="100"
               aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>


  <CustomTable
      :url="table.url"
      name="APPLICATION TABLE"
      id="application_table"
      :headers="table.headers"
      :selectable="true"
      :searchable="true"
      :isLoading="false"
      :pagination="table.pagination"
      :getUpdate="getUpdate"
  >

    <template #top-right>
      <router-link :to="{name: 'application_create'}">
        <b-button variant="success" class="waves-effect waves-light">Create application</b-button>
      </router-link>
    </template>

    <template v-slot:number="slotProps">
      <h5 @click="this.currentApplication.data = slotProps.row" data-bs-toggle="modal"
          data-bs-target="#previewModal" class="fw-medium link-primary"
          style="cursor: pointer"
      >
        <span class="badge badge-soft-primary">
          {{ slotProps.row.number }}
        </span>
      </h5>
    </template>

    <template v-slot:forwarder="slotProps">
      {{ slotProps.row.forwarder.name }}
    </template>

    <template v-slot:departure="slotProps">
      {{ slotProps.row.departure.name }}
    </template>

    <template v-slot:destination="slotProps">
      {{ slotProps.row.destination.name }}
    </template>

    <template v-slot:file="slotProps">
      <span v-if="slotProps.row.file === null" class="text-danger">-</span>

      <span v-if="slotProps.row.file !== null" @click="downloadFile(slotProps.row.file)" class="text-danger">
        <font-awesome-icon
            icon="fa-solid fa-file-zipper"
            class="c_icon_hoverable text-secondary"
        />
      </span>
    </template>

    <template v-slot:quantity="slotProps">
      <h6 class="my-0" @click="showAddCodeModal(slotProps.row)">
        <span class="badge" :class="{
          'badge-outline-danger': slotProps.row.code_count > slotProps.row.quantity,
          'badge-outline-success': slotProps.row.code_count === slotProps.row.quantity,
          'badge-outline-warning': slotProps.row.code_count < slotProps.row.quantity,
        }">
          {{ slotProps.row.code_count }}/{{ slotProps.row.quantity }}
        </span>
      </h6>
    </template>

    <template v-slot:date="slotProps">
      <span class="link-primary fw-medium">{{ slotProps.row.date }}</span>
    </template>

    <template v-slot:customer="slotProps">
      <user :userId="slotProps.row.customer" :avatar="true" avatarBgColor="success"></user>
    </template>

    <template v-slot:manager="slotProps">
      <user :userId="slotProps.row.manager" :avatar="true" avatarBgColor="secondary"></user>
    </template>

    <template v-slot:actions="slotProps">
      <div class="dropdown">
        <button class="btn btn-soft-secondary btn-sm dropdown" type="button"
                data-bs-toggle="dropdown" aria-expanded="false">
          <i class="ri-more-fill"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li class="dropdown-item cursor-pointer" @click="showAddCodeModal(slotProps.row)">
            <i class="ri-add-fill align-bottom me-2 text-muted"></i>
            Add codes
          </li>
          <li class="dropdown-item cursor-pointer">
            <i class="ri-eye-fill align-bottom me-2 text-muted"></i>
            See codes
          </li>
          <li class="dropdown-divider"></li>
          <li class="cursor-pointer">
            <router-link class="text-dark dropdown-item"
                         :to="{ name: 'application_update', params: { id: slotProps.row.id } }">
              <font-awesome-icon icon="fa-solid fa-pen-to-square"
                                 class="c_icon me-2 fs-6"/>
              Edit
            </router-link>
          </li>
          <li>
            <a class="dropdown-item cursor-pointer"
               @click="confirmApplicationDelete(slotProps.row.id, slotProps.row.number)">
              <font-awesome-icon icon="fa-solid fa-trash"
                                 class="c_icon text-danger me-2 fs-6"
              />
              Delete</a>
          </li>
        </ul>
      </div>
    </template>

  </CustomTable>

  <PreviewModal :application="currentApplication.data"/>

  <AddCodeModal :application="currentApplication.data" @update="this.getUpdate = !this.getUpdate"/>

</template>