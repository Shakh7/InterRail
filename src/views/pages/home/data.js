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
                show: false,
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