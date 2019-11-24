import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const UserSettings = ({ auth }) => {
  const { loading, errors, isAuthenticated } = auth;

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    gender: "",
    codewarsUserName: ""
  });

  let { fullName, userName, email, gender, codewarsUserName } = auth.user;

  useEffect(() => {
    setFormData({
      fullName: loading || !fullName ? "" : fullName,
      userName: loading || !userName ? "" : userName,
      email: loading || !email ? "" : email,
      gender: loading || !gender ? "" : gender,
      codewarsUserName: loading || !codewarsUserName ? "" : codewarsUserName
    });
  }, [auth.user]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(gender);

  const onSubmit = e => {
    e.preventDefault();
    e.target.parentNode.className = "none";
    // updateProfie({ fullName, userName, email, gender });
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
        "Loading"
      ) : (
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
              <select onChange={e => onChange(e)} value={gender}>
                <option value="Don't Disclose" name="dontdisclose">
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

            <div
              className={
                styleHandler(errors, "gender") ||
                styleHandler(errors, "allfields")
                  ? "error"
                  : null
              }
            >
              <input
                type="text"
                placeholder="Codewars Username"
                name="codewarsUserName"
                value={codewarsUserName}
                onChange={e => onChange(e)}
              />
            </div>
            <input type="submit" value="Update Profile" />
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.auth.errors
});

export default connect(mapStateToProps)(UserSettings);
