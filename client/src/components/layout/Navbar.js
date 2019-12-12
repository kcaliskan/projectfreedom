import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth, logout }) => {
  const guestLinks = (
    <div className="navbar-full">
      <div className="navbar-container">
        <div className="navbar-logo-fr">
          <Link to="/" className="navbar-logo" />
          <Link to="/" className="navbar-logo-text">
            AlgoLevel
          </Link>
        </div>
        <div className="navbar-gap-fr"></div>
        <div className="navbar-options-fr">
          <a href="/register" className="navbar-create-account-button">
            <p>GET YOUR ANALYSIS</p>
            <p>It's free</p>
          </a>
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
        <div className="navbar-auth-logo-fr">
          <Link to="/" className="navbar-auth-logo" />
          <Link to="/" className="navbar-logo-text">
            AlgoLevel
          </Link>
        </div>
        <div className="navbar-gap-fr"></div>
        <div className="navbar-auth-options-fr">
          <Link
            to={
              auth.user === null ? "#" : `/${auth.user.userName}/codewarsresult`
            }
            className="navbar-codewars-button"
          >
            <div className="navbar-codewars-img" />
            <div className="navbar-codewars-text">Codewars Analysis</div>
          </Link>
          <Link
            to={auth.user === null ? "#" : `/${auth.user.userName}/settings`}
            className="navbar-settings-button"
          >
            Settings
          </Link>
          <div onClick={() => logout()} className="navbar-logout-button">
            Log Out
          </div>
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

export default connect(mapStateToProps, { logout })(Navbar);
