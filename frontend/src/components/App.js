import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import AuthRoute from "../util/route_util";
import Login from "./session/Login";
import Register from "./session/Register";
import Nav from "./nav/Nav";
import "../assets/stylesheets/main.scss";
import CreateForm from "./projects/create_form/form";
import BuildForm from "./projects/build_form/form";
import ProjectIndex from './projects/index/projects_index';
import CategoryIndex from './projects/index/category_index';
import ProjectShow from './projects/show/showpage';
import UserProfile from './user/user_profile';
import '../assets/stylesheets/main.scss';
import { Pledge } from "./pledge/pledge";
import Footer from './footer/footer';
import ReloadPage from './reload/page';
import ReloadConfirmation from './reload/confirmation';

const App = () => {
  return (
    <div className="app">
      <div className="main-page-content">
        <Switch>
          <Route path="/projects/:projectId/build" component={null} />
          <Nav />
        </Switch>
        <Switch>
          <AuthRoute exact path="/confirmed" component={ReloadConfirmation} />
          <AuthRoute exact path="/balance" component={ReloadPage} />
          <AuthRoute exact path="/start" component={CreateForm} />
          <AuthRoute exact path="/login" component={Login} routeType="auth" />
          <AuthRoute exact path="/signup" component={Register} routeType="auth" />
          <Route exact path='/' component={ProjectIndex} />
          <Route exact path="/categories/:categoryId" component={CategoryIndex} />
          <AuthRoute path="/projects/:projectId/build" component={BuildForm} />
          <Route exact path="/projects/:projectId/pledge" component={Pledge} />
          <Route path="/projects/:projectId" component={ProjectShow} />
          <AuthRoute exact path="/user" component={UserProfile} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <Footer/>
    </div>
  );
};

export default App;
