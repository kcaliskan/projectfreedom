import React, { Fragment, useState, useEffect } from "react";
import { Redirect, withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCodewarsProfile, getCurrentProfile } from "../../actions/user";
import Navbar from "../layout/Navbar";

const CodewarsSettings = ({ auth, getCodewarsProfile, history, profile }) => {
  const { loading, isAuthenticated } = auth;
  let { errors } = profile;

  let codewarsUserName;
  if (profile.codewars !== null) {
    codewarsUserName = profile.codewars.username;
  }

  if (errors === undefined) {
    errors = [];
  }

  const [formData, setFormData] = useState({
    codewarsUserNameInput:
      loading || (!profile.codewars && !codewarsUserName)
        ? ""
        : codewarsUserName
  });

  useEffect(() => {
    setFormData({
      codewarsUserNameInput:
        loading || (!profile.codewars && !codewarsUserName)
          ? ""
          : codewarsUserName
    });
  }, []);

  const { codewarsUserNameInput } = formData;

  const onChange = e => {
    setFormData({ [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    getCodewarsProfile({ codewarsUserNameInput }, history);
  };

  //Redirect if logged in
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const displayErrors = errors =>
    errors.map((error, i) => (
      <p key={i}>
        <span>{error.message}</span>
      </p>
    ));

  const styleHandler = (errors, inputName) => {
    return errors.some(error => error.reason.toLowerCase().includes(inputName));
  };

  return (
    <Fragment>
      {!auth.user ? (
        <Fragment>
          <Navbar />
          <div className="create-profile-loading-container">
            <div className="create-profile-loading-img" />
            <div className="create-profile-loading-text">
              Preparing your analysis. It can take up to two minutes...
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Navbar />

          <div className="choose-category-container">
            <Link
              className="none-chosen-category"
              to={location =>
                auth.user === null ? "#" : `/${auth.user.userName}/settings`
              }
            >
              Profile Settings
            </Link>

            <div className="chosen-category">Codewars Settings</div>
          </div>

          <div className="profile-settings-form-container">
            <div className="profile-settings-form-wrapper-div">
              <div className="user-settings-component-form-top-text">
                Profile Update
              </div>
              {errors.length > 0 && (
                <div className="register-component-error-div">
                  {displayErrors(errors)}
                </div>
              )}
              <form onSubmit={e => onSubmit(e)}>
                <input
                  type="text"
                  placeholder="Codewars Username"
                  name="codewarsUserNameInput"
                  value={codewarsUserNameInput}
                  onChange={e => onChange(e)}
                  className={
                    styleHandler(errors, "codewars")
                      ? "error"
                      : "registerInputStyle"
                  }
                />
                <input
                  type="submit"
                  value="Update"
                  className="user-settings-component-update-button"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

CodewarsSettings.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
  getCodewarsProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.auth.errors
});

export default connect(mapStateToProps, {
  getCodewarsProfile,
  getCurrentProfile
})(withRouter(CodewarsSettings));
