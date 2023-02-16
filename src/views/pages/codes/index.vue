<script>
import CustomTable from '../../../components/custom/table2.vue'
import CodePreviewModal from './components/PreviewModal.vue'
import CodeUpdateModal from './components/UpdateModal.vue'
import CreateCodes from './components/CreateCodes.vue'
import user from '../../../components/custom/user.vue'
import CounterpartyApi from "../../../api/counterparty/CounterpartyApi";
import Swal from "sweetalert2";

export default {
  name: 'codes_list',
  data() {
    return {
      table: {
        url: process.env.VUE_APP_ORDER_URL + '/code/list/',
        headers: [
          {
            label: 'APPLICATION NUMBER',
            field: 'application_number',
            align: 'center',
            visible: true,
          },
          {
            label: 'FORWARDER',
            field: 'forwarder_id',
            align: 'center',
            visible: true,
          },
          {
            label: 'ORDER NUMBER',
            field: 'order',
            align: 'center',
            visible: true,
          },
          {
            label: 'CODE',
            field: 'number',
            align: 'center',
            visible: true,
          },
          {
            label: 'DEPARTURE',
            field: 'departure',
            align: 'center',
            visible: false,
          },
          {
            label: 'DESTINATION',
            field: 'destination',
            align: 'center',
            visible: false,
          },
          {
            label: 'PRODUCT',
            field: 'product',
            align: 'center',
            visible: false,
          },
          {
            label: 'STATUS',
            field: 'status',
            align: 'center',
            visible: true,
          },
          {
            label: 'LOADING TYPE',
            field: 'loading_type',
            align: 'center',
            visible: true,
          },
          {
            label: 'CONTAINER TYPE',
            field: 'container_type',
            align: 'center',
            visible: true,
          },
          {
            label: 'WEIGHT',
            field: 'weight',
            align: 'center',
            visible: false,
          },
          {
            label: 'SMGS FILE',
            field: 'smgs_file',
            align: 'center',
            visible: true,
          },
          {
            label: 'DATE',
            field: 'date',
            align: 'center',
            visible: true,
          },
          {
            label: 'MANAGER',
            field: 'manager',
            align: 'center',
            visible: true,
          },
          // {
          //   label: 'SMGS FILE',
          //   field: 'smgs_file',
          //   align: 'center',
          //   visible: true,
          // },
          {
            label: 'actions',
            field: 'actions',
            visible: true,
          },
        ],
        pagination: {
          perPage: 50,
        },
      },
      currentCode: {},
      getUpdate: false,
      forwarders: []
    }
  },
  components: {
    CustomTable,
    CodePreviewModal,
    CodeUpdateModal,
    CreateCodes,
    user
  },
  methods: {
    setToCurrentCode(data) {
      data.forwarder = data.forwarder_id !== null
          ? this.forwarders.filter(i => i.value === data.forwarder_id)[0]['label']
          : null
      this.currentCode = data
    },
    async getForwarders() {
      let api = new CounterpartyApi()
      let response = await api.getCounterparties('?is_used_for_code=true')
      this.forwarders = response.results.map(forwarder => {
        return {
          value: forwarder.id,
          label: forwarder.name
        }
      })
    },

    async confirmDelete(row) {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: `You are about to delete code ${row.number}`,
        text: 'Deleting your code will remove all of its information from our database.',
        showDenyButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Yes, Delete It',
        denyButtonText: 'Cancel',
        cancelButtonColor: 'transparent',
        focusConfirm: false,
        inputLabel: `Please type COde${row.number} to confirm`,
        input: 'email',
        inputPlaceholder: `Code${row.number}`,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === 'Code' + row.number) {
              resolve(this.deleteCode(row.id))
            } else {
              resolve('Code number did not match :)')
            }
          })
        }
      });
    },

    async deleteCode(id) {
      fetch(`${process.env.VUE_APP_ORDER_URL}/code/list/delete/${id}/`, {
        method: 'DELETE',
      }).then(response => {
        alert('hey')
        this.getUpdate = !this.getUpdate
        Swal.fire({
          position: "center",
          icon: response.ok ? "success" : "error",
          title: response.ok ? "Code Deleted" : "Code Delete Failed",
          text: response.ok ? "Code has been deleted successfully" : "Code could not be deleted",
          showConfirmButton: true,
          confirmButtonText: 'Ok',
          cancelButtonColor: 'transparent',
          focusConfirm: false,
        });
      })
    },
  },
  async mounted() {
    await this.getForwarders()
  }
}
</script>

