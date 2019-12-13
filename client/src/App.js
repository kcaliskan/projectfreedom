//Core Packages
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Auth Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserSettings from "./components/auth/UserSettings";
import CodewarsSettings from "./components/auth/Codewars";
import LoginFail from "./components/auth/LoginFail";

//Layout Components
import Landing from "./components/layout/Landing";

// Analysis Components
import CodewarsResult from "./components/analysis/CodewarsResult";
import Ch from "./components/analysis/Ch";
import CodewarsResultExample from "./components/analysis/example/CodewarsResultExample";

//Legal Components
import Privacy from "./components/legal/Privacy";

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

class App extends React.Component {
  componentDidMount() {
    reduxStore.dispatch(loadUser());
    reduxStore.dispatch(getCurrentProfile());
  }

  render() {
    return (
      <Provider store={reduxStore}>
        <Router>
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login/userexits" component={LoginFail} />

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

            <Route exact path="/ch" component={Ch} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/example" component={CodewarsResultExample} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
