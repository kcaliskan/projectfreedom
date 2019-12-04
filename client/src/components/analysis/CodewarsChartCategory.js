import React from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";

class CodewarsChartCategory extends React.Component {
  state = {
    options: {
      chart: {
        id: "apexchart-example",
        type: "column"
      },
      xaxis: {
        categories: this.props.codewarsProfile.completedByDay.dataForChart
          ? this.props.codewarsProfile.completedByDay.dataForChart
              .completedDayName
          : [0]
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
          ? this.props.codewarsProfile.completedByDay.dataForChart
              .completedDayValue
          : [0]
      }
    ]
  };

  byYearHandler = () => {
    this.setState({
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
    });
    console.log(this.state, "by year");
  };

  byMonthHandler = () => {
    this.setState({
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
    });
    console.log(this.state, "by month");
  };

  byDayHandler = () => {};

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

export default connect(mapStateToProps)(CodewarsChartCategory);
