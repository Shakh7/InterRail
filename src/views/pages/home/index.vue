<script>

import flatPickr from "vue-flatpickr-component";

import Portfolio from "./portfolio.vue";
import Revenue from "./revenue.vue";
import Position from "./position.vue";
import ImportExportPie from "./ImportExportPie.vue";

import store from "@/state/store.js";

export default {
  data() {
    return {
      title: "Main dashboard",
      items: [
        {
          text: "Pages",
          href: "/",
        },
        {
          text: "Dashboard",
          active: true,
        },
      ],
      date: new Date().getTime(),
      totalOrdersList: [],
      statistics: {
        sales: [
          {
            id: 1,
            icon: "ri-money-dollar-circle-fill",
            label: "rail_forwarder",
            counter: 0,
            badge: "ri-arrow-up-s-fill",
            badgeColor: "primary",
            containers_count: 0
          },
          {
            id: 2,
            icon: "ri-arrow-up-circle-fill",
            label: "block_train",
            counter: 0,
            badge: "ri-arrow-up-s-fill",
            badgeColor: "info",
            containers_count: 0
          },
          {
            id: 3,
            icon: "ri-arrow-down-circle-fill",
            label: "multi_modal",
            counter: 0,
            badge: "ri-arrow-down-s-fill",
            badgeColor: "warning",
            containers_count: 0
          },
        ],
        order_type: [
          {
            type: "transit",
            count: 5
          },
          {
            type: "export",
            count: 18
          },
          {
            type: "import",
            count: 43
          }
        ]
      }
    };
  },
  components: {
    flatPickr,
    Portfolio,
    Revenue,
    ImportExportPie,
    Position
  },
  methods: {
    async getStatistics() {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/statistic/`)
      let data = JSON.parse(JSON.stringify(await response.json()));
      let sales = data['sales']
      this.statistics.order_type = data['order_type']

      sales.filter(a => a.type === 'ContainerOrder').forEach(item => {

        let Rail = item.stat.filter(s => s['order__position'] === 'rail_forwarder')[0]
        let BlockTrain = item.stat.filter(s => s['order__position'] === 'block_train')[0]
        let MultiModal = item.stat.filter(s => s['order__position'] === 'multi_modal')[0]

        if (Rail !== undefined) {
          this.statistics.sales[0].counter += Rail.agreed_rate
          this.statistics.sales[0].containers_count += Rail.containers_count
        }
        if (BlockTrain !== undefined) {
          this.statistics.sales[1].counter += BlockTrain.agreed_rate
          this.statistics.sales[1].containers_count += BlockTrain.containers_count
        }
        if (MultiModal !== undefined) {
          this.statistics.sales[2].counter += MultiModal.agreed_rate
          this.statistics.sales[2].containers_count += MultiModal.containers_count
        }

      })
    },
    async getTotalOrders() {
      let response = null
      if (store.state.user.role === 'admin') {
        response = await fetch(`${process.env.VUE_APP_ORDER_URL}/order/list/`);
      } else {
        response = await fetch(`${process.env.VUE_APP_ORDER_URL}/order/list/?manager=${store.state.user.id}`);
      }
      let data = await response.json();
      this.totalOrdersList = data
    },
    getRelatedOrdersByPosition(type) {
      let orders = this.totalOrdersList.filter(order => order.position === type)
      return orders
    },
  },
  async mounted() {
    await this.getStatistics()
    await this.getTotalOrders()
  },
  computed: {
    sayHelloToUser() {
      let date = new Date();
      if (date.getHours() < 12) {
        return `Good Morning, ${store.state.user.full_name} !`;
      } else if (date.getHours() < 18) {
        return `Good Afternoon, ${store.state.user.full_name} !`;
      } else {
        return `Good Evening, ${store.state.user.full_name} !`;
      }
    },
  }
};
</script>

<template>
  <div class="row">
    <div class="col">
      <div class="h-100">

        <div class="row mb-3 pb-1">
          <div class="col-12">
            <div class="d-flex align-items-lg-center flex-lg-row flex-column">
              <div class="flex-grow-1">
                <h4 class="fs-16 mb-1">{{ sayHelloToUser }}</h4>
                <p class="text-muted mb-0">
                  Here's what's happening with your account today.
                </p>
              </div>
              <div class="mt-3 mt-lg-0">
                <div class="row g-3 mb-0 align-items-center">
                  <div class="col-sm-auto">
                    <div class="input-group">
                      <flat-pickr
                          v-model="date" placeholder="Current date"
                          class="form-control border-0 dash-filter-picker shadow">
                      </flat-pickr>
                      <div class="input-group-text bg-primary border-primary text-white">
                        <i class="ri-calendar-2-line"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">

          <div class="col-xxl-3">
            <Portfolio :statistic="statistics.sales"/>
            <ImportExportPie cardTitle="Order Types" :order_type="statistics.order_type"/>
          </div>
          <!-- end col -->

          <div class="col-xxl-9 order-xxl-0 order-first">
            <div class="row">
              <div class="col-lg-4 col-md-6" v-for="(item, index) of statistics.sales" :key="index">
                <Position :item="item" :orders="getRelatedOrdersByPosition(item.label)"/>
              </div>
            </div>

            <div class="row">
              <div class="col-xl-12">
                <Revenue :totalOrdersList="totalOrdersList"/>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>