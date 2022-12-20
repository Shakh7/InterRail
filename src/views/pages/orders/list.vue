<script>
import CustomTable from '../../../components/custom/table.vue'
import OrderApi from '@/api/orders/orders_api.js'
import {ordersMehtods} from "@/state/helpers";
import Swal from "sweetalert2";
import store from "@/state/store";
import PageHeader from "../../../components/page-header.vue";

export default {
  data() {
    return {
      title: 'Orders',
      items: [
        {
          text: 'Home',
          href: '/',
        },
        {
          text: 'Container Orders',
          active: true,
        },
      ],
      numberOfErrors: 0,
      headers: [
        {
          label: 'ORDER NUMBER',
          field: 'order_number',
          align: 'center',
          searchable: true,
        },
        {
          label: 'LOT NUMBER',
          field: 'lot_number',
          align: 'center',
          searchable: true,
        },
        {
          label: 'POSITION',
          field: 'position',
          align: 'center',
          searchable: true,
        },
        {
          label: 'ORDER TYPE',
          field: 'type',
          align: 'center',
          searchable: true,
        },
        {
          label: 'CUSTOMER',
          field: 'customer',
          align: 'center',
          searchable: true,
        },
        {
          label: 'PAYMENT STATUS',
          field: 'payment_status',
          align: 'center',
          searchable: true,
        },
        {
          label: 'SHIPMENT STATUS',
          field: 'shipment_status',
          align: 'center',
          searchable: true,
        },
        {
          label: 'DATE',
          field: 'date',
          align: 'center',
          searchable: true,
        },
        {
          label: 'MANAGER',
          field: 'manager',
          align: 'center',
          searchable: true,
        },
        {
          label: 'ACTIONS',
          field: 'actions',
          align: 'center',
        },
      ],
      orders: [],
      pagination: {
        perPage: 10,
        currentPage: 1,
        total: 0,
      },
      orderUrl: `${process.env.VUE_APP_ORDER_URL}/container_order/list/`,
    };
  },
  methods: {
    ...ordersMehtods,
    async getOrders() {
      let orderApi = new OrderApi();
      let data = await orderApi.getContainerOrders();
      let orders = []
      data.results.forEach(order => {
        order.order.product = order.product
        orders.push(order.order)
      })
      this.orders = orders
      this.totalPages = orders.length
    },
    setToUpdateOrder(order) {
      this.setCurrentlyUpdating(order)
      this.$router.push({name: 'orders_container_update', params: {id: order.id}})
    },
    deleteOrderConfirmation(order) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `You are about to delete order ${(order.order_number).toString().toUpperCase()}`,
        text: 'Deleting your order will remove all of its information from our database.',
        showDenyButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Yes, Delete It',
        denyButtonText: 'Cancel',
        cancelButtonColor: 'transparent',
        focusConfirm: false,
        inputLabel: `Please type Order${(order.order_number).toString().toUpperCase()} to confirm`,
        input: 'email',
        inputPlaceholder: `Order${(order.order_number).toString().toUpperCase()}`,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === 'Order' + (order.order_number).toString().toUpperCase()) {
              resolve(this.deleteOrder(order))
            } else {
              resolve('Order number did not match :)')
            }
          })
        }
      });
    },

    deleteOrder(order) {
      fetch(`${process.env.VUE_APP_ORDER_URL}/container_order/list/${order.order_number}/delete/`, {
        method: 'DELETE',
      }).then(response => {
        if (response.ok) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Order has been deleted successfully',
            showConfirmButton: false,
            timer: 3000
          })
          this.getOrders()
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'An error occurred while deleting order',
            showConfirmButton: false,
          })
        }
      }).catch(error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `ERROR \n ${error}`,
          showConfirmButton: true,
          confirmButtonText: 'Try Again',
        }).then((result) => {
          if (result.isConfirmed) {
            if (this.numberOfErrors >= 2) {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: `Too Many Tries...\nPlease, talk to IT department to fix the problem`,
                showConfirmButton: false,
                timer: 10000,
                willClose: () => {
                  window.location.reload()
                }
              })
            } else {
              this.numberOfErrors += 1
              this.deleteOrderConfirmation(order)
            }
          }
        })
      })
    },

    getAccount(account) {
      return store.state.users_list.filter(user => user.id === account)[0] || {full_name: 'Unknown'}
    },

    pageChange(page) {
      this.pagination.currentPage = page
    },
  },
  async mounted() {
    await this.getOrders()
  },
  components: {
    CustomTable,
    PageHeader
  },
};
</script>

