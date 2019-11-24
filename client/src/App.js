//Core Packages
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Auth Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import SignIn from "./components/auth/SignIn";
import UserSettings from "./components/auth/UserSettings";

//Layout Components
import Landing from "./components/layout/Landing";

// Analysis Components
import Codewars from "./components/analysis/Codewars";

//Utility functions
import setAuthToken from "./components/auth/utils/setAuthToken";
import Success from "./components/auth/utils/success";
import PrivateRoute from "./components/auth/utils/PrivateRoute";

//Redux
import { Provider } from "react-redux";
import reduxStore from "./reduxStore";
import { loadUser } from "./actions/auth";

//Styling
import "./App.css";

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
            <Route exact path="/register" component={Register} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/user/success/:id" component={Success} />
            <Route exact path="/:username/codewars" component={Codewars} />
            <PrivateRoute
              exact
              path="/:username/settings"
              component={UserSettings}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
