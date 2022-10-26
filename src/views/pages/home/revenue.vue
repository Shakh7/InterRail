<script>
  import {
    CountTo
  } from "vue3-count-to";

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
        series: [{
            name: "Orders",
            type: "area",
            data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
          },
          {
            name: "Earnings",
            type: "bar",
            data: [
              89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57,
              42.36, 88.51, 36.57,
            ],
          },
          {
            name: "Refunds",
            type: "line",
            data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35],
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
            width: [2, 0, 2.2],
          },
          fill: {
            opacity: [0.1, 0.9, 1],
          },
          markers: {
            size: [0, 0, 0],
            strokeWidth: 2,
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
                show: false,
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
          colors: getChartColorsArray('["--vz-primary", "--vz-success", "--vz-danger"]'),
          tooltip: {
            shared: true,
            y: [{
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
      };
    },
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
    <!-- end card header -->

    <div class="card-header p-0 border-0 bg-soft-light">
      <div class="row g-0 text-center">
        <div class="col-6 col-sm-3">
          <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1">
              <count-to :startVal="0" :endVal="7585" :duration="4000"></count-to>
            </h5>
            <p class="text-muted mb-0">Orders</p>
          </div>
        </div>
        <!--end col-->
        <div class="col-6 col-sm-3">
          <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1">
              $<count-to :startVal="0" :endVal="22" :duration="4000"></count-to>k
            </h5>
            <p class="text-muted mb-0">Earnings</p>
          </div>
        </div>
        <!--end col-->
        <div class="col-6 col-sm-3">
          <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1">
              <count-to :startVal="0" :endVal="367" :duration="4000"></count-to>
            </h5>
            <p class="text-muted mb-0">Refunds</p>
          </div>
        </div>
        <!--end col-->
        <div class="col-6 col-sm-3">
          <div class="p-3 border border-dashed border-start-0 border-end-0">
            <h5 class="mb-1 text-primary">
              <count-to :startVal="0" :endVal="18" :duration="4000"></count-to>%
            </h5>
            <p class="text-muted mb-0">Conversation Ratio</p>
          </div>
        </div>
        <!--end col-->
      </div>
    </div>
    <!-- end card header -->

    <div class="card-body p-0 pb-2">
      <div class="w-100">
        <apexchart class="apex-charts" height="380" type="line" dir="ltr" :series="series" :options="chartOptions">
        </apexchart>
        <!-- <div
          id="customer_impression_charts"
          data-colors='["--vz-primary", "--vz-success", "--vz-danger"]'
          class="apex-charts"
          dir="ltr"
        ></div> -->
      </div>
    </div>
    <!-- end card body -->
  </div>
  <!-- end card -->
</template>