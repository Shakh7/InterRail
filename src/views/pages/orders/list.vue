<script>
import CustomTable from '../../../components/custom/table.vue'
import OrderApi from '@/api/orders/orders_api.js'
import {ordersMehtods} from "@/state/helpers";
import Swal from "sweetalert2";

export default {
  data() {
    return {
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
    };
  },
  methods: {
    ...ordersMehtods,
    async getOrders() {
      let orderApi = new OrderApi();
      let data = await orderApi.getContainerOrders();
      this.orders = data.results.map(result => result.order)
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
                title: `Too Many Tries...\nPlease, talk to IT department to fix the proplem`,
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
        console.log(error)
      })
    },
  },
  async mounted() {
    await this.getOrders()
  },
  components: {
    CustomTable
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  }
};
</script>

<template>

  <CustomTable
      name="ORDERS TABLE"
      id="orders_table"
      :headers="headers"
      :rows="orders.filter(order => order.manager === $store.state.user.id)"
      :selectable="true"
      :searchable="true"
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
          <router-link class="dropdown-item" to="/orders/create/?type=empty_wagon">Empty wagon</router-link>
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

    <template v-slot:manager="slotProps">
      <div>
        <span class="rounded-circle bg-soft-secondary text-secondary mx-1 px-2">
          {{ slotProps.row.manager === user.id ? user.full_name[0] : 'E' }}
        </span>
        <span>
          {{ slotProps.row.manager === user.id ? user.full_name : slotProps.row.manager }}
        </span>
      </div>
    </template>

  </CustomTable>
</template>