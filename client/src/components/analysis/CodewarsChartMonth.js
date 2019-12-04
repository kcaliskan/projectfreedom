import React from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";

class CodewarsChartMonth extends React.Component {
  state = {
    options: {
      chart: {
        id: "apexchart-example",
        type: "column"
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "100%",
          endingShape: "rounded"
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
        categories: this.props.codewarsProfile.completedByMonth.months
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
