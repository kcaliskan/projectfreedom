import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";

const Login = () => {
  return (
    <Fragment>
      {localStorage.getItem("token") ? (
        <Redirect to="/" />
      ) : (
        <Fragment>
          <a href="/api/auth/google">Login With Google</a> <br />
          <a href="/api/auth/github">Login With Github</a>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
