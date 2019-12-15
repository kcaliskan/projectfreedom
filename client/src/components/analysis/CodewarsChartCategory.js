import React, { Fragment } from "react";
import Chart from "react-apexcharts";

class CodewarsChartCategory extends React.Component {
  displayHandler = data => {
    const options = {
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "10%"
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: data.completedChallangesByCatName
      },
      title: {
        text: "Completed Challanges By Category",
        align: "center"
      }
    };

    const series = [
      {
        name: "Completed Challange",
        data: data.completedChallangesByNumber
      }
    ];

    return <Chart options={options} series={series} type="bar" height={500} />;
  };

  render() {
    return (
      <Fragment>
        {this.props.codewarsProfile.completedByCategory ? (
          <Fragment>
            {this.displayHandler(
              this.props.codewarsProfile.completedByCategory
            )}
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

export default CodewarsChartCategory;
