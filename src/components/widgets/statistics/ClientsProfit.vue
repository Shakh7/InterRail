<template>
  <apexchart class="apex-charts" dir="ltr" height="324" :series="seriesData"
             :options="graphChartOptions"></apexchart>
</template>

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
  name: "ClientsProfit",
  props: {
    data: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      graphChartOptions: {
        legend: {
          show: false,
        },
        chart: {
          height: 350,
          type: "treemap",
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "Top Ten Customers",
          align: "center",
          style: {
            fontWeight: 500,
          },
        },
        colors: getChartColorsArray('["--vz-primary", "--vz-secondary", "--vz-success", "--vz-info","--vz-warning", "--vz-danger"]'),
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
          },
        },
        tooltip: {
          shared: true,
          y: [
            {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return `$ ${y.toLocaleString('en-US')}`;
                }
                return y;
              },
            },
          ],
        },
      },
    }
  },
  computed: {
    seriesData() {
      return [{
        data: this.data
      }]
    }
  }
}
</script>

<style scoped>

</style>