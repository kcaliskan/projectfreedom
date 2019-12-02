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

  componentDidUpdate() {
    // this.props.getCurrentProfile();
    // this.setState({
    //   options: {
    //     chart: {
    //       id: "apexchart-example",
    //       type: "column"
    //     },
    //     xaxis: {
    //       categories: this.props.codewarsProfile.completedByYear
    //         ? this.props.codewarsProfile.completedByYear.years
    //         : [0]
    //     },
    //     title: {
    //       text: "Completed Challanges By Year",
    //       align: "center"
    //     }
    //   },
    //   series: [
    //     {
    //       name: "Completed Challange",
    //       data: this.props.codewarsProfile.completedByYear
    //         ? this.props.codewarsProfile.completedByYear.completedYearTotal
    //         : [0]
    //     }
    //   ]
    // });
  }

  byYearHandler = () => {
    console.log(this.props.codewarsProfile.completedByDay.dataForChart);

    this.setState({
      options: {
        chart: {
          id: "apexchart-example",
          type: "column"
        },
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
  };

  byMonthHandler = () => {};

  byDayHandler = () => {
    console.log(this.props.codewarsProfile.completedByDay.dataForChart);

    this.setState({
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
    });
  };

  render() {
    return (
      <Fragment>
        <ul>
          <li onClick={() => this.byYearHandler()}>By Year</li>
          <li onClick={() => this.byMonthHandler()}>By Month</li>
          <li onClick={() => this.byDayHandler()}>By Day</li>
        </ul>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width={800}
          height={600}
        />
      </Fragment>
    );
  }
}

export default connect(null, { getCurrentProfile })(CodewarsChart);
