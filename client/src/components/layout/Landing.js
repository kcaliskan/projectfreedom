import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
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
      {/* <Footer /> */}
    </div>
  );

  // <Redirect to={`/${auth.user.userName}/codewarsresult`} />

  return (
    <Fragment>
      <Navbar />
      {auth.isAuthenticated && auth.user ? (
        <Fragment>
          {auth.user.codewarsUserName ? (
            <Fragment>{displayHandler(auth.user.userName)}</Fragment>
          ) : (
            <CreateProfile />
          )}
        </Fragment>
      ) : (
        <Fragment>
          <div className="landing-page-container">
            <div className="landing-page-top-content">
              <div className="landing-page-text-content-wrapper">
                <p>Get your visual </p>
                <p className="landing-page-codewars-text">Codewars</p>
                <p>performance</p>
              </div>

              <Link
                className="landing-page-create-account-button"
                to="/example"
              >
                <p>SHOW ME AN EXAMPLE RESULT</p>
                <p></p>
              </Link>
            </div>
            <div className="landing-page-bottom-content"></div>
          </div>
          {/* <Footer /> */}
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
