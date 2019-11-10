import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Tabs from "./tabs";
import Nav from "./last_nav";

const BuildFormStory = props => {
  return (
    <div className="build-form-story">
      <Nav />
      <Tabs projectId={props.match.params.projectId} />
      <h2>Now introduce your project.</h2>
      <p>Tell backers why they should fund this project. Include important background details and future plans.</p>
    </div>
  )
};

export default withRouter(BuildFormStory);