import React, { Fragment } from "react";
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
              : "5%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: "middle",
        style: {
          fontSize: "14px",
          fontFamily: "Nunito, sans-serif",
          colors: ["#3d3f4f"]
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          opacity: 0.45
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
        categories: this.props.codewarsProfile.completedByMonth
          ? this.props.codewarsProfile.completedByMonth.months
          : [],
        title: {
          text:
            this.props.codewarsProfile.completedByMonth.seriesArray.length > 1
              ? ""
              : this.props.codewarsProfile.completedByMonth.seriesArray[0].name
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
        text: "Completed Challanges By Year and Month",
        align: "center"
      }
    },
    series: this.props.codewarsProfile.completedByMonth
      ? this.props.codewarsProfile.completedByMonth.seriesArray
      : []
  };

  render() {
    return (
      <Fragment>
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

export default connect()(CodewarsChartMonth);
