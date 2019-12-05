import React from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";

class CodewarsChartCategory extends React.Component {
  state = {
    options: {
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: this.props.codewarsProfile.completedByCategory
          .completedChallangesByCatName
      },
      title: {
        text: "Completed Challanges By Category",
        align: "center"
      }
    },
    series: [
      {
        name: "Completed Challange",
        data: this.props.codewarsProfile.completedByCategory
          .completedChallangesByNumber
      }
    ]
  };

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height={600}
      />
    );
  }
}

const mapStateToProps = props => ({
  codewarsProfile: props.profile.codewars
});

export default connect(mapStateToProps)(CodewarsChartCategory);
