import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import Login from "./session/Login";
import Register from "./session/Register";
import Nav from "./nav/Nav";
import "../assets/stylesheets/main.scss";
import CreateForm from "./projects/create_form/form";
import BuildForm from "./projects/build_form/form";
import ProjectIndex from './projects/projects_index';
import ProjectShow from './projects/show/showpage';
import UserProfile from './user/user_profile';
import '../assets/stylesheets/main.scss';

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route path="/projects/:projectId/build" component={null} />
        <Nav />
      </Switch>
      <Switch>
        <AuthRoute path="/user" component={UserProfile} />
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Register} routeType="auth" />
        <Route exact path='/' component={ProjectIndex} />
      </Switch>
      <Switch>
        <AuthRoute path="/projects/:projectId/build" component={BuildForm} />
        <Route path="/projects/:projectId" component={ProjectShow} />
      </Switch>
      <AuthRoute exact path="/start" component={CreateForm} />
    </div>
  );
};

export default App;
