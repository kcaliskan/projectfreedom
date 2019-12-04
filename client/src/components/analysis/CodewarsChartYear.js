import React from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";

class CodewarsChartYear extends React.Component {
  state = {
    options: {
      chart: {
        id: "apexchart-example",
        type: "column"
      },
      plotOptions: {
        bar: {
          none: []
        }
      },
      stroke: { none: [] },
      stroke: { none: [] },
      xaxis: {
        categories: this.props.codewarsProfile.completedByYear.years
      },
      title: {
        text: "Completed Challanges By Year",
        align: "center"
      }
    },
    series: [
      {
        name: "Completed Challange",
        data: this.props.codewarsProfile.completedByYear.completedYearTotal
      }
    ]
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

export default connect(mapStateToProps)(CodewarsChartYear);
