<script>
import CustomTable from '@/components/custom/table.vue'
import OrderApi from '@/api/orders/orders_api.js'
import {ordersMehtods} from "@/state/helpers";
import Swal from "sweetalert2";
import store from "@/state/store";
import PageHeader from "../../../../components/page-header.vue";

export default {
  data() {
    return {
      items: [
        {
          text: "Home",
          href: "/",
        },
        {
          text: "Empty Wagon Orders",
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
      isLoading: false,
      table: {
        url: `${process.env.VUE_APP_ORDER_URL}/wagon_empty_order/list/`,
      },
      pagination: {
        perPage: 10,
      },
    };
  },
  methods: {
    ...ordersMehtods,
    async getOrders() {
      this.isLoading = true;
      let orderApi = new OrderApi();
      let data = await orderApi.getEmptyWagonOrders();
      let orders = []
      data.results.forEach(order => {
        order.order.quantity = order.quantity
        orders.push(order.order)
      })
      this.orders = orders
      this.isLoading = false;
    },

    setToUpdateOrder(order) {
      this.setCurrentlyUpdating(order)
      this.$router.push({name: 'orders_empty_wagon_update', params: {id: order.order.order_number}})
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

      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Order delete is not yet implemented',
        showConfirmButton: false,
        timer: 4000 + order.order_number
      })

      // fetch(`${process.env.VUE_APP_ORDER_URL}/container_order/list/${order.order_number}/delete/`, {
      //   method: 'DELETE',
      // }).then(response => {
      //   if (response.ok) {
      //     Swal.fire({
      //       position: 'center',
      //       icon: 'success',
      //       title: 'Order has been deleted successfully',
      //       showConfirmButton: false,
      //       timer: 3000
      //     })
      //     this.getOrders()
      //   } else {
      //     Swal.fire({
      //       position: 'center',
      //       icon: 'error',
      //       title: 'An error occurred while deleting order',
      //       showConfirmButton: false,
      //     })
      //   }
      // }).catch(error => {
      //   Swal.fire({
      //     position: 'center',
      //     icon: 'error',
      //     title: `ERROR \n ${error}`,
      //     showConfirmButton: true,
      //     confirmButtonText: 'Try Again',
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       if (this.numberOfErrors >= 2) {
      //         Swal.fire({
      //           position: 'center',
      //           icon: 'warning',
      //           title: `Too Many Tries...\nPlease, talk to IT department to fix the problem`,
      //           showConfirmButton: false,
      //           timer: 10000,
      //           willClose: () => {
      //             window.location.reload()
      //           }
      //         })
      //       } else {
      //         this.numberOfErrors += 1
      //         this.deleteOrderConfirmation(order)
      //       }
      //     }
      //   })
      // })
    },

    getAccount(account) {
      return store.state.users_list.filter(user => user.id === account)[0] || {full_name: 'Unknown'}
    },

    getTableData(data, field) {
      return data.row['order'][field]
    }
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
  <PageHeader title="Orders" :items="items"/>
  <CustomTable
      name="EMPTY WAGON ORDERS TABLE"
      id="orders_table"
      :headers="headers"
      :selectable="true"
      :searchable="true"
      :isLoading="isLoading"
      :url="table.url"
      :pagination="pagination"
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
        <router-link :to="{name: 'orders_empty_wagon_detail', params: {id: getTableData(slotProps, 'order_number')}}">
          {{ getTableData(slotProps, 'order_number') }}
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
          {{ getAccount(getTableData(slotProps, 'customer'))['full_name'][0].toUpperCase() }}
        </span>
        <span>
          {{ getAccount(getTableData(slotProps, 'customer'))['full_name'] }}
        </span>
      </div>
    </template>

    <template v-slot:manager="slotProps">
      <div>
        <span class="rounded-circle bg-soft-secondary text-secondary mx-1 px-2">
          {{ getAccount(getTableData(slotProps, 'manager'))['full_name'][0].toUpperCase() }}
        </span>
        <span>
          {{ getAccount(getTableData(slotProps, 'manager'))['full_name'] }}
        </span>
      </div>
    </template>

  </CustomTable>
</template>