import React, { Fragment, useEffect } from "react";
import setAuthToken from "./setAuthToken";
import { Redirect } from "react-router-dom";

const CreateJWT = ({ match }) => {
  const jwtToken = match.params.id;

  useEffect(() => {
    localStorage.setItem("token", jwtToken);
    setAuthToken(jwtToken);
  }, [jwtToken]);

  const checkLocalStorage = () => {
    if (localStorage.getItem("token")) {
      return <Redirect to="/dashboard" />;
    } else {
      checkLocalStorage();
    }
  };
  return (
    <Fragment>
      {localStorage.getItem("token") ? <Redirect to="/" /> : null}
    </Fragment>
  );
};

export default CreateJWT;
