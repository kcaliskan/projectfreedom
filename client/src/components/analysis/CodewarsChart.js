import React, { Fragment, useState } from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";

const CodewarsChart = ({ profile }) => {
  const sortByYearAndMonth = profile.completedByYearAndMonth;

  //Get completed years from the sortByYearAndMonth object
  let years = [];
  for (let key in sortByYearAndMonth) {
    if (sortByYearAndMonth.hasOwnProperty(key)) years.push(key);
  }

  //Get months of the each year from the sortByYearAndMonth object
  let months = [];
  for (let i = 0; i < years.length; i++) {
    for (let key in sortByYearAndMonth[years[i]]) {
      if (sortByYearAndMonth[years[i]].hasOwnProperty(key)) months.push(key);
    }
  }

  //Figure out that how many challages completed each year
  let numbers = {};

  for (let z = 0; z < years.length; z++) {
    for (let j = 0; j <= months.length; j++) {
      let year = years[z];

      if (sortByYearAndMonth[years[z]].hasOwnProperty(months[j])) {
        if (numbers[year]) {
          numbers[year] =
            numbers[year] + sortByYearAndMonth[years[z]][months[j]].length;
        } else {
          numbers[year] = sortByYearAndMonth[years[z]][months[j]].length;
        }
      }
    }
  }

  console.log(numbers);

  const [chartSettings, setStateX] = useState({
    options: {
      chart: {
        id: "apexchart-example",
        type: "column"
      },
      xaxis: {
        categories: years
      }
    },
    series: [
      {
        name: "series-1",
        data: numbers
      }
    ]
  });

  const { options, series } = chartSettings;

  return (
    <Fragment>Leblebi</Fragment>
    // <Chart
    //   options={options}
    //   series={series}
    //   type="bar"
    //   width={500}
    //   height={320}
    // />
  );
};

const mapStateToProps = props => ({
  auth: props.auth,
  profile: props.profile.codewars
});

export default connect(mapStateToProps)(CodewarsChart);
