<script>
function getChartColorsArray(colors) {
  colors = JSON.parse(colors);
  return colors.map(function (value) {
    var newValue = value.replace(" ", "");
    if (newValue.indexOf(",") === -1) {
      var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
      if (color) {
        color = color.replace(" ", "");
        return color;
      } else return newValue;
    } else {
      var val = value.split(',');
      if (val.length == 2) {
        var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
        rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
        return rgbaColor;
      } else {
        return newValue;
      }
    }
  });
}

import store from "@/state/store.js";
import skeleton from "../../../components/custom/skeleton.vue";

export default {
  setup() {
    return {
      series: [2390.68, 19523.25, 14799.44],
      chartOptions: {
        labels: ["Rail Forwarder", "Block Train", "Multi Modal"],
        chart: {
          type: "donut",
          height: 224,
        },
        plotOptions: {
          pie: {
            size: 100,
            offsetX: 0,
            offsetY: 0,
            donut: {
              size: "70%",
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "18px",
                  offsetY: -5,
                },
                value: {
                  show: true,
                  fontSize: "20px",
                  color: "#343a40",
                  fontWeight: 500,
                  offsetY: 5,
                  formatter: function (val) {
                    return "$" + val;
                  },
                },
                total: {
                  show: true,
                  fontSize: "13px",
                  label: "Total value",
                  color: "#9599ad",
                  fontWeight: 500,
                  formatter: function (w) {
                    return (
                        "$" +
                        w.globals.seriesTotals.reduce(function (a, b) {
                          return a + b;
                        }, 0)
                    );
                  },
                },
              },
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return "$" + value;
            },
          },
        },
        stroke: {
          lineCap: "round",
          width: 2,
        },
        colors: getChartColorsArray('["--vz-warning", "--vz-primary", "--vz-success"]'),
      },
      user_orders: []
    };
  },
  props: {
    statistic: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    async getOrderStatisticsByUsers() {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/statistic/users`)
      let data = await (await response.json())['user_orders']
      this.user_orders = data
    },
    getManagerInfo(user_id) {
      let result = store.state.users_list.filter(user => user.id === user_id)
      return result[0]
    }
  },
  computed: {
    statisticsComputed() {
      return this.statistic
    },
  },
  async mounted() {
    await this.getOrderStatisticsByUsers()
  },
  components: {
    skeleton
  }
};
</script>

<template>
  <div class="card">
    <div class="card-header border-0 align-items-center d-flex">
      <h4 class="card-title mb-0 flex-grow-1">
        <h6>ORDERS STATISTICS</h6>
      </h4>
    </div>
    <div class="card-body pt-0">
      <apexchart class="apex-charts mb-4" height="224" dir="ltr" :series="statisticsComputed.map(s => s.counter)"
                 :options="chartOptions">
      </apexchart>

      <h6>ORDERS STATISTICS BY USERS</h6>

      <div data-simplebar style="max-height: 277px;" v-if="user_orders.length > 0">
        <b-list-group>
          <b-list-group-item class="border-0 border-bottom ps-0 pe-2"
                             v-for="user in user_orders.sort((a, b) => (a.count < b.count) ? 1: -1)" :key="user">
            <div class="d-flex">
              <div class="flex-grow-1">
                <h6 class="mb-1">
                  {{ getManagerInfo(user.manager)['full_name'] }}
                </h6>
                <p class="fs-12 mb-0 text-muted">
                  <i class="mdi mdi-circle fs-10 align-middle me-1 text-success"></i>
                  <small>Orders created</small>
                </p>
              </div>
              <div class="flex-shrink-0 text-end align-self-center">
                <span class="badge badge-gradient-info fs-6">{{ user.count }}</span>
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
      <div data-simplebar style="max-height: 277px;" v-else>
        <b-list-group>
          <b-list-group-item class="border-0 border-bottom ps-0 pe-2" v-for="i in 3" :key="i">
            <div class="d-flex">
              <div class="flex-grow-1">
                <h6 class="mb-1 w-50">
                  <skeleton />
                </h6>
                <p class="fs-12 mb-0 text-muted">
                  <i class="mdi mdi-circle fs-10 align-middle me-1 text-success"></i>
                  <small>Orders created</small>
                </p>
              </div>
              <div class="flex-shrink-0 text-end align-self-center">
                <span class="badge badge-gradient-info fs-6">
                </span>
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>