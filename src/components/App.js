import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";

import store from "../redux/store";

import Page from "./Page";

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/bought" />} />
        <Route path="/bought" component={Page} />
        <Route path="/received" component={Page} />
        <Route path="*" component={() => <h2>OOPS: PAGE NOT FOUND</h2>} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
