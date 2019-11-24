import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Codewars = ({ isAuthenticated }) => {
  return <Fragment>Hello</Fragment>;
};

const mapStateToProps = props => ({
  auth: props.auth
});

export default connect(mapStateToProps)(Codewars);
