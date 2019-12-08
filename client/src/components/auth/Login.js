import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { manualLogin } from "../../actions/auth";
import { Redirect } from "react-router-dom";

const Login = ({ manualLogin, isAuthenticated, errors }) => {
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
            <a href="/api/auth/google">Login With Google</a> <br />
            <a href="/api/auth/github">Login With Github</a>
          </Fragment>
        )}
      </Fragment>
      {errors.length > 0 && <div>{displayErrors(errors)}</div>}
      <form onSubmit={e => onSubmit(e)}>
        <div
          className={
            styleHandler(errors, "email") || styleHandler(errors, "allfields")
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
            styleHandler(errors, "password") ||
            styleHandler(errors, "allfields")
              ? "error"
              : null
          }
        >
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>

        <input type="submit" value="Login" />
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  manualLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors
});

export default connect(mapStateToProps, { manualLogin })(Login);
