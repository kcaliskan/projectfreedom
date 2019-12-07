import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ auth }) => {
  const userLinks = <Fragment>userLinks</Fragment>;
  const guestLinks = (
    <div className="navbar-full">
      <div className="navbar-container">
        <div className="navbar-logo-fr">
          <Link className="navbar-logo"></Link>
        </div>
        <div className="navbar-logo-text-fr">
          <Link href="/" className="navbar-logo-text">
            AlgoTrack
          </Link>
        </div>
        <div className="navbar-gap-fr"></div>
        <div className="navbar-create-account-fr">
          <a href="/" className="navbar-create-account-button">
            <p>GET YOUR ANALYSIS</p>
            <p>It's free</p>
          </a>
        </div>
        <div className="navbar-login-fr">
          <a href="/" className="navbar-login-button">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
  return (
    <Fragment>
      {!auth.loading && (
        // <Fragment>{auth.isAuthenticated ? userLinks : guestLinks}</Fragment>
        <Fragment>{auth.isAuthenticated ? userLinks : guestLinks}</Fragment>
      )}
    </Fragment>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
