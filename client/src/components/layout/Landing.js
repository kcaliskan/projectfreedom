import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "./Navbar";

const Landing = ({ auth }) => {
  const logOutHandler = () => {
    localStorage.removeItem("token");
  };

  // const authLinks = (
  //   <Fragment>
  //     <div>
  //       <a href="/api/auth/logout" onClick={() => logOutHandler()}>
  //         Logout
  //       </a>
  //     </div>
  //     <div>
  //       <Link
  //         to={location =>
  //           auth.user === null ? "#" : `/${auth.user.userName}/codewarsresult`
  //         }
  //       >
  //         Codewars
  //       </Link>
  //     </div>
  //     <div>
  //       <Link
  //         to={location =>
  //           auth.user === null ? "#" : `/${auth.user.userName}/settings`
  //         }
  //       >
  //         Settings
  //       </Link>
  //     </div>
  //   </Fragment>
  // );

  return (
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
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
