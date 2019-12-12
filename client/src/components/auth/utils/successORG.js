import React, { Fragment, useEffect } from "react";
import setAuthToken from "./setAuthToken";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { providerLogin } from "../../../actions/auth";

// If user successfully login's the app
const Success = ({ match, providerLogin }) => {
  useEffect(() => {
    const jwtToken = match.params.id;
    localStorage.setItem("token", jwtToken);
    setAuthToken(jwtToken);
    providerLogin(jwtToken);
  }, [match, providerLogin]);

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

export default connect(null, { providerLogin })(Success);
