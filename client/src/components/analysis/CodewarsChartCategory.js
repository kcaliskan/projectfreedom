import React, { Fragment } from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";

class CodewarsChartCategory extends React.Component {
  state = {
    options: null,
    series: null,
    reRender: false
  };

  componentDidMount() {
    if (this.props.codewarsProfile.completedByCategory && !this.state.reRender)
      this.setState({
        reRender: true,
        options: {
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
            categories: this.props.codewarsProfile.completedByCategory
              ? this.props.codewarsProfile.completedByCategory
                  .completedChallangesByCatName
              : []
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
              ? this.props.codewarsProfile.completedByCategory
                  .completedChallangesByNumber
              : []
          }
        ]
      });
  }

  render() {
    console.log(this.props.codewarsProfile);
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height={500}
      />
    );
  }
}

// const mapStateToProps = props => ({
//   codewarsProfile: props.profile.codewars
// });

export default connect()(CodewarsChartCategory);
