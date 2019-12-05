import React from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";

class CodewarsChartMonth extends React.Component {
  state = {
    options: {
      chart: {
        id: "completed-by-year-and-month",
        type: "column"
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth:
            this.props.codewarsProfile.completedChallanges.data.length > 100
              ? "100%"
              : "25%",
          endingShape: "rounded"
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
      fill: {
        opacity: 1
      },
      xaxis: {
        categories: this.props.codewarsProfile.completedByMonth.months
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
    series: this.props.codewarsProfile.completedByMonth.seriesArray
  };

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height={600}
      />
    );
  }
}

const mapStateToProps = props => ({
  codewarsProfile: props.profile.codewars
});

export default connect(mapStateToProps)(CodewarsChartMonth);
