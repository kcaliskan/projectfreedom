import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/auth/Login";
import Success from "./components/auth/utils/success";

import Landing from "./components/layout/Landing";

//Utility functions
import setAuthToken from "./components/auth/utils/setAuthToken";

//Redux
import { Provider } from "react-redux";
import reduxStore from "./reduxStore";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    reduxStore.dispatch(loadUser());
  }, []);

  return (
    <Provider store={reduxStore}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/user/success/:id" component={Success} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