<template>
  <CustomTable
      :url="table.url"
      name="CODES TABLE"
      id="codes_table"
      :headers="table.headers"
      :searchable="true"
      :isLoading="false"
      :pagination="table.pagination"
      :getUpdate="getUpdate"
  >

    <template v-slot:top-right>

      <div class="btn-group">
        <button
            type="button" class="btn btn-success dropdown-toggle"
            data-bs-toggle="dropdown" aria-expanded="false">
          Connect codes
        </button>
        <div class="dropdown-menu dropdownmenu-success">
          <span class="dropdown-item cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target="#codeCreateModal"
          >Container</span>
          <span class="dropdown-item cursor-pointer">Wagon</span>
          <span class="dropdown-item cursor-pointer">Empty wagon</span>
        </div>
      </div>

    </template>

    <template v-slot:application_number="slotProps">
      <h5 class="fw-medium link-primary my-0">
        <span class="badge badge-soft-primary">
          {{ slotProps.row.application_number }}
        </span>
      </h5>
    </template>

    <template v-slot:forwarder_id="slotProps">
      <span v-if="slotProps.row.forwarder === null" class="text-danger">--</span>
      <span v-else>{{ forwarders.filter(i => i.value === slotProps.row.forwarder_id)[0]['label'] }}</span>
    </template>

    <template v-slot:order="slotProps">
      <span v-if="slotProps.row.order === null" class="text-danger">--</span>
      <span v-else>{{ slotProps.row.order.order_number }}</span>
    </template>

    <template v-slot:number="slotProps">
      <span class="badge badge-outline-primary cursor-pointer" data-bs-toggle="modal"
            data-bs-target="#CodePreviewModal"
            @click="setToCurrentCode(slotProps.row)">{{ slotProps.row.number }}</span>
    </template>

    <template v-slot:loading_type="slotProps">
      <span v-if="slotProps.row.loading_type === null" class="text-danger">--</span>
      <span v-else>{{ slotProps.row.loading_type.charAt(0).toUpperCase() + slotProps.row.loading_type.slice(1) }}</span>
    </template>

    <template v-slot:departure="slotProps">
      <span v-if="slotProps.row.departure === null" class="text-danger">--</span>
      <span v-else>{{ slotProps.row.departure.name + '(' + slotProps.row.departure.code + ')' }}</span>
    </template>

    <template v-slot:destination="slotProps">
      <span v-if="slotProps.row.destination === null" class="text-danger">--</span>
      <span v-else>{{ slotProps.row.destination.name + '(' + slotProps.row.destination.code + ')' }}</span>
    </template>

    <template v-slot:product="slotProps">
      <span v-if="slotProps.row.product === null" class="text-danger">--</span>
      <div v-else style="max-width: 180px">
        <VTooltip class="text-truncate">
          <span>{{ slotProps.row.product.name }}</span>
          <template #popper>
            <span>{{ slotProps.row.product.name }}</span>
          </template>
        </VTooltip>
      </div>
    </template>

    <template v-slot:status="slotProps">
      <span class="badge" :class="{
        'bg-warning': slotProps.row.status === 'Checking',
        'bg-secondary': slotProps.row.status === 'Used',
        'bg-success': slotProps.row.status === 'Completed',
        'bg-danger': slotProps.row.status === 'Canceled',
      }">{{ slotProps.row.status }}</span>
    </template>

    <template v-slot:smgs_file="slotProps">
      <span v-if="slotProps.row.smgs_file ===null" class="text-danger">--</span>
      <span v-else>{{ slotProps.row.smgs_file }}</span>
    </template>

    <template v-slot:manager="slotProps">
      <user :userId="slotProps.row.manager" :avatar="true" avatarBgColor="success"></user>
    </template>

    <template v-slot:actions="slotProps">

      <div class="w-100 text-center">
        <router-link :to="{name: 'code_update', params: {id: slotProps.row.id}}">
          <font-awesome-icon
              icon="fa-solid fa-pen-to-square"
              class="c_icon me-1 c_icon_hoverable text-dark"
          />
        </router-link>

        <font-awesome-icon @click="confirmDelete(slotProps.row)" icon="fa-solid fa-trash"
                           class="c_icon c_icon_hoverable text-danger"
        />
      </div>
    </template>

  </CustomTable>

  <CodePreviewModal :codeData="currentCode"/>
  <CodeUpdateModal :codeData="currentCode" @update="getUpdate = !getUpdate"/>
  <CreateCodes :forwarders="forwarders"/>
</template>

<style>
</style>
