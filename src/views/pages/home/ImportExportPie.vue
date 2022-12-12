<script>
import {
  simplePieChart,
} from "./data";

export default {
  props: {
    cardTitle: {
      type: String,
      default: () => "Simple Pie Chart",
    },
    order_type: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      simplePieChart: simplePieChart,
    };
  },
  computed: {
    chart: {
      get() {
        simplePieChart.chartOptions.labels = this.order_type.map(item => item.type.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
        simplePieChart.series = this.order_type.map(item => item.count)
        return simplePieChart;
      }
    }
  }
};
</script>

<template>
  <div class="card">
    <div
        class="card-header justify-content-between d-flex align-items-center"
    >
      <h4 class="card-title">{{ cardTitle }}</h4>
    </div>
    <div class="card-body">
      <apexchart
          class="apex-charts"
          height="300"
          dir="ltr"
          :series="chart.series"
          :options="chart.chartOptions"
      ></apexchart>
    </div>
  </div>
  <!--end card-->

</template>