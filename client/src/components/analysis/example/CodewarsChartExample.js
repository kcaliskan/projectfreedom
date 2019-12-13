import React, { Fragment } from "react";
import CodewarsChartDayExample from "./CodewarsChartDayExample";
import CodewarsChartMonthExample from "./CodewarsChartMonthExample";
import CodewarsChartYearExample from "./CodewarsChartYearExample";
import CodewarsChartCategoryExample from "./CodewarsChartCategoryExample";
import Navbar from "../../layout/Navbar";

class CodewarsChartExample extends React.Component {
  state = { chartType: this.props.chartType };

  displayHandler = chartType => {
    if (chartType === "ct-year") {
      return <CodewarsChartYearExample />;
    }

    if (chartType === "ct-day") {
      return <CodewarsChartDayExample />;
    }

    if (chartType === "ct-all") {
      return <CodewarsChartMonthExample />;
    }
    if (chartType === "ct-category") {
      return <CodewarsChartCategoryExample />;
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
        <div className="choose-category-container">
          <div
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

export default CodewarsChartExample;
