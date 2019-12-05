import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "./Navbar";

const Landing = ({ auth }) => {
  const logOutHandler = () => {
    localStorage.removeItem("token");
  };

  const authLinks = (
    <Fragment>
      <div>
        <a href="/api/auth/logout" onClick={() => logOutHandler()}>
          Logout
        </a>
      </div>
      <div>
        <Link
          to={location =>
            auth.user === null ? "#" : `/${auth.user.userName}/codewarsresult`
          }
        >
          Codewars
        </Link>
      </div>
      <div>
        <Link
          to={location =>
            auth.user === null ? "#" : `/${auth.user.userName}/settings`
          }
        >
          Settings
        </Link>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Navbar />
      <Link to="/login">
        <div>hello</div>
      </Link>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <div>
        <Link to="/signin">Login</Link>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      {!auth.loading && (
        <Fragment>{auth.isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Fragment>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
