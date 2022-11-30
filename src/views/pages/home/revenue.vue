<script>
import {
  CountTo
} from "vue3-count-to";
import store from "@/state/store.js";

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

export default {
  components: {
    CountTo,
  },
  data() {
    return {
      series: [
        {
          name: "Orders",
          type: "area",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          total: 0
        },
        {
          name: "Agreed Rates",
          type: "bar",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          total: 0
        },
      ],
      chartOptions: {
        chart: {
          height: 370,
          type: "line",
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: "straight",
          dashArray: [0, 0, 8],
          width: [3, 1, 2.2],
        },
        fill: {
          opacity: [0.8, 0.9, 1],
        },
        markers: {
          size: [0, 0, 0],
          strokeWidth: 1,
          hover: {
            size: 4,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 0,
            right: -2,
            bottom: 15,
            left: 10,
          },
        },
        legend: {
          show: true,
          horizontalAlign: "center",
          offsetX: 0,
          offsetY: -5,
          markers: {
            width: 9,
            height: 9,
            radius: 6,
          },
          itemMargin: {
            horizontal: 10,
            vertical: 0,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "30%",
            barHeight: "70%",
          },
        },
        colors: getChartColorsArray('["--vz-secondary", "--vz-success", "--vz-danger"]'),
        tooltip: {
          shared: true,
          y: [
            {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0);
                }
                return y;
              },
            },
            {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return "$" + y.toFixed(2) + "k";
                }
                return y;
              },
            },
            {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0) + " Sales";
                }
                return y;
              },
            },
          ],
        },
      },
      mixedLineChart: {
        series: [
          {
            name: 'Orders',
            type: 'column',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            total: 0
          }, {
            name: 'Agreed Rates',
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            total: 0
          }
        ],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            toolbar: {
              show: false,
            }
          },
          stroke: {
            width: [0, 4]
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
          },
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          xaxis: {
            type: 'month'
          },
          yaxis: [
            {
              title: {
                text: 'Orders',
                style: {
                  fontWeight: 600,
                },
              },

            },
            {
              opposite: true,
              title: {
                text: 'Agreed Rates',
                style: {
                  fontWeight: 600,
                },
              }
            }
          ],
          colors: getChartColorsArray('["--vz-primary", "--vz-success"]'),
          tooltip: {
            shared: true,
            y: [
              {
                formatter: function (y) {
                  if (typeof y !== "undefined") {
                    return y.toFixed(0);
                  }
                  return y;
                },
              },
              {
                formatter: function (y) {
                  if (typeof y !== "undefined") {
                    return "$" + y.toFixed(2) + "k";
                  }
                  return y;
                },
              },
              {
                formatter: function (y) {
                  if (typeof y !== "undefined") {
                    return y.toFixed(0) + " Sales";
                  }
                  return y;
                },
              },
            ],
          },
        }
      },
      totalOrdersList: [],
      search: ''
    };
  },
  methods: {
    async getMonthlyStatistics() {
      let response = await fetch(`${process.env.VUE_APP_ORDER_URL}/statistic/monthly`);
      let data = await response.json();

      let monthly_orders = data['monthly_orders']
      let monthly_rates = data['monthly_agreed_rate']

      monthly_orders.forEach(item => {
        this.mixedLineChart.series[0].total += item.total
        this.mixedLineChart.series[0].data[item.month] = item.total
      })

      monthly_rates.forEach(item => {
        this.mixedLineChart.series[1].total += (item['total_agreed_rate'])
        this.mixedLineChart.series[1].data[item.month] = (item['total_agreed_rate']) / 1000
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
              <count-to :startVal="0" :endVal="mixedLineChart.series[0].total" :duration="3000"></count-to>
            </h5>
            <p class="text-muted mb-0">Orders</p>
          </div>
        </div>
        <!--end col-->
        <div class="col-12 col-sm-6">
          <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1">
              $
              <count-to :startVal="0" :endVal="mixedLineChart.series[1].total" :duration="3000"></count-to>
              {{ mixedLineChart.series[1].total >= 1000000 ? 'M' : mixedLineChart.series[1].total >= 1000 ? 'K' : '' }}
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
            :series="mixedLineChart.series"
            :options="mixedLineChart.chartOptions"
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
                    class="badge badge-gradient-warning">{{ order.payment_status }}</span>
              <span v-else-if="order.payment_status === 'received'"
                    class="badge badge-gradient-primary">{{ order.payment_status }}</span>
              <span v-else-if="order.payment_status === 'reserved'"
                    class="badge badge-gradient-secondary">{{ order.payment_status }}</span>
              <span v-else class="badge badge-gradient-dark">{{ order.payment_status }}</span>
            </td>
            <td class="text-capitalize">
              <span v-if="order.shipment_status === 'in_process'"
                    class="badge badge-gradient-warning">{{ order.shipment_status.split('_').join(' ') }}</span>
              <span v-else-if="order.shipment_status === 'completed'"
                    class="badge badge-gradient-primary">{{ order.shipment_status }}</span>
              <span v-else-if="order.shipment_status === 'delivered'"
                    class="badge badge-gradient-secondary">{{ order.shipment_status }}</span>
              <span v-else class="badge badge-gradient-dark">{{ order.shipment_status }}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>