import React, { Fragment, useEffect } from "react";
import setAuthToken from "./setAuthToken";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

// If user successfully login's the app
const Success = ({ match }) => {
  useEffect(() => {
    const jwtToken = match.params.id;
    localStorage.setItem("token", jwtToken);
    setAuthToken(jwtToken);
  }, [match]);

  return (
    <Fragment>
      {localStorage.getItem("token") ? (
        <Redirect to="/" />
      ) : (
        <Redirect to="/login" />
      )}
    </Fragment>
  );
};

export default connect()(Success);
