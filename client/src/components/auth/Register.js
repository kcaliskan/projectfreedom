import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { manualRegister } from "../../actions/auth";
import { Redirect } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const Register = ({ manualRegister, isAuthenticated, errors }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  let { fullName, userName, email, password, passwordConfirm } = formData;

  userName = userName.toLowerCase().replace(/\s+/g, "");
  email = email.toLowerCase();
  password = password.replace(/\s+/g, "");

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    manualRegister({ fullName, userName, email, password, passwordConfirm });
  };

  const displayErrors = errors =>
    errors.map((error, i) => (
      <p key={i}>
        <span>{error.message}</span>
      </p>
    ));

  const styleHandler = (errors, inputName) => {
    return errors.some(error => error.reason.toLowerCase().includes(inputName));
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <Navbar />
      <div className="register-component-top-text">
        Your Codewars visual only few clicks away..
      </div>
      <div className="register-form-container">
        <div className="register-form-wrapper-div">
          <div className="register-component-form-register-text">Register</div>
          <a href="/api/auth/google" className="login-w-google-button">
            <div className="login-google-icon"></div>
            <p>Continue with Google</p>
          </a>
          <a href="/api/auth/github" className="login-w-github-button">
            <div className="login-github-icon"></div>
            <p>Continue with Github</p>
          </a>
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

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              className={
                styleHandler(errors, "password") ||
                styleHandler(errors, "allfields")
                  ? "error"
                  : "registerInputStyle"
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={e => onChange(e)}
              className={
                styleHandler(errors, "password") ||
                styleHandler(errors, "allfields")
                  ? "error"
                  : "registerInputStyle"
              }
            />

            <input
              type="submit"
              value="Register"
              className="register-component-register-button"
            />
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </Fragment>
  );
};

Register.propTypes = {
  manualRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors
});

export default connect(mapStateToProps, { manualRegister })(Register);
