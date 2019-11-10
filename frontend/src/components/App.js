import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import Login from "./session/Login";
import Register from "./session/Register";
import Nav from "./nav/Nav";
import "../assets/stylesheets/main.scss";
import CreateForm from "./projects/create_form/form";
import BuildForm from "./projects/build_form/form";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/projects/:projectId/build" component={null} />
        <Nav />
      </Switch>
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Register} routeType="auth" />
      </Switch>
      <Switch>
        <AuthRoute path="/projects/:projectId/build" component={BuildForm} />
      </Switch>
      <AuthRoute exact path="/start" component={CreateForm} />
    </div>
  );
};

export default App;
