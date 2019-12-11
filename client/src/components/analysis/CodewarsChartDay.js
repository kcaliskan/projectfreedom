import React from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";

class CodewarsChartDay extends React.Component {
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
        categories: this.props.codewarsProfile.completedByDay.dataForChart
          .completedDayName
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
        data: this.props.codewarsProfile.completedByDay.dataForChart
          .completedDayValue
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

const mapStateToProps = props => ({
  codewarsProfile: props.profile.codewars
});

export default connect(mapStateToProps)(CodewarsChartDay);
