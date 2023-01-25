<script>

import flatPickr from "vue-flatpickr-component";
import Portfolio from "./portfolio.vue";
import Revenue from "./revenue.vue";
import Position from "./position.vue";
import ImportExportPie from "./ImportExportPie.vue";
import store from "../../../state/store.js";
import PageHeader from "../../../components/page-header.vue";
import skeleton from "../../../components/custom/skeleton.vue";

export default {
  data() {
    return {
      isLoading: false,
      title: "Main dashboard",
      items: [
        {
          text: "Home",
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
            color: 'warning',
            containers_count: 0
          },
          {
            id: 2,
            icon: "ri-arrow-up-circle-fill",
            label: "block_train",
            counter: 0,
            color: 'primary',
            containers_count: 0
          },
          {
            id: 3,
            icon: "ri-arrow-down-circle-fill",
            label: "multi_modal",
            counter: 0,
            color: 'success',
            containers_count: 0
          },
        ],
        order_type: [],
        shipment_status: []
      }
    };
  },
  components: {
    flatPickr,
    Portfolio,
    Revenue,
    ImportExportPie,
    Position,
    PageHeader,
    skeleton,
  },
  methods: {
    async getStatistics() {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/statistic/`)
      let data = JSON.parse(JSON.stringify(await response.json()));
      let sales = data['sales']
      this.statistics.order_type = data['order_type']
      this.statistics.shipment_status = data['shipment_status']


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
      this.isLoading = false
    },
    getRelatedOrdersByPosition(type) {
      let orders = this.totalOrdersList.filter(order => order.position === type)
      return orders
    },
  },
  async mounted() {
    this.isLoading = true;
    await this.getStatistics()
    await this.getTotalOrders()
  },
  computed: {
    sayHelloToUser() {
      let date = new Date();
      let username = store.state.user.full_name;
      if (date.getHours() < 12) {
        return `Good Morning, ${username} !`;
      } else if (date.getHours() < 18) {
        return `Good Afternoon, ${username} !`;
      } else {
        return `Good Evening, ${username} !`;
      }
    },
  }
};
</script>

<template>
  <PageHeader :items="items" :title="title"></PageHeader>
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
            <ImportExportPie v-if="statistics.order_type.length > 0" cardTitle="Order Types"
                             :order_type="statistics.order_type"/>
          </div>
          <!-- end col -->

          <div class="col-xxl-9 order-xxl-0 order-first">
            <div class="row">
              <div class="col-lg-4 col-md-6" v-for="(item, index) of statistics.sales" :key="index">
                <Position v-if="!isLoading" :item="item" :orders="getRelatedOrdersByPosition(item.label)"/>
                <div class="card" v-else>
                  <div class="card-body p-0" type="button">
                    <div class="d-flex p-3 align-items-center">
                      <div class="avatar-sm flex-shrink-0">
                          <span class="avatar-title bg-light text-primary rounded-circle fs-3">
                            <skeleton class="p-4" custom_style="min-height: 15px; min-width: 15px; border-radius: 50%"/>
                          </span>
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <p class="text-uppercase w-75 fw-semibold fs-12 text-muted mb-3">
                          <skeleton/>
                        </p>
                        <p class="card-link w-50 my-0">
                          <skeleton custom_style="min-height: 12px"/>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xl-12">
                <Revenue :totalOrdersList="totalOrdersList" :shipment_status="statistics.shipment_status"/>
              </div>
            </div>
          </div>
        </div>

        <!--        <div v-else class="py-5 my-5 text-center">-->
        <!--          <b-spinner variant="secondary"></b-spinner>-->
        <!--          <h6 class="mt-3">Loading your dashboard..</h6>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>