import React, { Fragment } from "react";
import Chart from "react-apexcharts";

class CodewarsChartDay extends React.Component {
  // state = {
  //   options: {
  //     chart: {
  //       id: "completed-by-day",
  //       type: "column"
  //     },
  //     dataLabels: {
  //       enabled: true
  //     },
  //     xaxis: {
  //       categories: this.props.codewarsProfile.completedByDay.dataForChart
  //         ? this.props.codewarsProfile.completedByDay.dataForChart
  //             .completedDayName
  //         : []
  //     },
  //     plotOptions: {
  //       bar: {
  //         columnWidth: "15%"
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
  //     title: {
  //       text: "Completed Challanges By Day",
  //       align: "center"
  //     }
  //   },
  //   series: [
  //     {
  //       name: "Completed Challange",
  //       data: this.props.codewarsProfile.completedByDay.dataForChart
  //         ? this.props.codewarsProfile.completedByDay.dataForChart
  //             .completedDayValue
  //         : []
  //     }
  //   ]
  // };

  options;
  series;

  displayHandler = data => {
    this.options = {
      chart: {
        id: "completed-by-day",
        type: "column"
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: data.dataForChart.completedDayName
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
    };
    this.series = [
      {
        name: "Completed Challange",
        data: data.dataForChart.completedDayValue
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
        {this.props.codewarsProfile.completedByDay ? (
          <Fragment>
            {this.displayHandler(this.props.codewarsProfile.completedByDay)}
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

export default CodewarsChartDay;
