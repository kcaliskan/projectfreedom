import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { manualLogin } from "../../actions/auth";
import { Redirect, Link } from "react-router-dom";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

const Login = ({ auth, manualLogin, isAuthenticated, errors }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  let { email, password } = formData;
  email = email.toLowerCase();
  password = password.replace(/\s+/g, "");

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    manualLogin({ email, password });
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
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
      <Fragment>
        {localStorage.getItem("token") ? (
          <Redirect to="/" />
        ) : (
          <Fragment>
            <Navbar />
          </Fragment>
        )}
      </Fragment>

      <div className="form-container">
        <div className="form-wrapper-div">
          <div className="login-component-top-text">Member Login</div>
          <a href="/api/auth/google" className="login-w-google-button">
            <div className="login-google-icon"></div>
            <p>Continue with Google</p>
          </a>
          <a href="/api/auth/github" className="login-w-github-button">
            <div className="login-github-icon"></div>
            <p>Continue with Github</p>
          </a>
          {errors.length > 0 && (
            <div className="login-component-error-div">
              {displayErrors(errors)}
            </div>
          )}
          <form onSubmit={e => onSubmit(e)}>
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
                  : "loginInputSyle"
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
                  : "loginInputSyle"
              }
            />

            <input
              type="submit"
              value="Login"
              className="login-component-login-button"
            />
          </form>
          <Link className="login-form-register-button" to="/register">
            Don't have an account?
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  manualLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors
});

export default connect(mapStateToProps, { manualLogin })(Login);
