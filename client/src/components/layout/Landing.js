import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import CreateProfile from "./CreateProfile";

const Landing = ({ auth }) => {
  const displayHandler = userName => {
    return <Redirect to={`/${userName}/codewarsresult`} />;
  };

  const loading = (
    <div className="create-profile-loading-container">
      <div className="create-profile-loading-img" />
      <div className="create-profile-loading-text">Loading...</div>
    </div>
  );

  // <Redirect to={`/${auth.user.userName}/codewarsresult`} />

  return (
    <Fragment>
      {auth.isAuthenticated ? (
        <Fragment>
          <Navbar />
          {localStorage.getItem("codewarsProfile") ? (
            <Fragment>
              <Navbar />
              {auth.user && auth.user.userName
                ? displayHandler(auth.user.userName)
                : loading}
            </Fragment>
          ) : (
            <CreateProfile />
          )}
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
