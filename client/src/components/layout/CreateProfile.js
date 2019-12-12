import React, { Fragment, useState, useEffect } from "react";
import { Redirect, withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCodewarsProfile, getCurrentProfile } from "../../actions/user";

const CreateProfile = ({ auth, getCodewarsProfile, history, profile }) => {
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
        <div className="create-profile-loading-container">
          <div className="create-profile-loading-img" />
          <div className="create-profile-loading-text">Loading...</div>
        </div>
      ) : (
        <Fragment>
          <div className="create-profile-component-top-text">
            <p>Your</p>{" "}
            <p className="create-profile-page-codewars-text">Codewars</p>{" "}
            <p>visual analysis one click away..</p>
          </div>
          <div className="create-profile-page-container">
            <div className="create-profile-component-left-site">
              <div className="create-component-left-side-img"></div>
            </div>
            <div className="create-profile-form-container">
              <div className="create-profile-form-wrapper-div">
                <div className="create-profile-component-form-text">
                  Codewars Username
                </div>

                <div className="create-profile-component-form-info-text">
                  *Codewars username is case sensitive
                </div>

                {errors !== undefined && errors.length > 0 && (
                  <div className="create-profile-component-error-div">
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
                      styleHandler(errors, "codewars") ||
                      styleHandler(errors, "profile")
                        ? "error"
                        : "createProfileInputStyle"
                    }
                  />

                  <input
                    type="submit"
                    value="Get My Analysis"
                    className="create-profile-component-button"
                  />
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
      {/* <Footer /> */}
    </Fragment>
  );
};

CreateProfile.propTypes = {
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
})(withRouter(CreateProfile));
