import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <Link className="navbar-logo" to="/" />
        <Link className="navbar-logo-text" to="/">
          AlgoTrack
        </Link>
        <div className="navbar-gap" />
        <Link className="navbar-create-acount" to="/register">
          <Link to="/register" className="navbar-create-acount-text">
            <p>GET YOUR ANALYSIS</p> <p>It's free</p>
          </Link>
        </Link>
        <div className="navbar-login">
          <Link class="navbar-login-button" to="/login">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(null)(Navbar);
