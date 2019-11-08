import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import Login from "./session/Login";
import Register from "./session/Register";
import Nav from "./nav/Nav";

const App = () => {
  return (
    <div>
      <Nav />
      <h1>PunchEnder</h1>
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Register} routeType="auth" />
      </Switch>
    </div>
  );
};

export default App;
