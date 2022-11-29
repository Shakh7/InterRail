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
        colors: getChartColorsArray('["--vz-primary", "--vz-info", "--vz-warning", "--vz-success"]'),
      },
    };
  },
  methods: {
    getStatistic(position_name) {
      let data = this.statisticsComputed.filter(s => s.label === position_name)[0];
      return [data.counter, data.containers_count];
    }
  },
  props: {
    statistic: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    statisticsComputed() {
      return this.statistic
    },
  }
};
</script>

<template>
  <div class="card card-height-100">
    <div class="card-header border-0 align-items-center d-flex">
      <h4 class="card-title mb-0 flex-grow-1">
        <router-link to="/orders/list/">ORDERS STATISTICS</router-link>
      </h4>
      <!--      <div>-->
      <!--        <div class="dropdown">-->
      <!--          <button class="btn btn-soft-primary btn-sm" data-bs-toggle="dropdown" aria-haspopup="true"-->
      <!--                  aria-expanded="false">-->
      <!--            <span class="text-uppercase">USD<i class="mdi mdi-chevron-down align-middle ms-1"></i></span>-->
      <!--          </button>-->
      <!--          <div class="dropdown-menu dropdown-menu-end">-->
      <!--            <a class="dropdown-item" href="#">USD</a>-->
      <!--            <a class="dropdown-item" href="#">Euro</a>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <!-- end cardheader -->
    <div class="card-body">
      <apexchart class="apex-charts" height="224" dir="ltr" :series="statisticsComputed.map(s => s.counter)"
                 :options="chartOptions">
      </apexchart>

      <ul class="list-group list-group-flush border-dashed mb-0 mt-3 pt-2">
        <li class="list-group-item px-0"
            v-for="forwarder in statisticsComputed.map(i => { return {forwarder: i.label, color: i.badgeColor, rate: i.counter, ctr_count: i.containers_count} })"
            :key="forwarder">
          <div class="d-flex">
            <div class="flex-grow-1 ms-2">
              <h6 class="mb-1">
                {{ forwarder.forwarder }}</h6>
              <p class="fs-12 mb-0 text-muted">
                <i class="mdi mdi-circle fs-10 align-middle me-1" :class="'text-' + forwarder.color"></i><small>Containers
                count</small>
              </p>
            </div>
            <div class="flex-shrink-0 text-end">
              <h6 class="mb-1">{{ forwarder.rate }}</h6>
              <p class="my-0">{{ forwarder.ctr_count }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>