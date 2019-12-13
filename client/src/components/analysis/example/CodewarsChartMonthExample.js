import React, { Fragment } from "react";
import Chart from "react-apexcharts";

class CodewarsChartMonthExample extends React.Component {
  state = {
    options: {
      chart: {
        id: "completed-by-year-and-month",
        type: "column"
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "100%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: "middle",
        style: {
          fontSize: "14px",
          fontFamily: "Nunito, sans-serif",
          colors: ["#3d3f4f"]
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          opacity: 0.45
        }
      },
      stroke: {
        show: true,
        width: 5,
        colors: ["transparent"]
      },
      fill: {
        opacity: 1
      },
      xaxis: {
        categories: [
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
          "January",
          "February"
        ]
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
        text: "Completed Challanges By Year and Month",
        align: "center"
      }
    },
    series: [
      {
        name: "2015",
        data: [117, 77, 115, 42, 36, 84, 46, 32, 13, 4]
      },
      {
        name: "2016",
        data: [63, 39, 14, 6, 74, 75]
      },
      {
        name: "2017",
        data: [11]
      },
      {
        name: "2019",
        data: [32, 60, 2]
      }
    ]
  };

  render() {
    return (
      <Fragment>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={600}
        />
      </Fragment>
    );
  }
}

export default CodewarsChartMonthExample;
