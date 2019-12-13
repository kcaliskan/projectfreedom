import React, { Fragment } from "react";
import setAuthToken from "./setAuthToken";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { providerLogin } from "../../../actions/auth";

// If user successfully login's the app
class Success extends React.Component {
  state = { token: null };

  componentDidMount() {
    const jwtToken = this.props.match.params.id;
    localStorage.setItem("token", jwtToken);
    this.setState({ token: jwtToken });
    setAuthToken(jwtToken);
    providerLogin(jwtToken);
  }

  render() {
    return (
      <Fragment>
        {this.state.token ? <Redirect to="/" /> : <Redirect to="/login" />}
      </Fragment>
    );
  }
}

export default connect(null, { providerLogin })(Success);
