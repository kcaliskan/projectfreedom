import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/user";
import CodewarsChart from "./CodewarsChart";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Navbar from "../layout/Navbar";

class CodewarsResult extends React.Component {
  state = { loadingLocalState: true };

  noProfile = () => <Redirect to="/" />;

  checkStatus = async () => {
    const res = await axios.get("/api/user/isAnalysisReady");
    const isReady = res.data;
    // console.log(isReady, "im api res");

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
      return (
        <CodewarsChart codewarsProfile={profile} chartType={"ct-category"} />
      );
    } else {
      return (
        <Fragment>
          <Navbar />
          <div className="create-profile-loading-container">
            <div className="create-profile-loading-img" />
            <div className="create-profile-loading-text">
              Preparing your analysis. It can take up to two minutes...
            </div>
          </div>
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
        {localStorage.getItem("codewarsProfile")
          ? this.handleDisplay(this.state.loadingLocalState, this.props.profile)
          : this.noProfile()}
      </Fragment>
    );
  }
}

const mapStateToProps = props => ({
  auth: props.auth,
  profile: props.profile.codewars
});

export default connect(mapStateToProps, { getCurrentProfile })(CodewarsResult);
