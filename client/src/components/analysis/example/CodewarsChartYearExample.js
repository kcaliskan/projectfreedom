import React from "react";
import Chart from "react-apexcharts";

class CodewarsChartYearExample extends React.Component {
  state = {
    options: {
      chart: {
        id: "completed-by-year",
        type: "column"
      },
      xaxis: {
        categories: ["2014", "2015", "2016", "2017", "2018", "2019"]
      },
      plotOptions: {
        bar: {
          columnWidth: "100%"
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
      dataLabels: {
        enabled: true
      },
      stroke: {
        show: true,
        width: 5,
        colors: ["transparent"]
      },
      title: {
        text: "Completed Challanges By Year",
        align: "center"
      }
    },
    series: [
      {
        name: "Completed Challange",
        data: ["83", "451", "310", "757", "382", "95"]
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

export default CodewarsChartYearExample;
