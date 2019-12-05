import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-full">
      <div className="navbar-wrapper">
        <Link to="/" className="navbar-logo" />
        <Link to="/" className="navbar-logo-text">
          AlgoTrack
        </Link>
        <Link to="/register" className="navbar-account-create">
          <p className="account-create-p-1">GET YOUR ANALYSIS</p>
          <p className="account-create-p-2">It's free</p>
        </Link>
        <Link to="/login">
          <div>Login</div>
        </Link>
      </div>
    </div>
  );
};

export default connect(null)(Navbar);
