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

  const { fullName, userName, email, password, passwordConfirm } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

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

  const styleHandler = field => {
    return errors.find(error => {
      if (error.reason === field) {
        return true;
      }
      return false;
    });
  };

  const divStyle = {
    margin: "40px",
    border: "5px solid pink"
  };
  return (
    <Fragment>
      {errors.length > 0 && <div>{displayErrors(errors)}</div>}
      <form onSubmit={e => onSubmit(e)}>
        <div
          className={
            styleHandler("allfields") || styleHandler("fullname")
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
            styleHandler("allfields") || styleHandler("username")
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
            styleHandler("allfields") || styleHandler("email") ? "error" : null
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
            styleHandler("allfields") || styleHandler("password")
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
            styleHandler("allfields") || styleHandler("password")
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
