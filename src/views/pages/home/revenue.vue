<script>
import {
  CountTo
} from "vue3-count-to";
import store from "@/state/store.js";
import revenue from "@/views/pages/home/data.js";

export default {
  components: {
    CountTo,
  },
  data() {
    return {
      search: '',
      revenue_apex: {
        data: revenue.series,
        options: revenue.chartOptions,
      },
      totalOrdersList: []
    };
  },
  methods: {
    async getMonthlyStatistics() {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/statistic/monthly`);
      let data = await response.json();

      let monthly_orders = data['monthly_orders']
      let monthly_rates = data['monthly_agreed_rate']
      this.revenue_apex.data[0].total = 0
      this.revenue_apex.data[1].total = 0

      monthly_rates.forEach(item => {
        this.revenue_apex.data[0].total += (item['total_agreed_rate'])
        this.revenue_apex.data[0].data[item.month - 1] = (item['total_agreed_rate'])
      })

      monthly_orders.forEach(item => {
        this.revenue_apex.data[1].total += item.total
        this.revenue_apex.data[1].data[item.month - 1] = item.total
      })

    },
    async getTotalOrders() {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/order/list/`);
      let data = await response.json();

      this.totalOrdersList = data['results']
    },
    getAccount(user_id) {
      let result = store.state.users_list.filter(item => item.id === user_id)
      return [result[0]['full_name'][0], result[0]['full_name']]
    }
  },
  async mounted() {
    await this.getMonthlyStatistics()
    await this.getTotalOrders()
  },
  computed: {
    totalOrdersListComputed() {
      if (this.search.trim().length === 0) {
        return this.totalOrdersList
      } else {
        return this.totalOrdersList.filter(item => {
          return item['order_number'].toString().toLowerCase().includes(this.search.toLowerCase())
              || item['position'].toString().toLowerCase().includes(this.search.toLowerCase())
              || item['payment_status'].toString().toLowerCase().includes(this.search.toLowerCase())
              || item['shipment_status'].toString().toLowerCase().includes(this.search.toLowerCase())
              || item['date'].toString().toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
  }
};
</script>

<template>
  <div class="card">
    <div class="card-header border-0 align-items-center d-flex">
      <h4 class="card-title mb-0 flex-grow-1">Revenue</h4>
      <div>
        <button type="button" class="btn btn-soft-secondary btn-sm me-1">
          ALL
        </button>
        <button type="button" class="btn btn-soft-secondary btn-sm me-1">
          1M
        </button>
        <button type="button" class="btn btn-soft-secondary btn-sm me-1">
          6M
        </button>
        <button type="button" class="btn btn-soft-primary btn-sm">1Y</button>
      </div>
    </div>

    <div class="card-header p-0 border-0 bg-soft-light">
      <div class="row g-0 text-center">
        <div class="col-12 col-sm-6">
          <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1">
              <count-to :startVal="0" :endVal="revenue_apex.data[1].total" :duration="3000"></count-to>
            </h5>
            <p class="text-muted mb-0">Orders</p>
          </div>
        </div>
        <!--end col-->
        <div class="col-12 col-sm-6">
          <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1">
              $
              <count-to :startVal="0" :endVal="revenue_apex.data[0].total" :duration="3000"></count-to>
              {{ revenue_apex.data[0].total >= 1000000 ? 'M' : revenue_apex.data[1].total >= 1000 ? 'K' : '' }}
            </h5>
            <p class="text-muted mb-0">Sales</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card-body p-0 pb-2">
      <div class="w-100">
        <apexchart
            class="apex-charts bg-white"
            height="350"
            dir="ltr"
            :series="revenue_apex.data"
            :options="revenue_apex.options"
        ></apexchart>
      </div>
    </div>
    <!-- end card body -->
  </div>


  <div class="card">
    <div class="card-header border-dashed border-start-0 border-top-0 border-end-0 align-items-center d-flex">
      <h4 class="card-title mb-0 flex-grow-1">Total Orders</h4>
      <div>
        <input v-model="search" type="text" class="form-control ms-auto w-75" placeholder="Search for orders..">
      </div>
    </div>

    <div class="card-body p-0 pb-2 w-100">
      <div class="table-responsive table-card w-100 m-auto">
        <table class="table table-nowrap table-striped-columns text-center mb-0">
          <thead class="table-light">
          <tr>
            <th scope="col">Order Number</th>
            <th scope="col">Position</th>
            <th scope="col">Customer</th>
            <th scope="col">Manager</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Shipment Status</th>
            <th scope="col">Date Created</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="order in totalOrdersListComputed.sort((a, b) => (a.order_number < b.order_number) ? 1: -1)"
              :key="order">
            <td><a href="#" class="fw-semibold">{{ order.order_number }}</a></td>
            <td class="text-capitalize">{{ order.position.split('_').join(' ') }}
            </td>
            <td>
              <span v-for="(user, index) in getAccount(order.customer)" :key="user"
                    :class="index === 0 ? 'rounded-circle bg-soft-secondary text-secondary mx-1 px-2' : ''">
                {{ user }}
              </span>
            </td>
            <td>
              <span v-for="(user, index) in getAccount(order.manager)" :key="user"
                    :class="index === 0 ? 'rounded-circle bg-soft-secondary text-secondary mx-1 px-2' : ''">
                {{ user }}
              </span>
            </td>
            <td class="text-capitalize">
              <span v-if="order.payment_status === 'issued'"
                    class="badge badge-outline-warning">{{ order.payment_status }}</span>
              <span v-else-if="order.payment_status === 'received'"
                    class="badge badge-outline-success">{{ order.payment_status }}</span>
              <span v-else-if="order.payment_status === 'reserved'"
                    class="badge badge-outline-primary">{{ order.payment_status }}</span>
              <span v-else class="badge badge-outline-dark">{{ order.payment_status }}</span>
            </td>
            <td class="text-capitalize">
              <span v-if="order.shipment_status === 'in_process'"
                    class="badge badge-outline-warning">{{ order.shipment_status.split('_').join(' ') }}</span>
              <span v-else-if="order.shipment_status === 'completed'"
                    class="badge badge-outline-success">{{ order.shipment_status }}</span>
              <span v-else-if="order.shipment_status === 'delivered'"
                    class="badge badge-outline-secondary">{{ order.shipment_status }}</span>
              <span v-else class="badge badge-outline-dark">{{ order.shipment_status }}</span>
            </td>
            <td>
              {{ order.date }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>