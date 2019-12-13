import React from "react";
import Chart from "react-apexcharts";

class CodewarsChartDayExample extends React.Component {
  state = {
    options: {
      chart: {
        id: "completed-by-day",
        type: "column"
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: [
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday"
        ]
      },
      plotOptions: {
        bar: {
          columnWidth: "15%"
        }
      },
      yaxis: {
        tickAmount: 10,
        labels: {
          formatter: function(val) {
            return val.toFixed(0);
          }
        }
      },
      title: {
        text: "Completed Challanges By Day",
        align: "center"
      }
    },
    series: [
      {
        name: "Completed Challange",
        data: ["288", "290", "284", "350", "255", "302", "309"]
      }
    ]
  };

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height={500}
      />
    );
  }
}

export default CodewarsChartDayExample;
