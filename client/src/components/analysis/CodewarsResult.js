import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/user";
import CodewarsChart from "./CodewarsChart";
import PropTypes from "prop-types";
import axios from "axios";

class CodewarsResult extends React.Component {
  state = { loadingLocalState: true };

  noProfile = (<Fragment>There is no profile create it amk</Fragment>);

  checkStatus = async () => {
    const res = await axios.get("/api/user/isAnalysisReady");
    const isReady = res.data;
    console.log(isReady, "im api res");

    if (isReady && this.props.profile) {
      this.setState({
        loadingLocalState: false,
        codewarsProfile: this.props.profile
      });
    } else {
      setTimeout(() => {
        this.checkStatus();
        this.props.getCurrentProfile();
      }, 3500);
    }
  };

  handleDisplay = (loading, profile) => {
    if (loading === false) {
      return <CodewarsChart codewarsProfile={profile} chartType={"byYear"} />;
    } else {
      return (
        <Fragment>
          <div>loading</div>
        </Fragment>
      );
    }
  };

  componentDidMount() {
    this.checkStatus();
  }

  render() {
    return (
      <Fragment>
        {this.props.profile
          ? this.handleDisplay(this.state.loadingLocalState, this.props.profile)
          : this.noProfile}
      </Fragment>
    );
  }
}

const mapStateToProps = props => ({
  auth: props.auth,
  profile: props.profile.codewars
});

export default connect(mapStateToProps, { getCurrentProfile })(CodewarsResult);
