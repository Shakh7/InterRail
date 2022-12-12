let revenue = {
    series: [
        {
            name: 'Sales',
            type: 'column',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            total: 0
        }, {
            name: 'Orders',
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
                show: true,
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true
                }
            }
        },
        stroke: {
            width: [0, 2]
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
                    text: 'Sales',
                    style: {
                        fontWeight: 600,
                    },
                },

            },
            {
                opposite: true,
                title: {
                    text: 'Orders',
                    style: {
                        fontWeight: 600,
                    },
                }
            }
        ],
        plotOptions: {
            bar: {
                columnWidth: "60%",
                barHeight: "70%",
            },
        },
        colors: ["#405189", "#0AB39C"],
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
    }
}

export default revenue;


//  Simple Pie Charts
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

const simplePieChart = {
    series: [0, 0, 0],
    chartOptions: {
        chart: {
            height: 300,
            type: "pie",
        },
        labels: ["Import", "Export", "Transit"],
        legend: {
            position: "bottom",
        },
        dataLabels: {
            dropShadow: {
                enabled: false,
            },
        },
        colors: getChartColorsArray('["--vz-primary", "--vz-success", "--vz-warning"]'),
    },
};


const donutChart = {
    series: [44, 55, 41, 17, 15],
    chartOptions: {
        chart: {
            height: 300,
            type: "donut",
        },
        legend: {
            position: "bottom",
        },
        dataLabels: {
            dropShadow: {
                enabled: false,
            },
        },
        colors: getChartColorsArray('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'),
    },
};

// Updating Donut Charts
const updatingDonutChart = {
    series: [44, 55, 13, 33],
    chartOptions: {
        chart: {
            height: 280,
            type: "donut",
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: "bottom",
        },
        colors: getChartColorsArray('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'),
    },
};

// Gradient Donut Chart

const gradientDonutChart = {
    series: [44, 55, 41, 17, 15],
    chartOptions: {
        chart: {
            height: 300,
            type: "donut",
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270,
            },
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            type: "gradient",
        },
        legend: {
            position: "bottom",
            formatter: function (val, opts) {
                return val + " - " + opts.w.globals.series[opts.seriesIndex];
            },
        },
        title: {
            text: "Gradient Donut with custom Start-angle",
            style: {
                fontWeight: 500,
            },
        },
        colors: getChartColorsArray('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'),
    },
};

// Pattern Donut chart

const patternDonutChart = {
    series: [44, 55, 41, 17, 15],
    chartOptions: {
        chart: {
            height: 300,
            type: "donut",
            dropShadow: {
                enabled: true,
                color: "#111",
                top: -1,
                left: 3,
                blur: 3,
                opacity: 0.2,
            },
        },
        stroke: {
            width: 0,
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            showAlways: true,
                            show: true,
                        },
                    },
                },
            },
        },
        labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
        dataLabels: {
            dropShadow: {
                blur: 3,
                opacity: 0.8,
            },
        },
        fill: {
            type: "pattern",
            opacity: 1,
            pattern: {
                enabled: true,
                style: [
                    "verticalLines",
                    "squares",
                    "horizontalLines",
                    "circles",
                    "slantedLines",
                ],
            },
        },
        states: {
            hover: {
                filter: "none",
            },
        },
        theme: {
            palette: "palette2",
        },
        title: {
            text: "Favourite Movie Type",
            style: {
                fontWeight: 500,
            },
        },
        legend: {
            position: "bottom",
        },
        colors: getChartColorsArray('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'),
    },
};

// Pie Chart with Image Fill

const imagePieChart = {
    series: [44, 33, 54, 45],
    chartOptions: {
        chart: {
            height: 300,
            type: "pie",
        },
        colors: getChartColorsArray('["--vz-primary", "--vz-success", "--vz-warning", "--vz-info"]'),
        fill: {
            type: "image",
            opacity: 0.85,
            image: {
                src: [
                    // require("@/assets/images/auth-bg.jpg"),
                    require("@/assets/images/small/img-3.jpg"),
                    require("@/assets/images/small/img-5.jpg"),
                    require("@/assets/images/small/img-2.jpg")
                ],
                width: 25,
                imagedHeight: 25,
            },
        },
        stroke: {
            width: 4,
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ["#111"],
            },
            background: {
                enabled: true,
                foreColor: "#fff",
                borderWidth: 0,
            },
        },
        legend: {
            position: "bottom",
        },
    },
};

// monochrome_pie_chart
const monochromePieChart = {
    series: [25, 15, 44, 55, 41, 17],
    chartOptions: {
        chart: {
            height: 300,
            type: "pie",
        },
        labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
        theme: {
            monochrome: {
                enabled: true,
                color: "#405189",
                shadeTo: "light",
                shadeIntensity: 0.6,
            },
        },

        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -5,
                },
            },
        },
        title: {
            text: "Monochrome Pie",
            style: {
                fontWeight: 500,
            },
        },
        dataLabels: {
            formatter: function (val, opts) {
                var name = opts.w.globals.labels[opts.seriesIndex];
                return [name, val.toFixed(1) + "%"];
            },
            dropShadow: {
                enabled: false,
            },
        },
        legend: {
            show: false,
        },
    },
};

export {
    simplePieChart,
    donutChart,
    updatingDonutChart,
    gradientDonutChart,
    patternDonutChart,
    imagePieChart,
    monochromePieChart,
};