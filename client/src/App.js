//Core Packages
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Auth Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import SignIn from "./components/auth/SignIn";
import UserSettings from "./components/auth/UserSettings";
import CodewarsSettings from "./components/auth/Codewars";
import LoginFail from "./components/auth/LoginFail";

//Layout Components
import Landing from "./components/layout/Landing";

// Analysis Components
import CodewarsResult from "./components/analysis/CodewarsResult";

//Utility functions
import setAuthToken from "./components/auth/utils/setAuthToken";
import Success from "./components/auth/utils/success";
import PrivateRoute from "./components/auth/utils/PrivateRoute";

//Redux
import { Provider } from "react-redux";
import reduxStore from "./reduxStore";
import { loadUser } from "./actions/auth";
import { getCurrentProfile } from "./actions/user";
//Styling
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    reduxStore.dispatch(loadUser());
    reduxStore.dispatch(getCurrentProfile());
  }, []);

  return (
    <Provider store={reduxStore}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login/userexits" component={LoginFail} />

            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/user/success/:id" component={Success} />

            <PrivateRoute
              exact
              path="/:username/settings"
              component={UserSettings}
            />

            <PrivateRoute
              exact
              path="/:username/codewars/settings"
              component={CodewarsSettings}
            />

            <PrivateRoute
              exact
              path="/:username/codewarsresult"
              component={CodewarsResult}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
