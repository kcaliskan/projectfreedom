import React, { Fragment, useState, useEffect } from "react";
import { Redirect, withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/user";
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
  }, [auth.user]);

  let { fullName, userName, email, gender } = formData;

  userName = userName.toLowerCase().replace(/\s+/g, "");
  email = email.toLowerCase();

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    e.target.parentNode.className = "none";
    updateProfile(formData, history);
  };

  //Redirect if logged in
  if (!isAuthenticated) {
    console.log("im here");
    console.log(auth, isAuthenticated);
    // return <Redirect to="/login" />;
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
        "Loading"
      ) : (
        <Fragment>
          <Navbar />
          <div>
            Profile Settings
            <Link
              to={location =>
                auth.user === null
                  ? "#"
                  : `/${auth.user.userName}/codewars/settings`
              }
            >
              Codewars
            </Link>
          </div>
          {errors.length > 0 && <div>{displayErrors(errors)}</div>}
          <form onSubmit={e => onSubmit(e)}>
            <div
              className={
                styleHandler(errors, "fullname") ||
                styleHandler(errors, "allfields")
                  ? "error"
                  : null
              }
            >
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={fullName}
                onChange={e => onChange(e)}
              />
            </div>
            <div
              className={
                styleHandler(errors, "username") ||
                styleHandler(errors, "allfields")
                  ? "error"
                  : null
              }
            >
              <input
                type="text"
                placeholder="Username"
                name="userName"
                value={userName}
                onChange={e => onChange(e)}
              />
            </div>
            <div
              className={
                styleHandler(errors, "email") ||
                styleHandler(errors, "allfields")
                  ? "error"
                  : null
              }
            >
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={e => onChange(e)}
              />
            </div>

            <div
              className={
                styleHandler(errors, "gender") ||
                styleHandler(errors, "allfields")
                  ? "error"
                  : null
              }
            >
              <select onChange={e => onChange(e)} name="gender" value={gender}>
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
            </div>
            <input type="submit" value="Update Profile" />
          </form>
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
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.auth.errors
});
export default connect(mapStateToProps, { updateProfile })(
  withRouter(UserSettings)
);
