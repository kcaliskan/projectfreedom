import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/user";
import CodewarsChart from "./CodewarsChart";
import PropTypes from "prop-types";
import axios from "axios";

const CodewarsResult = ({ profile, auth }) => {
  const [loadingLocalState, setLoadingLocalState] = useState(true);

  let loading = loadingLocalState;

  useEffect(() => {
    checkStatus();
  }, [profile]);

  const noProfile = <Fragment>There is no profile create it amk</Fragment>;

  const checkStatus = async () => {
    const res = await axios.get("/api/user/isAnalysisReady");
    const isReady = res.data;
    console.log(isReady, "im api res");

    if (isReady) {
      setLoadingLocalState(false);
      console.log(loading, "im state");
      // handleDisplay(loading);
    } else {
      setTimeout(() => {
        checkStatus();
        getCurrentProfile();
      }, 3500);
    }
  };

  const handleDisplay = loading => {
    if (loading === false) {
      return <CodewarsChart />;
    } else {
      return (
        <Fragment>
          <div>loading</div>
        </Fragment>
      );
    }
  };

  return <Fragment>{profile ? handleDisplay(loading) : noProfile}</Fragment>;
};

const mapStateToProps = props => ({
  auth: props.auth,
  profile: props.profile.codewars
});

export default connect(mapStateToProps)(CodewarsResult);
