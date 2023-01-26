<script>
import CustomTable from '../../../components/custom/table2.vue'
import CodePreviewModal from './components/PreviewModal.vue'
import CodeUpdateModal from './components/UpdateModal.vue'
import user from '../../../components/custom/user.vue'

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
            field: 'order_number',
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
      getUpdate: false
    }
  },
  components: {
    CustomTable,
    CodePreviewModal,
    CodeUpdateModal,
    user
  },
  methods: {
    setToCurrentCode(data) {
      this.currentCode = data
    },
  },
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
    <template v-slot:application_number="slotProps">
      <h5 class="fw-medium link-primary my-0">
        <span class="badge badge-soft-primary">
          {{ slotProps.row.application_number }}
        </span>
      </h5>
    </template>

    <template v-slot:forwarder_id="slotProps">
      <span v-if="slotProps.row.forwarder === null" class="text-danger">--</span>
      <span v-else>{{ slotProps.row.forwarder_id }}</span>
    </template>

    <template v-slot:order_number="slotProps">
      <span v-if="slotProps.row.order_number === null" class="text-danger">--</span>
      <span v-else>{{ slotProps.row.order_number }}</span>
    </template>

    <template v-slot:number="slotProps">
      <span class="badge badge-outline-primary cursor-pointer" data-bs-toggle="modal"
            data-bs-target="#CodePreviewModal"
            @click="setToCurrentCode(slotProps.row)">{{ slotProps.row.number }}</span>
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
        <font-awesome-icon
            data-bs-toggle="modal"
            data-bs-target="#CodeUpdateModal"
            icon="fa-solid fa-pen-to-square"
            class="c_icon me-1 c_icon_hoverable"
            @click="setToCurrentCode(slotProps.row)"
        />

        <font-awesome-icon @click="alert(slotProps.row.id)" icon="fa-solid fa-trash"
                           class="c_icon c_icon_hoverable text-danger"
        />
      </div>
    </template>

  </CustomTable>

  <CodePreviewModal :codeData="currentCode"/>
  <CodeUpdateModal :codeData="currentCode" @update="getUpdate = !getUpdate"/>

</template>

<style>
</style>
