import React from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";

class CodewarsChartYear extends React.Component {
  state = {
    options: {
      chart: {
        id: "completed-by-year",
        type: "column"
      },
      xaxis: {
        categories: this.props.codewarsProfile.completedByYear
          ? this.props.codewarsProfile.completedByYear.years
          : []
      },
      plotOptions: {
        bar: {
          columnWidth:
            this.props.codewarsProfile.completedByYear.years.length > 2
              ? "100%"
              : "15%"
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
      title: {
        text: "Completed Challanges By Year",
        align: "center"
      }
    },
    series: [
      {
        name: "Completed Challange",
        data: this.props.codewarsProfile.completedByYear
          ? this.props.codewarsProfile.completedByYear.completedYearTotal
          : []
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

export default connect()(CodewarsChartYear);
