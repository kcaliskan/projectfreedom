import React, { Fragment } from "react";
import Chart from "react-apexcharts";

class CodewarsChartYear extends React.Component {
  // state = {
  //   options: {
  //     chart: {
  //       id: "completed-by-year",
  //       type: "column"
  //     },
  //     xaxis: {
  //       categories: this.props.codewarsProfile.completedByYear
  //         ? this.props.codewarsProfile.completedByYear.years
  //         : []
  //     },
  //     plotOptions: {
  //       bar: {
  //         columnWidth:
  //           this.props.codewarsProfile.completedByYear.years.length > 2
  //             ? "100%"
  //             : "15%"
  //       }
  //     },
  //     yaxis: {
  //       tickAmount: 10,
  //       labels: {
  //         formatter: function(val) {
  //           return val.toFixed(0);
  //         }
  //       }
  //     },
  //     dataLabels: {
  //       enabled: true
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
  //         : []
  //     }
  //   ]
  // };

  options;
  series;

  displayHandler = data => {
    this.options = {
      chart: {
        id: "completed-by-year",
        type: "column"
      },
      xaxis: {
        categories: data.years
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
    };
    this.series = [
      {
        name: "Completed Challange",
        data: data.completedYearTotal
      }
    ];

    return (
      <Chart
        options={this.options}
        series={this.series}
        type="bar"
        height={500}
      />
    );
  };

  render() {
    return (
      <Fragment>
        {this.props.codewarsProfile.completedByYear ? (
          <Fragment>
            {this.displayHandler(this.props.codewarsProfile.completedByYear)}
          </Fragment>
        ) : (
          <div className="create-profile-loading-container">
            <div className="create-profile-loading-img" />
            <div className="create-profile-loading-text">
              Preparing your analysis. It can take up to two minutes...
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default CodewarsChartYear;