<template>
  <PageHeader :title="title" :items="items"/>
  <CustomTable
      name="ORDERS TABLE"
      id="orders_table"
      :headers="headers"
      :rows="orders.filter(order => order.manager === $store.state.user.id || $store.state.user.role === 'admin')"
      :selectable="true"
      :searchable="true"
      @page-change="pageChange"
      :url="orderUrl"
  >
    <template v-slot:top-right>
      <div class="btn-group">
        <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Create order
        </button>
        <div class="dropdown-menu dropdownmenu-success">
          <router-link class="dropdown-item" :to="{name: 'create_container'}">Container</router-link>
          <div class="dropdown-divider"></div>
          <router-link class="dropdown-item" :to="{name: 'create_wagon'}">Wagon</router-link>
          <div class="dropdown-divider"></div>
          <router-link class="dropdown-item" :to="{name: 'create_empty_wagon'}">Empty wagon</router-link>
        </div>
      </div>
    </template>

    <template v-slot:order_number="slotProps">
      <span class="badge badge-soft-secondary fs-12">
        <router-link :to="{name: 'orders_container_detail', params: {id: slotProps.row.order_number}}">
          {{ slotProps.row.order_number }}
        </router-link>
      </span>
    </template>

    <template v-slot:actions="slotProps">

      <font-awesome-icon @click="setToUpdateOrder(slotProps.row)" icon="fa-solid fa-pen-to-square"
                         class="c_icon mx-2 c_icon_hoverable"/>

      <font-awesome-icon @click="deleteOrderConfirmation(slotProps.row)"
                         icon="fa-solid fa-trash" class="c_icon c_icon_hoverable text-danger"/>
    </template>

    <template v-slot:customer="slotProps">
      <div>
        <span class="rounded-circle bg-soft-secondary text-secondary mx-1 px-2">
          {{ getAccount(slotProps.row.customer)['full_name'][0].toUpperCase() }}
        </span>
        <span>
          {{ getAccount(slotProps.row.customer)['full_name'] }}
        </span>
      </div>
    </template>

    <template v-slot:manager="slotProps">
      <div>
        <span class="rounded-circle bg-soft-secondary text-secondary mx-1 px-2">
          {{ getAccount(slotProps.row.manager)['full_name'][0].toUpperCase() }}
        </span>
        <span>
          {{ getAccount(slotProps.row.manager)['full_name'] }}
        </span>
      </div>
    </template>

    <template v-slot:type="slotProps">
      <span v-if="slotProps.row.type == 'Export'" class="badge bg-success">
        {{ slotProps.row.type }}
      </span>
      <span v-else-if="slotProps.row.type == 'Import'" class="badge bg-primary">
        {{ slotProps.row.type }}
      </span>
      <span v-else-if="slotProps.row.type == 'Transit'" class="badge bg-warning">
        {{ slotProps.row.type }}
      </span>
    </template>

    <template v-slot:shipment_status="slotProps">
      <span v-if="slotProps.row.shipment_status == 'Completed'" class="badge badge-outline-success">
        {{ slotProps.row.shipment_status }}
      </span>
      <span v-else-if="slotProps.row.shipment_status == 'Delivered'" class="badge badge-outline-primary">
        {{ slotProps.row.shipment_status }}
      </span>
      <span v-else-if="slotProps.row.shipment_status == 'In process'" class="badge badge-outline-warning">
        {{ slotProps.row.shipment_status }}
      </span>
    </template>

    <template v-slot:payment_status="slotProps">
      <span v-if="slotProps.row.payment_status == 'Reserved'" class="badge badge-outline-success">
        {{ slotProps.row.payment_status }}
      </span>
      <span v-else-if="slotProps.row.payment_status == 'Received'" class="badge badge-outline-primary">
        {{ slotProps.row.payment_status }}
      </span>
      <span v-else-if="slotProps.row.payment_status == 'Issued'" class="badge badge-outline-warning">
        {{ slotProps.row.payment_status }}
      </span>
    </template>

    <template v-slot:lot_number="slotProps">
      {{ slotProps.row.lot_number === null || slotProps.row.lot_number === '' ? '-' : slotProps.row.lot_number }}
    </template>

  </CustomTable>
</template>