import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ auth }) => {
  const guestLinks = (
    <div className="navbar-full">
      <div className="navbar-container">
        <div className="navbar-logo-fr">
          <Link to="/" className="navbar-logo"></Link>
        </div>
        <div className="navbar-logo-text-fr">
          <Link to="/" className="navbar-logo-text">
            AlgoTrack
          </Link>
        </div>
        <div className="navbar-gap-fr"></div>
        <div className="navbar-create-account-fr">
          <a href="/register" className="navbar-create-account-button">
            <p>GET YOUR ANALYSIS</p>
            <p>It's free</p>
          </a>
        </div>
        <div className="navbar-login-fr">
          <a href="/login" className="navbar-login-button">
            Log In
          </a>
        </div>
      </div>
    </div>
  );

  const userLinks = (
    <div className="navbar-full">
      <div className="navbar-container">
        <div className="navbar-logo-fr">
          <Link to="/" className="navbar-logo"></Link>
        </div>
        <div className="navbar-logo-text-fr">
          <Link to="/" className="navbar-logo-text">
            AlgoTrack
          </Link>
        </div>
        <div className="navbar-gap-fr"></div>
        <div className="navbar-auth-options-fr">
          <a
            href={
              auth.user === null ? "#" : `/${auth.user.userName}/codewarsresult`
            }
            className="navbar-codewars-button"
          >
            <div className="navbar-codewars-img" />
            <div className="navbar-codewars-text">Codewars Analysis</div>
          </a>
          <a
            href={auth.user === null ? "#" : `/${auth.user.userName}/settings`}
            className="navbar-settings-button"
          >
            Settings
          </a>
        </div>
        <div className="navbar-logout-fr">
          <a href="/login" className="navbar-logout-button">
            Log Out
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
