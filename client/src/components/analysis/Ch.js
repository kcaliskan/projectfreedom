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
      // plotOptions: {
      //   bar: {
      //     horizontal: true,
      //     columnWidth: "100%",
      //     endingShape: "rounded"
      //   }
      // },
      // dataLabels: {
      //   enabled: true,
      //   name: {
      //     fontSize: "154px",
      //     color: "red"
      //   },
      //   value: {
      //     fontSize: "154px",
      //     color: "red"
      //   }
      // },
      // stroke: {
      //   show: true,
      //   width: 5,
      //   colors: ["transparent"]
      // },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      }
      // fill: {
      //   opacity: 1
      // }
    },
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      }
    ]
  };

  render() {
    return (
      <Fragment>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height="350"
        />
      </Fragment>
    );
  }
}

export default connect(null, { getCurrentProfile })(CodewarsChart);
