import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "./Navbar";

const Landing = ({ auth }) => {
  const { isAuthenticated } = auth;
  const logOutHandler = () => {
    localStorage.removeItem("token");
  };

  return (
    <Fragment>
      {auth.isAuthenticated ? (
        <Fragment>
          <Navbar />
        </Fragment>
      ) : (
        <Fragment>
          <Navbar />

          <div className="landing-page-container">
            <div className="landing-page-top-content">
              <div className="landing-page-text-content-wrapper">
                <p>Get your visual </p>
                <p className="landing-page-codewars-text">Codewars</p>
                <p>performance</p>
              </div>

              <a className="landing-page-create-account-button">
                <p>SEE YOUR PERFORMANCE</p>
                <p>It's free</p>
              </a>
            </div>
            <div className="landing-page-bottom-content"></div>
          </div>
        </Fragment>
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
