import React from "react";
import Chart from "react-apexcharts";

class CodewarsChartCategoryExample extends React.Component {
  state = {
    options: {
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "10%"
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: [
          "bug_fixes",
          "reference",
          "algorithms",
          "games",
          "refactoring"
        ]
      },
      title: {
        text: "Completed Challanges By Category",
        align: "center"
      }
    },
    series: [
      {
        name: "Completed Challange",
        data: [68, 1232, 633, 132, 13]
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

export default CodewarsChartCategoryExample;
