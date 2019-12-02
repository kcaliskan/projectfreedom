import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";

const LoginFail = () => {
  return (
    <Fragment>
      {localStorage.getItem("token") ? (
        <Redirect to="/" />
      ) : (
        <Fragment>
          <div>
            Sorry, there is already a user registered with this email address.
            Did you forget your password?
          </div>
          <a href="/api/auth/google">Login With Google</a> <br />
          <a href="/api/auth/github">Login With Github</a>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginFail;
