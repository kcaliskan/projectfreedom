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

// Analytics
import ReactGA from "react-ga";

// Router
import { createBrowserHistory } from "history";

//Styling
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const history = createBrowserHistory();

ReactGA.initialize("UA-154611338-1");
ReactGA.pageview(window.location.pathname + window.location.search);

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

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
