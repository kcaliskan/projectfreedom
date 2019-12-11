import React, { Fragment, useState, useEffect } from "react";
import { Redirect, withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/user";
import { loadUser } from "../../actions/auth";
import Navbar from "../layout/Navbar";

const UserSettings = ({ auth, updateProfile, history }) => {
  const { loading, errors, isAuthenticated } = auth;

  const [formData, setFormData] = useState({
    fullName: loading || !auth.user.fullName ? "" : auth.user.fullName,
    userName: loading || !auth.user.userName ? "" : auth.user.userName,
    email: loading || !auth.user.email ? "" : auth.user.email,
    gender: loading || !auth.user.gender ? "" : auth.user.gender
  });

  useEffect(() => {
    setFormData({
      fullName: loading || !auth.user.fullName ? "" : auth.user.fullName,
      userName: loading || !auth.user.userName ? "" : auth.user.userName,
      email: loading || !auth.user.email ? "" : auth.user.email,
      gender: loading || !auth.user.gender ? "" : auth.user.gender
    });
  }, [auth]);

  let { fullName, userName, email, gender } = formData;

  userName = userName.toLowerCase().replace(/\s+/g, "");
  email = email.toLowerCase();

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateProfile(formData, history);
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
            <div className="chosen-category">Profile Settings</div>

            <Link
              className="none-chosen-category"
              to={location =>
                auth.user === null
                  ? "#"
                  : `/${auth.user.userName}/codewars/settings`
              }
            >
              Codewars Settings
            </Link>
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
                  placeholder="Full Name"
                  name="fullName"
                  value={fullName}
                  onChange={e => onChange(e)}
                  className={
                    styleHandler(errors, "fullname") ||
                    styleHandler(errors, "allfields")
                      ? "error"
                      : "registerInputStyle"
                  }
                />
                <input
                  type="text"
                  placeholder="Username"
                  name="userName"
                  value={userName}
                  onChange={e => onChange(e)}
                  className={
                    styleHandler(errors, "username") ||
                    styleHandler(errors, "allfields")
                      ? "error"
                      : "registerInputStyle"
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                  className={
                    styleHandler(errors, "email") ||
                    styleHandler(errors, "allfields")
                      ? "error"
                      : "registerInputStyle"
                  }
                />
                <select
                  onChange={e => onChange(e)}
                  name="gender"
                  value={gender}
                  className="registerInputStyle"
                >
                  <option value="dontdisclose" name="dontdisclose">
                    Don't Disclose
                  </option>
                  <option value="Male" name="male" placeholder="Gender">
                    Male
                  </option>
                  <option value="Female" name="female">
                    Female
                  </option>
                </select>
                <input
                  type="submit"
                  value="Update Profile"
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

UserSettings.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
  updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.auth.errors
  };
};

export default connect(mapStateToProps, { updateProfile, loadUser })(
  withRouter(UserSettings)
);
