import React, { Fragment } from "react";
import { getCurrentProfile } from "../../actions/user";
import { connect } from "react-redux";
import CodewarsChartDay from "./CodewarsChartDay";
import CodewarsChartMonth from "./CodewarsChartMonth";
import CodewarsChartYear from "./CodewarsChartYear";
import CodewarsChartCategory from "./CodewarsChartCategory";
import Navbar from "../layout/Navbar";

class CodewarsChart extends React.Component {
  state = { chartType: this.props.chartType };

  displayHandler = chartType => {
    if (chartType === "ct-year") {
      return <CodewarsChartYear />;
    }

    if (chartType === "ct-day") {
      return <CodewarsChartDay />;
    }

    if (chartType === "ct-all") {
      return <CodewarsChartMonth />;
    }
    if (chartType === "ct-category") {
      return <CodewarsChartCategory />;
    }
  };

  styleHandler = (chartType, categoryName) => {
    if (chartType === categoryName) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { chartType } = this.state;
    return (
      <Fragment>
        <Navbar />
        {/* <ul>
          <li onClick={() => this.setState({ chartType: "byYear" })}>
            By Year
          </li>
          <li onClick={() => this.setState({ chartType: "byMonth" })}>
            By Month
          </li>
          <li onClick={() => this.setState({ chartType: "byDay" })}>By Day</li>
          <li onClick={() => this.setState({ chartType: "byCategory" })}>
            By Category
          </li>
        </ul> */}
        <div className="choose-category-container">
          <div
            id="categories"
            className={
              this.styleHandler(chartType, "ct-category")
                ? "chosen-category"
                : "none-chosen-category"
            }
            onClick={() => this.setState({ chartType: "ct-category" })}
          >
            Category
          </div>
          <div
            className={
              this.styleHandler(chartType, "ct-year")
                ? "chosen-category"
                : "none-chosen-category"
            }
            onClick={() => this.setState({ chartType: "ct-year" })}
          >
            Year
          </div>
          <div
            className={
              this.styleHandler(chartType, "ct-day")
                ? "chosen-category"
                : "none-chosen-category"
            }
            onClick={() => this.setState({ chartType: "ct-day" })}
          >
            Day
          </div>
          <div
            className={
              this.styleHandler(chartType, "ct-all")
                ? "chosen-category"
                : "none-chosen-category"
            }
            onClick={() => this.setState({ chartType: "ct-all" })}
          >
            Year and Month
          </div>
        </div>
        {this.displayHandler(this.state.chartType)}
      </Fragment>
    );
  }
}
// state = {
//   options: {
//     chart: {
//       id: "apexchart-example",
//       type: "column"
//     },
//     plotOptions: {},
//     stroke: {},
//     fill: {},
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
// };

// byYearHandler = () => {
//   this.setState({
//     options: {
//       chart: {
//         id: "apexchart-example",
//         type: "column"
//       },
//       plotOptions: {
//         bar: {
//           none: []
//         }
//       },
//       stroke: { none: [] },
//       stroke: { none: [] },
//       xaxis: {
//         categories: this.props.codewarsProfile.completedByYear.years
//       },
//       title: {
//         text: "Completed Challanges By Year",
//         align: "center"
//       }
//     },
//     series: [
//       {
//         name: "Completed Challange",
//         data: this.props.codewarsProfile.completedByYear.completedYearTotal
//       }
//     ]
//   });
//   console.log(this.state, "by year");
// };

// byMonthHandler = () => {
//   this.setState({
//     options: {
//       chart: {
//         id: "apexchart-example",
//         type: "column"
//       },
//       plotOptions: {
//         bar: {
//           horizontal: false,
//           columnWidth: "100%",
//           endingShape: "rounded"
//         }
//       },
//       stroke: {
//         show: true,
//         width: 5,
//         colors: ["transparent"]
//       },
//       fill: {
//         opacity: 1
//       },
//       xaxis: {
//         categories: this.props.codewarsProfile.completedByMonth.months
//       },
//       title: {
//         text: "Completed Challanges By Year and Month",
//         align: "center"
//       }
//     },
//     series: this.props.codewarsProfile.completedByMonth.seriesArray
//   });
//   console.log(this.state, "by month");
// };

// byDayHandler = () => {
//   this.setState({
//     options: {
//       chart: {
//         id: "apexchart-example",
//         type: "column"
//       },
//       plotOptions: {
//         bar: {
//           none: []
//         }
//       },
//       stroke: { none: [] },
//       stroke: { none: [] },
//       xaxis: {
//         categories: this.props.codewarsProfile.completedByDay.dataForChart
//           ? this.props.codewarsProfile.completedByDay.dataForChart
//               .completedDayName
//           : [0]
//       },
//       title: {
//         text: "Completed Challanges By Day",
//         align: "center"
//       }
//     },
//     series: [
//       {
//         name: "Completed Challange",
//         data: this.props.codewarsProfile.completedByDay.dataForChart
//           ? this.props.codewarsProfile.completedByDay.dataForChart
//               .completedDayValue
//           : [0]
//       }
//     ]
//   });

//   console.log(this.state, "by day");

// render() {
//   return (
//     <Fragment>
//       <ul>
//         <li onClick={() => this.byYearHandler()}>By Year</li>
//         <li onClick={() => this.byMonthHandler()}>By Month</li>
//         <li onClick={() => this.byDayHandler()}>By Day</li>
//       </ul>
//       <Chart
//         options={this.state.options}
//         series={this.state.series}
//         type="bar"
//         height={600}
//       />
//     </Fragment>
//   );
// }
// }

export default connect(null, { getCurrentProfile })(CodewarsChart);
