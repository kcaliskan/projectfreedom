import React, { Fragment, useState, useEffect } from "react";
import { getCurrentProfile } from "../../actions/user";
import Chart from "react-apexcharts";
import { connect } from "react-redux";

class CodewarsChart extends React.Component {
  state = {
    options: {
      chart: {
        id: "apexchart-example",
        type: "column"
      },
      plotOptions: {},
      stroke: {},
      fill: {},
      xaxis: {
        categories: this.props.codewarsProfile.completedByYear
          ? this.props.codewarsProfile.completedByYear.years
          : [0]
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
          : [0]
      }
    ]
  };

  byYearHandler = () => {
    const myEmptyObj = {};

    this.setState({
      options: {
        chart: {
          id: "apexchart-example",
          type: "column"
        },
        plotOptions: myEmptyObj,
        stroke: myEmptyObj,
        fill: myEmptyObj,
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

  byDayHandler = () => {
    const myEmptyObj = {};
    this.setState({
      options: {
        chart: {
          id: "apexchart-example",
          type: "column"
        },
        plotOptions: myEmptyObj,
        stroke: myEmptyObj,
        fill: myEmptyObj,
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
    });

    console.log(this.state, "by day");
  };

  render() {
    return (
      <Fragment>
        <ul>
          <li onClick={this.byYearHandler}>By Year</li>
          <li onClick={this.byMonthHandler}>By Month</li>
          <li onClick={this.byDayHandler}>By Day</li>
        </ul>
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

export default connect(null, { getCurrentProfile })(CodewarsChart);
