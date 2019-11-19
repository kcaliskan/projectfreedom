import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/auth/Login";
import Success from "./components/auth/utils/success";

import Landing from "./components/layout/Landing";

import setAuthToken from "./components/auth/utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Router>
      <Fragment>
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/user/success/:id" component={Success} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
