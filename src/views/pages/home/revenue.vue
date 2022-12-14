<script>
import {
  CountTo
} from "vue3-count-to";

import store from "../../../state/store.js";
import revenue from "@/views/pages/home/data.js";
import spxnqpau from '../../../components/widgets/spxnqpau.json';
import Lottie from "../../../components/widgets/lottie.vue";
import {ordersMehtods} from "../../../state/helpers";

export default {
  components: {
    CountTo,
    lottie: Lottie
  },
  props: {
    totalOrdersList: {
      type: Array,
      default: () => []
    },
    shipment_status: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      search: '',
      selected_manager: '0',
      selected_position: '0',
      selected_shipment: '0',
      selected_payment: '0',
      revenue_apex: {
        data: revenue.series,
        options: revenue.chartOptions,
      },
      defaultOptions: {animationData: spxnqpau},
      skip: 0,
      offset: 10
    };
  },
  methods: {
    ...ordersMehtods,
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
    getAccount(user_id) {
      let result = store.state.users_list.filter(item => item.id === user_id)
      return [result[0]['full_name'][0], result[0]['full_name']]
    },
    getOrderUrl(order_type) {
      return order_type === 'container_order' ? 'orders_container_detail'
          : order_type === 'wagon_order' ? 'orders_wagon_detail'
              : order_type === 'wagon_empty_order' ? 'orders_empty_wagon_detail' : ''
    },

    redirectToDetailedView(order_number, order_type) {
      if (order_type === 'container_order') {
        this.$router.push({name: 'orders_container_detail', params: {id: order_number}})
      } else if (order_type === 'wagon_order') {
        this.$router.push({name: 'orders_wagon_detail', params: {id: order_number}})
      } else if (order_type === 'wagon_empty_order') {
        this.$router.push({name: 'orders_empty_wagon_detail', params: {id: order_number}})
      }
    }
  },
  async mounted() {
    await this.getMonthlyStatistics()
  },
  computed: {
    totalOrdersListComputed() {
      let all = this.totalOrdersList
      if (this.selected_manager !== '0') {
        all = all.filter(item => item.manager === parseInt(this.selected_manager))
      }
      if (this.search !== '') {
        all = all.filter(item =>
            item.order_number.toString().includes(this.search) ||
            item.shipment_status.toString().includes(this.search) ||
            item.payment_status.toString().includes(this.search) ||
            item.date.toString().includes(this.search) ||
            item.position.toString().includes(this.search)
        )
      }
      if (this.selected_position !== '0') {
        all = all.filter(item => item.position.toString().includes(this.selected_position))
      }
      if (this.selected_shipment !== '0') {
        all = all.filter(item => item.shipment_status.toString().includes(this.selected_shipment))
      }
      if (this.selected_payment !== '0') {
        all = all.filter(item => item.payment_status.toString().includes(this.selected_payment))
      }
      return all
    },
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
        <!--        <button type="button" class="btn btn-soft-secondary btn-sm me-1">-->
        <!--          1M-->
        <!--        </button>-->
        <!--        <button type="button" class="btn btn-soft-secondary btn-sm me-1">-->
        <!--          6M-->
        <!--        </button>-->
        <!--        <button type="button" class="btn btn-soft-primary btn-sm">1Y</button>-->
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

  <div class="row">
    <div class="col-lg-4" v-for="status in shipment_status" :key="status">
      <div class="card">
        <div class="card-body pb-0">
          <div class="d-flex justify-content-between align-items-center">

            <div>
              <h5 class="fs-15 fw-semibold text-capitalize">{{ status.shipment_status.replace('_', ' ') }}</h5>
              <p class="text-muted">Shipment status</p>
            </div>

            <div class="text-end">
              <h5 class="fs-15 fw-semibold text-capitalize"
                  :class="status.shipment_status === 'in_process' ? 'text-warning'
                  : status.shipment_status === 'completed' ? 'text-primary'  : 'text-success'">
                {{
                  status.count
                }}
              </h5>
              <p class="text-muted">{{
                  ((status.count / (shipment_status.map(s => s.count).reduce((a, b) => a + b, 0))) * 100).toFixed(1)
                }}%</p>
            </div>

          </div>

        </div>
        <div class="progress pt-0 animated-progess rounded-bottom rounded-0" style="height: 6px">
          <div class="progress-bar rounded-0" role="progressbar" style="width: 100%" aria-valuenow="100"
               aria-valuemin="0" aria-valuemax="100"
               :class="status.shipment_status === 'in_process' ? 'bg-warning'
                  : status.shipment_status === 'completed' ? 'bg-primary'  : 'bg-success'">
          </div>
        </div>
      </div>
    </div>
    <!--    <div class="col-lg-4">-->
    <!--      <div class="card">-->
    <!--        <div class="card-body pb-0">-->
    <!--          <div class="d-flex justify-content-between align-items-center">-->
    <!--            <div>-->
    <!--              <h5 class="fs-15 fw-semibold">Delivered</h5>-->
    <!--              <p class="text-muted">Shipment status</p>-->
    <!--            </div>-->
    <!--            <div class="flex-shrink-0 pe-3">-->
    <!--              <h5 class="text-primary fw-medium">-->
    <!--                75-->
    <!--              </h5>-->
    <!--            </div>-->
    <!--          </div>-->

    <!--        </div>-->
    <!--        <div class="progress pt-0 animated-progess rounded-bottom rounded-0" style="height: 6px">-->
    <!--          <div class="progress-bar bg-primary rounded-0" role="progressbar" style="width: 100%" aria-valuenow="100"-->
    <!--               aria-valuemin="0" aria-valuemax="100"></div>-->
    <!--          &lt;!&ndash;          <div class="progress-bar bg-info rounded-0" role="progressbar" style="width: 50%" aria-valuenow="50"&ndash;&gt;-->
    <!--          &lt;!&ndash;               aria-valuemin="0" aria-valuemax="100"></div>&ndash;&gt;-->
    <!--          &lt;!&ndash;          <div class="progress-bar rounded-0" role="progressbar" style="width: 20%" aria-valuenow="20"&ndash;&gt;-->
    <!--          &lt;!&ndash;               aria-valuemin="0" aria-valuemax="100"></div>&ndash;&gt;-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="col-lg-4">-->
    <!--      <div class="card">-->
    <!--        <div class="card-body pb-0">-->
    <!--          <div class="d-flex justify-content-between align-items-center">-->
    <!--            <div>-->
    <!--              <h5 class="fs-15 fw-semibold">Completed</h5>-->
    <!--              <p class="text-muted">Shipment status</p>-->
    <!--            </div>-->
    <!--            <div class="flex-shrink-0 pe-3">-->
    <!--              <h5 class="text-success fw-medium">-->
    <!--                25-->
    <!--              </h5>-->
    <!--            </div>-->
    <!--          </div>-->

    <!--        </div>-->
    <!--        <div class="progress pt-0 animated-progess rounded-bottom rounded-0" style="height: 6px">-->
    <!--          <div class="progress-bar bg-success rounded-0" role="progressbar" style="width: 100%" aria-valuenow="100"-->
    <!--               aria-valuemin="0" aria-valuemax="100"></div>-->
    <!--          &lt;!&ndash;          <div class="progress-bar bg-info rounded-0" role="progressbar" style="width: 50%" aria-valuenow="50"&ndash;&gt;-->
    <!--          &lt;!&ndash;               aria-valuemin="0" aria-valuemax="100"></div>&ndash;&gt;-->
    <!--          &lt;!&ndash;          <div class="progress-bar rounded-0" role="progressbar" style="width: 20%" aria-valuenow="20"&ndash;&gt;-->
    <!--          &lt;!&ndash;               aria-valuemin="0" aria-valuemax="100"></div>&ndash;&gt;-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
  <!-- end row-->


  <div class="card">
    <div class="card-header border-dashed border-start-0 border-top-0 border-end-0 align-items-center d-flex">
      <h4 class="card-title mb-0 flex-grow-1">Total Orders</h4>
      <div class="d-flex align-items-center justify-content-end">
        <div>
          <select class="form-select" v-model="selected_position" v-if="totalOrdersList.length > 0">
            <option value="0">Positions</option>
            <option class="text-capitalize" v-for="position in totalOrdersList.map(i => {
              return i['position']
            }).filter((v, i, a) => a.indexOf(v) === i)" :value="position" :key="position">
              {{ position.replace('_', ' ') }}
            </option>
          </select>
        </div>
        <div class="mx-2">
          <select class="form-select" v-model="selected_manager" v-if="totalOrdersList.length > 0">
            <option value="0">Managers</option>
            <option v-for="user in totalOrdersList.map(i => {
              return i['manager']
            }).filter((v, i, a) => a.indexOf(v) === i)" :value="user" :key="user">
              {{ getAccount(user)[1] }}
            </option>
          </select>
        </div>
        <div>
          <select class="form-select" v-model="selected_payment" v-if="totalOrdersList.length > 0">
            <option value="0">Payment statuses</option>
            <option class="text-capitalize" v-for="payment in totalOrdersList.map(i => {
              return i['payment_status']
            }).filter((v, i, a) => a.indexOf(v) === i)" :value="payment" :key="payment">
              {{ payment }}
            </option>
          </select>
        </div>
        <div class="mx-2">
          <select class="form-select" v-model="selected_shipment" v-if="totalOrdersList.length > 0">
            <option value="0">Shipment statuses</option>
            <option class="text-capitalize" v-for="shipment in totalOrdersList.map(i => {
              return i['shipment_status']
            }).filter((v, i, a) => a.indexOf(v) === i)" :value="shipment" :key="shipment">
              {{ shipment.replace('_', ' ') }}
            </option>
          </select>
        </div>
        <div class="pe-0" style="max-width: 200px">
          <input v-model="search" type="text" class="form-control ms-auto" placeholder="Search for orders..">
        </div>
      </div>
    </div>

    <div class="card-body p-0 pb-2 w-100">
      <div class="table-responsive table-card w-100 m-auto">
        <table class="table table-nowrap table-hover table-striped-columns text-center mb-0">
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
          <tbody v-if="totalOrdersList.length > 0">
          <tr v-for="order in totalOrdersListComputed.slice(skip, offset).sort((a, b) => (a.order_number < b.order_number) ? 1: -1)"
              :key="order" @click="redirectToDetailedView(order.order_number, order.child_type)"
              style="cursor: pointer">
            <td>
              <router-link :to="{name: getOrderUrl(order.child_type), params: {id: order.order_number}}"
                           class="fw-semibold">{{
                  order.order_number
                }}
              </router-link>
            </td>
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
          <tbody v-else>
          <tr>
            <td colspan="7" class="text-center">
              <lottie
                  colors="primary:#405189,secondary:#08a88a"
                  :options="defaultOptions"
                  :height="80"
                  :width="80"
              />
              <h5>You have no orders yet !</h5>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>