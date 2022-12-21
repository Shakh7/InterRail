<template>
  <apexchart class="apex-charts mb-4" height="224" dir="ltr" :series="series"
             :options="chartOptions">
  </apexchart>
</template>

<script>

export default {
  name: "DonutChart",
  data() {
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
        colors: this.getChartColorsArray('["--vz-warning", "--vz-primary", "--vz-success"]'),
      },
    }
  },
  methods: {
    getChartColorsArray(colors) {
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
  }
}
</script>

<style scoped>

</style>