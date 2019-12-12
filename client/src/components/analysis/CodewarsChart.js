import React, { Fragment } from "react";
import { getCurrentProfile } from "../../actions/user";
import { connect } from "react-redux";
import CodewarsChartDay from "./CodewarsChartDay";
import CodewarsChartMonth from "./CodewarsChartMonth";
import CodewarsChartYear from "./CodewarsChartYear";
import CodewarsChartCategory from "./CodewarsChartCategory";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

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
        {/* <Footer /> */}
      </Fragment>
    );
  }
}

export default connect(null, { getCurrentProfile })(CodewarsChart);
