import React, { Fragment, useState, useEffect } from "react";
import { Redirect, withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCodewarsProfile, getCurrentProfile } from "../../actions/user";

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
    e.target.parentNode.className = "none";
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
        "Loading"
      ) : (
        <Fragment>
          <div>
            <Link
              to={location =>
                auth.user === null ? "#" : `/${auth.user.userName}/settings`
              }
            >
              Profile Settings
            </Link>
            Codewars
          </div>
          {errors !== undefined && errors.length > 0 && (
            <div>{displayErrors(errors)}</div>
          )}
          <form onSubmit={e => onSubmit(e)}>
            <div className={styleHandler(errors, "codewars") ? "error" : null}>
              <input
                type="text"
                placeholder="Codewars Username"
                name="codewarsUserNameInput"
                value={codewarsUserNameInput}
                onChange={e => onChange(e)}
              />
            </div>

            <input type="submit" value="Update" />
          </form>
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
