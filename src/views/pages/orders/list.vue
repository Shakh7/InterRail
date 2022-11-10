<script>
import CustomTable from '../../../components/custom/table.vue'

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
    async getOrders() {
      let response = await fetch('http://178.62.91.121:5000/container_order/list/')
      let data = await response.json()
      let results = data.results
      let orders = results.map(result => result.order)
      this.orders = orders
    }
  },
  async mounted() {
    await this.getOrders()
  },
  components: {
    CustomTable
  }
};
</script>

<template>
  <CustomTable
      name="ORDERS TABLE"
      id="orders_table"
      :headers="headers"
      :rows="orders"
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
        <router-link :to="'/orders/detail/' + slotProps.row.order_number ">
          {{ slotProps.row.order_number }}
        </router-link>
      </span>
    </template>

    <template v-slot:actions="slotProps">
      <router-link class="pe-auto text-dark mx-2" :to="'/orders/update/' + slotProps.row.id + '/?type=container' ">
        <font-awesome-icon icon="fa-solid fa-pen-to-square" class="c_icon mx-2 c_icon_hoverable"/>
      </router-link>
      <font-awesome-icon icon="fa-solid fa-trash" class="c_icon c_icon_hoverable text-danger"/>
    </template>

    <template v-slot:manager="slotProps">
      <div>
        <span class="rounded-circle bg-soft-secondary text-secondary mx-1 px-2">
          {{ slotProps.row.manager[0] }}
        </span>
        <span>
          {{ slotProps.row.manager }}
        </span>
      </div>
    </template>

  </CustomTable>
</template>