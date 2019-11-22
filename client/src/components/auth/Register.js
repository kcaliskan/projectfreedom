import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { manualRegister } from "../../actions/auth";
import { Redirect } from "react-router-dom";

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
  email = userName.toLowerCase();
  password = password.replace(/\s+/g, "");

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    e.target.parentNode.className = "none";
    manualRegister({ fullName, userName, email, password, passwordConfirm });
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
            placeholder="Confirm Password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" value="Register" />
      </form>
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
