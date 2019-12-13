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
          "October",
          "November",
          "December",
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September"
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
        name: "2014",
        data: [14, 36, 33]
      },
      {
        name: "2015",
        data: [18, 12, 37, 80, 48, 64, 18, 6, 7, 19, 55, 87]
      },
      {
        name: "2016",
        data: [8, 7, 18, 68, 45, 27, 63, 34, 7, 5, 5, 23]
      },
      {
        name: "2017",
        data: [12, 13, 2, 15, 5, 7, 2, 33, 353, 276, 27, 12]
      },
      {
        name: "2018",
        data: [20, 19, 11, 16, 205, 66, 15, 7, 4, 1, 4, 14]
      },
      {
        name: "2019",
        data: [12, 19, 11, 12, 4, 11, 8, 5, 4, 9]
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
