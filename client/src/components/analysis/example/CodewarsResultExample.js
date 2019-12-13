import React, { Fragment } from "react";
import CodewarsChartExample from "./CodewarsChartExample";

class CodewarsResultExample extends React.Component {
  render() {
    return (
      <Fragment>
        <CodewarsChartExample chartType={"ct-category"} />
      </Fragment>
    );
  }
}

export default CodewarsResultExample;
