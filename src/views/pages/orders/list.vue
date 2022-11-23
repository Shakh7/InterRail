<script>
import CustomTable from '../../../components/custom/table.vue'
import OrderApi from '@/api/orders/orders_api.js'
import {ordersMehtods} from "@/state/helpers";

export default {
  data() {
    return {
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
    }
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

      <font-awesome-icon icon="fa-solid fa-trash" class="c_icon c_icon_hoverable text-danger"/>
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