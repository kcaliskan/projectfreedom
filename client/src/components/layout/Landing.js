import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const logOutHandler = () => {
    localStorage.removeItem("token");
  };

  return (
    <Fragment>
      <Link to="/login">
        <div>hello</div>
      </Link>
      <a href="/api/auth/logout" onClick={() => logOutHandler()}>
        Logout
      </a>
    </Fragment>
  );
};

export default Landing;
